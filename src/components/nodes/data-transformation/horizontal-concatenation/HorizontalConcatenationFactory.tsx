import * as React from 'react';
import {HORIZONTAL_CONCATENATION, HorizontalConcatenationModel} from './HorizontalConcatenationModel';
import HorizontalConcatenationWidget from './HorizontalConcatenationWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class HorizontalConcatenationFactory extends BaseNodeFactory<HorizontalConcatenationModel, DiagramEngine> {

    private static INSTANCE: HorizontalConcatenationFactory;

    private constructor() {
        super(HORIZONTAL_CONCATENATION.codeName);
    }

    static getInstance = () => {
        return HorizontalConcatenationFactory.INSTANCE || (HorizontalConcatenationFactory.INSTANCE = new HorizontalConcatenationFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <HorizontalConcatenationWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): HorizontalConcatenationModel {
        return new HorizontalConcatenationModel();
    }
}
