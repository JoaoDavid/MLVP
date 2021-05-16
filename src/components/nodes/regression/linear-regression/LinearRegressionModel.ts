import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {RegressorPortModel} from "../../../ports/model/RegressorPortModel";

export const LINEAR_REGRESSION: NodeConfig = {
    codeName: "LinearRegression",
    name: "Linear Regression",
}

export class LinearRegressionModel extends BaseNodeModel {

    private fitIntercept: boolean = false;
    private normalize: boolean = false;
    private copyX: boolean = false;
    private numJobsChecked: boolean = false;
    private numJobs: number = 1; //int
    private positive: boolean = false;

    constructor() {
        super(LINEAR_REGRESSION);
        this.addInPort();
        this.addOutPort();
    }

    getFitIntercept = (): boolean => {
        return this.fitIntercept;
    }

    setFitIntercept = (value:boolean) => {
        this.fitIntercept = value;
    }
    getNormalize = (): boolean => {
        return this.normalize;
    }

    setNormalize = (value:boolean) => {
        this.normalize = value;
    }

    getCopyX = (): boolean => {
        return this.copyX;
    }

    setCopyX = (value:boolean) => {
        this.copyX = value;
    }

    getNumJobsChecked (): boolean {
        return this.numJobsChecked;
    }

    setNumJobsChecked (value: boolean) {
        this.numJobsChecked = value;
    }

    getNumJobs(): number {
        return this.numJobs;
    }

    setNumJobs(value: number) {
        this.numJobs = value;
    }

    getPositive = (): boolean => {
        return this.positive;
    }

    setPositive = (value:boolean) => {
        this.positive = value;
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
        this.fitIntercept = event.data.fitIntercept;
        this.normalize = event.data.normalize;
        this.copyX = event.data.copyX;
        let numJobs = event.data.numJobs;
        if (numJobs === "None") {
            this.numJobsChecked = false;
        } else {
            this.numJobs = numJobs;
            this.numJobsChecked = true;
        }
        this.positive = event.data.positive;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            fitIntercept: this.fitIntercept,
            normalize: this.normalize,
            copyX: this.copyX,
            numJobs: this.numJobsChecked?this.numJobs:"None",
            positive: this.positive,
        };
    }

}
