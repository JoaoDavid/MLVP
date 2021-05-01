import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";

export const TEMPORAL_AGGREGATION: NodeConfig = {
    codeName: "TemporalAggregation",
    name: "Temporal Aggregation",
}

export enum MetricEnum {
    MAX = 'max',
    MIN = 'min',
    MEAN = 'mean',
    MEDIAN = 'median',
    SUM = 'sum',
}

export class TemporalAggregationModel extends BaseNodeModel {

    private newColumnName: string = "new_column";
    private originalColumnName: string = "no_columns_found";
    private metric: MetricEnum = MetricEnum.MEAN;
    private windowSize: number = 1;

    constructor() {
        super(TEMPORAL_AGGREGATION);
        this.addInPort();
        this.addOutPort();
    }

    updateNode = () => {
        let colMap = this.getColumnsAndTypes();
        let listColNames = Object.keys(colMap);

        if (listColNames.length > 0) {
            if (!listColNames.includes(this.originalColumnName)) {
                this.originalColumnName =  listColNames[0];
            }
        }
    }

    getNewColumnName(): string {
        return this.newColumnName;
    }

    setNewColumnName(value: string) {
        this.newColumnName = value;
    }

    getOriginalColumnName(): string {
        return this.originalColumnName;
    }

    setOriginalColumnName(value: string) {
        this.originalColumnName = value;
    }

    getMetric(): MetricEnum {
        return this.metric;
    }

    setMetric(value: string) {
        if (value === MetricEnum.MAX) {
            this.metric = MetricEnum.MAX;
        } else if (value === MetricEnum.MIN) {
            this.metric = MetricEnum.MIN;
        }  else if (value === MetricEnum.MEAN) {
            this.metric = MetricEnum.MEAN;
        }  else if (value === MetricEnum.MEDIAN) {
            this.metric = MetricEnum.MEDIAN;
        }  else if (value === MetricEnum.SUM) {
            this.metric = MetricEnum.SUM;
        }
    }

    getWindowSize(): number {
        return this.windowSize;
    }

    setWindowSize(value: number) {
        this.windowSize = value;
    }

    protected addInPort(): void {
        const p = new DatasetPortModel(true);
        super.addPort(p);
    }

    protected addOutPort(): void {
        const p = new DatasetPortModel(false, "Engineered Dataset");
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.newColumnName = event.data.column_name;
        this.originalColumnName = event.data.originalColumnName;
        this.metric = event.data.metric;
        this.windowSize = event.data.windowSize;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            newColumnName: this.newColumnName,
            originalColumnName: this.originalColumnName,
            metric: this.metric,
            windowSize: this.windowSize,
        };
    }

}
