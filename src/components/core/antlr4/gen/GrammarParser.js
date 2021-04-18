// Generated from Grammar.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';
import GrammarListener from './GrammarListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003!B\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0003\u0002\u0007\u0002",
    "\u000e\n\u0002\f\u0002\u000e\u0002\u0011\u000b\u0002\u0003\u0003\u0003",
    "\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0005\u0005\'\n\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0007\u0005;\n\u0005\f\u0005\u000e\u0005",
    ">\u000b\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0002\u0003\b\u0007",
    "\u0002\u0004\u0006\b\n\u0002\u0007\u0003\u0002\u0013\u0015\u0003\u0002",
    "\u0011\u0012\u0003\u0002\u001b\u001e\u0003\u0002\u0019\u001a\u0004\u0002",
    "\u0012\u0012\u0018\u0018\u0002I\u0002\u000f\u0003\u0002\u0002\u0002",
    "\u0004\u0012\u0003\u0002\u0002\u0002\u0006\u0014\u0003\u0002\u0002\u0002",
    "\b&\u0003\u0002\u0002\u0002\n?\u0003\u0002\u0002\u0002\f\u000e\u0005",
    "\u0004\u0003\u0002\r\f\u0003\u0002\u0002\u0002\u000e\u0011\u0003\u0002",
    "\u0002\u0002\u000f\r\u0003\u0002\u0002\u0002\u000f\u0010\u0003\u0002",
    "\u0002\u0002\u0010\u0003\u0003\u0002\u0002\u0002\u0011\u000f\u0003\u0002",
    "\u0002\u0002\u0012\u0013\u0005\u0006\u0004\u0002\u0013\u0005\u0003\u0002",
    "\u0002\u0002\u0014\u0015\u0007\u001f\u0002\u0002\u0015\u0016\u0007\u0010",
    "\u0002\u0002\u0016\u0017\u0005\b\u0005\u0002\u0017\u0018\u0007\r\u0002",
    "\u0002\u0018\u0007\u0003\u0002\u0002\u0002\u0019\u001a\b\u0005\u0001",
    "\u0002\u001a\u001b\u0007\u0007\u0002\u0002\u001b\u001c\u0005\b\u0005",
    "\u0002\u001c\u001d\u0007\b\u0002\u0002\u001d\'\u0003\u0002\u0002\u0002",
    "\u001e\u001f\u0005\n\u0006\u0002\u001f \u0005\b\u0005\u000e \'\u0003",
    "\u0002\u0002\u0002!\'\u0007\u0003\u0002\u0002\"\'\u0007\u0004\u0002",
    "\u0002#\'\u0007\u0005\u0002\u0002$\'\u0007\u0006\u0002\u0002%\'\u0007",
    "\u001f\u0002\u0002&\u0019\u0003\u0002\u0002\u0002&\u001e\u0003\u0002",
    "\u0002\u0002&!\u0003\u0002\u0002\u0002&\"\u0003\u0002\u0002\u0002&#",
    "\u0003\u0002\u0002\u0002&$\u0003\u0002\u0002\u0002&%\u0003\u0002\u0002",
    "\u0002\'<\u0003\u0002\u0002\u0002()\f\r\u0002\u0002)*\t\u0002\u0002",
    "\u0002*;\u0005\b\u0005\u000e+,\f\f\u0002\u0002,-\t\u0003\u0002\u0002",
    "-;\u0005\b\u0005\r./\f\u000b\u0002\u0002/0\t\u0004\u0002\u00020;\u0005",
    "\b\u0005\f12\f\n\u0002\u000223\t\u0005\u0002\u00023;\u0005\b\u0005\u000b",
    "45\f\t\u0002\u000256\u0007\u0016\u0002\u00026;\u0005\b\u0005\n78\f\b",
    "\u0002\u000289\u0007\u0017\u0002\u00029;\u0005\b\u0005\t:(\u0003\u0002",
    "\u0002\u0002:+\u0003\u0002\u0002\u0002:.\u0003\u0002\u0002\u0002:1\u0003",
    "\u0002\u0002\u0002:4\u0003\u0002\u0002\u0002:7\u0003\u0002\u0002\u0002",
    ";>\u0003\u0002\u0002\u0002<:\u0003\u0002\u0002\u0002<=\u0003\u0002\u0002",
    "\u0002=\t\u0003\u0002\u0002\u0002><\u0003\u0002\u0002\u0002?@\t\u0006",
    "\u0002\u0002@\u000b\u0003\u0002\u0002\u0002\u0006\u000f&:<"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class GrammarParser extends antlr4.Parser {

    static grammarFileName = "Grammar.g4";
    static literalNames = [ null, null, null, null, null, "'('", "')'", 
                            "'['", "']'", "'{'", "'}'", "';'", "':'", "','", 
                            "'='", "'+'", "'-'", "'*'", "'/'", "'%'", "'and'", 
                            "'or'", "'not'", "'=='", "'!='", "'>='", "'>'", 
                            "'<='", "'<'" ];
    static symbolicNames = [ null, "BOOL", "INT", "FLOAT", "STRING", "L_RND_BR", 
                             "R_RND_BR", "L_SQR_BR", "R_SQR_BR", "L_CRL_BR", 
                             "R_CRL_BR", "SEMICOLON", "COLON", "COMMA", 
                             "ASSIGN", "PLUS", "MINUS", "TIMES", "DIV", 
                             "MOD", "AND", "OR", "NOT", "EQUAL", "NOT_EQUAL", 
                             "GREATER_EQ", "GREATER", "LESS_EQ", "LESS", 
                             "ID", "WS", "COMMENT" ];
    static ruleNames = [ "program", "statement", "create_col_stat", "expr", 
                         "unary_ope" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = GrammarParser.ruleNames;
        this.literalNames = GrammarParser.literalNames;
        this.symbolicNames = GrammarParser.symbolicNames;
    }

    get atn() {
        return atn;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 3:
    	    		return this.expr_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expr_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 11);
    		case 1:
    			return this.precpred(this._ctx, 10);
    		case 2:
    			return this.precpred(this._ctx, 9);
    		case 3:
    			return this.precpred(this._ctx, 8);
    		case 4:
    			return this.precpred(this._ctx, 7);
    		case 5:
    			return this.precpred(this._ctx, 6);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	program() {
	    let localctx = new ProgramContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, GrammarParser.RULE_program);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 13;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===GrammarParser.ID) {
	            this.state = 10;
	            this.statement();
	            this.state = 15;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	statement() {
	    let localctx = new StatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, GrammarParser.RULE_statement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 16;
	        this.create_col_stat();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	create_col_stat() {
	    let localctx = new Create_col_statContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, GrammarParser.RULE_create_col_stat);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 18;
	        this.match(GrammarParser.ID);
	        this.state = 19;
	        this.match(GrammarParser.ASSIGN);
	        this.state = 20;
	        this.expr(0);
	        this.state = 21;
	        this.match(GrammarParser.SEMICOLON);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	expr(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExprContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 6;
	    this.enterRecursionRule(localctx, 6, GrammarParser.RULE_expr, _p);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 36;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case GrammarParser.L_RND_BR:
	            this.state = 24;
	            this.match(GrammarParser.L_RND_BR);
	            this.state = 25;
	            this.expr(0);
	            this.state = 26;
	            this.match(GrammarParser.R_RND_BR);
	            break;
	        case GrammarParser.MINUS:
	        case GrammarParser.NOT:
	            this.state = 28;
	            this.unary_ope();
	            this.state = 29;
	            this.expr(12);
	            break;
	        case GrammarParser.BOOL:
	            this.state = 31;
	            this.match(GrammarParser.BOOL);
	            break;
	        case GrammarParser.INT:
	            this.state = 32;
	            this.match(GrammarParser.INT);
	            break;
	        case GrammarParser.FLOAT:
	            this.state = 33;
	            this.match(GrammarParser.FLOAT);
	            break;
	        case GrammarParser.STRING:
	            this.state = 34;
	            this.match(GrammarParser.STRING);
	            break;
	        case GrammarParser.ID:
	            this.state = 35;
	            this.match(GrammarParser.ID);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 58;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,3,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 56;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, GrammarParser.RULE_expr);
	                    this.state = 38;
	                    if (!( this.precpred(this._ctx, 11))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 11)");
	                    }
	                    this.state = 39;
	                    _la = this._input.LA(1);
	                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << GrammarParser.TIMES) | (1 << GrammarParser.DIV) | (1 << GrammarParser.MOD))) !== 0))) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 40;
	                    this.expr(12);
	                    break;

	                case 2:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, GrammarParser.RULE_expr);
	                    this.state = 41;
	                    if (!( this.precpred(this._ctx, 10))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
	                    }
	                    this.state = 42;
	                    _la = this._input.LA(1);
	                    if(!(_la===GrammarParser.PLUS || _la===GrammarParser.MINUS)) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 43;
	                    this.expr(11);
	                    break;

	                case 3:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, GrammarParser.RULE_expr);
	                    this.state = 44;
	                    if (!( this.precpred(this._ctx, 9))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
	                    }
	                    this.state = 45;
	                    _la = this._input.LA(1);
	                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << GrammarParser.GREATER_EQ) | (1 << GrammarParser.GREATER) | (1 << GrammarParser.LESS_EQ) | (1 << GrammarParser.LESS))) !== 0))) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 46;
	                    this.expr(10);
	                    break;

	                case 4:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, GrammarParser.RULE_expr);
	                    this.state = 47;
	                    if (!( this.precpred(this._ctx, 8))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
	                    }
	                    this.state = 48;
	                    _la = this._input.LA(1);
	                    if(!(_la===GrammarParser.EQUAL || _la===GrammarParser.NOT_EQUAL)) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 49;
	                    this.expr(9);
	                    break;

	                case 5:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, GrammarParser.RULE_expr);
	                    this.state = 50;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 51;
	                    this.match(GrammarParser.AND);
	                    this.state = 52;
	                    this.expr(8);
	                    break;

	                case 6:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, GrammarParser.RULE_expr);
	                    this.state = 53;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 54;
	                    this.match(GrammarParser.OR);
	                    this.state = 55;
	                    this.expr(7);
	                    break;

	                } 
	            }
	            this.state = 60;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,3,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	unary_ope() {
	    let localctx = new Unary_opeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, GrammarParser.RULE_unary_ope);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 61;
	        _la = this._input.LA(1);
	        if(!(_la===GrammarParser.MINUS || _la===GrammarParser.NOT)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

GrammarParser.EOF = antlr4.Token.EOF;
GrammarParser.BOOL = 1;
GrammarParser.INT = 2;
GrammarParser.FLOAT = 3;
GrammarParser.STRING = 4;
GrammarParser.L_RND_BR = 5;
GrammarParser.R_RND_BR = 6;
GrammarParser.L_SQR_BR = 7;
GrammarParser.R_SQR_BR = 8;
GrammarParser.L_CRL_BR = 9;
GrammarParser.R_CRL_BR = 10;
GrammarParser.SEMICOLON = 11;
GrammarParser.COLON = 12;
GrammarParser.COMMA = 13;
GrammarParser.ASSIGN = 14;
GrammarParser.PLUS = 15;
GrammarParser.MINUS = 16;
GrammarParser.TIMES = 17;
GrammarParser.DIV = 18;
GrammarParser.MOD = 19;
GrammarParser.AND = 20;
GrammarParser.OR = 21;
GrammarParser.NOT = 22;
GrammarParser.EQUAL = 23;
GrammarParser.NOT_EQUAL = 24;
GrammarParser.GREATER_EQ = 25;
GrammarParser.GREATER = 26;
GrammarParser.LESS_EQ = 27;
GrammarParser.LESS = 28;
GrammarParser.ID = 29;
GrammarParser.WS = 30;
GrammarParser.COMMENT = 31;

GrammarParser.RULE_program = 0;
GrammarParser.RULE_statement = 1;
GrammarParser.RULE_create_col_stat = 2;
GrammarParser.RULE_expr = 3;
GrammarParser.RULE_unary_ope = 4;

class ProgramContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GrammarParser.RULE_program;
    }

	statement = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StatementContext);
	    } else {
	        return this.getTypedRuleContext(StatementContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof GrammarListener ) {
	        listener.enterProgram(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GrammarListener ) {
	        listener.exitProgram(this);
		}
	}


}



class StatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GrammarParser.RULE_statement;
    }

	create_col_stat() {
	    return this.getTypedRuleContext(Create_col_statContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof GrammarListener ) {
	        listener.enterStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GrammarListener ) {
	        listener.exitStatement(this);
		}
	}


}



class Create_col_statContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GrammarParser.RULE_create_col_stat;
    }

	ID() {
	    return this.getToken(GrammarParser.ID, 0);
	};

	ASSIGN() {
	    return this.getToken(GrammarParser.ASSIGN, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	SEMICOLON() {
	    return this.getToken(GrammarParser.SEMICOLON, 0);
	};

	enterRule(listener) {
	    if(listener instanceof GrammarListener ) {
	        listener.enterCreate_col_stat(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GrammarListener ) {
	        listener.exitCreate_col_stat(this);
		}
	}


}



class ExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GrammarParser.RULE_expr;
    }

	L_RND_BR() {
	    return this.getToken(GrammarParser.L_RND_BR, 0);
	};

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	R_RND_BR() {
	    return this.getToken(GrammarParser.R_RND_BR, 0);
	};

	unary_ope() {
	    return this.getTypedRuleContext(Unary_opeContext,0);
	};

	BOOL() {
	    return this.getToken(GrammarParser.BOOL, 0);
	};

	INT() {
	    return this.getToken(GrammarParser.INT, 0);
	};

	FLOAT() {
	    return this.getToken(GrammarParser.FLOAT, 0);
	};

	STRING() {
	    return this.getToken(GrammarParser.STRING, 0);
	};

	ID() {
	    return this.getToken(GrammarParser.ID, 0);
	};

	TIMES() {
	    return this.getToken(GrammarParser.TIMES, 0);
	};

	DIV() {
	    return this.getToken(GrammarParser.DIV, 0);
	};

	MOD() {
	    return this.getToken(GrammarParser.MOD, 0);
	};

	PLUS() {
	    return this.getToken(GrammarParser.PLUS, 0);
	};

	MINUS() {
	    return this.getToken(GrammarParser.MINUS, 0);
	};

	GREATER_EQ() {
	    return this.getToken(GrammarParser.GREATER_EQ, 0);
	};

	GREATER() {
	    return this.getToken(GrammarParser.GREATER, 0);
	};

	LESS_EQ() {
	    return this.getToken(GrammarParser.LESS_EQ, 0);
	};

	LESS() {
	    return this.getToken(GrammarParser.LESS, 0);
	};

	EQUAL() {
	    return this.getToken(GrammarParser.EQUAL, 0);
	};

	NOT_EQUAL() {
	    return this.getToken(GrammarParser.NOT_EQUAL, 0);
	};

	AND() {
	    return this.getToken(GrammarParser.AND, 0);
	};

	OR() {
	    return this.getToken(GrammarParser.OR, 0);
	};

	enterRule(listener) {
	    if(listener instanceof GrammarListener ) {
	        listener.enterExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GrammarListener ) {
	        listener.exitExpr(this);
		}
	}


}



class Unary_opeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GrammarParser.RULE_unary_ope;
    }

	NOT() {
	    return this.getToken(GrammarParser.NOT, 0);
	};

	MINUS() {
	    return this.getToken(GrammarParser.MINUS, 0);
	};

	enterRule(listener) {
	    if(listener instanceof GrammarListener ) {
	        listener.enterUnary_ope(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GrammarListener ) {
	        listener.exitUnary_ope(this);
		}
	}


}




GrammarParser.ProgramContext = ProgramContext; 
GrammarParser.StatementContext = StatementContext; 
GrammarParser.Create_col_statContext = Create_col_statContext; 
GrammarParser.ExprContext = ExprContext; 
GrammarParser.Unary_opeContext = Unary_opeContext; 
