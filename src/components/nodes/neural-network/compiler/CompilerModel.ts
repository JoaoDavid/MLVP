import {BaseNodeModel, NodeConfig} from "../../../core/BaseNode/BaseNodeModel";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {OptimizerPortModel} from "../../../ports/optimizer/OptimizerPortModel";
import {LayerPortModel} from "../../../ports/layer/LayerPortModel";

export const COMPILER: NodeConfig = {
    codeName: "Compiler",
    name: "Compiler",
}

export enum LossEnum {
    BINARY_CROSSENTROPY = 'binary_crossentropy',
    CATEGORICAL_CROSSENTROPY = 'categorical_crossentropy',
    CATEGORICAL_HINGE = 'categorical_hinge',
    COSINE_SIMILARITY = 'cosine_similarity',
    HINGE = 'hinge',
    HUBER_LOSS = 'huber_loss',
    KL_DIVERGENCE = 'kl_divergence',
    LOG_COSH = 'log_cosh',
    NONE = 'None',
    MEAN_ABSOLUTE_ERROR = 'mean_absolute_error',
    MEAN_ABSOLUTE_PERCENTAGE_ERROR = 'mean_absolute_percentage_error',
    MEAN_SQUARED_ERROR = 'mean_squared_error',
    MEAN_SQUARED_LOGARITHMIC_ERROR = 'mean_squared_logarithmic_error',
    POISSON = 'poisson',
    SPARSE_CATEGORICAL_CROSSENTROPY = 'sparse_categorical_crossentropy',
    SQUARED_HINGE = 'squared_hinge',
}

export enum MetricsEnum {
    ACCURACY = 'accuracy',
    BINARY_ACCURACY = 'binary_accuracy',
    CATEGORICAL_ACCURACY = 'CATEGORICAL_ACCURACY',
    TOP_K_CATEGORICAL_ACCURACY = 'top_k_categorical_accuracy',
    SPARSE_TOP_K_CATEGORICAL_ACCURACY = 'sparse_top_k_categorical_accuracy',
    BINARY_CROSSENTROPY = 'binary_crossentropy',
    CATEGORICAL_CROSSENTROPY = 'categorical_crossentropy',
    SPARSE_CATEGORICAL_CROSSENTROPY = 'sparse_categorical_crossentropy',
    KULLBACK_LEIBLER_DIVERGENCE = 'kullback_leibler_divergence',
    POISSON = 'poisson',
    MEAN_SQUARED_ERROR = 'mean_squared_error',
    ROOT_MEAN_SQUARED_ERROR = 'root_mean_squared_error',
    MEAN_ABSOLUTE_ERROR = 'mean_absolute_error',
    MEAN_ABSOLUTE_PERCENTAGE_ERROR = 'mean_absolute_percentage_error',
    MEAN_SQUARED_LOGARITHMIC_ERROR = 'mean_squared_logarithmic_error',
    COSINE_SIMILARITY = 'cosine_similarity',
    LOGCOSH = 'logcosh',
}

export class CompilerModel extends BaseNodeModel {

    private loss: LossEnum = LossEnum.CATEGORICAL_CROSSENTROPY;
    private metric: MetricsEnum = MetricsEnum.ACCURACY;

    constructor() {
        super(COMPILER);
        this.addInLayerPort();
        this.addInOptimizerPort();
    }

    getLoss(): LossEnum {
        return this.loss;
    }

