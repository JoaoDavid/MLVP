import {PortModel} from '@projectstorm/react-diagrams-core';
import {ModelPortModel} from "./ModelPortModel";
import {RegressorPortModel} from "./RegressorPortModel";

export class ClassifierPortModel extends ModelPortModel {

    constructor(isIn: boolean, name?: string, label?: string, maxLinks?: number){
        super('ModelPort', isIn, name?name:"Classifier", label?label:"", maxLinks);
    }

    canLinkToPort(port: PortModel): boolean {
        console.log('canLinkToPort at ClassifierPortModel');
        if (port instanceof RegressorPortModel) {
            return false;
        } else if (port instanceof ModelPortModel) {
            return super.canLinkToPort(port);
        }
        return false;
    }

}
