import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {SplitDatasetModel} from './SplitDatasetModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import SplitDatasetModal from "./SplitDatasetModal";
import {DATA_CONFIG} from '../DataConfig';

interface SplitDatasetProps {
    node: SplitDatasetModel;
    engine: DiagramEngine;
}

const SplitDatasetWidget = (props: SplitDatasetProps) => {

    const testSizeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setTestSize(+event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const trainSizeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setTrainSize(+event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const shuffleChanged = () => {
        props.node.setShuffle(!props.node.getShuffle());
        eventNodeUpdated(props.engine, props.node);
    }

    const stratifyChanged = () => {
        props.node.setStratify(!props.node.getStratify());
        eventNodeUpdated(props.engine, props.node);
    }


    const modal = <SplitDatasetModal node={props.node} testSizeChanged={testSizeChanged} shuffleChanged={shuffleChanged}
                                     trainSizeChanged={trainSizeChanged} stratifyChanged={stratifyChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
            <p>Test Size: {props.node.getTestSize()}</p>
            <p>Train Size: {props.node.getTrainSize()}</p>
            <p>Shuffle: {""+props.node.getShuffle()}</p>
            <p>Stratify: {""+props.node.getStratify()}</p>
        </BaseNodeWidget>
    );

}

export default SplitDatasetWidget;
