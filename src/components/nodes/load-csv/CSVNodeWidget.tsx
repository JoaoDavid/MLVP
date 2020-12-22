import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { CSVNodeModel } from './CSVNodeModel';
import {DefaultPortLabel, DefaultPortModel} from '@projectstorm/react-diagrams';
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

    constructor(props: CSVNodeProps) {
        super(props);
    }

    generatePort = (port: DefaultPortModel) => {
        return <DefaultPortLabel engine={this.props.engine} port={port} key={port.getID()} />;
    };

    //selected={this.props.node.isSelected()}
    render() {
        return (
            <div className={classes.Node}
                data-default-node-name={this.props.node.getOptions().name}>
                <div className={classes.Title}>
                    <div className={classes.TitleName}>{this.props.node.getOptions().name}</div>
                </div>
                <input type="file" accept=".csv" onChange={ (e) => this.props.node.loadCSV(e.target.files!) } />
                <div className={classes.Ports}>
                    <div className={classes.PortsContainer}>{this.props.node.getOutPorts().map((port) => {
                        return this.generatePort(port);
                    })}</div>
                </div>
            </div>
        );
    }
}
