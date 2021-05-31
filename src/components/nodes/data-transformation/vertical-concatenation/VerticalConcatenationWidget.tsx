import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {VerticalConcatenationModel} from './VerticalConcatenationModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import VerticalConcatenationModal from './VerticalConcatenationModal';
import {DATA_TRANSFORMATION_CONFIG} from "../../Config";

interface VerticalConcatenationProps {
    node: VerticalConcatenationModel;
    engine: DiagramEngine;
}

const VerticalConcatenationWidget = (props: VerticalConcatenationProps) => {



    const modal = <VerticalConcatenationModal node={props.node}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_TRANSFORMATION_CONFIG.color}
                        modalContent={modal}>
            <p></p>
            <p></p>
        </BaseNodeWidget>
    )

}

export default VerticalConcatenationWidget;
