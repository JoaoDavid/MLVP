import React from 'react';
import './App.css';
import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel,
  DiagramEngine
} from '@projectstorm/react-diagrams';
import {CanvasWidget} from '@projectstorm/react-canvas-core';
import {CSVNodeModel} from "../components/nodes/data/import-dataset/csv/CSVNodeModel";
import {CSVNodeFactory} from "../components/nodes/data/import-dataset/csv/CSVNodeFactory";
import {BasePortFactory} from "../components/ports/base/BasePortFactory";
import {RandomForestNodeFactory} from '../components/nodes/model/random-forest/RandomForestNodeFactory';
import {RandomForestNodeModel} from '../components/nodes/model/random-forest/RandomForestNodeModel';

interface AppProps {

}

type MyProps = {  };
type MyState = {
  engine: DiagramEngine,
  model: DiagramModel
};

class App extends React.Component<MyProps, MyState> {

  constructor(props:AppProps) {
    super(props);
    this.state = {
      engine: createEngine(),
      model: new DiagramModel()
    }
    this.state.engine.getNodeFactories().registerFactory(new CSVNodeFactory()); // i cant figure out why
    this.state.engine.getNodeFactories().registerFactory(new RandomForestNodeFactory());
    this.state.engine.getPortFactories().registerFactory(new BasePortFactory());

    // node 1
    const node1 = new DefaultNodeModel({
      name: 'Node 1',
      color: 'rgb(0,192,255)',

    });

    node1.setPosition(100, 100);

    const node2 = new DefaultNodeModel({
      name: 'Node 2',
      color: 'rgb(78,29,212)',
    });
    //node2.setPosition(100, 100);

    let port1 = node1.addOutPort('Out');
    let port12 = node1.addOutPort('Out12');
    let port132 = node1.addInPort('in');
    let port2 = node2.addInPort('In');

    // link them and add a label to the link
    //const link = port1.link<DefaultLinkModel>(port2);
    const node3 = new CSVNodeModel();
    const node4 = new CSVNodeModel();
    const node5 = new RandomForestNodeModel();

    this.state.model.addAll(node1 , node2, node3, node4, node5);//, link);
    this.state.engine.setModel(this.state.model);

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
          <CanvasWidget className="diagram-container"  engine={this.state.engine}  />

        </div>


    );
  }
}


export default App;
