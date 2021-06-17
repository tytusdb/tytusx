%lex

%%

//Expresiones regulares para la aceptacion de numeros enteros y decimales
[0-9]+("."[0-9]+)\b {return "tk_decimal";}
[0-9]+\b            {return "tk_entero";}

//Palabras reservadas
"node"               {return "tk_node";}
"child"              {return "tk_child";}
"descendant"         {return "tk_descendant";}
"descendant-or-self" {return "tk_descendatOr"}
"ancestor"           {return "tk_ancestor";}
"ancestor-or-self"   {return "tk_ancestorOr";}
"attribute"          {return "tk_attribute";}
"following"          {return "tk_following";}
"following-sibling"  {return "tk_followingSi"}
"parent"             {return "tk_parent"}
"preceding"          {return "tk_preceding"}
"preceding-sibling"  {return "tk_precedingSi"}
"self"               {return "tk_self"}
"text"               {return "tk_text"}
"position"           {return "tk_position"}
"last"               {return "tk_last"}
"div"                {return "tk_div"}
"and"                {return "tk_and"}
"or"                 {return "tk_or"}
"mod"                {return "tk_mod"}

//conjunto de simbolos aceptados
"|"  {return "tk_barra"}
"."  {return "tk_punto"}
"/"  {return "tk_diagonal"}
"*"  {return "tk_asterisco"}
":"  {return "tk_dosPuntos"}
"+"  {return "tk_mas"}
"-"  {return "tk_menos"}
"<=" {return "tk_menorIgual"}
">=" {return "tk_mayorIgual"}
"<"  {return "tk_menor"}
">"  {return "tk_mayor"}
"!=" {return "tk_distinto"}
"="  {return "tk_igual"}
"["  {return "tk_llaveA"}
"]"  {return "tk_llaveC"}
"@"  {return "tk_arroba"}
"("  {return "tk_parA"}
")"  {return "tk_parC"}

//Expresiones para validar los strings
\"[^\"]*\"  {return "tk_stringTexto";}
\“[^\“]*\“  {return "tk_stringTexto";}
\'[^\']*\'  {return "tk_stringTexto";}
\‘[^\‘]*\‘  {return "tk_stringTexto";}

//Expresion para un identificador
[a-zA-Z]([a-zA-Z0-9_])* {return "tk_identificador";}

//Final del archivo
<<EOF>> return "EOF";

/*Espacios en blanco, tabulados, saltos de linea, salto de carro, el otro no se que es equis de
pero todo esto se ignora*/
[ \t\r\n\f] {}

//Estado sumidero donde van a caer todos los errores
. {         
    listaErrores.push(new tError('Léxico',`Simbolo inesperado: ${yytext}`,yylloc.first_line,yylloc.first_column ));
}

/lex

%{
    const { SalidaGramatica } = require("./AST/SalidaGramatica");
    const { Nodo } = require('./Expresiones/Nodo');
    const Primitivo = require('./Expresiones/Primitivo');
    const Aritmetica = require('./Operaciones/Aritmeticas')
    const Relacional = require('./Operaciones/Relacional');
    const Logica = require('./Operaciones/Logica'); 
    const { Predicate } = require('./Expresiones/Predicate');
    //const { Atributo } = require('./Expresiones/Atributo');
    const { tError } = require('./Expresiones/tError');

    var listaErrores = [];
    var produccion = [];
    var accion = [];
%}

//Precedencia de operadores
%left tk_mod
%left tk_or
%left tk_and
%left tk_barra
%left tk_igual tk_distinto
%left tk_mayorIgual tk_menorIgual tk_mayor tk_menor
%left tk_diagonal
%left tk_llaveA tk_llaveC
%left tk_div tk_asterisco
%left tk_mas tk_menos
%left tk_parA tk_parC

%start INICIOPURO
%%

INICIOPURO :
    INICIO EOF 
        {
            produccion.push('<INICIOPURO> ::= <INICIO> EOF');
            accion.push('INICIOPURO.Val = INICIO.val //fin del documento');
            return new SalidaGramatica($1, produccion, accion,listaErrores);
        };

