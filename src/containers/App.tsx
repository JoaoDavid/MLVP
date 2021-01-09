import React from 'react';
import classes from './App.module.css';
import createEngine, {DiagramModel, DiagramEngine} from '@projectstorm/react-diagrams';
import {CanvasWidget} from '@projectstorm/react-canvas-core';
import {CSVNodeModel} from "../components/nodes/data/import-dataset/csv/CSVNodeModel";
import {CSVNodeFactory} from "../components/nodes/data/import-dataset/csv/CSVNodeFactory";
import {RandomForestNodeFactory} from '../components/nodes/model/random-forest/RandomForestNodeFactory';
import {RandomForestNodeModel} from '../components/nodes/model/random-forest/RandomForestNodeModel';
import {CoreNodeModel} from '../components/core/CoreNode/CoreNodeModel'
import TopNav from '../components/UI/top-nav/TopNav';
import {AccuracyNodeFactory} from "../components/nodes/evaluate/accuracy/AccuracyNodeFactory";
import {AccuracyNodeModel} from "../components/nodes/evaluate/accuracy/AccuracyNodeModel";
import SideBar from "../components/UI/side-bar/SideBar";

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

    addTestNodes = () => {
        let count = 10;
        this.nodes.push(new CSVNodeModel());
        this.nodes.push(new CSVNodeModel());
        this.nodes.push(new RandomForestNodeModel());
        this.nodes.push(new AccuracyNodeModel());

        this.nodes.forEach((node: CoreNodeModel) => {
            this.state.model.addNode(node);
            node.setPosition(count, count);
            count += 130;
        });
    }

    addNode = () => {
        const node = new CSVNodeModel();
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

    render() {
        return (
            <div className={classes.FrontPage}>
                <TopNav/>
                <div className={classes.Container}>
                    <SideBar/>
                    <CanvasWidget className={classes.DiagramContainer} engine={this.state.engine}/>
                </div>

                <div>testing</div>
            </div>
        );
    }

}


export default App;
