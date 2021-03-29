import React, {DragEvent} from 'react';
import classes from './App.module.css';
import createEngine, {DiagramEngine} from '@projectstorm/react-diagrams';
import TopNav from '../components/UI/top-nav/TopNav';
import SideBar from "../components/UI/side-bar/SideBar";
import {CategoryConfig, NodeConfig} from "../components/nodes/Config";
import {DATA_CONFIG, DATA_NODES} from "../components/nodes/data/DataConfig";
import {MODEL_CONFIG, MODEL_NODES} from "../components/nodes/model/ModelConfig";
import {EVALUATE_CONFIG, EVALUATE_NODES} from "../components/nodes/evaluate/EvaluateConfig";
import axios from "axios";
import download from 'js-file-download';
import BottomNav from "../components/UI/bottom-nav/BottomNav";
import Canvas from "../components/UI/canvas/Canvas";
import {MyDiagramModel} from "./diagram/MyDiagramModel";
import splitEvaluate from '../demos/split-n-evaluate.json';
import {MyZoomCanvasAction} from "./actions/MyZoomCanvasAction";
import {DiagramStateManager} from "./states/DiagramStateManager";
import {TypeCheckResponse, TypeChecker} from "./typecheck/TypeChecker";
import {BaseNodeModel} from "../components/core/BaseNode/BaseNodeModel";
import {DefaultLinkModel} from "@projectstorm/react-diagrams-defaults";
import {FactoriesManager} from "./FactoriesManager";

interface AppProps {

}

type AppState = {
    unsatNodeAssertions: Map<BaseNodeModel, string[]>,
    allNodeAssertions: Map<BaseNodeModel, string[]>,
    allLinkAssertions: Map<DefaultLinkModel, string[]>,
    log: string[],
};

class App extends React.Component<AppProps, AppState> {

    private readonly dragDropFormat: string = "side-bar-drag-drop";
    private readonly engine: DiagramEngine;
    private readonly factoriesManager: FactoriesManager;
    private readonly typeChecker: TypeChecker;
    private generated_nodes_counter = 0;

    constructor(props: AppProps) {
        super(props);
        this.state = {
            unsatNodeAssertions: new Map(),
            allNodeAssertions: new Map(),
            allLinkAssertions: new Map(),
            log: [],
        }
        this.engine = createEngine({registerDefaultZoomCanvasAction: false});
        this.typeChecker = new TypeChecker(this.engine);
        this.factoriesManager = new FactoriesManager(this.engine);
        this.startUp();
    }

    startUp = () => {
        this.factoriesManager.registerNodeFactories();
        this.factoriesManager.registerPortFactories();
        this.newCanvas();
        this.engine.getActionEventBus().registerAction(new MyZoomCanvasAction());
        this.engine.getStateMachine().pushState(new DiagramStateManager(this.typeChecker));
        this.engine.maxNumberPointsPerLink = 0;
    }

    registerListeners = (model: MyDiagramModel) => {
        model.registerListener({
            linksUpdated: (event) => {
                console.log('linksUpdated');
                console.log(event);
            },
            linkCreated: (event) => {
                console.log('linkCreated');
                console.log(event);
            },
            nodeUpdated: (event) => {
                console.log("nodeUpdated");
                console.log(event);
                this.typeChecker.requestTypeCheck();
            },
            nodesUpdated: (event) => {
                console.log("nodesUpdated");
                console.log(event);
            },
            typeCheckResponse: (event) => {
                console.log("typeCheckResponse");
                console.log(event.typeCheckResponse);
                const allNodeAssertions = this.processNodeAssertions(event.typeCheckResponse.nodeAssertions);
                const allLinkAssertions = this.processLinkAssertions(event.typeCheckResponse);
                const unsatNodeAssertions = this.processNodeAssertions(event.typeCheckResponse.unsatNodeAssertions);
                this.setState({
                    unsatNodeAssertions: unsatNodeAssertions,
                    allNodeAssertions: allNodeAssertions,
                    allLinkAssertions: allLinkAssertions,
                })
            }
        });
    }

