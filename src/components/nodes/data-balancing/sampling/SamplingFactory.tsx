import * as React from 'react';
import {SAMPLING, SamplingModel} from './SamplingModel';
import SamplingWidget from './SamplingWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class SamplingFactory extends BaseNodeFactory<SamplingModel, DiagramEngine> {

    private static INSTANCE: SamplingFactory;

    private constructor() {
        super(SAMPLING.codeName);
    }

    static getInstance = () => {
        return SamplingFactory.INSTANCE || (SamplingFactory.INSTANCE = new SamplingFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <SamplingWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): SamplingModel {
        return new SamplingModel();
    }
}
