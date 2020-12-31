import {
    PortModel,
    PortModelAlignment,
    PortModelGenerics,
    PortModelOptions
} from '@projectstorm/react-diagrams-core';
import { BasePortModel} from "../../core/BasePort/BasePortModel";

export interface DatasetPortModelOptions extends PortModelOptions {
    label?: string;
    in?: boolean;
}

export interface DatasetPortModelGenerics extends PortModelGenerics {
    OPTIONS: DatasetPortModelOptions;
}

export class DatasetPortModel extends BasePortModel {
    constructor(isIn: boolean, name?: string, label?: string);
    constructor(options: DatasetPortModelOptions);
    constructor(options: DatasetPortModelOptions | boolean, name?: string, label?: string) {
        if (!!name) {
            options = {
                in: !!options,
                name: name,
                label: label
            };
        }
        options = options as DatasetPortModelOptions;
        super({
            label: options.label || options.name,
            alignment: options.in ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
            type: 'default',
            ...options
        });
    }

    canLinkToPort(port: PortModel): boolean {
        console.log('can link to dataset port');
        if (port instanceof DatasetPortModel) {
            return this.options.in !== port.getOptions().in;
        }
        return false;
    }

}
