import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {TemplateCodeNameModel} from './TemplateCodeNameModel';
import BaseNodeWidget, {eventNodeUpdated} from '../../../core/BaseNode/BaseNodeWidget';
import TemplateCodeNameModal from './TemplateCodeNameModal';
import {CATEGORY_CONFIG} from "../../Config";

interface TemplateCodeNameProps {
    node: TemplateCodeNameModel;
    engine: DiagramEngine;
}

const TemplateCodeNameWidget = (props: TemplateCodeNameProps) => {



    const modal = <TemplateCodeNameModal node={props.node}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={CATEGORY_CONFIG.color}
                        modalChildren={modal}>
            <p></p>
            <p></p>
        </BaseNodeWidget>
    )

}

export default TemplateCodeNameWidget;
