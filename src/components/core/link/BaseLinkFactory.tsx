import * as React from 'react';
import { BaseLinkModel } from './BaseLinkModel';
import { BaseLinkWidget } from './BaseLinkWidget';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import {AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {Category} from "../../nodes/Config";
import {NODE_CSV} from "../../nodes/data/DataConfig";


	export const Keyframes = keyframes`
		from {
			stroke-dashoffset: 24;
		}
		to {
			stroke-dashoffset: 0;
		}
	`;

	const selected = css`
		stroke-dasharray: 10, 2;
		animation: ${Keyframes} 1s linear infinite;
	`;

	export const Path = styled.path<{ selected: boolean }>`
		${(p) => p.selected && selected};
		fill: none;
		pointer-events: all;
	`;


export class BaseLinkFactory<Link extends BaseLinkModel> extends AbstractReactFactory<Link,DiagramEngine> {

	private static INSTANCE: BaseLinkFactory<any>;

	constructor(type = 'base') {
		super(type);
	}

	static getInstance = () => {
		return BaseLinkFactory.INSTANCE || (BaseLinkFactory.INSTANCE = new BaseLinkFactory());
	}



	generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
		return <BaseLinkWidget link={event.model} diagramEngine={this.engine} />;
	}

	generateModel(event: GenerateModelEvent): Link {
		return new BaseLinkModel() as Link;
	}

	generateLinkSegment(model: Link, selected: boolean, path: string) {
		return (
			<Path
				selected={selected}
				stroke={selected ? model.getOptions().selectedColor : model.getOptions().color}
				strokeWidth={model.getOptions().width}
				d={path}
			/>
		);
	}
}
