import React from 'react';
import { CSVNodeModel } from './CSVNodeModel';
import CSVNodeWidget from './CSVNodeWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NODE_CSV } from "../../DataConfig";
import {CoreNodeFactory, NodeCategory} from "../../../../core/CoreNode/CoreNodeFactory";

export class CSVNodeFactory extends CoreNodeFactory<CSVNodeModel, DiagramEngine> {

    private static INSTANCE: CSVNodeFactory;

    private constructor() {
        super(NodeCategory.DATA, NODE_CSV);
    }

    static getInstance = () => {
        return CSVNodeFactory.INSTANCE || (CSVNodeFactory.INSTANCE = new CSVNodeFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <CSVNodeWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): CSVNodeModel {
        return new CSVNodeModel();
    }
}
