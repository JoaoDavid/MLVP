import { Category, NodeConfig, CategoryConfig } from "../Config";

// CategoryMaterialUI configuration
export const DATA_CONFIG:CategoryConfig = {
    category: Category.DATA,
    color: 'green',
}

// NODES
export const NODE_CSV:NodeConfig = {
    codeName: "NODE_IMPORT_CSV",
    name: "Import from CSV",
    tier: 0,
}

export const NODE_SPLIT_DATASET:NodeConfig = {
    codeName: "NODE_SPLIT_DATASET",
    name: "Split Dataset",
    tier: 2,
}

export const NODE_OVERSAMPLING:NodeConfig = {
    codeName: "NODE_OVERSAMPLING",
    name: "Oversampling",
    tier: 1,
}

export const NODE_UNDERSAMPLING:NodeConfig = {
    codeName: "NODE_UNDERSAMPLING",
    name: "Undersampling",
    tier: 1,
}

export const NODE_PCA:NodeConfig = {
    codeName: "NODE_PCA",
    name: "PCA",
    tier: 1,
}


/*
    Every node declared must be added to the following array
    to be passed into the side menu props for the drag and drop feature
*/
export const DATA_NODES:NodeConfig[] = [NODE_CSV, NODE_SPLIT_DATASET, NODE_OVERSAMPLING, NODE_UNDERSAMPLING, NODE_PCA];
