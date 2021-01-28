import {CoreNodeModel} from "../../../core/CoreNode/CoreNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {NODE_UNDERSAMPLING} from "../DataConfig";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";


export class UndersamplingModel extends CoreNodeModel {

    private randomState: number = 0;

    constructor() {
        super(NODE_UNDERSAMPLING.codeName, NODE_UNDERSAMPLING.name, NODE_UNDERSAMPLING.tier);
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
        const p = new DatasetPortModel(this.getTier(), true);
        super.addPort(p);
    }

    protected addOutPort(): void {
        const p = new DatasetPortModel(this.getTier(), false, "Balanced Dataset");
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
