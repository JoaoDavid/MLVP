import {BaseNodeModel} from "../../../../core/BaseNode/BaseNodeModel";
import {EVALUATE_CLASSIFIER} from "../../EvaluateConfig";
import {DatasetPortModel} from "../../../../ports/dataset/DatasetPortModel";
import {ClassifierPortModel} from "../../../../ports/model/ClassifierPortModel";


export class AccuracyClassifierModel extends BaseNodeModel {

    constructor() {
        super(EVALUATE_CLASSIFIER);
        this.addInModelPort('evaluate');
    }

    protected addInModelPort(label: string): void {
        const datasetPort = new DatasetPortModel(true);
        const model = new ClassifierPortModel(true);
        super.addPort(datasetPort);
        super.addPort(model);
    }

}
