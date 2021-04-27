import React from 'react';
import { VisualizeDatasetModel } from './VisualizeDatasetModel';
import VisualizeDatasetWidget from './VisualizeDatasetWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { VISUALIZE_DATASET } from "../DataConfig";
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";
import {Category} from "../../Config";

export class VisualizeDatasetFactory extends BaseNodeFactory<VisualizeDatasetModel, DiagramEngine> {

    private static INSTANCE: VisualizeDatasetFactory;

    private constructor() {
        super(Category.DATA_SOURCE, VISUALIZE_DATASET.codeName);
    }

    static getInstance = () => {
        return VisualizeDatasetFactory.INSTANCE || (VisualizeDatasetFactory.INSTANCE = new VisualizeDatasetFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <VisualizeDatasetWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): VisualizeDatasetModel {
        return new VisualizeDatasetModel();
    }
}
