import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {StochasticGradientDescentModel} from './StochasticGradientDescentModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../../core/BaseNode/BaseNodeWidget';
import StochasticGradientDescentModal from './StochasticGradientDescentModal';
import {OPTIMIZER_CONFIG} from "../../../Config";

interface StochasticGradientDescentProps {
    node: StochasticGradientDescentModel;
    engine: DiagramEngine;
}

const StochasticGradientDescentWidget = (props: StochasticGradientDescentProps) => {

    const modal = <StochasticGradientDescentModal node={props.node}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={OPTIMIZER_CONFIG.color}
                        modalChildren={modal}>
        </BaseNodeWidget>
    )

}

export default StochasticGradientDescentWidget;
