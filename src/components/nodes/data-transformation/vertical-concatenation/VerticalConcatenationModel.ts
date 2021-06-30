import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";

export const VERTICAL_CONCATENATION: NodeConfig = {
    codeName: "VerticalConcatenation",
    name: "Vertical Concatenation",
}

export class VerticalConcatenationModel extends BaseNodeModel {

    constructor() {
        super(VERTICAL_CONCATENATION);
        this.addInPort();
        this.addOutPort();
    }

    protected addInPort(): void {
        const leftDsPort = new DatasetPortModel(true, "Top Dataset");
        const rightDsPort = new DatasetPortModel(true, "Bottom Dataset");
        super.addPort(leftDsPort);
        super.addPort(rightDsPort);
    }

    protected addOutPort(): void {
        const p = new DatasetPortModel(false, "Concatenated Dataset");
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
    }

    serialize(): any {
        return {
            ...super.serialize(),
        };
    }

}
