import {DiagramModel} from '@projectstorm/react-diagrams';


export class BaseDiagram extends DiagramModel {

    serialize() {
        return {
            ...super.serialize(),
        };
    }
}
