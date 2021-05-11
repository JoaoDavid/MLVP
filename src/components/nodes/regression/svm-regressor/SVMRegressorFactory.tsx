import * as React from 'react';
import {SVM_REGRESSOR, SVMRegressorModel} from './SVMRegressorModel';
import SVMRegressorWidget from './SVMRegressorWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class SVMRegressorFactory extends BaseNodeFactory<SVMRegressorModel, DiagramEngine> {

    private static INSTANCE: SVMRegressorFactory;

    private constructor() {
        super(SVM_REGRESSOR.codeName);
    }

    static getInstance = () => {
        return SVMRegressorFactory.INSTANCE || (SVMRegressorFactory.INSTANCE = new SVMRegressorFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <SVMRegressorWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): SVMRegressorModel {
        return new SVMRegressorModel();
    }
}
