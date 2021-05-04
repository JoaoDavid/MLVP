import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";

export const LABEL_ENCODING: NodeConfig = {
    codeName: "LabelEncoding",
    name: "Label Encoding",
}

export class LabelEncodingModel extends BaseNodeModel {

    private encodedColumn: string = "no_columns_found";

    constructor() {
        super(LABEL_ENCODING);
        this.addInPort();
        this.addOutPort();
    }

    updateNode = () => {
        let colMap = this.getColumnsAndTypes();
        let listColNames = Object.keys(colMap);

        if (listColNames.length > 0) {
            if (!listColNames.includes(this.encodedColumn)) {
                this.encodedColumn =  listColNames[0];
            }
        }
    }

    getEncodedColumn(): string {
        return this.encodedColumn;
    }

    setEncodedColumn(value: string) {
        this.encodedColumn = value;
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
        this.encodedColumn = event.data.encodedColumn;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            encodedColumn: this.encodedColumn,
        };
    }

}
