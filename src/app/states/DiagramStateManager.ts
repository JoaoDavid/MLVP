import { MouseEvent } from 'react';
import {
    SelectingState,
    State,
    Action,
    InputType,
    ActionEvent,
    DragCanvasState
} from '@projectstorm/react-canvas-core';
import { PortModel, DiagramEngine, DragDiagramItemsState } from '@projectstorm/react-diagrams';
import {MyDragNewLinkState} from "./MyDragNewLinkState";
import {SelectLinkState} from './SelectLinkState';
import {LinkModel} from "@projectstorm/react-diagrams-core";
import {Typecheck} from "../typecheck/Typecheck";

export class DiagramStateManager extends State<DiagramEngine> {
    dragCanvas: DragCanvasState;
    dragNewLink: MyDragNewLinkState;
    dragItems: DragDiagramItemsState;
    selectLink: SelectLinkState;

    private validateLinks: Typecheck;

    constructor(validateLinks: Typecheck) {
        super({
            name: 'default-diagrams'
        });
        this.childStates = [new SelectingState()];
        this.dragCanvas = new DragCanvasState();
        this.dragNewLink = new MyDragNewLinkState(validateLinks);
        this.dragItems = new DragDiagramItemsState();

        // But this is a custom one!
        this.selectLink = new SelectLinkState();
        this.validateLinks = validateLinks;

        this.registerClicks();
    }

    private registerClicks = () => {
        // determine what was clicked on
        this.registerAction(
            new Action({
                type: InputType.MOUSE_DOWN,
                fire: (event: ActionEvent<MouseEvent>) => {
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
