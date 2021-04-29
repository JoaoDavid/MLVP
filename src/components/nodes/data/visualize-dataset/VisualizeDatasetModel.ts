import {BaseNodeModel} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {VISUALIZE_DATASET} from "../DataConfig";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {Column} from "../import-dataset/Column";


export class VisualizeDatasetModel extends BaseNodeModel {

    private columns: Column[] = [];

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

    getColumns() {
        return this.columns;
    }

}
