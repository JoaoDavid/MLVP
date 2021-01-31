import {CoreNodeModel} from "../../../core/CoreNode/CoreNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import { NODE_CROSS_VALIDATION } from "../EvaluateConfig";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {ModelPortModel} from "../../../ports/model/ModelPortModel";


export class CrossValidationModel extends CoreNodeModel {

    private numberFolds : number = 5;

    constructor() {
        super(NODE_CROSS_VALIDATION.codeName, NODE_CROSS_VALIDATION.name);
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
        const p2 = new ModelPortModel(true)
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
