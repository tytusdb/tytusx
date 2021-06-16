%{
var ltokens = [];
var lerrors = [];
var nodos = [];
%}

%lex

%options case-sensitive
%option yylineno
%locations
%x textos

%%		
[\<][\!][\-][\-][^]*[\-][\-][\>] %{ %}
">"		             %{ltokens.push({fila: yylloc.first_line, columna: yylloc.first_column,lexema: yytext, tipo: 'Cierre Etiqueta'}); this.pushState("textos"); return 'cierraE';%}
"<"			     %{ltokens.push({fila: yylloc.first_line, columna: yylloc.first_column,lexema: yytext, tipo: 'Inicio Etiqueta'}); return 'abreE';%}
[\/]		             %{ltokens.push({fila: yylloc.first_line, columna: yylloc.first_column,lexema: yytext, tipo: 'Barra Cierre'}); return 'barraCierre';%}
"="		             %{ltokens.push({fila: yylloc.first_line, columna: yylloc.first_column,lexema: yytext, tipo: 'Operador Igual'}); return 'Oigual';%}
[\?]		             %{ltokens.push({fila: yylloc.first_line, columna: yylloc.first_column,lexema: yytext, tipo: 'Simbolo ?'}); return 'interrogacion';%}

(\")([^\"]*)(\")	     %{ltokens.push({fila: yylloc.first_line, columna: yylloc.first_column,lexema: yytext, tipo: 'Cadena'}); return 'cadena'; %}
(\')([^']*)(\')	             %{ltokens.push({fila: yylloc.first_line, columna: yylloc.first_column,lexema: yytext, tipo: 'Cadena'}); return 'cadena';%}
([a-zA-ZñÑ])[a-zA-ZñÑ0-9_-]*  %{ltokens.push({fila: yylloc.first_line, columna: yylloc.first_column,lexema: yytext, tipo: 'Identificador'}); return 'identificador';%}

[ \t\r\n\f]                      %{ %}	 


<<EOF>>           %{console.log("EOF en inicio");return 'EOF'; %}
.		  %{lerrors.push({lexema: yytext, fila: yylloc.first_line,columna: yylloc.first_column,tipo:"Lexico", desc: "Simbolo invalido"});%}
<textos>[\<][\!][\-][\-][^]*[\-][\-][\>] %{ %}
<textos>[ \t\r\n\f]                      %{ %}
<textos>"<"      %{ltokens.push({fila: yylloc.first_line, columna: yylloc.first_column,lexema: yytext, tipo: 'Inicio Etiqueta'}); this.popState(); return 'abreE'; %}
<textos><<EOF>>  %{console.log("EOF en textos");return 'EOF'; %}
<textos>[^<]*  %{ltokens.push({fila: yylloc.first_line, columna: yylloc.first_column,lexema: yytext, tipo: 'Texto'}); return 'texto'; %}

/lex

%{
// Seccion de importaciones
const {Objeto} = require("../Objetos/Objeto");
const {Tipo} = require("../Abstractas/Tipo");
%}

//Precedencia de operadores

//Start
%start S

%% 
//Producciones

S: ENCABEZADO LISTAOB EOF {nodos.push({produccion:"S -> ENCABEZADO LISTAOB EOF",regla:"return {objetos: LISTAOB.val, errores: lista, encode: ENCABEZADO.val}"}); return {Lobjetos: $2, errores: lerrors, encode:$1, repA: nodos};};

ENCABEZADO: abreE interrogacion identificador  identificador Oigual cadena identificador Oigual cadena interrogacion cierraE{nodos.push({produccion:"ENCABEZADO -> \"<?xml version =\" cadena \"encodign = \" cadena\"?\\>\"",regla:"ENCABEZADO.val = cadena2.val"}); $$ = $9.substr(1,($3.length-2));};

LISTAOB: LISTAOB OB {$1.push($2); nodos.push({produccion:"OB -> LISTAOB OB",regla:"LISTAOB1.val.push(OB.val); LISTAOB.val = LISTAOB1.val"}); $$ = $1;}
        |OB { nodos.push({produccion:"OB -> OB",regla:"LISTAOB.val = OB.val"}); $$ = [$1];}
        ;

OB: abreE identificador LISTATR cierraE LISTAOB abreE barraCierre identificador cierraE {nodos.push({produccion:"OB -> \"<\"id LISTATR \">\" LISTAOB \"<\\\"id LISTATR \">\"",regla:"OB.val = new Objeto(objeto,id.lexval,idlexval,,LISTATR.val,LISTAOB.val,line,column);"});  $$ = new Objeto(Tipo.OBJETO, $2, $8, "",$3, $5, @1.first_line, @1.first_column);}
   |abreE identificador LISTATR cierraE texto abreE barraCierre identificador cierraE {nodos.push({produccion:"OB -> \"<\"id LISTATR \">\" texto \"<\\\"id LISTATR \">\"",regla:"OB.val = new Objeto(hija,id.lexval,idlexval,texto.val,LISTATR.val,null,line,column);"}); $$ = new Objeto(Tipo.TEXTO, $2, $8, $5, $3,[], @1.first_line, @1.first_column);}
   |abreE identificador LISTATR barraCierre cierraE {nodos.push({produccion:"OB -> \"<\"id LISTATR \"/>\"",regla:"OB.val = new Objeto(unitaria,id.lexval,idlexval,,LISTATR.val,line,column);"}); $$ = new Objeto(Tipo.UNITARIA, $2, $2, "", $3, [] ,@1.first_line, @1.first_column);}
   //|error abreE {lerrors.push({lexema: yytext, fila:this._$.first_line,columna:this._$.first_column,tipo:"Sintactico", desc: $1})}
            
   ;


LISTATR: ATRIBUTOS {nodos.push({produccion:"LISTATR -> ATRIBUTOS",regla:"LISTATR.val = ATRIBUTOS.val;"}); $$ = $1;}
        | {nodos.push({produccion:"LISTATR -> epsilon",regla:"LISTATR.val= new list();"}); $$ = [];}
        ;


ATRIBUTOS: ATRIBUTOS ATRIBUTO { $1.push($2); nodos.push({produccion:"ATRIBUTOS -> ATRIBUTO",regla:"ATRIBUTOS.val= new list(ATRIBUTO.val);"});  $$ = $1; }
          |ATRIBUTO { nodos.push({produccion:"ATRIBUTOS -> ATRIBUTO",regla:"ATRIBUTOS.val= new list(ATRIBUTO.val);"}); $$ = [$1];}
          ;

ATRIBUTO: identificador Oigual cadena { nodos.push({produccion:"ATRIBUTO -> id = cadena",regla:"ATRIBUTO.val = new Atributo(id.lexval,cadena.lexval);"}); $$ = {nombre: $1,valor:$3.substr(1,($3.length-2))};};