import React from 'react';
import './App.css';
import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel,
  DiagramEngine
} from '@projectstorm/react-diagrams';
import {CanvasWidget} from '@projectstorm/react-canvas-core';

interface AppProps {

}

type MyProps = {  };
type MyState = {
  engine: DiagramEngine,
  nodes: DefaultNodeModel[]
};

class App extends React.Component<MyProps, MyState> {

  constructor(props:AppProps) {
    super(props);
    this.state = {
      engine: createEngine(),
      nodes: []
    }

    // node 1
    const node1 = new DefaultNodeModel({
      name: 'Node 1',
      color: 'rgb(0,192,255)',
    });
    const node3 = new DefaultNodeModel({
      /*name: 'afawf',
      color: 'rgb(0,192,255)'*/
    });
    node3.setPosition(200,200);
    node1.setPosition(100, 100);
    this.state.nodes[0] = node1;

    const node2 = new DefaultNodeModel({
      name: 'Node 1',
      color: 'rgb(0,192,255)',
    });
    node2.setPosition(100, 100);
    this.state.nodes[1] = node2;

    let port1 = node1.addOutPort('Out');
    let port2 = node2.addOutPort('Out');

    // link them and add a label to the link
    const link = port1.link<DefaultLinkModel>(port2);

    const model = new DiagramModel();
    model.addAll(node1, node2, link, node3);
    this.state.engine.setModel(model);

  }


  render() {


    return (
        <CanvasWidget className="diagram-container"  engine={this.state.engine} />


    );
  }
}


export default App;
