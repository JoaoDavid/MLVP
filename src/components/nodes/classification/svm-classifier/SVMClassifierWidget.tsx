import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {SVMClassifierModel} from './SVMClassifierModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import SVMClassifierModal from './SVMClassifierModal';
import {CLASSIFIER_CONFIG} from "../../Config";

interface SVMClassifierProps {
    node: SVMClassifierModel;
    engine: DiagramEngine;
}

const SVMClassifierWidget = (props: SVMClassifierProps) => {

    const cChanged = (value: number) => {
        if (value > 0) {
            props.node.setC(value);
            eventNodeUpdated(props.engine, props.node);
        }
    }

    const kernelChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setKernel(event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const degreeChanged = (value: number) => {
        props.node.setDegree(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <SVMClassifierModal node={props.node} cChanged={cChanged} degreeChanged={degreeChanged}
                                      kernelChanged={kernelChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={CLASSIFIER_CONFIG.color}
                        modalContent={modal}>
            <p>C: {props.node.getC()}</p>
            <p>kernel: {props.node.getKernel().toString()}</p>
            <p>Degree: {props.node.getDegree()}</p>
        </BaseNodeWidget>
    )

}

export default SVMClassifierWidget;
