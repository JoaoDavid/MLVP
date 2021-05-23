import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {KerasClassifierModel} from './KerasClassifierModel';
import BaseNodeWidget from '../../../core/BaseNode/BaseNodeWidget';
import KerasClassifierModal from './KerasClassifierModal';
import {CLASSIFIER_CONFIG} from "../../Config";
import KerasClassifierModalClassComponent from "./KerasClassifierModalClassComponent";

interface KerasClassifierProps {
    node: KerasClassifierModel;
    engine: DiagramEngine;
}

const KerasClassifierWidget = (props: KerasClassifierProps) => {

    const modal = <KerasClassifierModalClassComponent node={props.node}/>;
    // const modal = <KerasClassifierModal node={props.node}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={CLASSIFIER_CONFIG.color}
                        modalChildren={modal}>
        </BaseNodeWidget>
    )

}

export default KerasClassifierWidget;
