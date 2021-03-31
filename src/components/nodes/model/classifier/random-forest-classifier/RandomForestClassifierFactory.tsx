import * as React from 'react';
import { RandomForestClassifierModel } from './RandomForestClassifierModel';
import RandomForestClassifierWidget from './RandomForestClassifierWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NODE_RANDOM_FOREST_CLASSIFIER } from "../../ModelConfig";
import {BaseBlockFactory} from "../../../../base/base-block/BaseBlockFactory";
import {Category} from "../../../Config";


export class RandomForestClassifierFactory extends BaseBlockFactory<RandomForestClassifierModel, DiagramEngine> {

    private static INSTANCE: RandomForestClassifierFactory;

    private constructor() {
        super(Category.MODEL, NODE_RANDOM_FOREST_CLASSIFIER.codeName);
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
