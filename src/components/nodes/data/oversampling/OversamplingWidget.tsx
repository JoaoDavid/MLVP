import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {OversamplingModel} from './OversamplingModel';
import BaseBlockWidget, {eventNodeUpdated} from '../../../base/base-block/BaseBlockWidget';
import OversamplingModal from "./OversamplingModal";
import {DATA_CONFIG} from '../DataConfig';

interface OversamplingProps {
    node: OversamplingModel;
    engine: DiagramEngine;
}

const OversamplingWidget = (props: OversamplingProps) => {

    const randomStateChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setRandomState(+event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <OversamplingModal node={props.node} randomStateChanged={randomStateChanged}/>;
    return (
        <BaseBlockWidget node={props.node} engine={props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
            <p>Random State: {props.node.getRandomState()}</p>
        </BaseBlockWidget>
    );

}

export default OversamplingWidget;
