import React from 'react';
import { SplitDatasetModel } from './SplitDatasetModel';
import CSVNodeWidget from './SplitDatasetWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { SPLIT_DATASET } from "../../data/DataConfig";
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";

export class SplitDatasetFactory extends BaseNodeFactory<SplitDatasetModel, DiagramEngine> {

    private static INSTANCE: SplitDatasetFactory;

    private constructor() {
        super(SPLIT_DATASET.codeName);
    }

    static getInstance = () => {
        return SplitDatasetFactory.INSTANCE || (SplitDatasetFactory.INSTANCE = new SplitDatasetFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <CSVNodeWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): SplitDatasetModel {
        return new SplitDatasetModel();
    }
}
