import {SAMPLE_CSV} from "../../data/DataConfig";
import {CSVModel} from "../csv/CSVModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";


export class SampleModel extends CSVModel {

    private balanced: boolean = false;

    constructor() {
        super(SAMPLE_CSV);
    }

    getBalanced = (): boolean => {
        return this.balanced;
    }

    setBalanced = (value:boolean) => {
        this.balanced = value;
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.balanced = event.data.balanced;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            balanced: this.balanced,
        };
    }

}
