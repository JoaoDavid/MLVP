import * as React from 'react';
import {DECISION_TREE_CLASSIFIER, DecisionTreeClassifierModel} from './DecisionTreeClassifierModel';
import DecisionTreeClassifierWidget from './DecisionTreeClassifierWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class DecisionTreeClassifierFactory extends BaseNodeFactory<DecisionTreeClassifierModel, DiagramEngine> {

    private static INSTANCE: DecisionTreeClassifierFactory;

    private constructor() {
        super(DECISION_TREE_CLASSIFIER.codeName);
    }

    static getInstance = () => {
        return DecisionTreeClassifierFactory.INSTANCE || (DecisionTreeClassifierFactory.INSTANCE = new DecisionTreeClassifierFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <DecisionTreeClassifierWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): DecisionTreeClassifierModel {
        return new DecisionTreeClassifierModel();
    }
}
