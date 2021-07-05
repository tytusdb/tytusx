

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
START : DEFINICIONXQUERY EOF         { $$ = $1; return $$; }
    ;

DEFINICIONXQUERY: FLWOR { $$ = $1;}
        | USERFUNCTION { $$ = $1;} //Sin terminar 
;

USERFUNCTION: declare function PREFIX dospuntos identifier parA ARGUMENTOS parC TIPOFUNCION corA LISTAINSTR corC { $$ = $1;}
;


LISTAINSTR: LISTAINSTR CUERPOFUNCION { $1.push($2); $$ = $1;}
                | CUERPOFUNCION { $$ = [$1]}
        ;

CUERPOFUNCION: OPCIONAL { $$ = $1;}
                | RETURNTYPE { $$ = $1;}
        ;


TIPOFUNCION: as identifier dospuntos DATATYPE { $$ = $1;}
                |               { $$ = null}
        ;       

ARGUMENTOS: LISTAARGS { $$ = $1;}
        |               { $$ =  []}
        ;
        
LISTAARGS: LISTAARGS coma PARAM { $1.push($1); $$ = $1;}
        | PARAM { $$ = [$1];}
        ;

PARAM:   dolar identifier as DATATYPE { $$ = $1;}
        ;

DATATYPE: decimal { $$ = $1;}
        | string { $$ = $1;}
        | boolean { $$ = $1;}
        | double { $$ = $1;}
        | integer { $$ = $1;}
        ;

PREFIX: local { $$ = $1;}
;       
/*
ETIQUETA: lt identifier LISTAATRIBUTOS diag gt 
                { $$ = new Html($2, $3, '', [], [], true, @1.first_line, @1.first_column)}
        | lt identifier LISTAATRIBUTOS gt TEXTCONTENT lt diag identifier gt  
                { $$ = new Html($2, $3, $5, [], [], false, @1.first_line, @1.first_column)}
        | lt identifier LISTAATRIBUTOS gt HTML lt diag identifier gt  
                { $$ = new Html($2, $3, '', $5, [], false, @1.first_line, @1.first_column)}
        | lt identifier LISTAATRIBUTOS gt lt diag identifier gt 
                 { $$ = new Html($2, $3, '', [], [],  false, @1.first_line, @1.first_column)}
        | lt identifier LISTAATRIBUTOS gt LISTAVARIABLECALL lt diag identifier gt 
                 { $$ = new Html($2, $3, '', [], $5, true, @1.first_line, @1.first_column)}
        ;*/

FLWOR:  LISTAOP RETURNTYPE { $$ = new Flwor($1, $2, @1.first_line, @1.first_column);}
;

LISTAOP: LISTAOPCIONALES { $$ = $1;}
        |               { $$ = [];}
        ;

LISTAOPCIONALES: LISTAOPCIONALES OPCIONAL { $1.push($2); $$ = $1;}
                | OPCIONAL { $$ = [$1]}
;
OPCIONAL: where dolar identifier diag EXPRESION{ $$ = new Where($3,$5, true, @1.first_line, @1.first_column)}
        | where dolar identifier diag diag EXPRESION { $$ = new Where($3, $6, false, @1.first_line, @1.first_column)}        
        | order by LISTASORT { $$ = new OrderBy($3, @1.first_line, @1.first_column)} 
        | let dolar identifier dospuntos igual LISTACONSULTAS { $$ = new Let($3, $6, @1.first_line, @1.first_column);}
        | let dolar identifier dospuntos igual parA IntegerLiteral to IntegerLiteral parC { $$ = new Let($3, null, @1.first_line, @1.first_column, +$7, +$9);}
        | let dolar identifier dospuntos igual parA LISTAENTEROS parC { $$ = new Let($3, null, @1.first_line, @1.first_column, undefined, undefined, $7);}
        | let dolar identifier dospuntos igual PRIMITIVAXPATH { $$ = new Let($3, null, @1.first_line, @1.first_column, undefined, undefined, undefined, $6);}
        | for LISTADECLARACIONES { $$ = new For($2, @1.first_line, @1.first_column);}
