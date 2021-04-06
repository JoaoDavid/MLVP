import {BaseNodeModel} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {PCA} from "../DataConfig";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";


export class PCAModel extends BaseNodeModel {

    private randomState: number = 0;
    private numComponents: number = 1;

    constructor() {
        super(PCA);
        this.addInPort();
        this.addOutPort();
    }

    getRandomState(): number {
        return this.randomState;
    }

    setRandomState(value: number) {
        this.randomState = value;
    }

    getNumComponents(): number {
        return this.numComponents;
    }

    setNumComponents(value: number) {
        this.numComponents = value;
    }

    protected addInPort(): void {
        const p = new DatasetPortModel(true);
        super.addPort(p);
    }

    protected addOutPort(): void {
        const p = new DatasetPortModel(false, "Reduced Dataset");
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.randomState = event.data.randomState;
        this.numComponents = event.data.numComponents;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            randomState: this.randomState,
            numComponents: this.numComponents,
        };
    }


}
