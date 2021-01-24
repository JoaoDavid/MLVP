import {
    LinkModel,
    PortModel,
    PortModelAlignment,
    PortModelGenerics,
    PortModelOptions
} from '@projectstorm/react-diagrams-core';
import { DefaultLinkModel } from '@projectstorm/react-diagrams-defaults';
import { AbstractModelFactory, DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface BasePortModelOptions extends PortModelOptions {
    label?: string;
    in?: boolean;
}

export interface BasePortModelGenerics extends PortModelGenerics {
    OPTIONS: BasePortModelOptions;
}

export class BasePortModel extends PortModel<BasePortModelGenerics> {

    private tier: number;

    constructor(tier: number, isIn: boolean, name?: string, label?: string);
    constructor(tier: number, options: BasePortModelOptions);
    constructor(tier: number, options: BasePortModelOptions | boolean, name?: string, label?: string) {
        if (!!name) {
            options = {
                in: !!options,
                name: name,
                label: label
            };
        }
        options = options as BasePortModelOptions;
        super({
            label: options.label || options.name,
            alignment: options.in ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
            type: 'default',
            ...options
        });
        this.tier = tier;
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.options.in = event.data.in;
        this.options.label = event.data.label;
    }

    serialize() {
        return {
            ...super.serialize(),
            in: this.options.in,
            label: this.options.label
        };
    }

    link<T extends LinkModel>(port: PortModel, factory?: AbstractModelFactory<T>): T {
        console.log('link');
        let link = this.createLinkModel(factory);
        link.setSourcePort(this);
        link.setTargetPort(port);
        return link as T;
    }

    canLinkToPort(port: PortModel): boolean {
        //TODO
        console.log('can link to port');
        return false;
    }

    createLinkModel(factory?: AbstractModelFactory<LinkModel>): LinkModel {
        let link = super.createLinkModel();
        if (!link && factory) {
            return factory.generateModel({});
        }
        return link || new DefaultLinkModel();
    }
}
