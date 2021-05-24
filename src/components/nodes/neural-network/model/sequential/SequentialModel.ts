import {BaseNodeModel, NodeConfig} from "../../../../core/BaseNode/BaseNodeModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {ClassifierPortModel} from "../../../../ports/model/ClassifierPortModel";
import {LayerPortModel} from "../../../../ports/layer/LayerPortModel";

export const SEQUENTIAL: NodeConfig = {
    codeName: "Sequential",
    name: "Sequential",
}

export class SequentialModel extends BaseNodeModel {

    constructor() {
        super(SEQUENTIAL);
        this.addOutPort();
    }

    protected addOutPort(): void {
        const p = new LayerPortModel(false);
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