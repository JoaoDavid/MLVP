import * as React from 'react';
import {RANDOM_FOREST_REGRESSOR, RandomForestRegressorModel} from './RandomForestRegressorModel';
import RandomForestRegressorWidget from './RandomForestRegressorWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class RandomForestRegressorFactory extends BaseNodeFactory<RandomForestRegressorModel, DiagramEngine> {

    private static INSTANCE: RandomForestRegressorFactory;

    private constructor() {
        super(RANDOM_FOREST_REGRESSOR.codeName);
    }

    static getInstance = () => {
        return RandomForestRegressorFactory.INSTANCE || (RandomForestRegressorFactory.INSTANCE = new RandomForestRegressorFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <RandomForestRegressorWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): RandomForestRegressorModel {
        return new RandomForestRegressorModel();
    }
}
