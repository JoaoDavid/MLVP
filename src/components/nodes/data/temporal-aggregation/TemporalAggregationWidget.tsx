import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {TemporalAggregationModel} from './TemporalAggregationModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import TemporalAggregationModal from './TemporalAggregationModal';
import {DATA_CONFIG} from '../DataConfig';

interface TemporalAggregationProps {
    node: TemporalAggregationModel;
    engine: DiagramEngine;
}

const TemporalAggregationWidget = (props: TemporalAggregationProps) => {

    const newColumnNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setNewColumnName(event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const originalColumnNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setOriginalColumnName(event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const metricChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setMetric(event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const windowSizeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setWindowSize(+event.target.value);
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <TemporalAggregationModal node={props.node} newColumnNameChanged={newColumnNameChanged}
                                            originalColumnNameChanged={originalColumnNameChanged}
                                            metricChanged={metricChanged} windowSizeChanged={windowSizeChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_CONFIG.color}
                        modalChildren={modal}>
        </BaseNodeWidget>
    )

}

export default TemporalAggregationWidget;
