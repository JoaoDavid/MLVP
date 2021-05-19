import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {DenseModel} from './DenseModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../../core/BaseNode/BaseNodeWidget';
import DenseModal from './DenseModal';
import {CLASSIFIER_CONFIG, LAYER_CONFIG} from "../../../Config";

interface DenseProps {
    node: DenseModel;
    engine: DiagramEngine;
}

const DenseWidget = (props: DenseProps) => {

    const modal = <DenseModal node={props.node}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={LAYER_CONFIG.color}
                        modalChildren={modal}>
        </BaseNodeWidget>
    )

}

export default DenseWidget;
