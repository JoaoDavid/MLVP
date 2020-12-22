import React from 'react';
import {DefaultPortLabel, DefaultPortModel} from "@projectstorm/react-diagrams";
import classes from './PortContainer.module.css';

interface PortContainerProps {
    generatePort: (port: DefaultPortModel) => JSX.Element,
    getPorts: () => DefaultPortModel[],
}

const portContainer = (props: PortContainerProps) => {
    const ports = props.getPorts().map((port: DefaultPortModel) => {
        return props.generatePort(port);
    });

    return (
        <div className={classes.PortsContainer}>
            {ports}
        </div>
    )
}

export default portContainer;