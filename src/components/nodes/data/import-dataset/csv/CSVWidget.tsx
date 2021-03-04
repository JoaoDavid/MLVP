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

};

class CSVWidget extends React.Component<CSVNodeProps, CSVNodeState> {


    loadCSV = (selectorFiles: FileList) => {
        this.props.node.loadCSV(selectorFiles).then((r:any) => {
            this.setState({});
        });
    }

    render() {
        const modal = <CSVModal changed={this.loadCSV} node={this.props.node}/>;
        return (
            <BaseNodeWidget node={this.props.node} engine={this.props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
                <p>{this.props.node.getFileName() || "File:"}</p>
                <p>Rows: {this.props.node.getRows()}</p>
                <p>Columns: {this.props.node.getCols()}</p>
            </BaseNodeWidget>
        );
    }

}

export default CSVWidget;
