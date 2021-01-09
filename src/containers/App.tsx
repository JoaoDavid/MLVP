import React from 'react';
import classes from './App.module.css';
import createEngine, {DiagramEngine, DiagramModel} from '@projectstorm/react-diagrams';
import {CanvasWidget} from '@projectstorm/react-canvas-core';
import {CSVNodeFactory} from "../components/nodes/data/import-dataset/csv/CSVNodeFactory";
import {RandomForestNodeFactory} from '../components/nodes/model/random-forest/RandomForestNodeFactory';
import {CoreNodeModel} from '../components/core/CoreNode/CoreNodeModel'
import TopNav from '../components/UI/top-nav/TopNav';
import {AccuracyNodeFactory} from "../components/nodes/evaluate/accuracy/AccuracyNodeFactory";
import SideBar from "../components/UI/side-bar/SideBar";
import {CoreNodeFactory} from "../components/core/CoreNode/CoreNodeFactory";
import {CategoryConfig, NodeConfig} from "../components/nodes/Config";
import {DATA_CONFIG, NODE_CSV} from "../components/nodes/data/DataConfig";
import {MODEL_CONFIG, NODE_RANDOM_FOREST} from "../components/nodes/model/ModelConfig";
import {EVALUATE_CONFIG, NODE_ACCURACY} from "../components/nodes/evaluate/EvaluateConfig";

interface AppProps {

}

type AppState = {
    engine: DiagramEngine,
    model: DiagramModel
};

class App extends React.Component<AppProps, AppState> {

    private nodes: CoreNodeModel[] = [];

    constructor(props: AppProps) {
        super(props);
        this.state = {
            engine: createEngine(),
            model: new DiagramModel()
        }
        this.registerFactories();
        this.state.engine.setModel(this.state.model);
        this.addTestNodes();
        this.delDefaultFactory();
    }

    registerFactories = () => {
        this.state.engine.getNodeFactories().registerFactory(CSVNodeFactory.getInstance());
        this.state.engine.getNodeFactories().registerFactory(RandomForestNodeFactory.getInstance());
        this.state.engine.getNodeFactories().registerFactory(AccuracyNodeFactory.getInstance());
    }

    generateModel<T extends CoreNodeFactory<CoreNodeModel, DiagramEngine>>(factory: T): CoreNodeModel {
        return factory.generateModel({});
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

    addNode = () => {
        const node = this.generateModel(CSVNodeFactory.getInstance());
        this.state.model.addNode(node);
        this.state.engine.repaintCanvas();
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
        map.set(DATA_CONFIG, [NODE_CSV]);
        map.set(MODEL_CONFIG, [NODE_RANDOM_FOREST]);
        map.set(EVALUATE_CONFIG, [NODE_ACCURACY]);
        return map;
    }

    render() {
        return (
            <div className={classes.FrontPage}>
                <TopNav/>
                <div className={classes.Container}>
                    <SideBar catAndNames={this.loadMapCategoryNodes()}/>
                    <CanvasWidget className={classes.DiagramContainer} engine={this.state.engine}/>
                </div>
                <div>testing</div>
            </div>
        );
    }

}


export default App;
