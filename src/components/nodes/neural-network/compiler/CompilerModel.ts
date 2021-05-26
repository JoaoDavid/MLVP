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

export class CompilerModel extends BaseNodeModel {

    private loss: LossEnum = LossEnum.CATEGORICAL_CROSSENTROPY;

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
    }

    serialize(): any {
        return {
            ...super.serialize(),
        };
    }

}
