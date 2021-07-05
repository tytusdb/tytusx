
/*------------------------------------------------IMPORTACIONES----------------------------------------------*/
%{
    //const Nodo = require("./AST/nodo_arbol");
    //var raiz;

    const {Primitiva} = require("../Expresiones/Primitiva");
    const {Operacion} = require("../Expresiones/Operacion");
    const {Consulta} = require("../XPath/Consulta");
    const {Nodo} = require("../XPath/Nodo");
    const {Predicate} = require("../XPath/Predicate");
    const {TipoPrim} = require("../Expresiones/Primitiva")
    const {TipoOperacion} = require("../Expresiones/Operacion");
    const {TipoNodo} = require("../XPath/Nodo");
    const {TipoAxis} = require("../XPath/Nodo")

    const errores = require('../Global/ListaError');

    //IMPORTS XQUERY
    const {Flwor} = require("../XQuery/Flwor");
    const {Return} = require("../XQuery/Return");
    const {TipoReturn} = require("../XQuery/Return")
    const {Where} = require("../XQuery/Where");
    const {For} = require("../XQuery/For");
    const {Let} = require("../XQuery/Let");            
    const {OrderBy} = require("../XQuery/OrderBy");    
    const {TipoFor} = require("../XQuery/DeclaracionFor")
    const {DeclaracionFor} = require("../XQuery/DeclaracionFor")
    const {Sort} = require("../XQuery/Sort")
    const {CondicionIf} = require("../XQuery/CondicionIf")
    const {FuncionXQuery} = require("../XQuery/FuncionXQuery")
    const {Html} = require("../XQuery/Html")
    const {IfThenElse} = require("../XQuery/IfThenElse")
    const {ElseIf} = require("../XQuery/ElseIf")
    const {VarCall} = require("../XQuery/VarCall")
    const {TipoFuncionXQ} = require("../XQuery/FuncionXQuery")
    const {Atributo} = require("../XML/Atributo");
    const {UserFunction} = require("../XQuery/UserFunction");
    const {Llamada} = require("../XQuery/Llamada");
%}




/* Definición Léxica */
%lex

%options case-insensitive

