import {CoreNodeModel} from "../../../core/CoreNode/CoreNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {PortModelAlignment} from "@projectstorm/react-diagrams-core";
import {BasePortModel} from "../../../core/BasePort/BasePortModel";
import {NODE_ACCURACY} from "../../NodeType";
import {MLModelPortModel} from "../../../ports/model/MLModelPortModel";


export class AccuracyNodeModel extends CoreNodeModel {

    constructor() {
        super(NODE_ACCURACY, 'Evaluate Accuracy');
        this.addInDatasetPort('dataset');
        this.addInMLModelPort('model');
    }

    protected addInDatasetPort(label: string, after = true): BasePortModel {
        const p = new DatasetPortModel({
            in: true,
            name: label,
            label: label,
            alignment: PortModelAlignment.LEFT,
            maximumLinks: 1,
        });
        if (!after) {
            this.portsIn.splice(0, 0, p);
        }
        return this.addPort(p);
    }

    protected addInMLModelPort(label: string, after = true): DatasetPortModel {
        const p = new MLModelPortModel({
            in: true,
            name: label,
            label: label,
            alignment: PortModelAlignment.LEFT
        });
        if (!after) {
            this.portsIn.splice(0, 0, p);
        }
        return this.addPort(p);
    }

}
