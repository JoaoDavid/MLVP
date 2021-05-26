import * as React from 'react';
import {COMPILER, CompilerModel} from './CompilerModel';
import CompilerWidget from './CompilerWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class CompilerFactory extends BaseNodeFactory<CompilerModel, DiagramEngine> {

    private static INSTANCE: CompilerFactory;

    private constructor() {
        super(COMPILER.codeName);
    }

    static getInstance = () => {
        return CompilerFactory.INSTANCE || (CompilerFactory.INSTANCE = new CompilerFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <CompilerWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): CompilerModel {
        return new CompilerModel();
    }
}
