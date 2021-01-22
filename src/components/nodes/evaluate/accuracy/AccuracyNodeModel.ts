import {CoreNodeModel} from "../../../core/CoreNode/CoreNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {PortModelAlignment} from "@projectstorm/react-diagrams-core";
import {NODE_ACCURACY} from "../EvaluateConfig";
import {MLModelPortModel} from "../../../ports/model/MLModelPortModel";


export class AccuracyNodeModel extends CoreNodeModel {

    constructor() {
        super(NODE_ACCURACY.codeName, NODE_ACCURACY.name);
        this.addInDatasetPort('dataset');
        this.addInMLModelPort('model');
    }

    protected addInDatasetPort(label: string): void {
        const p = new DatasetPortModel({
            in: true,
            name: label,
            label: label,
            alignment: PortModelAlignment.LEFT,
            maximumLinks: 1,
        });
       super.addPort(p);
    }

    protected addInMLModelPort(label: string): void {
        const p = new MLModelPortModel({
            in: true,
            name: label,
            label: label,
            alignment: PortModelAlignment.LEFT
        });
        super.addPort(p);
    }

}
