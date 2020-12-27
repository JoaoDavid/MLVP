import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {CSVNodeModel} from './CSVNodeModel';
import InputFile from '../../../core/InputFile/InputFile';
import CoreNodeWidget from '../../../core/CoreNode/CoreNodeWidget';


export interface CSVNodeProps {
    node: CSVNodeModel;
    engine: DiagramEngine;
}

/**
 * Load CSV datasets
 */
const csvNodeWidget = (props:CSVNodeProps) => {
    return (
        <CoreNodeWidget node={props.node} engine={props.engine} color={'green'}>
            <InputFile acceptedTypes={['.csv']} changed={props.node.loadCSV}/>
        </CoreNodeWidget>
    )
}

export default csvNodeWidget;