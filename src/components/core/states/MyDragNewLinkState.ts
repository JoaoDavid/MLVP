import {
    AbstractDisplacementState,
    AbstractDisplacementStateEvent,
    Action,
    ActionEvent,
    InputType
} from '@projectstorm/react-canvas-core';
import {LinkModel} from '@projectstorm/react-diagrams-core';
import {MouseEvent} from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams';
import {BasePortModel} from "../BasePort/BasePortModel";

export interface MyDragNewLinkStateOptions {
    /**
     * If enabled, the links will stay on the canvas if they dont connect to a port
     * when dragging finishes
     */
    allowLooseLinks?: boolean;
    /**
     * If enabled, then a link can still be drawn from the port even if it is locked
     */
    allowLinksFromLockedPorts?: boolean;
}

export class MyDragNewLinkState extends AbstractDisplacementState<DiagramEngine> {
    port: BasePortModel;
    link: LinkModel;
    config: MyDragNewLinkStateOptions;

    constructor(options: MyDragNewLinkStateOptions = {}) {
        super({ name: 'drag-new-link' });

        this.config = {
            allowLooseLinks: true,
            allowLinksFromLockedPorts: false,
            ...options
        };

        this.registerAction(
            new Action({
                type: InputType.MOUSE_DOWN,
                fire: (event: ActionEvent<MouseEvent, BasePortModel>) => {
                    this.port = this.engine.getMouseElement(event.event) as BasePortModel;
                    if (!this.config.allowLinksFromLockedPorts && this.port.isLocked()) {
                        this.eject();
                        return;
                    }
                    this.link = this.port.createLinkModel();

                    // if no link is given, just eject the state
                    if (!this.link) {
                        this.eject();
                        return;
                    }
                    this.link.setSelected(true);
                    this.link.setSourcePort(this.port);
                    this.engine.getModel().addLink(this.link);
                    this.port.reportPosition();
                }
            })
        );

        this.registerAction(
            new Action({
                type: InputType.MOUSE_UP,
                fire: (event: ActionEvent<MouseEvent>) => {
                    const model = this.engine.getMouseElement(event.event);
                    // check to see if we connected to a new port
                    if (model instanceof BasePortModel) {
                        if (this.port.canLinkToPort(model)) {
                            this.adjustPorts(this.port, model);
                            this.engine.repaintCanvas();
                            return;
                        } else {
                            this.link.remove();
                            this.engine.repaintCanvas();
                            return;
                        }
                    }

                    if (!this.config.allowLooseLinks) {
                        this.link.remove();
                        this.engine.repaintCanvas();
                    }
                }
            })
        );
    }

    adjustPorts = (portA: BasePortModel, portB: BasePortModel) => {
        if(portA.getTier() < portB.getTier()) {
            this.link.setTargetPort(portB);
        } else {
            this.link.setSourcePort(portB);
            this.link.setTargetPort(portA);
            portA.reportPosition();
        }
        portB.reportPosition();
    }

    /**
     * Calculates the link's far-end point position on mouse move.
     * In order to be as precise as possible the mouse initialXRelative & initialYRelative are taken into account as well
     * as the possible engine offset
     */
    fireMouseMoved(event: AbstractDisplacementStateEvent): any {
        const portPos = this.port.getPosition();
        const zoomLevelPercentage = this.engine.getModel().getZoomLevel() / 100;
        const engineOffsetX = this.engine.getModel().getOffsetX() / zoomLevelPercentage;
        const engineOffsetY = this.engine.getModel().getOffsetY() / zoomLevelPercentage;
        const initialXRelative = this.initialXRelative / zoomLevelPercentage;
        const initialYRelative = this.initialYRelative / zoomLevelPercentage;
        const linkNextX = portPos.x - engineOffsetX + (initialXRelative - portPos.x) + event.virtualDisplacementX;
        const linkNextY = portPos.y - engineOffsetY + (initialYRelative - portPos.y) + event.virtualDisplacementY;

        this.link.getLastPoint().setPosition(linkNextX, linkNextY);
        this.engine.repaintCanvas();
    }
}
