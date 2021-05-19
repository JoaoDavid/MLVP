import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {CompilerModel} from './CompilerModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import CompilerModal from './CompilerModal';
import {CLASSIFIER_CONFIG, COMPILER_CONFIG} from "../../Config";

interface CompilerProps {
    node: CompilerModel;
    engine: DiagramEngine;
}

const CompilerWidget = (props: CompilerProps) => {

    const modal = <CompilerModal node={props.node}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={COMPILER_CONFIG.color}
                        modalChildren={modal}>
        </BaseNodeWidget>
    )

}

export default CompilerWidget;
