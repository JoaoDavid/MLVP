import * as React from 'react';
import {DiagramEngine, PortWidget} from '@projectstorm/react-diagrams-core';
import {BasePortModel} from "./BasePortModel";
import classes from './BasePort.module.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export interface BasePortWidgetProps {
    port: BasePortModel;
    engine: DiagramEngine;
}

export class BasePortWidget extends React.Component<BasePortWidgetProps> {
    render() {
        const renderTooltip = (
            <Tooltip id={"batata"}>
                {this.props.port.getName() + "\n" + this.props.port.getID()}
            </Tooltip>
        );
        return (
            <div className={classes.PortLabel}>
                <PortWidget engine={this.props.engine} port={this.props.port}>
                        <OverlayTrigger placement="right"
                                        delay={{ show: 100, hide: 100 }}
                                        overlay={renderTooltip}>
                            <div className={classes.Port}/>
                        </OverlayTrigger>

                </PortWidget>
            </div>
        );
    }
}
