/* Definición Léxica */
%lex

%options case-insensitive
%options yylineno

%%
\s+                                 /* skip whitespace */
"(:"[\s\S\n]*?":)"                  /* comentario en XQUERY */
"<!--"[\s\S\n]*?"-->"               /* Cometario de múltiples líneas XQUERY */
/* ELEMENTOS RESERVADOS DE XQUERY*/
"or"                        return 'or';
"and"                       return 'and';
"let"                       return 'let';
'for'                       return 'for';
'if'                       return 'if';
'then'                       return 'then';
'else'                       return 'else';
'mod'                       return 'mod';
'doc'                       return 'doc';
'to'                        return 'to';
'in'                        return 'in';
'at'                        return 'at';
'where'                     return 'where';
'order'                     return 'order';
'by'                        return 'by';
'return'                    return 'return';
'data'                      return 'data';
'gt'                      return 'gt';
'eq'                      return 'eq';
'ne'                      return 'ne';
'lt'                      return 'lt';
'le'                      return 'le';
'ge'                      return 'ge';


/* PALABRAS RESERVADAS XQUERY */
"ancestor-or-self"          return 'ancestor-or-self';
"descendant-or-self"        return 'descendant-or-self';
"following-sibling"         return 'following-sibling';
"preceding-sibling"         return 'preceding-sibling';

/* PALABRAS RESERVADAS XPATH */
"last"                     return  'last';
"position"                 return  'position';
"text"                     return  'text';
"ancestor"                 return  'ancestor'; 
"attribute"                return  'attribute'
"child"                    return  'child';
"descendant"               return  'descendant';
"following"                return  'following';
"namespace"                return  'namespace';
"parent"                   return  'parent';
"preceding"                return  'preceding';
"sibling"                  return  'sibling';
"self"                     return  'self';
"node"                     return  'node';
"substring"                return 'substring';
"declare"                  return 'declare';
"function"                 return 'function';
"local"                    return 'local';
"hr"                       return 'hr';
"as"                       return 'as';
"string"                       return 'datoString';
"entero"                       return 'datoEntero';
"decimal"                       return 'datoDecimal';
\"[^"]+\"                   yytext = yytext.slice(1,-1); return 'STRING';

/* SIMBOLOS PARA OPERACIONES ARITMÉTICAS */
"+"                         return 'mas';
"-"                         return 'menos';
"*"                         return 'por';
"%"                         return 'mod';
"div"                       return 'div';

/* SIMBOLOS PARA OPERACIONES RELACIONALES */
"<="                        return 'menorigual';
">="                        return 'mayorigual';
"<"                         return 'menor';
">"                         return 'mayor';
"="                         return 'igual';
"=="                        return 'digual';
"!="                        return 'noigual';
":="                        return 'dosPuntosIgual';
":"                         return 'dosPuntos';
"?"                         return 'interrogacion';

//"&&"                        return 'and';
"or"                        return 'or';
"!"                         return 'not';

";"                         return 'semicolon';
"("                         return 'parentesisa';
")"                         return 'parentesisc'

"/\/"                       return 'barraDoble';
"/"                         return 'barraSimple';

"||"                        return 'or';
"!"                         return 'not';
"|"                         return 'union';


"["                         return 'cora';
"]"                         return 'corc';
"."                         return 'punto';
"::"                        return 'ddpuntos';
".."                        return 'puntosDobles';
"@"                         return 'arroba';
"$"                         return 'dolar';
"{"                         return 'llaveAbre';
"}"                         return "llaveCierra";
","                         return 'coma';

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'decimal';
[0-9]+                              return 'entero';
[a-zA-Z0-9_nÑ]+                       return 'nodoid';
(([A-Za-z])|[A-Za-z])([A-Za-z0-9])*	return 'ID'

//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }


<<EOF>>                     return 'EOF'

/lex

//SECCION DE IMPORTS
/*%{
       const {Elemento} = require("../Expresiones/Elemento");
%}*/

// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'or' 'union'
%left 'and'
%left 'not'
//%left 'union'
%left 'igual' 'noigual'
%left 'menor' 'mayor' 'menorigual' 'mayorigual' 
//%left 'ddoble' 'dsimple'
%left 'cora' 'corc'
%left 'parentesisa' 'parentesisc'
%left 'por' 'div' 'mod'
%left 'mas' 'menos'
%left 'barraSimple' 'barraDoble'

// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%

/* Definición de la gramática */
/*START : LISTA_NODOS EOF{
       return $1;
};*/


START: XQUERY EOF{
    return $1;
}
;

XQUERY: XQUERY INSTRUCCION {
          $1.instruccion.push($2);
          $$ = $1;
       }
       | INSTRUCCION{
              $$ = { instruccion: [$1] };
       }
;

INSTRUCCION:  FUNCIONES{
                    $$ = $1;
              }
              | 
              CICLO_FOR{
                    $$ = $1;
             }
              | SENTENCIA{
                    $$ = $1;
                }
              | ASIGNACION{
                    $$ = $1;
                }
                |LLAMADA_FUNCION{
                    $$ =$1;
                };


SENTENCIA: doc parentesisa EXPRESION parentesisc LISTA_ACCESO{
              $$ = {nombre:"senDoc", exp:$3, lstAcceso:$5 };
}
;

ASIGNACION: let dolar nodoid dosPuntosIgual DECLARACION2 COMPLEMENTO{
              $$ = {nombre:"asigLetComp", id:$3, declaracion:$5, complemento:$6 };
       }
        |let dolar nodoid dosPuntosIgual EXPRESION COMPLEMENTO{
              $$ = {nombre:"asigLetCompEXP", id:$3, exp:$5, complemento:$6 };
       }
       | let dolar nodoid dosPuntosIgual DECLARACION2{
              $$ = {nombre:"asigLet", id:$3, declaracion:$5 };
       }
       |    DECLARACION2{
              $$ = $1;
       }
;


 
CICLO_FOR: for dolar nodoid in doc DECLARACION2 COMPLEMENTO{
              $$ = {nombre:"for1", id:$3, declaracion:$6, complemento:$7 };
           }
           | for LST_DECLARACION COMPLEMENTO{
               $$ =   {nombre:"for2", lstDeclaracion:$2 , complemento:$3 };
           }
          |for dolar nodoid at dolar nodoid in doc DECLARACION2 COMPLEMENTO{
              $$ =   {nombre:"for3", id:$3, id2:$6, declaracion:$9, complemento:$10 };
          };



FUNCIONES: declare function PREFIX dosPuntos nodoid parentesisa LST_PARAMETROS parentesisc as nodoid dosPuntos TIPO_DATO interrogacion llaveAbre  INSTRUCCION llaveCierra semicolon{
              $$ = {nombre:"funcion", prefix:$3, id:$5, lstParametros:$7, id2:$10, tipo:$12, cuerpo:$15};
       };


PREFIX: local  {
              $$ =$1;
       }
        | hr{
               $$=$1;
        };



LST_PARAMETROS: LST_PARAMETROS coma PARAMETROS  {
                     $1.lstParametros.push($2);
                     $$ = $1;
                 }  
                |PARAMETROS{
                     $$ = { lstParametros: [$1] };  
                };

PARAMETROS: EXPRESION as nodoid dosPuntos TIPO_DATO interrogacion{
              $$ = {nombre:"parametro", exp:$1, id:$3, tpDato:$5};
            };

//{local:minPrice($book/price,$book/discount)}
LLAMADA_FUNCION: llaveAbre local dosPuntos nodoid parentesisa LST_DECLARACION parentesisc llaveCierra{
                $$ = {nombre:"llamadaFuncion", id:$4, lstParametros:$6};
};


TIPO_DATO: datoDecimal{
              $$ = $1;
           }
           |datoEntero{
              $$ = $2;    
           }
           |datoDecimal{
                  $$= $1;
           };



