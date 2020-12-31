import React from 'react';
import './App.css';
import createEngine, { DiagramModel, DiagramEngine } from '@projectstorm/react-diagrams';
import {CanvasWidget} from '@projectstorm/react-canvas-core';
import {CSVNodeModel} from "../components/nodes/data/import-dataset/csv/CSVNodeModel";
import {CSVNodeFactory} from "../components/nodes/data/import-dataset/csv/CSVNodeFactory";
import {BasePortFactory} from "../components/core/BasePort/BasePortFactory";
import {RandomForestNodeFactory} from '../components/nodes/model/random-forest/RandomForestNodeFactory';
import {RandomForestNodeModel} from '../components/nodes/model/random-forest/RandomForestNodeModel';
import {CoreNodeModel} from '../components/core/CoreNode/CoreNodeModel'

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
        this.state.engine.getPortFactories().registerFactory(new BasePortFactory());
    }

    addTestNodes = () => {
        let count = 10;
        //node2.setPosition(100, 100);
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
            <div>
                <button onClick={this.addNode}>Toggle</button>
                <CanvasWidget className="diagram-container" engine={this.state.engine}/>

            </div>
        );
    }

}


export default App;
