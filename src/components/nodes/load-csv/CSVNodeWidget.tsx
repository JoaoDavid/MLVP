import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {CSVNodeModel} from './CSVNodeModel';
import {DefaultPortLabel, DefaultPortModel} from '@projectstorm/react-diagrams';
import InputFile from '../core/InputFile/InputFile';
import CoreNodeWidget from '../core/CoreNode/CoreNodeWidget';


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
        return <DefaultPortLabel engine={this.props.engine} port={port} key={port.getID()}/>;
    };

    render() {
        return (
            <CoreNodeWidget node={this.props.node} engine={this.props.engine} color={'green'}>
                <InputFile acceptedTypes={['.csv']} changed={this.props.node.loadCSV}/>
            </CoreNodeWidget>
        );
    }
}