import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";

export const SAMPLING: NodeConfig = {
    codeName: "Sampling",
    name: "Sampling",
}

export class SamplingModel extends BaseNodeModel {

    private frac: number = 0.5; //float
    private replace: boolean = false;
    private randomStateChecked: boolean = true;
    private randomState: number = 0;

    constructor() {
        super(SAMPLING);
        this.addInPort();
        this.addOutPort();
    }

    getFrac(): number {
        return this.frac;
    }

    setFrac(value: number) {
        this.frac = value;
    }

    getReplace = (): boolean => {
        return this.replace;
    }

    setReplace = (value:boolean) => {
        this.replace = value;
    }

    getRandomStateChecked (): boolean {
        return this.randomStateChecked;
    }

    setRandomStateChecked (value: boolean) {
        this.randomStateChecked = value;
    }

    getRandomState(): number {
        return this.randomState;
    }

    setRandomState(value: number) {
        this.randomState = value;
    }

    protected addInPort(): void {
        const p = new DatasetPortModel(true);
        super.addPort(p);
    }

    protected addOutPort(): void {
        const p = new DatasetPortModel(false, "Sampled Dataset");
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.frac = event.data.frac;
        this.replace = event.data.replace;
        let randomState = event.data.randomState;
        if (randomState === "None") {
            this.randomStateChecked = false;
        } else {
            this.randomState = randomState;
            this.randomStateChecked = true;
        }
    }

    serialize(): any {
        return {
            ...super.serialize(),
            frac: this.frac,
            replace: this.replace,
            randomState: this.randomStateChecked?this.randomState:"None",
        };
    }

}
