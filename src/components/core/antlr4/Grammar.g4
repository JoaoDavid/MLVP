grammar Grammar;



// ------------------------- PROGRAM -------------------------

program: (statement)+ EOF ;


// ------------------------- STATEMENTS -------------------------

statement: create_col_stat ;

create_col_stat: expr SEMICOLON ;


// ------------------------- EXPRESSIONS -------------------------

expr:	L_RND_BR expr R_RND_BR
	|	unary_ope expr
	|   expr (TIMES | DIV | MOD) expr
	|   expr (PLUS | MINUS) expr
	|   expr (GREATER_EQ | GREATER | LESS_EQ | LESS) expr
	|   expr (EQUAL | NOT_EQUAL) expr
	|   expr AND expr
	|   expr OR expr
    |	BOOL
    |	INT
    |	FLOAT
    |	STRING
    |	ID
    ;


// ------------------------- DATA TYPES -------------------------
BOOL    : 'true'
        | 'false' ;
INT     : [0-9]('_'*[0-9])* ;
FLOAT   : [0-9]*'.'?[0-9]+
        | [0-9]+'.'?[0-9]*[eE][0-9]+;
STRING  : '"'(~[\\"]| '\\'[btnfr"'\\] | ' ')*'"' ;


// ------------------------- SEPARATORS -------------------------
//L->left, R->right
//RND->round, SQR->square, CRL->curly
//BR->bracket

L_RND_BR   : '(' ;
R_RND_BR   : ')' ;

L_SQR_BR   : '[' ;
R_SQR_BR   : ']' ;

L_CRL_BR   : '{' ;
R_CRL_BR   : '}' ;

SEMICOLON  : ';' ;
COLON      : ':' ;
COMMA      : ',' ;

// ------------------------- OPERATORS -------------------------

//Assignment
ASSIGN     :  '=';

//Arithmetic
PLUS       :  '+';
MINUS      :  '-';
TIMES      :  '*';
DIV        :  '/';
MOD        :  '%';

//Logical
AND        :  '&&';
OR         :  '||';
NOT        :  '!';

//Comparison
EQUAL      :  '==';
NOT_EQUAL  :  '!=';
GREATER_EQ :  '>=';
GREATER    :  '>';
LESS_EQ    :  '<=';
LESS       :  '<';

unary_ope   : NOT
            | MINUS;


// ------------------------- ARRAYS -------------------------

//Identifier
ID     : [a-zA-Z_][a-zA-Z0-9_]* ;

//whitespace insensitive
WS : [ \r\t\n]+ -> skip ;

//comment line
COMMENT : '#' ~( '\r' | '\n' )* -> skip ;
