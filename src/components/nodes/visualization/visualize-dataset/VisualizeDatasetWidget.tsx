import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {VisualizeDatasetModel} from './VisualizeDatasetModel';
import BaseNodeWidget from '../../../core/BaseNode/BaseNodeWidget';
import VisualizeDatasetModal from "./VisualizeDatasetModal";
import {VISUALIZATION_CONFIG} from "../../Config";

interface VisualizeDatasetProps {
    node: VisualizeDatasetModel;
    engine: DiagramEngine;
}

const VisualizeDatasetWidget = (props: VisualizeDatasetProps) => {

    const modal = <VisualizeDatasetModal node={props.node}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={VISUALIZATION_CONFIG.color} modalContent={modal}>
        </BaseNodeWidget>
    );

}

export default VisualizeDatasetWidget;
