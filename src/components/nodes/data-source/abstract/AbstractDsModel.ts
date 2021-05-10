import {ImportDataset} from "../ImportDataset";
import {NodeConfig} from "../../../core/BaseNode/BaseNodeModel";

export const ABSTRACT_DS: NodeConfig = {
    codeName: "AbstractDataset",
    name: "Abstract Dataset",
}

export class AbstractDsModel extends ImportDataset {

    constructor() {
        super(ABSTRACT_DS);
    }

}