    setLoss(value: string) {
        if (value === LossEnum.BINARY_CROSSENTROPY) {
            this.loss = LossEnum.BINARY_CROSSENTROPY;
        } else if (value === LossEnum.CATEGORICAL_CROSSENTROPY) {
            this.loss = LossEnum.CATEGORICAL_CROSSENTROPY;
        }  else if (value === LossEnum.CATEGORICAL_HINGE) {
            this.loss = LossEnum.CATEGORICAL_HINGE;
        }  else if (value === LossEnum.COSINE_SIMILARITY) {
            this.loss = LossEnum.COSINE_SIMILARITY;
        }  else if (value === LossEnum.HINGE) {
            this.loss = LossEnum.HINGE;
        }  else if (value === LossEnum.HUBER_LOSS) {
            this.loss = LossEnum.HUBER_LOSS;
        }  else if (value === LossEnum.KL_DIVERGENCE) {
            this.loss = LossEnum.KL_DIVERGENCE;
        }  else if (value === LossEnum.LOG_COSH) {
            this.loss = LossEnum.LOG_COSH;
        }  else if (value === LossEnum.NONE) {
            this.loss = LossEnum.NONE;
        }  else if (value === LossEnum.MEAN_ABSOLUTE_ERROR) {
            this.loss = LossEnum.MEAN_ABSOLUTE_ERROR;
        }  else if (value === LossEnum.MEAN_ABSOLUTE_PERCENTAGE_ERROR) {
            this.loss = LossEnum.MEAN_ABSOLUTE_PERCENTAGE_ERROR;
        }  else if (value === LossEnum.MEAN_SQUARED_ERROR) {
            this.loss = LossEnum.MEAN_SQUARED_ERROR;
        }  else if (value === LossEnum.MEAN_SQUARED_LOGARITHMIC_ERROR) {
            this.loss = LossEnum.MEAN_SQUARED_LOGARITHMIC_ERROR;
        }  else if (value === LossEnum.POISSON) {
            this.loss = LossEnum.POISSON;
        }  else if (value === LossEnum.SPARSE_CATEGORICAL_CROSSENTROPY) {
            this.loss = LossEnum.SPARSE_CATEGORICAL_CROSSENTROPY;
        }  else if (value === LossEnum.SQUARED_HINGE) {
            this.loss = LossEnum.SQUARED_HINGE;
        }
    }

    getMetric(): MetricsEnum {
        return this.metric;
    }

    setMetric(value: string) {
        if (value === MetricsEnum.ACCURACY) {
            this.metric = MetricsEnum.ACCURACY;
        } else if (value === MetricsEnum.BINARY_ACCURACY) {
            this.metric = MetricsEnum.BINARY_ACCURACY;
        }  else if (value === MetricsEnum.CATEGORICAL_ACCURACY) {
            this.metric = MetricsEnum.CATEGORICAL_ACCURACY;
        }  else if (value === MetricsEnum.TOP_K_CATEGORICAL_ACCURACY) {
            this.metric = MetricsEnum.TOP_K_CATEGORICAL_ACCURACY;
        }  else if (value === MetricsEnum.SPARSE_TOP_K_CATEGORICAL_ACCURACY) {
            this.metric = MetricsEnum.SPARSE_TOP_K_CATEGORICAL_ACCURACY;
        }  else if (value === MetricsEnum.BINARY_CROSSENTROPY) {
            this.metric = MetricsEnum.BINARY_CROSSENTROPY;
        }  else if (value === MetricsEnum.CATEGORICAL_CROSSENTROPY) {
            this.metric = MetricsEnum.CATEGORICAL_CROSSENTROPY;
        }  else if (value === MetricsEnum.SPARSE_CATEGORICAL_CROSSENTROPY) {
            this.metric = MetricsEnum.SPARSE_CATEGORICAL_CROSSENTROPY;
        }  else if (value === MetricsEnum.KULLBACK_LEIBLER_DIVERGENCE) {
            this.metric = MetricsEnum.KULLBACK_LEIBLER_DIVERGENCE;
        }  else if (value === MetricsEnum.POISSON) {
            this.metric = MetricsEnum.POISSON;
        }  else if (value === MetricsEnum.MEAN_SQUARED_ERROR) {
            this.metric = MetricsEnum.MEAN_SQUARED_ERROR;
        }  else if (value === MetricsEnum.ROOT_MEAN_SQUARED_ERROR) {
            this.metric = MetricsEnum.ROOT_MEAN_SQUARED_ERROR;
        }  else if (value === MetricsEnum.MEAN_ABSOLUTE_ERROR) {
            this.metric = MetricsEnum.MEAN_ABSOLUTE_ERROR;
        }  else if (value === MetricsEnum.MEAN_ABSOLUTE_PERCENTAGE_ERROR) {
            this.metric = MetricsEnum.MEAN_ABSOLUTE_PERCENTAGE_ERROR;
        }  else if (value === MetricsEnum.MEAN_SQUARED_LOGARITHMIC_ERROR) {
            this.metric = MetricsEnum.MEAN_SQUARED_LOGARITHMIC_ERROR;
        }  else if (value === MetricsEnum.COSINE_SIMILARITY) {
            this.metric = MetricsEnum.COSINE_SIMILARITY;
        }  else if (value === MetricsEnum.LOGCOSH) {
            this.metric = MetricsEnum.LOGCOSH;
        }
    }

    protected addInLayerPort(): void {
        const p = new LayerPortModel(true);
        super.addPort(p);
    }

    protected addInOptimizerPort(): void {
        const p = new OptimizerPortModel(true);
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.loss = event.data.loss;
        this.metric = event.data.metric;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            loss: this.loss,
            metric: this.metric,
        };
    }

}
