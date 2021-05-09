import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {DecisionTreeClassifierModel} from './DecisionTreeClassifierModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import DecisionTreeClassifierModal from './DecisionTreeClassifierModal';
import {CLASSIFIER_CONFIG} from "../../Config";

interface DecisionTreeClassifierProps {
    node: DecisionTreeClassifierModel;
    engine: DiagramEngine;
}

const DecisionTreeClassifierWidget = (props: DecisionTreeClassifierProps) => {

    const modal = <DecisionTreeClassifierModal node={props.node}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={CLASSIFIER_CONFIG.color}
                        modalChildren={modal}>
        </BaseNodeWidget>
    )

}

export default DecisionTreeClassifierWidget;
