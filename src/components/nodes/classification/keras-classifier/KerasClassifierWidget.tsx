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

    const epochsChanged = (value: number) => {
        props.node.setEpochs(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const batchSizeChanged = (value: number) => {
        props.node.setBatchSize(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const verboseChanged = (value: number) => {
        props.node.setVerbose(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <KerasClassifierModal node={props.node} epochsChanged={epochsChanged}
                                        batchSizeChanged={batchSizeChanged} verboseChanged={verboseChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={CLASSIFIER_CONFIG.color}
                        modalContent={modal} modalSize={"xl"}>
            <p>Epochs: {props.node.getEpochs()}</p>
            <p>Batch Size: {props.node.getBatchSize()}</p>
            <p>Verbose: {props.node.getVerbose()}</p>
        </BaseNodeWidget>
    )

}

export default KerasClassifierWidget;
