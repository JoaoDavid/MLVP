import {PortModel} from '@projectstorm/react-diagrams-core';
import {BasePortModel} from "../../core/BasePort/BasePortModel";

export class MLModelPortModel extends BasePortModel {

    constructor(tier: number, isIn: boolean, name: string, label: string){
        super(tier, isIn, name, label);
    }

    canLinkToPort(port: PortModel): boolean {
        console.log('canLinkToPort at MLModelPortModelg');
        if (port instanceof MLModelPortModel) {
            return super.canLinkToPort(port);
        }
        return false;
    }

}
