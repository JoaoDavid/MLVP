import * as React from 'react';
import {KERAS_REGRESSOR, KerasRegressorModel} from './KerasRegressorModel';
import KerasRegressorWidget from './KerasRegressorWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class KerasRegressorFactory extends BaseNodeFactory<KerasRegressorModel, DiagramEngine> {

    private static INSTANCE: KerasRegressorFactory;

    private constructor() {
        super(KERAS_REGRESSOR.codeName);
    }

    static getInstance = () => {
        return KerasRegressorFactory.INSTANCE || (KerasRegressorFactory.INSTANCE = new KerasRegressorFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <KerasRegressorWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): KerasRegressorModel {
        return new KerasRegressorModel();
    }
}
