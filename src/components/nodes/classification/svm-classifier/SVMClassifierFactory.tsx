import * as React from 'react';
import {SVM_CLASSIFIER, SVMClassifierModel} from './SVMClassifierModel';
import SVMClassifierWidget from './SVMClassifierWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class SVMClassifierFactory extends BaseNodeFactory<SVMClassifierModel, DiagramEngine> {

    private static INSTANCE: SVMClassifierFactory;

    private constructor() {
        super(SVM_CLASSIFIER.codeName);
    }

    static getInstance = () => {
        return SVMClassifierFactory.INSTANCE || (SVMClassifierFactory.INSTANCE = new SVMClassifierFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <SVMClassifierWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): SVMClassifierModel {
        return new SVMClassifierModel();
    }
}
