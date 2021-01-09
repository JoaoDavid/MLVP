import * as React from 'react';
import { RandomForestNodeModel } from './RandomForestNodeModel';
import RandomForestNodeWidget from './RandomForestNodeWidget';
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NODE_RANDOM_FOREST } from "../ModelConfig";

export class RandomForestNodeFactory extends AbstractReactFactory<RandomForestNodeModel, DiagramEngine> {
    constructor() {
        super(NODE_RANDOM_FOREST);
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <RandomForestNodeWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): RandomForestNodeModel {
        return new RandomForestNodeModel();
    }
}