INICIO : 
    INICIO tk_barra INICIALES 
        { 
            produccion.push('<INICIO> ::= <INICIO> | <INICIALES>');
            accion.push('INICIO.Val = INICIO.push(INICIALES)');
            //$$ = new Array();
            $$.push($3); 
        }   
    | INICIALES 
        {
            produccion.push('<INICIO> ::= <INICIALES>');
            accion.push('INICIO.Val = INICIALES.Val');
            $$ = [$1]; 
        };

INICIALES : 
    tk_punto DIAGONALES DERIVADOSLIMITADO DERIVACIONDIAGONAL
        {
            produccion.push(`<INICIALES> ::= punto <DIAGONALES> <DERIVADOSLIMITADO> <DERIVAIONDIAGONAL>`);
            accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)'); 
            $$ = new Nodo("", ".", null, [new Nodo($2, $3.val, $3.pre, [...$4], @1.first_line, @1.first_column)], @1.first_line, @1.first_column);
        }
    | tk_identificador PREDICATE DERIVACIONDIAGONAL
        {
            produccion.push(`<INICIALES> ::= identificador <PREDICATE> <DERIVACIONDIAGONAL>`);
            accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)'); 
            //$$ = new Array();
            $$ = new Nodo("", $1, $2, [...$3], @1.first_line, @1.first_column)
            //$$.push(...$3)
        }
    | tk_diagonal DERIVADOS DERIVACIONDIAGONAL 
        {
            produccion.push(`<INICIALES> ::= / <DERIVADOS> <DERIVACIONDIAGONAL>`);
            accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)'); 
            //$$ = new Array();
            $$ = new Nodo($1, $2.val, $2.pre, [...$3], @1.first_line, @1.first_column)
            //$$.push(...$3)
        }
    | tk_diagonal tk_diagonal DERIVADOS DERIVACIONDIAGONAL 
        {
            produccion.push('<INICIALES> ::= // <DERIVADOS> <DERIVACIONDIAGONAL>');
            accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)'); 
            //$$ = new Array();
            $$ = new Nodo("//", $3.val, $3.pre, [...$4], @1.first_line, @1.first_column)
            //$$.push(...$4)
        }           
    | tk_asterisco PREDICATE DERIVACIONDIAGONAL
        {
            produccion.push(`<INICIALES> ::= asterisco <PREDICATE> <DERIVACIONDIAGONAL>`);
            accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)'); 
            //$$ = new Array();
            $$ = new Nodo("", $1, $2, [...$3], @1.first_line, @1.first_column)
            //$$.push(...$3)
        }
    | tk_node tk_parA tk_parC PREDICATE DERIVACIONDIAGONAL
        {
            produccion.push(`<INICIALES> ::= node() <PREDICATE> <DERIVACIONDIAGONAL>`);
            accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)'); 
            //$$ = new Array();
            $$ = new Nodo("", "node()", $4, [...$3], @1.first_line, @1.first_column)
            //$$.push(...$3)
        };

DIAGONALES : 
    tk_diagonal 
        {
            produccion.push('<DIAGONALES> ::= /');
            accion.push('DIAGONALES.Val = \"/\"'); 
            $$ = $1 
        }
    | tk_diagonal tk_diagonal 
        {
            produccion.push(`<DIAGONALES> ::= //`);
            accion.push('DIAGONALES.Val = \"//\"'); 
            $$ = "//" 
        }
    |   error tk_diagonal                                                                            
        {
            listaErrores.push(new tError('Sintactico',`Token inesperado: ${yytext}`,@1.first_line,@1.first_column));
        }
        ;

