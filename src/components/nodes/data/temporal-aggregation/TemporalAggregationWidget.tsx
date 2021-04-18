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
        let value = event.target.value;
        if (value.length > 20) {
            return;
        }
        if(value.match("^[a-zA-Z_][a-zA-Z0-9_]*$") != null || value.match("^[a-zA-Z_]*$") != null){
            props.node.setNewColumnName(value);
            eventNodeUpdated(props.engine, props.node); // TODO
        }
    }

    const originalColumnNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (value.length > 20) {
            return;
        }
        if(value.match("^[a-zA-Z_][a-zA-Z0-9_]*$") != null || value.match("^[a-zA-Z_]*$") != null){
            props.node.setOriginalColumnName(value);
            eventNodeUpdated(props.engine, props.node); // TODO
        }
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
            {/*<p>New Column: {props.node.getNewColumnName()}</p>*/}
            {/*<p>Original Column: {props.node.getOriginalColumnName()}</p>*/}
            <p>Window Size: {props.node.getWindowSize()}</p>
            <p>Metric: {props.node.getMetric().toString()}</p>
        </BaseNodeWidget>
    )

}

export default TemporalAggregationWidget;
