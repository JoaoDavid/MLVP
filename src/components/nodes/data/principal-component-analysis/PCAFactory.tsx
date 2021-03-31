import React from 'react';
import { PCAModel } from './PCAModel';
import PCAWidget from './PCAWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NODE_PCA } from "../DataConfig";
import {BaseBlockFactory} from "../../../base/base-block/BaseBlockFactory";
import {Category} from "../../Config";

export class PCAFactory extends BaseBlockFactory<PCAModel, DiagramEngine> {

    private static INSTANCE: PCAFactory;

    private constructor() {
        super(Category.DATA, NODE_PCA.codeName);
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
