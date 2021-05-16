import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {ClassifierPortModel} from "../../../ports/model/ClassifierPortModel";

export const K_NEAREST_NEIGHBORS_CLASSIFIER: NodeConfig = {
    codeName: "KNearestNeighborsClassifier",
    name: "K Nearest Neighbors Classifier",
}

export enum WeightsEnum {
    UNIFORM = 'uniform',
    DISTANCE = 'distance',
}

export enum AlgorithmEnum {
    AUTO = 'auto',
    BALL_TREE = 'ball_tree',
    KD_TREE = 'kd_tree',
    BRUTE = 'brute',
}

export class KNearestNeighborsClassifierModel extends BaseNodeModel {

    private numNeighbors: number = 5; //int
    private weights: WeightsEnum = WeightsEnum.UNIFORM;
    private algorithm: AlgorithmEnum = AlgorithmEnum.AUTO;

    constructor() {
        super(K_NEAREST_NEIGHBORS_CLASSIFIER);
        this.addInPort();
        this.addOutPort();
    }

    getNumNeighbors(): number {
        return this.numNeighbors;
    }

    setNumNeighbors(value: number) {
        this.numNeighbors = value;
    }

    getWeights(): WeightsEnum {
        return this.weights;
    }

    setWeights(value: string) {
        if (value === WeightsEnum.UNIFORM) {
            this.weights = WeightsEnum.UNIFORM;
        } else if (value === WeightsEnum.DISTANCE) {
            this.weights = WeightsEnum.DISTANCE;
        }
    }

    getAlgorithm(): AlgorithmEnum {
        return this.algorithm;
    }

    setAlgorithm(value: string) {
        if (value === AlgorithmEnum.AUTO) {
            this.algorithm = AlgorithmEnum.AUTO;
        } else if (value === AlgorithmEnum.BALL_TREE) {
            this.algorithm = AlgorithmEnum.BALL_TREE;
        } else if (value === AlgorithmEnum.KD_TREE) {
            this.algorithm = AlgorithmEnum.KD_TREE;
        } else if (value === AlgorithmEnum.BRUTE) {
            this.algorithm = AlgorithmEnum.BRUTE;
        }
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
        this.numNeighbors = event.data.numNeighbors;
        this.weights = event.data.weights;
        this.algorithm = event.data.algorithm;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            numNeighbors: this.numNeighbors,
            weights: this.weights,
            algorithm: this.algorithm,
        };
    }

}
