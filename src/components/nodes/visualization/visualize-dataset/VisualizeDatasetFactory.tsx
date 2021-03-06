import React from 'react';
import {VISUALIZE_DATASET, VisualizeDatasetModel} from './VisualizeDatasetModel';
import VisualizeDatasetWidget from './VisualizeDatasetWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";

export class VisualizeDatasetFactory extends BaseNodeFactory<VisualizeDatasetModel, DiagramEngine> {

    private static INSTANCE: VisualizeDatasetFactory;

    private constructor() {
        super(VISUALIZE_DATASET.codeName);
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
