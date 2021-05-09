import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {SVMClassifierModel} from './SVMClassifierModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import SVMClassifierModal from './SVMClassifierModal';
import {CLASSIFIER_CONFIG} from "../../Config";

interface SVMClassifierProps {
    node: SVMClassifierModel;
    engine: DiagramEngine;
}

const SVMClassifierWidget = (props: SVMClassifierProps) => {

    const modal = <SVMClassifierModal node={props.node}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={CLASSIFIER_CONFIG.color}
                        modalChildren={modal}>
        </BaseNodeWidget>
    )

}

export default SVMClassifierWidget;
