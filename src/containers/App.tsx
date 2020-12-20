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
  model: DiagramModel
};

class App extends React.Component<MyProps, MyState> {

  constructor(props:AppProps) {
    super(props);
    this.state = {
      engine: createEngine(),
      model: new DiagramModel()
    }

    // node 1
    const node1 = new DefaultNodeModel({
      name: 'Node 1',
      color: 'rgb(0,192,255)',

    });

    node1.setPosition(100, 100);

    const node2 = new DefaultNodeModel({
      name: 'Node 2',
      color: 'rgb(0,192,255)',
    });
    //node2.setPosition(100, 100);

    let port1 = node1 .addOutPort('Out');
    let port12 = node1 .addOutPort('Out12');
    let port2 = node2.addInPort('In');

    // link them and add a label to the link
    //const link = port1.link<DefaultLinkModel>(port2);


    this.state.model.addAll(node1 , node2);//, link);
    this.state.engine.setModel(this.state.model);

  }

  addNode = () => {
    const node = new DefaultNodeModel({
      name: 'Node 3',
      color: 'rgb(0,192,255)',
    });
    this.state.model.addNode(node);
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
