import {BaseNodeModel} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {FEATURE_ENGINEERING} from "../DataConfig";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import antlr4 from 'antlr4';
import GrammarLexer from '../../../core/antlr4/gen/GrammarLexer';
import GrammarParser from '../../../core/antlr4/gen/GrammarParser';
import GrammarListener from '../../../core/antlr4/gen/GrammarListener';

// class for gathering errors and posting them to ACE editor
const AnnotatingErrorListener = function(annotations) {
    antlr4.error.ErrorListener.call(this);
    this.annotations = annotations;
    return this;
};

AnnotatingErrorListener.prototype = Object.create(antlr4.error.ErrorListener.prototype);
AnnotatingErrorListener.prototype.constructor = AnnotatingErrorListener;

AnnotatingErrorListener.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
    this.annotations.push({
        row: line - 1,
        column: column,
        text: msg,
        type: "error"
    });
};

export class FeatureEngineeringModel extends BaseNodeModel {

    private lines: string = "# new_col = col3 + 4;";
    private errorLines: boolean = true;

    constructor() {
        super(FEATURE_ENGINEERING);
        this.addInPort();
        this.addOutPort();
    }

    getErrorLines(): boolean {
        return this.errorLines;
    }

    getLines(): string {
        return this.lines;
    }

    setLines(value: string) {
/*        const annotations = [];
        try {
            const chars = new antlr4.InputStream(value);
            const lexer = new GrammarLexer(chars);
            const tokens = new antlr4.CommonTokenStream(lexer);
            const parser = new GrammarParser(tokens);
            // @ts-ignore
            parser.buildParseTrees = true;
            parser.program();

            this.errorLines = false;
        }catch (Exception) {
            console.log("error")
            this.errorLines = true;
        }*/
        this.lines = value;
        // console.log(annotations);
        console.log(this.lines);
    }

    protected addInPort(): void {
        const p = new DatasetPortModel(true);
        super.addPort(p);
    }

    protected addOutPort(): void {
        const p = new DatasetPortModel(false, "Engineered Dataset");
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.lines = event.data.lines;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            lines: this.lines,
        };
    }

}
