import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {RandomForestNodeModel} from './RandomForestNodeModel';
import CoreNodeWidget from '../../../core/CoreNode/CoreNodeWidget';
import RandomForestModal from './RandomForestModal';
import { MODEL_CONFIG } from './../ModelConfig';

interface NodeProps {
    node: RandomForestNodeModel;
    engine: DiagramEngine;
}

type NodeState = {
    node: RandomForestNodeModel;
};

class RandomForestNodeWidget extends React.Component<NodeProps, NodeState> {

    state = {
        node: this.props.node,
    }

    numTreesChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.node.setNumTrees(+event.target.value);
        this.updateState();
    }

    maxDepthChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.node.setMaxDepth(+event.target.value);
        this.updateState();
    }

    criterionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.node.setCriterion(event.target.value);
        this.updateState();
    }

    private updateState = () => {
        const newState = {...this.state};
        this.setState(newState);
        console.log(this.state.node);
    }

    render() {
        const modal = <RandomForestModal node={this.state.node} numTreesChanged={this.numTreesChanged}
                                         maxDepthChanged={this.maxDepthChanged}
                                         criterionChanged={this.criterionChanged}/>;

        return (
            <CoreNodeWidget node={this.state.node} engine={this.props.engine} color={MODEL_CONFIG.color}
                            modalChildren={modal}>
                <p>Trees: {this.state.node.getNumTrees()}</p>
                <p>Max Depth: {this.state.node.getMaxDepth() || "None"}</p>
                <p>Criterion: {this.state.node.getCriterion().toString()}</p>
            </CoreNodeWidget>
        )
    }

}

export default RandomForestNodeWidget;
