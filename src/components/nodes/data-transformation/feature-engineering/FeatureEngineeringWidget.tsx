import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {FeatureEngineeringModel} from './FeatureEngineeringModel';
import BaseNodeWidget from '../../../core/BaseNode/BaseNodeWidget';
import FeatureEngineeringModal from "./FeatureEngineeringModal";
import {DATA_TRANSFORMATION_CONFIG} from "../../Config";

interface FeatureEngineeringProps {
    node: FeatureEngineeringModel;
    engine: DiagramEngine;
}

const FeatureEngineeringWidget = (props: FeatureEngineeringProps) => {

    const linesChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.node.setLines(event.target.value);
        // eventNodeUpdated(props.engine, props.node); //TODO
    }

    let firstThreeLines = props.node.getLines().split("\n").slice(0, 3);
    const linesJSX: JSX.Element[] = [];
    firstThreeLines.forEach((line) => {
        linesJSX.push(<p>{line}</p>);
    })

    const modal = <FeatureEngineeringModal node={props.node} linesChanged={linesChanged}/>;
    return (
        <BaseNodeWidget node={props.node} engine={props.engine} color={DATA_TRANSFORMATION_CONFIG.color} modalContent={modal}>
            {linesJSX}
        </BaseNodeWidget>
    );

}

export default FeatureEngineeringWidget;
