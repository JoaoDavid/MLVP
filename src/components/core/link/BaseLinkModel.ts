import {
	LabelModel,
	LinkModel,
	LinkModelGenerics,
	LinkModelListener,
	PortModel,
	PortModelAlignment
} from '@projectstorm/react-diagrams-core';
import { DefaultLabelModel } from '@projectstorm/react-diagrams-defaults';
import { BezierCurve } from '@projectstorm/geometry';
import { BaseEntityEvent, BaseModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface BaseLinkModelListener extends LinkModelListener {
	// @ts-ignore
	colorChanged?(event: BaseEntityEvent<BaseLinkModel> & { color: null | string }): void;

	// @ts-ignore
	widthChanged?(event: BaseEntityEvent<BaseLinkModel> & { width: 0 | number }): void;
}

export interface BaseLinkModelOptions extends BaseModelOptions {
	width?: number;
	color?: string;
	selectedColor?: string;
	curvyness?: number;
	type?: string;
	testName?: string;
}

export interface BaseLinkModelGenerics extends LinkModelGenerics {
	LISTENER: BaseLinkModelListener;
	OPTIONS: BaseLinkModelOptions;
}

export class BaseLinkModel extends LinkModel<BaseLinkModelGenerics> {
	constructor(options: BaseLinkModelOptions = {}) {
		super({
			type: 'default',
			width: options.width || 3,
			color: options.color || 'gray',
			selectedColor: options.selectedColor || 'rgb(0,192,255)',
			curvyness: 50,
			...options
		});
	}

	calculateControlOffset(port: PortModel): [number, number] {
		if (port.getOptions().alignment === PortModelAlignment.RIGHT) {
			return [this.options.curvyness || 0, 0];
		} else if (port.getOptions().alignment === PortModelAlignment.LEFT) {
			return [-(this.options.curvyness || 0), 0];
		} else if (port.getOptions().alignment === PortModelAlignment.TOP) {
			return [0, -(this.options.curvyness || 0)];
		}
		return [0, this.options.curvyness || 0];
	}

	getSVGPath(): string {
		if (this.points.length == 2) {
			const curve = new BezierCurve();
			curve.setSource(this.getFirstPoint().getPosition());
			curve.setTarget(this.getLastPoint().getPosition());
			curve.setSourceControl(this.getFirstPoint().getPosition().clone());
			curve.setTargetControl(this.getLastPoint().getPosition().clone());

			if (this.sourcePort) {
				curve.getSourceControl().translate(...this.calculateControlOffset(this.getSourcePort()));
			}

			if (this.targetPort) {
				curve.getTargetControl().translate(...this.calculateControlOffset(this.getTargetPort()));
			}
			return curve.getSVGCurve();
		}
		return "";
	}

	serialize() {
		return {
			...super.serialize(),
			width: this.options.width,
			color: this.options.color,
			curvyness: this.options.curvyness,
			selectedColor: this.options.selectedColor
		};
	}

	deserialize(event: DeserializeEvent<this>) {
		super.deserialize(event);
		this.options.color = event.data.color;
		this.options.width = event.data.width;
		this.options.curvyness = event.data.curvyness;
		this.options.selectedColor = event.data.selectedColor;
	}

	addLabel(label: LabelModel | string) {
		if (label instanceof LabelModel) {
			return super.addLabel(label);
		}
		let labelOb = new DefaultLabelModel();
		labelOb.setLabel(label);
		return super.addLabel(labelOb);
	}

	setWidth(width: number) {
		this.options.width = width;
		this.fireEvent({ width }, 'widthChanged');
	}

	setColor(color: string) {
		this.options.color = color;
		this.fireEvent({ color }, 'colorChanged');
	}
}
