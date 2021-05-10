import * as React from 'react';
import {ONE_HOT_DECODING, OneHotDecodingModel} from './OneHotDecodingModel';
import OneHotDecodingWidget from './OneHotDecodingWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class OneHotDecodingFactory extends BaseNodeFactory<OneHotDecodingModel, DiagramEngine> {

    private static INSTANCE: OneHotDecodingFactory;

    private constructor() {
        super(ONE_HOT_DECODING.codeName);
    }

    static getInstance = () => {
        return OneHotDecodingFactory.INSTANCE || (OneHotDecodingFactory.INSTANCE = new OneHotDecodingFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <OneHotDecodingWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): OneHotDecodingModel {
        return new OneHotDecodingModel();
    }
}
