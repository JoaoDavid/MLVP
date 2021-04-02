import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {FeatureEngineeringModel} from './FeatureEngineeringModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import FeatureEngineeringModal from "./FeatureEngineeringModal";
import {DATA_CONFIG} from '../DataConfig';

interface FeatureEngineeringProps {
    node: FeatureEngineeringModel;
    engine: DiagramEngine;
}

const FeatureEngineeringWidget = (props: FeatureEngineeringProps) => {

    const linesChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setLines(event.target.value.split("\n"));
        eventNodeUpdated(props.engine, props.node);
    }

    const modal = <FeatureEngineeringModal node={props.node} linesChanged={linesChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
            <p></p>
        </BaseNodeWidget>
    );

}

export default FeatureEngineeringWidget;
