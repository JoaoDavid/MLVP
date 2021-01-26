import {PortModel} from '@projectstorm/react-diagrams-core';
import {BasePortModel} from "../../core/BasePort/BasePortModel";

export class MLModelPortModel extends BasePortModel {

    constructor(tier: number, isIn: boolean, name: string, label: string, maxLinks?: number){
        super(tier, isIn, name, label, maxLinks);
    }

    canLinkToPort(port: PortModel): boolean {
        console.log('canLinkToPort at MLModelPortModel');
        if (port instanceof MLModelPortModel) {
            return super.canLinkToPort(port);
        }
        return false;
    }

}
