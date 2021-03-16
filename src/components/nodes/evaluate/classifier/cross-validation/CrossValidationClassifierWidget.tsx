import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {CrossValidationClassifierModel} from './CrossValidationClassifierModel';
import BaseNodeWidget from '../../../../core/BaseNode/BaseNodeWidget';
import CrossValidationClassifierModal from "./CrossValidationClassifierModal";
import {EVALUATE_CONFIG} from '../../EvaluateConfig';

interface CrossValidationProps {
    node: CrossValidationClassifierModel;
    engine: DiagramEngine;
}

type CrossValidationState = {
    node: CrossValidationClassifierModel;
};

class CrossValidationClassifierWidget extends React.Component<CrossValidationProps, CrossValidationState> {

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
        const modal = <CrossValidationClassifierModal node={this.props.node} numberFoldsChanged={this.numberFoldsChanged}/>;
        return (
            <BaseNodeWidget node={this.props.node} engine={this.props.engine} color={EVALUATE_CONFIG.color} modalChildren={modal}>
                <p>Number of folds: {this.state.node.getNumberFolds()}</p>
            </BaseNodeWidget>
        );
    }

}

export default CrossValidationClassifierWidget;
