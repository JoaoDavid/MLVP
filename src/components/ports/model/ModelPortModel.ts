import {PortModel} from '@projectstorm/react-diagrams-core';
import {BasePortModel} from "../../base/base-port/BasePortModel";

export class ModelPortModel extends BasePortModel {

    constructor(type: string, isIn: boolean, name?: string, label?: string, maxLinks?: number){
        super('ModelPort', isIn, name?name:"Model", label?label:"", maxLinks);
    }

    canLinkToPort(port: PortModel): boolean {
        console.log('canLinkToPort at ModelPortModel');
        if (port instanceof ModelPortModel) {
            return super.canLinkToPort(port);
        }
        return false;
    }

}
