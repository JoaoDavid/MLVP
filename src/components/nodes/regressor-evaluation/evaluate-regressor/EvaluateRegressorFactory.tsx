import * as React from 'react';
import {EVALUATE_REGRESSOR, EvaluateRegressorModel} from './EvaluateRegressorModel';
import EvaluateRegressorWidget from './EvaluateRegressorWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class EvaluateRegressorFactory extends BaseNodeFactory<EvaluateRegressorModel, DiagramEngine> {

    private static INSTANCE: EvaluateRegressorFactory;

    private constructor() {
        super(EVALUATE_REGRESSOR.codeName);
    }

    static getInstance = () => {
        return EvaluateRegressorFactory.INSTANCE || (EvaluateRegressorFactory.INSTANCE = new EvaluateRegressorFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <EvaluateRegressorWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): EvaluateRegressorModel {
        return new EvaluateRegressorModel();
    }
}
