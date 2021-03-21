import * as React from 'react';
import {DiagramEngine, PortWidget} from '@projectstorm/react-diagrams-core';
import {BasePortModel} from "./BasePortModel";
import classes from './BasePort.module.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export interface BasePortProps {
    port: BasePortModel;
    engine: DiagramEngine;
}

const BasePortWidget = (props: BasePortProps) => {

    const renderTooltip = (
        <Tooltip id={props.port.getID()}>
            {props.port.getName()}
        </Tooltip>
    );

    return (
        <div className={classes.PortLabel}>
            <PortWidget engine={props.engine} port={props.port}>
                <OverlayTrigger placement={props.port.getIsIn()?"left":"right"}
                                delay={{show: 100, hide: 100}}
                                overlay={renderTooltip}>
                    <div className={classes.Port}/>
                </OverlayTrigger>

            </PortWidget>
        </div>
    );

}

export default BasePortWidget;
