import React from 'react';
import { PCAModel } from './PCAModel';
import PCAWidget from './PCAWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { PCA } from "../../data/DataConfig";
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";

export class PCAFactory extends BaseNodeFactory<PCAModel, DiagramEngine> {

    private static INSTANCE: PCAFactory;

    private constructor() {
        super(PCA.codeName);
    }

    static getInstance = () => {
        return PCAFactory.INSTANCE || (PCAFactory.INSTANCE = new PCAFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <PCAWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): PCAModel {
        return new PCAModel();
    }
}
