import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {PCAModel} from './PCAModel';
import BaseNodeWidget from '../../../core/BaseNode/BaseNodeWidget';
import PCAModal from "./PCAModal";
import {DATA_CONFIG} from '../DataConfig';

interface PCAProps {
    node: PCAModel;
    engine: DiagramEngine;
}

type PCAState = {
    node: PCAModel;
};

class PCAWidget extends React.Component<PCAProps, PCAState> {

    state = {
        node: this.props.node,
    }

    randomStateChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.node.setRandomState(+event.target.value);
        this.setState({});
    }

    render() {
        const modal = <PCAModal node={this.props.node} randomStateChanged={this.randomStateChanged}/>;
        return (
            <BaseNodeWidget node={this.props.node} engine={this.props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
                <p>Random State: {this.state.node.getRandomState()}</p>
            </BaseNodeWidget>
        );
    }

}

export default PCAWidget;
