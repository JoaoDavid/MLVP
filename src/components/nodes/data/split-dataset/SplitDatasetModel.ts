import {CoreNodeModel} from "../../../core/CoreNode/CoreNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {PortModelAlignment} from "@projectstorm/react-diagrams-core";
import {NODE_SPLIT_DATASET} from "../DataConfig";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";


export class SplitDatasetModel extends CoreNodeModel {

    private fileName: string = "";
    private numCols: number = 0;
    private numRows: number = 0;
    private columnNames: string[] = [];

    constructor() {
        super(NODE_SPLIT_DATASET.codeName, NODE_SPLIT_DATASET.name);
        this.addInPort('dataset');
        this.addOutPort('');
    }

    getFileName(): string {
        return this.fileName;
    }

    getCols(): number {
        return this.numCols;
    }

    getRows(): number {
        return this.numRows;
    }

    getColumnNames(): string[] {
        return this.columnNames;
    }

    protected addInPort(label: string): void {
        const p = new DatasetPortModel({
            in: true,
            name: label,
            label: label,
            alignment: PortModelAlignment.LEFT
        });
        super.addPort(p);
    }

    protected addOutPort(label: string): void {
        const p = new DatasetPortModel({
            in: false,
            name: label,
            label: label,
            alignment: PortModelAlignment.RIGHT
        });
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.fileName = event.data.fileName;
        this.numCols = event.data.numCols;
        this.numRows = event.data.numRows;
        this.columnNames = event.data.columnNames;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            fileName: this.fileName,
            numCols: this.numCols,
            numRows: this.numRows,
            columnNames: this.columnNames,
        };
    }


}
