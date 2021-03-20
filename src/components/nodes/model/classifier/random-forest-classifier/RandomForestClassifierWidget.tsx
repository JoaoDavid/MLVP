import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {RandomForestClassifierModel} from './RandomForestClassifierModel';
import BaseNodeWidget from '../../../../core/BaseNode/BaseNodeWidget';
import RandomForestClassifierModal from './RandomForestClassifierModal';
import {MODEL_CONFIG} from '../../ModelConfig';

interface RandomForestClassifierProps {
    node: RandomForestClassifierModel;
    engine: DiagramEngine;
}

const RandomForestClassifierWidget = (props: RandomForestClassifierProps) => {

    const numTreesChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setNumTrees(+event.target.value);
    }

    const setMaxTrees = (value: number) => {
        props.node.setMaxDepth(value);
    }

    const criterionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setCriterion(event.target.value);
    }

    const modal = <RandomForestClassifierModal node={props.node} numTreesChanged={numTreesChanged}
                                               setMaxTrees={setMaxTrees}
                                               criterionChanged={criterionChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={MODEL_CONFIG.color}
                        modalChildren={modal}>
            <p>Trees: {props.node.getNumTrees()}</p>
            <p>Max Depth: {props.node.getMaxDepth() > 0 ? props.node.getMaxDepth() : "None"}</p>
            <p>Criterion: {props.node.getCriterion().toString()}</p>
        </BaseNodeWidget>
    )

}

export default RandomForestClassifierWidget;
