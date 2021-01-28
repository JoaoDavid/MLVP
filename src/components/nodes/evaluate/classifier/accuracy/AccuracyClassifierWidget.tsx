import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {AccuracyClassifierModel} from './AccuracyClassifierModel';
import CoreNodeWidget from '../../../../core/CoreNode/CoreNodeWidget';
import {EVALUATE_CONFIG} from '../../EvaluateConfig';

interface AccuracyNodeProps {
    node: AccuracyClassifierModel;
    engine: DiagramEngine;
}


const AccuracyClassifierWidget = (props:AccuracyNodeProps) => {
    return (
        <CoreNodeWidget node={props.node} engine={props.engine} color={EVALUATE_CONFIG.color}>
        </CoreNodeWidget>
    )
}

export default AccuracyClassifierWidget;
