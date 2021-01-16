import * as React from 'react';
import { BaseLinkFactory } from './BaseLinkFactory';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { BaseLinkModel } from './BaseLinkModel';

export interface BaseLinkSegmentWidgetProps {
	path: string;
	link: BaseLinkModel;
	selected: boolean;
	forwardRef: React.RefObject<SVGPathElement>;
	factory: BaseLinkFactory;
	diagramEngine: DiagramEngine;
	onSelection: (selected: boolean) => any;
	extras: object;
}

export class BaseLinkSegmentWidget extends React.Component<BaseLinkSegmentWidgetProps> {
	render() {
		const Bottom = React.cloneElement(
			this.props.factory.generateLinkSegment(
				this.props.link,
				this.props.selected || this.props.link.isSelected(),
				this.props.path
			),
			{
				ref: this.props.forwardRef
			}
		);

		const Top = React.cloneElement(Bottom, {
			strokeLinecap: 'round',
			onMouseLeave: () => {
				this.props.onSelection(false);
			},
			onMouseEnter: () => {
				this.props.onSelection(true);
			},
			...this.props.extras,
			ref: null,
			'data-linkid': this.props.link.getID(),
			strokeOpacity: this.props.selected ? 0.1 : 0,
			strokeWidth: 20,
			fill: 'none',
			onContextMenu: (event: { preventDefault: () => void; }) => {
				if (!this.props.link.isLocked()) {
					event.preventDefault();
					this.props.link.remove();
				}
			}
		});

		return (
			<g>
				{Bottom}
				{Top}
			</g>
		);
	}
}
