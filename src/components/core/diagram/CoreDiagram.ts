import {DiagramModel} from '@projectstorm/react-diagrams';
import {NUM_TIERS} from "../../nodes/Config";


export class CoreDiagram extends DiagramModel {

    serialize() {
        return {
            ...super.serialize(),
            numTiers: NUM_TIERS,
        };
    }
}
