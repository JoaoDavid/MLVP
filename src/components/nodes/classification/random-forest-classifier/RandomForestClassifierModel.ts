import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {ClassifierPortModel} from "../../../ports/model/ClassifierPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";

export const RANDOM_FOREST_CLASSIFIER: NodeConfig = {
    codeName: "RandomForestClassifier",
    name: "Random Forest Classifier",
}

export enum CriterionEnum {
    GINI = 'gini',
    ENTROPY = 'entropy',
}

export class RandomForestClassifierModel extends BaseNodeModel {

    private numTrees: number = 100; //int
    private criterion: CriterionEnum = CriterionEnum.GINI;
    private maxDepthChecked: boolean = true;
    private maxDepth: number = 10; //int

    constructor() {
        super(RANDOM_FOREST_CLASSIFIER);
        this.addInPort();
        this.addOutPort();
    }

    getNumTrees(): number {
        return this.numTrees;
    }

    setNumTrees(value: number) {
        this.numTrees = value;
    }

    getCriterion(): CriterionEnum {
        return this.criterion;
    }

    setCriterion(value: string) {
        if (value === CriterionEnum.GINI) {
            this.criterion = CriterionEnum.GINI;
        } else if (value === CriterionEnum.ENTROPY) {
            this.criterion = CriterionEnum.ENTROPY;
        }
    }

    getMaxDepthChecked (): boolean {
        return this.maxDepthChecked;
    }

    setMaxDepthChecked (value: boolean) {
        this.maxDepthChecked = value;
    }

    getMaxDepth(): number {
        return this.maxDepth;
    }

    setMaxDepth(value: number) {
        this.maxDepth = value;
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
        this.numTrees = event.data.numTrees;
        this.criterion = event.data.criterion;
        let maxDepth = event.data.maxDepth;
        if (maxDepth === "None") {
            this.maxDepthChecked = false;
        } else {
            this.maxDepth = maxDepth;
            this.maxDepthChecked = true;
        }
    }

    serialize(): any {
        return {
            ...super.serialize(),
            numTrees: this.numTrees,
            criterion: this.criterion,
            maxDepth: this.maxDepthChecked?this.maxDepth:"None",
        };
    }

}
