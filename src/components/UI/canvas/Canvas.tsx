import React, {DragEvent} from 'react';
import {DiagramEngine, DiagramModel} from "@projectstorm/react-diagrams";
import classes from "./Canvas.module.css";
import {AbstractReactFactory, CanvasWidget} from "@projectstorm/react-canvas-core";
import {NodeModel} from "@projectstorm/react-diagrams-core";
import {BaseNodeModel} from "../../core/BaseNode/BaseNodeModel";
import {DiagramState} from "./states/DiagramState";
import {CSVFactory} from "../../nodes/data/import-dataset/csv/CSVFactory";
import {RandomForestClassifierFactory} from "../../nodes/model/classifier/random-forest-classifier/RandomForestClassifierFactory";
import {AccuracyClassifierFactory} from "../../nodes/evaluate/classifier/accuracy/AccuracyClassifierFactory";
import {SplitDatasetFactory} from "../../nodes/data/split-dataset/SplitDatasetFactory";
import {OversamplingFactory} from "../../nodes/data/oversampling/OversamplingFactory";
import {UndersamplingFactory} from "../../nodes/data/undersampling/UndersamplingFactory";
import {PCAFactory} from "../../nodes/data/principal-component-analysis/PCAFactory";
import {CrossValidationFactory} from "../../nodes/evaluate/cross-validation/CrossValidationFactory";

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



    constructor(props: CanvasProps) {
        super(props);
        this.state = {
            engine: props.engine,
            model: props.model,
        }
        this.state.engine.getStateMachine().pushState(new DiagramState());
        this.registerFactories();
    }

    registerFactories = () => {
        this.state.engine.getNodeFactories().registerFactory(CSVFactory.getInstance());
        this.state.engine.getNodeFactories().registerFactory(RandomForestClassifierFactory.getInstance());
        this.state.engine.getNodeFactories().registerFactory(OversamplingFactory.getInstance());
        this.state.engine.getNodeFactories().registerFactory(UndersamplingFactory.getInstance());
        this.state.engine.getNodeFactories().registerFactory(PCAFactory.getInstance());
        this.state.engine.getNodeFactories().registerFactory(AccuracyClassifierFactory.getInstance());
        this.state.engine.getNodeFactories().registerFactory(SplitDatasetFactory.getInstance());
        this.state.engine.getNodeFactories().registerFactory(CrossValidationFactory.getInstance());
    }


    generateModel<T extends AbstractReactFactory<NodeModel, DiagramEngine>>(factory: T): BaseNodeModel {
        return factory.generateModel({}) as BaseNodeModel;
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