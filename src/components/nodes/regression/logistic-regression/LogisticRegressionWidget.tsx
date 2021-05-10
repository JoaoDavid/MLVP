import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {LogisticRegressionModel} from './LogisticRegressionModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import LogisticRegressionModal from './LogisticRegressionModal';
import {REGRESSOR_CONFIG} from "../../Config";

interface LogisticRegressionProps {
    node: LogisticRegressionModel;
    engine: DiagramEngine;
}

const LogisticRegressionWidget = (props: LogisticRegressionProps) => {

    const modal = <LogisticRegressionModal node={props.node}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={REGRESSOR_CONFIG.color}
                        modalChildren={modal}>
        </BaseNodeWidget>
    )

}

export default LogisticRegressionWidget;
