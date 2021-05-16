import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {ClassifierPortModel} from "../../../ports/model/ClassifierPortModel";
import {CriterionEnum} from "../random-forest-classifier/RandomForestClassifierModel";

export const SVM_CLASSIFIER: NodeConfig = {
    codeName: "SVMClassifier",
    name: "SVM Classifier",
}

export enum KernelEnum {
    LINEAR = 'linear',
    POLY = 'poly',
    RBF = 'rbf',
    SIGMOID = 'sigmoid',
    PRE_COMPUTED = 'precomputed',
}

export class SVMClassifierModel extends BaseNodeModel {

    private C: number = 1.0; //float
    private kernel: KernelEnum = KernelEnum.RBF;
    private degree: number = 3; //int

    constructor() {
        super(SVM_CLASSIFIER);
        this.addInPort();
        this.addOutPort();
    }

    getC(): number {
        return this.C;
    }

    setC(value: number) {
        this.C = value;
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

    protected addInPort(): void {
        const p = new DatasetPortModel(true);
        super.addPort(p);
    }

    protected addOutPort(): void {
        const p = new ClassifierPortModel(false);
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.C = event.data.C;
        this.kernel = event.data.kernel;
        this.degree = event.data.degree;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            C: this.C,
            kernel: this.kernel,
            degree: this.degree,
        };
    }

}
