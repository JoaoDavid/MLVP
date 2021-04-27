import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {RandomForestRegressorModel} from './RandomForestRegressorModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../../core/BaseNode/BaseNodeWidget';
import RandomForestRegressorModal from './RandomForestRegressorModal';
import {REGRESSOR_CONFIG} from '../../ModelConfig';

interface RandomForestRegressorProps {
    node: RandomForestRegressorModel;
    engine: DiagramEngine;
}

const RandomForestRegressorWidget = (props: RandomForestRegressorProps) => {

    const numTreesChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setNumTrees(+event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const setMaxTrees = (value: number) => {
        props.node.setMaxDepth(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const criterionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setCriterion(event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <RandomForestRegressorModal node={props.node} numTreesChanged={numTreesChanged}
                                               setMaxTrees={setMaxTrees}
                                               criterionChanged={criterionChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={REGRESSOR_CONFIG.color}
                        modalChildren={modal}>
            <p>Trees: {props.node.getNumTrees()}</p>
            <p>Max Depth: {props.node.getMaxDepth() > 0 ? props.node.getMaxDepth() : "None"}</p>
            <p>Criterion: {props.node.getCriterion().toString()}</p>
        </BaseNodeWidget>
    )

}

export default RandomForestRegressorWidget;