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

    private readonly engine: DiagramEngine;
    private readonly factoriesManager: FactoriesManager;
    private readonly typeChecker: TypeChecker;

    constructor() {
        super(KERAS_CLASSIFIER);
        this.addInPort();
        this.addOutPort();
        // const model = new MyDiagramModel();
        // this.engine.setModel(model);
        this.engine = createEngine({registerDefaultZoomCanvasAction: false});
        this.typeChecker = new TypeChecker(this.engine);
        this.factoriesManager = new FactoriesManager(this.engine);
        this.startUp();
        console.log(this.engine.getLinkFactories());
    }

    startUp = () => {
        this.factoriesManager.registerNeuralNetworkNodes();
        this.factoriesManager.registerPortFactories();
        this.newCanvas();
        this.engine.getActionEventBus().registerAction(new MyZoomCanvasAction());
        this.engine.getStateMachine().pushState(new DiagramStateManager(this.typeChecker));
        this.engine.maxNumberPointsPerLink = 0;
    }

    newCanvas = () => {
        const model = new MyDiagramModel();
        this.engine.setModel(model);
/*        this.registerListeners(model);
        this.generated_nodes_counter = 0;
        this.updateLog("New canvas");
        this.setState({
            unsatNodeAssertions: new Map(),
            allNodeAssertions: new Map(),
            allLinkAssertions: new Map(),
        });*/
    }

    getEngine(): DiagramEngine {
        return this.engine;
    }

    onDropCanvas = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        try {

        } catch (e) {
            console.log(e);
        }
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
