import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {AbstractDsModel} from './AbstractDsModel';
import BaseBlockWidget, {eventNodeUpdated} from '../../../../base/base-block/BaseBlockWidget';
import AbstractDsModal from "./AbstractDsModal";
import {DATA_CONFIG} from '../../DataConfig';

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

    const modal = <AbstractDsModal node={props.node} numColsChanged={numColsChanged} numRowsChanged={numRowsChanged}/>;

    return (
            <BaseBlockWidget node={props.node} engine={props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
                <p>Rows: {props.node.getRows()}</p>
                <p>Columns: {props.node.getCols()}</p>
            </BaseBlockWidget>
    );

}

export default AbstractDsWidget;
