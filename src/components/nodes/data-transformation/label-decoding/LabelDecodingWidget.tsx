import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {LabelDecodingModel} from './LabelDecodingModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import LabelDecodingModal from './LabelDecodingModal';
import {DATA_TRANSFORMATION_CONFIG} from "../../Config";

interface LabelDecodingProps {
    node: LabelDecodingModel;
    engine: DiagramEngine;
}

const LabelDecodingWidget = (props: LabelDecodingProps) => {

    const encodedColumnChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        props.node.setEncodedColumn(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <LabelDecodingModal node={props.node} encodedColumnChanged={encodedColumnChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_TRANSFORMATION_CONFIG.color}
                        modalChildren={modal}>
            <p></p>
            <p></p>
        </BaseNodeWidget>
    )

}

export default LabelDecodingWidget;
