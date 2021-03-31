import React from 'react';
import { CSVModel } from './CSVModel';
import CSVWidget from './CSVWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NODE_CSV } from "../../DataConfig";
import {BaseBlockFactory} from "../../../../base/base-block/BaseBlockFactory";
import {Category} from "../../../Config";

export class CSVFactory extends BaseBlockFactory<CSVModel, DiagramEngine> {

    private static INSTANCE: CSVFactory;

    private constructor() {
        super(Category.DATA, NODE_CSV.codeName);
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
