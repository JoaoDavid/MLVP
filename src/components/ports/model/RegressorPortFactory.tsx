import { RegressorPortModel, REGRESSOR_PORT } from './RegressorPortModel';
import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class RegressorPortFactory extends AbstractModelFactory<RegressorPortModel, DiagramEngine> {


    private static INSTANCE: RegressorPortFactory;

    constructor() {
        super(REGRESSOR_PORT);
    }

    static getInstance = () => {
        return RegressorPortFactory.INSTANCE || (RegressorPortFactory.INSTANCE = new RegressorPortFactory());
    }

    generateModel(): RegressorPortModel {
        return new RegressorPortModel(false);
    }
}
