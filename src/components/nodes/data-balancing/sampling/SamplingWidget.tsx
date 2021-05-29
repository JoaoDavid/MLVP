import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {SamplingModel} from './SamplingModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import SamplingModal from './SamplingModal';
import {DATA_BALANCING_CONFIG} from "../../Config";

interface SamplingProps {
    node: SamplingModel;
    engine: DiagramEngine;
}

const SamplingWidget = (props: SamplingProps) => {



    const modal = <SamplingModal node={props.node}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_BALANCING_CONFIG.color}
                        modalContent={modal}>
            <p></p>
            <p></p>
        </BaseNodeWidget>
    )

}

export default SamplingWidget;
