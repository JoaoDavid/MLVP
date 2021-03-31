import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {SplitDatasetModel} from './SplitDatasetModel';
import BaseBlockWidget, {eventNodeUpdated} from '../../../base/base-block/BaseBlockWidget';
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

    const shuffleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setShuffle(event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }


    const modal = <SplitDatasetModal node={props.node} testSizeChanged={testSizeChanged} shuffleChanged={shuffleChanged}
                                     trainSizeChanged={trainSizeChanged}/>;
    return (
        <BaseBlockWidget node={props.node} engine={props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
            <p>Test Size: {props.node.getTestSize()}</p>
            <p>Train Size: {props.node.getTrainSize()}</p>
            <p>Shuffle: {props.node.getShuffle()}</p>
        </BaseBlockWidget>
    );

}

export default SplitDatasetWidget;
