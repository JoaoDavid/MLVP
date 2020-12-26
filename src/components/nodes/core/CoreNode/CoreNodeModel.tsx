import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams-core';
import { DefaultPortModel } from '@projectstorm/react-diagrams';
import { BasePositionModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface CoreNodeModelOptions extends BasePositionModelOptions {
    name: string;
    color?: string;
}

export interface CoreNodeModelGenerics extends NodeModelGenerics {
    OPTIONS: CoreNodeModelOptions;
}

export class CoreNodeModel extends NodeModel<CoreNodeModelGenerics> {

    protected portsIn: DefaultPortModel[];
    protected portsOut: DefaultPortModel[];

    constructor(type: string, name: string) {
        super({
            type: type,
            name: name,
        });
        this.portsOut = [];
        this.portsIn = [];
    }

    doClone(lookupTable: {}, clone: any): void {
        clone.portsIn = [];
        clone.portsOut = [];
        super.doClone(lookupTable, clone);
    }

    removePort(port: DefaultPortModel): void {
        super.removePort(port);
        if (port.getOptions().in) {
            this.portsIn.splice(this.portsIn.indexOf(port), 1);
        } else {
            this.portsOut.splice(this.portsOut.indexOf(port), 1);
        }
    }

    addPort<T extends DefaultPortModel>(port: T): T {
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

    addInPort(label: string, after = true): DefaultPortModel {
        const p = new DefaultPortModel({
            in: true,
            name: label,
            label: label,
            alignment: PortModelAlignment.LEFT
        });
        if (!after) {
            this.portsIn.splice(0, 0, p);
        }
        return this.addPort(p);
    }

    addOutPort(label: string, after = true): DefaultPortModel {
        const p = new DefaultPortModel({
            in: false,
            name: label,
            label: label,
            alignment: PortModelAlignment.RIGHT
        });
        if (!after) {
            this.portsOut.splice(0, 0, p);
        }
        return this.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.options.name = event.data.name;
        this.options.color = event.data.color;

        this.portsIn = event.data.portsInOrder.map((id: any) => {
            return this.getPortFromID(id);
        });
        this.portsOut = event.data.portsOutOrder.map((id: any) => {
            return this.getPortFromID(id);
        });
    }

    serialize(): any {
        return {
            ...super.serialize(),
            name: this.options.name,
            color: this.options.color,
            portsInOrder: this.portsIn.map((port: DefaultPortModel) => {
                return port.getID();
            }),
            portsOutOrder: this.portsOut.map((port: DefaultPortModel) => {
                return port.getID();
            }),
        };
    }

    getInPorts(): DefaultPortModel[] {
        return this.portsIn;
    }

    getOutPorts(): DefaultPortModel[] {
        return this.portsOut;
    }

}
