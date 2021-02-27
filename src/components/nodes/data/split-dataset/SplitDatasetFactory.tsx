import React from 'react';
import { SplitDatasetModel } from './SplitDatasetModel';
import CSVNodeWidget from './SplitDatasetWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NODE_SPLIT_DATASET } from "../DataConfig";
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";
import {Category} from "../../Config";

export class SplitDatasetFactory extends BaseNodeFactory<SplitDatasetModel, DiagramEngine> {

    private static INSTANCE: SplitDatasetFactory;

    private constructor() {
        super(Category.DATA, NODE_SPLIT_DATASET.codeName);
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
