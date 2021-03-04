import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {RandomForestClassifierModel} from './RandomForestClassifierModel';
import BaseNodeWidget from '../../../../core/BaseNode/BaseNodeWidget';
import RandomForestClassifierModal from './RandomForestClassifierModal';
import { MODEL_CONFIG } from '../../ModelConfig';

interface NodeProps {
    node: RandomForestClassifierModel;
    engine: DiagramEngine;
}

type NodeState = {
    node: RandomForestClassifierModel;
};

class RandomForestClassifierWidget extends React.Component<NodeProps, NodeState> {

    state = {
        node: this.props.node,
    }

    numTreesChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.node.setNumTrees(+event.target.value);
        this.setState({});
    }

    maxDepthChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.node.setMaxDepth(+event.target.value);
        this.setState({});
    }

    criterionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.node.setCriterion(event.target.value);
        this.setState({});
    }

    render() {
        const modal = <RandomForestClassifierModal node={this.state.node} numTreesChanged={this.numTreesChanged}
                                                   maxDepthChanged={this.maxDepthChanged}
                                                   criterionChanged={this.criterionChanged}/>;

        return (
            <BaseNodeWidget node={this.state.node} engine={this.props.engine} color={MODEL_CONFIG.color}
                            modalChildren={modal}>
                <p>Trees: {this.state.node.getNumTrees()}</p>
                <p>Max Depth: {this.state.node.getMaxDepth() || "None"}</p>
                <p>Criterion: {this.state.node.getCriterion().toString()}</p>
            </BaseNodeWidget>
        )
    }

}

export default RandomForestClassifierWidget;
