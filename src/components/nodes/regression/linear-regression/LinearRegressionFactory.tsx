import * as React from 'react';
import {LINEAR_REGRESSION, LinearRegressionModel} from './LinearRegressionModel';
import LinearRegressionWidget from './LinearRegressionWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class LinearRegressionFactory extends BaseNodeFactory<LinearRegressionModel, DiagramEngine> {

    private static INSTANCE: LinearRegressionFactory;

    private constructor() {
        super(LINEAR_REGRESSION.codeName);
    }

    static getInstance = () => {
        return LinearRegressionFactory.INSTANCE || (LinearRegressionFactory.INSTANCE = new LinearRegressionFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <LinearRegressionWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): LinearRegressionModel {
        return new LinearRegressionModel();
    }
}
