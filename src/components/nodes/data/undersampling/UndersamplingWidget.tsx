import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {UndersamplingModel} from './UndersamplingModel';
import BaseNodeWidget from '../../../core/BaseNode/BaseNodeWidget';
import UndersamplingModal from "./UndersamplingModal";
import {DATA_CONFIG} from '../DataConfig';

interface UndersamplingProps {
    node: UndersamplingModel;
    engine: DiagramEngine;
}

type UndersamplingState = {
    node: UndersamplingModel;
};

class UndersamplingWidget extends React.Component<UndersamplingProps, UndersamplingState> {

    state = {
        node: this.props.node,
    }

    randomStateChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.node.setRandomState(+event.target.value);
        this.setState({});
    }

    render() {
        const modal = <UndersamplingModal node={this.props.node} randomStateChanged={this.randomStateChanged}/>;
        return (
            <BaseNodeWidget node={this.props.node} engine={this.props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
                <p>Random State: {this.state.node.getRandomState()}</p>
            </BaseNodeWidget>
        );
    }

}

export default UndersamplingWidget;
