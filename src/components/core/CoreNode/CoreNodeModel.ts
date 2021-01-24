import { NodeModel, NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import {BasePortModel} from "../BasePort/BasePortModel";
import { BasePositionModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface CoreNodeModelOptions extends BasePositionModelOptions {
    name: string;
}

export interface CoreNodeModelGenerics extends NodeModelGenerics {
    OPTIONS: CoreNodeModelOptions;
}

export abstract class CoreNodeModel extends NodeModel<CoreNodeModelGenerics> {

    protected portsIn: BasePortModel[];
    protected portsOut: BasePortModel[];
    protected tier: number;

    protected constructor(type: string, name: string, tier: number) {
        super({
            type: type,
            name: name,
        });
        this.portsOut = [];
        this.portsIn = [];
        this.tier = tier;
    }

    doClone(lookupTable: {}, clone: any): void {
        clone.portsIn = [];
        clone.portsOut = [];
        super.doClone(lookupTable, clone);
    }

    removePort(port: BasePortModel): void {
        super.removePort(port);
        if (port.getOptions().in) {
            this.portsIn.splice(this.portsIn.indexOf(port), 1);
        } else {
            this.portsOut.splice(this.portsOut.indexOf(port), 1);
        }
    }

    addPort<T extends BasePortModel>(port: T): T {
        super.addPort(port);
        if (port.getOptions().in) {
            if (this.portsIn.indexOf(port) === -1) {
                this.portsIn.push(port);
            }
        } else {
            if (this.portsOut.indexOf(port) === -1) {
                this.portsOut.push(port);
            }
        }
        return port;
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.portsIn = event.data.portsInOrder.map((id: any) => {
            return this.getPortFromID(id);
        });
        this.portsOut = event.data.portsOutOrder.map((id: any) => {
            return this.getPortFromID(id);
        });
        this.tier = event.data.tier;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            portsInOrder: this.portsIn.map((port: BasePortModel) => {
                return port.getID();
            }),
            portsOutOrder: this.portsOut.map((port: BasePortModel) => {
                return port.getID();
            }),
            tier: this.tier,
        };
    }

    getInPorts(): BasePortModel[] {
        return this.portsIn;
    }

    getOutPorts(): BasePortModel[] {
        return this.portsOut;
    }

    getTier(): number {
        return this.tier;
    }

}
