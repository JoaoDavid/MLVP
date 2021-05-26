import * as React from 'react';
import {KERAS_CLASSIFIER, KerasClassifierModel} from './KerasClassifierModel';
import KerasClassifierWidget from './KerasClassifierWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class KerasClassifierFactory extends BaseNodeFactory<KerasClassifierModel, DiagramEngine> {

    private static INSTANCE: KerasClassifierFactory;

    private constructor() {
        super(KERAS_CLASSIFIER.codeName);
    }

    static getInstance = () => {
        return KerasClassifierFactory.INSTANCE || (KerasClassifierFactory.INSTANCE = new KerasClassifierFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <KerasClassifierWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): KerasClassifierModel {
        return new KerasClassifierModel();
    }
}
