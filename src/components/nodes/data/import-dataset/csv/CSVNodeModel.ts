import Papa from "papaparse";
import {CoreNodeModel} from "../../../../core/CoreNode/CoreNodeModel";
import {DatasetPortModel} from "../../../../ports/dataset/DatasetPortModel";
import {PortModelAlignment} from "@projectstorm/react-diagrams-core";

export const CSV = 'csv';

export class CSVNodeModel extends CoreNodeModel {

    private numCols: number;
    private numRows: number;

    constructor() {
        super(CSV, 'Import from CSV');
        this.numCols = 0;
        this.numRows = 0;
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
