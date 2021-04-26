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

    protected constructor(codename: string, isIn: boolean, name: string, label: string, maxLinks?: number){
        super({
            name: name,
            label: label,
            alignment: isIn ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
            type: codename,
            in: isIn,
            maximumLinks: maxLinks?maxLinks:10,
        });
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

    isNewLinkAllowed(): boolean {
        return this.getPortLinks().length < this.getMaximumLinks() && (!this.getIsIn() || this.getPortLinks().length == 0)

        ;
    }

    canLinkToPort(port: BasePortModel): boolean {
        console.log('canLinkToPort at BasePortModel');
        return (this.getNode().getID() !== port.getNode().getID()) &&
            (this.getIsIn() !== port.getIsIn()) &&
            port.isNewLinkAllowed() &&
            !this.duplicateLink(port) &&
            this.inputPortFree(port)
    }

    inputPortFree = (port: BasePortModel) => {
        if (port.getIsIn()) {
            console.log(port.getPortLinks())
            return port.getPortLinks().length == 0
        } else {
            return true;
        }
    }

    duplicateLink(port: BasePortModel): boolean {
        let res = false;
        let links = this.getPortLinks();
        console.log(links)
        links.forEach((link) => {
            let targetPort = link.getTargetPort() as BasePortModel;
            if (targetPort) {
                console.log(targetPort.getID())
                console.log(port.getID())
                console.log(targetPort.getID() === port.getID())
                if (targetPort.getID() === port.getID()) {
                    res = true;
                }
            }
        })
        return res;
    }

    createLinkModel(factory?: AbstractModelFactory<LinkModel>): LinkModel {
        if (this.isNewLinkAllowed()) {
            const link = new DefaultLinkModel();
            return link;
        }
        return null;
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

    getPortLinks(): LinkModel[] {
        return Object.values(this.getLinks());
    }

}