COMPLEMENTO: COMPLEMENTO INS_FOR {
                     $1.lstComplemento.push($2);
                     $$ = $1;
              } 
              | INS_FOR{
                     $$ = { lstComplemento: [$1] };  
                };

INS_FOR: ORDER_BY_FOR{
              $$ = {nombre:"orderBy", lstOrderBy:$1 };
       }
       | where EXPRESION{
              $$ = {nombre:"where", exp:$2 };
       }
       | return XPATH{
              $$ = {nombre:"return", exp:$2 };
       }
;

ORDER_BY_FOR: ORDER_BY_FOR coma EXPRESION{
                     $1.lstComplemento.push($3);
                     $$ = $1;
              }
       |      order by EXPRESION{
                     $$ = { lstComplemento: [$3] };  
                }
;


DECLARACION2: parentesisa EXPRESION to EXPRESION parentesisc XPATH{
                     $$ = { nombre:"decToXPath", exp1:$2, exp2:$4, xPath:$6 };  
                }
            |parentesisa LISTA_VALORES parentesisc XPATH{
                     $$ = { nombre:"decLstValoresXPath", lstVal:$2, xPath:$4 };  
                }
            |parentesisa EXPRESION to EXPRESION parentesisc{
                     $$ = { nombre:"decTo", exp1:$2, exp2:$4 };  
                }
            | parentesisa LISTA_VALORES parentesisc{
                     $$ = { nombre:"decLstValores", lstVal:$2 };  
                };

LST_DECLARACION: LST_DECLARACION coma DECLARACION  {
                     $1.lstDeclaracion.push($3);
                     //$$ = { lstDeclaracion: [1], declaracion: $3 };
                     $$ = $1;
              }
                |DECLARACION{
                       $$ = { lstDeclaracion: [$1] }; 
                };

DECLARACION: dolar nodoid in DECLARACION2{
                  $$ = {nombre:"declaracion", id:$2, declaracion:$4 };
              }
              |dolar nodoid LISTA_ACCESO {
                 $$ = {nombre:"declaracion2", id:$2, lstObjetos:$3 };
              };



LISTA_VALORES: LISTA_VALORES coma EXPRESION{
                     $1.lstValores.push($3);
                     $$ = $1;
              }
       |       EXPRESION{
                       $$ = { lstValores: [$1] }; 
                };

LISTA_ACCESO: dolar nodoid LISTA_ACCESO{
                       $$ = { nombre:"lstAcceso", id:$2, lstAcceso:$3 }; 
                }
             |LISTA_ACCESO barraSimple EXPRESION{
                     $1.lstValores.push($3);
                     $$ = $1; //---- tengo duda
                }
             |barraSimple EXPRESION{
                       $$ = { nombre:"lstAcceso2", exp:$2 };  
                }
           /*  |dolar nodoid LISTA_ACCESO {
                       $$ = { nombre:"lstAcceso3", id:$2, lstAcceso:$3 }; 
                }*/
             |cora EXPRESION corc LISTA_ACCESO{
                      $$ = { nombre:"lstAcceso4", exp:$2, lstAcceso:$4 }; 
                }
             |dolar nodoid{
                      $$ = { nombre:"lstAcceso5", id:$2 }; 
                }
             |cora EXPRESION corc{
                         $$ = { nombre:"lstAcceso6", exp:$2 }; 
                }
             |LISTA_DATA{
                       $$ = $1;
                };

LISTA_DATA : data parentesisa LISTA_ACCESO parentesisc{
              $$ = { nombre:"data", lstAcceso:$3 }; 
       };


XPATH: LISTA_NODOS{
       $$ = $1;
       };

LISTA_NODOS : LISTA_NODOS OPERADOR NODO{
                     
                     $1.lstNodos.push({nombre:"lstNodos", operador:$2, lstNodos:$3 });
                     
                     $$ =$1 ; //------------- tengo duda
              }
              |NODO{
                     $$ = $1;
                     // { nonbre:"lstNodos", nodo:[$1] };  
              };

