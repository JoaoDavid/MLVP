import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";

export const SPLIT_DATASET: NodeConfig = {
    codeName: "SplitDataset",
    name: "Split Dataset",
}

export class SplitDatasetModel extends BaseNodeModel {

    private testSize: number = 0.25;
    private trainSize: number = 1 - this.testSize;
    private shuffle: boolean = false;
    private stratifyByClass: boolean = false;

    constructor() {
        super(SPLIT_DATASET);
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

    getShuffle(): boolean {
        return this.shuffle;
    }

    getStratifyByClass(): boolean {
        return this.stratifyByClass;
    }

    setShuffle(value: boolean) {
        this.shuffle = value;
    }

    setStratifyByClass(value: boolean) {
        this.stratifyByClass = value;
    }

    protected addInPort(): void {
        const p = new DatasetPortModel(true);
        super.addPort(p);
    }

    protected addOutPort(): void {
        const p1 = new DatasetPortModel(false, "Train Dataset");
        const p2 = new DatasetPortModel(false, "Test Dataset");
        super.addPort(p1);
        super.addPort(p2);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.testSize = event.data.testSize;
        this.trainSize = event.data.trainSize;
        this.shuffle = event.data.shuffle;
        this.stratifyByClass = event.data.stratifyByClass;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            testSize: this.testSize,
            trainSize: this.trainSize,
            shuffle: this.shuffle,
            stratifyByClass: this.stratifyByClass,
        };
    }


}
