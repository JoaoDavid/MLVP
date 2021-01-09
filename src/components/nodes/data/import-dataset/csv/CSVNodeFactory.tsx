import * as React from 'react';
import { CSVNodeModel } from './CSVNodeModel';
import CSVNodeWidget from './CSVNodeWidget';
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NODE_CSV } from "../../DataConfig";

export class CSVNodeFactory extends AbstractReactFactory<CSVNodeModel, DiagramEngine> {
    constructor() {
        super(NODE_CSV);
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <CSVNodeWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): CSVNodeModel {
        return new CSVNodeModel();
    }
}
