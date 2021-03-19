import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {OversamplingModel} from './OversamplingModel';
import BaseNodeWidget from '../../../core/BaseNode/BaseNodeWidget';
import OversamplingModal from "./OversamplingModal";
import {DATA_CONFIG} from '../DataConfig';

interface OversamplingProps {
    node: OversamplingModel;
    engine: DiagramEngine;
}

const OversamplingWidget = (props: OversamplingProps) => {

    const randomStateChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setRandomState(+event.target.value);
    }

    const modal = <OversamplingModal node={props.node} randomStateChanged={randomStateChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
            <p>Random State: {props.node.getRandomState()}</p>
        </BaseNodeWidget>
    );

}

export default OversamplingWidget;
