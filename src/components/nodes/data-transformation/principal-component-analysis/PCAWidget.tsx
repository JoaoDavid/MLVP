import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {PCAModel} from './PCAModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import PCAModal from "./PCAModal";
import {DATA_TRANSFORMATION_CONFIG} from "../../Config";

interface PCAProps {
    node: PCAModel;
    engine: DiagramEngine;
}

const PCAWidget = (props: PCAProps) => {

    const randomStateChanged = (value: number) => {
        props.node.setRandomState(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const randomStateCheckedChanged = (value: boolean) => {
        props.node.setRandomStateChecked(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const numComponentsChanged = (value: number) => {
        if (value > 0) {
            props.node.setNumComponents(value);
            eventNodeUpdated(props.engine, props.node);
        }
    }

    const modal = <PCAModal node={props.node} randomStateChanged={randomStateChanged} randomStateCheckedChanged={randomStateCheckedChanged} numComponentsChanged={numComponentsChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_TRANSFORMATION_CONFIG.color} modalContent={modal}>
            <p>Random State: {props.node.getRandomStateChecked()?props.node.getRandomState():"None"}</p>
            <p>Num Components: {props.node.getNumComponents()}</p>
        </BaseNodeWidget>
    );

}

export default PCAWidget;
