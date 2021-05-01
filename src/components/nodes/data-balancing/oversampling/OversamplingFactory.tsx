import React from 'react';
import { OversamplingModel } from './OversamplingModel';
import OversamplingWidget from './OversamplingWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { OVERSAMPLING } from "../../data/DataConfig";
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";

export class OversamplingFactory extends BaseNodeFactory<OversamplingModel, DiagramEngine> {

    private static INSTANCE: OversamplingFactory;

    private constructor() {
        super(OVERSAMPLING.codeName);
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
