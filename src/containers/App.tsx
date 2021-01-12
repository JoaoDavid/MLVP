import React, {DragEvent} from 'react';
import classes from './App.module.css';
import createEngine, {DiagramEngine, DiagramModel} from '@projectstorm/react-diagrams';
import {AbstractReactFactory, CanvasWidget} from '@projectstorm/react-canvas-core';
import {CSVNodeFactory} from "../components/nodes/data/import-dataset/csv/CSVNodeFactory";
import {RandomForestNodeFactory} from '../components/nodes/model/random-forest/RandomForestNodeFactory';
import {CoreNodeModel} from '../components/core/CoreNode/CoreNodeModel'
import TopNav from '../components/UI/top-nav/TopNav';
import {AccuracyNodeFactory} from "../components/nodes/evaluate/accuracy/AccuracyNodeFactory";
import SideBar from "../components/UI/side-bar/SideBar";
import {CategoryConfig, NodeConfig} from "../components/nodes/Config";
import {DATA_CONFIG, DATA_NODES} from "../components/nodes/data/DataConfig";
import {MODEL_CONFIG, MODEL_NODES} from "../components/nodes/model/ModelConfig";
import {EVALUATE_CONFIG, EVALUATE_NODES} from "../components/nodes/evaluate/EvaluateConfig";
import {NodeModel} from "@projectstorm/react-diagrams-core";
import { DiagramState } from "../components/core/states/DiagramState";

interface AppProps {

}

type AppState = {
    engine: DiagramEngine,
    model: DiagramModel,
    engine2: DiagramEngine,
    model2: DiagramModel,
};

class App extends React.Component<AppProps, AppState> {

    private nodes: CoreNodeModel[] = [];
    private nodes2: CoreNodeModel[] = [];
    private dragDropFormat: string = "side-bar-drag-drop";
    private lastSave:any = {};

    constructor(props: AppProps) {
        super(props);
        this.state = {
            engine: createEngine(),
            model: new DiagramModel(),
            engine2: createEngine(),
            model2: new DiagramModel(),
        }
        this.registerFactories();
        this.state.engine.setModel(this.state.model);
        this.state.engine.getStateMachine().pushState(new DiagramState());
        this.addTestNodes();
        this.prepareEngine(this.state.engine2, this.state.model2);
    }

    prepareEngine = (engine: DiagramEngine, model: DiagramModel) => {
        engine.setModel(model);
        engine.getStateMachine().pushState(new DiagramState());
        this.nodes2.push(this.generateModel(CSVNodeFactory.getInstance()));
        this.nodes2.push(this.generateModel(CSVNodeFactory.getInstance()));
        this.nodes2.push(this.generateModel(RandomForestNodeFactory.getInstance()));
        this.nodes2.push(this.generateModel(AccuracyNodeFactory.getInstance()));
        let count = 20;
        this.nodes2.forEach((node: CoreNodeModel) => {
            model.addNode(node);
            node.setPosition(count, count);
            count += 200;
        });
        engine.getNodeFactories().registerFactory(CSVNodeFactory.getInstance());
        engine.getNodeFactories().registerFactory(RandomForestNodeFactory.getInstance());
        engine.getNodeFactories().registerFactory(AccuracyNodeFactory.getInstance());
    }

    registerFactories = () => {
        this.state.engine.getNodeFactories().registerFactory(CSVNodeFactory.getInstance());
        this.state.engine.getNodeFactories().registerFactory(RandomForestNodeFactory.getInstance());
        this.state.engine.getNodeFactories().registerFactory(AccuracyNodeFactory.getInstance());
    }

    generateModel<T extends AbstractReactFactory<NodeModel, DiagramEngine>>(factory: T): CoreNodeModel {
        return factory.generateModel({}) as CoreNodeModel;
    }

    addTestNodes = () => {
        let count = 10;
        this.nodes.push(this.generateModel(CSVNodeFactory.getInstance()));
        this.nodes.push(this.generateModel(CSVNodeFactory.getInstance()));
        this.nodes.push(this.generateModel(RandomForestNodeFactory.getInstance()));
        this.nodes.push(this.generateModel(AccuracyNodeFactory.getInstance()));

        this.nodes.forEach((node: CoreNodeModel) => {
            this.state.model.addNode(node);
            node.setPosition(count, count);
            count += 130;
        });
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

    loadMapCategoryNodes = () => {
        const map = new Map<CategoryConfig, NodeConfig[]>();
        map.set(DATA_CONFIG, DATA_NODES);
        map.set(MODEL_CONFIG, MODEL_NODES);
        map.set(EVALUATE_CONFIG, EVALUATE_NODES);
        return map;
    }

    onDropDiagram = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData(this.dragDropFormat);
        try {
            const inJSON = JSON.parse(data);
            console.log(data);
            const factory = this.state.engine.getNodeFactories().getFactory(inJSON.codeName);
            const node = this.generateModel(factory);
            let point = this.state.engine.getRelativeMousePoint(event);
            node.setPosition(point);
            this.state.engine.getModel().addNode(node);
            this.state.engine.repaintCanvas();
        } catch (e) {
            //console.log(e);
        }
    }

    render() {
        return (
            <div className={classes.FrontPage}>
                <TopNav/>
                <div className={classes.Container}>
                    <SideBar catAndNames={this.loadMapCategoryNodes()} format={this.dragDropFormat}/>
                    <div className={classes.Container}
                         onDragOver={(event) => {
                             event.preventDefault()
                         }}
                         onDrop={this.onDropDiagram}
                    >
                        <CanvasWidget className={classes.DiagramContainer} engine={this.state.engine}/>
                        <CanvasWidget className={classes.DiagramContainer} engine={this.state.engine2}/>

                    </div>
                </div>
                <div>
                    <button onClick={()=>{
                        this.lastSave = this.state.model.serialize();
                        console.log(this.lastSave);
                        console.log(JSON.stringify(this.lastSave));
                    }}>Save(serialize)</button>
                    <button onClick={()=>{
                        this.state.model.deserializeModel(this.lastSave, this.state.engine);
                        this.state.engine.repaintCanvas();
                    }}>Load(deserialize)</button>
                    testing
                </div>
            </div>
        );
    }

}


export default App;
