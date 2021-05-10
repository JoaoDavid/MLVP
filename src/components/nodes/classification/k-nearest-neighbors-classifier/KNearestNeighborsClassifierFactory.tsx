import * as React from 'react';
import {K_NEAREST_NEIGHBORS_CLASSIFIER, KNearestNeighborsClassifierModel} from './KNearestNeighborsClassifierModel';
import KNearestNeighborsClassifierWidget from './KNearestNeighborsClassifierWidget';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import {BaseNodeFactory} from "../../../core/BaseNode/BaseNodeFactory";


export class KNearestNeighborsClassifierFactory extends BaseNodeFactory<KNearestNeighborsClassifierModel, DiagramEngine> {

    private static INSTANCE: KNearestNeighborsClassifierFactory;

    private constructor() {
        super(K_NEAREST_NEIGHBORS_CLASSIFIER.codeName);
    }

    static getInstance = () => {
        return KNearestNeighborsClassifierFactory.INSTANCE || (KNearestNeighborsClassifierFactory.INSTANCE = new KNearestNeighborsClassifierFactory());
    }

    generateReactWidget(event: GenerateWidgetEvent<any>): JSX.Element {
        return <KNearestNeighborsClassifierWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: GenerateModelEvent): KNearestNeighborsClassifierModel {
        return new KNearestNeighborsClassifierModel();
    }
}
