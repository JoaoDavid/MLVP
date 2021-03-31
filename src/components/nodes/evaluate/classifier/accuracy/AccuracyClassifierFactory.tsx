import * as React from 'react';
import { AccuracyClassifierModel } from './AccuracyClassifierModel';
import AccuracyClassifierWidget from './AccuracyClassifierWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NODE_EVALUATE_CLASSIFIER } from "../../EvaluateConfig";
import {BaseBlockFactory} from "../../../../base/base-block/BaseBlockFactory";
import {Category} from "../../../Config";


export class AccuracyClassifierFactory extends BaseBlockFactory<AccuracyClassifierModel, DiagramEngine> {

    private static INSTANCE: AccuracyClassifierFactory;

    private constructor() {
        super(Category.DATA, NODE_EVALUATE_CLASSIFIER.codeName);
    }

    static getInstance = () => {
        return AccuracyClassifierFactory.INSTANCE || (AccuracyClassifierFactory.INSTANCE = new AccuracyClassifierFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <AccuracyClassifierWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): AccuracyClassifierModel {
        return new AccuracyClassifierModel();
    }
}
