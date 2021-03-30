import Papa from "papaparse";
import {BaseNodeModel} from "../../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../../ports/dataset/DatasetPortModel";
import {NODE_CSV} from "../../DataConfig";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {Column} from "../Column";


export class CSVModel extends BaseNodeModel {

    private fileName: string = "";
    private numCols: number = 0;
    private numRows: number = 0;
    private columnNames: string[] = [];
    private columnTypes: Map<string, Column> = new Map();
    private labels: Map<string, number> = new Map();

    constructor() {
        super(NODE_CSV);
        this.resetFile();
        this.addOutPort();
    }

    private resetFile(): void {
        this.fileName = "";
        this.numCols = 0;
        this.numRows = 0;
        this.columnNames = [];
        this.columnTypes.clear();
        this.labels.clear();
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

    getLabels() {
        return this.labels;
    }

    getColumnTypes() {
        return this.columnTypes;
    }

    protected addOutPort(): void {
        const p = new DatasetPortModel(false);
        super.addPort(p);
    }

    loadCSV = async (selectorFiles: FileList) => {
        if (selectorFiles.length === 0) {
            return;
        }
        this.resetFile();
        this.fileName = selectorFiles[0].name;
        if (selectorFiles[0] != null) {
            return new Promise((complete, error) => {
                Papa.parse(selectorFiles[0], {
                    worker: false, // Don't bog down the main thread if its a big file
                    download: true,
                    header: false,
                    fastMode: false,
                    skipEmptyLines: true,
                    dynamicTyping: true,
                    complete: (results: any) => {
                        if (results.data.length > 0) {
                            console.log(results.data);
                            this.numCols = results.data[0].length;//num features
                            this.numRows = results.data.length - 1;//num entries, -1 because of column name's row
                            this.columnNames = results.data[0];
                            this.labels = this.processDataset(results.data);
                            this.processColumnTypes(results.data)
                            console.log("numCols:" + this.numCols + " numRows:" + this.numRows);
                            console.log(this.labels);
                        }
                        complete(results.data);
                    }
                });
            });
        }
    }

    processColumnTypes = (data: string[][]) => {
        for(let i = 0; i < data[i].length; i++) {
            for(let j = 0; j < 1; j++) {
                // Initialize columns
                let currCol = data[0][i];
                this.columnTypes.set(currCol, new Column());
            }
            for(let j = 1; j < data.length; j++) {
                let currCol = data[0][i];
                let currField = data[j][i];
                const currColumn = this.columnTypes.get(currCol);
                if (currField === null) {
                    // found a missing field
                    currColumn.incNullCounter();
                } else {
                    currColumn.updateType(currField);
                    // console.log(typeof currField + " " + currColumn.getType())
                }
            }
        }
    }

    processDataset = (data: string[][]) => {
        const labels = new Map();
        const lastColIndex = data[0].length - 1;
        for(let i = 1; i < data.length; i++) {
            let currLabel = labels.get(data[i][lastColIndex]);
            if(currLabel === undefined) {
                labels.set(data[i][lastColIndex], 1);
            } else {
                labels.set(data[i][lastColIndex], currLabel+1);
            }
        }
        return labels;
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.fileName = event.data.fileName;
        this.numCols = event.data.numCols;
        this.numRows = event.data.numRows;
        this.columnNames = event.data.columnNames;
        const jsonTypes = event.data.columnTypes;
        for (let value in jsonTypes) {
            this.columnTypes.set(value,jsonTypes[value])
        }
        const jsonLabels = event.data.labels;
        for (let value in jsonLabels) {
            this.labels.set(value,jsonLabels[value])
        }
    }

    serialize(): any {
        let jsonTypes = {};
        this.columnTypes.forEach((value, key) => {
            jsonTypes[key] = value
        });
        let jsonLabels = {};
        this.labels.forEach((value, key) => {
            jsonLabels[key] = value
        });
        return {
            ...super.serialize(),
            fileName: this.fileName,
            numCols: this.numCols,
            numRows: this.numRows,
            columnNames: this.columnNames,
            columnTypes: jsonTypes,
            labels: jsonLabels,
        };
    }


}
