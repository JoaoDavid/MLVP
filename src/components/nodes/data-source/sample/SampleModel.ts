import {CSVModel} from "../csv/CSVModel";
import {NodeConfig} from "../../../core/BaseNode/BaseNodeModel";

export const SAMPLE_CSV: NodeConfig = {
    codeName: "SampleCSV",
    name: "Sample CSV",
}

export class SampleModel extends CSVModel {

    constructor() {
        super(SAMPLE_CSV);
    }

}
