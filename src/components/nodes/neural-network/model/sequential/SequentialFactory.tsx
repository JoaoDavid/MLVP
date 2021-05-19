import * as React from 'react';
import {SEQUENTIAL, SequentialModel} from './SequentialModel';
import SequentialWidget from './SequentialWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../../core/BaseNode/BaseNodeFactory";


export class SequentialFactory extends BaseNodeFactory<SequentialModel, DiagramEngine> {

    private static INSTANCE: SequentialFactory;

    private constructor() {
        super(SEQUENTIAL.codeName);
    }

    static getInstance = () => {
        return SequentialFactory.INSTANCE || (SequentialFactory.INSTANCE = new SequentialFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <SequentialWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): SequentialModel {
        return new SequentialModel();
    }
}
