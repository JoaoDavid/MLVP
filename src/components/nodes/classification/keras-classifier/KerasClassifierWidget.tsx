import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {KerasClassifierModel} from './KerasClassifierModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import KerasClassifierModal from './KerasClassifierModal';
import {CLASSIFIER_CONFIG} from "../../Config";

interface KerasClassifierProps {
    node: KerasClassifierModel;
    engine: DiagramEngine;
}

const KerasClassifierWidget = (props: KerasClassifierProps) => {

    const modal = <KerasClassifierModal node={props.node} engine={props.node.getEngine()}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={CLASSIFIER_CONFIG.color}
                        modalChildren={modal}>
        </BaseNodeWidget>
    )

}

export default KerasClassifierWidget;
