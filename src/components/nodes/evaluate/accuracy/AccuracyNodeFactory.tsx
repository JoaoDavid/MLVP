import * as React from 'react';
import { AccuracyNodeModel } from './AccuracyNodeModel';
import AccuracyNodeWidget from './AccuracyNodeWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NODE_ACCURACY } from "../EvaluateConfig";
import {CoreNodeFactory} from "../../../core/CoreNode/CoreNodeFactory";
import {Category} from "../../Config";


export class AccuracyNodeFactory extends CoreNodeFactory<AccuracyNodeModel, DiagramEngine> {

    private static INSTANCE: AccuracyNodeFactory;

    private constructor() {
        super(Category.DATA, NODE_ACCURACY.codeName);
    }

    static getInstance = () => {
        return AccuracyNodeFactory.INSTANCE || (AccuracyNodeFactory.INSTANCE = new AccuracyNodeFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <AccuracyNodeWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): AccuracyNodeModel {
        return new AccuracyNodeModel();
    }
}
