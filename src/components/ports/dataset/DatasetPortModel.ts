import {PortModel} from '@projectstorm/react-diagrams-core';
import {BasePortModel} from "../../core/BasePort/BasePortModel";

export class DatasetPortModel extends BasePortModel {

    constructor(tier: number, isIn: boolean, name: string, label: string, maxLinks?: number){
        super(tier, isIn, name, label, maxLinks);
    }

    canLinkToPort(port: PortModel): boolean {
        console.log('canLinkToPort at DatasetPortModel');
        if (port instanceof DatasetPortModel) {
            return super.canLinkToPort(port);
        }
        return false;
    }

}
