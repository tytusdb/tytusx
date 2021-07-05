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

"parseInt" {
    //console.log('Detecto parseInt');
    return 'parseInt';
}

"toString" {
    //console.log('Detecto toString');
    return 'toString_';
}

"toUppercase"|"uppercase" {
   // console.log('Detecto toUppercase');
    return 'toUppercase';
}

"toLowercase"|"lowercase" {
    //console.log('Detecto toLowercase');
    return 'toLowercase';
}

"subString" {
    //console.log('Detecto subString');
    return 'subString';
}

"double"|"decimal"|"float" {
    //console.log('Detecto double_tipo');
    return 'double_tipo';
}

"integer" {
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

(0|[1-9][0-9]*)(\.(0|[0-9]*[1-9](0)?)) {
    ////console.log('Detecto decimal');
     return 'decimal';
    }

"." {
    console.log('Detecto punto');
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

"<=" {
    ////console.log('Detecto menor_igual');
    return 'menor_igual';
}

"<" {
    ////console.log('Detecto menor');
    return 'menor';
}


">=" {
    ////console.log('Detecto mayor_igual');
    return 'mayor_igual';
}

">" {
    ////console.log('Detecto mayor');
    return 'mayor';
}


"or" {
    ////console.log('Detecto or');
    return 'or';
}

"and" {
    ////console.log('Detecto and');
    return 'and';
}

"!" {
    ////console.log('Detecto negado');
    return 'negado';
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


(0|[1-9][0-9]*) {
    ////console.log('Detecto decimal');
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
    agregarErrorLexico("Lexico",yytext,yylloc.first_line,yylloc.first_column+1);
    //console.log("Error leixico "+yytext);
    }
/lex
%{
//metodos o atributos
let variables = [];
let funciones = [];
let ambito;
let tipoDatoGlobal;
%}
%left 'and' 'or'
%left 'igual' 'eq' 'diferente' 'ne' 'menor' 'lt' 'menor_igual' 'le' 'mayor' 'gt' 'mayor_igual' 'ge'

%left 'suma' 'resta'
%left 'multiplicacion' 'division' 'mod'
%left 'negado'
%left UMENOS

%start INIT

%%

INIT
    :  CONSULTAS_XQUERY eof {
        console.log('\nexito al analizar\n');
        $$ = {instrucciones:$1,variables:variables,funciones:funciones};
        variables = [];
        funciones = [];
        ambito = "";
        tipoDatoGlobal = "";
        return $$;
    }
    | error eof {
        console.log("Error sintatciti error eof "+$1);
        //erroresXpath.agregarError("Sintactico","//errores seguidos"+yytext,this._//$.first_line,this._//$.first_column);
        return [];
    }
;

CONSULTAS_XQUERY
    : RECURSIVA_QUERY {$$ = $1;}
    //|CONSULTAS_XPATH
;

RECURSIVA_QUERY
    : RECURSIVA_QUERY OPCIONES_QUERY    {$1.push($2.instrucciones);$$ = $1;}
    | OPCIONES_QUERY                    {$$ = [$1.instrucciones];}
;

OPCIONES_QUERY
    : ETIQUETAS_QUERY
    //| ESTRUCTURA_FOR
    | ESTRUCTURA_FUNCION            {$$ = {instrucciones:$1.instrucciones};}
    | ESTRUCTURA_LLAMADA_FUNCION    {$$ = {instrucciones:$1.expresion};}
;

ESTRUCTURA_LLAMADA_FUNCION
    : identificador dos_puntos identificador parentesis_abierto OPCIONES_PARAMETRO parentesis_cerrado OPCIONAL_NATIVA
        {
            let retornoLF = ValidacionExpresion.validaarFuncion(funciones,$3,$5);
            $$ = {expresion:ValidacionExpresion.validarNativa($7,retornoLF,true)};
            console.log("salida",$$.expresion);
        }
;

OPCIONES_PARAMETRO
    : ESTRUCTURAS_PARAMETROS_LLAMADA    {$$ = $1;}
    |                                   {$$=[]}
;

ESTRUCTURAS_PARAMETROS_LLAMADA
    : ESTRUCTURAS_PARAMETROS_LLAMADA coma ESTRUCTURA_PARAMETROS_LLAMADA     {$1.push($3);$$ = $1;}
    | ESTRUCTURA_PARAMETROS_LLAMADA                                         {$$ = [$1];}
;

ESTRUCTURA_PARAMETROS_LLAMADA
    : EXPRESION_RELACIONAL_QUERY        {$$ = $1.expresion;}
;

ESTRUCTURA_FUNCION
    : AUX_ESTRUCTURA_FUNCION CUERPO_FUNCION punto_coma {
        $1.setBloquecodigo($2.instrucciones);
        $$ = {instrucciones:$1};
    }
;

AUX_ESTRUCTURA_FUNCION
    : declare function identificador dos_puntos IDENTIFICADOR_FUNCION ESTRUCTURA_PARAMETROS OPCION_TIPO_RETORNO {
        let funcionNew = new CrearFuncion($5,$6,$7);
        funciones.push(funcionNew);
        $$ = funcionNew;
    }
;

IDENTIFICADOR_FUNCION
    : identificador {
        ambito = $1;
        $$ = $1;
    }
;

OPCION_TIPO_RETORNO
    : as identificador dos_puntos TIPOS_QUERY OPCION_INTERROGACION     {$$ = $4;tipoDatoGlobal = $$;}
    |                                                           {$$ = null;tipoDatoGlobal = $$;}
;

OPCION_INTERROGACION
    : |interrogacion
;

ESTRUCTURA_PARAMETROS
    : parentesis_abierto PARAMETROS_FUNCION parentesis_cerrado {
        $$ = $2;
    }
;

CUERPO_FUNCION
    : llave_abierta OPCIONES_BLOQUE llave_cerrada {
        $$ = $2;
    }
;

OPCIONES_BLOQUE
    :
    | EXPRESION_RELACIONAL_QUERY                                         {
            $$ = {instrucciones:[$1.expresion]};
        }
    |  DECLARACION_VARIABLE return OPCIONES_RETURN {
            $1.push($3.instrucciones);
            $$ = {instrucciones:$1};
        }
    | ESTRUCTURA_IF {
            $$ = {instrucciones:[$1.instrucciones]};
    }
;


DECLARACION_VARIABLE
    : DECLARACION_VARIABLE VARIABLE     {$1.push($2.instrucciones);$$ = $1;}
    | VARIABLE                          {$$ = [$1.instrucciones];}
;

VARIABLE
    : let identificadorXquery dos_puntos igual OPCIONES_LET {
        let variable = new Variable(0,$2,$5.expresion,ambito);
        $$ = {instrucciones:variable};
        if(variables.find(e => e.id == $2)==undefined)variables.push(variable);
    }
;

OPCIONES_LET
    : EXPRESION_RELACIONAL_QUERY              {$$ = $1;}
;

PARAMETROS_FUNCION
    : PARAMETROS_FUNCION coma PARAMETRO_FUNCION {
        $1.push($3);
        $$ = $1;
    }
    | PARAMETRO_FUNCION {
        $$ = [$1];
    }
    | {
        $$ = [];
    }
;

PARAMETRO_FUNCION
    : identificadorXquery as identificador dos_puntos TIPOS_QUERY OPCION_INTERROGACION {
        $$ = new Parametro($1,$5,ambito);
        let verificador = variables.find(e => e.id == $1 && e.ambito == ambito);
        if(verificador == undefined){
            variables.push(new Variable(0,$1,new Expresion($5,"0"),ambito));
        }else{
            console.log("error variable repetida");
        }
    }
;

TIPOS_QUERY
    : string_tipo {
        $$ = TiposDatos.STRING;
    }
    | int {
        $$ = TiposDatos.ENTERO;
    }
    | double_tipo {
        $$ = TiposDatos.DECIMAL;
    }
    | boolean {
        $$ = TipoDato.BOOLEAN;
    }
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
    : parentesis_abierto digito to digito parentesis_cerrado {
        let inicio = parseInt($2,10);
        let fin = parseInt($4,10);
        let retornoTo = " ";
        for(let i=inicio;i<=fin;i++){
            retornoTo += i+" ";
        }
        $$ = {valor:retornoTo};
    }
;

ESTRUCTURA_IF
    : if ESTRUCTURA_CONDICION then EXPRESION_RELACIONAL_QUERY OPCIONES_ELSE {
        let elseAux = new Else($5);
        $$ = {instrucciones:If.validarIf($2,$4.expresion,elseAux,tipoDatoGlobal)};
    }
;

OPCIONES_ELSE
    : else OPCIONES_RETURN                          {$$ = $2.instrucciones;}
    | else parentesis_abierto parentesis_cerrado    {$$ = null;}
;

ESTRUCTURA_CONDICION
    : parentesis_abierto EXPRESION_RELACIONAL_QUERY parentesis_cerrado {$$ = $2.expresion;}
;

ESTRUCTURA_WHERE 
    : where FILTROS_QUERY
    |
;

FILTROS_QUERY
    : FILTROS_QUERY and FILTROS_QUERY
    | FILTROS_QUERY or  FILTROS_QUERY
;


RUTAS_QUERY
    : RUTAS_QUERY DIAGONALES RUTA_WHERE
    | DIAGONALES RUTA_WHERE
;


EXPRESION_RELACIONAL_QUERY
    : EXPRESION_RELACIONAL_QUERY menor EXPRESION_RELACIONAL_QUERY                   {$$ = {expresion:ValidacionExpresion.validacion($1.expresion,tiposOperando.MENOR,$3.expresion)};}
    | EXPRESION_RELACIONAL_QUERY menor_igual EXPRESION_RELACIONAL_QUERY             {$$ = {expresion:ValidacionExpresion.validacion($1.expresion,tiposOperando.MENOR_IGUAL,$3.expresion)};}
    | EXPRESION_RELACIONAL_QUERY mayor EXPRESION_RELACIONAL_QUERY                   {$$ = {expresion:ValidacionExpresion.validacion($1.expresion,tiposOperando.MAYOR,$3.expresion)};}
    | EXPRESION_RELACIONAL_QUERY mayor_igual EXPRESION_RELACIONAL_QUERY             {$$ = {expresion:ValidacionExpresion.validacion($1.expresion,tiposOperando.MAYOR_IGUAL,$3.expresion)};}
    | EXPRESION_RELACIONAL_QUERY igual EXPRESION_RELACIONAL_QUERY                   {$$ = {expresion:ValidacionExpresion.validacion($1.expresion,tiposOperando.IGUAL,$3.expresion)};}
    | EXPRESION_RELACIONAL_QUERY diferente EXPRESION_RELACIONAL_QUERY               {$$ = {expresion:ValidacionExpresion.validacion($1.expresion,tiposOperando.DIFERENTE,$3.expresion)};}
    | EXPRESION_RELACIONAL_QUERY eq EXPRESION_RELACIONAL_QUERY                      {$$ = {expresion:ValidacionExpresion.validacion($1.expresion,tiposOperando.IGUAL,$3.expresion)};}
    | EXPRESION_RELACIONAL_QUERY ne EXPRESION_RELACIONAL_QUERY                      {$$ = {expresion:ValidacionExpresion.validacion($1.expresion,tiposOperando.DIFERENTE,$3.expresion)};}
    | EXPRESION_RELACIONAL_QUERY lt EXPRESION_RELACIONAL_QUERY                      {$$ = {expresion:ValidacionExpresion.validacion($1.expresion,tiposOperando.MENOR,$3.expresion)};}
    | EXPRESION_RELACIONAL_QUERY le EXPRESION_RELACIONAL_QUERY                      {$$ = {expresion:ValidacionExpresion.validacion($1.expresion,tiposOperando.MENOR_IGUAL,$3.expresion)};}
    | EXPRESION_RELACIONAL_QUERY gt EXPRESION_RELACIONAL_QUERY                      {$$ = {expresion:ValidacionExpresion.validacion($1.expresion,tiposOperando.MAYOR,$3.expresion)};}
    | EXPRESION_RELACIONAL_QUERY ge EXPRESION_RELACIONAL_QUERY                      {$$ = {expresion:ValidacionExpresion.validacion($1.expresion,tiposOperando.MAYOR_IGUAL,$3.expresion)};}
    | EXPRESION_RELACIONAL_QUERY multiplicacion EXPRESION_RELACIONAL_QUERY          {$$ = {expresion:ValidacionExpresion.validacion($1.expresion,tiposOperando.MULTIPLICACION,$3.expresion)};}
    | EXPRESION_RELACIONAL_QUERY division EXPRESION_RELACIONAL_QUERY                {$$ = {expresion:ValidacionExpresion.validacion($1.expresion,tiposOperando.DIVISION,$3.expresion)};}
    | EXPRESION_RELACIONAL_QUERY suma EXPRESION_RELACIONAL_QUERY                    {$$ = {expresion:ValidacionExpresion.validacion($1.expresion,tiposOperando.SUMA,$3.expresion)};}
    | EXPRESION_RELACIONAL_QUERY resta EXPRESION_RELACIONAL_QUERY                   {$$ = {expresion:ValidacionExpresion.validacion($1.expresion,tiposOperando.RESTA,$3.expresion)};}
    | EXPRESION_RELACIONAL_QUERY mod EXPRESION_RELACIONAL_QUERY                     {$$ = {expresion:ValidacionExpresion.validacion($1.expresion,tiposOperando.MOD,$3.expresion)};}
    | EXPRESION_RELACIONAL_QUERY and EXPRESION_RELACIONAL_QUERY                     {$$ = {expresion:ValidacionExpresion.validacion($1.expresion,tiposOperando.AND,$3.expresion)};}
    | EXPRESION_RELACIONAL_QUERY or EXPRESION_RELACIONAL_QUERY                      {$$ = {expresion:ValidacionExpresion.validacion($1.expresion,tiposOperando.OR,$3.expresion)};}
    | negado EXPRESION_RELACIONAL_QUERY                                             {$$ = {expresion:ValidacionExpresion.negado($2.expresion)};}
    | resta EXPRESION_RELACIONAL_QUERY %prec UMENOS                                 {$$ = {expresion:ValidacionExpresion.umenos($2.expresion)};}
    | parentesis_abierto EXPRESION_RELACIONAL_QUERY parentesis_cerrado               {$2.expresion.setValor("("+$2.expresion.valor+")");$$ = {expresion:$2.expresion};}
    | TIPOS_EXPRESION                                                               {$$ = {expresion:$1};}
;



TIPOS_EXPRESION
    : digito                                        {$$ = new Expresion(TiposDatos.ENTERO ,$1);}
    | decimal                                       {$$ = new Expresion(TiposDatos.DECIMAL ,$1);}
    | identificadorXquery OPCIONAL_NATIVA           {$$ = ValidacionExpresion.validarVariable(variables,$1,ambito,$2);}
    | string                                        {$$ = new Expresion(TiposDatos.STRING ,$1);}
    | ESTRUCTURA_LLAMADA_FUNCION                    {$$ = $1.expresion;}
    | TO                                            {$$ = new Expresion(TiposDatos.STRING ,"\""+$1.valor+"\"");}
;

OPCIONAL_NATIVA
    :                                                                           {$$ = null;}
    | punto toUppercase parentesis_abierto parentesis_cerrado                   {$$ = {tipo:tiposNativas.UPPER_CASE};}
    | punto toLowercase parentesis_abierto parentesis_cerrado                   {$$ = {tipo:tiposNativas.LOWER_CASE};}
    | punto toString_  parentesis_abierto parentesis_cerrado                    {$$ = {tipo:tiposNativas.TO_STRING};}
    | punto parseInt  parentesis_abierto parentesis_cerrado                     {$$ = {tipo:tiposNativas.TO_NUMBER};}
    | punto subString parentesis_abierto digito coma digito parentesis_cerrado  {$$ = {tipo:tiposNativas.SUB_STRING,posx:parseInt($4),posy:parseInt($6)};}
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
    | identificadorXquery
;

ESTRUCTURA_RETURN 
    : return 
    |
;

OPCIONES_RETURN
    : OPCIONES_ETIQUETA
    | data parentesis_abierto identificadorXquery OPCION_RUTA_QUERY parentesis_cerrado
    | ESTRUCTURA_IF                     {$$ = {instrucciones:$1.instrucciones};}
    | EXPRESION_RELACIONAL_QUERY        {$$ = {instrucciones:$1.expresion};}
    | identificadorXquery RUTAS_QUERY
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