import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {Column} from "../../data-source/Column";

export const VISUALIZE_DATASET: NodeConfig = {
    codeName: "VisualizeDataset",
    name: "Visualize Dataset",
}

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
