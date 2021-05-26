import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {OneHotDecodingModel} from './OneHotDecodingModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import OneHotDecodingModal from './OneHotDecodingModal';
import {DATA_TRANSFORMATION_CONFIG} from "../../Config";

interface OneHotDecodingProps {
    node: OneHotDecodingModel;
    engine: DiagramEngine;
}

const OneHotDecodingWidget = (props: OneHotDecodingProps) => {

    const encodedColumnChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        props.node.setEncodedColumn(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <OneHotDecodingModal node={props.node} encodedColumnChanged={encodedColumnChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_TRANSFORMATION_CONFIG.color}
                        modalContent={modal}>
            <p>To decode: {props.node.getEncodedColumn()}</p>
        </BaseNodeWidget>
    )

}

export default OneHotDecodingWidget;
