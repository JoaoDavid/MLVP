import {DiagramModel} from '@projectstorm/react-diagrams';
import {LinkModel} from "@projectstorm/react-diagrams-core";
import {BaseEntityEvent, BaseEntityListener, CanvasModelGenerics} from "@projectstorm/react-canvas-core";
export interface MyDiagramListener extends BaseEntityListener {
    problemsFound?(event: BaseEntityEvent & { problems: string[] }): void;
}

export interface DiagramModelGenerics extends CanvasModelGenerics {
    LISTENER: MyDiagramListener;
}
//<G extends DiagramModelGenerics = DiagramModelGenerics> extends CanvasModel<G>
export class MyDiagramModel<G extends DiagramModelGenerics = DiagramModelGenerics>  extends DiagramModel<G> {

    serialize() {
        return {
            ...super.serialize(),
        };
    }

    validateLinks = () => {
        const links:LinkModel[] = this.getLinks();
        links.forEach((link)=> {
            console.log(link);
        })
    }
}
