import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {RandomForestRegressorModel} from './RandomForestRegressorModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import RandomForestRegressorModal from './RandomForestRegressorModal';
import {REGRESSOR_CONFIG} from "../../Config";

interface RandomForestRegressorProps {
    node: RandomForestRegressorModel;
    engine: DiagramEngine;
}

const RandomForestRegressorWidget = (props: RandomForestRegressorProps) => {

    const numTreesChanged = (value: number) => {
        props.node.setNumTrees(value);
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

    const criterionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setCriterion(event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <RandomForestRegressorModal node={props.node} numTreesChanged={numTreesChanged}
                                              criterionChanged={criterionChanged} maxDepthChanged={maxDepthChanged}
                                              maxDepthCheckedChanged={maxDepthCheckedChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={REGRESSOR_CONFIG.color}
                        modalContent={modal}>
            <p>Trees: {props.node.getNumTrees()}</p>
            <p>Max Depth: {props.node.getMaxDepthChecked()?props.node.getMaxDepth():"None"}</p>
            <p>Criterion: {props.node.getCriterion().toString()}</p>
        </BaseNodeWidget>
    )

}

export default RandomForestRegressorWidget;
