import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {OneHotEncodingModel} from './OneHotEncodingModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import OneHotEncodingModal from './OneHotEncodingModal';
import {DATA_TRANSFORMATION_CONFIG} from "../../Config";

interface OneHotEncodingProps {
    node: OneHotEncodingModel;
    engine: DiagramEngine;
}

const OneHotEncodingWidget = (props: OneHotEncodingProps) => {

    const encodedColumnChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        props.node.setOriginalColumn(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <OneHotEncodingModal node={props.node} encodedColumnChanged={encodedColumnChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_TRANSFORMATION_CONFIG.color}
                        modalChildren={modal}>
            <p>To encode: {props.node.getOriginalColumn()}</p>
        </BaseNodeWidget>
    )

}

export default OneHotEncodingWidget;
