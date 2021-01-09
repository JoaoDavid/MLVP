import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {AccuracyNodeModel} from './AccuracyNodeModel';
import CoreNodeWidget from '../../../core/CoreNode/CoreNodeWidget';
import {EVALUATE_CONFIG} from '../EvaluateConfig';

interface AccuracyNodeProps {
    node: AccuracyNodeModel;
    engine: DiagramEngine;
}


const AccuracyNodeWidget = (props:AccuracyNodeProps) => {
    return (
        <CoreNodeWidget node={props.node} engine={props.engine} color={EVALUATE_CONFIG.color}>
        </CoreNodeWidget>
    )
}

export default AccuracyNodeWidget;
