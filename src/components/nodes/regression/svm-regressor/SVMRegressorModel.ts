import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {RegressorPortModel} from "../../../ports/model/RegressorPortModel";

export const SVM_REGRESSOR: NodeConfig = {
    codeName: "SVMRegressor",
    name: "SVM Regressor",
}

export class SVMRegressorModel extends BaseNodeModel {

    constructor() {
        super(SVM_REGRESSOR);
        this.addInPort();
        this.addOutPort();
    }

    protected addInPort(): void {
        const p = new DatasetPortModel(true);
        super.addPort(p);
    }

    protected addOutPort(): void {
        const p = new RegressorPortModel(false);
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
