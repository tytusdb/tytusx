%{
	var Optimizador = require('../app/Clases/Models/Optimizador.js')
    var optimizar = new Optimizador.Optimizador()
%}

%lex

%%

//Simbolos
("/""/".*\r\n)|("/""/".*\n)|("/""/".*\n)    /*Se ignoran comentarios unilinea*/
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]     /*Se ignoran comentarios multilinea*/
[-]?[0-9]+[.][0-9]+             	return 'decimal';
[-]?[0-9]+                      	return 'entero';
"#"     return 'numeral';
":"     return 'dospuntos';
","     return 'coma';
";"     return 'puntocoma';
"+"     return 'mas';
"-"     return 'menos';
"*"     return 'por';
"/"     return 'div';
"%"     return 'mod';
"=="    return 'igualdad';
"="     return 'igual';
"<>"    return 'diferente';
">="    return 'mayori';
"<="    return 'menori';
">"     return 'mayor';
"<"     return 'menor';
"("     return 'parizq';
")"     return 'parder';
"["     return 'corizq';
"]"     return 'corder';
"{"     return 'llaveizq';
"}"     return 'llaveder';

//Palabras Reservadas
"goto"          return 'rgoto';
"void"          return 'rvoid';
"int"           return 'rint';
"float"         return 'rfloat';
"char"          return 'rchar';
"if"            return 'rif';
"printf"        return 'rprintf';
"include"       return 'rinclude';
"return"        return 'rreturn';
"\"%i\""        return 'ri';
"\"%d\""        return 'rd';
"\"%c\""        return 'rc';

//Expresiones Regulares
[ \n\r\t]+ 							/*Se ignoran*/
[a-zA-Z]("_"|"."|[0-9A-Za-z])*      return 'id';
<<EOF>>								return 'EOF';

. { }

/lex

%start S

%%

S: IMPORTACIONES DECLARACIONES SENTENCIAS EOF   { $$ = $1 + "\n" + $2 + "\n" + $3; return {cadena:$$,reporte:optimizar}; };

IMPORTACIONES
    :IMPORTACIONES numeral rinclude menor id mayor  { $$ = $1 + $2 + $3 + " " + $4 + $5 + $6 + "\n"; }
    |numeral rinclude menor id mayor                { $$ = $1 + $2 + " " + $3 + $4 + $5 + "\n"; }
;

DECLARACIONES
    :DECLARACIONES DECLARACIONVAR   { $$ = $1 + $2; }
    |DECLARACIONVAR                 { $$ = $1; }
;

DECLARACIONVAR
    :rfloat LISTAIDENTIFICADOR puntocoma   { $$ = $1 + " " + $2 + $3 + "\n"; }
;

LISTAIDENTIFICADOR
    :LISTAIDENTIFICADOR coma id                         { $$ = $1 + $2 + " " + $3; }
    |LISTAIDENTIFICADOR coma id igual CONSTANTE         { $$ = $1 + $2 + " " + $3 + " " + $3 + " " + $4;}
    |LISTAIDENTIFICADOR coma id corizq entero corder    { $$ = $1 + $2 + " " + $3 + $4 + $5 + $6; }
    |id                                                 { $$ = $1; }
    |id igual CONSTANTE                                 { $$ = $1 + " " + $2 + " " + $3; }
    |id corizq entero corder                            { $$ = $1 + $2 + $3 + $4; }
;

SENTENCIAS
    :SENTENCIAS rvoid id parizq parder llaveizq SENTENCIA llaveder   { $$ = $1 + $2 + " " + $3 + $4 + $5 + " " + $6 + $7 + $8; }
    |rvoid id parizq parder llaveizq SENTENCIA llaveder              { $$ = $1 + " " + $2 + $3 + $4 + " " + $5 + $6 + $7 + "\n\n"; }
;

SENTENCIA
    :SENTENCIA INSTRUCCION  { $$ = $1 + $2; }
    |INSTRUCCION            { $$ = $1; }
;

INSTRUCCION
    :ASIGNACION         { $$ = "    " + $1; }
    |DEFETIQUETA        { $$ = "    " + $1; }
    |SENTENCIAIF        { $$ = "    " + $1; }
    |SENTENCIAGOTO      { $$ = "    " + $1; }
    |SENTENCIAPRINT     { $$ = "    " + $1; }
    |LLAMADA            { $$ = "    " + $1; }
    |rreturn puntocoma  { $$ = "    " + $1; }
;

ASIGNACION
    :id igual CONSTANTE OPERADOR CONSTANTE puntocoma                            { $$ = optimizar.getExpresion($1, $3, $4, $5, @1.first_line, @1.first_column); }
    |id igual OPERADOR CONSTANTE puntocoma                                      { $$ = $1 + " " + $2 + $3 + " " + $4 + $5 + "\n"; }
    |id igual CONSTANTE puntocoma                                               { $$ = $1 + " " + $2 + " " + $3 + $4 + "\n"; }
    |id igual id corizq parizq rint parder CONSTANTE corder puntocoma           { $$ = $1 + " " + $2 + " " + $3 + $4 + $5 + $6 + $7 + $8 + $9 + $10 + "\n"; }
    |id corizq parizq rint parder CONSTANTE corder igual CONSTANTE puntocoma    { $$ = $1 + $2 + $3 + $4 + $5 + $6 + $7 + " " + $8 + " " + $9 + $10 + "\n"; }
;

DEFETIQUETA
    :id dospuntos   { $$ = $1 + $2; }
;

SENTENCIAIF
    :rif parizq CONSTANTE OPERADOR CONSTANTE parder SENTENCIAGOTO SENTENCIAGOTO { $$ = optimizar.getInstruccion($3, $4, $5, $7, $8, @1.first_line, @1.first_column); }
;

SENTENCIAGOTO
    :rgoto id puntocoma { $$ = $1 + " " + $2 + $3 + "\n"; }
;

SENTENCIAPRINT
    :rprintf parizq TIPOPRINT coma parizq rchar parder CONSTANTE parder puntocoma   { $$ = $1 + $2 + $3 + $4 + " " + $5 + $6 + $7 + $8 + $9 + $10 + "\n"; }
;

LLAMADA
    :id parizq parder puntocoma { $$ = $1 + $2 + $3 + $4 + "\n"; }
;

TIPOPRINT
    :ri     { $$ = $1; }
    |rd     { $$ = $1; }
    |rc     { $$ = $1; }
;

OPERADOR
    :mas        { $$ = $1; }
    |menos      { $$ = $1; }
    |por        { $$ = $1; }
    |div        { $$ = $1; }
    |mod        { $$ = $1; }
    |menor      { $$ = $1; }
    |mayor      { $$ = $1; }
    |menori     { $$ = $1; }
    |mayori     { $$ = $1; }
    |diferente  { $$ = $1; }
    |igualdad   { $$ = $1; }
;

CONSTANTE
    :entero     { $$ = $1; }
    |decimal    { $$ = $1; }
    |id         { $$ = $1; }
;