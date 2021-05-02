import {PortModel} from '@projectstorm/react-diagrams-core';
import {ModelPortModel} from "./ModelPortModel";
import {ClassifierPortModel} from "./ClassifierPortModel";

export const REGRESSOR_PORT = "RegressorPort";

export class RegressorPortModel extends ModelPortModel {

    constructor(isIn: boolean, name?: string, label?: string, maxLinks?: number){
        super(REGRESSOR_PORT, isIn, name?name:"Regressor", label?label:"", maxLinks);
    }

    canLinkToPort(port: PortModel): boolean {
        // console.log('canLinkToPort at RegressorPortModel');
        if (port instanceof ClassifierPortModel) {
            return false;
        } else if (port instanceof ModelPortModel) {
            return super.canLinkToPort(port);
        }
        return false;
    }

}
