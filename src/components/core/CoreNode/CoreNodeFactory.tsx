import {AbstractReactFactory} from '@projectstorm/react-canvas-core';
import {CoreNodeModel} from "./CoreNodeModel";
import {DiagramEngine} from "@projectstorm/react-diagrams";
import {Category} from "../../nodes/Config";

export abstract class CoreNodeFactory<T extends CoreNodeModel, E extends DiagramEngine>
    extends AbstractReactFactory<T, E> {

    private readonly category: Category;

    protected constructor(category: Category, type: string) {
        super(type);
        this.category = category;
    }

    getCategory = () => {
        return this.category;
    }

}
