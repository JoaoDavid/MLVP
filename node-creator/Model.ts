import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";

export const TEMPLATE_CONFIG_VAR: NodeConfig = {
    codeName: "TemplateCodeName",
    name: "TemplateName",
}

export class TemplateCodeNameModel extends BaseNodeModel {

    constructor() {
        super(TEMPLATE_CONFIG_VAR);
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
        // this.newColumnName = event.data.column_name;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            // TODO
            // newColumnName: this.newColumnName,
        };
    }

}
