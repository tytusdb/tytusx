%lex
tiposComillas "\"" | "'"
%%

"#"[^\n]+ {
}



\s+            {/*espacio en blanco*/}

//------------------------------------------------------Basicos xquery-----------------------------------------------------------

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

"double"|"decimal"|"float" {
    return 'double_tipo';
}

"integer" {
    return 'int';
}

"string" {
    return 'string_tipo';
}

"boolean" {
    return 'boolean';
}

"return" {
    //console.log('Detecto return');
    return 'return';
}

"eq" {
    return 'eq';
}

"ne" {
    return 'ne';
}

"lt" {
    return 'lt';
}

"le" {
    return 'le';
}

"gt" {
    return 'gt';
}

"ge" {
    return 'ge';
}


//------------------------------------------------------Basicos rutas xpath------------------------------------------------------


"/" {
     return 'diagonal';
}

(0|[1-9][0-9]*)(\.(0|[0-9]*[1-9](0)?)) {
     return 'decimal';
    }

"." {
     return 'punto';
}

"," {
     return 'coma';
}

//------------------------------------------------------OPERADORES------------------------------------------------------

"|" {
    return 'operador_o';
}

"+" {
    return 'suma';
}

"-" {
    return 'resta';
}

"*" {
    return 'multiplicacion';
}

"div" {
    return 'division';
}

"=" {
    return 'igual';
}

"!=" {
    return 'diferente';
}

"!" {
    return 'negacion';
}

"<=" {
    return 'menor_igual';
}

"<" {
    return 'menor';
}

">=" {
    return 'mayor_igual';
}

">" {
    return 'mayor';
}

"or" {
    return 'or';
}

"and" {
    return 'and';
}

"mod" {
    // equivalente a %
    return 'mod';
}

"{" {
     return 'llave_abierta';
    }

"}" {
     return 'llave_cerrada';
    }

"(" {
     return 'parentesis_abierto';
    }

")" {
     return 'parentesis_cerrado';
    }

"[" {
    return 'corchete_abierto';
    }

"]" {
     return 'corchete_cerrado';
    }

":" {
     return 'dos_puntos';
    }

";" {
     return 'punto_coma';
    }

"?" {
     return 'interrogacion';
    }




//------------------------------------------------------EXPRESIONES------------------------------------------------------


(0|[1-9][0-9]*) {
    return 'digito';
}

"$"\w+  {
     return 'identificadorXquery';
    }

\w+  {
     return 'identificador';
    }


{tiposComillas}[^"\"{}"]*{tiposComillas} {
    return 'string';
}

{tiposComillas} {
     return 'comillas';
    }

<<EOF>>   return 'eof';

.					{
        console.log("error lexico detectado "+yytext);

    //agregarErrorLexico("Lexico",yytext,yylloc.first_line,yylloc.first_column+1);
    }
/lex

%{
    let t = 0;
    let s = 0;
    let l = 0;
    let code = new Array();
    let temp = (i) => {return `t${i}`};
    let tag = (i) => {return `L${i}`};
    let heap = (i) => {return `heap[(int)${i}]`};
    let stack = (i) => {return `stack[(int)${i}]`};
    let vars = new Array();
    let ambito = "";
%}


%left 'and' 'or'
%left 'igual' 'diferente' 'menor' 'menor_igual' 'mayor' 'mayor_igual'
%left 'eq' 'ne' 'lt' 'le' 'gt' 'ge'
%left 'suma' 'resta'
%left 'multiplicacion' 'division' 'mod'
%left 'negacion'
%left UMENOS



%start INIT

%%

INIT
    : OPTIONS eof      {
        console.log("\nAnalisis finalizado correctamente")
        console.log($1);
        console.log(vars);
        $$ = {code: $1.code, main: $1.main, t: t, s: s, l: l};
        t=0;l=0;s=0;
        return $$;
        }
;

OPTIONS
    : DECLARACION_FUNCIONES ESTRUCTURA_LLAMADA_FUNCION      {$$ = {code: `${$1.code}`, main:`${$2.code}`}}
    | DECLARACION_FUNCIONES                                 {$$ = {code: $1};}
;

DECLARACION_FUNCIONES
    : DECLARACION_FUNCIONES ESTRUCTURA_FUNCION      {$$ = {code: `${$1.code}${$2.code}`};}
    | ESTRUCTURA_FUNCION                            {$$ = $1;}
;

