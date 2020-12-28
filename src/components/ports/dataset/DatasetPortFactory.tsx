import { DatasetPortModel } from './DatasetPortModel';
import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class DatasetPortFactory extends AbstractModelFactory<DatasetPortModel, DiagramEngine> {
    constructor() {
        super('port-dataset');
    }

    generateModel(): DatasetPortModel {
        return new DatasetPortModel({
            name: 'port-dataset'
        });
    }
}
