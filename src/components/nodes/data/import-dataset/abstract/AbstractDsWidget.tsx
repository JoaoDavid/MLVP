import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {AbstractDsModel} from './AbstractDsModel';
import BaseNodeWidget from '../../../../core/BaseNode/BaseNodeWidget';
import AbstractDsModal from "./AbstractDsModal";
import {DATA_CONFIG} from '../../DataConfig';

interface CSVNodeProps {
    node: AbstractDsModel;
    engine: DiagramEngine;
}

const AbstractDsWidget = (props: CSVNodeProps) => {

    const numColsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setCols(+event.target.value);
        props.engine.getModel().fireEvent(
            {
                node: props.node
            },
            'nodeParameterUpdated'
        );
    }

    const numRowsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setRows(+event.target.value);
        props.engine.getModel().fireEvent(
            {
                node: props.node
            },
            'nodeParameterUpdated'
        );
    }

    const modal = <AbstractDsModal node={props.node} numColsChanged={numColsChanged} numRowsChanged={numRowsChanged}/>;

    return (
            <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
                <p>Rows: {props.node.getRows()}</p>
                <p>Columns: {props.node.getCols()}</p>
            </BaseNodeWidget>
    );

}

export default AbstractDsWidget;
