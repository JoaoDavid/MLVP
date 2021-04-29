import {BaseNodeModel} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {PCA} from "../DataConfig";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {Column} from "../import-dataset/Column";


export class PCAModel extends BaseNodeModel {

    private columns: Column[] = [];
    private randomStateChecked: boolean = true;
    private randomState: number = 0;
    private numComponents: number = 1;

    constructor() {
        super(PCA);
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
        let randomState = event.data.randomState;
        if (randomState === "None") {
            this.randomState = 0;
            this.randomStateChecked = false;
        } else {
            this.randomState = randomState;
            this.randomStateChecked = true;
        }
        this.numComponents = event.data.numComponents;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            randomState: this.randomStateChecked?this.randomState:"None",
            numComponents: this.numComponents,
        };
    }

    getColumns() {
        return this.columns;
    }

}
