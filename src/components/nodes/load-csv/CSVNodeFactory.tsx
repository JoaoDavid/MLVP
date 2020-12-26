import * as React from 'react';
import { CSVNodeModel, csv } from './CSVNodeModel';
import CSVNodeWidget from './CSVNodeWidget';
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class CSVNodeFactory extends AbstractReactFactory<CSVNodeModel, DiagramEngine> {
    constructor() {
        super(csv);
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <CSVNodeWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): CSVNodeModel {
        return new CSVNodeModel();
    }
}
