import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {LabelEncodingModel} from './LabelEncodingModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import LabelEncodingModal from './LabelEncodingModal';
import {DATA_TRANSFORMATION_CONFIG} from "../../Config";

interface LabelEncodingProps {
    node: LabelEncodingModel;
    engine: DiagramEngine;
}

const LabelEncodingWidget = (props: LabelEncodingProps) => {

    const encodedColumnChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        props.node.setOriginalColumn(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <LabelEncodingModal node={props.node} encodedColumnChanged={encodedColumnChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_TRANSFORMATION_CONFIG.color}
                        modalContent={modal}>
            <p>To encode: {props.node.getOriginalColumn()}</p>
        </BaseNodeWidget>
    )

}

export default LabelEncodingWidget;
