%lex

%%
\s+            {/*espacio en blanco*/}

//------------------------------------------------------Basicos rutas xpath------------------------------------------------------



"/" {
    //console.log('Detecto diagonal');
     return 'diagonal';
}

"." {
    //console.log('Detecto punto');
     return 'punto';
}


"@" {
    //console.log('Detecto arroba');
     return 'arroba';
}

"node" {
    //console.log('Detecto node');
     return 'node';
}

"text" {
    //console.log('Detecto text');
     return 'text';
}

"last" {
    //console.log('Detecto last');
     return 'last';
}

"position" {
    //console.log('Detecto position');
     return 'position';
}



//------------------------------------------------------AXES------------------------------------------------------



"ancestor" {
    //console.log('Detecto ancestor');
     return 'ancestor';
}

"attribute" {
    //console.log('Detecto attribute');
     return 'attribute';
}

"child" {
    //console.log('Detecto child');
     return 'child';
}

"descendant" {
    //console.log('Detecto descendant');
     return 'descendant';
}

"-or-self" {
    //console.log('Detecto descendant-or-self');
     return 'or-self';
}

"following" {
    //console.log('Detecto following');
     return 'following';
}

"-sibling" {
    //console.log('Detecto following-sibling');
     return 'sibling';
}

"parent" {
    //console.log('Detecto parent');
     return 'parent';
}

"preceding" {
    //console.log('Detecto preceding');
     return 'preceding';
}

"self" {
    //console.log('Detecto self');
     return 'self';
}



//------------------------------------------------------OPERADORES------------------------------------------------------




"|" {
    //console.log('Detecto operador_o');
    return 'operador_o';
}

"+" {
    //console.log('Detecto suma');
    return 'suma';
}

"-" {
    //console.log('Detecto resta');
    return 'resta';
}

"*" {
    //console.log('Detecto multiplicacion');
    return 'multiplicacion';
}

"div" {
    //console.log('Detecto division');
    return 'division';
}

"=" {
    //console.log('Detecto igual');
    return 'igual';
}

"!=" {
    //console.log('Detecto diferente');
    return 'diferente';
}

"<" {
    //console.log('Detecto menor');
    return 'menor';
}

"<=" {
    //console.log('Detecto menor_igual');
    return 'menor_igual';
}

">" {
    //console.log('Detecto mayor');
    return 'mayor';
}

">" {
    //console.log('Detecto mayor_igual');
    return 'mayor_igual';
}

"or" {
    //console.log('Detecto or');
    return 'or';
}

"and" {
    //console.log('Detecto and');
    return 'and';
}

"mod" {
    // equivalente a %
    //console.log('Detecto mod');
    return 'mod';
}


"(" {
    //console.log('Detecto parentesis_abierto');
     return 'parentesis_abierto';
    }

")" {
    //console.log('Detecto parentesis_cerrado');
     return 'parentesis_cerrado';
    }

"[" {
    //console.log('Detecto corchete_abierto');
    return 'corchete_abierto';
    }

"]" {
    //console.log('Detecto corchete_cerrado');
     return 'corchete_cerrado';
    }

":" {
    //console.log('Detecto dos_puntos');
     return 'dos_puntos';
    }



//------------------------------------------------------EXPRESIONES------------------------------------------------------


(0|[1-9][0-9]*)(\.(0|[0-9]*[1-9](0)?))? {
    //console.log('Detecto digito');
     return 'digito';
    }

\w+  {
    //console.log('Detecto identificador');
     return 'identificador';
    }

"&&"[^\n]* {
    //console.log('Salto linea '+yytext);
}

"\""[^"\""]*"\"" {
    //console.log('string '+yytext);
    return 'string';
}

<<EOF>>   return 'eof';

