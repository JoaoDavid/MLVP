import {BaseNodeModel} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {UNDERSAMPLING} from "../../data/DataConfig";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";


export class UndersamplingModel extends BaseNodeModel {

    private randomStateChecked: boolean = true;
    private randomState: number = 0;

    constructor() {
        super(UNDERSAMPLING);
        this.addInPort();
        this.addOutPort();
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
        const p = new DatasetPortModel(false, "Balanced Dataset");
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        let randomState = event.data.randomState;
        if (randomState === "None") {
            this.randomState = 0;
            this.randomStateChecked = false;
        } else {
            this.randomState = randomState;
            this.randomStateChecked = true;
        }
    }

    serialize(): any {
        return {
            ...super.serialize(),
            randomState: this.randomStateChecked?this.randomState:"None",
        };
    }


}
