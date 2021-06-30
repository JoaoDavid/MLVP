import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";

export const HORIZONTAL_CONCATENATION: NodeConfig = {
    codeName: "HorizontalConcatenation",
    name: "Horizontal Concatenation",
}

export class HorizontalConcatenationModel extends BaseNodeModel {

    constructor() {
        super(HORIZONTAL_CONCATENATION);
        this.addInPort();
        this.addOutPort();
    }

    protected addInPort(): void {
        const leftDsPort = new DatasetPortModel(true, "Left Dataset");
        const rightDsPort = new DatasetPortModel(true, "Right Dataset");
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
