import {BaseNodeModel} from "../../../core/BaseNode/BaseNodeModel";
import {EVALUATE_REGRESSOR} from "../../evaluate/EvaluateConfig";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {RegressorPortModel} from "../../../ports/model/RegressorPortModel";


export class EvaluateRegressorModel extends BaseNodeModel {

    constructor() {
        super(EVALUATE_REGRESSOR);
        this.addInModelPort('evaluate');
    }

    protected addInModelPort(label: string): void {
        const datasetPort = new DatasetPortModel(true);
        const model = new RegressorPortModel(true);
        super.addPort(datasetPort);
        super.addPort(model);
    }

}
