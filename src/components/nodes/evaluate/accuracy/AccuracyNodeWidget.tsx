import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {AccuracyNodeModel} from './AccuracyNodeModel';
import CoreNodeWidget from '../../../core/CoreNode/CoreNodeWidget';


export interface AccuracyNodeProps {
    node: AccuracyNodeModel;
    engine: DiagramEngine;
}


const AccuracyNodeWidget = (props:AccuracyNodeProps) => {
    return (
        <CoreNodeWidget node={props.node} engine={props.engine} color={'rgb(95,25,25)'}>
        </CoreNodeWidget>
    )
}

export default AccuracyNodeWidget;
