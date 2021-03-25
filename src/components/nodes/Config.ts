export enum Category {
    DATA = 'Data',
    MODEL = 'Model',
    EVALUATE = 'Evaluate',
}

export type NodeConfig = {
    codeName: string,
    name: string,
    isRoot: boolean,
}

export type CategoryConfig = {
    category: Category,
    color: string,
}
