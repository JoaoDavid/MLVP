import {BaseNodeModel, NodeConfig} from "../../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {ClassifierPortModel} from "../../../../ports/model/ClassifierPortModel";
import {LayerPortModel} from "../../../../ports/layer/LayerPortModel";

export const DENSE: NodeConfig = {
    codeName: "Dense",
    name: "Dense",
}

export class DenseModel extends BaseNodeModel {

    constructor() {
        super(DENSE);
        this.addInPort();
        this.addOutPort();
    }

    protected addInPort(): void {
        const p = new LayerPortModel(true);
        super.addPort(p);
    }

    protected addOutPort(): void {
        const p = new LayerPortModel(false, "Output Layer");
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