OPERADOR : union{
       $$ =$1;
}
              |or{
       $$ =$1;
}
              |and{
       $$ =$1;
}
              |;

NODO : barraDoble VALOR_NODO{
        $$ = {nombre:"nodo", valorNodo:$2}; 
       }
      |barraSimple VALOR_NODO{
              $$ = {nombre:"nodo2", valorNodo:$2};
      }
      |VALOR_NODO{
             $$ = $1;
      };

VALOR_LST : VALOR_LST barraSimple EXPRESION{
                     $1.lstValor.push($3);
                     $$ = $1;
              }
            |VALOR_LST igual EXPRESION{
                   $1.lstValor.push($3);
                     $$ = $1;
            }
           | EXPRESION{
                  $$ = { lstValor: [$1] };
           };


VALOR_NODO : nodoid igual EXPRESION{
                  $$ = { nombre:"valorNodo", id:$1, exp:$3 };
           }
            |nodoid NODO_COMPLEMENTO{
                   $$ = { nombre:"valorNodo2", id:$1, nodoComplemento:$2 };
           }
            |FUNCION{
                  $$ = $1;
           }
            |SELECT{
                  $$ = $1;
           }
            |sentenciaIf{
                  $$ = $1;
           }
            |EJE{
                  $$ = $1;
           }
            |arroba nodoid NODO_COMPLEMENTO{
               $$ = { nombre:"valorNodo3", id:$2, nodoComplemento:$3 };
           }
            |LISTA_OBJ{
                  $$ = $1;
           }
            |LISTA_ACCESO{
                  $$ = $1;
           };

LISTA_OBJ: llaveAbre LISTA_ACCESO llaveCierra{
              $$ = $1;
           }
          | llaveAbre LISTA_ACCESO llaveCierra LISTA_OBJ{
                $$ = {nombre:"lstObj", lstAcceso:$2, lstObj:$4 };  
          }
          | parentesisa EXPRESION parentesisc{
              $$ = {nombre:"lstObj2", exp:$2 };
           }
          |punto LISTA_OBJ{
                $$ = {nombre:"lstObj3",  lstObj:$2 };
          };

NODO_COMPLEMENTO :VALOR_LST{
                     $$ =$1;
                   }
                | cora EXPRESION corc{
                        $$ =$2;
                }
                 /*|punto punto               
                 |*/;


sentenciaIf: si
            {
                   console.log("Se encontró instrucción sentenciaIf[si entoncesSi entonces]\n");
                   $$ = {nombre: "sentenciaIf_simple", senIf: $1};
            }
            | si entonces
            {
                   console.log("Se encontró instrucción sentenciaIf[si entonces]\n");
                   $$ = {nombre: "sentenciaIf_si_entonces1", senIf: $1, senElse:$2 };
            }
            | si entoncesSi
            {
                   console.log("Se encontró instrucción sentenciaIf[si entoncesSi]\n");
                   $$ = {nombre: "sentenciaIf_si_entonces2", senIf: $1, senIfElse: $2};
            }
            | si entoncesSi entonces
            {
                   console.log("Se encontró instrucción sentenciaIf[si entoncesSi entonces]\n");
                   $$ = {nombre: "sentenciaIf_si_entonces3", senIf: $1, senIfElse: $2, senElse:$3 };
            }
;


si: if  EXPRESION 
    {
           console.log("Se encontró instrucción si[if EXPRESION]\n");
              $$ = {nombre: "si_if", tipo: $1, expresion: $2 };
    }
;

entoncesSi:  entonces entSi
            {
                   console.log("Se encontró instrucción entoncesSI[entonces entSi]\n");
                   $$ = {nombre: "entoncesSi_else_elseif", else: $1, elseIf: $2 };
            }
            |entSi
            {
                   console.log("Se encontró instrucción entoncesSi[entSi]\n");
                   $$ = {nombre: "entoncesSi_elseIf", elseIf: $1 };
            }
