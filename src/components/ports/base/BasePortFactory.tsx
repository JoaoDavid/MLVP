import { BasePortModel } from './BasePortModel';
import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class BasePortFactory extends AbstractModelFactory<BasePortModel, DiagramEngine> {
    constructor() {
        super('port-base');
    }

    generateModel(): BasePortModel {
        return new BasePortModel({
            name: 'port-base'
        });
    }
}