DERIVACIONDIAGONAL : 
    DIAGONALES DERIVADOS DERIVACIONDIAGONAL 
        {
            produccion.push(`<DERIVACIONDIAGONAL> ::= <DIAGONALES> <DERIVADOS> <DERIVACIONDIAGONAL>`);
            accion.push('DERIVACIONDIAGONAL.Val = []; DERIVACIONDIAGONAL.Val.push(new Nodo(tipo, id, predicado, fila, columna)); DERIVACIONDIAGONAL.push(DERIVACIONDIAGONAL)'); 
            $$ = new Array();
            $$.push(new Nodo($1, $2.val, $2.pre, [...$3], @1.first_line, @1.first_column)) 
            //$$.push(...$3)
        }
    |   {
            produccion.push(`<DERIVACIONDIAGONAL> ::= epsilon`);
            accion.push('DERIVACIONDIAGONAL.Val = [/*Vacio*/]');
            $$ = [];
        };

DERIVADOSLIMITADO :
    tk_identificador PREDICATE 
        {
            produccion.push(`<DERIVADOSLIMIADO> ::= identificador <PREDICATE>`);
            accion.push('DERIVADOSLIMITADO.Val = identificador + PREDICATE.Val'); 
            $$ = {val: $1, pre: $2};
        }
    | tk_asterisco PREDICATE 
        {
            produccion.push(`<DERIVADOSLIMIADO> ::= asterisco <PREDICATE>`);
            accion.push('DERIVADOSLIMITADO.Val = \"*\" + PREDICATE.Val'); 
            $$ = {val: $1, pre: $2};
        }
    | tk_node tk_parA tk_parC PREDICATE 
        {
            produccion.push(`<DERIVADOSLIMIADO> ::= node() <PREDICATE>`);
            accion.push('DERIVADOSLIMITADO.Val = \"@\" + ATRIBUTO.Val'); 
            $$ = {val: "node()", pre: $4}
        }
    | tk_arroba ATRIBUTO
        {
            produccion.push(`<DERIVADOSLIMIADO> ::= arroba <ATRIBUTO>`);
            accion.push('DERIVADOSLIMITADO.Val = \"@\" + ATRIBUTO.Val'); 
            $$ = {val: $1 + "" + $2, pre: null}; 
        }
    
    | AXES 
        {
            produccion.push(`<DERIVADOSLIMITADO> ::= <AXES>`);
            accion.push('DERIVADOSLIMITADO.Val = AXES.Val'); 
            $$ = {val: $1, pre: null}
        };

DERIVADOS : 
    tk_punto 
        { 
            produccion.push(`<DERIVADOS> ::= punto`);
            accion.push("DERIVADOS.Val = \".\" ");
            $$ = {val: $1, pre: null}; 
        }
    | tk_punto tk_punto 
        {
            produccion.push(`<DERIVADOS> ::= doblePunto`);
            accion.push('DERIVADOS.Val = \"..\"');
            $$ = {val: "..", pre: null}; 
        }
    | DERIVADOSLIMITADO 
        { 
            produccion.push(`<DERIVADOS> ::= <DERIVADOSLIMITADO>`);
            accion.push('DERIVADOS.Val = DERIVADOSLIMITADO.Val'); 
            $$ = $1; 
        };

AXES :
    tk_child tk_dosPuntos tk_dosPuntos NODETEST
    | tk_descendant tk_dosPuntos tk_dosPuntos NODETEST
    | tk_descendatOr tk_dosPuntos tk_dosPuntos NODETEST
    | tk_ancestor tk_dosPuntos tk_dosPuntos NODETEST
    | tk_ancestorOr tk_dosPuntos tk_dosPuntos NODETEST
    | tk_attribute tk_dosPuntos tk_dosPuntos NODETEST
    | tk_following tk_dosPuntos tk_dosPuntos NODETEST
    | tk_followingSi tk_dosPuntos tk_dosPuntos NODETEST
    | tk_parent tk_dosPuntos tk_dosPuntos NODETEST
    | tk_preceding tk_dosPuntos tk_dosPuntos NODETEST
    | tk_precedingSi tk_dosPuntos tk_dosPuntos NODETEST
    | tk_self tk_dosPuntos tk_dosPuntos NODETEST;

NODETEST :
    tk_asterisco PREDICATE
    | tk_node tk_parA tk_parC PREDICATE
    | tk_identificador PREDICATE
    | tk_text tk_parA tk_parC;

