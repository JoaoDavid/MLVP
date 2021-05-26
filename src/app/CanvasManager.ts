import createEngine, {DiagramEngine} from "@projectstorm/react-diagrams";
import {FactoriesManager} from "./FactoriesManager";
import {TypeChecker, TypeCheckResponse} from "./typecheck/TypeChecker";
import {MyZoomCanvasAction} from "./actions/MyZoomCanvasAction";
import {DiagramStateManager} from "./states/DiagramStateManager";
import {MyDiagramModel} from "./diagram/MyDiagramModel";
import {BaseNodeModel} from "../components/core/BaseNode/BaseNodeModel";
import {DefaultLinkModel} from "@projectstorm/react-diagrams-defaults";
import {DragEvent} from "react";

export class CanvasManager {

    private readonly engine: DiagramEngine;
    private readonly typeChecker: TypeChecker;
    private readonly factoriesManager: FactoriesManager;
    private generated_nodes_counter = 0;
    private readonly canvasName: string;

    constructor(canvasName: string) {
        this.canvasName = canvasName;
        this.engine = createEngine({registerDefaultZoomCanvasAction: false});
        this.typeChecker = new TypeChecker(this.engine);
        this.engine.getActionEventBus().registerAction(new MyZoomCanvasAction());
        this.engine.getStateMachine().pushState(new DiagramStateManager(canvasName, this.typeChecker));
        this.engine.maxNumberPointsPerLink = 0;
        this.factoriesManager = new FactoriesManager(this.engine);
    }

    getEngine = (): DiagramEngine => {
        return this.engine;
    }

    getModel = (): MyDiagramModel => {
        return this.engine.getModel() as MyDiagramModel;
    }

    getTypeChecker = (): TypeChecker => {
        return this.typeChecker;
    }

    getCanvasName = (): string => {
        return this.canvasName;
    }

    registerNeuralNetworkCanvas = () => {
        this.factoriesManager.registerNeuralNetworkNodes();
        this.factoriesManager.registerPortFactories();
    }

    registerBasicMLCanvas = () => {
        this.factoriesManager.registerNodeFactories();
        this.factoriesManager.registerPortFactories();
    }

    newCanvas = (): MyDiagramModel => {
        const model = new MyDiagramModel();
        this.engine.setModel(model);
        this.generated_nodes_counter = 0;
        return model;
    }

    loadModel = (newModel) => {
        this.engine.getModel().deserializeModel(newModel, this.engine);
        this.engine.repaintCanvas();
        this.generated_nodes_counter = 0;
        this.typeChecker.requestTypeCheck(newModel);
    }

    processNodeAssertions = (mapNodeAssertions) => {
        const map = new Map<BaseNodeModel, string[]>();

        for (let k of Object.keys(mapNodeAssertions)) {
            const node = this.engine.getModel().getNode(k) as BaseNodeModel;
            map.set(node, mapNodeAssertions[k]);
        }
        return map;
    }

    processNodeColumns = (mapNodeColumns) => {
        for (let k of Object.keys(mapNodeColumns)) {
            const node = this.engine.getModel().getNode(k) as BaseNodeModel;
            node.setColumnsAndTypes(mapNodeColumns[k]);
        }
    }

    processLinkAssertions = (typeCheckResponse: TypeCheckResponse) => {
        const map = new Map<DefaultLinkModel, string[]>();

        for (let k of Object.keys(typeCheckResponse.linkAssertions)) {
            const link = this.engine.getModel().getLink(k) as DefaultLinkModel;
            console.log(link)
            map.set(link, typeCheckResponse.linkAssertions[k]);
        }
        return map;
    }

    onDropCanvas = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData(this.canvasName);
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


}
