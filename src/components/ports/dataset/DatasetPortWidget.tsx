import * as React from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
//import { DefaultPortModel } from '@projectstorm/react-diagrams-defaults';
import {DatasetPortModel} from "./DatasetPortModel";
import styled from '@emotion/styled';

export interface DatasetPortLabelProps {
    port: DatasetPortModel;
    engine: DiagramEngine;
}

namespace S {
    export const PortLabel = styled.div`
		display: flex;
		margin-top: 1px;
		align-items: center;
	`;

    export const Label = styled.div`
		padding: 0 5px;
		flex-grow: 1;
	`;

    export const Port = styled.div`
		width: 15px;
		height: 15px;
		background: rgba(255, 255, 255, 0.1);

		&:hover {
			background: rgb(192, 255, 0);
		}
	`;
}

export class DatasetPortLabel extends React.Component<DatasetPortLabelProps> {
    render() {
        const port = (
            <PortWidget engine={this.props.engine} port={this.props.port}>
                <S.Port />
            </PortWidget>
        );
        const label = <S.Label>{this.props.port.getOptions().label}</S.Label>;

        return (
            <S.PortLabel>
                {this.props.port.getOptions().in ? port : label}
                {this.props.port.getOptions().in ? label : port}
            </S.PortLabel>
        );
    }
}
