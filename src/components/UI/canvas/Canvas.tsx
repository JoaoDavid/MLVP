import React, {DragEvent} from 'react';
import {DiagramEngine} from "@projectstorm/react-diagrams";
import classes from "./Canvas.module.css";
import {AbstractReactFactory, CanvasWidget} from "@projectstorm/react-canvas-core";
import {NodeModel} from "@projectstorm/react-diagrams-core";
import {BaseNodeModel} from "../../core/BaseNode/BaseNodeModel";
import {AbstractDsFactory} from "../../nodes/data/import-dataset/abstract/AbstractDsFactory";
import {CSVFactory} from "../../nodes/data/import-dataset/csv/CSVFactory";
import {RandomForestClassifierFactory} from "../../nodes/model/classifier/random-forest-classifier/RandomForestClassifierFactory";
import {AccuracyClassifierFactory} from "../../nodes/evaluate/classifier/accuracy/AccuracyClassifierFactory";
import {SplitDatasetFactory} from "../../nodes/data/split-dataset/SplitDatasetFactory";
import {OversamplingFactory} from "../../nodes/data/oversampling/OversamplingFactory";
import {UndersamplingFactory} from "../../nodes/data/undersampling/UndersamplingFactory";
import {PCAFactory} from "../../nodes/data/principal-component-analysis/PCAFactory";
import {CrossValidationFactory} from "../../nodes/evaluate/cross-validation/CrossValidationFactory";
import {DatasetPortFactory} from "../../ports/dataset/DatasetPortFactory";
import {ClassifierPortFactory} from "../../ports/model/ClassifierPortFactory";

interface CanvasProps {
    dragDropFormat: string,
    engine: DiagramEngine,
}

type CanvasState = {

};

class Canvas extends React.Component<CanvasProps, CanvasState> {

    constructor(props: CanvasProps) {
        super(props);
        this.registerNodeFactories();
        this.registerPortFactories();
    }

    registerNodeFactories = () => {
        this.props.engine.getNodeFactories().registerFactory(AbstractDsFactory.getInstance());
        this.props.engine.getNodeFactories().registerFactory(CSVFactory.getInstance());
        this.props.engine.getNodeFactories().registerFactory(RandomForestClassifierFactory.getInstance());
        this.props.engine.getNodeFactories().registerFactory(OversamplingFactory.getInstance());
        this.props.engine.getNodeFactories().registerFactory(UndersamplingFactory.getInstance());
        this.props.engine.getNodeFactories().registerFactory(PCAFactory.getInstance());
        this.props.engine.getNodeFactories().registerFactory(AccuracyClassifierFactory.getInstance());
        this.props.engine.getNodeFactories().registerFactory(SplitDatasetFactory.getInstance());
        this.props.engine.getNodeFactories().registerFactory(CrossValidationFactory.getInstance());
    }

    registerPortFactories = () => {
        this.props.engine.getPortFactories().registerFactory(DatasetPortFactory.getInstance());
        this.props.engine.getPortFactories().registerFactory(ClassifierPortFactory.getInstance());
    }

    delDefaultFactory = () => {
        console.log(this.props.engine.getNodeFactories());
        console.log("....");
        //this.state.engine.getNodeFactories().deregisterFactory('default');
        console.log(this.props.engine.getNodeFactories().getFactories().forEach(factory => {
            console.log(factory.getType());
            console.log(factory);
        }));
        console.log("....");
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
            const factory = this.props.engine.getNodeFactories().getFactory(inJSON.codeName);
            const node = this.generateModel(factory);
            let point = this.props.engine.getRelativeMousePoint(event);
            node.setPosition(point);
            this.props.engine.getModel().addNode(node);
            this.props.engine.repaintCanvas();
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
                <CanvasWidget className={classes.DiagramContainer} engine={this.props.engine}/>
            </div>
        )
    }

}

export default Canvas;
