import { DatasetPortModel } from './DatasetPortModel';
import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class DefaultPortFactory extends AbstractModelFactory<DatasetPortModel, DiagramEngine> {
    constructor() {
        super('default');
    }

    generateModel(): DatasetPortModel {
        return new DatasetPortModel({
            name: 'unknown'
        });
    }
}
