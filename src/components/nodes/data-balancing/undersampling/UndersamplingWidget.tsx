import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {UndersamplingModel} from './UndersamplingModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import UndersamplingModal from "./UndersamplingModal";
import {DATA_BALANCING_CONFIG} from "../../Config";

interface UndersamplingProps {
    node: UndersamplingModel;
    engine: DiagramEngine;
}

const UndersamplingWidget = (props: UndersamplingProps) => {

    const randomStateChanged = (value: number) => {
        props.node.setRandomState(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const randomStateCheckedChanged = (value: boolean) => {
        props.node.setRandomStateChecked(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <UndersamplingModal node={props.node} randomStateChanged={randomStateChanged} randomStateCheckedChanged={randomStateCheckedChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_BALANCING_CONFIG.color} modalContent={modal}>
            <p>Random State: {props.node.getRandomStateChecked()?props.node.getRandomState():"None"}</p>
        </BaseNodeWidget>
    );

}

export default UndersamplingWidget;