ESTRUCTURA_FUNCION
    : AUX_ESTRUCTURA_FUNCION CUERPO_FUNCION punto_coma {
        code = new Array();
        //code.push(`\n//Declarando funcion ${$1.id}\n`);
        code.push(`void ${$1.id}() {`);

        let aux = new Array();
        aux.push("double");
        for (let i = 0; i < t; i++) {
            aux.push(` t${i}`);
            aux.push(",");
        }
        aux.pop();
        aux.push(";");
        code.push(aux.join(""));

        code.push(`${temp(t)} = P + 1;`);
        $1.params.forEach(p => {
            let varXquery = vars.find(e => e.id === p && e.ambito === ambito);
            code.push(`${temp(t+1)} = ${stack(temp(t))};`);
            code.push(`${stack(varXquery.sp)} = ${temp(t+1)};`);
            code.push(`${temp(t)} = ${temp(t)} + 1;`);
        });
        code.pop();
        code.push(`${$2.code}`);
        code.push(`return;\n}`);
        t+=2;
        $$ = {code: code.join("\n")};
    }
;

AUX_ESTRUCTURA_FUNCION
    : declare function identificador dos_puntos IDENTIFICADOR_FUNCION ESTRUCTURA_PARAMETROS OPCION_TIPO_RETORNO {$$ = {id: $5, params: $6};}
;

CUERPO_FUNCION
    : llave_abierta OPCIONES_BLOQUE llave_cerrada {$$ = $2;}
;

OPCIONES_BLOQUE
    :                                                   {$$ = {code: ""};}
    | EXPRESION_OPTIONS                                 {$$ = {val: $1.val, code: `${$1.code}${stack('P')} = ${$1.val};\n`};}
    | DECLARACION_VARIABLE return OPCIONES_RETURN       {$$ = {code: `${$1.code}${$3.code}\n`};}
    | ESTRUCTURA_IF                                     {$$ = $1;}
;

IDENTIFICADOR_FUNCION
    : identificador {
        ambito = $1;
        $$ = $1;
    }
;

OPCION_TIPO_RETORNO
    : as identificador dos_puntos TIPOS_QUERY OPCION_INTERROGACION
    |
;

OPCION_INTERROGACION
    : |interrogacion
;

ESTRUCTURA_PARAMETROS
    : parentesis_abierto PARAMETROS_FUNCION parentesis_cerrado  {$$ = $2;}
;

PARAMETROS_FUNCION
    : PARAMETROS_FUNCION coma PARAMETRO_FUNCION     {$1.push($3); $$ = $1;}
    | PARAMETRO_FUNCION                             {$$ = [$1];}
    |                                               {$$ = [];}
;

PARAMETRO_FUNCION
    : identificadorXquery as identificador dos_puntos TIPOS_QUERY OPCION_INTERROGACION {
        vars.push({id: $1, ambito: ambito, sp: s++});
        $$ = $1;
    }
;

TIPOS_QUERY
    : string_tipo
    | int
    | double_tipo
    | boolean
;

DECLARACION_VARIABLE
    : DECLARACION_VARIABLE VARIABLE     {$$ = {code: `${$1.code}${$2.code}`};}
    | VARIABLE                          {$$ = $1;}
;

VARIABLE
    : let identificadorXquery dos_puntos igual EXPRESION_OPTIONS {
        vars.push({id: $2, ambito: ambito, sp: s});
        code = new Array();
        code.push(`\n//Declarando variable\n`);
        code.push(`${$5.code}`);
        code.push(`${stack(s++)} = ${$5.val};`);
        $$ = {code: `${code.join("\n")}\n`};
    }
;

ESTRUCTURA_IF
    : if ESTRUCTURA_CONDICION then EXPRESION_OPTIONS else OPCIONES_RETURN {
        //$$ = {code: `${$2.code}${$2.true}${($4.code === "")? $4.val : $4.code}\n${stack('P')} = ${$4.val};\ngoto ${tag(l)};\n${$2.false}${($6.code === "")? $6.val : $6.code}\n${stack('P')} = ${$6.val};\n${tag(l++)}:\n`};
        code = new Array();
        code.push(`${$2.code}`);
        code.push(`${$2.true}`);
        code.push(`${($4.code === "")? $4.val : $4.code}\n`);
        code.push(`${stack('P')} = ${$4.val};`);
        code.push(`\ngoto ${tag(l)};\n`);
        code.push(`${$2.false}`);
        code.push(`${($6.code === "")? $6.val : $6.code}\n`);
        if ($6.val != undefined) code.push(`${stack('P')} = ${$6.val};\n`);
        code.push(`${tag(l++)}:\n`);
        $$ = {code: code.join("")};
    }
;

