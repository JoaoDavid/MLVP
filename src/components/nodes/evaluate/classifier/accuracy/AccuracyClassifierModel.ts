import {CoreNodeModel} from "../../../../core/CoreNode/CoreNodeModel";
import {NODE_ACCURACY} from "../../EvaluateConfig";
import {DatasetPortModel} from "../../../../ports/dataset/DatasetPortModel";
import {ClassifierPortModel} from "../../../../ports/model/ClassifierPortModel";


export class AccuracyClassifierModel extends CoreNodeModel {

    constructor() {
        super(NODE_ACCURACY.codeName, NODE_ACCURACY.name, NODE_ACCURACY.tier);
        this.addInModelPort('evaluate');
    }

    protected addInModelPort(label: string): void {
        const datasetPort = new DatasetPortModel(this.tier, true);
        const model = new ClassifierPortModel(this.tier, true);
        super.addPort(datasetPort);
        super.addPort(model);
    }

}
