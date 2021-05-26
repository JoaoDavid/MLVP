import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {SplitDatasetModel} from './SplitDatasetModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import SplitDatasetModal from "./SplitDatasetModal";
import {DATA_BALANCING_CONFIG} from "../../Config";

interface SplitDatasetProps {
    node: SplitDatasetModel;
    engine: DiagramEngine;
}

const SplitDatasetWidget = (props: SplitDatasetProps) => {

    const testSizeChanged = (value: number) => {
        props.node.setTestSize(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const trainSizeChanged = (value: number) => {
        props.node.setTrainSize(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const shuffleChanged = () => {
        props.node.setShuffle(!props.node.getShuffle());
        eventNodeUpdated(props.engine, props.node);
    }

    const stratifyChanged = () => {
        props.node.setStratifyByClass(!props.node.getStratifyByClass());
        eventNodeUpdated(props.engine, props.node);
    }


    const modal = <SplitDatasetModal node={props.node} testSizeChanged={testSizeChanged} shuffleChanged={shuffleChanged}
                                     trainSizeChanged={trainSizeChanged} stratifyChanged={stratifyChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_BALANCING_CONFIG.color} modalContent={modal}>
            <p>Test Size: {props.node.getTestSize()}</p>
            <p>Train Size: {props.node.getTrainSize()}</p>
            <p>Shuffle: {""+props.node.getShuffle()}</p>
            <p>Stratify by Class: {""+props.node.getStratifyByClass()}</p>
        </BaseNodeWidget>
    );

}

export default SplitDatasetWidget;