    processNodeAssertions = (mapNodeAssertions) => {
        const map = new Map<BaseNodeModel, string[]>();

        for (let k of Object.keys(mapNodeAssertions)) {
            const node = this.engine.getModel().getNode(k) as BaseNodeModel;
            map.set(node, mapNodeAssertions[k]);
        }
        return map;
    }

    processLinkAssertions = (typeCheckResponse: TypeCheckResponse) => {
        const map = new Map<DefaultLinkModel, string[]>();

        for (let k of Object.keys(typeCheckResponse.linkAssertions)) {
            const link = this.engine.getModel().getLink(k) as DefaultLinkModel;
            console.log(link)
            map.set(link, typeCheckResponse.linkAssertions[k]);
        }
        return map;
    }


    loadDemos = () => {
        const map = new Map<String, () => void>();
        map.set("Simple Pipeline", () => {
            this.canvasLoadDiagram(splitEvaluate);
            this.updateLog("Loaded demo Simple Pipeline");
        });
        return map;
    }

    canvasLoadDiagram = (diagram: any) => {
        this.engine.getModel().deserializeModel(diagram, this.engine);
        this.engine.repaintCanvas();
        this.typeChecker.requestTypeCheck(diagram);
    }

    loadMapCategoryNodes = () => {
        const map = new Map<CategoryConfig, NodeConfig[]>();
        map.set(DATA_CONFIG, DATA_NODES);
        map.set(MODEL_CONFIG, MODEL_NODES);
        map.set(EVALUATE_CONFIG, EVALUATE_NODES);
        return map;
    }

    newCanvas = () => {
        const model = new MyDiagramModel();
        this.engine.setModel(model);
        this.registerListeners(model);
        this.generated_nodes_counter = 0;
        this.updateLog("New canvas");
    }

    onDropCanvas = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData(this.dragDropFormat);
        try {
            const inJSON = JSON.parse(data);
            console.log(data);
            const factory = this.engine.getNodeFactories().getFactory(inJSON.codeName);
            const node = factory.generateModel({}) as BaseNodeModel;
            let point = this.engine.getRelativeMousePoint(event);
            node.setPosition(point);
            node.setTitle(node.getTitle() + " " + ++this.generated_nodes_counter);
            this.engine.getModel().addNode(node);
            this.engine.repaintCanvas();
            this.typeChecker.requestTypeCheck();
        } catch (e) {
            console.log(e);
        }
    }

    openSave = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList.length > 0) {
            event.target.files[0].text().then((text: string) => {
                this.canvasLoadDiagram(JSON.parse(text));
            });
            this.updateLog("Loaded save file " + event.target.files[0].name);
        }
        event.target.value = "";
    }

    downloadSave = () => {
        const data = this.engine.getModel().serialize();
        download(JSON.stringify(data, null, 4), 'mlvp.json');
    }

    requestCompilation = () => {
        const data = this.engine.getModel().serialize();
        axios.post('/compile', data)
            .then(response => {
                console.log(response);
                console.log(response.data);
                download(response.data, "mlvp-generated-code.py")
                this.updateLog("Compiled successfully!");
            })
            .catch(error => {
                console.log(error);
                this.updateLog("Error occurred while compiling");
            });
    }

    updateLog = (message: string) => {
        let currentDate = new Date();
        let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
        const auxLog = this.state.log;
        auxLog.push(time + " " + message);
        this.setState({log: auxLog});
    }

    render() {
        return (
            <div className={classes.FrontPage}>
                <TopNav newCanvas={this.newCanvas} open={this.openSave} save={this.downloadSave}
                        requestCompilation={this.requestCompilation} loadDemos={this.loadDemos()}/>
                <div className={classes.Container}>
                    <SideBar catAndNames={this.loadMapCategoryNodes()} format={this.dragDropFormat}/>
                    <Canvas engine={this.engine} onDropCanvas={this.onDropCanvas}/>
                </div>
                <BottomNav unsatNodeAssertions={this.state.unsatNodeAssertions}
                           allNodeAssertions={this.state.allNodeAssertions}
                           allLinkAssertions={this.state.allLinkAssertions}
                           log={this.state.log}
                />
            </div>
        );
    }

}


export default App;
