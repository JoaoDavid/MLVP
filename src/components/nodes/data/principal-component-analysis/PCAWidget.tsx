import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {PCAModel} from './PCAModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import PCAModal from "./PCAModal";
import {DATA_CONFIG} from '../DataConfig';

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

    const numComponentsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value: number = +event.target.value;
        if (value > 0) {
            props.node.setNumComponents(+event.target.value);
            eventNodeUpdated(props.engine, props.node);
        }
    }

    const modal = <PCAModal node={props.node} randomStateChanged={randomStateChanged} randomStateCheckedChanged={randomStateCheckedChanged} numComponentsChanged={numComponentsChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
            <p>Random State: {props.node.getRandomStateChecked()?props.node.getRandomState():"None"}</p>
            <p>Num Components: {props.node.getNumComponents()}</p>
        </BaseNodeWidget>
    );

}

export default PCAWidget;
