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

    const fitInterceptChanged = () => {
        props.node.setFitIntercept(!props.node.getFitIntercept());
        eventNodeUpdated(props.engine, props.node);
    }

    const normalizeChanged = () => {
        props.node.setNormalize(!props.node.getNormalize());
        eventNodeUpdated(props.engine, props.node);
    }

    const copyXChanged = () => {
        props.node.setCopyX(!props.node.getCopyX());
        eventNodeUpdated(props.engine, props.node);
    }

    const numJobsChanged = (value: number) => {
        props.node.setNumJobs(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const numJobsCheckedChanged = (value: boolean) => {
        props.node.setNumJobsChecked(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const positiveChanged = () => {
        props.node.setPositive(!props.node.getPositive());
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <LinearRegressionModal node={props.node} copyXChanged={copyXChanged}
                                         fitInterceptChanged={fitInterceptChanged} normalizeChanged={normalizeChanged}
                                         numJobsChanged={numJobsChanged} numJobsCheckedChanged={numJobsCheckedChanged}
                                         positiveChanged={positiveChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={REGRESSOR_CONFIG.color}
                        modalChildren={modal}>
            <p>Fit Intercept: {props.node.getFitIntercept().toString()}</p>
            <p>Normalize: {props.node.getNormalize().toString()}</p>
            <p>Copy X: {props.node.getCopyX().toString()}</p>
        </BaseNodeWidget>
    )

}

export default LinearRegressionWidget;
