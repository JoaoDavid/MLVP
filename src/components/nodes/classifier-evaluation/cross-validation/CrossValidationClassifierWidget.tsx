import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {CrossValidationClassifierModel} from './CrossValidationClassifierModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import CrossValidationClassifierModal from "./CrossValidationClassifierModal";
import {EVALUATE_CLASSIFIER_CONFIG} from "../../Config";

interface CrossValidationProps {
    node: CrossValidationClassifierModel;
    engine: DiagramEngine;
}

const CrossValidationClassifierWidget = (props: CrossValidationProps) => {

    const numberFoldsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setNumberFolds(+event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <CrossValidationClassifierModal node={props.node} numberFoldsChanged={numberFoldsChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={EVALUATE_CLASSIFIER_CONFIG.color} modalChildren={modal}>
            <p>Number of folds: {props.node.getNumberFolds()}</p>
        </BaseNodeWidget>
    );

}

export default CrossValidationClassifierWidget;
