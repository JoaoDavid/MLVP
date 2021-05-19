import {PortModel} from '@projectstorm/react-diagrams-core';
import {BasePortModel} from "../../core/BasePort/BasePortModel";

export const OPTIMIZER_PORT = "OptimizerPort";

export class OptimizerPortModel extends BasePortModel {

    constructor(isIn: boolean, name?: string, label?: string, maxLinks?: number){
        super(OPTIMIZER_PORT, isIn, name?name:"Optimizer", label?label:"", maxLinks);
    }

    canLinkToPort(port: PortModel): boolean {
        // console.log('canLinkToPort at OptimizerPortModel');
        if (port instanceof OptimizerPortModel) {
            return super.canLinkToPort(port);
        }
        return false;
    }

}
