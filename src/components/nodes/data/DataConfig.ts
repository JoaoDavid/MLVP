import { Category, NodeConfig, CategoryConfig } from "../Config";

// CategoryMaterialUI configuration
export const DATA_CONFIG:CategoryConfig = {
    category: Category.DATA,
    color: 'green',
}

// NODES
export const NODE_ABSTRACT_DS:NodeConfig = {
    codeName: "AbstractDataset",
    name: "Abstract Dataset",
    isRoot: true,
}

export const NODE_CSV:NodeConfig = {
    codeName: "ImportFromCSV",
    name: "Import from CSV",
    isRoot: true,
}

export const NODE_SPLIT_DATASET:NodeConfig = {
    codeName: "SplitDataset",
    name: "Split Dataset",
    isRoot: false,
}

export const NODE_OVERSAMPLING:NodeConfig = {
    codeName: "Oversampling",
    name: "Oversampling",
    isRoot: false,
}

export const NODE_UNDERSAMPLING:NodeConfig = {
    codeName: "UnderSampling",
    name: "Undersampling",
    isRoot: false,
}

export const NODE_PCA:NodeConfig = {
    codeName: "PCA",
    name: "PCA",
    isRoot: false,
}


/*
    Every node declared must be added to the following array
    to be passed into the side menu props for the drag and drop feature
*/
export const DATA_NODES:NodeConfig[] = [NODE_ABSTRACT_DS, NODE_CSV, NODE_SPLIT_DATASET, NODE_OVERSAMPLING, NODE_UNDERSAMPLING, NODE_PCA];
