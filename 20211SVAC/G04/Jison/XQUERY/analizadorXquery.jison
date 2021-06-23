%lex
tiposComillas "\"" | "'"
%%

"(:"[^:]*":)" {
    //console.log("Comentario xquery");
}



\s+            {/*espacio en blanco*/}

//------------------------------------------------------Basicos xquery-----------------------------------------------------------

"for" {
    //console.log('Detecto for');
    return 'for';
}

"in" {
    //console.log('Detecto in');
    return 'in';
}

"at" {
    //console.log('Detecto at');
    return 'at';
}

"to" {
    //console.log('Detecto to');
    return 'to';
}

"let" {
    //console.log('Detecto let');
    return 'let';
}

"if" {
    //console.log('Detecto if');
    return 'if';
}

"then" {
    //console.log('Detecto then');
    return 'then';
}

"else" {
    //console.log('Detecto else');
    return 'else';
}

"declare" {
    //console.log('Detecto declare');
    return 'declare';
}

"function" {
    //console.log('Detecto function');
    return 'function';
}

"as" {
    //console.log('Detecto as');
    return 'as';
}

"double" {
    //console.log('Detecto double');
    return 'double';
}

"int" {
    //console.log('Detecto int');
    return 'int';
}

"string" {
    //console.log('Detecto string_tipo');
    return 'string_tipo';
}

"boolean" {
    //console.log('Detecto boolean');
    return 'boolean';
}

"data" {
    //console.log('Detecto data');
    return 'data';
}

"where" {
    //console.log('Detecto where');
    return 'where';
}

"order" {
    //console.log('Detecto order');
    return 'order';
}

"by" {
    //console.log('Detecto by');
    return 'by';
}

"return" {
    //console.log('Detecto return');
    return 'return';
}

"eq" {
    //console.log('Detecto eq');
    return 'eq';
}

"ne" {
    //console.log('Detecto ne');
    return 'ne';
}

"lt" {
    //console.log('Detecto lt');
    return 'lt';
}

"le" {
    //console.log('Detecto le');
    return 'le';
}

"gt" {
    //console.log('Detecto gt');
    return 'gt';
}

"ge" {
    //console.log('Detecto ge');
    return 'ge';
}


//------------------------------------------------------Basicos rutas xpath------------------------------------------------------


"/" {
    ////console.log('Detecto diagonal');
     return 'diagonal';
}

"." {
    ////console.log('Detecto punto');
     return 'punto';
}

"," {
    ////console.log('Detecto coma');
     return 'coma';
}

"@" {
    ////console.log('Detecto arroba');
     return 'arroba';
}

"node" {
    ////console.log('Detecto node');
     return 'node';
}

"text" {
    ////console.log('Detecto text');
     return 'text';
}

"last" {
    ////console.log('Detecto last');
     return 'last';
}

"position" {
    ////console.log('Detecto position');
     return 'position';
}



//------------------------------------------------------AXES------------------------------------------------------



"ancestor" {
    ////console.log('Detecto ancestor');
     return 'ancestor';
}

"attribute" {
    ////console.log('Detecto attribute');
     return 'attribute';
}

"child" {
    ////console.log('Detecto child');
     return 'child';
}

"descendant" {
    ////console.log('Detecto descendant');
     return 'descendant';
}

"-or-self" {
    ////console.log('Detecto descendant-or-self');
     return 'or-self';
}

"following" {
    ////console.log('Detecto following');
     return 'following';
}

"-sibling" {
    ////console.log('Detecto following-sibling');
     return 'sibling';
}

"parent" {
    ////console.log('Detecto parent');
     return 'parent';
}

"preceding" {
    ////console.log('Detecto preceding');
     return 'preceding';
}

"self" {
    ////console.log('Detecto self');
     return 'self';
}



//------------------------------------------------------OPERADORES------------------------------------------------------




"|" {
    ////console.log('Detecto operador_o');
    return 'operador_o';
}

"+" {
    ////console.log('Detecto suma');
    return 'suma';
}

"-" {
    ////console.log('Detecto resta');
    return 'resta';
}

"*" {
    ////console.log('Detecto multiplicacion');
    return 'multiplicacion';
}

"div" {
    ////console.log('Detecto division');
    return 'division';
}

"=" {
    ////console.log('Detecto igual');
    return 'igual';
}

"!=" {
    ////console.log('Detecto diferente');
    return 'diferente';
}

"<" {
    ////console.log('Detecto menor');
    return 'menor';
}

