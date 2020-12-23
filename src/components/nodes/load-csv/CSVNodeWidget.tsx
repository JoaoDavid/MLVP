import * as React from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {CSVNodeModel} from './CSVNodeModel';
import {DefaultPortLabel, DefaultPortModel} from '@projectstorm/react-diagrams';
import classes from './CSV.module.css';
import InputFile from '../common-components/InputFile/InputFile';
import Title from '../common-components/Title/Title';
import Ports from '../common-components/Ports/Ports';


export interface CSVNodeProps {
    node: CSVNodeModel;
    engine: DiagramEngine;
}

/**
 * Default node that models the CSVNodeModel. It creates two columns
 * for both all the input ports on the left, and the output ports on the right.
 */
export class CSVNodeWidget extends React.Component<CSVNodeProps> {

    state = {
        isSelected: false
    }

    generatePort = (port: DefaultPortModel) => {
        return <DefaultPortLabel engine={this.props.engine} port={port} key={port.getID()}/>;
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
                 //onClick={this.selected}
            >
                <Title name={this.props.node.getOptions().name}/>
                <InputFile acceptedTypes={['.csv']} changed={this.props.node.loadCSV}/>
                <Ports generatePort={this.generatePort}
                       inPorts={this.props.node.getInPorts()}
                       outPorts={this.props.node.getOutPorts()}
                />
            </div>
        );
    }
}
