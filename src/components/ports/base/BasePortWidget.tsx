import * as React from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import { BasePortModel } from "./BasePortModel";
import classes from './BasePort.module.css';

export interface BasePortLabelProps {
    port: BasePortModel;
    engine: DiagramEngine;
}

export class BasePortLabel extends React.Component<BasePortLabelProps> {
    render() {
        const port = (
            <PortWidget engine={this.props.engine} port={this.props.port}>
                <div className={classes.Port} />
            </PortWidget>
        );
        const label = <div className={classes.Label}>{this.props.port.getOptions().label}</div>;

        return (
            <div className={classes.PortLabel}>
                {this.props.port.getOptions().in ? port : label}
                {this.props.port.getOptions().in ? label : port}
            </div>
        );
    }
}
