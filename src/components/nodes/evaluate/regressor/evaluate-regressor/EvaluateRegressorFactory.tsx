import * as React from 'react';
import { EvaluateRegressorModel } from './EvaluateRegressorModel';
import EvaluateRegressorWidget from './EvaluateRegressorWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { EVALUATE_REGRESSOR } from "../../EvaluateConfig";
import {BaseNodeFactory} from "../../../../core/BaseNode/BaseNodeFactory";
import {Category} from "../../../Config";


export class EvaluateRegressorFactory extends BaseNodeFactory<EvaluateRegressorModel, DiagramEngine> {

    private static INSTANCE: EvaluateRegressorFactory;

    private constructor() {
        super(Category.EVALUATE_REGRESSOR, EVALUATE_REGRESSOR.codeName);
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
