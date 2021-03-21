import {
    AbstractDisplacementState, AbstractDisplacementStateEvent,
    Action, ActionEvent,
    InputType,
} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from "@projectstorm/react-diagrams";
import {MouseEvent} from "react";
import {BasePortModel} from "../../components/core/BasePort/BasePortModel";

export class SelectLinkState extends AbstractDisplacementState<DiagramEngine> {
    constructor() {
        super({ name: 'select-link' });

        this.registerAction(
            new Action({
                type: InputType.MOUSE_DOWN,
                fire: (event: ActionEvent<MouseEvent, BasePortModel>) => {
                    const link = this.engine.getMouseElement(event.event);

                    if (link.isLocked()) {
                        this.eject();
                    }
                    console.log("SelectLinkState");
                    this.engine.getModel().clearSelection();
                    link.setSelected(true);
                },
            }),
        );
    }

    fireMouseMoved(event: AbstractDisplacementStateEvent): any {
        //Do nothing
    }
}
