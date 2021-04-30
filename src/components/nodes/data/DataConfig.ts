import {Category, NodeConfig, CategoryConfig} from "../Config";


// NODES
export const ABSTRACT_DS: NodeConfig = {
    codeName: "AbstractDataset",
    name: "Abstract Dataset",
}

export const IMPORT_FROM_CSV: NodeConfig = {
    codeName: "ImportFromCSV",
    name: "Import from CSV",
}

export const SAMPLE_CSV: NodeConfig = {
    codeName: "SampleCSV",
    name: "Sample CSV",
}

export const SPLIT_DATASET: NodeConfig = {
    codeName: "SplitDataset",
    name: "Split Dataset",
}

export const OVERSAMPLING: NodeConfig = {
    codeName: "Oversampling",
    name: "Oversampling",
}

export const UNDERSAMPLING: NodeConfig = {
    codeName: "UnderSampling",
    name: "Undersampling",
}

export const PCA: NodeConfig = {
    codeName: "PCA",
    name: "PCA",
}

export const FEATURE_ENGINEERING: NodeConfig = {
    codeName: "FeatureEngineering",
    name: "Feature Engineering",
}

export const VISUALIZE_DATASET: NodeConfig = {
    codeName: "VisualizeDataset",
    name: "Visualize Dataset",
}

export const TEMPORAL_AGGREGATION: NodeConfig = {
    codeName: "TemporalAggregation",
    name: "Temporal Aggregation",
}


/*
Every node type must be added to the nodes array
so it can appear on the side bar for the drag and drop feature
*/
export const DATA_SOURCE_CONFIG: CategoryConfig = {
    category: Category.DATA_SOURCE,
    color: 'rgb(56,109,38)',
    nodes: [ABSTRACT_DS, IMPORT_FROM_CSV, SAMPLE_CSV],
}

export const DATA_TRANSFORMATION_CONFIG: CategoryConfig = {
    category: Category.DATA_TRANSFORMATION,
    color: 'rgb(27,97,72)',
    nodes: [PCA, FEATURE_ENGINEERING, TEMPORAL_AGGREGATION],
}

export const DATA_BALANCING_CONFIG: CategoryConfig = {
    category: Category.DATA_BALANCING,
    color: 'rgb(79,132,102)',
    nodes: [OVERSAMPLING, UNDERSAMPLING, SPLIT_DATASET],
}

export const VISUALIZATION_CONFIG: CategoryConfig = {
    category: Category.VISUALIZATION,
    color: 'rgb(59,72,107)',
    nodes: [VISUALIZE_DATASET],
}
