import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams-core';
import { DefaultPortModel } from '@projectstorm/react-diagrams';
import { BasePositionModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';
import Papa from "papaparse";

export interface CSVNodeModelOptions extends BasePositionModelOptions {
    name: string;
    color?: string;
}

export interface CSVNodeModelGenerics extends NodeModelGenerics {
    OPTIONS: CSVNodeModelOptions;
}

export const csv = 'csv';

export class CSVNodeModel extends NodeModel<CSVNodeModelGenerics> {
    protected portsIn: DefaultPortModel[];
    protected portsOut: DefaultPortModel[];
    private numCols: number;
    private numRows: number;

    constructor() {
        super({
            type: csv,
            name: 'Import from CSV',
            color: 'rgb(0,192,255)',
        });
        this.portsOut = [];
        this.portsIn = [];
        this.numCols = 0;
        this.numRows = 0;
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

    loadCSV = (selectorFiles: FileList) => {
        if (selectorFiles[0] != null) {

            Papa.parse(selectorFiles[0], {
                worker: false, // Don't bog down the main thread if its a big file
                download: true,
                header: false,
                complete: (results:any) => {
                    console.log(results.data);
                    this.numCols = results.data[0].length;//num features
                    this.numRows = results.data.length;//num entries
                    console.log("num_features:" + this.numCols + " num_rows:" + this.numRows);
                }
            });

        }
        console.log(selectorFiles);
    }

}
