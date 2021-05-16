import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {RegressorPortModel} from "../../../ports/model/RegressorPortModel";

export const SVM_REGRESSOR: NodeConfig = {
    codeName: "SVMRegressor",
    name: "SVM Regressor",
}

export enum KernelEnum {
    LINEAR = 'linear',
    POLY = 'poly',
    RBF = 'rbf',
    SIGMOID = 'sigmoid',
    PRE_COMPUTED = 'precomputed',
}
export enum GammaEnum {
    SCALE = 'scale',
    AUTO = 'auto',
}

export class SVMRegressorModel extends BaseNodeModel {

    private kernel: KernelEnum = KernelEnum.RBF;
    private degree: number = 3; //int
    private gamma: GammaEnum = GammaEnum.SCALE;

    constructor() {
        super(SVM_REGRESSOR);
        this.addInPort();
        this.addOutPort();
    }

    getKernel(): KernelEnum {
        return this.kernel;
    }

    setKernel(value: string) {
        if (value === KernelEnum.LINEAR) {
            this.kernel = KernelEnum.LINEAR;
        } else if (value === KernelEnum.POLY) {
            this.kernel = KernelEnum.POLY;
        } else if (value === KernelEnum.RBF) {
            this.kernel = KernelEnum.RBF;
        } else if (value === KernelEnum.SIGMOID) {
            this.kernel = KernelEnum.SIGMOID;
        } else if (value === KernelEnum.PRE_COMPUTED) {
            this.kernel = KernelEnum.PRE_COMPUTED;
        }
    }

    getDegree(): number {
        return this.degree;
    }

    setDegree(value: number) {
        this.degree = value;
    }

    getGamma(): GammaEnum {
        return this.gamma;
    }

    setGamma(value: string) {
        if (value === GammaEnum.SCALE) {
            this.gamma = GammaEnum.SCALE;
        } else if (value === GammaEnum.AUTO) {
            this.gamma = GammaEnum.AUTO;
        }
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
        this.kernel = event.data.kernel;
        this.degree = event.data.degree;
        this.gamma = event.data.gamma;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            kernel: this.kernel,
            degree: this.degree,
            gamma: this.gamma,
        };
    }

}
