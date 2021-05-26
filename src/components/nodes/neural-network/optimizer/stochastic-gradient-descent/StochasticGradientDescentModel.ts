import {BaseNodeModel, NodeConfig} from "../../../../core/BaseNode/BaseNodeModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {OptimizerPortModel} from "../../../../ports/optimizer/OptimizerPortModel";

export const STOCHASTIC_GRADIENT_DESCENT: NodeConfig = {
    codeName: "StochasticGradientDescent",
    name: "Stochastic Gradient Descent",
}

export class StochasticGradientDescentModel extends BaseNodeModel {

    constructor() {
        super(STOCHASTIC_GRADIENT_DESCENT);
        this.addOutPort();
    }

    protected addOutPort(): void {
        const p = new OptimizerPortModel(false);
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
