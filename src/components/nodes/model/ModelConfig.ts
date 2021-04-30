import {Category, NodeConfig, CategoryConfig} from "../Config";


// NODES
export const RANDOM_FOREST_CLASSIFIER: NodeConfig = {
    codeName: "RandomForestClassifier",
    name: "Random Forest Classifier",
}

export const RANDOM_FOREST_REGRESSOR: NodeConfig = {
    codeName: "RandomForestRegressor",
    name: "Random Forest Regressor",
}

/*
Every node type must be added to the nodes array
so it can appear on the side bar for the drag and drop feature
*/
export const CLASSIFIER_CONFIG: CategoryConfig = {
    category: Category.CLASSIFICATION,
    color: 'rgb(46,139,192)',
    nodes: [RANDOM_FOREST_CLASSIFIER],
}

export const REGRESSOR_CONFIG: CategoryConfig = {
    category: Category.REGRESSION,
    color: 'rgb(20,93,160)',
    nodes: [RANDOM_FOREST_REGRESSOR],
}
