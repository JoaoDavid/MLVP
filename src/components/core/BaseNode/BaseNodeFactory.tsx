import {AbstractReactFactory} from '@projectstorm/react-canvas-core';
import {BaseNodeModel} from "./BaseNodeModel";
import {DiagramEngine} from "@projectstorm/react-diagrams";

export abstract class BaseNodeFactory<T extends BaseNodeModel, E extends DiagramEngine>
    extends AbstractReactFactory<T, E> {

    protected constructor(type: string) {
        super(type);
    }

}
