export enum Category {
    DATA = 'Data',
    MODEL = 'Model',
    EVALUATE = 'Evaluate',
}

export type NodeConfig = {
    codeName: string,
    name: string,
    tier: number,
}

export type CategoryConfig = {
    category: Category,
    color: string,
}

export const NUM_TIERS = 4;
