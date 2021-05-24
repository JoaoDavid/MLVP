import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {ClassifierPortModel} from "../../../ports/model/ClassifierPortModel";
import {DiagramEngine} from "@projectstorm/react-diagrams";
import {MyDiagramModel} from "../../../../app/diagram/MyDiagramModel";
import {TypeChecker} from "../../../../app/typecheck/TypeChecker";
import {CanvasManager} from "../../../../app/CanvasManager";

export const KERAS_CLASSIFIER: NodeConfig = {
    codeName: "KerasClassifier",
    name: "Keras Classifier",
}

export class KerasClassifierModel extends BaseNodeModel {

    private readonly canvasManager = new CanvasManager("neural_network");

    constructor() {
        super(KERAS_CLASSIFIER);
        this.addInPort();
        this.addOutPort();

        this.canvasManager.registerNeuralNetworkCanvas();
        this.canvasManager.newCanvas();
    }

    getCanvasManager(): CanvasManager {
        return this.canvasManager;
    }

    getEngine(): DiagramEngine {
        return this.canvasManager.getEngine();
    }

    getModel(): MyDiagramModel {
        return this.canvasManager.getEngine().getModel() as MyDiagramModel;
    }

    getTypeChecker(): TypeChecker {
        return this.canvasManager.getTypeChecker();
    }

    getDragDropFormat(): string {
        return this.canvasManager.getCanvasName();
    }

    protected addInPort(): void {
        const p = new DatasetPortModel(true);
        super.addPort(p);
    }

    protected addOutPort(): void {
        const p = new ClassifierPortModel(false);
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.canvasManager.loadModel(event.data.canvas);
    }

    serialize(): any {
        return {
            ...super.serialize(),
            canvas: this.canvasManager.getEngine().getModel().serialize(),
        };
    }

}