escapechar                          [\'\"\\]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}*\'


//CUALQUIER CARACTER EXCEPT <
content                         [^<]

%s                                  comment
%%


\s+                                 /* skip whitespace */

"(:"                              this.begin('comment');
<comment>":)"                      this.popState();
<comment>.                          /* skip comment content*/


"$"                         return 'dolar';
"="                         return 'igual';
"/"                         return 'diag';
"."                         return "dot";
"@"                         return "attr";
"["                         return "corA";
"]"                         return "corC";
"|"                         return "andSelect";
":"                        return "dospuntos";
"("                         return "parA";
")"                         return "parC";
"{"                         return "llaveA";
"}"                         return "llaveC";
","                         return "coma";
";"                         return "puntocoma"

//OPERADORES
"*"                         return 'asterisco';
"+"                         return "mas";
"-"                         return "menos";
"div"                       return "div";
"<="                        return 'lte';
">="                        return "gte";
"<"                         return 'lt';
">"                         return 'gt';
"!="                        return "nequal";
"or"                        return "or";
"and"                       return "and";
"mod"                       return "mod";

/* PALABRAS RESERVADAS */

"for"                           return   "for";
"in"                            return "in";
"to"                            return "to";
"at"                            return "at";
"let"                            return "let";
"where"                         return "where";
"order"                         return "order";
"by"                            return "by";   
"return"                        return "return";
"if"                            return "if";
"else"                          return "else";
"then"                          return "then";
"eq"                            return "reserv_eq";
"gt"                            return "reserv_gt";
"ge"                           return "reserv_ge";
"ne"                            return "reserv_ne";
"le"                           return "reserv_le";
"lt"                            return "reserv_lt"


"ancestor-or-self"              return "ancestorSelf";
"ancestor"                      return "ancestor";
"attribute"                     return "attribute";
"child"                         return "child";
"descendant-or-self"            return "descendantSelf";
"descendant"                    return "descendant";
"following-sibling"             return "followingSib";
"following"                     return "following";
"namespace"                     return "namespace";
"parent"                        return "parent";
"preceding-sibling"             return "precedSib";
"preceding"                     return "preced";
"self"                          return "self";

// FUNCIONES NATIVAS XQUERY
"data"                          return "data";
"upper-case"                    return "upper-case";
"substring"                     return "substring";
"lower-case"                    return "lower-case";
"number"                        return "number";
//user declared Xquery functions
"declare"                       return "declare";
"function"                      return "function";
//prefix
"local"                         return "local";
//xquery data types
"decimal"                       return "decimal";
"string"                        return "string";
"boolean"                       return "boolean";
"integer"                       return "integer";

"as"                            return "as";
"xs"                            return "xs";

//FUNCIONAS NATIVAS XPATH
"last()"                        return "lastFunc";
"position()"                    return "positionFunc";
"node()"                        return "nodeFunc";
"text()"                        return "textFunc";

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';

[a-zA-Z_][a-zA-Z0-9_ñÑ.-]*            return 'identifier';

{stringliteral}                     return 'cadena';
{charliteral}                       return 'cadena2';




//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF'

/lex



// DEFINIMOS PRECEDENCIA DE OPERADORES
%left 'or'
%left 'and'
%left 'lt' 'lte' 'gt' 'gte' 'igual' 'nequal' 'reserv_lt' 'reserv_ge' 'reserv_gt' 'reserv_le' 'reserv_eq' 'reserv_ne'
%left 'mas' 'menos'
%left 'asterisco' 'div' 'mod'
%left UMINUS

%left 'parA' 'parC'



//PRODUCCION INICIAL
%start START
%%
/* Definición de la gramática */
START : INSTRUCCIONES EOF         { console.log($1); return $1; }
    ; 

INSTRUCCIONES : LISTFUNC LISTAD RETURNGLOBAL
                {
                    if ($1 !== null) {
                        if ($2 !== null) {
                            $1 = $1.concat($2);
                            $1.push($3);
                            $$ = $1;
                        }
                        else {
                            $1.push($3);
                            $$ = $1;
                        }
                    }else {
                        if ($2 !== null){
                            $2.push($3);
                            $$ = $2;
                        }else 
                            $$ = [$3];
                    }
                }
;

LISTFUNC: LFUNC                 {console.log("LISTA DE FUNCIONES"); $$=$1;}
        |                       {console.log("LISTA FUNC VACIA"); $$=[];}
;

LFUNC: LFUNC USERFUNCTION       
        {
            if ($2 !== null)
                $1.push($2); 
            $$ = $1;
        }
        | USERFUNCTION          
        {
            if ($1 !== null)
                $$=[$1];
            else
                $$ = [];
        }
;

USERFUNCTION: declare function PREFIX dospuntos identifier parA ARGUMENTOS parC TIPOFUNCION llaveA LISTAINSTR llaveC puntocoma
                { 
                    $$ = new UserFunction($9, $3, $5, $7, $11, @1.first_line, @1.first_column);
                }
                | error {
                    $$ = null;
                }
;

PREFIX: local { $$ = $1;}
;           

ARGUMENTOS: LISTAARGS { $$ = $1;}
        |               { $$ =  []; }
        ;
        
LISTAARGS: LISTAARGS coma PARAM { $1.push($3); $$ = $1;}
        | PARAM { $$ = [$1];}
        ;

PARAM:   dolar identifier as xs dospuntos DATATYPE { $$ = {tipo: $4, nombre: $2};}
        ;

DATATYPE: decimal { $$ = TipoPrim.DECIMAL;}
        | string { $$ = TipoPrim.CADENA;}
        | boolean { $$ = TipoPrim.BOOLEAN;}
        | double { $$ = TipoPrim.DOUBLE;}
        | integer { $$ = TipoPrim.INTEGER;}
        ; 

TIPOFUNCION: as xs dospuntos DATATYPE { $$ = $4; }
                |               { $$ = TipoPrim.ANY; }
        ;

LISTAINSTR: IF { $$ = [$1]; }
            | FLWOR { $$ = [$1]; }
;

IF: if parA EXPRESIONXQUERY parC then EXPRESIONXQUERY LISTELSEIF else EXPRESIONXQUERY {$$ = $1;}
;

LISTELSEIF: LISTELSEIF EIF {$$ = $1;}
        | {$$ = [];}
;

EIF: else if parA EXPRESIONXQUERY parC then EXPRESIONXQUERY {$$ = $1;}
;

EXPRESIONXQUERY: EXPRESIONXQUERY asterisco EXPRESIONXQUERY { $$ = new Operacion(TipoOperacion.MULTIPLICACION, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESIONXQUERY mas EXPRESIONXQUERY { $$ = new Operacion(TipoOperacion.SUMA, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESIONXQUERY menos EXPRESIONXQUERY { $$ = new Operacion(TipoOperacion.RESTA, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESIONXQUERY div EXPRESIONXQUERY { $$ = new Operacion(TipoOperacion.DIVISION, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESIONXQUERY lte EXPRESIONXQUERY { $$ = new Operacion(TipoOperacion.MENORIGUALQUE, $1, $3, @1.first_line, @1.first_column, true);}  
        | EXPRESIONXQUERY lt EXPRESIONXQUERY { $$ = new Operacion(TipoOperacion.MENORQUE, $1, $3, @1.first_line, @1.first_column, true);} 
        | EXPRESIONXQUERY gte EXPRESIONXQUERY { $$ = new Operacion(TipoOperacion.MAYORIGUALQUE, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESIONXQUERY gt EXPRESIONXQUERY { $$ = new Operacion(TipoOperacion.MAYORQUE, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESIONXQUERY igual EXPRESIONXQUERY { $$ = new Operacion(TipoOperacion.IGUAL, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESIONXQUERY nequal EXPRESIONXQUERY { $$ = new Operacion(TipoOperacion.DIFERENTEQUE, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESIONXQUERY or EXPRESIONXQUERY { $$ = new Operacion(TipoOperacion.OR, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESIONXQUERY and EXPRESIONXQUERY { $$ = new Operacion(TipoOperacion.AND, $1, $3, @1.first_line, @1.first_column, true);}  
        | EXPRESIONXQUERY mod EXPRESIONXQUERY { $$ = new Operacion(TipoOperacion.MOD, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESIONXQUERY reserv_eq EXPRESIONXQUERY { $$ = new Operacion(TipoOperacion.XQEQ, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESIONXQUERY reserv_ne EXPRESIONXQUERY { $$ = new Operacion(TipoOperacion.XQNE, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESIONXQUERY reserv_lt EXPRESIONXQUERY { $$ = new Operacion(TipoOperacion.XQLT, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESIONXQUERY reserv_le EXPRESIONXQUERY { $$ = new Operacion(TipoOperacion.XQLE, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESIONXQUERY reserv_gt EXPRESIONXQUERY { $$ = new Operacion(TipoOperacion.XQGT, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESIONXQUERY reserv_ge EXPRESIONXQUERY { $$ = new Operacion(TipoOperacion.XQGE, $1, $3, @1.first_line, @1.first_column, true);}
        //| menos EXPRESIONXQUERY %prec UMINUS { $$ = "-"+$2;}
        | parA EXPRESIONXQUERY parC { $$ = new Operacion(TipoOperacion.PAR, $2, null, @1.first_line, @1.first_column, true);}     
        | DoubleLiteral { $$ = new Primitiva($1, TipoPrim.DOUBLE, @1.first_line, @1.first_column, true); }
        | IntegerLiteral { console.log($1); $$ = new Primitiva($1, TipoPrim.INTEGER, @1.first_line, @1.first_column, true); }
        | cadena { $$ = new Primitiva($1, TipoPrim.CADENA, @1.first_line, @1.first_column, true); }
        | cadena2 { $$ = new Primitiva($1, TipoPrim.CADENA, @1.first_line, @1.first_column, true); }
        | dolar identifier { console.log("ENTRA A EXPRESIONXQUERY ", $2); $$ = new Primitiva($2, TipoPrim.XQUERYIDENTIFIER, @1.first_line, @1.first_column, true); }        
        | LLAMADAFUNCION { $$ = $1; }
        | FUNCIONXQUERY{ $$ = new Primitiva($1, TipoPrim.FUNCIONXQUERY, @1.first_line, @1.first_column);}
        /*| LISTAENTEROS 
        {
            if ($1.length === 1)
                $$ = new Primitiva($1, TipoPrim.INTEGER, @1.first_line, @1.first_column);
            else
                $$ = new Primitiva($1, TipoPrim.LISTAENTEROS, @1.first_line, @1.first_column); 
        }*/
;

LLAMADAFUNCION: local dospuntos identifier parA LISTALLAMADA parC { $$ = new Llamada($3, $5, @1.first_line, @1.first_column); }
                | local dospuntos identifier parA parC { $$ = new Llamada($3, [], @1.first_line, @1.first_column); }
        ;

LISTALLAMADA: LISTALLAMADA coma VARLLAMADA { $1.push($3); $$ = $1}
        |   VARLLAMADA { $$ = [$1];}
        ;

VARLLAMADA: EXPRESIONXQUERY { $$ = $1;} /*Aca debe ser una expresion*/
        | LISTANODOS  { $$ = $1;}
        ;

NODO:  diag TIPONODO { $2.fromRoot = true; $$ = $2;}
        |   diag diag  TIPONODO  { $3.fromRoot = false; $$ = $3;}
        | diag error = { console.log('Entra a error sintactico de one diag');
                    errores.default.agregarError('sintactico', 'Token inesperado \'' + yytext + '\'', @1.first_line, @1.first_column); 
                $$ = new Nodo($2, TipoNodo.NODOERROR, @1.first_line, @1.first_column);}
        | diag diag error = { console.log('Entra a error sintactico de two diags');
                errores.default.agregarError('sintactico', 'Token inesperado \'' + yytext + '\'', @1.first_line, @1.first_column); 
            $$ = new Nodo($3, TipoNodo.NODOERROR, @1.first_line, @1.first_column);}           
;

TIPONODO: identifier { $$ = new Nodo($1, TipoNodo.IDENTIFIER, @1.first_line, @1.first_column);}
        | identifier corA EXPRESION corC { $$ = new Nodo($1, TipoNodo.IDENTIFIER, @1.first_line, @1.first_column, new Predicate($3, @3.first_line, @3.first_column));}
        | MASTIPOS { $$ = $1; }
        |  AXES { $$ = $1; }
;

MASTIPOS: attr identifier PREDICATE { $$ = new Nodo($2, TipoNodo.ATRIBUTO, @1.first_line, @1.first_column);}
    | attr asterisco PREDICATE { $$ = new Nodo($2, TipoNodo.ATRIBUTO, @1.first_line, @1.first_column);} 
    | dot PREDICATE { $$ = new Nodo($1, TipoNodo.DOT, @1.first_line, @1.first_column);}
    | dot dot PREDICATE { $$ = new Nodo($1+$2, TipoNodo.DOTDOT, @1.first_line, @1.first_column);}
    | asterisco PREDICATE {  $$ = new Nodo($1, TipoNodo.ASTERISCO, @1.first_line, @1.first_column);}
    | FUNCIONES { $$ = new Nodo($1, TipoNodo.FUNCION, @1.first_line, @1.first_column);}
;

AXES:    ancestor dospuntos dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.ANCESTOR, $3)}
        |     ancestorSelf dospuntos dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.ANCESTORORSELF, $3)}
        |     attribute dospuntos dospuntos NODETEST { $$ =new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.ATTRIBUTE, $3)}
        |     child dospuntos dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.CHILD, $3)}
        |     descendant dospuntos dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.DESCENDANT, $3)}
        |     descendantSelf dospuntos dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.DESCENDANTORSELF, $3)}
        |     following dospuntos dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.FOLLOWING, $3)}
        |     followingSib dospuntos dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.FOLLOWINGSIBLING, $3)}
        |     namespace dospuntos dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.NAMESPACE, $3)}
        |     parent dospuntos dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.PARENT, $3)}
        |     preced dospuntos dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.PRECEDING, $3)}
        |     precedSib dospuntos dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.PRECEDINGSIBLING, $3)}
        |     self dospuntos dospuntos NODETEST { $$ = new Nodo($1, TipoNodo.AXIS, @1.first_line, @1.first_column, undefined, TipoAxis.SELF, $3)}
;

NODETEST: identifier PREDICATE
                { 
                        if($2 instanceof Predicate){
                                $$ = new Nodo($1, TipoNodo.IDENTIFIER, @1.first_line, @1.first_column);
                        }else{
                                $$ = new Nodo($1, TipoNodo.IDENTIFIER, @1.first_line, @1.first_column, $2);
                        }
                }
        |  textFunc PREDICATE
                { 
                        if($2 instanceof Predicate){
                                $$ = new Nodo($1, TipoNodo.FUNCION, @1.first_line, @1.first_column);
                        }else{
                                $$ = new Nodo($1, TipoNodo.FUNCION, @1.first_line, @1.first_column, $2);
                        }
                }        
        | nodeFunc PREDICATE 
                { 
                        if($2 instanceof Predicate){
                                $$ = new Nodo($1, TipoNodo.FUNCION, @1.first_line, @1.first_column);
                        }else{
                                $$ = new Nodo($1, TipoNodo.FUNCION, @1.first_line, @1.first_column, $2);
                        }
                }        
        | asterisco PREDICATE
                { 
                        if($2 instanceof Predicate){
                                $$ = new Nodo($1, TipoNodo.ASTERISCO, @1.first_line, @1.first_column);
                        }else{
                                $$ = new Nodo($1, TipoNodo.ASTERISCO, @1.first_line, @1.first_column, $2);
                        }
                }
        ;

PREDICATE: corA EXPRESION corC { $$ = $2}
        |                             { $$ = [];}
;

EXPRESION:  PRIMITIVA { $$ = $1; }
            | EXPRESIONXQUERY { $$ = $1;}
;

PRIMITIVA:  attr identifier { $$ = new Primitiva($2, TipoPrim.ATRIBUTO, @1.first_line, @1.first_column, true);}
        | attr asterisco { $$ = new Primitiva($2, TipoPrim.ATRIBUTO, @1.first_line, @1.first_column, true);} 
        | dot { $$ = new Primitiva($1, TipoPrim.DOT, @1.first_line, @1.first_column, true);}
        | identifier LISTANODOS 
        { 
            console.log("ID ", $1);
            console.log("LISTANODOS ", $2);
                if($2.length > 0){
                        $$ = [new Nodo($1, TipoNodo.IDENTIFIER, @1.first_line, @1.first_column)]; $$ = $$.concat($2); 
                        $$ = new Primitiva($$, TipoPrim.CONSULTA, @1.first_line, @1.first_column);
                }else{
                        $$ = new Primitiva($1, TipoPrim.IDENTIFIER, @1.first_line, @1.first_column);

                }
        }        
        | FUNCIONES { $$ = new Primitiva($1, TipoPrim.FUNCION, @1.first_line, @1.first_column);}
    ;

FUNCIONXQUERY: data parA dolar identifier LISTANODOS parC 
                        { $$ = new FuncionXQuery(TipoFuncionXQ.DATA, $4, $5, @1.first_line, @1.first_column)}
                | upper-case parA dolar identifier LISTANODOS parC      
                        { $$ = new FuncionXQuery(TipoFuncionXQ.UPPERCASE, $4,$5, @1.first_line, @1.first_column)}
                | substring parA dolar identifier LISTANODOS coma IntegerLiteral coma IntegerLiteral parC 
                        { $$ = new FuncionXQuery(TipoFuncionXQ.SUBSTRING, $4, $5, @1.first_line, @1.first_column, +$7, +$9)}
                | lower-case parA dolar identifier LISTANODOS parC      
                        { $$ = new FuncionXQuery(TipoFuncionXQ.LOWERCASE, $4,$5, @1.first_line, @1.first_column)}
                | string parA dolar identifier LISTANODOS parC      
                        { $$ = new FuncionXQuery(TipoFuncionXQ.STRING, $4,$5, @1.first_line, @1.first_column)}        
                | number parA dolar identifier LISTANODOS parC      
                        { $$ = new FuncionXQuery(TipoFuncionXQ.NUMBER, $4,$5, @1.first_line, @1.first_column)}
                |data parA FUNCIONXQUERY parC 
                        { $$ = new FuncionXQuery(TipoFuncionXQ.DATA, undefined, undefined, @1.first_line, @1.first_column, undefined, undefined, $3)}
                | upper-case parA FUNCIONXQUERY parC      
                        { $$ = new FuncionXQuery(TipoFuncionXQ.UPPERCASE, undefined,undefined , @1.first_line, @1.first_column, undefined, undefined, $3)}
                | substring parA FUNCIONXQUERY coma IntegerLiteral coma IntegerLiteral parC 
                        { $$ = new FuncionXQuery(TipoFuncionXQ.SUBSTRING, undefined, undefined, @1.first_line, @1.first_column, +$5, +$7, $3)}
                | lower-case parA FUNCIONXQUERY parC      
                        { $$ = new FuncionXQuery(TipoFuncionXQ.LOWERCASE, undefined,undefined, @1.first_line, @1.first_column,undefined, undefined, $3)}
                | string parA FUNCIONXQUERY parC      
                        { $$ = new FuncionXQuery(TipoFuncionXQ.STRING, undefined,undefined, @1.first_line, @1.first_column, undefined, undefined, $3)}        
                | number parA FUNCIONXQUERY parC      
                        { $$ = new FuncionXQuery(TipoFuncionXQ.NUMBER, undefined,undefined, @1.first_line, @1.first_column, undefined, undefined, $3 )}                        

;    

FUNCIONES: 
        lastFunc { $$ = $1; }
        | positionFunc { $$ = $1; }
        | nodeFunc { $$ = $1;}
        | textFunc { $$ = $1; }
;

LISTANODOS: LNODOS{$$ = $1; }
            | { $$ =  [];}
;

LNODOS: LNODOS NODO   { $1.push($2); $$ = $1; }
        | NODO  { console.log("NODO"); $$ = [$1]; }
;

FLWOR:  LISTAD FOR RETURNTYPE { $$ = new Flwor($1, $2, @1.first_line, @1.first_column);}
;

LISTAD: LISTADEC { console.log("LISTA DECLARACIONES"); $$ = $1;}
        |               { console.log("SIN VARIABLES"); $$ = [];}
        ;

LISTADEC: LISTADEC DECLARACION { console.log("MAS DECLARACIONES"); $1.push($2); $$ = $1;}
                | DECLARACION { console.log("UNA DECLARACION"); $$ = [$1]; }
;

FOR: for LISTADECLARACIONES SENTSFOR { $$ = new For($2, @1.first_line, @1.first_column);}
    | {}
;

SENTSFOR: SENTFOR SENTSFOR {console.log("PASA CON WHERE");}
        | error  { console.log("PASA SIN WHERE"); $$ = $1; }
        
;

SENTFOR: DECLARACION 
        | where EXPRESIONXQUERY {$$ = $1;}
        | where dolar identifier diag EXPRESION{ console.log("ENTRA A WHERE ", $5); $$ = new Where($3,$5, true, @1.first_line, @1.first_column)}
        | where dolar identifier diag diag EXPRESION { $$ = new Where($3, $6, false, @1.first_line, @1.first_column)}        
        | order by LISTASORT { $$ = new OrderBy($3, @1.first_line, @1.first_column)} 
;

LISTASORT: LISTASORT coma SORT { $1.push($3); $$ = $1;}
        | SORT                  { $$ = [$1];}
        ;

SORT: dolar identifier LISTANODOS  { $$ = new Sort($2, $3, @1.first_line, @1.first_column)}
;

DECLARACION: 
        let dolar identifier dospuntos igual LISTACONSULTAS { console.log($6); $$ = new Let($3, $6, @1.first_line, @1.first_column);}
        | let dolar identifier dospuntos igual parA IntegerLiteral to IntegerLiteral parC { $$ = new Let($3, null, @1.first_line, @1.first_column, +$7, +$9);}
        | let dolar identifier dospuntos igual EXPRESIONXQUERY { console.log("ENTRA DECLARACION"); console.log($6); $$ = new Let($3, null, @1.first_line, @1.first_column, undefined, undefined, undefined, $6);}
;

LISTADECLARACIONES: LISTADECLARACIONES coma DECLARACIONFOR { $1.push($2); $$ = $1;}
                | DECLARACIONFOR { $$ = [$1]; }
;

DECLARACIONFOR: dolar identifier in LISTACONSULTAS { $$ = new DeclaracionFor(TipoFor.NORMAL, $2, $4, @1.first_line, @1.first_column); }
            | dolar identifier in parA IntegerLiteral to IntegerLiteral parC { $$ = new DeclaracionFor(TipoFor.ITERATIVO, $2, null, @1.first_line, @1.first_column, undefined, +$5, +$7);}
     /*entra*/       | dolar identifier in parA LISTAENTEROS parC { $$ = new DeclaracionFor(TipoFor.ITERATIVO, $2, null, @1.first_line, @1.first_column, undefined, undefined,undefined, $5);}
            | dolar identifier at dolar identifier in LISTACONSULTAS { $$ = new DeclaracionFor(TipoFor.AT, $2, $7, @1.first_line, @1.first_column, $5)}

;

LISTACONSULTAS: LISTACONSULTAS andSelect CONSULTA{ $1.push(new Consulta($3, @1.first_line, @1.first_column)); $$ = $1;}
        |  CONSULTA    { console.log("CONSULTA");  $$ = [new Consulta($1, @1.first_line, @1.first_column)];}
;

CONSULTA: identifier LISTANODOS
                {       
                        $$ = [new Nodo($1, TipoNodo.IDENTIFIER, @1.first_line, @1.first_column)];                                          
                        if($2.length > 0){  
                                $$ = $$.concat($2);
                        }

                }
        | MASTIPOS LISTANODOS
                { 
                        $$ = [$1]; 
                        if($2.length > 0){
                               $$ =  $$.concat($2);
                        } 
                }
        | LISTANODOS { console.log("LISTANODOS ", $1); $$ = $1;}     
;         

RETURNTYPE: return dolar identifier LISTANODOS { $$ = new Return(TipoReturn.NORMAL, $3, $4, undefined, undefined, undefined, @1.first_line, @1.first_column);}
            | return EXPRESIONXQUERY { $$ = new Return(TipoReturn.FUNCIONXQUERY, undefined, undefined, undefined, undefined, $2, @1.first_line, @1.first_column);}
            | return IF{ $$ = new Return(TipoReturn.IFTHENELSE, undefined, undefined, undefined, $2, undefined, @1.first_line, @1.first_column);}
;

LISTAENTEROS: LISTAENTEROS coma IntegerLiteral { $1.push($3); $$ = $1;}
                | IntegerLiteral { $$ = [$1];}
; 

RETURNGLOBAL: LLAMADAFUNCION {$$ = "return global";}
            | parA LLAMADAFUNCION parC {$$ = "return global";}
            | FOR RETURNTYPE {$$ = "return global";}
            | error {console.log("Se espera un return");}
;