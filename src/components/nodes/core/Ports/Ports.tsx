import React from 'react';
import classes from './Ports.module.css';
import {DefaultPortLabel, DefaultPortModel} from "@projectstorm/react-diagrams";
import PortContainer from './PortContainer/PortContainer';

interface PortsProps {
    generatePort: (port: DefaultPortModel) => JSX.Element,
    inPorts: DefaultPortModel[],
    outPorts: DefaultPortModel[],
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