import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {KerasClassifierModel} from './KerasClassifierModel';
import BaseNodeWidget, {eventNodeUpdated, eventHideCanvas} from '../../../core/BaseNode/BaseNodeWidget';
import KerasClassifierModal from './KerasClassifierModal';
import {CLASSIFIER_CONFIG} from "../../Config";

interface KerasClassifierProps {
    node: KerasClassifierModel;
    engine: DiagramEngine;
}

const KerasClassifierWidget = (props: KerasClassifierProps) => {

    const hideCanvas = (value: boolean) => {
        console.log("call hide canvas")
        eventHideCanvas(props.engine, value);
    }

    const modal = <KerasClassifierModal node={props.node} hideCanvas={hideCanvas}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={CLASSIFIER_CONFIG.color}
                        modalChildren={modal}>
        </BaseNodeWidget>
    )

}

export default KerasClassifierWidget;
