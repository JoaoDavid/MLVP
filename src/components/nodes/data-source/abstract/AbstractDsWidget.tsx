import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {AbstractDsModel} from './AbstractDsModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import AbstractDsModal from "./AbstractDsModal";
import {DATA_SOURCE_CONFIG} from "../../Config";

interface CSVNodeProps {
    node: AbstractDsModel;
    engine: DiagramEngine;
}

const AbstractDsWidget = (props: CSVNodeProps) => {

    const numColsChanged = (value: number) => {
        props.node.setCols(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const numRowsChanged = (value: number) => {
        props.node.setRows(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const timeSeriesChanged = () => {
        props.node.setTimeSeries(!props.node.getTimeSeries());
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <AbstractDsModal node={props.node} numColsChanged={numColsChanged} numRowsChanged={numRowsChanged} timeSeriesChanged={timeSeriesChanged}/>;

    return (
            <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_SOURCE_CONFIG.color} modalContent={modal}>
                <p>Rows: {props.node.getRows()}</p>
                <p>Columns: {props.node.getCols()}</p>
                <p>Time Series: {""+props.node.getTimeSeries()}</p>
            </BaseNodeWidget>
    );

}

export default AbstractDsWidget;
