import { BasePortModel } from './BasePortModel';
import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class DefaultPortFactory extends AbstractModelFactory<BasePortModel, DiagramEngine> {
    constructor() {
        super('default');
    }

    generateModel(): BasePortModel {
        return new BasePortModel({
            name: 'unknown'
        });
    }
}
