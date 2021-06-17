%{
    const {Acceso} = require("../xpathAST/Expresiones/Acceso");
    const {Aritmetico, operacionAritmetica} = require("../xpathAST/Expresiones/Aritmetico");
    const {Logica, operacionLogica} = require("../xpathAST/Expresiones/Logica");
    const {Path} = require("../xpathAST/Expresiones/Path");
    const {Primitivo, tipoPrimitivo} = require("../xpathAST/Expresiones/Primitivo");
    const {Relacional, operacionRelacional} = require("../xpathAST/Expresiones/Relacional")   
    var tmp="";
%}

/* lexical grammar */
%lex 
%options case-insensitive
%s string

%%
<INITIAL>["]      {this.begin('string'); tmp=""; }           
<string>[^"]      {tmp=tmp+yytext; this.begin('string');}
<string>[\\][n]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][t]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][r]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\]["]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][\\]  { tmp= tmp+yytext;   this.begin('string');}
<string>[\"]      {
                    this.begin('INITIAL');
                    yytext= tmp;
                    tmp = "";
                    return 'cadena';
                  }

<INITIAL>[']      {this.begin('string'); tmp=""; }           
<string>[^']      {tmp=tmp+yytext; this.begin('string');}
<string>[\\][n]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][t]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][r]   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][']   {tmp=tmp+yytext; this.begin('string');}
<string>[\\][\\]  { tmp= tmp+yytext;   this.begin('string');}
<string>[\']      {
                    this.begin('INITIAL');
                    yytext= tmp;
                    tmp = "";
                    return 'scadena';
                  }
\s+     
"//"                  return '//'
"/"                   return '/'
'..'                  return '..'
"."                   return '.'
"@"                   return '@'
"["                   return '['
"]"                   return ']'
"("                   return '('
")"                   return ')'
" "                   {}
"|"                   return '|'
"+"                   return '+'
"-"                   return '-'
"*"                   return '*'
"div"                 return 'div'
"="                   return '='
"!="                  return '!='
"<="                  return '<='
">="                  return '>='
"<"                   return '<'
">"                   return '>'
"or"                  return 'or'
"and"                 return 'and'
"mod"                 return 'mod'

[0-9]+                return 'number'
[a-zA-Z_][a-zA-Z0-9_ñÑ]*                    return 'id'
<<EOF>>                                     return 'EOF'
.             {console.log('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);}
/lex

/* operator associations and precedence */
%left 'or'
%left 'and' 
%left '=' '!='
%left '>=' '<=' '<' '>'
%left '+' '-'
%left '*' 'div'
%left 'mod'

/* definition of grammar */
%start INIT 

%% 

INIT
    : '/' 'EOF'                 {return $1;}
    | MULTIPATH 'EOF'           {return $1;}
    | 'EOF'                     {return [];}
    ;

MULTIPATH
    : PATH  '|' MULTIPATH      {$3.push($1); $$ = $3;}
    | PATH                     {$$ = [$1];}
    ;

PATH
    : '/' LACCESOS              {$2[0].setipoQuery('relativa'); $$ = new Path(@1.first_line, @1.first_column, $2, 'relativa');}
    | '//' LACCESOS             {$2[0].setipoQuery('absoluta'); $$ = new Path(@1.first_line, @1.first_column, $2, 'absoluta');}
    ;

LACCESOS
    : ACCESO '/' LACCESOS       {$1.setipoQuery('relativa'); $3.push($1); $$ = $3;}//abosoluta
    | ACCESO '//' LACCESOS      {$1.setipoQuery('absoluta'); $3.push($1); $$ = $3;}//relativa
    | ACCESO                    {$$ = [$1];}
    ;

ACCESO 
//nodos
    : id                        {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'nodo', []);}
    | '*'                       {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'todosNodos', []);}
    | '.'                       {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'actual', []);}
    | id PREDICADOS             {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'nodo', $2);}
    | '*' PREDICADOS            {$$ = new Acceso(@1.first_line, @1.first_column, $1, 'todosNodos', $2);}
