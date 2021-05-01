export enum ColumnType {
    INT = 'int',
    FLOAT = 'float',
    STRING = 'string',
    MIXED = 'mixed',
    UNKNOWN = 'unknown',
}

export class Column {

    private readonly name: string;
    private type: ColumnType = ColumnType.UNKNOWN;
    private nullCounter: number = 0;

    constructor(name: string) {
        this.name = name;
    }

    static createColumn = (name: string, type: string, nullCounter: number): Column => {
        const col = new Column(name);
        col.setType(type);
        col.nullCounter = nullCounter;
        return col;
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

    private setType = (type: string) => {
        switch (type) {
            case 'int':
                this.type = ColumnType.INT
                break;
            case 'float':
                this.type = ColumnType.FLOAT
                break;
            case 'string':
                this.type = ColumnType.STRING
                break;
            case 'mixed':
                this.type = ColumnType.MIXED
                break;
            case 'unknown':
                this.type = ColumnType.UNKNOWN
                break;
            default:
                console.error("Column Type not found");
                this.type = ColumnType.UNKNOWN
                break;
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
