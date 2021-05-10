import React from 'react';
import {ABSTRACT_DS, AbstractDsModel} from './AbstractDsModel';
import AbstractDsWidget from './AbstractDsWidget';
import {GenerateModelEvent, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";

export class AbstractDsFactory extends BaseNodeFactory<AbstractDsModel, DiagramEngine> {

    private static INSTANCE: AbstractDsFactory;

    private constructor() {
        super(ABSTRACT_DS.codeName);
    }

    static getInstance = () => {
        return AbstractDsFactory.INSTANCE || (AbstractDsFactory.INSTANCE = new AbstractDsFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <AbstractDsWidget engine={this.engine} node={event.model}/>;
    }

    generateModel(event: GenerateModelEvent): AbstractDsModel {
        return new AbstractDsModel();
    }
}
