import * as React from 'react';
import * as _ from 'lodash';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { CSVNodeModel } from './CSVNodeModel';
import { DefaultPortLabel } from '@projectstorm/react-diagrams';
import classes from './CSV.module.css';

/*namespace SB {
    export const Node = styled.div<{ selected: boolean }>`

		border: solid 6px ${(p) => (p.selected ? 'rgb(72,64,13)' : 'black')};
	`;

    export const Ports = styled.div`
		display: flex;
		background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
	`;

    export const PortsContainer = styled.div`


		&:first-of-type {
			margin-right: 10px;
		}

		&:only-child {
			margin-right: 0px;
		}
	`;
}*/

export interface CSVNodeProps {
    node: CSVNodeModel;
    engine: DiagramEngine;
}

/**
 * Default node that models the CSVNodeModel. It creates two columns
 * for both all the input ports on the left, and the output ports on the right.
 */
export class CSVNodeWidget extends React.Component<CSVNodeProps> {
    generatePort = (port: any) => {
        return <DefaultPortLabel engine={this.props.engine} port={port} key={port.getID()} />;
    };
    //selected={this.props.node.isSelected()}
    render() {
        return (
            <div className={classes.Node}
                data-default-node-name={this.props.node.getOptions().name}
                >
                <div className={classes.Title}>
                    <div className={classes.TitleName}>{this.props.node.getOptions().name}</div>
                </div>
                <input type="file" accept=".csv" />
                <div className={classes.Ports}>
                    <div className={classes.PortsContainer}>{_.map(this.props.node.getInPorts(), this.generatePort)}</div>
                    <div className={classes.PortsContainer}>{_.map(this.props.node.getOutPorts(), this.generatePort)}</div>
                </div>
            </div>
        );
    }
}
