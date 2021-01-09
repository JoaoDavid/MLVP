import * as React from 'react';
import {AbstractReactFactory} from '@projectstorm/react-canvas-core';
import {CoreNodeModel} from "./CoreNodeModel";
import {DiagramEngine} from "@projectstorm/react-diagrams";

export enum NodeCategory {
    DATA,
    MODEL,
    EVALUATE,
}

export abstract class CoreNodeFactory<T extends CoreNodeModel, E extends DiagramEngine>
    extends AbstractReactFactory<T, E> {

    private readonly category: NodeCategory;

    protected constructor(category: NodeCategory, type: string) {
        super(type);
        this.category = category;
    }

    getCategory = () => {
        return this.category;
    }

}
