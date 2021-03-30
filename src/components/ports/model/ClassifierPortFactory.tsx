import { ClassifierPortModel } from './ClassifierPortModel';
import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class ClassifierPortFactory extends AbstractModelFactory<ClassifierPortModel, DiagramEngine> {


    private static INSTANCE: ClassifierPortFactory;

    constructor() {
        super('ModelPort');
    }

    static getInstance = () => {
        return ClassifierPortFactory.INSTANCE || (ClassifierPortFactory.INSTANCE = new ClassifierPortFactory());
    }

    generateModel(): ClassifierPortModel {
        return new ClassifierPortModel(false);
    }
}