"<=" {
    ////console.log('Detecto menor_igual');
    return 'menor_igual';
}

">" {
    ////console.log('Detecto mayor');
    return 'mayor';
}

">" {
    ////console.log('Detecto mayor_igual');
    return 'mayor_igual';
}

"or" {
    ////console.log('Detecto or');
    return 'or';
}

"and" {
    ////console.log('Detecto and');
    return 'and';
}

"mod" {
    // equivalente a %
    ////console.log('Detecto mod');
    return 'mod';
}

"{" {
    ////console.log('Detecto llave_abierta');
     return 'llave_abierta';
    }

"}" {
    ////console.log('Detecto llave_cerrada');
     return 'llave_cerrada';
    }

"(" {
    ////console.log('Detecto parentesis_abierto');
     return 'parentesis_abierto';
    }

")" {
    ////console.log('Detecto parentesis_cerrado');
     return 'parentesis_cerrado';
    }

"[" {
    ////console.log('Detecto corchete_abierto');
    return 'corchete_abierto';
    }

"]" {
    ////console.log('Detecto corchete_cerrado');
     return 'corchete_cerrado';
    }

":" {
    ////console.log('Detecto dos_puntos');
     return 'dos_puntos';
    }

";" {
    ////console.log('Detecto punto_coma');
     return 'punto_coma';
    }

"?" {
    ////console.log('Detecto interrogacion');
     return 'interrogacion';
    }




//------------------------------------------------------EXPRESIONES------------------------------------------------------


(0|[1-9][0-9]*)(\.(0|[0-9]*[1-9](0)?))? {
    ////console.log('Detecto digito');
     return 'digito';
    }

"$"\w+  {
    //console.log('Detecto identificador xquery');
     return 'identificadorXquery';
    }

\w+  {
    ////console.log('Detecto identificador');
     return 'identificador';
    }


{tiposComillas}[^"\"{}"]*{tiposComillas} {
    //console.log('string '+yytext);
    return 'string';
}

{tiposComillas} {
    //console.log('Detecto comillas');
     return 'comillas';
    }

<<EOF>>   return 'eof';

.					{
    //agregarErrorLexico("Lexico",yytext,yylloc.first_line,yylloc.first_column+1);
    console.log("Error leixico "+yytext);
    }
/lex
%{
//metodos o atributos
%}

%left 'suma' 'resta'
%left 'multiplicacion' 'division' 'mod'

%left 'igual' 'diferente' 'menor' 'menor_igual' 'mayor' 'mayor_igual'
%left 'or' 'and'

%start INIT

%%

INIT
    : CONSULTAS_XQUERY eof {
        console.log('\nexito al analizar\n');
        //return //$1;
    }
    | error eof {
        console.log("Error sintatciti error eof "+$1);
        //erroresXpath.agregarError("Sintactico","//errores seguidos"+yytext,this._//$.first_line,this._//$.first_column);
        return [];
    }
;

CONSULTAS_XQUERY 
    : CONSULTAS_XPATH
    | ESTRUCTURA_LLAMADA_FUNCION
    | RECURSIVA_QUERY
;

RECURSIVA_QUERY
    : RECURSIVA_QUERY OPCIONES_QUERY
    | OPCIONES_QUERY
;

OPCIONES_QUERY
    : ESTRUCTURA_FOR
    | ETIQUETAS_QUERY
    | ESTRUCTURA_FUNCION
;

ESTRUCTURA_LLAMADA_FUNCION
    : identificador dos_puntos identificador parentesis_abierto ESTRUCTURAS_PARAMETROS_LLAMADA parentesis_cerrado
;

ESTRUCTURAS_PARAMETROS_LLAMADA
    : ESTRUCTURAS_PARAMETROS_LLAMADA coma ESTRUCTURA_PARAMETROS_LLAMADA
    | ESTRUCTURA_PARAMETROS_LLAMADA
;

ESTRUCTURA_PARAMETROS_LLAMADA
    : identificadorXquery
    | identificadorXquery RUTAS_QUERY
;

ESTRUCTURA_FUNCION
    : declare function identificador dos_puntos identificador ESTRUCTURA_PARAMETROS as identificador dos_puntos TIPOS_QUERY interrogacion CUERPO_FUNCION punto_coma
;

ESTRUCTURA_PARAMETROS
    : parentesis_abierto PARAMETROS_FUNCION parentesis_cerrado
;

CUERPO_FUNCION
    : llave_abierta BLOQUES_CODIGO llave_cerrada 
;

