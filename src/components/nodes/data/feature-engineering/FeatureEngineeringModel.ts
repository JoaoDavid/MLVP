import {BaseNodeModel} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {FEATURE_ENGINEERING} from "../DataConfig";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";


export class FeatureEngineeringModel extends BaseNodeModel {

    private lines: string = "# new_col = col3 + 4;";
    private errorLines: boolean = true;

    constructor() {
        super(FEATURE_ENGINEERING);
        this.addInPort();
        this.addOutPort();
    }

    getErrorLines(): boolean {
        return this.errorLines;
    }

    getLines(): string {
        return this.lines;
    }

    setLines(value: string) {
        this.lines = value;
    }

    protected addInPort(): void {
        const p = new DatasetPortModel(true);
        super.addPort(p);
    }

    protected addOutPort(): void {
        const p = new DatasetPortModel(false, "Engineered Dataset");
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.lines = event.data.lines;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            lines: this.lines,
        };
    }

}
