import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import BasePortWidget from "../BasePort/BasePortWidget";
import {BasePortModel} from "../BasePort/BasePortModel";
import classes from './BaseNode.module.css';
import Title from './Title/Title';
import {BaseNodeModel} from './BaseNodeModel';
import PortContainer from "../BasePort/PortContainer/PortContainer";
import BaseNodeModal from "./BaseNodeModal";
import {useState} from "react";


export interface BaseNodeProps {
    node: BaseNodeModel;
    engine: DiagramEngine;
    children?: React.ReactNode; //widget displayed information
    modalContent?: React.ReactNode;
    color: string;
    onDoubleClick?: () => void;
    modalSize?: 'sm' | 'lg' | 'xl';
}

export const eventNodeUpdated = (engine: DiagramEngine, node: BaseNodeModel) => {
    engine.getModel().fireEvent(
        {
            node: node
        },
        'nodeUpdated'
    );
}

/**
 * Base Node Widget, used to shape every node within the project
 */
const BaseNodeWidget = (props: BaseNodeProps) => {

    const [, setTitle] = useState(props.node.getTitle);

    const sendOpenCanvasEvent = () => {
        props.engine.getModel().fireEvent(
            {
                modal: modal,
                size: props.modalSize?props.modalSize:"lg"
            },
            'modalContent'
        );
    }

    const updateTitle = (title: string) => {
        props.node.setTitle(title);
        setTitle(title);
    }

    const generatePort = (port: BasePortModel) => {
        return <BasePortWidget engine={props.engine} port={port} key={port.getID()}/>;
    };

    const nodeClasses = [classes.Node];
    if (props.node.isSelected()) {
        nodeClasses.push(classes.NodeSelected);
    }

    const modal = (
        <BaseNodeModal title={props.node.getTitle()}
                       footer={props.node.getOptions().name}
                       saveTitle={updateTitle}
        >
            {props.modalContent}
        </BaseNodeModal>);

    return (
        <div className={nodeClasses.join(' ')}
             data-default-node-name={props.node.getTitle()}
             style={{background: props.color}}
             onDoubleClick={sendOpenCanvasEvent || props.onDoubleClick}
        >
            <Title name={props.node.getTitle()}/>
            <div className={classes.Content}>
                <PortContainer generatePort={generatePort} ports={props.node.getInPorts()}/>
                <div className={classes.ChildrenDiv}>
                    {props.children}
                </div>
                <PortContainer generatePort={generatePort} ports={props.node.getOutPorts()}/>
            </div>
            {props.onDoubleClick?modal:null}
        </div>
    );

}

export default BaseNodeWidget;
