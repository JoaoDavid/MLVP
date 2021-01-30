import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {BasePortWidget} from "../BasePort/BasePortWidget";
import {BasePortModel} from "../BasePort/BasePortModel";
import classes from './CoreNode.module.css';
import Title from '../Title/Title';
import {CoreNodeModel} from './CoreNodeModel';
import PortContainer from "../BasePort/PortContainer/PortContainer";
import BaseModal from "../../UI/modal/BaseModal";


export interface CoreNodeProps {
    node: CoreNodeModel;
    engine: DiagramEngine;
    children?: React.ReactNode;
    modalChildren?: React.ReactNode;
    color: string;
}

/**
 * Default node that models the CSVModel. It creates two columns
 * for both all the input ports on the left, and the output ports on the right.
 */
export class CoreNodeWidget extends React.Component<CoreNodeProps> {

    state = {
        isSelected: false,
        show: false,
    }

    generatePort = (port: BasePortModel) => {
        return <BasePortWidget engine={this.props.engine} port={port} key={port.getID()}/>;
    };

/*    selected = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // Unset selected class from other options
        const selected = document.getElementsByClassName(classes.NodeSelected);
        console.log(selected);
        for (let i = 0; i < selected.length; i++) {
            selected[i].className = classes.Node;
        }
       /!*selected.forEach((el) => {
            el.classList.remove(classes.NodeSelected);
            console.log(el);
        });*!/
        //event.target.//classList.add('option-selected');
        this.setState(
            {
                isSelected : true
            }
        );
    }*/
    handleCloseModal = () => {
        this.setState({show: false});
    }

    handleShowModal = () => {
        this.setState({show: true});
    }

    render() {
        return (
            <div className={classes.Node}
                 data-default-node-name={this.props.node.getOptions().name}
                 style={{background: this.props.color}}
                 //onClick={this.selected}
                 onDoubleClick={this.handleShowModal}
            >
                <Title name={this.props.node.getOptions().name}/>
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
                           title={this.props.node.getOptions().name}
                >
                    {this.props.modalChildren}
                </BaseModal>
            </div>
        );
    }
}

export default CoreNodeWidget;
