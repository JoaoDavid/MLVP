import * as React from 'react';
import { TemporalAggregationModel } from './TemporalAggregationModel';
import TemporalAggregationWidget from './TemporalAggregationWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { TEMPORAL_AGGREGATION } from "../DataConfig";
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";
import {Category} from "../../Config";


export class TemporalAggregationFactory extends BaseNodeFactory<TemporalAggregationModel, DiagramEngine> {

    private static INSTANCE: TemporalAggregationFactory;

    private constructor() {
        super(Category.DATA_SOURCE, TEMPORAL_AGGREGATION.codeName);
    }

    static getInstance = () => {
        return TemporalAggregationFactory.INSTANCE || (TemporalAggregationFactory.INSTANCE = new TemporalAggregationFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <TemporalAggregationWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): TemporalAggregationModel {
        return new TemporalAggregationModel();
    }
}