BLOQUES_CODIGO
    : BLOQUES_CODIGO BLOQUE_CODIGO
    | BLOQUE_CODIGO
;

BLOQUE_CODIGO
    : EXPRESION_SIMPLE
    | let identificadorXquery dos_puntos igual OPCIONES_LET
    | return EXPRESION_SIMPLE
;

OPCIONES_LET
    : EXPRESION_SIMPLE
    | TO
;

PARAMETROS_FUNCION
    : PARAMETROS_FUNCION coma PARAMETRO_FUNCION
    | PARAMETRO_FUNCION
;

PARAMETRO_FUNCION
    : identificadorXquery as identificador dos_puntos TIPOS_QUERY interrogacion
;

TIPOS_QUERY
    : string_tipo
    | int
    | double
    | boolean
;

ETIQUETAS_QUERY
    : menor ID_ETIQUETA ATRIBUTOS_ETIQUETA mayor DENTRO_ETIQUETA_QUERY menor diagonal ID_ETIQUETA mayor
;

DENTRO_ETIQUETA_QUERY
    : DENTRO_ETIQUETA_QUERY ETIQUETAS_QUERY
    | ETIQUETAS_QUERY
    | llave_abierta ESTRUCTURA_FOR llave_cerrada
    | identificador
    
;

ESTRUCTURA_FOR
    : for RECURSIVA_FOR
;

RECURSIVA_FOR 
    : FOR 
    | RECURSIVA_FOR FOR
;

FOR 
    : OPCION_AT in OPCIONES_FOR ESTRUCTURA_WHERE ESTRUCTURA_ORDER_BY ESTRUCTURA_RETURN
;


OPCION_AT 
    : identificadorXquery
    | identificadorXquery at identificadorXquery
;

OPCIONES_FOR 
    : CONSULTAS_XPATH
    | TO
    | parentesis_abierto digito coma digito parentesis_cerrado
;

TO 
    : parentesis_abierto digito to digito parentesis_cerrado
;

ESTRUCTURA_IF
    : if ESTRUCTURA_CONDICION then OPCIONES_RETURN OPCIONES_ELSE
;

OPCIONES_ELSE
    : else OPCIONES_RETURN
    | else parentesis_abierto parentesis_cerrado
;

ESTRUCTURA_CONDICION
    : parentesis_abierto FILTROS_QUERY parentesis_cerrado
;

ESTRUCTURA_WHERE 
    : where FILTROS_QUERY
    |
;

FILTROS_QUERY
    : FILTROS_QUERY and FILTROS_QUERY
    | FILTROS_QUERY or  FILTROS_QUERY
    | FILTRO_QUERY
;

FILTRO_QUERY
    : identificadorXquery RUTAS_QUERY EXPRESION_RELACIONAL_QUERY
;

RUTAS_QUERY
    : RUTAS_QUERY DIAGONALES RUTA_WHERE
    | DIAGONALES RUTA_WHERE
;


EXPRESION_RELACIONAL_QUERY
    : menor EXPRESION_SIMPLE
    | menor_igual EXPRESION_SIMPLE
    | mayor EXPRESION_SIMPLE
    | mayor_igual EXPRESION_SIMPLE
    | igual EXPRESION_SIMPLE
    | diferente EXPRESION_SIMPLE
    | eq EXPRESION_SIMPLE
    | ne EXPRESION_SIMPLE
    | lt EXPRESION_SIMPLE
    | le EXPRESION_SIMPLE
    | gt EXPRESION_SIMPLE
    | ge EXPRESION_SIMPLE
;

EXPRESION_SIMPLE
    : EXPRESION_SIMPLE multiplicacion EXPRESION_SIMPLE
    | EXPRESION_SIMPLE division EXPRESION_SIMPLE
    | EXPRESION_SIMPLE suma EXPRESION_SIMPLE
    | EXPRESION_SIMPLE resta EXPRESION_SIMPLE
    | EXPRESION_SIMPLE mod EXPRESION_SIMPLE
    | parentesis_abierto EXPRESION_SIMPLE parentesis_cerrado
    | digito
    | identificador
    | string
    | identificadorXquery
;

RUTA_WHERE
    : identificador
    | ATRIBUTO
    | PUNTOS
    | NODE
    | TEXT
;


ESTRUCTURA_ORDER_BY
    : order by OPCIONES_ORDER_BY
    |
;

OPCIONES_ORDER_BY
    : OPCION_ORDER_BY
    | OPCIONES_ORDER_BY coma OPCION_ORDER_BY
