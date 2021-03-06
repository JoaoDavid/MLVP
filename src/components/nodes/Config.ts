import {NodeConfig} from "../core/BaseNode/BaseNodeModel";
import {ABSTRACT_DS} from "./data-source/abstract/AbstractDsModel";
import {IMPORT_FROM_CSV} from "./data-source/csv/CSVModel";
import {SAMPLE_CSV} from "./data-source/sample/SampleModel";
import {PCA} from "./data-transformation/principal-component-analysis/PCAModel";
import {FEATURE_ENGINEERING} from "./data-transformation/feature-engineering/FeatureEngineeringModel";
import {TEMPORAL_AGGREGATION} from "./data-transformation/temporal-aggregation/TemporalAggregationModel";
import {OVERSAMPLING} from "./data-balancing/oversampling/OversamplingModel";
import {UNDERSAMPLING} from "./data-balancing/undersampling/UndersamplingModel";
import {SPLIT_DATASET} from "./data-balancing/split-dataset/SplitDatasetModel";
import {VISUALIZE_DATASET} from "./visualization/visualize-dataset/VisualizeDatasetModel";
import {EVALUATE_CLASSIFIER} from "./classifier-evaluation/accuracy/AccuracyClassifierModel";
import {CROSS_VALIDATION_CLASSIFIER} from "./classifier-evaluation/cross-validation/CrossValidationClassifierModel";
import {EVALUATE_REGRESSOR} from "./regressor-evaluation/evaluate-regressor/EvaluateRegressorModel";
import {RANDOM_FOREST_CLASSIFIER} from "./classification/random-forest-classifier/RandomForestClassifierModel";
import {RANDOM_FOREST_REGRESSOR} from "./regression/random-forest-regressor/RandomForestRegressorModel";
import {LABEL_ENCODING} from "./data-transformation/label-encoding/LabelEncodingModel";
import {LABEL_DECODING} from "./data-transformation/label-decoding/LabelDecodingModel";
import {ONE_HOT_ENCODING} from "./data-transformation/one-hot-encoding/OneHotEncodingModel";
import {ONE_HOT_DECODING} from "./data-transformation/one-hot-decoding/OneHotDecodingModel";
import {SVM_CLASSIFIER} from "./classification/svm-classifier/SVMClassifierModel";
import {K_NEAREST_NEIGHBORS_CLASSIFIER} from "./classification/k-nearest-neighbors-classifier/KNearestNeighborsClassifierModel";
import {DECISION_TREE_CLASSIFIER} from "./classification/decision-tree-classifier/DecisionTreeClassifierModel";
import {LINEAR_REGRESSION} from "./regression/linear-regression/LinearRegressionModel";
import {LOGISTIC_REGRESSION} from "./regression/logistic-regression/LogisticRegressionModel";
import {SVM_REGRESSOR} from "./regression/svm-regressor/SVMRegressorModel";
import {KERAS_CLASSIFIER} from "./classification/keras-classifier/KerasClassifierModel";
import {SEQUENTIAL} from "./neural-network/model/sequential/SequentialModel";
import {DENSE} from "./neural-network/layer/dense/DenseModel";
import {COMPILER} from "./neural-network/compiler/CompilerModel";
import {STOCHASTIC_GRADIENT_DESCENT} from "./neural-network/optimizer/stochastic-gradient-descent/StochasticGradientDescentModel";
import {SAMPLING} from "./data-balancing/sampling/SamplingModel";
import {HORIZONTAL_CONCATENATION} from "./data-transformation/horizontal-concatenation/HorizontalConcatenationModel";
import {VERTICAL_CONCATENATION} from "./data-transformation/vertical-concatenation/VerticalConcatenationModel";
import {KERAS_REGRESSOR} from "./regression/keras-regressor/KerasRegressorModel";

/*
Every node type must be added to the nodes array
so it can appear on the side bar for the drag and drop feature
*/
export type CategoryConfig = {
    category: string,
    color: string,
    nodes: NodeConfig[],
}

