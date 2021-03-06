import * as React from 'react';
import {RANDOM_FOREST_CLASSIFIER, RandomForestClassifierModel} from './RandomForestClassifierModel';
import RandomForestClassifierWidget from './RandomForestClassifierWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class RandomForestClassifierFactory extends BaseNodeFactory<RandomForestClassifierModel, DiagramEngine> {

    private static INSTANCE: RandomForestClassifierFactory;

    private constructor() {
        super(RANDOM_FOREST_CLASSIFIER.codeName);
    }

    static getInstance = () => {
        return RandomForestClassifierFactory.INSTANCE || (RandomForestClassifierFactory.INSTANCE = new RandomForestClassifierFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <RandomForestClassifierWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): RandomForestClassifierModel {
        return new RandomForestClassifierModel();
    }
}
