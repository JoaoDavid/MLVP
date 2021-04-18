import { NodeModel, NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import {BasePortModel} from "../BasePort/BasePortModel";
import { BasePositionModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';
import {NodeConfig} from "../../nodes/Config";
import {DatasetPortModel} from "../../ports/dataset/DatasetPortModel";

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
    private visited: boolean = false;

    protected constructor(nodeConfig: NodeConfig) {
        super({
            type: nodeConfig.codeName,
            name: nodeConfig.name,
        });
        this.portsOut = [];
        this.portsIn = [];
        this.title = nodeConfig.name;
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

    isRootNode(): boolean {
        return this.getInPorts().length == 0;
    }

    setTitle = (title: string) => {
        this.title = title;
    }

    getTitle = () => {
        return this.title;
    }

    isVisited = () => {
        return this.visited;
    }

    resetVisited = () => {
        this.visited = false;
    }

    setVisited = () => {
        this.visited = true;
    }

    updateInputLinks = () => {
        this.getInPorts().forEach((port) => {
            if (port instanceof DatasetPortModel) {
                port.getPortLinks().forEach((link) => {
                    let sourceNode = link.getSourcePort().getNode() as BaseNodeModel;
                    sourceNode.updateLink();
                });
            }
        });
    }

    updateOutputLinks = () => {
        this.getOutPorts().forEach((port) => {
            if (port instanceof DatasetPortModel) {
                port.getPortLinks().forEach((link) => {
                    let targetPort = link.getTargetPort() as DatasetPortModel;
                    let targetNode = link.getTargetPort().getNode() as BaseNodeModel;
                    console.log(port)
                    targetPort.setColumns(port.getColumns());
                    targetNode.updateLink();
                });
            }
        });
    }

    updateLink = () => {
        console.log("BaseNodeModel update LInk")
    }

}
