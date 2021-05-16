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

    const penaltyChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setPenalty(event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const dualChanged = () => {
        props.node.setDual(!props.node.getDual());
        eventNodeUpdated(props.engine, props.node);
    }

    const tolChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (+event.target.value > 0) {
            props.node.setTol(+event.target.value);
            eventNodeUpdated(props.engine, props.node);
        }
    }
    const cChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (+event.target.value > 0) {
            props.node.setC(+event.target.value);
            eventNodeUpdated(props.engine, props.node);
        }
    }

    const modal = <LogisticRegressionModal node={props.node} cChanged={cChanged} dualChanged={dualChanged} penaltyChanged={penaltyChanged} tolChanged={tolChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={REGRESSOR_CONFIG.color}
                        modalChildren={modal}>
            <p>Penalty: {props.node.getPenalty().toString()}</p>
            <p>Dual: {props.node.getDual().toString()}</p>
            <p>Tol: {props.node.getTol()}</p>
        </BaseNodeWidget>
    )

}

export default LogisticRegressionWidget;
