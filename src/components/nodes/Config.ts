export enum Category {
    DATA = 'data',
    MODEL = 'model',
    EVALUATE = 'evaluate',
}

export type NodeConfig = {
    codeName: string,
    name: string,
}

export type CategoryConfig = {
    category: Category,
    color: string,
}
