import Papa from "papaparse";
import {CoreNodeModel} from "../core/CoreNode/CoreNodeModel";

export const csv = 'csv';

export class CSVNodeModel extends CoreNodeModel {

    private numCols: number;
    private numRows: number;

    constructor() {
        super(csv, 'Import from CSV');
        this.numCols = 0;
        this.numRows = 0;
        super.addOutPort('');
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
