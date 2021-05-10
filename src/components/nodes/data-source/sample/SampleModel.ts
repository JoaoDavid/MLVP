import {CSVModel} from "../csv/CSVModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {NodeConfig} from "../../../core/BaseNode/BaseNodeModel";

export const SAMPLE_CSV: NodeConfig = {
    codeName: "SampleCSV",
    name: "Sample CSV",
}

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
