import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {CrossValidationClassifierModel} from './CrossValidationClassifierModel';
import BaseNodeWidget from '../../../../core/BaseNode/BaseNodeWidget';
import CrossValidationClassifierModal from "./CrossValidationClassifierModal";
import {EVALUATE_CONFIG} from '../../EvaluateConfig';

interface CrossValidationProps {
    node: CrossValidationClassifierModel;
    engine: DiagramEngine;
}

const CrossValidationClassifierWidget = (props: CrossValidationProps) => {

    const numberFoldsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setNumberFolds(+event.target.value);
    }

    const modal = <CrossValidationClassifierModal node={props.node} numberFoldsChanged={numberFoldsChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={EVALUATE_CONFIG.color} modalChildren={modal}>
            <p>Number of folds: {props.node.getNumberFolds()}</p>
        </BaseNodeWidget>
    );

}

export default CrossValidationClassifierWidget;
