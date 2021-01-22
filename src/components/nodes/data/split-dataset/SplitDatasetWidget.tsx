import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {SplitDatasetModel} from './SplitDatasetModel';
import CoreNodeWidget from '../../../core/CoreNode/CoreNodeWidget';
import SplitDatasetModal from "./SplitDatasetModal";
import {DATA_CONFIG} from '../DataConfig';

interface SplitDatasetProps {
    node: SplitDatasetModel;
    engine: DiagramEngine;
}

type SplitDatasetState = {
    model: SplitDatasetModel;
};

class SplitDatasetWidget extends React.Component<SplitDatasetProps, SplitDatasetState> {

    state = {
        model: this.props.node,
    }


    render() {
        const modal = <SplitDatasetModal node={this.props.node}/>;
        return (
            <CoreNodeWidget node={this.props.node} engine={this.props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
                <p>Rows: {this.state.model.getRows() || ""}</p>
                <p>Columns: {this.state.model.getCols() || ""}</p>
            </CoreNodeWidget>
        );
    }

}

export default SplitDatasetWidget;
