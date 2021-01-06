import {
    PortModel,
    PortModelAlignment,
    PortModelGenerics,
    PortModelOptions
} from '@projectstorm/react-diagrams-core';
import { BasePortModel} from "../../core/BasePort/BasePortModel";

export interface MLModelPortModelOptions extends PortModelOptions {
    label?: string;
    in?: boolean;
}

export interface MLModelPortModelGenerics extends PortModelGenerics {
    OPTIONS: MLModelPortModelOptions;
}

export class MLModelPortModel extends BasePortModel {
    constructor(isIn: boolean, name?: string, label?: string);
    constructor(options: MLModelPortModelOptions);
    constructor(options: MLModelPortModelOptions | boolean, name?: string, label?: string) {
        if (!!name) {
            options = {
                in: !!options,
                name: name,
                label: label
            };
        }
        options = options as MLModelPortModelOptions;
        super({
            label: options.label || options.name,
            alignment: options.in ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
            type: 'default',
            ...options
        });
    }

    canLinkToPort(port: PortModel): boolean {
        console.log('can link to ml trained model port');
        if (port instanceof MLModelPortModel) {
            return this.options.in !== port.getOptions().in;
        }
        return false;
    }

}
