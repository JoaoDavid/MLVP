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
    }

    registerFactories = () => {
        this.state.engine.getNodeFactories().registerFactory(new CSVNodeFactory());
        this.state.engine.getNodeFactories().registerFactory(new RandomForestNodeFactory());
    }

    addTestNodes = () => {
        let count = 10;
        this.nodes.push(new CSVNodeModel());
        this.nodes.push(new CSVNodeModel());
        this.nodes.push(new RandomForestNodeModel());

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

    render() {
        return (
            <div className={classes.FrontPage}>
                <TopNav/>
                <div className={classes.Container}>
                    <CanvasWidget className={classes.DiagramContainer} engine={this.state.engine}/>
                </div>
            </div>
        );
    }

}


export default App;
