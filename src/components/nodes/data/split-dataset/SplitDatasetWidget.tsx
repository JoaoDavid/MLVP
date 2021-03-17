import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {SplitDatasetModel} from './SplitDatasetModel';
import BaseNodeWidget from '../../../core/BaseNode/BaseNodeWidget';
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
        this.setState({});
    }

    trainSizeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.node.setTrainSize(+event.target.value);
        this.setState({});
    }

    shuffleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.node.setShuffle(event.target.value);
        this.setState({});
    }

    private updateState = () => {
        this.setState({});
        this.props.engine.getModel().fireEvent(
            {
                node: this,
            },
            'nodePropsUpdated'
        );
    }


    render() {
        const modal = <SplitDatasetModal node={this.props.node} testSizeChanged={this.testSizeChanged} shuffleChanged={this.shuffleChanged} trainSizeChanged={this.trainSizeChanged}/>;
        return (
            <BaseNodeWidget node={this.props.node} engine={this.props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
                <p>Test Size: {this.state.node.getTestSize()}</p>
                <p>Train Size: {this.state.node.getTrainSize()}</p>
                <p>Shuffle: {this.state.node.getShuffle()}</p>
            </BaseNodeWidget>
        );
    }

}

export default SplitDatasetWidget;
