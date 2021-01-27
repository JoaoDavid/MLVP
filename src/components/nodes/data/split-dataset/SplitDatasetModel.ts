import {CoreNodeModel} from "../../../core/CoreNode/CoreNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {NODE_SPLIT_DATASET} from "../DataConfig";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";


export class SplitDatasetModel extends CoreNodeModel {

    private testSize: number = 0.25;
    private trainSize: number = 1 - this.testSize;
    private shuffle: string = "True";

    constructor() {
        super(NODE_SPLIT_DATASET.codeName, NODE_SPLIT_DATASET.name, NODE_SPLIT_DATASET.tier);
        this.addInPort();
        this.addOutPort();
    }

    getTestSize(): number {
        return this.testSize;
    }

    setTestSize(value: number) {
        this.testSize = value;
    }

    getTrainSize(): number {
        return this.trainSize;
    }

    setTrainSize(value: number) {
        this.trainSize = value;
    }

    getShuffle(): string {
        return this.shuffle;
    }

    setShuffle(value: string) {
        this.shuffle = value;
    }

    protected addInPort(): void {
        const p = new DatasetPortModel(this.getTier(), true, "in-ds", "");
        super.addPort(p);
    }

    protected addOutPort(): void {
        const p1 = new DatasetPortModel(this.getTier(), false, "TRAIN_DATASET", "");
        const p2 = new DatasetPortModel(this.getTier(), false, "TEST_DATASET", "");
        super.addPort(p1);
        super.addPort(p2);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.testSize = event.data.testSize;
        this.trainSize = event.data.trainSize;
        this.shuffle = event.data.shuffle;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            testSize: this.testSize,
            trainSize: this.trainSize,
            shuffle: this.shuffle,
        };
    }


}
