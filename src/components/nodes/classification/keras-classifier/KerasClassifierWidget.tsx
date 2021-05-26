import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {KerasClassifierModel} from './KerasClassifierModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import KerasClassifierModal from './KerasClassifierModal';
import {CLASSIFIER_CONFIG} from "../../Config";

interface KerasClassifierProps {
    node: KerasClassifierModel;
    engine: DiagramEngine;
}

const KerasClassifierWidget = (props: KerasClassifierProps) => {

    const epochsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setEpochs(+event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const batchSizeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setBatchSize(+event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const verboseChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setVerbose(+event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <KerasClassifierModal node={props.node} epochsChanged={epochsChanged}
                                        batchSizeChanged={batchSizeChanged} verboseChanged={verboseChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={CLASSIFIER_CONFIG.color}
                        modalContent={modal}>
            <p>Epochs: {props.node.getEpochs()}</p>
            <p>Batch Size: {props.node.getBatchSize()}</p>
            <p>Verbose: {props.node.getVerbose()}</p>
        </BaseNodeWidget>
    )

}

export default KerasClassifierWidget;
