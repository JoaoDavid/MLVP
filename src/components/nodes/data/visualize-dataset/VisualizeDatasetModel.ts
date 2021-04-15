import {BaseNodeModel} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {VISUALIZE_DATASET} from "../DataConfig";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";


export class VisualizeDatasetModel extends BaseNodeModel {

    constructor() {
        super(VISUALIZE_DATASET);
        this.addInPort();
    }

    protected addInPort(): void {
        const p = new DatasetPortModel(true);
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
    }

    serialize(): any {
        return {
            ...super.serialize(),
        };
    }


}
