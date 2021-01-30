import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {UndersamplingModel} from './UndersamplingModel';
import CoreNodeWidget from '../../../core/CoreNode/CoreNodeWidget';
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
        this.updateState();
    }

    private updateState = () => {
        const newState = {...this.state};
        this.setState(newState);
        console.log(this.state.node);
    }


    render() {
        const modal = <UndersamplingModal node={this.props.node} randomStateChanged={this.randomStateChanged}/>;
        return (
            <CoreNodeWidget node={this.props.node} engine={this.props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
                <p>Random State: {this.state.node.getRandomState()}</p>
            </CoreNodeWidget>
        );
    }

}

export default UndersamplingWidget;
