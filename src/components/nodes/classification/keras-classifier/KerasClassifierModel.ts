import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {ClassifierPortModel} from "../../../ports/model/ClassifierPortModel";
import createEngine, {DiagramEngine} from "@projectstorm/react-diagrams";
import {DragEvent} from "react";
import {MyDiagramModel} from "../../../../app/diagram/MyDiagramModel";
import {FactoriesManager} from "../../../../app/FactoriesManager";
import {MyZoomCanvasAction} from "../../../../app/actions/MyZoomCanvasAction";
import {DiagramStateManager} from "../../../../app/states/DiagramStateManager";
import {TypeChecker} from "../../../../app/typecheck/TypeChecker";

export const KERAS_CLASSIFIER: NodeConfig = {
    codeName: "KerasClassifier",
    name: "Keras Classifier",
}

export class KerasClassifierModel extends BaseNodeModel {

    private readonly dragDropFormat: string = "neural_network";
    private readonly engine: DiagramEngine;
    private model: MyDiagramModel;
    private readonly factoriesManager: FactoriesManager;
    private readonly typeChecker: TypeChecker;
    private generated_nodes_counter = 0;

    constructor() {
        super(KERAS_CLASSIFIER);
        this.addInPort();
        this.addOutPort();

        this.engine = createEngine({registerDefaultZoomCanvasAction: false});
        this.typeChecker = new TypeChecker(this.engine);
        this.factoriesManager = new FactoriesManager(this.engine);
        this.startUp();
    }

    startUp = () => {
        this.factoriesManager.registerNeuralNetworkNodes();
        this.factoriesManager.registerPortFactories();
        this.newCanvas();
        this.engine.getActionEventBus().registerAction(new MyZoomCanvasAction());
        this.engine.getStateMachine().pushState(new DiagramStateManager("neural-network-canvas", this.typeChecker));
        this.engine.maxNumberPointsPerLink = 0;
    }

    newCanvas = () => {
        const model = new MyDiagramModel();
        this.model = model;
        this.engine.setModel(model);
        this.generated_nodes_counter = 0;
    }

    onDropCanvas = (event: DragEvent<HTMLDivElement>) => {
        this.engine.getLinkFactories()
        event.preventDefault();
        const data = event.dataTransfer.getData(this.dragDropFormat);
        try {
            const inJSON = JSON.parse(data);
            // data = {"codeName":"...","name":"..."}
            const factory = this.engine.getNodeFactories().getFactory(inJSON.codeName);
            const node = factory.generateModel({}) as BaseNodeModel;
            let point = this.engine.getRelativeMousePoint(event);
            node.setPosition(point);
            node.setTitle(node.getTitle() + " " + ++this.generated_nodes_counter);
            this.engine.getModel().addNode(node);
            this.engine.repaintCanvas();
            this.typeChecker.requestTypeCheck();
        } catch (e) {
            console.log(e);
        }
    }

    getEngine(): DiagramEngine {
        return this.engine;
    }

    getModel(): MyDiagramModel {
        return this.model;
    }

    getTypeChecker(): TypeChecker {
        return this.typeChecker;
    }

    getDragDropFormat(): string {
        return this.dragDropFormat;
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
    }

    serialize(): any {
        return {
            ...super.serialize(),
        };
    }

}
