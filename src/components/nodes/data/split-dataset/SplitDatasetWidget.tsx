import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {SplitDatasetModel} from './SplitDatasetModel';
import BaseNodeWidget from '../../../core/BaseNode/BaseNodeWidget';
import SplitDatasetModal from "./SplitDatasetModal";
import {DATA_CONFIG} from '../DataConfig';

interface SplitDatasetProps {
    node: SplitDatasetModel;
    engine: DiagramEngine;
}

const SplitDatasetWidget = (props: SplitDatasetProps) => {

    const testSizeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setTestSize(+event.target.value);
    }

    const trainSizeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setTrainSize(+event.target.value);
    }

    const shuffleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setShuffle(event.target.value);
    }


    const modal = <SplitDatasetModal node={props.node} testSizeChanged={testSizeChanged} shuffleChanged={shuffleChanged}
                                     trainSizeChanged={trainSizeChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
            <p>Test Size: {props.node.getTestSize()}</p>
            <p>Train Size: {props.node.getTrainSize()}</p>
            <p>Shuffle: {props.node.getShuffle()}</p>
        </BaseNodeWidget>
    );

}

export default SplitDatasetWidget;
