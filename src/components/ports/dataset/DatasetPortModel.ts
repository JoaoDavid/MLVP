import {PortModel} from '@projectstorm/react-diagrams-core';
import {BasePortModel} from "../../core/BasePort/BasePortModel";

export const DATASET_PORT = "DatasetPort";

export class DatasetPortModel extends BasePortModel {

    constructor(isIn: boolean, name?: string, label?: string, maxLinks?: number){
        super(DATASET_PORT, isIn, name?name:"Dataset", label?label:"", maxLinks);
    }

    canLinkToPort(port: PortModel): boolean {
        console.log('canLinkToPort at DatasetPortModel');
        if (port instanceof DatasetPortModel) {
            return super.canLinkToPort(port);
        }
        return false;
    }

}
