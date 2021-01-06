import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {CSVNodeModel} from './CSVNodeModel';
import CoreNodeWidget from '../../../../core/CoreNode/CoreNodeWidget';
import CSVModal from "./CSVModal";


interface CSVNodeProps {
    node: CSVNodeModel;
    engine: DiagramEngine;
}

type CSVNodeState = {
    model: CSVNodeModel;
    numRows: number,
    numCols: number,
};

class CSVNodeWidget extends React.Component<CSVNodeProps, CSVNodeState> {

    state = {
        model: this.props.node,
        numRows: this.props.node.numRows,
        numCols: this.props.node.numCols,
    }


    loadCSV = (selectorFiles: FileList) => {
        this.state.model.loadCSV(selectorFiles).then((r:any) => {
            console.log(r[0]);
            const newState = {...this.state};
            this.setState(newState);
        });
    }

    render() {
        const modal = <CSVModal changed={this.loadCSV} numCols={this.state.model.numCols}
                                numRows={this.state.model.numRows}/>;

        return (
            <CoreNodeWidget node={this.props.node} engine={this.props.engine} color={'green'} modalChildren={modal}>
                <p>Rows: {this.state.model.numRows}</p>
                <p>Columns: {this.state.model.numCols}</p>
            </CoreNodeWidget>
        );
    }

}

export default CSVNodeWidget;
