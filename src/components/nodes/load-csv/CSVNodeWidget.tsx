import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { CSVNodeModel } from './CSVNodeModel';
import {DefaultPortLabel, DefaultPortModel} from '@projectstorm/react-diagrams';
import classes from './CSV.module.css';
import Papa from 'papaparse';

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
    generatePort = (port: DefaultPortModel) => {
        return <DefaultPortLabel engine={this.props.engine} port={port} key={port.getID()} />;
    };

    loadCSV = (selectorFiles: FileList) => {
        if (selectorFiles[0] != null) {

            Papa.parse(selectorFiles[0], {
                worker: false, // Don't bog down the main thread if its a big file
                download: true,
                header: false,
                complete: function(results:any) {
                    console.log(results.data);
                    let num_features = results.data[0].length;//num features
                    let num_rows = results.data.length;//num entries
                    console.log("num_features:" + num_features + " num_rows:" + num_rows);
                }
            });

        }
        console.log(selectorFiles);
    }

    //selected={this.props.node.isSelected()}
    render() {
        return (
            <div className={classes.Node}
                data-default-node-name={this.props.node.getOptions().name}
                >
                <div className={classes.Title}>
                    <div className={classes.TitleName}>{this.props.node.getOptions().name}</div>
                </div>
                <input type="file" accept=".csv" onChange={ (e) => this.loadCSV(e.target.files!) } />
                <div className={classes.Ports}>
                    <div className={classes.PortsContainer}>{this.props.node.getOutPorts().map((port) => {
                        return this.generatePort(port);
                    })}</div>
                </div>
            </div>
        );
    }
}
