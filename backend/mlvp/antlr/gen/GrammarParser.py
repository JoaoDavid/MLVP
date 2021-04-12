# Generated from Grammar.g4 by ANTLR 4.9.2
# encoding: utf-8
from antlr4 import *
from io import StringIO
import sys
if sys.version_info[1] > 5:
	from typing import TextIO
else:
	from typing.io import TextIO


def serializedATN():
    with StringIO() as buf:
        buf.write("\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3!")
        buf.write("A\4\2\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\3\2\6\2\16\n")
        buf.write("\2\r\2\16\2\17\3\3\3\3\3\4\3\4\3\4\3\4\3\4\3\5\3\5\3\5")
        buf.write("\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\5\5&\n\5\3\5")
        buf.write("\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3")
        buf.write("\5\3\5\3\5\3\5\7\5:\n\5\f\5\16\5=\13\5\3\6\3\6\3\6\2\3")
        buf.write("\b\7\2\4\6\b\n\2\7\3\2\23\25\3\2\21\22\3\2\33\36\3\2\31")
        buf.write("\32\4\2\22\22\30\30\2H\2\r\3\2\2\2\4\21\3\2\2\2\6\23\3")
        buf.write("\2\2\2\b%\3\2\2\2\n>\3\2\2\2\f\16\5\4\3\2\r\f\3\2\2\2")
        buf.write("\16\17\3\2\2\2\17\r\3\2\2\2\17\20\3\2\2\2\20\3\3\2\2\2")
        buf.write("\21\22\5\6\4\2\22\5\3\2\2\2\23\24\7\37\2\2\24\25\7\20")
        buf.write("\2\2\25\26\5\b\5\2\26\27\7\r\2\2\27\7\3\2\2\2\30\31\b")
        buf.write("\5\1\2\31\32\7\7\2\2\32\33\5\b\5\2\33\34\7\b\2\2\34&\3")
        buf.write("\2\2\2\35\36\5\n\6\2\36\37\5\b\5\16\37&\3\2\2\2 &\7\3")
        buf.write("\2\2!&\7\4\2\2\"&\7\5\2\2#&\7\6\2\2$&\7\37\2\2%\30\3\2")
        buf.write("\2\2%\35\3\2\2\2% \3\2\2\2%!\3\2\2\2%\"\3\2\2\2%#\3\2")
        buf.write("\2\2%$\3\2\2\2&;\3\2\2\2\'(\f\r\2\2()\t\2\2\2):\5\b\5")
        buf.write("\16*+\f\f\2\2+,\t\3\2\2,:\5\b\5\r-.\f\13\2\2./\t\4\2\2")
        buf.write("/:\5\b\5\f\60\61\f\n\2\2\61\62\t\5\2\2\62:\5\b\5\13\63")
        buf.write("\64\f\t\2\2\64\65\7\26\2\2\65:\5\b\5\n\66\67\f\b\2\2\67")
        buf.write("8\7\27\2\28:\5\b\5\t9\'\3\2\2\29*\3\2\2\29-\3\2\2\29\60")
        buf.write("\3\2\2\29\63\3\2\2\29\66\3\2\2\2:=\3\2\2\2;9\3\2\2\2;")
        buf.write("<\3\2\2\2<\t\3\2\2\2=;\3\2\2\2>?\t\6\2\2?\13\3\2\2\2\6")
        buf.write("\17%9;")
        return buf.getvalue()


