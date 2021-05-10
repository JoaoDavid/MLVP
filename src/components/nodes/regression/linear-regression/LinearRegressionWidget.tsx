import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {LinearRegressionModel} from './LinearRegressionModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import LinearRegressionModal from './LinearRegressionModal';
import {REGRESSOR_CONFIG} from "../../Config";

interface LinearRegressionProps {
    node: LinearRegressionModel;
    engine: DiagramEngine;
}

const LinearRegressionWidget = (props: LinearRegressionProps) => {

    const modal = <LinearRegressionModal node={props.node}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={REGRESSOR_CONFIG.color}
                        modalChildren={modal}>
        </BaseNodeWidget>
    )

}

export default LinearRegressionWidget;
