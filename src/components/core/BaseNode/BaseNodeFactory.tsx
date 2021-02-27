import {AbstractReactFactory} from '@projectstorm/react-canvas-core';
import {BaseNodeModel} from "./BaseNodeModel";
import {DiagramEngine} from "@projectstorm/react-diagrams";
import {Category} from "../../nodes/Config";

export abstract class BaseNodeFactory<T extends BaseNodeModel, E extends DiagramEngine>
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
