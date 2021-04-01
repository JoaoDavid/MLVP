import {BaseNodeModel} from "../../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../../ports/dataset/DatasetPortModel";
import {ABSTRACT_DS} from "../../DataConfig";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";


export class AbstractDsModel extends BaseNodeModel {

    private numCols: number = 0;
    private numRows: number = 0;

    constructor() {
        super(ABSTRACT_DS);
        this.resetFile();
        this.addOutPort();
    }

    private resetFile(): void {
        this.numCols = 0;
        this.numRows = 0;
    }

    getCols = (): number => {
        return this.numCols;
    }

    getRows = (): number => {
        return this.numRows;
    }

    setCols = (value:number) => {
        this.numCols = value;
    }

    setRows = (value:number) => {
        this.numRows = value;
    }

    protected addOutPort(): void {
        const p = new DatasetPortModel(false);
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.numCols = event.data.numCols;
        this.numRows = event.data.numRows;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            numCols: this.numCols,
            numRows: this.numRows,
        };
    }


}
