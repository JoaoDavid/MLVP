import {BaseNodeModel} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {OVERSAMPLING} from "../DataConfig";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";


export class OversamplingModel extends BaseNodeModel {

    private randomState: number = 0;

    constructor() {
        super(OVERSAMPLING);
        this.addInPort();
        this.addOutPort();
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
        this.randomState = event.data.randomState;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            randomState: this.randomState,
        };
    }


}
