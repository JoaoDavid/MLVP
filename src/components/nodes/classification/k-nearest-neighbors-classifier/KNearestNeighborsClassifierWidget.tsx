import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {KNearestNeighborsClassifierModel} from './KNearestNeighborsClassifierModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import KNearestNeighborsClassifierModal from './KNearestNeighborsClassifierModal';
import {CLASSIFIER_CONFIG} from "../../Config";

interface KNearestNeighborsClassifierProps {
    node: KNearestNeighborsClassifierModel;
    engine: DiagramEngine;
}

const KNearestNeighborsClassifierWidget = (props: KNearestNeighborsClassifierProps) => {

    const numNeighborsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setNumNeighbors(+event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const weightsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setWeights(event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const algorithmChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setAlgorithm(event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <KNearestNeighborsClassifierModal node={props.node} algorithmChanged={algorithmChanged}
                                                    numNeighborsChanged={numNeighborsChanged}
                                                    weightsChanged={weightsChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={CLASSIFIER_CONFIG.color}
                        modalContent={modal}>
            <p>Neighbors: {props.node.getNumNeighbors()}</p>
            <p>Weights: {props.node.getWeights().toString()}</p>
            <p>Algorithm: {props.node.getAlgorithm().toString()}</p>
        </BaseNodeWidget>
    )

}

export default KNearestNeighborsClassifierWidget;