class GrammarParser ( Parser ):

    grammarFileName = "Grammar.g4"

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    sharedContextCache = PredictionContextCache()

    literalNames = [ "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                     "<INVALID>", "'('", "')'", "'['", "']'", "'{'", "'}'", 
                     "';'", "':'", "','", "'='", "'+'", "'-'", "'*'", "'/'", 
                     "'%'", "'and'", "'or'", "'not'", "'=='", "'!='", "'>='", 
                     "'>'", "'<='", "'<'" ]

    symbolicNames = [ "<INVALID>", "BOOL", "INT", "FLOAT", "STRING", "L_RND_BR", 
                      "R_RND_BR", "L_SQR_BR", "R_SQR_BR", "L_CRL_BR", "R_CRL_BR", 
                      "SEMICOLON", "COLON", "COMMA", "ASSIGN", "PLUS", "MINUS", 
                      "TIMES", "DIV", "MOD", "AND", "OR", "NOT", "EQUAL", 
                      "NOT_EQUAL", "GREATER_EQ", "GREATER", "LESS_EQ", "LESS", 
                      "ID", "WS", "COMMENT" ]

    RULE_program = 0
    RULE_statement = 1
    RULE_create_col_stat = 2
    RULE_expr = 3
    RULE_unary_ope = 4

    ruleNames =  [ "program", "statement", "create_col_stat", "expr", "unary_ope" ]

    EOF = Token.EOF
    BOOL=1
    INT=2
    FLOAT=3
    STRING=4
    L_RND_BR=5
    R_RND_BR=6
    L_SQR_BR=7
    R_SQR_BR=8
    L_CRL_BR=9
    R_CRL_BR=10
    SEMICOLON=11
    COLON=12
    COMMA=13
    ASSIGN=14
    PLUS=15
    MINUS=16
    TIMES=17
    DIV=18
    MOD=19
    AND=20
    OR=21
    NOT=22
    EQUAL=23
    NOT_EQUAL=24
    GREATER_EQ=25
    GREATER=26
    LESS_EQ=27
    LESS=28
    ID=29
    WS=30
    COMMENT=31

    def __init__(self, input:TokenStream, output:TextIO = sys.stdout):
        super().__init__(input, output)
        self.checkVersion("4.9.2")
        self._interp = ParserATNSimulator(self, self.atn, self.decisionsToDFA, self.sharedContextCache)
        self._predicates = None




    class ProgramContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def statement(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(GrammarParser.StatementContext)
            else:
                return self.getTypedRuleContext(GrammarParser.StatementContext,i)


        def getRuleIndex(self):
            return GrammarParser.RULE_program

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterProgram" ):
                listener.enterProgram(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitProgram" ):
                listener.exitProgram(self)




    def program(self):

        localctx = GrammarParser.ProgramContext(self, self._ctx, self.state)
        self.enterRule(localctx, 0, self.RULE_program)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 11 
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while True:
                self.state = 10
                self.statement()
                self.state = 13 
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                if not (_la==GrammarParser.ID):
                    break

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class StatementContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def create_col_stat(self):
            return self.getTypedRuleContext(GrammarParser.Create_col_statContext,0)


        def getRuleIndex(self):
            return GrammarParser.RULE_statement

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterStatement" ):
                listener.enterStatement(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitStatement" ):
                listener.exitStatement(self)




    def statement(self):

        localctx = GrammarParser.StatementContext(self, self._ctx, self.state)
        self.enterRule(localctx, 2, self.RULE_statement)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 15
            self.create_col_stat()
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class Create_col_statContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def ID(self):
            return self.getToken(GrammarParser.ID, 0)

        def ASSIGN(self):
            return self.getToken(GrammarParser.ASSIGN, 0)

        def expr(self):
            return self.getTypedRuleContext(GrammarParser.ExprContext,0)


        def SEMICOLON(self):
            return self.getToken(GrammarParser.SEMICOLON, 0)

        def getRuleIndex(self):
            return GrammarParser.RULE_create_col_stat

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterCreate_col_stat" ):
                listener.enterCreate_col_stat(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitCreate_col_stat" ):
                listener.exitCreate_col_stat(self)




    def create_col_stat(self):

        localctx = GrammarParser.Create_col_statContext(self, self._ctx, self.state)
        self.enterRule(localctx, 4, self.RULE_create_col_stat)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 17
            self.match(GrammarParser.ID)
            self.state = 18
            self.match(GrammarParser.ASSIGN)
            self.state = 19
            self.expr(0)
            self.state = 20
            self.match(GrammarParser.SEMICOLON)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class ExprContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def L_RND_BR(self):
            return self.getToken(GrammarParser.L_RND_BR, 0)

        def expr(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(GrammarParser.ExprContext)
            else:
                return self.getTypedRuleContext(GrammarParser.ExprContext,i)


        def R_RND_BR(self):
            return self.getToken(GrammarParser.R_RND_BR, 0)

        def unary_ope(self):
            return self.getTypedRuleContext(GrammarParser.Unary_opeContext,0)


        def BOOL(self):
            return self.getToken(GrammarParser.BOOL, 0)

        def INT(self):
            return self.getToken(GrammarParser.INT, 0)

        def FLOAT(self):
            return self.getToken(GrammarParser.FLOAT, 0)

        def STRING(self):
            return self.getToken(GrammarParser.STRING, 0)

        def ID(self):
            return self.getToken(GrammarParser.ID, 0)

        def TIMES(self):
            return self.getToken(GrammarParser.TIMES, 0)

        def DIV(self):
            return self.getToken(GrammarParser.DIV, 0)

        def MOD(self):
            return self.getToken(GrammarParser.MOD, 0)

        def PLUS(self):
            return self.getToken(GrammarParser.PLUS, 0)

        def MINUS(self):
            return self.getToken(GrammarParser.MINUS, 0)

        def GREATER_EQ(self):
            return self.getToken(GrammarParser.GREATER_EQ, 0)

        def GREATER(self):
            return self.getToken(GrammarParser.GREATER, 0)

        def LESS_EQ(self):
            return self.getToken(GrammarParser.LESS_EQ, 0)

        def LESS(self):
            return self.getToken(GrammarParser.LESS, 0)

        def EQUAL(self):
            return self.getToken(GrammarParser.EQUAL, 0)

        def NOT_EQUAL(self):
            return self.getToken(GrammarParser.NOT_EQUAL, 0)

        def AND(self):
            return self.getToken(GrammarParser.AND, 0)

        def OR(self):
            return self.getToken(GrammarParser.OR, 0)

        def getRuleIndex(self):
            return GrammarParser.RULE_expr

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterExpr" ):
                listener.enterExpr(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitExpr" ):
                listener.exitExpr(self)



    def expr(self, _p:int=0):
        _parentctx = self._ctx
        _parentState = self.state
        localctx = GrammarParser.ExprContext(self, self._ctx, _parentState)
        _prevctx = localctx
        _startState = 6
        self.enterRecursionRule(localctx, 6, self.RULE_expr, _p)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 35
            self._errHandler.sync(self)
            token = self._input.LA(1)
            if token in [GrammarParser.L_RND_BR]:
                self.state = 23
                self.match(GrammarParser.L_RND_BR)
                self.state = 24
                self.expr(0)
                self.state = 25
                self.match(GrammarParser.R_RND_BR)
                pass
            elif token in [GrammarParser.MINUS, GrammarParser.NOT]:
                self.state = 27
                self.unary_ope()
                self.state = 28
                self.expr(12)
                pass
            elif token in [GrammarParser.BOOL]:
                self.state = 30
                self.match(GrammarParser.BOOL)
                pass
            elif token in [GrammarParser.INT]:
                self.state = 31
                self.match(GrammarParser.INT)
                pass
            elif token in [GrammarParser.FLOAT]:
                self.state = 32
                self.match(GrammarParser.FLOAT)
                pass
            elif token in [GrammarParser.STRING]:
                self.state = 33
                self.match(GrammarParser.STRING)
                pass
            elif token in [GrammarParser.ID]:
                self.state = 34
                self.match(GrammarParser.ID)
                pass
            else:
                raise NoViableAltException(self)

            self._ctx.stop = self._input.LT(-1)
            self.state = 57
            self._errHandler.sync(self)
            _alt = self._interp.adaptivePredict(self._input,3,self._ctx)
            while _alt!=2 and _alt!=ATN.INVALID_ALT_NUMBER:
                if _alt==1:
                    if self._parseListeners is not None:
                        self.triggerExitRuleEvent()
                    _prevctx = localctx
                    self.state = 55
                    self._errHandler.sync(self)
                    la_ = self._interp.adaptivePredict(self._input,2,self._ctx)
                    if la_ == 1:
                        localctx = GrammarParser.ExprContext(self, _parentctx, _parentState)
                        self.pushNewRecursionContext(localctx, _startState, self.RULE_expr)
                        self.state = 37
                        if not self.precpred(self._ctx, 11):
                            from antlr4.error.Errors import FailedPredicateException
                            raise FailedPredicateException(self, "self.precpred(self._ctx, 11)")
                        self.state = 38
                        _la = self._input.LA(1)
                        if not((((_la) & ~0x3f) == 0 and ((1 << _la) & ((1 << GrammarParser.TIMES) | (1 << GrammarParser.DIV) | (1 << GrammarParser.MOD))) != 0)):
                            self._errHandler.recoverInline(self)
                        else:
                            self._errHandler.reportMatch(self)
                            self.consume()
                        self.state = 39
                        self.expr(12)
                        pass

                    elif la_ == 2:
                        localctx = GrammarParser.ExprContext(self, _parentctx, _parentState)
                        self.pushNewRecursionContext(localctx, _startState, self.RULE_expr)
                        self.state = 40
                        if not self.precpred(self._ctx, 10):
                            from antlr4.error.Errors import FailedPredicateException
                            raise FailedPredicateException(self, "self.precpred(self._ctx, 10)")
                        self.state = 41
                        _la = self._input.LA(1)
                        if not(_la==GrammarParser.PLUS or _la==GrammarParser.MINUS):
                            self._errHandler.recoverInline(self)
                        else:
                            self._errHandler.reportMatch(self)
                            self.consume()
                        self.state = 42
                        self.expr(11)
                        pass

                    elif la_ == 3:
                        localctx = GrammarParser.ExprContext(self, _parentctx, _parentState)
                        self.pushNewRecursionContext(localctx, _startState, self.RULE_expr)
                        self.state = 43
                        if not self.precpred(self._ctx, 9):
                            from antlr4.error.Errors import FailedPredicateException
                            raise FailedPredicateException(self, "self.precpred(self._ctx, 9)")
                        self.state = 44
                        _la = self._input.LA(1)
                        if not((((_la) & ~0x3f) == 0 and ((1 << _la) & ((1 << GrammarParser.GREATER_EQ) | (1 << GrammarParser.GREATER) | (1 << GrammarParser.LESS_EQ) | (1 << GrammarParser.LESS))) != 0)):
                            self._errHandler.recoverInline(self)
                        else:
                            self._errHandler.reportMatch(self)
                            self.consume()
                        self.state = 45
                        self.expr(10)
                        pass

                    elif la_ == 4:
                        localctx = GrammarParser.ExprContext(self, _parentctx, _parentState)
                        self.pushNewRecursionContext(localctx, _startState, self.RULE_expr)
                        self.state = 46
                        if not self.precpred(self._ctx, 8):
                            from antlr4.error.Errors import FailedPredicateException
                            raise FailedPredicateException(self, "self.precpred(self._ctx, 8)")
                        self.state = 47
                        _la = self._input.LA(1)
                        if not(_la==GrammarParser.EQUAL or _la==GrammarParser.NOT_EQUAL):
                            self._errHandler.recoverInline(self)
                        else:
                            self._errHandler.reportMatch(self)
                            self.consume()
                        self.state = 48
                        self.expr(9)
                        pass

                    elif la_ == 5:
                        localctx = GrammarParser.ExprContext(self, _parentctx, _parentState)
                        self.pushNewRecursionContext(localctx, _startState, self.RULE_expr)
                        self.state = 49
                        if not self.precpred(self._ctx, 7):
                            from antlr4.error.Errors import FailedPredicateException
                            raise FailedPredicateException(self, "self.precpred(self._ctx, 7)")
                        self.state = 50
                        self.match(GrammarParser.AND)
                        self.state = 51
                        self.expr(8)
                        pass

                    elif la_ == 6:
                        localctx = GrammarParser.ExprContext(self, _parentctx, _parentState)
                        self.pushNewRecursionContext(localctx, _startState, self.RULE_expr)
                        self.state = 52
                        if not self.precpred(self._ctx, 6):
                            from antlr4.error.Errors import FailedPredicateException
                            raise FailedPredicateException(self, "self.precpred(self._ctx, 6)")
                        self.state = 53
                        self.match(GrammarParser.OR)
                        self.state = 54
                        self.expr(7)
                        pass

             
                self.state = 59
                self._errHandler.sync(self)
                _alt = self._interp.adaptivePredict(self._input,3,self._ctx)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.unrollRecursionContexts(_parentctx)
        return localctx


    class Unary_opeContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def NOT(self):
            return self.getToken(GrammarParser.NOT, 0)

        def MINUS(self):
            return self.getToken(GrammarParser.MINUS, 0)

        def getRuleIndex(self):
            return GrammarParser.RULE_unary_ope

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterUnary_ope" ):
                listener.enterUnary_ope(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitUnary_ope" ):
                listener.exitUnary_ope(self)




    def unary_ope(self):

        localctx = GrammarParser.Unary_opeContext(self, self._ctx, self.state)
        self.enterRule(localctx, 8, self.RULE_unary_ope)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 60
            _la = self._input.LA(1)
            if not(_la==GrammarParser.MINUS or _la==GrammarParser.NOT):
                self._errHandler.recoverInline(self)
            else:
                self._errHandler.reportMatch(self)
                self.consume()
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx



    def sempred(self, localctx:RuleContext, ruleIndex:int, predIndex:int):
        if self._predicates == None:
            self._predicates = dict()
        self._predicates[3] = self.expr_sempred
        pred = self._predicates.get(ruleIndex, None)
        if pred is None:
            raise Exception("No predicate with index:" + str(ruleIndex))
        else:
            return pred(localctx, predIndex)

    def expr_sempred(self, localctx:ExprContext, predIndex:int):
            if predIndex == 0:
                return self.precpred(self._ctx, 11)
         

            if predIndex == 1:
                return self.precpred(self._ctx, 10)
         

            if predIndex == 2:
                return self.precpred(self._ctx, 9)
         

            if predIndex == 3:
                return self.precpred(self._ctx, 8)
         

            if predIndex == 4:
                return self.precpred(self._ctx, 7)
         

            if predIndex == 5:
                return self.precpred(self._ctx, 6)
         




