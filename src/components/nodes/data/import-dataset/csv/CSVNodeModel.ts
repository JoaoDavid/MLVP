import Papa from "papaparse";
import {CoreNodeModel} from "../../../../core/CoreNode/CoreNodeModel";
import {DatasetPortModel} from "../../../../ports/dataset/DatasetPortModel";
import {PortModelAlignment} from "@projectstorm/react-diagrams-core";
import {NODE_CSV} from "../../DataConfig";


export class CSVNodeModel extends CoreNodeModel {

    private fileName: string = "";
    private numCols: number = 0;
    private numRows: number = 0;


    getFileName(): string {
        return this.fileName;
    }

    getCols(): number {
        return this.numCols;
    }

    getRows(): number {
        return this.numRows;
    }

    constructor() {
        super(NODE_CSV, 'Import from CSV');
        this.addOutPort('');
    }

    protected addOutPort(label: string, after = true): DatasetPortModel {
        const p = new DatasetPortModel({
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

    loadCSV = async (selectorFiles: FileList) => {
        this.fileName = selectorFiles[0].name;
        if (selectorFiles[0] != null) {
            return new Promise((complete, error) => {
                Papa.parse(selectorFiles[0], {
                    worker: false, // Don't bog down the main thread if its a big file
                    download: true,
                    header: false,
                    complete: (results: any) => {
                        console.log(results.data);
                        this.numCols = results.data[0].length;//num features
                        this.numRows = results.data.length;//num entries
                        console.log("numCols:" + this.numCols + " numRows:" + this.numRows);
                        complete(results.data);
                    }
                });
            });
        }
    }


}
