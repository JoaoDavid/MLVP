export enum Category {
    DATA_SOURCE = 'Data Source',
    DATA_TRANSFORMATION = 'Data Transformation',
    DATA_BALANCING = 'Data Balancing',
    VISUALISE = 'Visualise',
    CLASSIFIER = 'Classifier',
    REGRESSOR = 'Regressor',
    EVALUATE = 'Evaluate',
}

export type NodeConfig = {
    codeName: string,
    name: string,
}

/*
Every node type must be added to the nodes array
so it can appear on the side bar for the drag and drop feature
*/
export type CategoryConfig = {
    category: Category,
    color: string,
    nodes: NodeConfig[],
}