//  | '..'                      {$$ = $1 + $2;}
//atributos
    | '@' id                    {$$ = new Acceso(@2.first_line, @2.first_column, $2, 'atributo', []);}
    | '@' '*'                   {$$ = new Acceso(@2.first_line, @2.first_column, $2, 'todosAtributos', []);}
    | '@' id PREDICADOS         {$$ = new Acceso(@2.first_line, @2.first_column, $2, 'atributo', $3);}
    | '@' '*' PREDICADOS        {$$ = new Acceso(@2.first_line, @2.first_column, $2, 'todosAtributos', $3);}
    ;

PREDICADOS
    : PREDI PREDICADOS          {$2.push($1); $$ = $2;}
    | PREDI                     {$$ = [$1];}
    ;

PREDI
    : '[' EXP ']'               {$$ = $2;}
    ;
    
EXP 
    : EXP  '+'  EXP             {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.SUMA, $2);}
    | EXP  '-'  EXP             {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.RESTA, $2);}
    | EXP  '*'  EXP             {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.MULT, $2);}
    | EXP 'div' EXP             {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.DIV, $2);}
    | EXP 'mod' EXP             {$$ = new Aritmetico(@2.first_line, @2.first_column, $1, $3, operacionAritmetica.MOD, $2);}
    | EXP  '='  EXP             {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.IGUAL, $2);}
    | EXP '!='  EXP             {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.DIFERENCIACION, $2);}
    | EXP  '<'  EXP             {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.MENOR, $2);}
    | EXP '<='  EXP             {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.MENORIGUAL, $2);}
    | EXP  '>'  EXP             {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.MAYOR, $2);}
    | EXP '>='  EXP             {$$ = new Relacional(@2.first_line, @2.first_column, $1, $3, operacionRelacional.MAYORIGUAL, $2);}
    | EXP 'and' EXP             {$$ = new Logica(@2.first_line, @2.first_column, $1, $3, operacionLogica.AND, $2);}
    | EXP 'or'  EXP             {$$ = new Logica(@2.first_line, @2.first_column, $1, $3, operacionLogica.OR, $2);}
    | VALOR                     {$$ = $1;}
    ;
 
VALOR 
    
    : '(' EXP ')'               {$$ = $2;}
    | cadena                    {$$ = new Primitivo(@1.first_line, @1.first_column, $1, tipoPrimitivo.STRING);}
    | scadena                   {$$ = new Primitivo(@1.first_line, @1.first_column, $1, tipoPrimitivo.STRING);}
    | number                    {$$ = new Primitivo(@1.first_line, @1.first_column, $1, tipoPrimitivo.NUMBER);} 
//sub consultas
    | LACCESOS                  {$1[0].setipoQuery('relativa'); $$ = new Path(@1.first_line, @1.first_column, $1, 'sub');}
    | '//' LACCESOS             {$2[0].setipoQuery('absoluta'); $$ = new Path(@1.first_line, @1.first_column, $2, 'sub');}
//  | '/' LACCESOS              {$2[0].setipoQuery('relativa'); $$ = new Path(@1.first_line, @1.first_column, $2, 'sub');}
    ;


/*  
/biblioteca/libro/autor
/biblioteca/libro/autor/@fechaNacimiento
/biblioteca//autor
//autor//libro
/biblioteca/libro/autor/@fechaNacimiento/..
//@fechaNacimiento/../..
//autor|//titulo|//@año
//autor[@fechaNacimiento]
//fechaPublicacion[@año>1970]
//libro[autor="Mario Vargas Llosa"]
//@año[.>1970]
//libro[autor="Mario Vargas Llosa" and fechaPublicacion/@año="1973"]
//libro[autor="Mario Vargas Llosa" or fechaPublicacion/@año="1973"]
//libro[autor="Mario Vargas Llosa" or fechaPublicacion/@año="1973"]
/biblioteca//*
//@*
//autor/@*
//fechaPublicacion[@año>1970]/../titulo
//@año[.=1969]/../../autor
//libro[autor="Mario Vargas Llosa"][/fechaPublicacion/@año="1973"]

//libro[autor=//libro[titulo="Pantaleón y las visitadoras"]/autor]/titulo


/biblio/libro[//nombre = autores/nombre]

//libro/autor   //libro[autor=//libro/autor]


*/