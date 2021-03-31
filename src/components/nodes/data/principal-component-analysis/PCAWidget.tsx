import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {PCAModel} from './PCAModel';
import BaseBlockWidget, {eventNodeUpdated} from '../../../base/base-block/BaseBlockWidget';
import PCAModal from "./PCAModal";
import {DATA_CONFIG} from '../DataConfig';

interface PCAProps {
    node: PCAModel;
    engine: DiagramEngine;
}

const PCAWidget = (props: PCAProps) => {

    const randomStateChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setRandomState(+event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const numComponentsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setNumComponents(+event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <PCAModal node={props.node} randomStateChanged={randomStateChanged} numComponentsChanged={numComponentsChanged}/>;
    return (
        <BaseBlockWidget node={props.node} engine={props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
            <p>Random State: {props.node.getRandomState()}</p>
            <p>Num Components: {props.node.getNumComponents()}</p>
        </BaseBlockWidget>
    );

}

export default PCAWidget;