;
 

LISTADECLARACIONES: LISTADECLARACIONES coma DECLARACIONFOR { $1.push($2); $$ = $1;}
                | DECLARACIONFOR { $$ = [$1]; }
;

DECLARACIONFOR: dolar identifier in LISTACONSULTAS { $$ = new DeclaracionFor(TipoFor.NORMAL, $2, $4, @1.first_line, @1.first_column); }
            | dolar identifier in parA IntegerLiteral to IntegerLiteral parC { $$ = new DeclaracionFor(TipoFor.ITERATIVO, $2, null, @1.first_line, @1.first_column, undefined, +$5, +$7);}
            | dolar identifier in parA LISTAENTEROS parC { $$ = new DeclaracionFor(TipoFor.ITERATIVO, $2, null, @1.first_line, @1.first_column, undefined, undefined,undefined, $5);}
            | dolar identifier at dolar identifier in LISTACONSULTAS { $$ = new DeclaracionFor(TipoFor.AT, $2, $7, @1.first_line, @1.first_column, $5)}

;

LISTAVARIABLECALL: LISTAVARIABLECALL VARIABLECALL { $1.push($2); $$ = $1;}
                | VARIABLECALL { $$ = [$1]}
                ;
VARIABLECALL: llaveA FLWOR llaveC { $$ = new VarCall(undefined, undefined, $2, @1.first_line, @1.first_column)}
        | llaveA dolar identifier LISTANODOS llaveC { $$ = new VarCall($3, $4, undefined, @1.first_line, @1.first_column);}
;

TEXTCONTENT: TEXTCONTENT TEXT { $1 = $1 + " " + $2; $$ = $1;}
                | TEXT          { $$ = $1;}
;

TEXT: identifier { $$ = $1.toString().replaceAll("\"","");}
        | content { $$ = $1.toString().replaceAll("\"","");}
        | DoubleLiteral { $$ = $1.toString().replaceAll("\"",""); }
        | IntegerLiteral { $$ = $1.toString().replaceAll("\"",""); }
;

LISTAENTEROS: LISTAENTEROS coma IntegerLiteral { $1.push($3); $$ = $1;}
                | IntegerLiteral { $$ = [$1];}
    ;            


RETURNTYPE: return dolar identifier LISTANODOS { $$ = new Return(TipoReturn.NORMAL, $3, $4, undefined, undefined, undefined, @1.first_line, @1.first_column);}
           // | return ETIQUETA{ $$ = new Return(undefined, undefined, $2, undefined, @1.first_line, @1.first_column);}
           | return FUNCIONXQUERY { $$ = new Return(TipoReturn.FUNCIONXQUERY, undefined, undefined, undefined, undefined, $2, @1.first_line, @1.first_column);}
        | return IFDEF{ $$ = new Return(TipoReturn.IFTHENELSE, undefined, undefined, undefined, $2, undefined, @1.first_line, @1.first_column);}
            | return parA LLAMADAFUNCION parC { $$ = $3;}
            | return LLAMADAFUNCION { $$ = $2;}
;

LLAMADAFUNCION: local dospuntos identifier parA LISTALLAMADA parC { $$ = "Llamada";}
        ;

LISTALLAMADA: LISTALLAMADA coma VARLLAMADA { $1.push($3); $$ = $1}
        |   VARLLAMADA { $$ = [$1];}
        ;
VARLLAMADA: dolar identifer { $$ = $1;}
        | NODO  { $$ = $1;}
        ;

