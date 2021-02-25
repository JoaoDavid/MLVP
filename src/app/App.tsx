import React from 'react';
import classes from './App.module.css';
import createEngine, {DiagramEngine, DiagramModel} from '@projectstorm/react-diagrams';
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
import {CSVFactory} from "../components/nodes/data/import-dataset/csv/CSVFactory";
import {RandomForestClassifierFactory} from "../components/nodes/model/classifier/random-forest-classifier/RandomForestClassifierFactory";
import {AccuracyClassifierFactory} from "../components/nodes/evaluate/classifier/accuracy/AccuracyClassifierFactory";
import {BaseNodeModel} from "../components/core/BaseNode/BaseNodeModel";
import {AbstractReactFactory} from "@projectstorm/react-canvas-core";
import {NodeModel} from "@projectstorm/react-diagrams-core";
import {SplitDatasetFactory} from "../components/nodes/data/split-dataset/SplitDatasetFactory";
import {MyDiagramModel} from "../components/UI/canvas/diagram/MyDiagramModel";
import {OversamplingFactory} from "../components/nodes/data/oversampling/OversamplingFactory";
import {UndersamplingFactory} from "../components/nodes/data/undersampling/UndersamplingFactory";
import {PCAFactory} from "../components/nodes/data/principal-component-analysis/PCAFactory";
import {CrossValidationFactory} from "../components/nodes/evaluate/cross-validation/CrossValidationFactory";
import splitEvaluate from '../demos/split-n-evaluate.json';
import testJson from '../demos/test.json';
import {DatasetPortFactory} from "../components/ports/dataset/DatasetPortFactory";
import {ClassifierPortFactory} from "../components/ports/model/ClassifierPortFactory";

interface AppProps {

}

type AppState = {
    engine: DiagramEngine,
};

class App extends React.Component<AppProps, AppState> {
    private nodes: BaseNodeModel[] = [];
    private dragDropFormat: string = "side-bar-drag-drop";
    private lastSave: any = {};

    constructor(props: AppProps) {
        super(props);
        this.state = {
            engine: createEngine(),
        }
        this.registerFactories();
        this.registerPortFactories();
        this.state.engine.setModel(new MyDiagramModel());
    }

    registerFactories = () => {
        this.nodes.push(this.generateModel(CSVFactory.getInstance()));
        this.nodes.push(this.generateModel(OversamplingFactory.getInstance()));
        this.nodes.push(this.generateModel(UndersamplingFactory.getInstance()));
        this.nodes.push(this.generateModel(PCAFactory.getInstance()));
        this.nodes.push(this.generateModel(SplitDatasetFactory.getInstance()));
        this.nodes.push(this.generateModel(RandomForestClassifierFactory.getInstance()));
        this.nodes.push(this.generateModel(AccuracyClassifierFactory.getInstance()));
        this.nodes.push(this.generateModel(CrossValidationFactory.getInstance()));
    }

    registerPortFactories = () => {
        this.state.engine.getPortFactories().registerFactory(DatasetPortFactory.getInstance());
        this.state.engine.getPortFactories().registerFactory(ClassifierPortFactory.getInstance());
    }

    generateModel<T extends AbstractReactFactory<NodeModel, DiagramEngine>>(factory: T): BaseNodeModel {
        return factory.generateModel({}) as BaseNodeModel;
    }

    delDefaultFactory = () => {
        console.log(this.state.engine.getNodeFactories());
        console.log("....");
        //this.state.engine.getNodeFactories().deregisterFactory('default');
        console.log(this.state.engine.getNodeFactories().getFactories().forEach(factory => {
            console.log(factory.getType());
            console.log(factory);
        }));
        console.log("....");
    }

    loadDemos = () => {
        const map = new Map<String, ()=>void>();
        map.set("Simple Pipeline", ()=>{

      /*      const newModel = new MyDiagramModel()
            this.state.engine.setModel(newModel);*/
            const diagram: any = splitEvaluate;
            this.state.engine.getModel().deserializeModel(diagram, this.state.engine);
            this.state.engine.repaintCanvas();
        });
        map.set("Test", ()=>{
            this.loadDemoAux(testJson);
        });
        return map;
    }

    loadDemoAux = (diagram: any) => {
        // this.newCanvas();
        console.log("1")
        this.state.engine.getModel().deserializeModel(diagram, this.state.engine);
        this.state.engine.repaintCanvas();
        console.log("2")
        console.log("3")
    }

    loadMapCategoryNodes = () => {
        const map = new Map<CategoryConfig, NodeConfig[]>();
        map.set(DATA_CONFIG, DATA_NODES);
        map.set(MODEL_CONFIG, MODEL_NODES);
        map.set(EVALUATE_CONFIG, EVALUATE_NODES);
        return map;
    }

    newCanvas = () => {
        const newModel = new MyDiagramModel()
        this.state.engine.setModel(newModel);
    }

    openSave = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList.length > 0) {
            event.target.files[0].text().then((text: string) => {
                this.state.engine.getModel().deserializeModel(JSON.parse(text), this.state.engine);
                this.state.engine.repaintCanvas();
            });
        }
        event.target.value = "";
    }

    downloadSave = () => {
        this.lastSave = this.state.engine.getModel().serialize();
        download(JSON.stringify(this.lastSave, null, 4), 'mlvp.json');
        console.log(this.lastSave);
        console.log(JSON.stringify(this.lastSave, null, 4));
    }

    generateCodeReq = () => {
        const data = this.state.engine.getModel().serialize();
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
                    <Canvas dragDropFormat={this.dragDropFormat} engine={this.state.engine} model={this.state.engine.getModel()}/>
                </div>
                <BottomNav sendReq={this.generateCodeReq}/>
            </div>
        );
    }

}


export default App;
