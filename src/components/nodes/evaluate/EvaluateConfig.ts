import { Category, NodeConfig, CategoryConfig } from "../Config";

// CategoryMaterialUI configuration
export const EVALUATE_CONFIG:CategoryConfig = {
    category: Category.EVALUATE,
    color: 'rgb(95,25,25)',
}

// NODES
export const NODE_ACCURACY:NodeConfig = {
    codeName: "NODE_ACCURACY",
    name: "Evaluate Accuracy",
}


/*
    Every node declared must be added to the following array
    to be passed into the side menu props for the drag and drop feature
*/
export const EVALUATE_NODES:NodeConfig[] = [NODE_ACCURACY];