;

entSi: else   EXPRESION
       {
              console.log("Se encontró instrucción entSi[else EXPRESION]\n");
              $$ = {nombre: "entSi_simple", tipo: $1, expresion: $2 };
       }
       |else  llaveAbre EXPRESION llaveCierra
       {
              console.log("Se encontró instrucción entSi[else llaveAbre EXPRESION llaveCierra]\n");
              $$ = {nombre: "entSi_extendido", tipo: $1, expresion: $2 }; 
       }
;

entonces: then EXPRESION
        {
               console.log("Se encontró instrucción entonces[then Expresion]\n");
              $$ = {nombre: "entonces_simple", tipo: $1, expresion: $2 }; 
        }
        | then llaveAbre EXPRESION llaveCierra
        {
              console.log("Se encontró instrucción entonces[then llaveAbre Expresion llaveCierra]\n");
              $$ = {nombre: "entonces_extendido", tipo: $1, expresion: $2 };  
        }
;


SELECT : barraDoble SELECT_ARGUMENTO
        {
              console.log("Se encontró instrucción SELECT[barraDoble SELECT_ARGUMENTO]\n");
              $$ = {nombre: "select_doble", tipo: $1, complemento: $2 };  
        }
        |barraSimple SELECT_ARGUMENTO
        {
              console.log("Se encontró instrucción SELECT[barraSimple SELECT_ARGUMENTO]\n");
              $$ = {nombre: "select_simple", tipo: $1, complemento: $2 };  
        }
;

SELECT_ARGUMENTO : arroba por
                  {
                         console.log("Se encontró instrucción SELECT_ARGUMENTO[punto punto]\n");
                         $$ = {nombre: "select_argumento_arroba", simbolo1: $1, simbolo2: $2 };
                  }
                  |por
                  {
                         console.log("Se encontró instrucción SELECT_ARGUMENTO[por]\n");
                         $$ = {nombre: "select_argumento_por", simbolo1: $1};
                  }
                  |punto
                  {
                         console.log("Se encontró instrucción SELECT_ARGUMENTO[punto]\n");
                         $$ = {nombre: "select_argumento_punto", simbolo1: $1};
                  }
                  |punto punto
                  {
                         console.log("Se encontró instrucción SELECT_ARGUMENTO[punto punto]\n");
                         $$ = {nombre: "select_argumento_doblePunto", simbolo1: $1, simbolo2: $2 };
                  }
;

EJE: ancestor OR_SELF
       {
              console.log("Se encontró instrucción EJE[ancestor OR_SELF]\n");
              $$ = {nombre: "eje_ancestor", tipo: $1, complemento: $2 };
       }
       |attribute ddpuntos EJE_COMPLEMENTO
       {
              console.log("Se encontró instrucción EJE[attribute ddpuntos EJE_COMPLEMENTO]\n");
              $$ = {nombre: "eje_attribute", tipo: $1, simbolo:$2, complemento: $3 };
       }
       |child ddpuntos EJE_COMPLEMENTO
       {
              console.log("Se encontró instrucción EJE[child ddpuntos EJE_COMPLEMENTO]\n");
              $$ = {nombre: "eje_child", tipo: $1, simbolo:$2, complemento: $3 };
       }
       |descendant OR_SELF
       {
              console.log("Se encontró instrucción EJE[descendant OR_SELF]\n");
              $$ = {nombre: "eje_descendant", tipo: $1, complemento: $2 };
       }
       |following SIBLING
       {
              console.log("Se encontró instrucción EJE[following SIBLING]\n");
              $$ = {nombre: "eje_following", tipo: $1, complemento: $2 };
       }
       |namespace ddpuntos EJE_COMPLEMENTO
       {
              console.log("Se encontró instrucción EJE[namespace ddpuntos EJE_COMPLEMENTO]\n");
              $$ = {nombre: "eje_namespace", tipo: $1, simbolo:$2, complemento: $3 };
       }
       |parent ddpuntos EJE_COMPLEMENTO
       {
              console.log("Se encontró instrucción EJE[parent ddpuntos EJE_COMPLEMENTO]\n");
              $$ = {nombre: "eje_parent", tipo: $1, simbolo:$2, complemento: $3 };
       }
       |preceding SIBLING
       {
              console.log("Se encontró instrucción EJE[preceding SIBLING]\n");
              $$ = {nombre: "eje_preceding", tipo: $1, complemento: $2 };
       } 
       |self ddpuntos EJE_COMPLEMENTO
       {
              console.log("Se encontró instrucción EJE[self ddpuntos EJE_COMPLEMENTO]\n");
              $$ = {nombre: "eje_self", tipo: $1, complemento: $3 };
       }
