import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {RandomForestNodeModel} from './RandomForestNodeModel';
import CoreNodeWidget from '../../core/CoreNode/CoreNodeWidget';


export interface CSVNodeProps {
    node: RandomForestNodeModel;
    engine: DiagramEngine;
}


const csvNodeWidget = (props:CSVNodeProps) => {
    return (
        <CoreNodeWidget node={props.node} engine={props.engine} color={'rgb(0,192,255)'}>
        </CoreNodeWidget>
    )
}

export default csvNodeWidget;