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
    in: boolean;
}

export interface BasePortModelGenerics extends PortModelGenerics {
    OPTIONS: BasePortModelOptions;
}

export abstract class BasePortModel extends PortModel<BasePortModelGenerics> {

    private readonly tier: number;

    protected constructor(tier: number, isIn: boolean, name: string, label: string, maxLinks?: number){
        super({
            name: name,
            label: label,
            alignment: isIn ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
            type: 'default',
            in: isIn,
            maximumLinks: maxLinks?maxLinks:1,
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

    /*link<T extends LinkModel>(port: BasePortModel, factory?: AbstractModelFactory<T>): T {
        console.log('link');
        let link = this.createLinkModel(factory);
        if(this.getTier() < port.getTier()) {
            link.setSourcePort(this);
            link.setTargetPort(this);//port
        } else {
            link.setSourcePort(port);
            link.setTargetPort(port);
        }
        return link as T;
    }*/

    isNewLinkAllowed(): boolean {
        return (
            Object.keys(this.getLinks()).length < this.getMaximumLinks()
        );
    }

    canLinkToPort(port: BasePortModel): boolean {
        console.log('canLinkToPort at BasePortModel');
        return (this.getTier() !== port.getTier()) && (this.getIsIn() !== port.getIsIn()) && port.isNewLinkAllowed();
    }

    createLinkModel(factory?: AbstractModelFactory<LinkModel>): LinkModel {
        if (this.isNewLinkAllowed()) {
            const link = new DefaultLinkModel();
            return link;
        }
        return null;
    }

    getTier(): number {
        return this.tier;
    }

    getIsIn(): boolean {
        return this.options.in;
    }

    getName(): string {
        return this.options.name
    }

    getLabel(): string {
        return this.options.label
    }

}