;

OR_SELF : menos or menos self ddpuntos EJE_COMPLEMENTO
       {
              console.log("Se encontró instrucción SIBLING[menos sibling ddpuntos EJE_COMPLEMENTO]\n");
              $$ = {nombre: "or_self_extendido", simbolo1: $1, simbolo2:$2, simbolo3:$3, simbolo4: $4, simbolo5: $5, complemento: $6 };
       }
       | ddpuntos EJE_COMPLEMENTO
       {
              console.log("Se encontró instrucción OR_SELF[ddpuntos EJE_COMPLEMENTO]\n");
              $$ = {nombre: "or_self_simple", simbolo: $1, complemento: $2 };
       }
;

SIBLING : menos sibling ddpuntos EJE_COMPLEMENTO
       {
              console.log("Se encontró instrucción SIBLING[menos sibling ddpuntos EJE_COMPLEMENTO]\n");
              $$ = {nombre: "sibling_extendido", simbolo1:$1, simbolo2:$2, simbolo3:$3, complemento: $4 };
       }
       | ddpuntos EJE_COMPLEMENTO
       {
              console.log("Se encontró instrucción SIBLING[ddpuntos EJE_COMPLEMENTO]\n");
              $$ = {nombre: "sibling_simple", simbolo1:$1, complemento: $2 };
       }
;

EJE_COMPLEMENTO:  FUNCION
                {
                       console.log("Se encontró instrucción EJE_COMPLEMENTO[FUNCION]\n");
                       $$ = [$1];
                }
                | nodoid EJE_COMPLEMENTO_2
                {
                       console.log("Se encontró instrucción EJE_COMPLEMENTO[NODOID EJE_COMPLEMENTO_2]\n");
                       $$ = [$1 + $2];
                }
                | SELECT_ARGUMENTO
                {
                     console.log("Se encontró instrucción EJE_COMPLEMENTO[SELECT_ARGUMENTO]\n");
                     $$ = [$1];  
                }
;

EJE_COMPLEMENTO_2:cora EXPRESION corc
                {
                       $$ = $1;
                }
                |;

FUNCION : position parentesisa parentesisc
         {
                console.log("Se encontró instrucción FUNCION[position()]\n");
                $$ = {nombre: "funcion", tipo: $1};
         }
         |last parentesisa parentesisc
         {
                console.log("Se encontró instrucción FUNCION[last()]\n");
                $$ = {nombre: "funcion", tipo: $1};
         }
         |text parentesisa parentesisc
         {
                console.log("Se encontró instrucción FUNCION[text()]\n");
                $$ = {nombre: "funcion", tipo: $1};
         }
         |node parentesisa parentesisc
         {
                console.log("Se encontró instrucción FUNCION[node()]\n");
                $$ = {nombre: "funcion", tipo: $1};
         }
;