;

OPCION_ORDER_BY
    : identificadorXquery RUTAS_QUERY
;

ESTRUCTURA_RETURN 
    : return OPCIONES_RETURN
    |
;

OPCIONES_RETURN
    : OPCIONES_ETIQUETA
    | identificadorXquery
    | identificadorXquery RUTAS_QUERY
    | data parentesis_abierto identificadorXquery OPCION_RUTA_QUERY parentesis_cerrado
    | ESTRUCTURA_IF
;

OPCIONES_ETIQUETA
    : menor ID_ETIQUETA ATRIBUTOS_ETIQUETA mayor menor diagonal ID_ETIQUETA mayor
    | menor ID_ETIQUETA ATRIBUTOS_ETIQUETA mayor DENTRO_ETIQUETA menor diagonal ID_ETIQUETA mayor
;


ID_ETIQUETA
    : EJES
    | TIPOS_QUERY
    | if
    | then
    | else
    | for
    | in
    | at
    | to
    | let    
    | declare
    | function
    | as
    | where
    | order
    | by
    | return
    | eq
    | ne
    | lt
    | le
    | gt
    | ge
    | node
    | text
    | last
    | position
    | and
    | mod
    | or
    | div 
    | identificador
;

ATRIBUTOS_ETIQUETA
    : ATRIBUTOS_ETIQUETA ATRIBUTO_ETIQUETA
    | 
;

ATRIBUTO_ETIQUETA
    : identificador igual TIPO_ATRIBUTO
;

TIPO_ATRIBUTO
    : string
    | comillas OPCION_ETIQUETA comillas 
;

DENTRO_ETIQUETA
    : OPCION_ETIQUETA
    | DENTRO_ETIQUETA OPCION_ETIQUETA
    | DENTRO_ETIQUETA OPCIONES_ETIQUETA
    | OPCIONES_ETIQUETA
;

OPCION_ETIQUETA
    : identificador
    | llave_abierta identificadorXquery llave_cerrada
    | llave_abierta data parentesis_abierto identificadorXquery OPCION_RUTA_QUERY parentesis_cerrado llave_cerrada
    | llave_abierta ESTRUCTURA_LLAMADA_FUNCION llave_cerrada
;

OPCION_RUTA_QUERY
    : RUTAS_QUERY
    |
;
CONSULTAS_XPATH
    : CONSULTA_XPATH                                    {
        //$//$ = [//$1];
        }
    | corchete_abierto error corchete_cerrado {
        //$//$ = [];
        //erroresXpath.agregarError("Sintactico","No puede venir un predicado como un nodo\n"+yytext,this._//$.first_line,this._//$.first_column);
        console.log("Error sintatciti "+$2);
    }
    | parentesis_abierto error parentesis_cerrado {
        //$//$ = [];
        //erroresXpath.agregarError("Sintactico","No puede venir una expresion como un nodo\n"+yytext,this._//$.first_line,this._//$.first_column);
        console.log("Error sintatciti "+$2);
    }
;

CONSULTA_XPATH
    : RELATIVA                  {
        //$//$ = [new ConsultaSimple(//$1)];
        }
    | EXPRESIONES_RUTA          {
        //$//$ = //$1;
        }
    | PUNTOS EXPRESIONES_RUTA {
        //$//$= [];
        //if (//$1 === "punto") {
            //$//$.push(new ConsultaPunto());
        //}
        //$2.forEach(e => //$//$.push(e));
    }
;

EXPRESIONES_RUTA
    : EXPRESIONES_RUTA EXPRESION_RUTA       {
        ////$2.forEach(e => //$1.push(e)); //$//$ = //$1;
        }
    | EXPRESION_RUTA                        {
        //$//$ = //$1;
        }
    | error operador_o {
        console.log("Error sintatciti "+$1);
        //$//$ = [];
        //erroresXpath.agregarError("Sintactico","Consulta no aceptada:\n"+yytext,this._//$.first_line,this._//$.first_column);
    }
;

EXPRESION_RUTA
    : RELATIVA DIAGONALES ACCESORES         {
            //$//$ = [];
            //if (!(//$1 === "")) {
                //$//$.push(new ConsultaSimple(//$1));
            //}
            //$//$.push(FabricaConsulta.fabricar(//$2, //$3.id, //$3.eje));
    }
    | error identificador {
        console.log("Error sintatciti "+$1);
        //erroresXpath.agregarError("Sintactico",yytext,this._//$.first_line,this._//$.first_column);
        //$//$ = [];
    }
