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

type CSVNodeState = {
    node: AbstractDsModel;
};

class AbstractDsWidget extends React.Component<CSVNodeProps, CSVNodeState> {

    state = {
        node: this.props.node,
    }

    numColsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.node.setCols(+event.target.value);
        this.setState({});
    }

    numRowsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.node.setRows(+event.target.value);
        this.setState({});
    }

    render() {
        const modal = <AbstractDsModal node={this.props.node} numColsChanged={this.numColsChanged} numRowsChanged={this.numRowsChanged}/>;

        return (
            <BaseNodeWidget node={this.props.node} engine={this.props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
                <p>Rows: {this.state.node.getRows()}</p>
                <p>Columns: {this.state.node.getCols()}</p>
            </BaseNodeWidget>
        );
    }

}

export default AbstractDsWidget;
