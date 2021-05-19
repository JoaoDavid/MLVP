import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {ClassifierPortModel} from "../../../ports/model/ClassifierPortModel";
import {OptimizerPortModel} from "../../../ports/optimizer/OptimizerPortModel";
import {LayerPortModel} from "../../../ports/layer/LayerPortModel";

export const COMPILER: NodeConfig = {
    codeName: "Compiler",
    name: "Compiler",
}

export class CompilerModel extends BaseNodeModel {

    constructor() {
        super(COMPILER);
        this.addInLayerPort();
        this.addInOptimizerPort();
        // this.addOutPort();
    }

    protected addInLayerPort(): void {
        const p = new LayerPortModel(true);
        super.addPort(p);
    }

    protected addInOptimizerPort(): void {
        const p = new OptimizerPortModel(true);
        super.addPort(p);
    }

    // protected addOutPort(): void {
    //     const p = new ClassifierPortModel(false);
    //     super.addPort(p);
    // }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
    }

    serialize(): any {
        return {
            ...super.serialize(),
        };
    }

}
