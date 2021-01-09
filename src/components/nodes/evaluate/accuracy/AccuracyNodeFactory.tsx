import * as React from 'react';
import { AccuracyNodeModel } from './AccuracyNodeModel';
import RandomForestNodeWidget from './AccuracyNodeWidget';
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NODE_ACCURACY } from "../EvaluateConfig";

export class AccuracyNodeFactory extends AbstractReactFactory<AccuracyNodeModel, DiagramEngine> {
    constructor() {
        super(NODE_ACCURACY);
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <RandomForestNodeWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): AccuracyNodeModel {
        return new AccuracyNodeModel();
    }
}
