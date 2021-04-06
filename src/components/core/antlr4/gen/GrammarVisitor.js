// Generated from /home/david/Documents/git/mlvp/src/components/core/antlr4/Grammar.g4 by ANTLR 4.9.1
// jshint ignore: start
import antlr4 from 'antlr4';

// This class defines a complete generic visitor for a parse tree produced by GrammarParser.

export default class GrammarVisitor extends antlr4.tree.ParseTreeVisitor {

	// Visit a parse tree produced by GrammarParser#program.
	visitProgram(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by GrammarParser#statement.
	visitStatement(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by GrammarParser#create_col_stat.
	visitCreate_col_stat(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by GrammarParser#expr.
	visitExpr(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by GrammarParser#unary_ope.
	visitUnary_ope(ctx) {
	  return this.visitChildren(ctx);
	}



}