EXPRESION : ARITMETICA
            {
                   console.log("Se encontró instrucción EXPRESION TIPO[ARITMETICA]\n");
                   $$ = $1;
            }
            |LOGICA
            {
                   console.log("Se encontró instrucción EXPRESION TIPO[LOGICA]\n");
                   $$ = $1;
            }
            |PRIMITIVO
            {
                   console.log("Se encontró instrucción EXPRESION TIPO[PRIMITIVO]\n");
                   $$ = $1;
            }
            |FUNCION
            {
                   console.log("Se encontró instrucción EXPRESION TIPO[FUNCION]\n");
                   $$ = $1;
            }
            |LISTA_ACCESO
            {
                   console.log("Se encontró instrucción EXPRESION TIPO[LISTA_ACCESO]\n");
                   $$ = $1;
            }
            |LISTA_DATA
            {
                   console.log("Se encontró instrucción EXPRESION TIPO[LISTA_DATA]\n");
                   $$ = $1;
            }
            |XPATH
            {
                   console.log("Se encontró instrucción EXPRESION TIPO[XPATH]\n");
                   $$ = $1;
            }
            |FUN_PRIMITIVAS
            {
                   console.log("Se encontró instrucción FUNCION PRIMITIVAS\n");
                   $$ = $1;
            }
            |DECLARACION2{
                $$ =$1;
            }
            
;

FUN_PRIMITIVAS: substring parentesisa LISTA_VALORES parentesisc{
                     $$ = {nombre: "funPrimitivaSubString", lstVal:$3 };
                };

ARITMETICA : EXPRESION mas EXPRESION
            {
                   console.log("Se encontró instrucción ARITMETICA[EXPRESION + EXPRESION]\n");
                   $$ = {nombre: "expresionAritmetica", tipo: $2, op1: $1, op2: $3};
            }
            |EXPRESION menos EXPRESION
            {
                   console.log("Se encontró instrucción ARITMETICA[EXPRESION - EXPRESION]\n");
                   $$ = {nombre: "expresionAritmetica", tipo: $2, op1: $1, op2: $3};
            }
            |EXPRESION por EXPRESION
            {
                   console.log("Se encontró instrucción ARITMETICA[EXPRESION * EXPRESION]\n");
                   $$ = {nombre: "expresionAritmetica", tipo: $2, op1: $1, op2: $3};
            }
            |EXPRESION div EXPRESION
            {
                   console.log("Se encontró instrucción ARITMETICA[EXPRESION / EXPRESION]\n");
                   $$ = {nombre: "expresionAritmetica", tipo: $2, op1: $1, op2: $3};
            }
            |EXPRESION mod EXPRESION
            {
                   console.log("Se encontró instrucción ARITMETICA[EXPRESION mod EXPRESION]\n");
                   $$ = {nombre: "expresionAritmetica", tipo: $2, op1: $1, op2: $3};
            }
            |parentesisa EXPRESION parentesisc
            {
                   console.log("Se encontró instrucción ARITMETICA[ ( EXPRESION ) ]\n");
                   $$ = $2;
            }
;
            
PRIMITIVO :  entero
             {
                    console.log("Se encontró instrucción PRIMITIVO[entero]\n");
                    $$ = {nombre: "primitivoEntero", op1: $1};
             }
             |decimal
             {
                    console.log("Se encontró instrucción PRIMITIVO[decimal]\n");
                    $$ = {nombre: "primitivoDecimal", op1: $1};
             }
             |nodoid
             {
                    console.log("Se encontró instrucción PRIMITIVO[nodoid]\n");
                    $$ = {nombre: "primitivoNodoid", op1: $1};
             }
             |punto
             {
                    console.log("Se encontró instrucción PRIMITIVO[punto]\n");
                    $$ = {nombre: "primitivoPunto", op1: $1};
             }
             |STRING
             {
                    console.log("Se encontró instrucción PRIMITIVO[string]\n");
                    $$ = {nombre: "primitivoString", op1: $1};
             }
             |arroba nodoid
             {
                    console.log("Se encontró instrucción PRIMITIVO[arroba nodoid]\n");
                    $$ = {nombre: "primitivoArroba", op1: $2};
             }
             |por
             {
                    console.log("Se encontró instrucción PRIMITIVO[por]\n");
                    $$ = {nombre: "primitivoPor", op1: $2};
             }
             |dolar nodoid
             {
                    console.log("Se encontró instrucción PRIMITIVO[dolar nodoid]\n");
                    $$ = {nombre: "primitivoDolar", op1: $2};
             }
