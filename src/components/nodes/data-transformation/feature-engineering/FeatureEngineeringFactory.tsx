import React from 'react';
import {FEATURE_ENGINEERING, FeatureEngineeringModel} from './FeatureEngineeringModel';
import FeatureEngineeringWidget from './FeatureEngineeringWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";

export class FeatureEngineeringFactory extends BaseNodeFactory<FeatureEngineeringModel, DiagramEngine> {

    private static INSTANCE: FeatureEngineeringFactory;

    private constructor() {
        super(FEATURE_ENGINEERING.codeName);
    }

    static getInstance = () => {
        return FeatureEngineeringFactory.INSTANCE || (FeatureEngineeringFactory.INSTANCE = new FeatureEngineeringFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <FeatureEngineeringWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): FeatureEngineeringModel {
        return new FeatureEngineeringModel();
    }
}
