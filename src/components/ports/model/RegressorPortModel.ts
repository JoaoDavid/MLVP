import {PortModel} from '@projectstorm/react-diagrams-core';
import {ModelPortModel} from "./ModelPortModel";

export class RegressorPortModel extends ModelPortModel {

    constructor(isIn: boolean, name?: string, label?: string, maxLinks?: number){
        super(isIn, name?name:"Regressor", label?label:"", maxLinks);
    }

    canLinkToPort(port: PortModel): boolean {
        console.log('canLinkToPort at RegressorPortModel');
        if (port instanceof RegressorPortModel) {
            return super.canLinkToPort(port);
        }
        return false;
    }

}
