import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {PCAModel} from './PCAModel';
import CoreNodeWidget from '../../../core/CoreNode/CoreNodeWidget';
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
        this.updateState();
    }

    private updateState = () => {
        const newState = {...this.state};
        this.setState(newState);
        console.log(this.state.node);
    }


    render() {
        const modal = <PCAModal node={this.props.node} randomStateChanged={this.randomStateChanged}/>;
        return (
            <CoreNodeWidget node={this.props.node} engine={this.props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
                <p>Random State: {this.state.node.getRandomState()}</p>
            </CoreNodeWidget>
        );
    }

}

export default PCAWidget;
