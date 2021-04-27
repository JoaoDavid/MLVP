import React from 'react';
import { SampleModel } from './SampleModel';
import SampleWidget from './SampleWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { SAMPLE_CSV } from "../../DataConfig";
import {BaseNodeFactory} from "../../../../core/BaseNode/BaseNodeFactory";
import {Category} from "../../../Config";

export class SampleFactory extends BaseNodeFactory<SampleModel, DiagramEngine> {

    private static INSTANCE: SampleFactory;

    private constructor() {
        super(Category.DATA_SOURCE, SAMPLE_CSV.codeName);
    }

    static getInstance = () => {
        return SampleFactory.INSTANCE || (SampleFactory.INSTANCE = new SampleFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <SampleWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): SampleModel {
        return new SampleModel();
    }
}
