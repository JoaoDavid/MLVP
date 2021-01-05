import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {CSVNodeModel} from './CSVNodeModel';
import InputFile from '../../../../core/InputFile/InputFile';
import CoreNodeWidget from '../../../../core/CoreNode/CoreNodeWidget';
import CSVModal from "./CSVModal";


export interface CSVNodeProps {
    node: CSVNodeModel;
    engine: DiagramEngine;
}

/**
 * Load CSV datasets
 */
const csvNodeWidget = (props:CSVNodeProps) => {
    const modal = <CSVModal changed={props.node.loadCSV}/>;

    return (
        <CoreNodeWidget node={props.node} engine={props.engine} color={'green'} modalChildren={modal}>
            <InputFile acceptedTypes={['.csv']} changed={props.node.loadCSV}/>
        </CoreNodeWidget>
    )
}

export default csvNodeWidget;