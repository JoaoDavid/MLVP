import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {SequentialModel} from './SequentialModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../../core/BaseNode/BaseNodeWidget';
import SequentialModal from './SequentialModal';
import {CLASSIFIER_CONFIG, MODEL_CONFIG} from "../../../Config";

interface SequentialProps {
    node: SequentialModel;
    engine: DiagramEngine;
}

const SequentialWidget = (props: SequentialProps) => {

    const modal = <SequentialModal node={props.node}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={MODEL_CONFIG.color}
                        modalChildren={modal}>
        </BaseNodeWidget>
    )

}

export default SequentialWidget;
