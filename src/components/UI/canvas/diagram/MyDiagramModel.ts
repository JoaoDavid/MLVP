import {DiagramModel} from '@projectstorm/react-diagrams';
import {LinkModel} from "@projectstorm/react-diagrams-core";
import {BaseEntityEvent, BaseEntityListener, CanvasModelGenerics} from "@projectstorm/react-canvas-core";
import {TypecheckingResponse} from "../../../../z3/ValidateLinks";

export interface MyDiagramListener extends BaseEntityListener {
    typechecking?(event: BaseEntityEvent & { typechecking: TypecheckingResponse }): void;
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
