import { Category, NodeConfig, CategoryConfig } from "../Config";

// CategoryMaterialUI configuration
export const MODEL_CONFIG:CategoryConfig = {
    category: Category.MODEL,
    color: 'rgb(0,192,255)',
}

// NODES
export const NODE_RANDOM_FOREST:NodeConfig = {
    codeName: "NODE_RANDOM_FOREST",
    name: "Random Forest",
    tier: 2,
}


/*
    Every node declared must be added to the following array
    to be passed into the side menu props for the drag and drop feature
*/
export const MODEL_NODES:NodeConfig[] = [NODE_RANDOM_FOREST];
