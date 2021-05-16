import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {RegressorPortModel} from "../../../ports/model/RegressorPortModel";

export const LOGISTIC_REGRESSION: NodeConfig = {
    codeName: "LogisticRegression",
    name: "Logistic Regression",
}

export enum PenaltyEnum {
    L1 = 'l1',
    L2 = 'l2',
    ELASTICNET = 'elasticnet',
    NONE = 'none',
}

export class LogisticRegressionModel extends BaseNodeModel {

    private penalty: PenaltyEnum = PenaltyEnum.L2;
    private dual: boolean = false;
    private tol: number = 0.0001; //float
    private C: number = 1.0; //float

    constructor() {
        super(LOGISTIC_REGRESSION);
        this.addInPort();
        this.addOutPort();
    }

    getPenalty(): PenaltyEnum {
        return this.penalty;
    }

    setPenalty(value: string) {
        if (value === PenaltyEnum.L1) {
            this.penalty = PenaltyEnum.L1;
        } else if (value === PenaltyEnum.L2) {
            this.penalty = PenaltyEnum.L2;
        } else if (value === PenaltyEnum.ELASTICNET) {
            this.penalty = PenaltyEnum.ELASTICNET;
        } else if (value === PenaltyEnum.NONE) {
            this.penalty = PenaltyEnum.NONE;
        }
    }

    getDual (): boolean {
        return this.dual;
    }

    setDual (value: boolean) {
        this.dual = value;
    }

    getTol(): number {
        return this.tol;
    }

    setTol(value: number) {
        this.tol = value;
    }

    getC(): number {
        return this.C;
    }

    setC(value: number) {
        this.C = value;
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
        this.penalty = event.data.penalty;
        this.dual = event.data.dual;
        this.tol = event.data.tol;
        this.C = event.data.C;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            penalty: this.penalty,
            dual: this.dual,
            tol: this.tol,
            C: this.C,
        };
    }

}
