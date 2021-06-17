/* Gramatica Ascendente de XML */

%{
    const {Entorno} = require("../xmlAST/Entorno");
    const {Simbolo} = require("../xmlAST/Simbolo");
    const {ClaseError} = require("../xmlAST/ClaseError");
    var listaErrores = [];
%}

/* lexical grammar */
%lex
%options case-insensitive


%%
\s+                                         /* skip whitespace */
[<][!][-][-][^-<]*[-][-][>]                 /*skip comments*/
"<"                                         return 'menor';
">"                                         return 'mayor';
"/"                                         return '/';
"="                                         return '=';
"?"                                         return '?';
(\"([^\"\\])*\")                            return 'dstring';
(\'([^\'\\])*\')                            return 'sstring';
([a-zA-Z_]|"á"|"é"|"í"|"ó"|"ú"|"Á"|"É"|"Í"|"Ó"|"Ú")("-"|[a-zA-Z0-9_ñÑ]|"á"|"é"|"í"|"ó"|"ú"|"Á"|"É"|"Í"|"Ó"|"Ú"|"'")*            return 'id';
(([0-9]+"."[0-9]+)|("."[0-9]+)|([0-9]+))    return 'number';
"&""l""t"";"                                return 'lessthan';
"&""g""t"";"                                return 'greaterthan';
"&""a""m""p"";"                             return 'ampersand';
"&""a""p""o""s"";"                          return 'apostrophe';
"&""q""u""o""t"";"                          return 'quotmark';
[^<> ]+                                     return 'random';
<<EOF>>               return 'EOF';

//error lexico
.                                   {
                                        console.log('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

/lex

/* Precedencia de operadores */
/*%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS*/

%start INIT

%% /* language grammar */

INIT
    :  'menor' '?' id ATRIBUTO ATRIBUTO '?' 'mayor' INTRO    
    {
        var listaErroresTemp = listaErrores;
        listaErrores = [];
        return {ast: $8, listaErrores : listaErroresTemp, encoding: $5.valor};
    }
    |  INTRO                                      
    {
        var listaErroresTemp = listaErrores;
        listaErrores = [];
        return {ast: $1, listaErrores : listaErroresTemp, encoding: ''};
    }
    ;

INTRO    
    :  INTRO NODO EOF          { $$ = $1;
                                                        }
    |  NODO CHECK               {$$ = [$1];}
    ;

CHECK
    : EOF               {}
    |                   {}
    ;

NODO
    :    'menor' id LISTAATRIBUTOS 'mayor' LISTANODOS 'menor' '/' id 'mayor'    
    {
        if($2!==$8){listaErrores.push(new ClaseError('Semantico','La etiqueta '+$2+' no esta cerrada',@1.first_line, @1.first_column));}
        $$ = new Entorno($2,'',@1.first_line, @1.first_column,$3,$5,true);
    }
    |    'menor' id LISTAATRIBUTOS 'mayor' NODOTEXTO 'menor' '/' id 'mayor'     
    {
        if($2!==$8){listaErrores.push(new ClaseError('Semantico','La etiqueta '+$2+' no esta cerrada',@1.first_line, @1.first_column));}
        $$ = new Entorno($2,$5,@1.first_line, @1.first_column,$3,[],true);
    }
    |    'menor' id LISTAATRIBUTOS '/' 'mayor'                          {$$ = new Entorno($2,'',@1.first_line, @1.first_column,$3,[],true);}
    |    'menor' id  'mayor' LISTANODOS 'menor' '/' id 'mayor'                  
    {
        if($2!==$7){listaErrores.push(new ClaseError('Semantico','La etiqueta '+$2+' no esta cerrada',@1.first_line, @1.first_column))}
        $$ = new Entorno($2,'',@1.first_line, @1.first_column,[],$4,true);
    }
    |    'menor' id  'mayor' NODOTEXTO 'menor' '/' id 'mayor'                   
    {
        if($2!==$7){listaErrores.push(new ClaseError('Semantico','La etiqueta '+$2+' no esta cerrada',@1.first_line, @1.first_column))}
        $$ = new Entorno($2,$4,@1.first_line, @1.first_column,[],[],true);
    }
    |    'menor' id  '/' 'mayor'                                        {$$ = new Entorno($2,'',@1.first_line, @1.first_column,[],[],true);}
    |    error FINDERROR                                                {listaErrores.push(new ClaseError('Sintactico','Se esperaba la definicion de una etiqueta',@1.first_line, @1.first_column))}
    ;

FINDERROR
    : 'mayor' {}
    ;


LISTANODOS
    : LISTANODOS NODO   {$1[$1.length-1].setLast(false);$2.setPos($1.length); $1.push($2); $$ = $1;}
    | NODO              {$1.setPos(0); $$ = [$1];}
    ;

LISTAATRIBUTOS
    : LISTAATRIBUTOS ATRIBUTO   {$1[$1.length-1].setLast(false); $2.setPos($1.length); $1.push($2); $$ = $1;}
    | ATRIBUTO                  {$1.setPos(0);$$ = [$1];}
    ;

ATRIBUTO
    : id '=' sstring    {$$ = new Simbolo($1, $3, @1.first_line, @1.first_column,true);}
    | id '=' dstring    {$$ = new Simbolo($1, $3, @1.first_line, @1.first_column,true);}
    ;

NODOTEXTO 
    : NODOTEXTO dstring             {$$ = $1 +" "+ $2}
    | NODOTEXTO sstring             {$$ = $1 +" "+ $2}
    | NODOTEXTO id                  {$$ = $1 +" "+ $2}
    | NODOTEXTO lessthan            {$$ = $1 +" "+ "<"}
    | NODOTEXTO greaterthan         {$$ = $1 +" "+ ">"}
    | NODOTEXTO ampersand           {$$ = $1 +" "+ "&"}
    | NODOTEXTO apostrophe          {$$ = $1 +" "+ "\'"}
    | NODOTEXTO quotmark            {$$ = $1 +" "+ "\""}
    | NODOTEXTO number              {$$ = $1 +" "+ $2}
    | NODOTEXTO random              {$$ = $1 +" "+ $2}
    | NODOTEXTO '/'                 {$$ = $1 +" "+ $2}
    | NODOTEXTO '='                 {$$ = $1 +" "+ $2}
    | dstring                       {$$ = $1}
    | sstring                       {$$ = $1}
    | id                            {$$ = $1}
    | number                        {$$ = $1}
    | lessthan                      {$$ = "<"}
    | greaterthan                   {$$ = ">"}
    | ampersand                     {$$ = "&"}
    | apostrophe                    {$$ = "\'"}
    | quotmark                      {$$ = "\""}
    | random                        {$$ = $1}
    | '/'                           {$$ = $1}
    | '='                           {$$ = $1}
    ;