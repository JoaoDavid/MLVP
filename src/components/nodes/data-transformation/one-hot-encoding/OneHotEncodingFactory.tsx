import * as React from 'react';
import {ONE_HOT_ENCODING, OneHotEncodingModel} from './OneHotEncodingModel';
import OneHotEncodingWidget from './OneHotEncodingWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class OneHotEncodingFactory extends BaseNodeFactory<OneHotEncodingModel, DiagramEngine> {

    private static INSTANCE: OneHotEncodingFactory;

    private constructor() {
        super(ONE_HOT_ENCODING.codeName);
    }

    static getInstance = () => {
        return OneHotEncodingFactory.INSTANCE || (OneHotEncodingFactory.INSTANCE = new OneHotEncodingFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <OneHotEncodingWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): OneHotEncodingModel {
        return new OneHotEncodingModel();
    }
}
