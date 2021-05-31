import * as React from 'react';
import {VERTICAL_CONCATENATION, VerticalConcatenationModel} from './VerticalConcatenationModel';
import VerticalConcatenationWidget from './VerticalConcatenationWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class VerticalConcatenationFactory extends BaseNodeFactory<VerticalConcatenationModel, DiagramEngine> {

    private static INSTANCE: VerticalConcatenationFactory;

    private constructor() {
        super(VERTICAL_CONCATENATION.codeName);
    }

    static getInstance = () => {
        return VerticalConcatenationFactory.INSTANCE || (VerticalConcatenationFactory.INSTANCE = new VerticalConcatenationFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <VerticalConcatenationWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): VerticalConcatenationModel {
        return new VerticalConcatenationModel();
    }
}
