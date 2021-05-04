import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";

export const LABEL_ENCODING: NodeConfig = {
    codeName: "LabelEncoding",
    name: "Label Encoding",
}


export class LabelEncodingModel extends BaseNodeModel {

    constructor() {
        super(LABEL_ENCODING);
        this.addInPort();
        this.addOutPort();
    }

    updateNode = () => {
        // TODO
        let colMap = this.getColumnsAndTypes();
        let listColNames = Object.keys(colMap);
    }

    protected addInPort(): void {
        // TODO
        const p = new DatasetPortModel(true);
        super.addPort(p);
    }

    protected addOutPort(): void {
        // TODO
        const p = new DatasetPortModel(false, "Engineered Dataset");
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        // TODO
/*        this.newColumnName = event.data.column_name;
        this.originalColumnName = event.data.originalColumnName;
        this.metric = event.data.metric;
        this.windowSize = event.data.windowSize;*/
    }

    serialize(): any {
        return {
            ...super.serialize(),
            // TODO
/*            newColumnName: this.newColumnName,
            originalColumnName: this.originalColumnName,
            metric: this.metric,
            windowSize: this.windowSize,*/
        };
    }

}
