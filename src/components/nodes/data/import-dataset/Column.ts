export enum ColumnType {
    INT = 'int',
    FLOAT = 'float',
    STRING = 'string',
    MIXED = 'mixed',
    UNKNOWN = 'unknown',
}

export class Column {

    private type: ColumnType;
    private nullCounter: number = 0;

    constructor() {
        this.type = ColumnType.UNKNOWN;
    }

    updateType = (type: string) => {
        const newType = this.convertStringType(type);
        if (this.type === ColumnType.UNKNOWN) {
            this.type = newType;
            return;
        }
        if (newType === ColumnType.FLOAT) {
            this.type = this.type === (ColumnType.INT || ColumnType.FLOAT) ? ColumnType.FLOAT : ColumnType.MIXED;
        } else if (newType === ColumnType.INT) {
            this.type = this.type === ColumnType.FLOAT ? ColumnType.FLOAT : this.type === ColumnType.INT ? ColumnType.INT : ColumnType.MIXED;
        } else if (newType === ColumnType.STRING){
            this.type = this.type === ColumnType.STRING ? ColumnType.STRING : ColumnType.MIXED;
        } else {
            this.type = ColumnType.MIXED;
        }
    }

    convertStringType(type: string) {
        if (type === ColumnType.INT) {
            return ColumnType.INT;
        } else if (type === ColumnType.FLOAT) {
            return ColumnType.FLOAT;
        } else if (type === ColumnType.STRING) {
            return ColumnType.STRING;
        }
    }

    incNullCounter = () => {
        this.nullCounter++;
    }


}
