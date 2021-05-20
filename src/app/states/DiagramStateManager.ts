import { MouseEvent } from 'react';
import {
    SelectingState,
    State,
    Action,
    InputType,
    ActionEvent,
} from '@projectstorm/react-canvas-core';
import { PortModel, DiagramEngine, DragDiagramItemsState } from '@projectstorm/react-diagrams';
import {MyDragNewLinkState} from "./MyDragNewLinkState";
import MyDragCanvasState from "./MyDragCanvasState";
import {SelectLinkState} from './SelectLinkState';
import {LinkModel} from "@projectstorm/react-diagrams-core";
import {TypeChecker} from "../typecheck/TypeChecker";

export class DiagramStateManager extends State<DiagramEngine> {
    dragCanvas: MyDragCanvasState;
    dragNewLink: MyDragNewLinkState;
    dragItems: DragDiagramItemsState;
    selectLink: SelectLinkState;

    private typeChecker: TypeChecker;

    constructor(name: string, typeChecker: TypeChecker) {
        super({
            name: name
        });
        this.childStates = [new SelectingState()];
        this.dragCanvas = new MyDragCanvasState();
        this.dragNewLink = new MyDragNewLinkState(typeChecker);
        this.dragItems = new DragDiagramItemsState();

        // But this is a custom one!
        this.selectLink = new SelectLinkState();
        this.typeChecker = typeChecker;

        this.registerClicks();
    }

    private registerClicks = () => {
        // determine what was clicked on
        this.registerAction(
            new Action({
                type: InputType.MOUSE_DOWN,
                fire: (event: ActionEvent<MouseEvent>) => {
                    console.log(this.getOptions().name)
                    const element = this.engine.getActionEventBus().getModelForEvent(event);

                    // the canvas was clicked on, transition to the dragging canvas state
                    if (!element) {
                        this.transitionWithEvent(this.dragCanvas, event);
                    }
                    // initiate dragging a new link
                    else if (element instanceof PortModel) {
                        this.transitionWithEvent(this.dragNewLink, event);
                    }
                    // Link selection <============================================
                    else if (element instanceof LinkModel) {
                        this.transitionWithEvent(this.selectLink, event);
                    }
                    // move the items (and potentially link points)
                    else {
                        this.transitionWithEvent(this.dragItems, event);
                    }
                }
            })
        );
    }


}
