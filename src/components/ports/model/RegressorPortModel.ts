import {PortModel} from '@projectstorm/react-diagrams-core';
import {ModelPortModel} from "./ModelPortModel";
import {ClassifierPortModel} from "./ClassifierPortModel";

export class RegressorPortModel extends ModelPortModel {

    constructor(isIn: boolean, name?: string, label?: string, maxLinks?: number){
        super('ModelPort', isIn, name?name:"Regressor", label?label:"", maxLinks);
    }

    canLinkToPort(port: PortModel): boolean {
        console.log('canLinkToPort at ClassifierPortModel');
        if (port instanceof ClassifierPortModel) {
            return false;
        } else if (port instanceof ModelPortModel) {
            return super.canLinkToPort(port);
        }
        return false;
    }

}
