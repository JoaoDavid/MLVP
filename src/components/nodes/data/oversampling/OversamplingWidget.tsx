import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {OversamplingModel} from './OversamplingModel';
import CoreNodeWidget from '../../../core/CoreNode/CoreNodeWidget';
import OversamplingModal from "./OversamplingModal";
import {DATA_CONFIG} from '../DataConfig';

interface OversamplingProps {
    node: OversamplingModel;
    engine: DiagramEngine;
}

type OversamplingState = {
    node: OversamplingModel;
};

class OversamplingWidget extends React.Component<OversamplingProps, OversamplingState> {

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
        const modal = <OversamplingModal node={this.props.node} randomStateChanged={this.randomStateChanged}/>;
        return (
            <CoreNodeWidget node={this.props.node} engine={this.props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
                <p>Random State: {this.state.node.getRandomState()}</p>
            </CoreNodeWidget>
        );
    }

}

export default OversamplingWidget;
