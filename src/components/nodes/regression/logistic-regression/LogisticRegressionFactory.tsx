import * as React from 'react';
import {LOGISTIC_REGRESSION, LogisticRegressionModel} from './LogisticRegressionModel';
import LogisticRegressionWidget from './LogisticRegressionWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class LogisticRegressionFactory extends BaseNodeFactory<LogisticRegressionModel, DiagramEngine> {

    private static INSTANCE: LogisticRegressionFactory;

    private constructor() {
        super(LOGISTIC_REGRESSION.codeName);
    }

    static getInstance = () => {
        return LogisticRegressionFactory.INSTANCE || (LogisticRegressionFactory.INSTANCE = new LogisticRegressionFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <LogisticRegressionWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): LogisticRegressionModel {
        return new LogisticRegressionModel();
    }
}
