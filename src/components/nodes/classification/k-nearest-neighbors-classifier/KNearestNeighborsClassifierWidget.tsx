import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {KNearestNeighborsClassifierModel} from './KNearestNeighborsClassifierModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import KNearestNeighborsClassifierModal from './KNearestNeighborsClassifierModal';
import {CLASSIFIER_CONFIG} from "../../Config";

interface KNearestNeighborsClassifierProps {
    node: KNearestNeighborsClassifierModel;
    engine: DiagramEngine;
}

const KNearestNeighborsClassifierWidget = (props: KNearestNeighborsClassifierProps) => {

    const modal = <KNearestNeighborsClassifierModal node={props.node}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={CLASSIFIER_CONFIG.color}
                        modalChildren={modal}>
        </BaseNodeWidget>
    )

}

export default KNearestNeighborsClassifierWidget;