IFDEF: if parA dolar identifier diag EXPRESION parC then TIPOIF LISTAELSEIF else TIPOIF 
        {$$ = new IfThenElse($4, $6, $9, $10, $12, true, @1.first_line, @1.first_column);}
        | if parA dolar identifier diag diag EXPRESION parC then TIPOIF LISTAELSEIF else TIPOIF 
        {$$ = new IfThenElse($4, $7, $10, $11, $13, false, @1.first_line, @1.first_column);}
        | if parA EXPRESION parC then TIPOIF LISTAELSEIF else TIPOIF { new IfThenElse(undefined, $3, $6, $7, $9, false, @1.first_line, @1.first_column);}
;

LISTAELSEIF: LISTAELSEIF ELSEIF{ $1.push($2); $$ = $1;}
        |                      { $$ = [];}
        ;

ELSEIF: else if parA dolar identifier diag EXPRESION parC then TIPOIF { $$ = new ElseIf($5, $7, $10, @1.first_line, @1.first_column); }
      //  | else if parA EXPRESION parC then TIPOIF { $$ = new ElseIf(undefined, $4, $7, @1.first_line, @1.first_column);}
        ;

TIPOIF: parA TIPOIF parC { $$ = $2;}
        |llaveA TIPOIF llaveC { $$ = $2}
        | CONDICION { $$ = $1;}
        | parA parC { $$ = new CondicionIf(undefined, undefined, undefined, undefined, true, @1.first_line, @1.first_column)}
;

CONDICION: DECRETURN { $$ = $1;}
        //| ETIQUETA { $$ = new CondicionIf(undefined, undefined, $1, undefined, @1.first_line, @1.first_column);}
        ;

DECRETURN: FUNCIONXQUERY { $$ = new CondicionIf(undefined, undefined, undefined, $1, false, @1.first_line, @1.first_column); }
        | dolar identifier LISTANODOS { $$ = new CondicionIf($2, $3, undefined, undefined, false,  @1.first_line, @1.first_column);}
        | LLAMADAFUNCION { $$ = new CondicionIf(undefined, undefined, undefined, undefined, false, @1.first_line, @1.first_column);}
;


LISTAATRIBUTOS: ATRIBUTOS { $$ = $1;}
              |                 { $$ = [];}
;

ATRIBUTOS:  ATRIBUTOS ATRIBUTO { $1.push($2); $$ = $1;}
                | ATRIBUTO { $$ = [$1];}
;

ATRIBUTO: identifier asig cadena { $$ = new Atributo($1.toString().replaceAll("\"",""), $3, @1.first_line, @1.first_column); }
        | identifier asig cadena2 { $$ = new Atributo($1.toString().replaceAll("\"",""), $3, @1.first_line, @1.first_column); }
;


LISTASORT: LISTASORT coma SORT { $1.push($3); $$ = $1;}
        | SORT                  { $$ = [$1];}
        ;

SORT: dolar identifier LISTANODOS  { $$ = new Sort($2, $3, @1.first_line, @1.first_column)}
;

LISTACONSULTAS: CONSULTA andSelect LISTACONSULTAS{ $$ = [new Consulta($1, @1.first_line, @1.first_column)]; $$ = $$.concat($3);}
        |  CONSULTA    {  $$ = [new Consulta($1, @1.first_line, @1.first_column)];}
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
        | LISTANODOS { $$ = $1;}     
;

LISTANODOS:  NODO LISTANODOS    { $$ = [$1]; $$ = $$.concat($2); }
        |   { $$ = []; }
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
            | OPERACION { $$ = $1 ;}
            | PRIMITIVAXPATH { $$ = $1;}
        ;

