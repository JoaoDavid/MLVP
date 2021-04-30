import { NodeModel, NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import {BasePortModel} from "../BasePort/BasePortModel";
import { BasePositionModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';
import {NodeConfig} from "../../nodes/Config";

export interface BaseNodeModelOptions extends BasePositionModelOptions {
    name: string;
}

export interface BaseNodeModelGenerics extends NodeModelGenerics {
    OPTIONS: BaseNodeModelOptions;
}

export abstract class BaseNodeModel extends NodeModel<BaseNodeModelGenerics> {

    protected portsIn: BasePortModel[];
    protected portsOut: BasePortModel[];
    private title: string;
    private columnsTypes: Map<string,string> = new Map<string, string>();

    protected constructor(nodeConfig: NodeConfig) {
        super({
            type: nodeConfig.codeName,
            name: nodeConfig.name,
        });
        this.portsOut = [];
        this.portsIn = [];
        this.title = nodeConfig.name;
    }

    updateNode = () => {
        console.log("UPDATE")
    }

    setColumnsAndTypes = (columnsTypes: Map<string, string>) => {
        this.columnsTypes = columnsTypes;
        this.updateNode();
    }

    getColumnsAndTypes = () => {
        return this.columnsTypes;
    }

    addNewColumn = (array, value) => {
        if (array.length > 0) {
            array.splice(array.length-1, 0, value);
        }
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
        this.title = event.data.title;
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
            title: this.title,
        };
    }

    getInPorts(): BasePortModel[] {
        return this.portsIn;
    }

    getOutPorts(): BasePortModel[] {
        return this.portsOut;
    }

    setTitle = (title: string) => {
        this.title = title;
    }

    getTitle = () => {
        return this.title;
    }

}
