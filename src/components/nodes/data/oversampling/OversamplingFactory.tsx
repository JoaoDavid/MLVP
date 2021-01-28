import React from 'react';
import { OversamplingModel } from './OversamplingModel';
import OversamplingWidget from './OversamplingWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NODE_OVERSAMPLING } from "../DataConfig";
import {CoreNodeFactory} from "../../../core/CoreNode/CoreNodeFactory";
import {Category} from "../../Config";

export class OversamplingFactory extends CoreNodeFactory<OversamplingModel, DiagramEngine> {

    private static INSTANCE: OversamplingFactory;

    private constructor() {
        super(Category.DATA, NODE_OVERSAMPLING.codeName);
    }

    static getInstance = () => {
        return OversamplingFactory.INSTANCE || (OversamplingFactory.INSTANCE = new OversamplingFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <OversamplingWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): OversamplingModel {
        return new OversamplingModel();
    }
}
