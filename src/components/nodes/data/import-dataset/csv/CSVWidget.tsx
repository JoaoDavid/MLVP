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
            eventNodeUpdated(props.engine, props.node);
            // forceUpdate();
        });
    }

    const modal = <CSVModal loadCSV={loadCSV} node={props.node}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
            <p>{props.node.getFileName() || "File:"}</p>
            <p>Rows: {props.node.getRows()}</p>
            <p>Columns: {props.node.getCols()}</p>
        </BaseNodeWidget>
    );

}

export default CSVWidget;
