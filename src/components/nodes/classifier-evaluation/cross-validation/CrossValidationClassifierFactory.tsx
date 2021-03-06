import React from 'react';
import {CROSS_VALIDATION_CLASSIFIER, CrossValidationClassifierModel} from './CrossValidationClassifierModel';
import CrossValidationClassifierWidget from './CrossValidationClassifierWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";

export class CrossValidationClassifierFactory extends BaseNodeFactory<CrossValidationClassifierModel, DiagramEngine> {

    private static INSTANCE: CrossValidationClassifierFactory;

    private constructor() {
        super(CROSS_VALIDATION_CLASSIFIER.codeName);
    }

    static getInstance = () => {
        return CrossValidationClassifierFactory.INSTANCE || (CrossValidationClassifierFactory.INSTANCE = new CrossValidationClassifierFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <CrossValidationClassifierWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): CrossValidationClassifierModel {
        return new CrossValidationClassifierModel();
    }
}
