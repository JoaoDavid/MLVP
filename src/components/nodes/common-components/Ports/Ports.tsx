import React from 'react';
import classes from './Ports.module.css';
import {DefaultPortLabel, DefaultPortModel} from "@projectstorm/react-diagrams";
import PortContainer from './PortContainer/PortContainer';

interface PortsProps {
    generatePort: (port: DefaultPortModel) => JSX.Element,
    getInPorts: () => DefaultPortModel[],
    getOutPorts: () => DefaultPortModel[],
}

const ports = (props: PortsProps) => {
    /*const portsIn = props.getInPorts().map((port: DefaultPortModel) => {
        return props.generatePort(port);
    });
    const portsOut = props.getOutPorts().map((port: DefaultPortModel) => {
        return props.generatePort(port);
    });*/
    // <PortContainer generatePort={props.generatePort} getPorts={props.getInPorts}/>
    return (
        <div className={classes.Ports}>

            <PortContainer generatePort={props.generatePort} getPorts={props.getOutPorts}/>
        </div>
    )
}

export default ports;