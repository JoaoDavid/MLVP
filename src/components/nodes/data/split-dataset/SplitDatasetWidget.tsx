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
    node: SplitDatasetModel;
};

class SplitDatasetWidget extends React.Component<SplitDatasetProps, SplitDatasetState> {

    state = {
        node: this.props.node,
    }

    testSizeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.node.setTestSize(+event.target.value);
        this.updateState();
    }

    private updateState = () => {
        const newState = {...this.state};
        this.setState(newState);
        console.log(this.state.node);
    }


    render() {
        const modal = <SplitDatasetModal node={this.props.node} testSizeChanged={this.testSizeChanged}/>;
        return (
            <CoreNodeWidget node={this.props.node} engine={this.props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
                <p>Test Size: {this.state.node.getTestSize() || ""}</p>
            </CoreNodeWidget>
        );
    }

}

export default SplitDatasetWidget;