.					{
    agregarErrorLexico("Lexico",yytext,yylloc.first_line,yylloc.first_column+1);
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
    : CONSULTAS_XPATH eof {
        console.log('\nexito al analizar\n');
        return $1;
    }
    | error eof {
        errores.agregarError("Sintactico","Errores seguidos"+yytext,this._$.first_line,this._$.first_column);
    }
;


CONSULTAS_XPATH
    : CONSULTAS_XPATH operador_o CONSULTA_XPATH         {$1.push($3); $$ = $1;}
    | CONSULTA_XPATH                                    {$$ = [$1]}
    | corchete_abierto error corchete_cerrado {
        errores.agregarError("Sintactico","No puede venir un predicado como un nodo\n"+yytext,this._$.first_line,this._$.first_column);
    }
    | parentesis_abierto error parentesis_cerrado {
        errores.agregarError("Sintactico","No puede venir una expresion como un nodo\n"+yytext,this._$.first_line,this._$.first_column);
    }
;

CONSULTA_XPATH
    : RELATIVA                  {$$ = [new ConsultaSimple($1)];}
    | EXPRESIONES_RUTA          {$$ = $1;}
    | PUNTOS EXPRESIONES_RUTA {
        $$= [];
        if ($1 === "punto") {
            $$.push(new ConsultaPunto());
        }
        $2.forEach(e => $$.push(e));
    }
;

EXPRESIONES_RUTA
    : EXPRESIONES_RUTA EXPRESION_RUTA       {$2.forEach(e => $1.push(e)); $$ = $1;}
    | EXPRESION_RUTA                        {$$ = $1;}
    | error operador_o {
        errores.agregarError("Sintactico","Consulta no aceptada:\n"+yytext,this._$.first_line,this._$.first_column);
    }
;

EXPRESION_RUTA
    : RELATIVA DIAGONALES ACCESORES         {
            $$ = [];
            if (!($1 === "")) {
                $$.push(new ConsultaSimple($1));
            }
            $$.push(FabricaConsulta.fabricar($2, $3.id, $3.eje));
    }
    | error identificador {
        errores.agregarError("Sintactico",yytext,this._$.first_line,this._$.first_column);
    }
;

RELATIVA :                                  {$$ = "";}
    | identificador OPCIONAL_PREDICADO      {$$ = $1;}
;

DIAGONALES
    : diagonal diagonal                     {$$ = "doble";}
    | diagonal                              {$$ = "simple";}
;

PUNTOS : punto              {$$ = "punto";}
    | punto punto           {$$ = "puntos";}
;

ACCESORES
    : ID OPCIONAL_PREDICADO             {$$ = $1;}
    | ATRIBUTO OPCIONAL_PREDICADO       {$$ = {id: $1, eje: ""};}
    | PUNTOS OPCIONAL_PREDICADO         {$$ = {id: $1, eje: ""};}
    | multiplicacion                    {$$ = {id: $1, eje: ""};}
    | NODE                              {$$ = {id: $1, eje: ""};}
    | TEXT                              {$$ = {id: $1, eje: ""};}
;

TEXT
    : text parentesis_abierto parentesis_cerrado {$$ = $1 + "()";}
;

NODE : node parentesis_abierto parentesis_cerrado {$$ = $1 + "()";}
;

ATRIBUTO
    : arroba identificador          {$$ = $1 + $2;}
    | arroba multiplicacion         {$$ = $1 + $2;}
;

ID : identificador      {$$ = {id: $1, eje: ""};}
    | EJE               {$$ = $1;}
;

EJE : EJES dos_puntos dos_puntos ACCESORES_EJE  {$$ = {id: $4, eje: $1}}
;

ACCESORES_EJE
    : identificador               {$$ = $1;}
    | NODE                        {$$ = $1;}
    | TEXT                        {$$ = $1;}
    | multiplicacion              {$$ = $1;}
;

EJES
    : ancestor                  {$$ = $1;}
    | ancestor or-self          {$$ = $1+$2;}
    | attribute                 {$$ = $1;}
    | child                     {$$ = $1;}
    | descendant or-self        {$$ = $1+$2;}
    | descendant                {$$ = $1;}
    | following                 {$$ = $1;}
    | following sibling         {$$ = $1+$2;}
    | parent                    {$$ = $1;}
    | preceding                 {$$ = $1;}
    | preceding sibling         {$$ = $1+$2;}
    | self                      {$$ = $1;}
;

OPCIONAL_PREDICADO : | PREDICADOS
;

PREDICADOS : PREDICADOS PREDICADO | PREDICADO
    | corchete_abierto error corchete_cerrado {
        errores.agregarError("Sintactico","Error en predicado\n"+yytext,this._$.first_line,this._$.first_column);
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
        errores.agregarError("Sintactico","Error dentro expresion\n"+yytext,this._$.first_line,this._$.first_column);
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
