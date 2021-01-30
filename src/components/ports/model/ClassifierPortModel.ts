import {PortModel} from '@projectstorm/react-diagrams-core';
import {BasePortModel} from "../../core/BasePort/BasePortModel";

export class ClassifierPortModel extends BasePortModel {

    constructor(isIn: boolean, name?: string, label?: string, maxLinks?: number){
        super(isIn, name?name:"Classifier", label?label:"", maxLinks);
    }

    canLinkToPort(port: PortModel): boolean {
        console.log('canLinkToPort at ClassifierPortModel');
        if (port instanceof ClassifierPortModel) {
            return super.canLinkToPort(port);
        }
        return false;
    }

}
