import {CoreNodeModel} from "../../../core/CoreNode/CoreNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {PortModelAlignment} from "@projectstorm/react-diagrams-core";
import {NODE_SPLIT_DATASET} from "../DataConfig";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";


export class SplitDatasetModel extends CoreNodeModel {

    private testSize: number = 0.25;
    private trainSize: number = 1 - this.testSize;
    private shuffle: string = "True";

    constructor() {
        super(NODE_SPLIT_DATASET.codeName, NODE_SPLIT_DATASET.name, NODE_SPLIT_DATASET.tier);
        this.addInPort('dataset');
        this.addOutPort('');
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

    protected addInPort(label: string): void {
        const p = new DatasetPortModel(this.tier, {
            in: true,
            name: label,
            label: label,
            alignment: PortModelAlignment.LEFT
        });
        super.addPort(p);
    }

    protected addOutPort(label: string): void {
        const p = new DatasetPortModel(this.tier, {
            in: false,
            name: label,
            label: label,
            alignment: PortModelAlignment.RIGHT
        });
        super.addPort(p);
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
