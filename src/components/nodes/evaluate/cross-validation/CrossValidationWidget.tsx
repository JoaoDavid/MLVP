import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {CrossValidationModel} from './CrossValidationModel';
import CoreNodeWidget from '../../../core/CoreNode/CoreNodeWidget';
import CrossValidationModal from "./CrossValidationModal";
import {EVALUATE_CONFIG} from '../EvaluateConfig';

interface CrossValidationProps {
    node: CrossValidationModel;
    engine: DiagramEngine;
}

type CrossValidationState = {
    node: CrossValidationModel;
};

class CrossValidationWidget extends React.Component<CrossValidationProps, CrossValidationState> {

    state = {
        node: this.props.node,
    }

    numberFoldsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.node.setNumberFolds(+event.target.value);
        this.updateState();
    }

    private updateState = () => {
        const newState = {...this.state};
        this.setState(newState);
        console.log(this.state.node);
    }


    render() {
        const modal = <CrossValidationModal node={this.props.node} numberFoldsChanged={this.numberFoldsChanged}/>;
        return (
            <CoreNodeWidget node={this.props.node} engine={this.props.engine} color={EVALUATE_CONFIG.color} modalChildren={modal}>
                <p>Number of folds: {this.state.node.getNumberFolds()}</p>
            </CoreNodeWidget>
        );
    }

}

export default CrossValidationWidget;
