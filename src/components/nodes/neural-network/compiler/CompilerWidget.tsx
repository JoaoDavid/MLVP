import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {CompilerModel} from './CompilerModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import CompilerModal from './CompilerModal';
import {COMPILER_CONFIG} from "../../Config";

interface CompilerProps {
    node: CompilerModel;
    engine: DiagramEngine;
}

const CompilerWidget = (props: CompilerProps) => {

    const lossChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setLoss(event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const metricChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setMetric(event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <CompilerModal node={props.node} lossChanged={lossChanged} metricChanged={metricChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={COMPILER_CONFIG.color}
                        modalContent={modal}>
            <p>Loss: {props.node.getLoss().toString()}</p>
            <p>Metric: {props.node.getMetric().toString()}</p>
        </BaseNodeWidget>
    )

}

export default CompilerWidget;
