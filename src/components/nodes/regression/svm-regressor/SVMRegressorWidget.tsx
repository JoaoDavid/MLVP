import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {SVMRegressorModel} from './SVMRegressorModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import SVMRegressorModal from './SVMRegressorModal';
import {REGRESSOR_CONFIG} from "../../Config";

interface SVMRegressorProps {
    node: SVMRegressorModel;
    engine: DiagramEngine;
}

const SVMRegressorWidget = (props: SVMRegressorProps) => {

    const modal = <SVMRegressorModal node={props.node}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={REGRESSOR_CONFIG.color}
                        modalChildren={modal}>
        </BaseNodeWidget>
    )

}

export default SVMRegressorWidget;
