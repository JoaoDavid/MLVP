import React from 'react';
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
import {MyDiagramModel} from "../components/UI/canvas/diagram/MyDiagramModel";
import splitEvaluate from '../demos/split-n-evaluate.json';
import testJson from '../demos/test.json';
import conBalancedDsToClassifier from '../demos/train-classifier-balanced-ds.json';
import {MyZoomCanvasAction} from "../components/UI/canvas/actions/MyZoomCanvasAction";
import {DiagramStateManager} from "../components/UI/canvas/states/DiagramStateManager";
import {ValidateLinks} from "../z3/ValidateLinks";
import {BaseNodeModel} from "../components/core/BaseNode/BaseNodeModel";
import {BasePortModel} from "../components/core/BasePort/BasePortModel";

interface AppProps {

}

type AppState = {
    problems: Map<String, String[]>,
};

class App extends React.Component<AppProps, AppState> {

    private readonly dragDropFormat: string = "side-bar-drag-drop";
    private lastSave: any = {};
    private readonly engine: DiagramEngine;
    private readonly validateLinks: ValidateLinks;

    state = {
        problems: new Map(),
    }

    constructor(props: AppProps) {
        super(props);
        this.engine = createEngine({registerDefaultZoomCanvasAction: false});
        this.validateLinks = new ValidateLinks(this.engine);
        this.newCanvas();
        this.engine.getActionEventBus().registerAction(new MyZoomCanvasAction({inverseZoom: true}));
        this.engine.getStateMachine().pushState(new DiagramStateManager(this.validateLinks));
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
                this.state.problems.clear();
                const newState = {...this.state}
                this.setState(newState);
            },
            nodePropsUpdated: (event) => {
                console.log("nodePropsUpdated");
                console.log(event);
            },
            nodesUpdated: (event) => {
                console.log("nodesUpdated");
                console.log(event);
            },
            problemsFound: (event) => {
                console.log("problemsFound");
                console.log(event);
                console.log(event.problems);
                const map = this.processProblems(event.problems);
                this.setState({problems: map})
            }
        });
    }

    processProblems = (problems: string[]) => {
        const map = new Map<String, String[]>();
        problems.forEach((problem) => {
            const infoArr = problem.split("_"); // length == 3
            const node = this.engine.getModel().getNode(infoArr[0]) as BaseNodeModel;
            const port = node.getPortFromID(infoArr[1]) as BasePortModel;
            const value = map.get(node.getID()) || [];
            value.push(port.getName() + " " + infoArr[2]);
            map.set(node.getID(), value);
        })
        return map;
    }

    loadDemos = () => {
        const map = new Map<String, () => void>();
        map.set("Simple Pipeline", () => {
            this.loadDemoAux(splitEvaluate);
        });
        map.set("Test", () => {
            this.loadDemoAux(testJson);
        });
        map.set("Balanced DS Split", () => {
            this.loadDemoAux(conBalancedDsToClassifier);
        });
        return map;
    }

    loadDemoAux = (diagram: any) => {
        this.engine.getModel().deserializeModel(diagram, this.engine);
        this.engine.repaintCanvas();
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
    }

    openSave = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList.length > 0) {
            event.target.files[0].text().then((text: string) => {
                this.engine.getModel().deserializeModel(JSON.parse(text), this.engine);
                this.engine.repaintCanvas();
            });
        }
        event.target.value = "";
    }

    downloadSave = () => {
        this.lastSave = this.engine.getModel().serialize();
        download(JSON.stringify(this.lastSave, null, 4), 'mlvp.json');
        console.log(this.lastSave);
        console.log(JSON.stringify(this.lastSave, null, 4));
    }

    generateCodeReq = () => {
        const data = this.engine.getModel().serialize();
        axios.post('/codegen', data)
            .then(response => {
                console.log(response);
                console.log(response.data);
                download(response.data, "mlvp-generated-code.py")
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className={classes.FrontPage}>
                <TopNav newCanvas={this.newCanvas} open={this.openSave} save={this.downloadSave}
                        generateCodeReq={this.generateCodeReq} loadDemos={this.loadDemos()}/>
                <div className={classes.Container}>
                    <SideBar catAndNames={this.loadMapCategoryNodes()} format={this.dragDropFormat}/>
                    <Canvas dragDropFormat={this.dragDropFormat} engine={this.engine}/>
                </div>
                <BottomNav problems={this.state.problems}/>
            </div>
        );
    }

}


export default App;
