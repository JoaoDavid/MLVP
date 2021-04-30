import * as React from 'react';
import { RandomForestRegressorModel } from './RandomForestRegressorModel';
import RandomForestRegressorWidget from './RandomForestRegressorWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { RANDOM_FOREST_REGRESSOR } from "../../ModelConfig";
import {BaseNodeFactory} from "../../../../core/BaseNode/BaseNodeFactory";
import {Category} from "../../../Config";


export class RandomForestRegressorFactory extends BaseNodeFactory<RandomForestRegressorModel, DiagramEngine> {

    private static INSTANCE: RandomForestRegressorFactory;

    private constructor() {
        super(Category.REGRESSION, RANDOM_FOREST_REGRESSOR.codeName);
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
