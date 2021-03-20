import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {PCAModel} from './PCAModel';
import BaseNodeWidget from '../../../core/BaseNode/BaseNodeWidget';
import PCAModal from "./PCAModal";
import {DATA_CONFIG} from '../DataConfig';

interface PCAProps {
    node: PCAModel;
    engine: DiagramEngine;
}

const PCAWidget = (props: PCAProps) => {

    const randomStateChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setRandomState(+event.target.value);
    }

    const numComponentsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setNumComponents(+event.target.value);
    }

    const modal = <PCAModal node={props.node} randomStateChanged={randomStateChanged} numComponentsChanged={numComponentsChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
            <p>Random State: {props.node.getRandomState()}</p>
            <p>Num Components: {props.node.getNumComponents()}</p>
        </BaseNodeWidget>
    );

}

export default PCAWidget;
