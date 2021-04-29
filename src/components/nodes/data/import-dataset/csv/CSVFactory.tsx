import React from 'react';
import { CSVModel } from './CSVModel';
import CSVWidget from './CSVWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { IMPORT_FROM_CSV } from "../../DataConfig";
import {BaseNodeFactory} from "../../../../core/BaseNode/BaseNodeFactory";
import {Category} from "../../../Config";

export class CSVFactory extends BaseNodeFactory<CSVModel, DiagramEngine> {

    private static INSTANCE: CSVFactory;

    private constructor() {
        super(Category.DATA_SOURCE, IMPORT_FROM_CSV.codeName);
    }

    static getInstance = () => {
        return CSVFactory.INSTANCE || (CSVFactory.INSTANCE = new CSVFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <CSVWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): CSVModel {
        return new CSVModel();
    }
}
