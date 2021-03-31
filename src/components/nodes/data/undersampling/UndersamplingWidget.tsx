import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {UndersamplingModel} from './UndersamplingModel';
import BaseBlockWidget, {eventNodeUpdated} from '../../../base/base-block/BaseBlockWidget';
import UndersamplingModal from "./UndersamplingModal";
import {DATA_CONFIG} from '../DataConfig';

interface UndersamplingProps {
    node: UndersamplingModel;
    engine: DiagramEngine;
}

const UndersamplingWidget = (props: UndersamplingProps) => {

    const randomStateChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setRandomState(+event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <UndersamplingModal node={props.node} randomStateChanged={randomStateChanged}/>;
    return (
        <BaseBlockWidget node={props.node} engine={props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
            <p>Random State: {props.node.getRandomState()}</p>
        </BaseBlockWidget>
    );

}

export default UndersamplingWidget;
