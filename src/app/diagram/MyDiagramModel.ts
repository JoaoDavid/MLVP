import {DiagramModel} from '@projectstorm/react-diagrams';
import {LinkModel} from "@projectstorm/react-diagrams-core";
import {BaseEntityEvent, BaseEntityListener, CanvasModelGenerics} from "@projectstorm/react-canvas-core";
import {TypeCheckResponse} from "../typecheck/TypeChecker";
import {BaseBlockModel} from "../../components/base/base-block/BaseBlockModel";

export interface MyDiagramListener extends BaseEntityListener {
    typeCheckResponse?(event: BaseEntityEvent & { typeCheckResponse: TypeCheckResponse }): void;
    nodeUpdated?(event: BaseEntityEvent & { node: BaseBlockModel }): void;
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
