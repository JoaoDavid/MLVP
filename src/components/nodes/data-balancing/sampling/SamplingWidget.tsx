import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {SamplingModel} from './SamplingModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import SamplingModal from './SamplingModal';
import {DATA_BALANCING_CONFIG} from "../../Config";

interface SamplingProps {
    node: SamplingModel;
    engine: DiagramEngine;
}

const SamplingWidget = (props: SamplingProps) => {

    const fracChanged = (value: number) => {
        if (value > 0 || value < 1) {
            props.node.setFrac(value);
            eventNodeUpdated(props.engine, props.node);
        }
    }

    const randomStateChanged = (value: number) => {
        props.node.setRandomState(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const randomStateCheckedChanged = (value: boolean) => {
        props.node.setRandomStateChecked(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <SamplingModal node={props.node} fracChanged={fracChanged} randomStateChanged={randomStateChanged}
                                 randomStateCheckedChanged={randomStateCheckedChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_BALANCING_CONFIG.color}
                        modalContent={modal}>
            <p>Fraction: {props.node.getFrac()}</p>
            <p>Random State: {props.node.getRandomStateChecked() ? props.node.getRandomState() : "None"}</p>
        </BaseNodeWidget>
    )

}

export default SamplingWidget;
