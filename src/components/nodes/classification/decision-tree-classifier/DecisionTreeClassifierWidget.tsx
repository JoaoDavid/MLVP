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

    const criterionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setCriterion(event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const splitterChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setCriterion(event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const maxDepthChanged = (value: number) => {
        props.node.setMaxDepth(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const maxDepthCheckedChanged = (value: boolean) => {
        props.node.setMaxDepthChecked(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <DecisionTreeClassifierModal node={props.node} criterionChanged={criterionChanged}
                                               maxDepthChanged={maxDepthChanged}
                                               maxDepthCheckedChanged={maxDepthCheckedChanged}
                                               splitterChanged={splitterChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={CLASSIFIER_CONFIG.color}
                        modalChildren={modal}>
            <p>Splitter: {props.node.getSplitter().toString()}</p>
            <p>Max Depth: {props.node.getMaxDepthChecked()?props.node.getMaxDepth():"None"}</p>
            <p>Criterion: {props.node.getCriterion().toString()}</p>

        </BaseNodeWidget>
    )

}

export default DecisionTreeClassifierWidget;
