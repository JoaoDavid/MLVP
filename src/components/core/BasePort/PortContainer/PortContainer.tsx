import React from 'react';
import {BasePortModel} from "../BasePortModel";

interface PortContainerProps {
    generatePort: (port: BasePortModel) => JSX.Element,
    ports: BasePortModel[],
}

const portContainer = (props: PortContainerProps) => {
    const ports = props.ports.map((port: BasePortModel) => {
        return props.generatePort(port);
    });

    return (
        <div>
            {ports}
        </div>
    )
}

export default portContainer;