import { DatasetPortModel } from './DatasetPortModel';
import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class DatasetPortFactory extends AbstractModelFactory<DatasetPortModel, DiagramEngine> {


    private static INSTANCE: DatasetPortFactory;

    constructor() {
        super('DatasetPort');
    }

    static getInstance = () => {
        return DatasetPortFactory.INSTANCE || (DatasetPortFactory.INSTANCE = new DatasetPortFactory());
    }

    generateModel(): DatasetPortModel {
        return new DatasetPortModel(false);
    }
}
