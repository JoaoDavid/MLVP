import React from 'react';
import { UndersamplingModel } from './UndersamplingModel';
import UndersamplingWidget from './UndersamplingWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { UNDERSAMPLING } from "../DataConfig";
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";
import {Category} from "../../Config";

export class UndersamplingFactory extends BaseNodeFactory<UndersamplingModel, DiagramEngine> {

    private static INSTANCE: UndersamplingFactory;

    private constructor() {
        super(Category.DATA_SOURCE, UNDERSAMPLING.codeName);
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
