import {DiagramModel} from '@projectstorm/react-diagrams';


export class CoreDiagram extends DiagramModel {

    serialize() {
        return {
            ...super.serialize(),
        };
    }
}
