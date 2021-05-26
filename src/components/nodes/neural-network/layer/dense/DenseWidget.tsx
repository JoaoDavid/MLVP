import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {DenseModel} from './DenseModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../../core/BaseNode/BaseNodeWidget';
import DenseModal from './DenseModal';
import {LAYER_CONFIG} from "../../../Config";

interface DenseProps {
    node: DenseModel;
    engine: DiagramEngine;
}

const DenseWidget = (props: DenseProps) => {

    const unitsChanged = (value: number) => {
        props.node.setUnits(value);
        eventNodeUpdated(props.engine, props.node);
    }

    const activationChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setActivation(event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <DenseModal node={props.node} activationChanged={activationChanged} unitsChanged={unitsChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={LAYER_CONFIG.color}
                        modalChildren={modal}>
            <p>Units: {props.node.getUnits()}</p>
            <p>Activation: {props.node.getActivation().toString()}</p>
        </BaseNodeWidget>
    )

}

export default DenseWidget;
