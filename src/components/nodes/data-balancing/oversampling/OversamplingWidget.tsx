import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {OversamplingModel} from './OversamplingModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import OversamplingModal from "./OversamplingModal";
import {DATA_BALANCING_CONFIG} from "../../Config";

interface OversamplingProps {
    node: OversamplingModel;
    engine: DiagramEngine;
}

const OversamplingWidget = (props: OversamplingProps) => {

    const randomStateChanged = (value: number) => {
        props.node.setRandomState(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const randomStateCheckedChanged = (value: boolean) => {
        props.node.setRandomStateChecked(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <OversamplingModal node={props.node} randomStateChanged={randomStateChanged} randomStateCheckedChanged={randomStateCheckedChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_BALANCING_CONFIG.color} modalContent={modal}>
            <p>Random State: {props.node.getRandomStateChecked()?props.node.getRandomState():"None"}</p>
        </BaseNodeWidget>
    );

}

export default OversamplingWidget;
