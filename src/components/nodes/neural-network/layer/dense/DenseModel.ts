import {BaseNodeModel, NodeConfig} from "../../../../core/BaseNode/BaseNodeModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {LayerPortModel} from "../../../../ports/layer/LayerPortModel";

export const DENSE: NodeConfig = {
    codeName: "Dense",
    name: "Dense",
}

export enum ActivationEnum {
    RELU = 'relu',
    SIGMOID = 'sigmoid',
    SOFTMAX = 'softmax',
    SOFTPLUS = 'softplus',
    SOFTSIGN = 'softsign',
    TANH = 'tanh',
    SELU = 'selu',
    ELU = 'elu',
    EXPONENTIAL = 'exponential',
}

export class DenseModel extends BaseNodeModel {

    private units: number = 9; //int
    private activation: ActivationEnum = ActivationEnum.RELU;

    constructor() {
        super(DENSE);
        this.addInPort();
        this.addOutPort();
    }

    getUnits(): number {
        return this.units;
    }

    setUnits(value: number) {
        this.units = value;
    }

    getActivation(): ActivationEnum {
        return this.activation;
    }

    setActivation(value: string) {
        if (value === ActivationEnum.RELU) {
            this.activation = ActivationEnum.RELU;
        } else if (value === ActivationEnum.SIGMOID) {
            this.activation = ActivationEnum.SIGMOID;
        } else if (value === ActivationEnum.SOFTMAX) {
            this.activation = ActivationEnum.SOFTMAX;
        } else if (value === ActivationEnum.SOFTPLUS) {
            this.activation = ActivationEnum.SOFTPLUS;
        } else if (value === ActivationEnum.SOFTSIGN) {
            this.activation = ActivationEnum.SOFTSIGN;
        } else if (value === ActivationEnum.TANH) {
            this.activation = ActivationEnum.TANH;
        } else if (value === ActivationEnum.SELU) {
            this.activation = ActivationEnum.SELU;
        } else if (value === ActivationEnum.ELU) {
            this.activation = ActivationEnum.ELU;
        } else if (value === ActivationEnum.EXPONENTIAL) {
            this.activation = ActivationEnum.EXPONENTIAL;
        }
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
        this.units = event.data.units;
        this.activation = event.data.activation;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            units: this.units,
            activation: this.activation,
        };
    }

}
