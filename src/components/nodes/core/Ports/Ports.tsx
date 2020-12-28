import React from 'react';
import classes from './Ports.module.css';
import {BasePortModel} from "../../../ports/base/BasePortModel";
import PortContainer from './PortContainer/PortContainer';

interface PortsProps {
    generatePort: (port: BasePortModel) => JSX.Element,
    inPorts: BasePortModel[],
    outPorts: BasePortModel[],
}

const ports = (props: PortsProps) => {
    return (
        <div className={classes.Ports}>
            <PortContainer generatePort={props.generatePort} ports={props.inPorts}/>
            <PortContainer generatePort={props.generatePort} ports={props.outPorts}/>
        </div>
    )
}

export default ports;