;

RELATIVA :                                  {
        //$//$ = "";
    }
    | identificador OPCIONAL_PREDICADO      {
        //$//$ = //$1;
    }
;

DIAGONALES
    : diagonal diagonal                     {
        //$//$ = "doble";
    }
    | diagonal                              {
        //$//$ = "simple";
    }
;

PUNTOS : punto              {
        //$//$ = "punto";
    }
    | punto punto           {
        //$//$ = "puntos";
    }
;

ACCESORES
    : ID OPCIONAL_PREDICADO             {
        //$//$ = //$1;
    }
    | ATRIBUTO OPCIONAL_PREDICADO       {
        //$//$ = {id: //$1, eje: ""};
    }
    | PUNTOS OPCIONAL_PREDICADO         {
        //$//$ = {id: //$1, eje: ""};
    }
    | multiplicacion                    {
        //$//$ = {id: //$1, eje: ""};
    }
    | NODE                              {
        //$//$ = {id: //$1, eje: ""};
    }
    | TEXT                              {
        //$//$ = {id: //$1, eje: ""};
    }
;

TEXT
    : text parentesis_abierto parentesis_cerrado {
        //$//$ = //$1 + "()";
    }
;

NODE : node parentesis_abierto parentesis_cerrado {
        //$//$ = //$1 + "()";
    }
;

ATRIBUTO
    : arroba identificador          {
        //$//$ = //$1 + //$2;
    }
    | arroba multiplicacion         {
        //$//$ = //$1 + //$2;
    }
;

ID : identificador      {
        //$//$ = {id: //$1, eje: ""};
    }
    | EJE               {
        //$//$ = //$1;
    }
;

EJE : EJES dos_puntos dos_puntos ACCESORES_EJE  {
        //$//$ = {id: //$4, eje: //$1}
        }
;

ACCESORES_EJE
    : identificador               {
        //$//$ = //$1;
    }
    | NODE                        {
        //$//$ = //$1;
    }
    | TEXT                        {
        //$//$ = //$1;
    }
    | multiplicacion              {
        //$//$ = //$1;
    }
;

EJES
    : ancestor                  {
        //$//$ = //$1;
    }
    | ancestor or-self          {
        //$//$ = //$1+//$2;
    }
    | attribute                 {
        //$//$ = //$1;
    }
    | child                     {
        //$//$ = //$1;
    }
    | descendant or-self        {
        //$//$ = //$1+//$2;
    }
    | descendant                {
        //$//$ = //$1;
    }
    | following                 {
        //$//$ = //$1;
    }
    | following sibling         {
        //$//$ = //$1+//$2;
    }
    | parent                    {
        //$//$ = //$1;
    }
    | preceding                 {
        //$//$ = //$1;
    }
    | preceding sibling         {
        //$//$ = //$1+//$2;
    }
    | self                      {
        //$//$ = //$1;
    }
;

OPCIONAL_PREDICADO : | PREDICADOS
;

PREDICADOS : PREDICADOS PREDICADO | PREDICADO
    | corchete_abierto error corchete_cerrado {
        console.log("Error sintatciti "+$2);
        //erroresXpath.agregarError("Sintactico","Error en predicado\n"+yytext,this._//$.first_line,this._//$.first_column);
    }
;

PREDICADO : corchete_abierto FILTRO corchete_cerrado 
;

FILTRO
    : EXPR igual EXPR
    | EXPR diferente EXPR
    | EXPR mayor EXPR
    | EXPR menor EXPR
    | EXPR mayor_igual EXPR
    | EXPR menor_igual EXPR
    | FILTRO and FILTRO
    | FILTRO or FILTRO
    | EJE OPCIONAL_PREDICADO
    | EXPR    
;

EXPR
    : EXPR suma EXPR
    | EXPR resta EXPR
    | EXPR multiplicacion EXPR
    | EXPR division EXPR
    | EXPR mod EXPR
    | parentesis_abierto EXPR parentesis_cerrado
    | TIPOS
    | parentesis_abierto error parentesis_cerrado {
        console.log("Error sintatciti "+$2);
        //erroresXpath.agregarError("Sintactico","Error dentro expresion\n"+yytext,this._//$.first_line,this._//$.first_column);
    }
;

TIPOS : string
    | digito
    | ATRIBUTO
    | PUNTOS
    | CONSULTA_XPATH    
    | last parentesis_abierto parentesis_cerrado
    | position parentesis_abierto parentesis_cerrado
    | TEXT
;