OPERACION: EXPRESION asterisco EXPRESION { $$ = new Operacion(TipoOperacion.MULTIPLICACION, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESION mas EXPRESION { $$ = new Operacion(TipoOperacion.SUMA, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESION menos EXPRESION { $$ = new Operacion(TipoOperacion.RESTA, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESION div EXPRESION { $$ = new Operacion(TipoOperacion.DIVISION, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESION lte EXPRESION { $$ = new Operacion(TipoOperacion.MENORIGUALQUE, $1, $3, @1.first_line, @1.first_column, true);}  
        | EXPRESION lt EXPRESION { $$ = new Operacion(TipoOperacion.MENORQUE, $1, $3, @1.first_line, @1.first_column, true);} 
        | EXPRESION gte EXPRESION { $$ = new Operacion(TipoOperacion.MAYORIGUALQUE, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESION gt EXPRESION { $$ = new Operacion(TipoOperacion.MAYORQUE, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESION igual EXPRESION { $$ = new Operacion(TipoOperacion.IGUAL, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESION nequal EXPRESION { $$ = new Operacion(TipoOperacion.DIFERENTEQUE, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESION or EXPRESION { $$ = new Operacion(TipoOperacion.OR, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESION and EXPRESION { $$ = new Operacion(TipoOperacion.AND, $1, $3, @1.first_line, @1.first_column, true);}  
        | EXPRESION mod EXPRESION { $$ = new Operacion(TipoOperacion.MOD, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESION reserv_eq EXPRESION { $$ = new Operacion(TipoOperacion.IGUAL, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESION reserv_ne EXPRESION { $$ = new Operacion(TipoOperacion.DIFERENTEQUE, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESION reserv_lt EXPRESION { $$ = new Operacion(TipoOperacion.MENORQUE, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESION reserv_le EXPRESION { $$ = new Operacion(TipoOperacion.MENORIGUALQUE, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESION reserv_gt EXPRESION { $$ = new Operacion(TipoOperacion.MAYORQUE, $1, $3, @1.first_line, @1.first_column, true);}
        | EXPRESION reserv_ge EXPRESION { $$ = new Operacion(TipoOperacion.MAYORIGUALQUE, $1, $3, @1.first_line, @1.first_column, true);}
        //| menos EXPRESION %prec UMINUS { $$ = "-"+$2;}
        | parA EXPRESION parC { $$ = new Operacion(TipoOperacion.PAR, $2, null, @1.first_line, @1.first_column, true);}     
;

PRIMITIVAXPATH: DoubleLiteral { $$ = new Primitiva($1, TipoPrim.DOUBLE, @1.first_line, @1.first_column, true); }
        | IntegerLiteral { $$ = new Primitiva($1, TipoPrim.INTEGER, @1.first_line, @1.first_column, true); }
        |   cadena { $$ = new Primitiva($1, TipoPrim.CADENA, @1.first_line, @1.first_column, true); }
        |   cadena2 { $$ = new Primitiva($1, TipoPrim.CADENA, @1.first_line, @1.first_column, true); }
        | dolar identifier { $$ = new Primitiva($1, TipoPrim.XQUERYIDENTIFIER, @1.first_line, @1.first_column, true); }        
        ;
PRIMITIVA: 
        | attr identifier { $$ = new Primitiva($2, TipoPrim.ATRIBUTO, @1.first_line, @1.first_column, true);}
        | attr asterisco { $$ = new Primitiva($2, TipoPrim.ATRIBUTO, @1.first_line, @1.first_column, true);} 
        | dot { $$ = new Primitiva($1, TipoPrim.DOT, @1.first_line, @1.first_column, true);}
        | identifier LISTANODOS 
        { 
                if($2.length > 0){
                        $$ = [new Nodo($1, TipoNodo.IDENTIFIER, @1.first_line, @1.first_column)]; $$ = $$.concat($2); 
                        $$ = new Primitiva($$, TipoPrim.CONSULTA, @1.first_line, @1.first_column);
                }else{
                        $$ = new Primitiva($1, TipoPrim.IDENTIFIER, @1.first_line, @1.first_column);

                }
        }        
        | FUNCIONES { $$ = new Primitiva($1, TipoPrim.FUNCION, @1.first_line, @1.first_column);}
+        | FUNCIONXQUERY{ $$ = new Primitiva($1, TipoPrim.FUNCIONXQUERY, @1.first_line, @1.first_column);}
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
