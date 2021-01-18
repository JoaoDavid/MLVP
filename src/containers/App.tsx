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
import {DiagramState} from "../components/core/states/DiagramState";
import axios from "axios";
import download from 'js-file-download';
import BottomNav from "../components/UI/bottom-nav/BottomNav";

interface AppProps {

}

type AppState = {
    engine: DiagramEngine,
    model: DiagramModel
};

class App extends React.Component<AppProps, AppState> {

    private nodes: CoreNodeModel[] = [];
    private dragDropFormat: string = "side-bar-drag-drop";
    private lastSave: any = {};

    constructor(props: AppProps) {
        super(props);
        this.state = {
            engine: createEngine(),
            model: new DiagramModel()
        }
        this.registerFactories();
        this.state.engine.setModel(this.state.model);
        this.state.engine.getStateMachine().pushState(new DiagramState());
        this.addTestNodes();
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

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        const data = {
            title: "this.state.title",
            body: "this.state.content",
            author: "this.state.author"
        };
        axios.post('/foo', data)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
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

    openSave = () => {
        this.state.model.deserializeModel(this.lastSave, this.state.engine);
        this.state.engine.repaintCanvas();
    }

    downloadSave = () => {
        this.lastSave = this.state.model.serialize();
        download(JSON.stringify(this.lastSave, null, 4), 'mlvp.json');
        console.log(this.lastSave);
        console.log(JSON.stringify(this.lastSave, null, 4));
    }

    render() {
        return (
            <div className={classes.FrontPage}>
                <TopNav open={this.openSave} save={this.downloadSave}/>
                <div className={classes.Container}>
                    <SideBar catAndNames={this.loadMapCategoryNodes()} format={this.dragDropFormat}/>
                    <div className={classes.Container}
                         onDragOver={(event) => {
                             event.preventDefault()
                         }}
                         onDrop={this.onDropDiagram}
                    >
                        <CanvasWidget className={classes.DiagramContainer} engine={this.state.engine}/>
                    </div>
                </div>
                <BottomNav/>
            </div>
        );
    }

}


export default App;
