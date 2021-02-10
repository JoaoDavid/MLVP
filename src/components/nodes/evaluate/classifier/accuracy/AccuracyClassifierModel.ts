import {CoreNodeModel} from "../../../../core/CoreNode/CoreNodeModel";
import {NODE_ACCURACY_CLASSIFIER} from "../../EvaluateConfig";
import {DatasetPortModel} from "../../../../ports/dataset/DatasetPortModel";
import {ClassifierPortModel} from "../../../../ports/model/ClassifierPortModel";


export class AccuracyClassifierModel extends CoreNodeModel {

    constructor() {
        super(NODE_ACCURACY_CLASSIFIER.codeName, NODE_ACCURACY_CLASSIFIER.name);
        this.addInModelPort('evaluate');
    }

    protected addInModelPort(label: string): void {
        const datasetPort = new DatasetPortModel(true);
        const model = new ClassifierPortModel(true);
        super.addPort(datasetPort);
        super.addPort(model);
    }

}
