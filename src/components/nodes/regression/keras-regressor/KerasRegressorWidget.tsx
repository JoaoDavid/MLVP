import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {KerasRegressorModel} from './KerasRegressorModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import KerasRegressorModal from './KerasRegressorModal';
import {REGRESSOR_CONFIG} from "../../Config";

interface KerasRegressorProps {
    node: KerasRegressorModel;
    engine: DiagramEngine;
}

const KerasRegressorWidget = (props: KerasRegressorProps) => {

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

    const modal = <KerasRegressorModal node={props.node} epochsChanged={epochsChanged}
                                        batchSizeChanged={batchSizeChanged} verboseChanged={verboseChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={REGRESSOR_CONFIG.color}
                        modalContent={modal} modalSize={"xl"}>
            <p>Epochs: {props.node.getEpochs()}</p>
            <p>Batch Size: {props.node.getBatchSize()}</p>
            <p>Verbose: {props.node.getVerbose()}</p>
        </BaseNodeWidget>
    )

}

export default KerasRegressorWidget;
