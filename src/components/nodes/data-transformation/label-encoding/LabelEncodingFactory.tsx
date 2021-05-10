import * as React from 'react';
import {LABEL_ENCODING, LabelEncodingModel} from './LabelEncodingModel';
import LabelEncodingWidget from './LabelEncodingWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class LabelEncodingFactory extends BaseNodeFactory<LabelEncodingModel, DiagramEngine> {

    private static INSTANCE: LabelEncodingFactory;

    private constructor() {
        super(LABEL_ENCODING.codeName);
    }

    static getInstance = () => {
        return LabelEncodingFactory.INSTANCE || (LabelEncodingFactory.INSTANCE = new LabelEncodingFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <LabelEncodingWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): LabelEncodingModel {
        return new LabelEncodingModel();
    }
}
