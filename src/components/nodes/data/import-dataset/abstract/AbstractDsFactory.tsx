import React from 'react';
import {AbstractDsModel} from './AbstractDsModel';
import AbstractDsWidget from './AbstractDsWidget';
import {GenerateModelEvent, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {NODE_ABSTRACT_DS} from "../../DataConfig";
import {BaseBlockFactory} from "../../../../base/base-block/BaseBlockFactory";
import {Category} from "../../../Config";

export class AbstractDsFactory extends BaseBlockFactory<AbstractDsModel, DiagramEngine> {

    private static INSTANCE: AbstractDsFactory;

    private constructor() {
        super(Category.DATA, NODE_ABSTRACT_DS.codeName);
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
