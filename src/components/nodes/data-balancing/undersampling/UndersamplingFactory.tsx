import React from 'react';
import {UNDERSAMPLING, UndersamplingModel} from './UndersamplingModel';
import UndersamplingWidget from './UndersamplingWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";

export class UndersamplingFactory extends BaseNodeFactory<UndersamplingModel, DiagramEngine> {

    private static INSTANCE: UndersamplingFactory;

    private constructor() {
        super(UNDERSAMPLING.codeName);
    }

    static getInstance = () => {
        return UndersamplingFactory.INSTANCE || (UndersamplingFactory.INSTANCE = new UndersamplingFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <UndersamplingWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): UndersamplingModel {
        return new UndersamplingModel();
    }
}
