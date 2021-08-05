import {BaseNodeModel, NodeConfig} from "../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";


export abstract class ImportDataset extends BaseNodeModel {

    private numCols: number = 0;
    private numRows: number = 0;
    private timeSeries: boolean = false;
    private balanced: boolean = false;

    protected constructor(nodeConfig: NodeConfig) {
        super(nodeConfig);
        this.addOutPort();
    }

    protected resetFile(): void {
        this.numCols = 0;
        this.numRows = 0;
        // this.timeSeries = false;
    }

    getCols = (): number => {
        return this.numCols;
    }

    getRows = (): number => {
        return this.numRows;
    }

    getTimeSeries = (): boolean => {
        return this.timeSeries;
    }

    setCols = (value:number) => {
        this.numCols = value;
    }

    setRows = (value:number) => {
        this.numRows = value;
    }

    setTimeSeries = (value:boolean) => {
        this.timeSeries = value;
    }

    getBalanced = (): boolean => {
        return this.balanced;
    }

    setBalanced = (value:boolean) => {
        this.balanced = value;
    }

    protected addOutPort(): void {
        const p = new DatasetPortModel(false);
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.numCols = event.data.numCols;
        this.numRows = event.data.numRows;
        this.timeSeries = event.data.timeSeries;
        this.balanced = event.data.balanced;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            numCols: this.numCols,
            numRows: this.numRows,
            timeSeries: this.timeSeries,
            balanced: this.balanced,
        };
    }


}
