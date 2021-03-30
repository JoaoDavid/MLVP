import { Category, NodeConfig, CategoryConfig } from "../Config";

// CategoryMaterialUI configuration
export const EVALUATE_CONFIG:CategoryConfig = {
    category: Category.EVALUATE,
    color: 'rgb(95,25,25)',
}

// NODES
export const NODE_EVALUATE_CLASSIFIER:NodeConfig = {
    codeName: "EvaluateClassifier",
    name: "Evaluate Classifier",
}

export const NODE_CROSS_VALIDATION_CLASSIFIER:NodeConfig = {
    codeName: "CrossValidation",
    name: "Cross Validation Classifier",
}


/*
    Every node declared must be added to the following array
    to be passed into the side menu props for the drag and drop feature
*/
export const EVALUATE_NODES:NodeConfig[] = [NODE_EVALUATE_CLASSIFIER, NODE_CROSS_VALIDATION_CLASSIFIER];
