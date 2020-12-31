import {CoreNodeModel} from "../../../core/CoreNode/CoreNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {PortModelAlignment} from "@projectstorm/react-diagrams-core";
import {BasePortModel} from "../../../core/BasePort/BasePortModel";
import {NODE_RANDOM_FOREST} from "../../NodeType";


export class RandomForestNodeModel extends CoreNodeModel {

    private numCols: number;
    private numRows: number;

    constructor() {
        super(NODE_RANDOM_FOREST, 'Random Forest');
        this.numCols = 0;
        this.numRows = 0;
        this.addInPort('');
        //this.addOutPort('');
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
        console.log(this.portsOut);
        const p = new DatasetPortModel({
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
