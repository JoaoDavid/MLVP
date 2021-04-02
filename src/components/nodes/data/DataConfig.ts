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


/*
Every node type must be added to the nodes array
so it can appear on the side bar for the drag and drop feature
*/
export const DATA_CONFIG: CategoryConfig = {
    category: Category.DATA,
    color: 'green',
    nodes: [ABSTRACT_DS, IMPORT_FROM_CSV, SAMPLE_CSV, SPLIT_DATASET, OVERSAMPLING, UNDERSAMPLING, PCA, FEATURE_ENGINEERING],
}
