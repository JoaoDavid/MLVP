import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {CSVModel} from './CSVModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../../core/BaseNode/BaseNodeWidget';
import CSVModal from "./CSVModal";
import {DATA_CONFIG} from '../../DataConfig';

interface CSVNodeProps {
    node: CSVModel;
    engine: DiagramEngine;
}

const CSVWidget = (props: CSVNodeProps) => {
    // const [, setCount] = useState(0);
    // const forceUpdate = () => setCount(prevCount => prevCount + 1);

    const loadCSV = (selectorFiles: FileList) => {
        props.node.loadCSV(selectorFiles).then((r: any) => {
            // eslint-disable-next-line
            eventNodeUpdated(props.engine, props.node);
            // forceUpdate();
        });
    }

    const timeSeriesChanged = () => {
        props.node.setTimeSeries(!props.node.getTimeSeries());
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <CSVModal node={props.node} loadCSV={loadCSV} timeSeriesChanged={timeSeriesChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
            <p>{props.node.getFileName() || "File:"}</p>
            <p>Rows: {props.node.getRows()}</p>
            <p>Columns: {props.node.getCols()}</p>
            <p>Time Series: {""+props.node.getTimeSeries()}</p>
        </BaseNodeWidget>
    );

}

export default CSVWidget;
