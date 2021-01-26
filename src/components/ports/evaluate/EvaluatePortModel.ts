import {PortModel} from '@projectstorm/react-diagrams-core';
import {BasePortModel} from "../../core/BasePort/BasePortModel";
import {DatasetPortModel} from "../dataset/DatasetPortModel";
import {MLModelPortModel} from "../model/MLModelPortModel";


export class EvaluatePortModel extends BasePortModel {

    constructor(tier: number, isIn: boolean, name: string, label: string){
        super(tier, isIn, name, label);
    }

    canLinkToPort(port: PortModel): boolean {
        console.log('can link to evaluate port');
        if (port instanceof DatasetPortModel !! ) {
            return true;
        } else if (port instanceof MLModelPortModel) {
            return true;
        }
        return false;
    }

}
