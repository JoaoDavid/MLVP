import {
    PortModel,
    PortModelAlignment,
    PortModelGenerics,
    PortModelOptions
} from '@projectstorm/react-diagrams-core';
import { BasePortModel} from "../../core/BasePort/BasePortModel";
import {DatasetPortModel} from "../dataset/DatasetPortModel";
import {MLModelPortModel} from "../model/MLModelPortModel";

export interface EvaluatePortModelOptions extends PortModelOptions {
    label?: string;
    in?: boolean;
}

export interface EvaluatePortModelGenerics extends PortModelGenerics {
    OPTIONS: EvaluatePortModelOptions;
}

export class EvaluatePortModel extends BasePortModel {
    constructor(isIn: boolean, name?: string, label?: string);
    constructor(options: EvaluatePortModelOptions);
    constructor(options: EvaluatePortModelOptions | boolean, name?: string, label?: string) {
        if (!!name) {
            options = {
                in: !!options,
                name: name,
                label: label
            };
        }
        options = options as EvaluatePortModelOptions;
        super({
            label: options.label || options.name,
            alignment: options.in ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
            type: 'default',
            ...options
        });
    }

    canLinkToPort(port: PortModel): boolean {
        console.log('can link to evaluate port');
        if (port instanceof DatasetPortModel !! ) {
            return true;
        } else if (port instanceof MLModelPortModel) {
            return true;
        }
        return false;
    }

}
