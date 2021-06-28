%lex
%options case-sensitive
%option yylineno
%locations
%x string
%%
\s+                                                                         %{ /* Omitir espacios en blanco */ %}
[\t\r]+                                                                     %{ /* Omitir saltos de linea, tabs y retornos*/ %}
"</"                                                                        return 'tk_abre_dos';
"/>"                                                                        return 'tk_cierra_dos';
"<"                                                                         return 'tk_abre';
">"                                                                         return 'tk_cierra';
"="                                                                         return 'tk_igual';
["][^"]+["]                                                                 return 'tk_cadena';
[a-zA-Z_À-ÿ\u00F1\u00D10-9]([a-zA-ZÀ-ÿ\-\.\u00F1\u00D10-9_])*               return 'tk_etiqueta';
[^<]+                                                                       return 'tk_txt';
.                                                                           {}
<<EOF>>                                                                     return 'EOF';                 //End Of File
/lex

%start INICIA

%% /* language grammar */

INICIA:   
    CONSULTA EOF                                                   {return $1;}            
;
CONSULTA
    :CONTENIDO                                                     {$$=$1;}
;
ETIQUETA_ABIERTA
    :tk_abre tk_etiqueta tk_cierra                                 {$$={nombre:$2,atributos:[]};} 
    |tk_abre tk_etiqueta ATRIBUTOS tk_cierra                       {$$={nombre:$2,atributos:$3};} 
;
ATRIBUTOS
    :ATRIBUTOS ATRIBUTO                                            {$1.unshift($2); $$=$1;}
    |ATRIBUTO                                                      {$$=[$1];}
;
ATRIBUTO
    :tk_etiqueta tk_igual tk_cadena                                {$$={nombreAtributo:$1,valorAtributo:$3};}
;
ETIQUETA_CIERRA
    :tk_abre_dos tk_etiqueta tk_cierra                             {}
;
ETIQUETA
    :ETIQUETA_ABIERTA CONTENIDO ETIQUETA_CIERRA                    {$$={etiqueta:$1,contenido:$2};}
;
CONTENIDO
    :ETIQUETA CONTENIDO                                            {$2.unshift($1);$$=$2;}
    |ETIQUETA                                                      {$$=[$1];}
    |TEXTO                                                         {$$=[$1];}
;
TEXTO
    :tk_txt TEXTO                                                  {$$=$1.toString()+" "+$2;}
    |tk_etiqueta TEXTO                                             {$$=$1.toString()+" "+$2;}
    |tk_etiqueta                                                   {$$=$1.toString();}
    |tk_txt                                                        {$$=$1.toString();}
;