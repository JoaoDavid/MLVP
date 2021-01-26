import {CoreNodeModel} from "../../../core/CoreNode/CoreNodeModel";
import {NODE_ACCURACY} from "../EvaluateConfig";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {MLModelPortModel} from "../../../ports/model/MLModelPortModel";


export class AccuracyNodeModel extends CoreNodeModel {

    constructor() {
        super(NODE_ACCURACY.codeName, NODE_ACCURACY.name, NODE_ACCURACY.tier);
        this.addInModelPort('evaluate');
    }

    protected addInModelPort(label: string): void {
        const datasetPort = new DatasetPortModel(this.tier, true, "in-ds", "");
        const model = new MLModelPortModel(this.tier, true, "in-model", "");
        super.addPort(datasetPort);
        super.addPort(model);
    }

}
