import {DiagramModel} from '@projectstorm/react-diagrams';


export class MyDiagramModel extends DiagramModel {

    serialize() {
        return {
            ...super.serialize(),
        };
    }
}
