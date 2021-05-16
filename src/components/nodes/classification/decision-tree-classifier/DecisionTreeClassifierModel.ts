import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {ClassifierPortModel} from "../../../ports/model/ClassifierPortModel";

export const DECISION_TREE_CLASSIFIER: NodeConfig = {
    codeName: "DecisionTreeClassifier",
    name: "Decision Tree Classifier",
}

export enum CriterionEnum {
    GINI = 'gini',
    ENTROPY = 'entropy',
}

export enum SplitterEnum {
    BEST = 'best',
    RANDOM = 'random',
}

export class DecisionTreeClassifierModel extends BaseNodeModel {

    private criterion: CriterionEnum = CriterionEnum.GINI;
    private splitter: SplitterEnum = SplitterEnum.BEST;
    private maxDepthChecked: boolean = false;
    private maxDepth: number = 10; //int

    constructor() {
        super(DECISION_TREE_CLASSIFIER);
        this.addInPort();
        this.addOutPort();
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

    getSplitter(): SplitterEnum {
        return this.splitter;
    }

    setSplitter(value: string) {
        if (value === SplitterEnum.BEST) {
            this.splitter = SplitterEnum.BEST;
        } else if (value === SplitterEnum.RANDOM) {
            this.splitter = SplitterEnum.RANDOM;
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
        this.criterion = event.data.criterion;
        this.splitter = event.data.splitter;
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
            criterion: this.criterion,
            splitter: this.splitter,
            maxDepth: this.maxDepthChecked?this.maxDepth:"None",
        };
    }

}
