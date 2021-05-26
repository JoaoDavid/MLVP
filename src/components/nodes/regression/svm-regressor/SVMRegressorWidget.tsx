import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {SVMRegressorModel} from './SVMRegressorModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import SVMRegressorModal from './SVMRegressorModal';
import {REGRESSOR_CONFIG} from "../../Config";

interface SVMRegressorProps {
    node: SVMRegressorModel;
    engine: DiagramEngine;
}

const SVMRegressorWidget = (props: SVMRegressorProps) => {

    const kernelChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setKernel(event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const degreeChanged = (value: number) => {
        props.node.setDegree(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const gammaChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setGamma(event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <SVMRegressorModal node={props.node} degreeChanged={degreeChanged} gammaChanged={gammaChanged}
                                     kernelChanged={kernelChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={REGRESSOR_CONFIG.color}
                        modalContent={modal}>
            <p>kernel: {props.node.getKernel().toString()}</p>
            <p>Degree: {props.node.getDegree()}</p>
            <p>Gamma: {props.node.getGamma().toString()}</p>
        </BaseNodeWidget>
    )

}

export default SVMRegressorWidget;
