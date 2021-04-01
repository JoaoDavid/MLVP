import React from 'react';
import {AbstractDsModel} from './AbstractDsModel';
import AbstractDsWidget from './AbstractDsWidget';
import {GenerateModelEvent, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {ABSTRACT_DS} from "../../DataConfig";
import {BaseNodeFactory} from "../../../../core/BaseNode/BaseNodeFactory";
import {Category} from "../../../Config";

export class AbstractDsFactory extends BaseNodeFactory<AbstractDsModel, DiagramEngine> {

    private static INSTANCE: AbstractDsFactory;

    private constructor() {
        super(Category.DATA, ABSTRACT_DS.codeName);
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
