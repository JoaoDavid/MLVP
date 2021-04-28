import {Category, NodeConfig, CategoryConfig} from "../Config";


// NODES
export const EVALUATE_CLASSIFIER: NodeConfig = {
    codeName: "EvaluateClassifier",
    name: "Evaluate Classifier",
}

export const CROSS_VALIDATION_CLASSIFIER: NodeConfig = {
    codeName: "CrossValidation",
    name: "Cross Validation Classifier",
}

export const EVALUATE_REGRESSOR: NodeConfig = {
    codeName: "EvaluateRegressor",
    name: "Evaluate Regressor",
}


/*
Every node type must be added to the nodes array
so it can appear on the side bar for the drag and drop feature
*/
export const EVALUATE_CLASSIFIER_CONFIG: CategoryConfig = {
    category: Category.EVALUATE_CLASSIFIER,
    color: 'rgb(116,45,83)',
    nodes: [EVALUATE_CLASSIFIER, CROSS_VALIDATION_CLASSIFIER],
}

export const EVALUATE_REGRESSOR_CONFIG: CategoryConfig = {
    category: Category.EVALUATE_REGRESSOR,
    color: 'rgb(96,65,113)',
    nodes: [EVALUATE_REGRESSOR],
}
