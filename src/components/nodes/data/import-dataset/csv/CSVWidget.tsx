import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {CSVModel} from './CSVModel';
import BaseNodeWidget from '../../../../core/BaseNode/BaseNodeWidget';
import CSVModal from "./CSVModal";
import {DATA_CONFIG} from '../../DataConfig';

interface CSVNodeProps {
    node: CSVModel;
    engine: DiagramEngine;
}

type CSVNodeState = {
    model: CSVModel;
};

class CSVWidget extends React.Component<CSVNodeProps, CSVNodeState> {

    state = {
        model: this.props.node,
    }

    loadCSV = (selectorFiles: FileList) => {
        this.state.model.loadCSV(selectorFiles).then((r:any) => {
            this.setState({});
        });
    }

    render() {
        const modal = <CSVModal changed={this.loadCSV} node={this.props.node}/>;
        return (
            <BaseNodeWidget node={this.props.node} engine={this.props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
                <p>{this.state.model.getFileName() || "File:"}</p>
                <p>Rows: {this.state.model.getRows()}</p>
                <p>Columns: {this.state.model.getCols()}</p>
            </BaseNodeWidget>
        );
    }

}

export default CSVWidget;
