import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {VisualizeDatasetModel} from './VisualizeDatasetModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import VisualizeDatasetModal from "./VisualizeDatasetModal";
import {DATA_CONFIG} from '../DataConfig';

interface VisualizeDatasetProps {
    node: VisualizeDatasetModel;
    engine: DiagramEngine;
}

const VisualizeDatasetWidget = (props: VisualizeDatasetProps) => {

    const modal = <VisualizeDatasetModal node={props.node}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_CONFIG.color} modalChildren={modal}>
        </BaseNodeWidget>
    );

}

export default VisualizeDatasetWidget;