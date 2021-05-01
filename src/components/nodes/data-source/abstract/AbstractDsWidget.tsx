import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {AbstractDsModel} from './AbstractDsModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import AbstractDsModal from "./AbstractDsModal";
import {DATA_SOURCE_CONFIG} from '../../data/DataConfig';

interface CSVNodeProps {
    node: AbstractDsModel;
    engine: DiagramEngine;
}

const AbstractDsWidget = (props: CSVNodeProps) => {

    const numColsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setCols(+event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const numRowsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setRows(+event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const timeSeriesChanged = () => {
        props.node.setTimeSeries(!props.node.getTimeSeries());
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <AbstractDsModal node={props.node} numColsChanged={numColsChanged} numRowsChanged={numRowsChanged} timeSeriesChanged={timeSeriesChanged}/>;

    return (
            <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_SOURCE_CONFIG.color} modalChildren={modal}>
                <p>Rows: {props.node.getRows()}</p>
                <p>Columns: {props.node.getCols()}</p>
                <p>Time Series: {""+props.node.getTimeSeries()}</p>
            </BaseNodeWidget>
    );

}

export default AbstractDsWidget;
