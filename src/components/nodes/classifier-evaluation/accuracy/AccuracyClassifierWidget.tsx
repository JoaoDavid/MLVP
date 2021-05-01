import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {AccuracyClassifierModel} from './AccuracyClassifierModel';
import BaseNodeWidget from '../../../core/BaseNode/BaseNodeWidget';
import {EVALUATE_CLASSIFIER_CONFIG} from '../../evaluate/EvaluateConfig';

interface AccuracyNodeProps {
    node: AccuracyClassifierModel;
    engine: DiagramEngine;
}


const AccuracyClassifierWidget = (props:AccuracyNodeProps) => {
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={EVALUATE_CLASSIFIER_CONFIG.color}>
        </BaseNodeWidget>
    )
}

export default AccuracyClassifierWidget;
