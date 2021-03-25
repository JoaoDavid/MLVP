import {BaseNodeModel} from "../../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../../ports/dataset/DatasetPortModel";
import {NODE_RANDOM_FOREST_CLASSIFIER} from "../../ModelConfig";
import {ClassifierPortModel} from "../../../../ports/model/ClassifierPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";

export enum CriterionEnum {
    GINI = 'gini',
    ENTROPY = 'entropy',
}

export class RandomForestClassifierModel extends BaseNodeModel {

    private numTrees: number = 100; //int
    private criterion: CriterionEnum = CriterionEnum.GINI;
    private maxDepth: number = -1; //int

    constructor() {
        super(NODE_RANDOM_FOREST_CLASSIFIER);
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
        console.log(this.criterion);
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
        this.maxDepth = event.data.maxDepth === 'None'?-1:event.data.maxDepth;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            numTrees: this.numTrees,
            criterion: this.criterion,
            maxDepth: this.maxDepth===-1?"None":this.maxDepth,
        };
    }

}
