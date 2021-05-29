import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";

export const SAMPLING: NodeConfig = {
    codeName: "Sampling",
    name: "Sampling",
}

export class SamplingModel extends BaseNodeModel {

    constructor() {
        super(SAMPLING);
        this.addInPort();
        this.addOutPort();
    }

    protected addInPort(): void {
        const p = new DatasetPortModel(true);
        super.addPort(p);
    }

    protected addOutPort(): void {
        const p = new DatasetPortModel(false, "Sampled Dataset");
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        // TODO
        // this.newColumnName = event.data.column_name;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            // TODO
            // newColumnName: this.newColumnName,
        };
    }

}