/*
Every node type must be added to the nodes array
so it can appear on the side bar for the drag and drop
*/
export const DATA_SOURCE_CONFIG: CategoryConfig = {
    category: "Data Source",
    color: 'rgb(56,109,38)',
    nodes: [ABSTRACT_DS, IMPORT_FROM_CSV, SAMPLE_CSV],
}

export const DATA_TRANSFORMATION_CONFIG: CategoryConfig = {
    category: 'Data Transformation',
    color: 'rgb(27,97,72)',
    nodes: [PCA, FEATURE_ENGINEERING, TEMPORAL_AGGREGATION,
        LABEL_ENCODING, LABEL_DECODING,
        ONE_HOT_ENCODING, ONE_HOT_DECODING,
        VERTICAL_CONCATENATION, HORIZONTAL_CONCATENATION
    ],
}

export const DATA_BALANCING_CONFIG: CategoryConfig = {
    category: 'Data Balancing',
    color: 'rgb(79,132,102)',
    nodes: [OVERSAMPLING, UNDERSAMPLING, SPLIT_DATASET, SAMPLING],
}

export const VISUALIZATION_CONFIG: CategoryConfig = {
    category: 'Visualization',
    color: 'rgb(59,72,107)',
    nodes: [VISUALIZE_DATASET],
}

export const CLASSIFIER_CONFIG: CategoryConfig = {
    category: 'Classification',
    color: 'rgb(46,139,192)',
    nodes: [DECISION_TREE_CLASSIFIER, RANDOM_FOREST_CLASSIFIER, SVM_CLASSIFIER, K_NEAREST_NEIGHBORS_CLASSIFIER, KERAS_CLASSIFIER],
}

export const REGRESSOR_CONFIG: CategoryConfig = {
    category: 'Regression',
    color: 'rgb(20,93,160)',
    nodes: [RANDOM_FOREST_REGRESSOR, LINEAR_REGRESSION, LOGISTIC_REGRESSION, SVM_REGRESSOR, KERAS_REGRESSOR],
}

export const EVALUATE_CLASSIFIER_CONFIG: CategoryConfig = {
    category: 'Classifier Evaluation',
    color: 'rgb(116,45,83)',
    nodes: [EVALUATE_CLASSIFIER, CROSS_VALIDATION_CLASSIFIER],
}

export const EVALUATE_REGRESSOR_CONFIG: CategoryConfig = {
    category: 'Regressor Evaluation',
    color: 'rgb(96,65,113)',
    nodes: [EVALUATE_REGRESSOR],
}

export const CATEGORIES = [DATA_SOURCE_CONFIG, DATA_TRANSFORMATION_CONFIG, DATA_BALANCING_CONFIG,
    VISUALIZATION_CONFIG, CLASSIFIER_CONFIG, REGRESSOR_CONFIG,
    EVALUATE_CLASSIFIER_CONFIG, EVALUATE_REGRESSOR_CONFIG];


export const MODEL_CONFIG: CategoryConfig = {
    category: 'Model',
    color: 'rgb(56,109,38)',
    nodes: [SEQUENTIAL],
}

export const LAYER_CONFIG: CategoryConfig = {
    category: 'Layer',
    color: 'rgb(59,72,107)',
    nodes: [DENSE],
}

export const COMPILER_CONFIG: CategoryConfig = {
    category: 'Compiler',
    color: 'rgb(116,45,83)',
    nodes: [COMPILER],
}

export const OPTIMIZER_CONFIG: CategoryConfig = {
    category: 'Optimizer',
    color: 'rgb(96,65,113)',
    nodes: [STOCHASTIC_GRADIENT_DESCENT],
}

// export const NEURAL_NETWORK_CATEGORIES = CATEGORIES;
export const NEURAL_NETWORK_CATEGORIES = [MODEL_CONFIG, LAYER_CONFIG, COMPILER_CONFIG, OPTIMIZER_CONFIG];

