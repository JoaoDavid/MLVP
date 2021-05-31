import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {HorizontalConcatenationModel} from './HorizontalConcatenationModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import HorizontalConcatenationModal from './HorizontalConcatenationModal';
import {DATA_TRANSFORMATION_CONFIG} from "../../Config";

interface HorizontalConcatenationProps {
    node: HorizontalConcatenationModel;
    engine: DiagramEngine;
}

const HorizontalConcatenationWidget = (props: HorizontalConcatenationProps) => {



    const modal = <HorizontalConcatenationModal node={props.node}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_TRANSFORMATION_CONFIG.color}
                        modalContent={modal}>
            <p></p>
            <p></p>
        </BaseNodeWidget>
    )

}

export default HorizontalConcatenationWidget;
