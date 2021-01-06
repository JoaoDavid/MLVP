import {CoreNodeModel} from "../../../core/CoreNode/CoreNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {PortModelAlignment} from "@projectstorm/react-diagrams-core";
import {BasePortModel} from "../../../core/BasePort/BasePortModel";
import {NODE_RANDOM_FOREST} from "../../NodeType";
import {MLModelPortModel} from "../../../ports/model/MLModelPortModel";


export class RandomForestNodeModel extends CoreNodeModel {

    constructor() {
        super(NODE_RANDOM_FOREST, 'Random Forest');
        this.addInPort('in');
        this.addOutPort('out');
    }

    protected addInPort(label: string, after = true): BasePortModel {
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

    protected addOutPort(label: string, after = true): DatasetPortModel {
        const p = new MLModelPortModel({
            in: false,
            name: label,
            label: label,
            alignment: PortModelAlignment.RIGHT
        });
        if (!after) {
            this.portsOut.splice(0, 0, p);
        }
        return this.addPort(p);
    }

}
