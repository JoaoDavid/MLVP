import React from 'react';
import {BasePortModel} from "../../../../ports/base/BasePortModel";
import classes from './PortContainer.module.css';

interface PortContainerProps {
    generatePort: (port: BasePortModel) => JSX.Element,
    ports: BasePortModel[],
}

const portContainer = (props: PortContainerProps) => {
    const ports = props.ports.map((port: BasePortModel) => {
        return props.generatePort(port);
    });

    return (
        <div className={classes.PortsContainer}>
            {ports}
        </div>
    )
}

export default portContainer;