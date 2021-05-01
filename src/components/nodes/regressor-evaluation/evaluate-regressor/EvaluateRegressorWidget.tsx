import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {EvaluateRegressorModel} from './EvaluateRegressorModel';
import BaseNodeWidget from '../../../core/BaseNode/BaseNodeWidget';
import {EVALUATE_REGRESSOR_CONFIG} from '../../evaluate/EvaluateConfig';

interface AccuracyNodeProps {
    node: EvaluateRegressorModel;
    engine: DiagramEngine;
}


const EvaluateRegressorWidget = (props:AccuracyNodeProps) => {
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={EVALUATE_REGRESSOR_CONFIG.color}>
        </BaseNodeWidget>
    )
}

export default EvaluateRegressorWidget;
