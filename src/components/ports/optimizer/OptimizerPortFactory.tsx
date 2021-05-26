import { OptimizerPortModel, OPTIMIZER_PORT } from './OptimizerPortModel';
import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class OptimizerPortFactory extends AbstractModelFactory<OptimizerPortModel, DiagramEngine> {


    private static INSTANCE: OptimizerPortFactory;

    constructor() {
        super(OPTIMIZER_PORT);
    }

    static getInstance = () => {
        return OptimizerPortFactory.INSTANCE || (OptimizerPortFactory.INSTANCE = new OptimizerPortFactory());
    }

    generateModel(): OptimizerPortModel {
        return new OptimizerPortModel(false);
    }
}
