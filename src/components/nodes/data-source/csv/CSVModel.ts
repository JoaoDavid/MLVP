import Papa from "papaparse";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {Column} from "../Column";
import {ImportDataset} from "../ImportDataset";
import {NodeConfig} from "../../../core/BaseNode/BaseNodeModel";

export const IMPORT_FROM_CSV: NodeConfig = {
    codeName: "ImportFromCSV",
    name: "Import from CSV",
}

export class CSVModel extends ImportDataset {

    private fileName: string = "";
    private labels: Map<string, number> = new Map();
    private columns: Column[] = [];
    private targetIndex: number = -1;

    constructor(nodeConfig?: NodeConfig) {
        super(nodeConfig || IMPORT_FROM_CSV);
        this.resetFile();
    }

    protected resetFile(): void {
        super.resetFile();
        this.fileName = "";
        this.labels.clear();
        this.columns = [];
        this.targetIndex = -1;
    }

    getFileName(): string {
        return this.fileName;
    }

    getLabels() {
        return this.labels;
    }

    getColumns() {
        return this.columns;
    }

    protected addOutPort(): void {
        const p = new DatasetPortModel(false);
        super.addPort(p);
    }

    loadCSV = async (selectorFiles: FileList) => {
        let t0 = performance.now()
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
                            // console.log(results.data);
                            this.setCols(results.data[0].length);//num features
                            this.setRows(results.data.length - 1);//num entries, -1 because of column name's row
                            this.processColumns(results.data);
                            this.labels = this.processLabels(results.data);
                            this.targetIndex = this.getCols() - 1;
                            this.cleanCategories();
                            // console.log(this.labels);
                            // console.log(this.columns);
                            // let outPort = this.getOutPorts()[0] as DatasetPortModel;
                            // outPort.setColumns(this.columns);
                            let t1 = performance.now()
                            console.log("Call to doSomething took " + (t1 - t0)/1000 + " seconds.")
                        }
                        console.log(this.columns)
                        complete(results.data);
                    }
                });
            });
        }
    }

    cleanCategories = () => {
        this.columns.forEach((column) => {
            column.cleanCategories();
        })
    }

    processColumns = (data: string[][]) => {
        console.log(data)
        for (let i = 0; i < data[0].length; i++) {
            let currCol = data[0][i];
            for (let j = 0; j < 1; j++) {
                // Initialize columnsgadga
                this.columns.push(new Column(currCol));
            }
            for (let j = 1; j < data.length; j++) {
                let currField = data[j][i];
                const currColumn = this.columns[this.columns.length - 1];
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

    processLabels = (data: string[][]) => {
        const labels = new Map();
        const lastColIndex = data[0].length - 1;
        for (let i = 1; i < data.length; i++) {
            let currLabel = labels.get(data[i][lastColIndex]);
            if (currLabel === undefined) {
                labels.set(data[i][lastColIndex], 1);
            } else {
                labels.set(data[i][lastColIndex], currLabel + 1);
            }
        }
        return labels;
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.fileName = event.data.fileName;
        const jsonLabels = event.data.labels;
        for (let value in jsonLabels) {
            this.labels.set(value, jsonLabels[value])
        }
        this.columns = event.data.columns.map((object) => {
            console.log(object)
            return Column.createColumn(object.name, object.type, object.nullCounter);
        });
        this.targetIndex = event.data.targetIndex;
    }

    serialize(): any {
        let jsonLabels = {};
        this.labels.forEach((value, key) => {
            jsonLabels[key] = value
        });
        let columns = []
        this.columns.forEach((column) => {
            columns.push(column.serialize());
        })
        return {
            ...super.serialize(),
            fileName: this.fileName,
            labels: jsonLabels,
            columns: columns,
            targetIndex: this.targetIndex,
        };
    }

}