PREDICATE : 
    tk_llaveA EXPRESION tk_llaveC
        {
            produccion.push(`<PREDICATE> ::= llaveA <EXPRESION> llaveC`);
            accion.push('PREDICATE.Val = EXPRESION.Val');
            $$ = new Predicate($2, @1.first_line, @1.first_column);
        }
    | 
        {
            produccion.push(`<PREDICATE> ::= epsilon`);
            accion.push('PREDICATE.Val = /*vacio*/');
            $$ = null; 
        };

EXPRESION :
    EXPRESION tk_mas EXPRESION
        {
            produccion.push(`<EXPRESION> ::= <EXPRESION> mas <EXPRESION>`);
            accion.push('EXPRESION.Val = EXPRESION.Val + EXPRESION.Val');
            $$ = new Aritmetica.default($1, '+', $3, @1.first_line, @1.first_column);
        }
    | EXPRESION tk_menos EXPRESION
        {
            produccion.push(`<EXPRESION> ::= <EXPRESION> menos <EXPRESION>`);
            accion.push('EXPRESION.Val = EXPRESION.Val - EXPRESION.Val');
            $$ = new Aritmetica.default($1, '-', $3, @1.first_line, @1.first_column);
        }
    | EXPRESION tk_asterisco EXPRESION
        {
            produccion.push(`<EXPRESION> ::= <EXPRESION> asterisco <EXPRESION>`);
            accion.push('EXPRESION.Val = EXPRESION.Val * EXPRESION.Val');
            $$ = new Aritmetica.default($1, '*', $3, @1.first_line, @1.first_column);
        }
    | EXPRESION tk_div EXPRESION
        {
            produccion.push(`<EXPRESION> ::= <EXPRESION> div <EXPRESION>`);
            accion.push('EXPRESION.Val = EXPRESION.Val / EXPRESION.Val');
            $$ = new Aritmetica.default($1, '/', $3, @1.first_line, @1.first_column);
        }
    | EXPRESION tk_mod EXPRESION
        {
            produccion.push(`<EXPRESION> ::= <EXPRESION> mod <EXPRESION>`);
            accion.push('EXPRESION.Val = EXPRESION.Val % EXPRESION.Val');
            $$ = new Aritmetica.default($1, '%', $3, @1.first_line, @1.first_column);
        }
    | EXPRESION tk_menor EXPRESION
        {
            produccion.push(`<EXPRESION> ::= <EXPRESION> menor <EXPRESION>`);
            accion.push('EXPRESION.Val = EXPRESION.Val + \"<\" + EXPRESION.Val');
            $$ = new Relacional.default($1, '<', $3, @1.first_line, @1.first_column);
        }
    | EXPRESION tk_mayor EXPRESION
        {
            produccion.push(`<EXPRESION> ::= <EXPRESION> mayor <EXPRESION>`);
            accion.push('EXPRESION.Val = EXPRESION.Val + \">\" + EXPRESION.Val');
            $$ = new Relacional.default($1, '>', $3, @1.first_line, @1.first_column);
        }
    | EXPRESION tk_menorIgual EXPRESION
        {
            produccion.push(`<EXPRESION> ::= <EXPRESION> menorIgual <EXPRESION>`);
            accion.push('EXPRESION.Val = EXPRESION.Val + \"<=\" + EXPRESION.Val');
            $$ = new Relacional.default($1, '<=', $3, @1.first_line, @1.first_column);
        }
    | EXPRESION tk_mayorIgual EXPRESION
        {
            produccion.push(`<EXPRESION> ::= <EXPRESION> mayorIgual <EXPRESION>`);
            accion.push('EXPRESION.Val = EXPRESION.Val + \">=\" + EXPRESION.Val');
            $$ = new Relacional.default($1, '>=', $3, @1.first_line, @1.first_column);
        }
    | EXPRESION tk_igual EXPRESION
        {
            produccion.push(`<EXPRESION> ::= <EXPRESION> igual <EXPRESION>`);
            accion.push('EXPRESION.Val = EXPRESION.Val + \"=\" + EXPRESION.Val');
            $$ = new Relacional.default($1, '=', $3, @1.first_line, @1.first_column);
        }
    | EXPRESION tk_distinto EXPRESION
        {
            produccion.push(`<EXPRESION> ::= <EXPRESION> distinto <EXPRESION>`);
            accion.push('EXPRESION.Val = EXPRESION.Val + "" + EXPRESION.Val');
            $$ = new Relacional.default($1, '!=', $3, @1.first_line, @1.first_column);
        }
    | EXPRESION tk_or EXPRESION
        {
            produccion.push(`<EXPRESION> ::= <EXPRESION> or <EXPRESION>`);
            accion.push('EXPRESION.Val = EXPRESION.Val + \"or\" + EXPRESION.Val');
            $$ = new Logica.default($1, 'or', $3, @1.first_line, @1.first_column);
        }
    | EXPRESION tk_and EXPRESION
        {
            produccion.push(`<EXPRESION> ::= <EXPRESION> and <EXPRESION>`);
            accion.push('EXPRESION.Val = EXPRESION.Val + \"and\" + EXPRESION.Val');
            $$ = new Logica.default($1, 'and', $3, @1.first_line, @1.first_column);
        }
    | tk_entero 
        {
            produccion.push(`<EXPRESION> ::= entero`);
            accion.push('EXPRESION.Val = \"entero\"');
            $$ = new Primitivo.default(Number(yytext), @1.first_line, @1.first_column)
        }
    | tk_decimal
        {
            produccion.push(`<EXPRESION> ::= decimal`);
            accion.push('EXPRESION.Val = \"decimal\"');
            $$ = new Primitivo.default(Number(yytext), @1.first_line, @1.first_column)
        }
    | tk_arroba ATRIBUTO
        {
            produccion.push(`<EXPRESION> ::= arroba <ATRIBUTO>`);
            accion.push('EXPRESION.Val = \"@\" + ATRIBUTO.Val');
            $$ = new Primitivo.default(`@${$2}`, @1.first_line, @1.first_column)
        }
    | tk_identificador
        {
            produccion.push(`<EXPRESION> ::= identificador`);
            accion.push('EXPRESION.Val = \"identificador\"');
            $$ = new Primitivo.default($1, @1.first_line, @1.first_column)
        }
    | tk_position tk_parA tk_parC
        {
            produccion.push(`<EXPRESION> ::= position()`);
            accion.push('EXPRESION.Val = \"position()\"');
            $$ = new Primitivo.default("position()", @1.first_line, @1.first_column)
        }    
    | tk_last tk_parA tk_parC
        {
            produccion.push(`<EXPRESION> ::= last()`);
            accion.push('EXPRESION.Val = \"last()\"');
            $$ = new Primitivo.default("last()", @1.first_line, @1.first_column)
        }
    | tk_stringTexto
        {
            produccion.push(`<EXPRESION> ::= texto`);
            accion.push('EXPRESION.Val = \"texto\"');
            $$ = new Primitivo.default($1, @1.first_line, @1.first_column)
        }
    | tk_parA EXPRESION tk_parC
        {
            produccion.push(`<EXPRESION> ::= ( <EXPRESION> )`);
            accion.push('EXPRESION.Val = EXPRESION1.Val');
            $$ = new Primitivo.default($1, @1.first_line, @1.first_column)
        };

ATRIBUTO :
    tk_asterisco 
        {
            produccion.push(`<ATRIBUTO> ::= asterisco`);
            accion.push('ATRIBUTO.Val = \"*\"'); 
            $$ = $1; 
        }
    | tk_identificador 
        {
            produccion.push(`<ATRIBUTO> ::= identificador`);
            accion.push('ATRIBUTO.Val = identificador');  
            $$ = $1 }
    | tk_node tk_parA tk_ParC 
        {
            produccion.push(`<ATRIBUTO> ::= node`);
            accion.push('ATRIBUTO.Val = \"node()\"'); 
            $$ = "node()"
        } ;