ESTRUCTURA_CONDICION
    : parentesis_abierto BOOLEAN_EXPRESION parentesis_cerrado   {$$ = $2;}
;

OPCIONES_RETURN
    : ESTRUCTURA_IF                             {$$ = $1;}
    | EXPRESION_OPTIONS                         {$$ = {val: $1.val, code: `${$1.code}${stack('P')} = ${$1.val};\n`};}
    | parentesis_abierto parentesis_cerrado     {$$ = {code: ""}}
;

EXPRESION_OPTIONS
    : BOOLEAN_EXPRESION         {$$ = $1;}
    | EXPRESION                 {$$ = {val:$1.val, code: `${$1.code}\n`};}
;

BOOLEAN_EXPRESION
    : BOOLEAN_EXPRESION and BOOLEAN_EXPRESION                   {$$ = {true: `${$3.true}`,   false: `${$1.false}${$3.false}`, code: `${$1.code}${$1.true}${$3.code}\n`}}
    | BOOLEAN_EXPRESION or BOOLEAN_EXPRESION                    {$$ = {true: `${$3.true}`,   false: `${$3.false}`, code: `${$1.code}${$1.true}goto ${$3.true.replace(':', ';')}${$1.false}${$3.code}\n`}}
    | negacion BOOLEAN_EXPRESION                                {$$ = {true: `${$2.false}`,  false: `${$2.true}`, code: `${$2.code}\n`}}
    | EXPRESION menor EXPRESION                                 {$$ = {true: `${tag(l)}:\n`, false: `${tag(l+1)}:\n`, code: `${$1.code}${$3.code}if (${$1.val} <  ${$3.val}) goto ${tag(l)};\ngoto ${tag(l+1)};\n`};l+=2;}
    | EXPRESION menor_igual EXPRESION                           {$$ = {true: `${tag(l)}:\n`, false: `${tag(l+1)}:\n`, code: `${$1.code}${$3.code}if (${$1.val} <= ${$3.val}) goto ${tag(l)};\ngoto ${tag(l+1)};\n`};l+=2;}
    | EXPRESION mayor EXPRESION                                 {$$ = {true: `${tag(l)}:\n`, false: `${tag(l+1)}:\n`, code: `${$1.code}${$3.code}if (${$1.val} >  ${$3.val}) goto ${tag(l)};\ngoto ${tag(l+1)};\n`};l+=2;}
    | EXPRESION mayor_igual EXPRESION                           {$$ = {true: `${tag(l)}:\n`, false: `${tag(l+1)}:\n`, code: `${$1.code}${$3.code}if (${$1.val} >= ${$3.val}) goto ${tag(l)};\ngoto ${tag(l+1)};\n`};l+=2;}
    | EXPRESION igual EXPRESION                                 {$$ = {true: `${tag(l)}:\n`, false: `${tag(l+1)}:\n`, code: `${$1.code}${$3.code}if (${$1.val} == ${$3.val}) goto ${tag(l)};\ngoto ${tag(l+1)};\n`};l+=2;}
    | EXPRESION diferente EXPRESION                             {$$ = {true: `${tag(l)}:\n`, false: `${tag(l+1)}:\n`, code: `${$1.code}${$3.code}if (${$1.val} != ${$3.val}) goto ${tag(l)};\ngoto ${tag(l+1)};\n`};l+=2;}
    | EXPRESION eq EXPRESION                                    {$$ = {true: `${tag(l)}:\n`, false: `${tag(l+1)}:\n`, code: `${$1.code}${$3.code}if (${$1.val} == ${$3.val}) goto ${tag(l)};\ngoto ${tag(l+1)};\n`};l+=2;}
    | EXPRESION ne EXPRESION                                    {$$ = {true: `${tag(l)}:\n`, false: `${tag(l+1)}:\n`, code: `${$1.code}${$3.code}if (${$1.val} != ${$3.val}) goto ${tag(l)};\ngoto ${tag(l+1)};\n`};l+=2;}
    | EXPRESION lt EXPRESION                                    {$$ = {true: `${tag(l)}:\n`, false: `${tag(l+1)}:\n`, code: `${$1.code}${$3.code}if (${$1.val} <  ${$3.val}) goto ${tag(l)};\ngoto ${tag(l+1)};\n`};l+=2;}
    | EXPRESION le EXPRESION                                    {$$ = {true: `${tag(l)}:\n`, false: `${tag(l+1)}:\n`, code: `${$1.code}${$3.code}if (${$1.val} <= ${$3.val}) goto ${tag(l)};\ngoto ${tag(l+1)};\n`};l+=2;}
    | EXPRESION gt EXPRESION                                    {$$ = {true: `${tag(l)}:\n`, false: `${tag(l+1)}:\n`, code: `${$1.code}${$3.code}if (${$1.val} >  ${$3.val}) goto ${tag(l)};\ngoto ${tag(l+1)};\n`};l+=2;}
    | EXPRESION ge EXPRESION                                    {$$ = {true: `${tag(l)}:\n`, false: `${tag(l+1)}:\n`, code: `${$1.code}${$3.code}if (${$1.val} >= ${$3.val}) goto ${tag(l)};\ngoto ${tag(l+1)};\n`};l+=2;}
    | parentesis_abierto BOOLEAN_EXPRESION parentesis_cerrado   {$$ = {true: $2.true, false: $2.false, code: `${$2.code}\n`}}
