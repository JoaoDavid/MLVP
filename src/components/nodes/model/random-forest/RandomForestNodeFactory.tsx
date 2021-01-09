import * as React from 'react';
import { RandomForestNodeModel } from './RandomForestNodeModel';
import RandomForestNodeWidget from './RandomForestNodeWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NODE_RANDOM_FOREST } from "../ModelConfig";
import {CoreNodeFactory} from "../../../core/CoreNode/CoreNodeFactory";
import {Category} from "../../Config";


export class RandomForestNodeFactory extends CoreNodeFactory<RandomForestNodeModel, DiagramEngine> {

    private static INSTANCE: RandomForestNodeFactory;

    private constructor() {
        super(Category.MODEL, NODE_RANDOM_FOREST.codeName);
    }

    static getInstance = () => {
        return RandomForestNodeFactory.INSTANCE || (RandomForestNodeFactory.INSTANCE = new RandomForestNodeFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <RandomForestNodeWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): RandomForestNodeModel {
        return new RandomForestNodeModel();
    }
}
