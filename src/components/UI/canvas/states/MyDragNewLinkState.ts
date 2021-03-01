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
import {BasePortModel} from "../../../core/BasePort/BasePortModel";
import {ValidateLinks} from "../../../../z3/ValidateLinks";


export class MyDragNewLinkState extends AbstractDisplacementState<DiagramEngine> {

    private readonly allowLooseLinks = false;
    private readonly allowLinksFromLockedPorts = false;
    private validateLinks;

    port: BasePortModel;
    link: LinkModel;

    constructor(validateLinks: ValidateLinks) {
        super({ name: 'drag-new-link' });
        this.validateLinks = validateLinks;
        this.registerNewLinkDragging();
    }

    registerNewLinkDragging = () => {
        this.registerAction(
            new Action({
                type: InputType.MOUSE_DOWN,
                fire: (event: ActionEvent<MouseEvent, BasePortModel>) => {
                    this.port = this.engine.getMouseElement(event.event) as BasePortModel;
                    if (!this.allowLinksFromLockedPorts && this.port.isLocked()) {
                        this.eject();
                        return;
                    }
                    this.link = this.port.createLinkModel();

                    // if no link is given, just eject the state
                    if (!this.link) {
                        this.eject();
                        return;
                    }
                    this.engine.getModel().clearSelection();
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

                            this.validateLinks.validLink().then((res) => {
                                // let res = true;
                                console.log("res " + res)
                                if(res) {
                                    //link created between nodes
                                    this.engine.getModel().fireEvent(
                                        {
                                            sourceNode: this.link.getSourcePort().getNode(),
                                            targetNode: this.link.getTargetPort().getNode(),
                                        },
                                        'linkCreated'
                                    );
                                    this.engine.repaintCanvas();
                                    return;
                                } else {
                                    console.log("vai remover link, deu unsat")
                                    this.link.remove();
                                    return;
                                }
                            });
                        } else {
                            this.link.remove();
                            this.engine.repaintCanvas();
                            return;
                        }
                    }

                    if (!this.allowLooseLinks) {
                        this.link.remove();
                        this.engine.repaintCanvas();
                    }
                }
            })
        );
    }

    adjustPorts = (portA: BasePortModel, portB: BasePortModel) => {
        if(!portA.getIsIn() && portB.getIsIn()) {
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
