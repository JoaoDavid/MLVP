import Papa from "papaparse";
import {CoreNodeModel} from "../../../../core/CoreNode/CoreNodeModel";
import {DatasetPortModel} from "../../../../ports/dataset/DatasetPortModel";
import {NODE_CSV} from "../../DataConfig";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";


export class CSVModel extends CoreNodeModel {

    private fileName: string = "";
    private numCols: number = 0;
    private numRows: number = 0;
    private columnNames: string[] = [];

    constructor() {
        super(NODE_CSV.codeName, NODE_CSV.name);
        this.resetFile();
        this.addOutPort();
    }

    private resetFile(): void {
        this.fileName = "";
        this.numCols = 0;
        this.numRows = 0;
        this.columnNames = [];
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

    protected addOutPort(): void {
        const p = new DatasetPortModel(false);
        super.addPort(p);
    }

    loadCSV = async (selectorFiles: FileList) => {
        this.resetFile();
        this.fileName = selectorFiles[0].name;
        if (selectorFiles[0] != null) {
            return new Promise((complete, error) => {
                Papa.parse(selectorFiles[0], {
                    worker: false, // Don't bog down the main thread if its a big file
                    download: true,
                    header: false,
                    complete: (results: any) => {
                        if (results.data.length > 0) {
                            console.log(results.data);
                            this.numCols = results.data[0].length;//num features
                            this.numRows = results.data.length - 2;//num entries, -2 because of column row and last empty row left by papaparse
                            this.columnNames = results.data[0];
                            console.log("numCols:" + this.numCols + " numRows:" + this.numRows);
                            complete(results.data);
                        }
                    }
                });
            });
        }
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
