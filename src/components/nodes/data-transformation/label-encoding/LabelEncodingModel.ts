import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";

export const LABEL_ENCODING: NodeConfig = {
    codeName: "LabelEncoding",
    name: "Label Encoding",
}

export class LabelEncodingModel extends BaseNodeModel {

    private originalColumn: string = "None";

    constructor() {
        super(LABEL_ENCODING);
        this.addInPort();
        this.addOutPort();
    }

    updateNode = () => {
        let colMap = this.getColumnsAndTypes();
        let listColNames = Object.keys(colMap);

        if (listColNames.length > 0) {
            if (!listColNames.includes(this.originalColumn)) {
                this.originalColumn =  listColNames[0];
            }
        }
    }

    getOriginalColumn(): string {
        return this.originalColumn;
    }

    setOriginalColumn(value: string) {
        this.originalColumn = value;
    }

    protected addInPort(): void {
        const p = new DatasetPortModel(true);
        super.addPort(p);
    }

    protected addOutPort(): void {
        const p = new DatasetPortModel(false, "Encoded Dataset");
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.originalColumn = event.data.originalColumn;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            originalColumn: this.originalColumn,
        };
    }

}