;

EXPRESION
    : EXPRESION suma EXPRESION                          {$$ = {val: temp(t), code: `${$1.code}${$3.code}${temp(t++)} = ${$1.val} + ${$3.val};\n`}}
    | EXPRESION resta EXPRESION                         {$$ = {val: temp(t), code: `${$1.code}${$3.code}${temp(t++)} = ${$1.val} - ${$3.val};\n`}}
    | EXPRESION multiplicacion EXPRESION                {$$ = {val: temp(t), code: `${$1.code}${$3.code}${temp(t++)} = ${$1.val} * ${$3.val};\n`}}
    | EXPRESION division EXPRESION                      {$$ = {val: temp(t), code: `${$1.code}${$3.code}${temp(t++)} = ${$1.val} / ${$3.val};\n`}}
    | EXPRESION mod EXPRESION                           {$$ = {val: temp(t), code: `${$1.code}${$3.code}${temp(t++)} = ${$1.val} % ${$3.val};\n`}}
    | parentesis_abierto EXPRESION parentesis_cerrado   {$$ = {val: $2.val,  code: `${$2.code}`}}
    | resta EXPRESION %prec UMENOS                      {$$ = {val: temp(t), code: `${$2.code}${temp(t++)} = -${$2.val};\n`}}
    | TIPOS_EXPRESION                                   {$$ = $1;}
;

TIPOS_EXPRESION
    : digito                    {$$ = {val: $1, code: ""}}
    | decimal                   {$$ = {val: $1, code: ""}}
    | identificadorXquery {
        let varXquery = vars.find(e => e.id === $1 && e.ambito === ambito);
        $$ = {val: temp(t), code: `${temp(t++)} = ${stack(varXquery.sp)};\n`};
    }
    | string {
        code = new Array();
        $1 = $1.replace('\"', '');
        $1 = $1.replace('\"', '');
        code.push(`${temp(t)} = H;`);
        Array.from($1).forEach(c => {
            code.push(`heap[(int)H] = ${c.charCodeAt(0)};`);
            code.push(`H = H + 1;`);
        });
        code.push(`${heap('H')} = -1;`);
        code.push(`H = H + 1;`);
        //code.push(`${stack(s++)} = ${temp(t)};`);
        $$ = {val: temp(t++), code: `${code.join("\n")}\n`};
    }

    | ESTRUCTURA_LLAMADA_FUNCION {$$ = $1;}
;

ESTRUCTURA_LLAMADA_FUNCION
    : identificador dos_puntos identificador parentesis_abierto OPCIONES_PARAMETRO parentesis_cerrado {
        code = new Array();
        $5.forEach(p => code.push(p.code));
        code.push(`\n//Llamando a funcion ${$3}\n`);
        code.push(`P = P + ${s};\n`);
        if ($5.length > 0) code.push(`${temp(t)} = P + 1;\n`);
        $5.forEach(p => {
            code.push(`${stack(temp(t))} = ${p.val};\n`);
            code.push(`${temp(t)} = ${temp(t)} + 1;\n`);
        });
        code.pop();
        code.push(`${$3}();\n`);
        code.push(`${temp(t+1)} = ${stack('P')};\n`);
        code.push(`P = P - ${s};\n`);
        t+=1;
        $$ = {val: temp(t++), code: `${code.join("")}\n`};
    }
;

OPCIONES_PARAMETRO
    : ESTRUCTURAS_PARAMETROS_LLAMADA    {$$ = $1;}
    |                                   {$$ = [];}
;

ESTRUCTURAS_PARAMETROS_LLAMADA
    : ESTRUCTURAS_PARAMETROS_LLAMADA coma EXPRESION_OPTIONS     {$1.push($3); $$ = $1;}
    | EXPRESION_OPTIONS                                         {$$ = [$1];}
;