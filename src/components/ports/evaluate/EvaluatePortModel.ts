import {PortModel} from '@projectstorm/react-diagrams-core';
import {BasePortModel} from "../../core/BasePort/BasePortModel";
import {DatasetPortModel} from "../dataset/DatasetPortModel";
import {MLModelPortModel} from "../model/MLModelPortModel";


export class EvaluatePortModel extends BasePortModel {

    constructor(tier: number, isIn: boolean, name: string, label: string, maxLinks?: number){
        super(tier, isIn, name, label, maxLinks);
    }

    canLinkToPort(port: PortModel): boolean {
        console.log('canLinkToPort at EvaluatePortModel');
        if (port instanceof DatasetPortModel) {
            return super.canLinkToPort(port);
        } else if (port instanceof MLModelPortModel) {
            return super.canLinkToPort(port);
        }
        return false;
    }

}
