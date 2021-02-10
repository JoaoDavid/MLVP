import {PortModel} from '@projectstorm/react-diagrams-core';
import {BasePortModel} from "../../core/BasePort/BasePortModel";

export class ModelPortModel extends BasePortModel {

    constructor(isIn: boolean, name?: string, label?: string, maxLinks?: number){
        super(isIn, name?name:"Model", label?label:"", maxLinks);
    }

    canLinkToPort(port: PortModel): boolean {
        console.log('canLinkToPort at ModelPortModel');
        if (port instanceof ModelPortModel) {
            return super.canLinkToPort(port);
        }
        return false;
    }

}
