import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {RegressorPortModel} from "../../../ports/model/RegressorPortModel";
import {DiagramEngine} from "@projectstorm/react-diagrams";
import {MyDiagramModel} from "../../../../app/diagram/MyDiagramModel";
import {TypeChecker} from "../../../../app/typecheck/TypeChecker";
import {CanvasManager} from "../../../../app/CanvasManager";

export const KERAS_REGRESSOR: NodeConfig = {
    codeName: "KerasRegressor",
    name: "Keras Regressor",
}

export class KerasRegressorModel extends BaseNodeModel {

    private epochs: number = 100; //int
    private batchSize: number = 500; //int
    private verbose: number = 0; //int
    private readonly canvasManager = new CanvasManager("neural_network");

    constructor() {
        super(KERAS_REGRESSOR);
        this.addInPort();
        this.addOutPort();

        this.canvasManager.registerNeuralNetworkCanvas();
        this.canvasManager.newCanvas();
    }

    getEpochs(): number {
        return this.epochs;
    }

    setEpochs(value: number) {
        this.epochs = value;
    }

    getBatchSize(): number {
        return this.batchSize;
    }

    setBatchSize(value: number) {
        this.batchSize = value;
    }

    getVerbose(): number {
        return this.verbose;
    }

    setVerbose(value: number) {
        this.verbose = value;
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
        const p = new RegressorPortModel(false);
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.epochs = event.data.epochs;
        this.batchSize = event.data.batchSize;
        this.verbose = event.data.verbose;
        this.canvasManager.loadModel(event.data.canvas);
    }

    serialize(): any {
        return {
            ...super.serialize(),
            epochs: this.epochs,
            batchSize: this.batchSize,
            verbose: this.verbose,
            canvas: this.canvasManager.getEngine().getModel().serialize(),
        };
    }

}
