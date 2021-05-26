import * as React from 'react';
import {STOCHASTIC_GRADIENT_DESCENT, StochasticGradientDescentModel} from './StochasticGradientDescentModel';
import StochasticGradientDescentWidget from './StochasticGradientDescentWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../../core/BaseNode/BaseNodeFactory";


export class StochasticGradientDescentFactory extends BaseNodeFactory<StochasticGradientDescentModel, DiagramEngine> {

    private static INSTANCE: StochasticGradientDescentFactory;

    private constructor() {
        super(STOCHASTIC_GRADIENT_DESCENT.codeName);
    }

    static getInstance = () => {
        return StochasticGradientDescentFactory.INSTANCE || (StochasticGradientDescentFactory.INSTANCE = new StochasticGradientDescentFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <StochasticGradientDescentWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): StochasticGradientDescentModel {
        return new StochasticGradientDescentModel();
    }
}
