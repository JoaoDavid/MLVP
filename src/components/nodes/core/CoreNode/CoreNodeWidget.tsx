import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {BasePortLabel} from "../../../ports/base/BasePortWidget";
import {BasePortModel} from "../../../ports/base/BasePortModel";
import classes from './CoreNode.module.css';
import Title from '../Title/Title';
import Ports from '../Ports/Ports';
import {CoreNodeModel} from './CoreNodeModel';


export interface CoreNodeProps {
    node: CoreNodeModel;
    engine: DiagramEngine;
    children?: React.ReactNode;
    color: string;
}

/**
 * Default node that models the CSVNodeModel. It creates two columns
 * for both all the input ports on the left, and the output ports on the right.
 */
export class CoreNodeWidget extends React.Component<CoreNodeProps> {

    state = {
        isSelected: false
    }

    generatePort = (port: BasePortModel) => {
        return <BasePortLabel engine={this.props.engine} port={port} key={port.getID()}/>;
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

    render() {
        return (
            <div className={classes.Node}
                 data-default-node-name={this.props.node.getOptions().name}
                 style={{background: this.props.color}}
                 //onClick={this.selected}
            >
                <Title name={this.props.node.getOptions().name}/>
                {this.props.children}
                <Ports generatePort={this.generatePort}
                       inPorts={this.props.node.getInPorts()}
                       outPorts={this.props.node.getOutPorts()}
                />
            </div>
        );
    }
}

export default CoreNodeWidget;