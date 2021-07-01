import React from 'react';
import {CSVModel, IMPORT_FROM_CSV} from './CSVModel';
import CSVWidget from './CSVWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";

export class CSVFactory extends BaseNodeFactory<CSVModel, DiagramEngine> {

    private static INSTANCE: CSVFactory;

    private constructor() {
        super(IMPORT_FROM_CSV.codeName);
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
