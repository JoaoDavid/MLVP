import * as React from 'react';
import {DENSE, DenseModel} from './DenseModel';
import DenseWidget from './DenseWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../../core/BaseNode/BaseNodeFactory";


export class DenseFactory extends BaseNodeFactory<DenseModel, DiagramEngine> {

    private static INSTANCE: DenseFactory;

    private constructor() {
        super(DENSE.codeName);
    }

    static getInstance = () => {
        return DenseFactory.INSTANCE || (DenseFactory.INSTANCE = new DenseFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <DenseWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): DenseModel {
        return new DenseModel();
    }
}
