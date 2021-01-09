import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {CSVNodeModel} from './CSVNodeModel';
import CoreNodeWidget from '../../../../core/CoreNode/CoreNodeWidget';
import CSVModal from "./CSVModal";
import {DATA_CONFIG} from '../../DataConfig';

interface CSVNodeProps {
    node: CSVNodeModel;
    engine: DiagramEngine;
}

type CSVNodeState = {
    model: CSVNodeModel;
};

class CSVNodeWidget extends React.Component<CSVNodeProps, CSVNodeState> {

    state = {
        model: this.props.node,
    }


    loadCSV = (selectorFiles: FileList) => {
        this.state.model.loadCSV(selectorFiles).then((r:any) => {
            //console.log(r[0]);
            const newState = {...this.state};
            this.setState(newState);
        });
    }

    render() {
        const modal = <CSVModal changed={this.loadCSV} node={this.props.node}/>;

        return (
            <CoreNodeWidget node={this.props.node} engine={this.props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
                <p>File: {this.state.model.getFileName() || ""}</p>
                <p>Rows: {this.state.model.getRows() || ""}</p>
                <p>Columns: {this.state.model.getCols() || ""}</p>
            </CoreNodeWidget>
        );
    }

}

export default CSVNodeWidget;
