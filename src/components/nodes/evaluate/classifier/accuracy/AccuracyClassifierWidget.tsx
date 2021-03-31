import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {AccuracyClassifierModel} from './AccuracyClassifierModel';
import BaseBlockWidget from '../../../../base/base-block/BaseBlockWidget';
import {EVALUATE_CONFIG} from '../../EvaluateConfig';

interface AccuracyNodeProps {
    node: AccuracyClassifierModel;
    engine: DiagramEngine;
}


const AccuracyClassifierWidget = (props:AccuracyNodeProps) => {
    return (
        <BaseBlockWidget node={props.node} engine={props.engine} color={EVALUATE_CONFIG.color}>
        </BaseBlockWidget>
    )
}

export default AccuracyClassifierWidget;
