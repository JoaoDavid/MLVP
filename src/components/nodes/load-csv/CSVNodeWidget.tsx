import * as React from 'react';
import * as _ from 'lodash';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { CSVNodeModel } from './CSVNodeModel';
import { DefaultPortLabel } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

namespace S {
    export const Node = styled.div<{ selected: boolean }>`
		border-radius: 10px;
		font-family: sans-serif;
		color: white;
		border: solid 2px red;
		overflow: visible;
		font-size: 11px;
		border: solid 6px ${(p) => (p.selected ? 'rgb(72,64,13)' : 'black')};
	`;

    export const Title = styled.div`
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		white-space: nowrap;
		justify-items: center;
	`;

    export const TitleName = styled.div`
		flex-grow: 1;
		padding: 5px 5px;
	`;

    export const Ports = styled.div`
		display: flex;
		background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
	`;

    export const PortsContainer = styled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;

		&:first-of-type {
			margin-right: 10px;
		}

		&:only-child {
			margin-right: 0px;
		}
	`;
}

export interface CSVNodeProps {
    node: CSVNodeModel;
    engine: DiagramEngine;
}

/**
 * Default node that models the CSVNodeModel. It creates two columns
 * for both all the input ports on the left, and the output ports on the right.
 */
export class CSVNodeWidget extends React.Component<CSVNodeProps> {
    generatePort = (port: any) => {
        return <DefaultPortLabel engine={this.props.engine} port={port} key={port.getID()} />;
    };

    render() {
        console.log('helo');
        return (
            <S.Node
                data-default-node-name={this.props.node.getOptions().name}
                selected={this.props.node.isSelected()}>
                srhrsdhrh
                <S.Title>
                    <S.TitleName>{this.props.node.getOptions().name}</S.TitleName>
                </S.Title>
                <input value={this.props.node.getOptions().name}/>
                <S.Ports>
                    <S.PortsContainer>{_.map(this.props.node.getInPorts(), this.generatePort)}</S.PortsContainer>
                    <S.PortsContainer>{_.map(this.props.node.getOutPorts(), this.generatePort)}</S.PortsContainer>
                </S.Ports>
            </S.Node>
        );
    }
}
