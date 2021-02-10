import React from 'react';
import { CrossValidationModel } from './CrossValidationModel';
import CrossValidationWidget from './CrossValidationWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NODE_CROSS_VALIDATION } from "../EvaluateConfig";
import {CoreNodeFactory} from "../../../core/CoreNode/CoreNodeFactory";
import {Category} from "../../Config";

export class CrossValidationFactory extends CoreNodeFactory<CrossValidationModel, DiagramEngine> {

    private static INSTANCE: CrossValidationFactory;

    private constructor() {
        super(Category.DATA, NODE_CROSS_VALIDATION.codeName);
    }

    static getInstance = () => {
        return CrossValidationFactory.INSTANCE || (CrossValidationFactory.INSTANCE = new CrossValidationFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <CrossValidationWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): CrossValidationModel {
        return new CrossValidationModel();
    }
}