;


LOGICA : EXPRESION menor  EXPRESION
        {
               console.log("Se encontró instrucción LOGICA[EXPRESION < EXPRESION]\n");
               $$ = {nombre: "expresionLogica", tipo: $2, op1: $1, op2:$3};
        }
        |EXPRESION mayor  EXPRESION
        {
               console.log("Se encontró instrucción LOGICA[EXPRESION > EXPRESION]\n");
               $$ = {nombre: "expresionLogica", tipo: $2, op1: $1, op2:$3};
        }
        |EXPRESION igual EXPRESION
        {
               console.log("Se encontró instrucción LOGICA[EXPRESION = EXPRESION]\n");
               $$ = {nombre: "expresionLogica", tipo: $2, op1: $1, op2:$3};
        }
        |EXPRESION menorigual EXPRESION
        {
               console.log("Se encontró instrucción LOGICA[EXPRESION <= EXPRESION]\n");
               $$ = {nombre: "expresionLogica", tipo: $2, op1: $1, op2:$3};
        }
        |EXPRESION mayorigual EXPRESION
        {
               console.log("Se encontró instrucción LOGICA[EXPRESION >= EXPRESION]\n");
               $$ = {nombre: "expresionLogica", tipo: $2, op1: $1, op2:$3};
        }
        |EXPRESION or EXPRESION
        {
               console.log("Se encontró instrucción LOGICA[EXPRESION | EXPRESION]\n");
               $$ = {nombre: "expresionLogica", tipo: $2, op1: $1, op2:$3};
        }
        |EXPRESION and EXPRESION
        {
               console.log("Se encontró instrucción LOGICA[EXPRESION & EXPRESION]\n");
               $$ = {nombre: "expresionLogica", tipo: $2, op1: $1, op2:$3};
        }
        |EXPRESION igual EXPRESION
        {
               console.log("Se encontró instrucción LOGICA[EXPRESION = EXPRESION]\n");
               $$ = {nombre: "expresionLogica", tipo: $2, op1: $1, op2:$3};
        }
        |EXPRESION noigual EXPRESION
        {
               console.log("Se encontró instrucción LOGICA[EXPRESION != EXPRESION]\n");
               $$ = {nombre: "expresionLogica", tipo: $2, op1: $1, op2:$3};
        }
        |EXPRESION eq EXPRESION
        {
               console.log("Se encontró instrucción LOGICA[EXPRESION eq EXPRESION]\n");
               $$ = {nombre: "expresionLogica", tipo: $2, op1: $1, op2:$3};
        }
        |EXPRESION ne EXPRESION
        {
              console.log("Se encontró instrucción LOGICA[EXPRESION ne EXPRESION]\n");
              $$ = {nombre: "expresionLogica", tipo: $2, op1: $1, op2:$3};
        }
        |EXPRESION lt EXPRESION
        {
               console.log("Se encontró instrucción LOGICA[EXPRESION lt EXPRESION]\n");
               $$ = {nombre: "expresionLogica", tipo: $2, op1: $1, op2:$3};
        }
        |EXPRESION le EXPRESION
        {
               console.log("Se encontró instrucción LOGICA[EXPRESION le EXPRESION]\n");
               $$ = {nombre: "expresionLogica", tipo: $2, op1: $1, op2:$3};
        }
        |EXPRESION gt EXPRESION
        {
               console.log("Se encontró instrucción LOGICA[EXPRESION gt EXPRESION]\n");
               $$ = {nombre: "expresionLogica", tipo: $2, op1: $1, op2:$3};
        }
        |EXPRESION ge EXPRESION
        {
               console.log("Se encontró instrucción LOGICA[EXPRESION ge EXPRESION]\n");
               $$ = {nombre: "expresionLogica", tipo: $2, op1: $1, op2:$3};
        } 

;
