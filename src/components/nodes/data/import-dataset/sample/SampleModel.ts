import {SAMPLE_CSV} from "../../DataConfig";
import {CSVModel} from "../csv/CSVModel";


export class SampleModel extends CSVModel {


    constructor() {
        super(SAMPLE_CSV);
    }


}
