import {CoreNodeModel} from "../../../core/CoreNode/CoreNodeModel";
import {PortModelAlignment} from "@projectstorm/react-diagrams-core";
import {NODE_ACCURACY} from "../EvaluateConfig";
import {EvaluatePortModel} from "../../../ports/evaluate/EvaluatePortModel";


export class AccuracyNodeModel extends CoreNodeModel {

    constructor() {
        super(NODE_ACCURACY.codeName, NODE_ACCURACY.name, NODE_ACCURACY.tier);
        this.addInModelPort('evaluate');
    }


    protected addInModelPort(label: string): void {
        const p = new EvaluatePortModel(this.tier, {
            in: true,
            name: label,
            label: label,
            alignment: PortModelAlignment.LEFT
        });
        super.addPort(p);
    }

}
