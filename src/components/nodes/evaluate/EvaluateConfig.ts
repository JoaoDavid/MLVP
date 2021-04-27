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


/*
Every node type must be added to the nodes array
so it can appear on the side bar for the drag and drop feature
*/
export const EVALUATE_CONFIG: CategoryConfig = {
    category: Category.EVALUATE,
    color: 'rgb(159,120,51)',
    nodes: [EVALUATE_CLASSIFIER, CROSS_VALIDATION_CLASSIFIER],
}
