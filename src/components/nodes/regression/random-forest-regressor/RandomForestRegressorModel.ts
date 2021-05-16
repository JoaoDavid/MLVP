import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {RegressorPortModel} from "../../../ports/model/RegressorPortModel";

export const RANDOM_FOREST_REGRESSOR: NodeConfig = {
    codeName: "RandomForestRegressor",
    name: "Random Forest Regressor",
}

export enum CriterionEnum {
    MSE = 'mse',
    MAE = 'mae',
}

export class RandomForestRegressorModel extends BaseNodeModel {

    private numTrees: number = 100; //int
    private criterion: CriterionEnum = CriterionEnum.MSE;
    private maxDepthChecked: boolean = true;
    private maxDepth: number = 10; //int

    constructor() {
        super(RANDOM_FOREST_REGRESSOR);
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
        if (value === CriterionEnum.MSE) {
            this.criterion = CriterionEnum.MSE;
        } else if (value === CriterionEnum.MAE) {
            this.criterion = CriterionEnum.MAE;
        }
        console.log(this.criterion);
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
        const p = new RegressorPortModel(false);
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
        }    }

    serialize(): any {
        return {
            ...super.serialize(),
            numTrees: this.numTrees,
            criterion: this.criterion,
            maxDepth: this.maxDepthChecked?this.maxDepth:"None",
        };
    }

}
