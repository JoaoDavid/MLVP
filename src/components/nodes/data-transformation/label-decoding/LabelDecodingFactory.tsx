import * as React from 'react';
import {LABEL_DECODING, LabelDecodingModel} from './LabelDecodingModel';
import LabelDecodingWidget from './LabelDecodingWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class LabelDecodingFactory extends BaseNodeFactory<LabelDecodingModel, DiagramEngine> {

    private static INSTANCE: LabelDecodingFactory;

    private constructor() {
        super(LABEL_DECODING.codeName);
    }

    static getInstance = () => {
        return LabelDecodingFactory.INSTANCE || (LabelDecodingFactory.INSTANCE = new LabelDecodingFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <LabelDecodingWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): LabelDecodingModel {
        return new LabelDecodingModel();
    }
}
