import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import BasePortWidget from "../BasePort/BasePortWidget";
import {BasePortModel} from "../BasePort/BasePortModel";
import classes from './BaseNode.module.css';
import Title from './Title/Title';
import {BaseNodeModel} from './BaseNodeModel';
import PortContainer from "../BasePort/PortContainer/PortContainer";
import BaseModal from "../../UI/modal/BaseModal";
import {useState} from "react";


export interface BaseNodeProps {
    node: BaseNodeModel;
    engine: DiagramEngine;
    children?: React.ReactNode;
    modalChildren?: React.ReactNode;
    color: string;
}

export const eventNodeUpdated = (engine: DiagramEngine, node: BaseNodeModel) => {
    engine.getModel().fireEvent(
        {
            node: node
        },
        'nodeUpdated'
    );
}

export const dataSourceUpdated = (engine: DiagramEngine, node: BaseNodeModel) => {
    engine.getModel().fireEvent(
        {
            node: node
        },
        'dataSourceUpdated'
    );
}

/**
 * Base Node Widget, used to shape every node within the project
 */
const BaseNodeWidget = (props: BaseNodeProps) => {

    const [, setTitle] = useState(props.node.getTitle);
    const [modalOpen, setModal] = useState(false);


    const updateTitle = (title: string) => {
        props.node.setTitle(title);
        setTitle(title);
    }

    const generatePort = (port: BasePortModel) => {
        return <BasePortWidget engine={props.engine} port={port} key={port.getID()}/>;
    };

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    const nodeClasses = [classes.Node];
    if (props.node.isSelected()) {
        nodeClasses.push(classes.NodeSelected);
    }

    return (
        <div className={nodeClasses.join(' ')}
             data-default-node-name={props.node.getTitle()}
             style={{background: props.color}}
             onDoubleClick={openModal}
        >
            <Title name={props.node.getTitle()}/>
            <div className={classes.Content}>
                <PortContainer generatePort={generatePort} ports={props.node.getInPorts()}/>
                <div className={classes.ChildrenDiv}>
                    {props.children}
                </div>
                <PortContainer generatePort={generatePort} ports={props.node.getOutPorts()}/>
            </div>
            <BaseModal handleClose={closeModal}
                       handleShow={openModal}
                       show={modalOpen}
                       title={props.node.getTitle()}
                       footer={props.node.getOptions().name}
                        // footer={props.node.getOptions().id}
                       saveTitle={updateTitle}
            >
                {props.modalChildren}
            </BaseModal>
        </div>
    );

}

export default BaseNodeWidget;
