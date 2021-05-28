import * as React from 'react';
import {TEMPLATE_CONFIG_VAR, TemplateCodeNameModel} from './TemplateCodeNameModel';
import TemplateCodeNameWidget from './TemplateCodeNameWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class TemplateCodeNameFactory extends BaseNodeFactory<TemplateCodeNameModel, DiagramEngine> {

    private static INSTANCE: TemplateCodeNameFactory;

    private constructor() {
        super(TEMPLATE_CONFIG_VAR.codeName);
    }

    static getInstance = () => {
        return TemplateCodeNameFactory.INSTANCE || (TemplateCodeNameFactory.INSTANCE = new TemplateCodeNameFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <TemplateCodeNameWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): TemplateCodeNameModel {
        return new TemplateCodeNameModel();
    }
}
