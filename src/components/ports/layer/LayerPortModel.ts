import {PortModel} from '@projectstorm/react-diagrams-core';
import {BasePortModel} from "../../core/BasePort/BasePortModel";

export const OPTIMIZER_PORT = "LayerPort";

export class LayerPortModel extends BasePortModel {

    constructor(isIn: boolean, name?: string, label?: string, maxLinks?: number){
        super(OPTIMIZER_PORT, isIn, name?name:"Layer", label?label:"", maxLinks);
    }

    canLinkToPort(port: PortModel): boolean {
        // console.log('canLinkToPort at LayerPortModel');
        if (port instanceof LayerPortModel) {
            return super.canLinkToPort(port);
        }
        return false;
    }

}
