import { LayerPortModel, OPTIMIZER_PORT } from './LayerPortModel';
import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class LayerPortFactory extends AbstractModelFactory<LayerPortModel, DiagramEngine> {


    private static INSTANCE: LayerPortFactory;

    constructor() {
        super(OPTIMIZER_PORT);
    }

    static getInstance = () => {
        return LayerPortFactory.INSTANCE || (LayerPortFactory.INSTANCE = new LayerPortFactory());
    }

    generateModel(): LayerPortModel {
        return new LayerPortModel(false);
    }
}
