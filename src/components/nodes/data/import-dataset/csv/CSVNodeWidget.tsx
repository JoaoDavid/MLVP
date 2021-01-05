import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {CSVNodeModel} from './CSVNodeModel';
import InputFile from '../../../../core/InputFile/InputFile';
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
        this.state.model.loadCSV(selectorFiles);
        const temp = this.state.numRows + 1;
        this.setState({
/*            numRows: this.props.node.numRows,
            numCols: this.props.node.numCols,*/
            numRows: temp,
            numCols: temp,

        })
    }

    render() {
        const modal = <CSVModal changed={this.loadCSV}  numCols={this.state.numCols } numRows={this.state.numRows}/>;

        return (
            <CoreNodeWidget node={this.props.node} engine={this.props.engine} color={'green'} modalChildren={modal}>
                {/*<p>Rows: {this.state.numRows}</p>
                {/*<p>Rows: {this.state.numRows}</p>
                <p>Columns: {this.state.numCols}</p>*/}
                <InputFile acceptedTypes={['.csv']} changed={this.loadCSV}/>
            </CoreNodeWidget>
        );
    }

}

export default CSVNodeWidget;
