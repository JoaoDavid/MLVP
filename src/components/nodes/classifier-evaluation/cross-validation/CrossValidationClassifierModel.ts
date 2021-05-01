import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {ClassifierPortModel} from "../../../ports/model/ClassifierPortModel";

export const CROSS_VALIDATION_CLASSIFIER: NodeConfig = {
    codeName: "CrossValidation",
    name: "Cross Validation Classifier",
}

export class CrossValidationClassifierModel extends BaseNodeModel {

    private numberFolds : number = 5;

    constructor() {
        super(CROSS_VALIDATION_CLASSIFIER);
        this.addInPort();
    }

    getNumberFolds(): number {
        return this.numberFolds;
    }

    setNumberFolds(value: number) {
        this.numberFolds = value;
    }

    protected addInPort(): void {
        const p1 = new DatasetPortModel(true);
        const p2 = new ClassifierPortModel(true)
        super.addPort(p1);
        super.addPort(p2);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.numberFolds = event.data.numberFolds;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            numberFolds: this.numberFolds,
        };
    }


}
