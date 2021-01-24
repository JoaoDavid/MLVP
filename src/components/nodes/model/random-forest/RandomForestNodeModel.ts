import {CoreNodeModel} from "../../../core/CoreNode/CoreNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {PortModelAlignment} from "@projectstorm/react-diagrams-core";
import {NODE_RANDOM_FOREST} from "../ModelConfig";
import {MLModelPortModel} from "../../../ports/model/MLModelPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";

export enum CriterionEnum {
    GINI = 'gini',
    ENTROPY = 'entropy',
}

export class RandomForestNodeModel extends CoreNodeModel {

    private numTrees: number = 100; //int
    private criterion: CriterionEnum = CriterionEnum.GINI;
    private maxDepth: number = 0; //int

    constructor() {
        super(NODE_RANDOM_FOREST.codeName, NODE_RANDOM_FOREST.name, NODE_RANDOM_FOREST.tier);
        this.addInPort('in');
        this.addOutPort('out');
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

    protected addInPort(label: string): void {
        const p = new DatasetPortModel(this.tier, {
            in: true,
            name: label,
            label: label,
            alignment: PortModelAlignment.LEFT,
            maximumLinks: 1,
        });
        super.addPort(p);
    }

    protected addOutPort(label: string): void {
        const p = new MLModelPortModel(this.tier, {
            in: false,
            name: label,
            label: label,
            alignment: PortModelAlignment.RIGHT
        });
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.numTrees = event.data.numTrees;
        this.criterion = event.data.criterion;
        //this.setCriterion(event.data.criterion);
        this.maxDepth = event.data.maxDepth;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            numTrees: this.numTrees,
            criterion: this.criterion,
            maxDepth: this.maxDepth,
        };
    }

}
