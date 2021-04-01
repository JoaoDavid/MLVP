export enum ColumnType {
    INT = 'int',
    FLOAT = 'float',
    STRING = 'string',
    MIXED = 'mixed',
    UNKNOWN = 'unknown',
}

export class Column {

    private name: string;
    private type: ColumnType;
    private nullCounter: number = 0;

    constructor(name?: string) {
        this.name = name;
        this.type = ColumnType.UNKNOWN;
    }

    updateType = (value: string) => {
        const newType = this.convertStringType(value);
        if (this.type === ColumnType.UNKNOWN) {
            this.type = newType;
        } else if (newType === ColumnType.FLOAT) {
            this.type = this.type === ColumnType.INT ? ColumnType.FLOAT : this.type === ColumnType.FLOAT ? ColumnType.FLOAT : ColumnType.MIXED;
        } else if (newType === ColumnType.INT) {
            this.type = this.type === ColumnType.INT ? ColumnType.INT : this.type === ColumnType.FLOAT ? ColumnType.FLOAT : ColumnType.MIXED;
        } else if (newType === ColumnType.STRING){
            this.type = this.type === ColumnType.STRING ? ColumnType.STRING : ColumnType.MIXED;
        } else {
            this.type = ColumnType.MIXED;
        }
    }

    convertStringType(value: any) {
        const type = typeof value;
        if (type === "number") {
            if (Number.isInteger(value)) {
                return ColumnType.INT;
            } else {
                return ColumnType.FLOAT;
            }
        }
        if (type === ColumnType.STRING) {
            return ColumnType.STRING;
        }
    }

    incNullCounter = () => {
        this.nullCounter++;
    }

    getName = () => {
        return this.name;
    }

    getType = () => {
        return this.type;
    }

    getNullCounter = () => {
        return this.nullCounter;
    }


}
