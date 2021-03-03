import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {BasePortWidget} from "../BasePort/BasePortWidget";
import {BasePortModel} from "../BasePort/BasePortModel";
import classes from './BaseNode.module.css';
import Title from './Title/Title';
import {BaseNodeModel} from './BaseNodeModel';
import PortContainer from "../BasePort/PortContainer/PortContainer";
import BaseModal from "../../UI/modal/BaseModal";


export interface CoreNodeProps {
    node: BaseNodeModel;
    engine: DiagramEngine;
    children?: React.ReactNode;
    modalChildren?: React.ReactNode;
    color: string;
}

/**
 * Base Node Widget, used to shape every node within the project
 */
export class BaseNodeWidget extends React.Component<CoreNodeProps> {

    state = {
        isSelected: false,
        show: false,
    }

    generatePort = (port: BasePortModel) => {
        return <BasePortWidget engine={this.props.engine} port={port} key={port.getID()}/>;
    };

    handleCloseModal = () => {
        this.setState({show: false});
    }

    handleShowModal = () => {
        this.setState({show: true});
    }

    render() {
        const nodeClasses = [classes.Node];
        if (this.props.node.isSelected()) {
            nodeClasses.push(classes.NodeSelected);
        }
        return (
            <div className={nodeClasses.join(' ')}
                 data-default-node-name={this.props.node.getTitle()}
                 style={{background: this.props.color}}
                 onDoubleClick={this.handleShowModal}
            >
                <Title name={this.props.node.getTitle()}/>
                <div className={classes.Content}>
                    <PortContainer generatePort={this.generatePort} ports={this.props.node.getInPorts()}/>
                    <div className={classes.ChildrenDiv}>
                        {this.props.children}
                    </div>
                    <PortContainer generatePort={this.generatePort} ports={this.props.node.getOutPorts()}/>
                </div>
                <BaseModal handleClose={this.handleCloseModal}
                           handleShow={this.handleShowModal}
                           show={this.state.show}
                           title={this.props.node.getTitle()}
                           footer={this.props.node.getOptions().name}
                >
                    {this.props.modalChildren}
                </BaseModal>
            </div>
        );
    }
}

export default BaseNodeWidget;
