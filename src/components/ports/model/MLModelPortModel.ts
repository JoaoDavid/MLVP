import {PortModel} from '@projectstorm/react-diagrams-core';
import {BasePortModel} from "../../core/BasePort/BasePortModel";

export class MLModelPortModel extends BasePortModel {

    constructor(tier: number, isIn: boolean, name: string, label: string){
        super(tier, isIn, name, label);
    }

    canLinkToPort(port: PortModel): boolean {
        console.log('can link to ml trained model port');
        if (port instanceof MLModelPortModel) {
            return this.options.in !== port.getOptions().in;
        }
        return false;
    }

}
