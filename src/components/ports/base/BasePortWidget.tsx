import * as React from 'react';
import {DiagramEngine, PortWidget} from '@projectstorm/react-diagrams-core';
import {BasePortModel} from "./BasePortModel";
import classes from './BasePort.module.css';

export interface BasePortWidgetProps {
    port: BasePortModel;
    engine: DiagramEngine;
}

export class BasePortWidget extends React.Component<BasePortWidgetProps> {
    render() {
        return (
            <div className={classes.PortLabel}>
                <PortWidget engine={this.props.engine} port={this.props.port}>
                    <div className={classes.Port}/>
                </PortWidget>
            </div>
        );
    }
}
