import React, {DragEvent} from 'react';
import {DiagramEngine, DiagramModel} from "@projectstorm/react-diagrams";
import classes from "./Canvas.module.css";
import {AbstractReactFactory, CanvasWidget} from "@projectstorm/react-canvas-core";
import {NodeModel} from "@projectstorm/react-diagrams-core";
import {CoreNodeModel} from "../core/CoreNode/CoreNodeModel";
import {DiagramState} from "../core/states/DiagramState";
import {CSVNodeFactory} from "../nodes/data/import-dataset/csv/CSVNodeFactory";
import {RandomForestNodeFactory} from "../nodes/model/random-forest/RandomForestNodeFactory";
import {AccuracyNodeFactory} from "../nodes/evaluate/accuracy/AccuracyNodeFactory";

interface CanvasProps {
    dragDropFormat: string,
    engine: DiagramEngine,
    model: DiagramModel,
}

type CanvasState = {
    engine: DiagramEngine,
    model: DiagramModel,
};

class Canvas extends React.Component<CanvasProps, CanvasState> {

    private nodes: CoreNodeModel[] = [];

    constructor(props: CanvasProps) {
        super(props);
        this.state = {
            engine: props.engine,
            model: props.model,
        }
        this.state.engine.getStateMachine().pushState(new DiagramState());
        this.registerFactories();
        this.addTestNodes();
    }

    registerFactories = () => {
        this.state.engine.getNodeFactories().registerFactory(CSVNodeFactory.getInstance());
        this.state.engine.getNodeFactories().registerFactory(RandomForestNodeFactory.getInstance());
        this.state.engine.getNodeFactories().registerFactory(AccuracyNodeFactory.getInstance());
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

    generateModel<T extends AbstractReactFactory<NodeModel, DiagramEngine>>(factory: T): CoreNodeModel {
        return factory.generateModel({}) as CoreNodeModel;
    }

    onDropDiagram = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData(this.props.dragDropFormat);
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
            <div className={classes.Container}
                 onDragOver={(event) => {
                     event.preventDefault()
                 }}
                 onDrop={this.onDropDiagram}
            >
                <CanvasWidget className={classes.DiagramContainer} engine={this.state.engine}/>
            </div>
        )
    }

}

export default Canvas;