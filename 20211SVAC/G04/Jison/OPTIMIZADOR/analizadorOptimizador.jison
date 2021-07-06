
%lex

%%



\s+                             //Ignorar espacios
("//"[^\n]*)|(("/*".*/"*/")"*/") {
    console.log("Comentario\n"+yytext+"\n");
    //return 'comentario';
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

"/" {
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

"<"[^<>=]*">" {
    //console.log('Detecto libreria');
     return 'libreria';
}

"<" {
    ////console.log('Detecto menor');
    return 'menor';
}

">" {
    ////console.log('Detecto mayor');
    return 'mayor';
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
    //console.log('Detecto dos_puntos');
     return 'dos_puntos';
}

";" {
    ////console.log('Detecto punto_coma');
     return 'punto_coma';
}

"," {
    //console.log('Detecto coma');
     return 'coma';
}

"#include" {
    ////console.log('Detecto include');
     return 'include';
}

"heap" {
    ////console.log('Detecto heap');
     return 'heap';
}

"stack" {
    ////console.log('Detecto stack');
     return 'stack';
}

"double" {
    console.log('Detecto double');
     return 'double';
}

"int" {
    ////console.log('Detecto int');
     return 'int';
}

"float" {
    ////console.log('Detecto float');
     return 'float';
}

"char" {
    ////console.log('Detecto char');
     return 'char';
}

"void" {
    ////console.log('Detecto void');
     return 'void';
}

"main" {
    ////console.log('Detecto main');
     return 'main';
}

"return" {
    ////console.log('Detecto return');
     return 'return';
}

"goto" {
    //console.log('Detecto goto');
     return 'goto';
}

"if" {
    //console.log('Detecto if');
     return 'if';
}

"printf" {
    //console.log('Detecto printf');
     return 'printf';
}

"\""("%c"|"%d"|"%f")"\"" {
    //console.log('Detecto tipoPrint');
     return 'tipoPrint';
}

(0|[1-9][0-9]*)(\.(0|[0-9]*[1-9](0)?))? {
    //console.log('Detecto digito '+yytext);
     return 'digito';
}

\w+                             {
    //console.log("Detecto identificador "+yytext);
    return 'identificador';
}

<<EOF>>                         { return 'EOF'; }

.                               {
                                //agregarErrorLexico("Lexico",yytext,yylloc.first_line,yylloc.first_column+1);
                                //console.log('     error lexico '+yytext);
                            }


/lex
%{
    bloqueCodigo = [];
    ignorar = [];
    function ignorarCodigoMuerto(linea){
        if(ignorar.length>0 && bloqueCodigo.length>0){
            let diferencia = bloqueCodigo.length-ignorar[0].pos;
            if(diferencia >1){
                bloqueCodigo.splice(ignorar[0].pos+1,diferencia);
                resultadoOptimizar.push({anterior:"Codigo muerto",optimizado:"De linea "+ignorar[0].linea+" a "+linea});
            }
        }
        ignorar = [];
    }
    resultadoOptimizar = [];
    let resultadoOriginal;
%}

%left 'suma' 'resta'
%left 'multiplicacion' 'division' 'mod'
%start START

%%

START
    : ENCABEZADO EOF     {
        console.log("\nexito en analisis optimizador");
        return {codigo:$1,reporte:resultadoOptimizar};
}
;

ENCABEZADO
    : LIBRERIAS HEAP_STACK HEAP_STACK DECLARACIONES CUERPOS_FUNCIONES CUERPO_MAIN{
        let resultadoOptimizado = $1+"\n"+$2+"\n"+$3+"\n"+$4+"\n"+$5+"\n"+$6;
        $$ = resultadoOptimizado;
    }
;

LIBRERIAS
    : LIBRERIAS LIBRERIA    {$$ = $1+"\n"+$2;}
    | LIBRERIA              {$$ = $1;}
;

LIBRERIA
    : include libreria      {$$ = $1 + $2;}
    | comentario            {$$ = $1;}
;

HEAP_STACK
    : double OPCION_HEAP_STACK corchete_abierto digito corchete_cerrado punto_coma {$$ = "double "+$2+"    ["+$4+"];";}
;

OPCION_HEAP_STACK
    : heap  {$$ = $1;}
    | stack {$$ = $1;}
;

DECLARACIONES
    : DECLARACIONES double DECLARACION_VARIABLES punto_coma {$$ = $1+"\ndouble "+$3+";"}
    | double DECLARACION_VARIABLES punto_coma {$$ = "double "+$2+";"}
    | comentario            {$$ = $1;}
;

DECLARACION_VARIABLES
    : DECLARACION_VARIABLES coma DECLARACION_VARIABLE {$$=$1+","+$3}
    | DECLARACION_VARIABLE {$$=$1}
;

DECLARACION_VARIABLE
    : identificador {$$=$1}
;

CUERPOS_FUNCIONES
    : CUERPOS_FUNCIONES CUERPO_FUNCION  {$$ = $1+"\n"+$2;}
    |                                   {$$ = "";}
;

CUERPO_FUNCION
    : void identificador parentesis_abierto parentesis_cerrado llave_abierta RECURSIVIDAD_BLOQUE_CODIGO return punto_coma OPCIONAL_COMENTARIO llave_cerrada
        {
            $$ = "void "+$2+" () {\n"+bloqueCodigo.join("\n")+"\n     return;"+$9+" \n}";
            resultadoOptimizar.push({anterior:"Fin optmizacion funcion "+$1,optimizado:"------"});    
            bloqueCodigo = [];
        }
    | comentario {$$ = $1;}
;

OPCIONAL_COMENTARIO
    :               {$$ = ""}
    | OPCIONAL_COMENTARIO comentario    {$$ = $1+"\n"+$2;}
;

CUERPO_MAIN
    : void main parentesis_abierto parentesis_cerrado llave_abierta RECURSIVIDAD_BLOQUE_CODIGO return punto_coma OPCIONAL_COMENTARIO llave_cerrada {
        $$ = "void main () {\n"+bloqueCodigo.join("\n")+"\n    return;"+$9+"\n}";
        resultadoOptimizar.push({anterior:"Fin optmizacion funcion main",optimizado:"------"});
        bloqueCodigo = [];
        }
;

RECURSIVIDAD_BLOQUE_CODIGO
    : RECURSIVIDAD_BLOQUE_CODIGO OPCIONES_MAIN   {
            if($2!=";"){
                //$$ = $1+"\n"+$2;
                $$ = $2;
                bloqueCodigo.push($$);
            }
            else{
                $$ = "";
            }
        }
    | OPCIONES_MAIN                     {
        if($1!=";"){
            $$ = $1;
            bloqueCodigo.push($$);            
        }
        else{
            $$ = "";
        }
    }
;

OPCIONES_MAIN
    : ASIGNACION_SIMPLE punto_coma      {$$ = $1+";";}
    | ASIGNACION_EXPRESION punto_coma   {$$ = $1+";";}
    | goto identificador punto_coma     {ignorar.push({pos:bloqueCodigo.length,linea:this._$.first_line});$$ = "goto "+$2+";";}
    | identificador dos_puntos          {ignorarCodigoMuerto(this._$.first_line);$$ = $1+":";}
    | OPTIMIZADOR_IF                    {$$ = $1;}
    | ASIGNACION_STACK                  {$$ = $1;}
    | ASIGNACION_HEAP                   {$$ = $1;}
    | ESTRUCTURA_PRINT                  {$$ = $1;}
    | identificador parentesis_abierto parentesis_cerrado punto_coma {$$ = $1+" " + $2+ $3+" " + $4;}
    | double DECLARACION_VARIABLES punto_coma        {$$ = $1+" " + $2+" " + $3;}
    | double DECLARACION_VARIABLES  igual OPCIONES_MARUFIA punto_coma {$$ = $1+" "+$2+" "+$3+" "+$4+" "+$5;}
    | return punto_coma                 {$$ = $1 + $2;}
;

OPCIONES_MARUFIA
    : heap corchete_abierto parentesis_abierto int parentesis_cerrado TIPOS_ARITMETICOS corchete_cerrado {
        $$ = $1 +" "+ $2+" " + $3+" " + $4+" " + $5+" " + $6+" " + $7;
    }
    | identificador        {$$ = $1}
    | digito {$$ = $1}
    | identificador suma digito         {$$ = $1+" "+$2+" "+$3;}
;

ESTRUCTURA_PRINT
    : printf parentesis_abierto tipoPrint coma TIPOS_PRINT parentesis_cerrado punto_coma
        {$$ = "printf("+$3+", "+$5+");"}
;

TIPOS_PRINT
    : parentesis_abierto float parentesis_cerrado NUMERICO_PRINT  {$$ = $1+" " + $2+" " + $3+" " + $4;}
    | parentesis_abierto char parentesis_cerrado NUMERICO_PRINT   {$$ = $1+" " + $2+" " + $3+" " + $4;}
    | parentesis_abierto int parentesis_cerrado NUMERICO_PRINT    {$$ = $1+" " + $2+" " + $3+" " + $4;}
    | parentesis_abierto double parentesis_cerrado NUMERICO_PRINT {$$ = $1+" " + $2+" " + $3+" " + $4;}
;

NUMERICO_PRINT
    : digito        {$$ = $1;}
    | resta digito  {$$ = $1+$2;}
    | identificador {$$ = $1;}
;

ASIGNACION_HEAP
    : heap corchete_abierto parentesis_abierto int parentesis_cerrado TIPOS_ARITMETICOS corchete_cerrado igual TIPOS_ARITMETICOS punto_coma
        {$$ = "heap[(int)"+$6+"] = "+$9+";";}
;

ASIGNACION_STACK
    : stack corchete_abierto parentesis_abierto int parentesis_cerrado TIPOS_ARITMETICOS corchete_cerrado igual TIPOS_ARITMETICOS punto_coma
        {$$ = "stack[(int)"+$6+"] = "+$9+";";}
;

ASIGNACION_SIMPLE
    : identificador igual identificador     {$$ = $1+" = "+$3;}
    | identificador igual digito            {$$ = $1+" = "+$3;}
    | identificador igual stack corchete_abierto parentesis_abierto int parentesis_cerrado TIPOS_ARITMETICOS corchete_cerrado
                                            {$$ = $1+" = stack[(int)"+$8+"]";}
    | identificador igual heap corchete_abierto parentesis_abierto int parentesis_cerrado TIPOS_ARITMETICOS corchete_cerrado
                                            {$$ = $1+" = heap[(int)"+$8+"]";}
;

ASIGNACION_EXPRESION
    : identificador igual OPTIMIZADORES_ARITMETICOS  {
        resultadoOriginal = $1+" = "+$3.valor;
        if($1 == $3.valor){
            $$ = "";
        }else{
            $$ = resultadoOriginal
        }
        if($3.original != $3.valor)resultadoOptimizar.push({anterior:$1+" = "+$3.original,optimizado:$3.valor});
        if($3.valor == $1)resultadoOptimizar.push({anterior:resultadoOriginal,optimizado:$$});
    }
;

OPTIMIZADORES_ARITMETICOS
    : OPTIMIZADOR_SUMA               {$$ = $1;}
    | OPTIMIZADOR_RESTA              {$$ = $1;}
    | OPTIMIZADOR_MULTIPLICACION     {$$ = $1;}
    | OPTIMIZADOR_DIVISION           {$$ = $1;}
;

OPTIMIZADOR_SUMA
    : TIPOS_ARITMETICOS suma TIPOS_ARITMETICOS {
        resultadoOriginal = $1+" + "+$3;
        if($1 == 0 && $3 != 0)$$ = $3;
        else if($1 != 0 && $3 == 0)$$ = $1;
        else if($1 == 0 && $3 == 0)$$ = 0;
        else $$ = resultadoOriginal;
        $$ = {original:resultadoOriginal,valor:$$};
    }
;

OPTIMIZADOR_RESTA
    : TIPOS_ARITMETICOS resta TIPOS_ARITMETICOS {
        resultadoOriginal = $1+" - "+$3;
        if($1 == 0 && $3 != 0)$$ = "-"+$3;
        else if($1 != 0 && $3 == 0)$$ = $1;
        else if($1 == 0 && $3 == 0)$$ = 0;
        else $$ = resultadoOriginal;
        $$ = {original:resultadoOriginal,valor:$$};
    }
;

OPTIMIZADOR_MULTIPLICACION
    : TIPOS_ARITMETICOS multiplicacion TIPOS_ARITMETICOS {
        resultadoOriginal = $1+" * "+$3;
        if($1 == 0 || $3 == 0)$$ = 0;
        else if($1 == 1 && $3 != 1)$$ = $3;
        else if($1 != 1 && $3 == 1)$$ = $1;
        else if($1 != 1 && $3 == 2)$$ = $1+"+"+$1;
        else if($1 == 2 && $3 != 2)$$ = $3+"+"+$3;
        else if($1 == 1 && $3 == 1)$$ = 1;
        else $$ = resultadoOriginal;
        $$ = {original:resultadoOriginal,valor:$$};
    }
;

OPTIMIZADOR_DIVISION
    : TIPOS_ARITMETICOS division TIPOS_ARITMETICOS {
        resultadoOriginal = $1+" / "+$3;
        if($1 == 0)$$ = 0;
        else if($3 == 1)$$ = $1;        
        else if($1 == 1 && $3 == 1)$$ = 1;
        else $$ = resultadoOriginal;
        $$ = {original:resultadoOriginal,valor:$$};
    } 
;

TIPOS_ARITMETICOS
    : identificador {$$ = $1;}
    | digito        {$$ = $1;}
    | resta identificador   {$$ = $1 + $2;}
    | resta digito          {$$ = $1 + $2;}
;

TIPOS_CONDICIONAL
    : identificador     {$$ ={tipo:"identificador",valor:$1};}
    | digito            {$$ ={tipo:"digito",valor:$1};}
    | resta identificador   {$$ ={tipo:"digito",valor:$1+$2};}
    | resta digito          {$$ ={tipo:"digito",valor:$1+$2};}
;

OPTIMIZADOR_IF
    : if parentesis_abierto OPCIONES_CONDICIONAL parentesis_cerrado goto identificador punto_coma goto identificador punto_coma {
        resultadoOriginal = "if ("+$3.original+") goto "+$6+"; goto "+$9+";";
        if($3.tipo == "entradaDirecta"){
            $$ = "goto "+$6+";";
            ignorar.push({pos:bloqueCodigo.length,linea:this._$.first_line});
        }
        else if($3.tipo =="salidaDirecta"){
            $$ = "goto "+$9+";";
            ignorar.push({pos:bloqueCodigo.length,linea:this._$.first_line});
        }
        else {
            $$ = "if ("+$3.contrario+") goto "+$9+";";
            resultadoOptimizar.push({anterior:resultadoOriginal,optimizado:$$});
        }
        if($3.original != $3.valor)resultadoOptimizar.push({anterior:resultadoOriginal,optimizado:$$});
    }
;

OPCIONES_CONDICIONAL
    : CONDICIONAL_MENORQ        {$$ = $1;}
    | CONDICIONAL_MAYORQ        {$$ = $1;}
    | CONDICIONAL_MENORIGUALQ   {$$ = $1;}
    | CONDICIONAL_MAYORIGUALQ   {$$ = $1;}
    | CONDICIONAL_IGUAL         {$$ = $1;}
    | CONDICIONAL_DIFERENTE     {$$ = $1;}
;

CONDICIONAL_MENORQ
    : TIPOS_CONDICIONAL menor TIPOS_CONDICIONAL {
        resultadoOriginal = $1.valor+" < "+$3.valor;
        if ($1.tipo == "digito" && $3.tipo == "digito"){
            if($1.valor < $3.valor)$$ = {contrario: " ",original:resultadoOriginal,tipo:"entradaDirecta",valor:""};
            else $$ = {contrario: " ",original:resultadoOriginal,tipo:"salidaDirecta",valor:""};
        }
        else $$ = {contrario: $1.valor+" > "+$3.valor,original:resultadoOriginal,tipo:"noAplica",valor:$1.valor+" < "+$3.valor};
    }
;

CONDICIONAL_MAYORQ
    : TIPOS_CONDICIONAL mayor TIPOS_CONDICIONAL {
        resultadoOriginal = $1.valor+" > "+$3.valor;
        if ($1.tipo == "digito" && $3.tipo == "digito"){
            if($1.valor > $3.valor)$$ = {contrario: " ",original:resultadoOriginal,tipo:"entradaDirecta",valor:""};
            else $$ = {contrario: " ",original:resultadoOriginal,tipo:"salidaDirecta",valor:""};
        }
        else $$ = {contrario: $1.valor+" < "+$3.valor,original:resultadoOriginal,tipo:"noAplica",valor:$1.valor+" > "+$3.valor};
    }
;

CONDICIONAL_MENORIGUALQ
    : TIPOS_CONDICIONAL menor igual TIPOS_CONDICIONAL {
        resultadoOriginal = $1.valor+" <= "+$4.valor;
        if ($1.tipo == "digito" && $4.tipo == "digito"){
            if($1.valor <= $4.valor)$$ = {contrario: " ",original:resultadoOriginal,tipo:"entradaDirecta",valor:""};
            else $$ = {contrario: " ",original:resultadoOriginal,tipo:"salidaDirecta",valor:""};
        }
        else $$ = {contrario: $1.valor+" >= "+$4.valor,original:resultadoOriginal,tipo:"noAplica",valor:$1.valor+" <= "+$4.valor};
    }
;

CONDICIONAL_MAYORIGUALQ
    : TIPOS_CONDICIONAL mayor igual TIPOS_CONDICIONAL {
        resultadoOriginal = $1.valor+" >= "+$4.valor;
        if ($1.tipo == "digito" && $4.tipo == "digito"){
            if($1.valor >= $4.valor)$$ = {contrario: " ",original:resultadoOriginal,tipo:"entradaDirecta",valor:""};
            else $$ = {contrario: " ",original:resultadoOriginal,tipo:"salidaDirecta",valor:""};
        }
        else $$ = {contrario: $1.valor+" <= "+$4.valor,original:resultadoOriginal,tipo:"noAplica",valor:$1.valor+" >= "+$4.valor};
    }
;

CONDICIONAL_IGUAL
    : TIPOS_CONDICIONAL igual igual TIPOS_CONDICIONAL {
        resultadoOriginal = $1.valor+" == "+$4.valor;
        if($1.valor == $4.valor)$$ = {contrario: " ",original:resultadoOriginal,tipo:"entradaDirecta",valor:""};
        else if ($1.tipo == "digito" && $4.tipo == "digito")$$ = {contrario: " ",original:resultadoOriginal,tipo:"salidaDirecta",valor:""};
        else $$ = {contrario: $1.valor+" != "+$4.valor ,original:resultadoOriginal,tipo:"noAplica",valor:$1.valor+" == "+$4.valor};
    }
;

CONDICIONAL_DIFERENTE
    : TIPOS_CONDICIONAL diferente TIPOS_CONDICIONAL {
        resultadoOriginal = $1.valor+" != "+$3.valor;
        if($1.valor == $3.valor)$$ = {contrario: " ",original:resultadoOriginal,tipo:"salidaDirecta",valor:""};
        else if ($1.tipo == "digito" && $3.tipo == "digito")$$ = {contrario: " ",original:resultadoOriginal,tipo:"entradaDirecta",valor:""};
        else $$ = {contrario: $1.valor+" == "+$3.valor ,original:resultadoOriginal,tipo:"noAplica",valor:resultadoOriginal};
    }
;