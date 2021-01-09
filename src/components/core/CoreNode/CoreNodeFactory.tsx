import * as React from 'react';
import {AbstractReactFactory} from '@projectstorm/react-canvas-core';

export enum NodeCategory {
    DATA,
    MODEL,
    EVALUATE,
}

export abstract class CoreNodeFactory extends AbstractReactFactory {

    private category: NodeCategory;

    protected constructor(category: NodeCategory, type: string) {
        super(type);
        this.category = category;
    }


}
