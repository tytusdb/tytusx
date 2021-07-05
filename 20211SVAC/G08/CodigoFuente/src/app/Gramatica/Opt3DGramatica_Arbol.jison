%lex
%options case-insensitive

escapechar                          [\'\"\\]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"
acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}*\'

%s                                  comment
%%
"//".*                              
\s+                                 /* skip whitespace */
"/*"                              this.begin('comment');
<comment>"*/"                      this.popState();
<comment>.                          /* skip comment content*/

"main"                              return 'main';
"return"                            return 'return';
"void"                              return 'void';
"float"                             return 'float';
"printf"                            return 'printf';
"char"                              return 'char';
"int"                               return 'int';
"double"                            return 'double';
"if"                                return 'if';
"goto"                              return 'goto';
"#include"                          return 'include';
".h"                                return 'ext_h';
"{"                                 return '{';
"}"                                 return '}';
"("                                 return '(';
")"                                 return ')';
"["                                 return '[';
"]"                                 return ']';
";"                                 return 'semicolon';
","                                 return ',';
":"                                 return ':';
"<="                                return '<=';
">="                                return '>=';
">"                                 return '>';
"<"                                 return '<';
"=="                                return 'igualigual';
"="                                 return 'igual';
"!="                                return "!=";
"%"                                 return 'mod';
"*"                                 return 'por';
"/"                                 return 'div';
"+"                                 return 'mas';
"-"                                 return 'menos';


/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';

[a-zA-Z_][a-zA-Z0-9_ñÑ]*          return 'identifier';

{stringliteral}                     return 'cadena'
{charliteral}                       return 'cadena2'

[ \t\r\n\f]                         %{ %}

<<EOF>>                             return 'EOF'
//error lexico
.                                   {
                                        lista_de_Errores.agregar_Error(new Error(contError, yylloc.first_line, yylloc.first_column + 1, "Lexico", "El caracter " + yytext + " no pertenece al lenguaje.")); 
                                        contError++;
                                       
                                        console.log("Error Lexico: "+yytext)
                                    }

/lex

//SECCION DE IMPORTS
%{
    const { TipoInstruccion, TipoOperador, TipoParametro, TipoDato } = require("../Estructuras/tipificacion.js");
    const { Declaracion3D } = require("../Estructuras/C3D/Declaracion3D.js");
    const { OperacionC3D, Simbolo } = require("../Estructuras/C3D/Operacion3D.js");   
    const { Instruccion3D, Asignacion, AsignacionArray, Etiqueta } = require("../Estructuras/C3D/Instruccion3D.js");  

    const {Atributo} = require("../Expresiones/Atributo");
    const {Nodo_Arbol} = require("../AST/NodoArbol");
    const {Lista_Errores} = require("../AST/ListaErrores");
    const {Error} =  require("../AST/Error");
    
    var lista_de_Errores = new Lista_Errores();
    var contError=0;


%}

// DEFINIMOS PRECEDENCIA DE OPERADORES

%left  '>=' '<=' '>' '<'  'igualigual' '!='
%left 'mas' 'menos'
%left 'por' 'div' 'mod'
%left UMINUS

//PRODUCCION INICIAL
%start expressions
%%

expressions: LDECLARACION EOF 
            { 
                //$$ = $1; return $$;
                var root = new Nodo_Arbol("START","");
                root.agregar_hijo($1[1]);
                var cst = new Nodo_Arbol("START","");
                cst.agregar_hijo($1[2]);
                $$ = [$1[0], root,cst,lista_de_Errores];
                return $$;
           
            }
    ;
LDECLARACION: LDECLARACION DECLARACION 
            { 
                //$1.push($2); $$ = $1;
                nodo_actual = new Nodo_Arbol("LDECLARACION",""); 
                nodo_actual.agregar_hijo($2[1]);
                $1[1].agregar_hijo(nodo_actual);

                nodo_cst = new Nodo_Arbol("LDECLARACION",""); 
                nodo_cst.agregar_hijo($2[2]);                
                $1[2].agregar_hijo(nodo_cst);

                $1[0].push($2[0]); 
                $$ = [$1[0],$1[1],$1[2]]; 
            }
            | DECLARACION                 
            { 
                nodo_actual = new Nodo_Arbol("DECLARACION","");
                nodo_actual.agregar_hijo($1[1]);

                nodo_cst = new Nodo_Arbol("DECLARACION","");
                nodo_cst.agregar_hijo($1[2]);
                $$ = [[$1[0]],nodo_actual,nodo_cst];
                //$$ = [$1];

            }
            ;

DECLARACION: include '<' identifier ext_h '>' 
            {   
                nodo_actual = new Nodo_Arbol("DECLARACION","");
                nodo_actual.agregar_hijo(new Nodo_Arbol($1,"include"));
                nodo_actual.agregar_hijo(new Nodo_Arbol($2,"<"));
                nodo_actual.agregar_hijo(new Nodo_Arbol($3,"id"));
                nodo_actual.agregar_hijo(new Nodo_Arbol($4,".h"));
                nodo_actual.agregar_hijo(new Nodo_Arbol($5,">"));

                nodo_cst = new Nodo_Arbol("DECLARACION","");
                nodo_cst.agregar_hijo(new Nodo_Arbol($1,"RESERVADA"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($2,"SIGNO"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($3,"IDENTIFICADOR"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($4,"EXT"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($5,"SIGNO"));
                
                declaracion = new Declaracion3D( @1.first_line, @1.first_column,'',null, $1 + $2 + $3 + $4 + $5);

                $$ = [declaracion, nodo_actual,nodo_cst];
                //$$ = new Declaracion3D( @1.first_line, @1.first_column,'',null, $1 + $2 + $3 + $4 + $5)
            }
            | TIPO_DATO identifier '[' IntegerLiteral ']' semicolon 
            {
                //$$ = new Declaracion3D( @1.first_line, @1.first_column,'',null, $1 + ' ' + $2 + $3 + $4 + $5 + $6)
                nodo_actual = new Nodo_Arbol("DECLARACION","");
                nodo_actual.agregar_hijo($1[1]);
                nodo_actual.agregar_hijo(new Nodo_Arbol($2,"id"));
                nodo_actual.agregar_hijo(new Nodo_Arbol($3,"["));
                nodo_actual.agregar_hijo(new Nodo_Arbol($4,"numero"));
                nodo_actual.agregar_hijo(new Nodo_Arbol($5,"]"));                
                //nodo_actual.agregar_hijo(new Nodo_Arbol($6,";"));
                
                nodo_cst = new Nodo_Arbol("DECLARACION","");
                nodo_cst.agregar_hijo($1[2]);
                nodo_cst.agregar_hijo(new Nodo_Arbol($2,"IDENTIFICADOR"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($3,"CORCHETE APERTURA"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($4,"INTEGER LITERAL"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($5,"CORCHETE CLAUSURA"));                
                nodo_cst.agregar_hijo(new Nodo_Arbol($6,"PUNTO Y COMA"));
                
                declaracion = new Declaracion3D( @1.first_line, @1.first_column,'',null, $1 + ' ' + $2 + $3 + $4 + $5 + $6);

                $$ = [declaracion, nodo_actual,nodo_cst ];
            }
            | TIPO_DATO L_IDS semicolon 
            { 
               /* var codigo = $1[0] + ' ';
                for(var i = 0; i<$2[0].length;i++){
                    if(i == 0){
                        codigo += $2[0][i];
                    }else{
                        codigo += ',' + $2[0][i];
                    }
                }
                */
                nodo_actual = new Nodo_Arbol("DECLARACION","");
                nodo_actual.agregar_hijo($1[1]);
                nodo_actual.agregar_hijo($2[1]);
                //nodo_actual.agregar_hijo(new Nodo_Arbol($3,";"));
                
                nodo_cst = new Nodo_Arbol("DECLARACION","");
                nodo_cst.agregar_hijo($1[2]);
                nodo_cst.agregar_hijo($2[2]);
                nodo_cst.agregar_hijo(new Nodo_Arbol($3,"PUNTO Y COMA"));
                
                
                declaracion = new Declaracion3D( @1.first_line, @1.first_column,'',null, null + ';');              
                $$ = [declaracion, nodo_actual,nodo_cst ];
                //$$ = new Declaracion3D( @1.first_line, @1.first_column,'',null, codigo + ';')              
            }
            | void main '(' ')' '{' L_INSTRUCCION '}' 
            {
                nodo_actual = new Nodo_Arbol("DECLARACION","");
                nodo_actual.agregar_hijo(new Nodo_Arbol($1,"void"));
                nodo_actual.agregar_hijo(new Nodo_Arbol($2, "main"));
               // nodo_actual.agregar_hijo(new Nodo_Arbol($3,"("));
               // nodo_actual.agregar_hijo(new Nodo_Arbol($4, ")"));
               // nodo_actual.agregar_hijo(new Nodo_Arbol($5, "{"));
                nodo_actual.agregar_hijo($6[1]);
             //   nodo_actual.agregar_hijo(new Nodo_Arbol($7,"}"));
                
                nodo_cst = new Nodo_Arbol("DECLARACION","");
                nodo_cst.agregar_hijo(new Nodo_Arbol($1,"RESERVADA"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($2, "RESERVADA"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($3,"PAR_ABRE"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($4, "PAR_CIERRA"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($5, "LLAVE_ABRE"));
                nodo_cst.agregar_hijo($6[2]);
                nodo_cst.agregar_hijo(new Nodo_Arbol($7,"LLAVE_CIERRA"));

                declaracion = new Declaracion3D( @1.first_line, @1.first_column,$6,$2, $1 + ' ' + $2 + $3 + $4 + $5);   
                $$ = [declaracion, nodo_actual,nodo_cst ];
                //$$ = new Declaracion3D( @1.first_line, @1.first_column,$6,$2, $1 + ' ' + $2 + $3 + $4 + $5)   
            }
            | void identifier '(' ')' '{' L_INSTRUCCION '}'
            {
                nodo_actual = new Nodo_Arbol("DECLARACION","");
                nodo_actual.agregar_hijo(new Nodo_Arbol($1,"void"));
                nodo_actual.agregar_hijo(new Nodo_Arbol($2, "id"));
              //  nodo_actual.agregar_hijo(new Nodo_Arbol($3,"("));
              //  nodo_actual.agregar_hijo(new Nodo_Arbol($4, ")"));
             //   nodo_actual.agregar_hijo(new Nodo_Arbol($5, "{"));
                nodo_actual.agregar_hijo($6[1]);
            //    nodo_actual.agregar_hijo(new Nodo_Arbol($7,"}"));
                
                nodo_cst = new Nodo_Arbol("DECLARACION","");
                nodo_cst.agregar_hijo(new Nodo_Arbol($1,"RESERVADA"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($2, "IDENTIFICADOR"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($3,"PAR_ABRE"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($4, "PAR_CIERRA"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($5, "LLAVE_ABRE"));
                nodo_cst.agregar_hijo($6[2]);
                nodo_cst.agregar_hijo(new Nodo_Arbol($7,"LLAVE_CIERRA"));

                declaracion = new Declaracion3D( @1.first_line, @1.first_column,$6,$2, $1+ ' ' + $2 + $3 + $4 + $5);
                $$ = [declaracion, nodo_actual,nodo_cst ];
                //$$ = new Declaracion3D( @1.first_line, @1.first_column,$6,$2, $1+ ' ' + $2 + $3 + $4 + $5)   
            }
            ;

L_IDS: L_IDS ',' identifier 
        { 
            nodo_actual = new Nodo_Arbol("LISTA_ID","");
          ///  nodo_actual.agregar_hijo(new Nodo_Arbol($2,","));
            nodo_actual.agregar_hijo(new Nodo_Arbol($3,"id"));            
            $1[1].agregar_hijo(nodo_actual);
             
            //$1[0] = $1[0] + " " + $2[0];

            nodo_cst = new Nodo_Arbol("LISTA_ID","");
            nodo_cst.agregar_hijo(new Nodo_Arbol($2,"COMA"));
            nodo_cst.agregar_hijo(new Nodo_Arbol($3,"IDENTIFICADOR"));
            $1[2].agregar_hijo(nodo_cst);

            $1[0].push($3[0]);

            $$ = [$1[0],$1[1],$1[2]]
            //$1.push($3); $$ = $1;
        }
        | identifier            
        { 
            nodo_actual = new Nodo_Arbol("ID","");
            nodo_actual.agregar_hijo(new Nodo_Arbol($1,"id"));
            
            nodo_cst = new Nodo_Arbol("ID","");
            nodo_cst.agregar_hijo(new Nodo_Arbol($1, "IDENTIFICADOR"));
            $$ = [$1,nodo_actual,nodo_cst];
            
            //$$ = [$1];
        }
;

TIPO_DATO: int           
        { 

            nodo_actual = new Nodo_Arbol("TIPO_DATO","");
            nodo_actual.agregar_hijo(new Nodo_Arbol($1,"int"));

            nodo_cst = new Nodo_Arbol("TIPO_DATO","");
            nodo_cst.agregar_hijo(new Nodo_Arbol($1, "RESERVADA"));
            $$ = [$1,nodo_actual,nodo_cst];
            //$$ = $1;
        }
        | double        
        { 
            nodo_actual = new Nodo_Arbol("TIPO_DATO","");
            nodo_actual.agregar_hijo(new Nodo_Arbol($1,"double"));

            nodo_cst = new Nodo_Arbol("TIPO_DATO","");
            nodo_cst.agregar_hijo(new Nodo_Arbol($1, "RESERVADA"));
            $$ = [$1,nodo_actual,nodo_cst];
            //$$ = $1;
        }
        | float         
        { 
            nodo_actual = new Nodo_Arbol("TIPO_DATO","");
            nodo_actual.agregar_hijo(new Nodo_Arbol($1,"float"));

            nodo_cst = new Nodo_Arbol("TIPO_DATO","");
            nodo_cst.agregar_hijo(new Nodo_Arbol($1, "RESERVADA"));
            $$ = [$1,nodo_actual,nodo_cst];
            //$$ = $1;
        }
        | char          
        {   
            nodo_actual = new Nodo_Arbol("TIPO_DATO","");
            nodo_actual.agregar_hijo(new Nodo_Arbol($1,"char"));

            nodo_cst = new Nodo_Arbol("TIPO_DATO","");
            nodo_cst.agregar_hijo(new Nodo_Arbol($1, "RESERVADA"));
            $$ = [$1,nodo_actual,nodo_cst];
            //$$ = $1;
        }
;

L_INSTRUCCION: L_INSTRUCCION INSTRUCCION 
                { 
                    //$1.push($2); $$ = $1;
                    nodo_actual = new Nodo_Arbol("L_INSTRUCCION",""); 
                    nodo_actual.agregar_hijo($2[1]);
                    $1[1].agregar_hijo(nodo_actual);

                    nodo_cst = new Nodo_Arbol("L_INSTRUCCION",""); 
                    nodo_cst.agregar_hijo($2[2]);                
                    $1[2].agregar_hijo(nodo_cst);

                    $1[0].push($2[0]); 
                    $$ = [$1[0],$1[1],$1[2]]; 
                }
                | INSTRUCCION               
                { 
                    nodo_actual = new Nodo_Arbol("INSTRUCCION","");
                    nodo_actual.agregar_hijo($1[1]);

                    nodo_cst = new Nodo_Arbol("INSTRUCCION","");
                    nodo_cst.agregar_hijo($1[2]);
                    $$ = [[$1[0]],nodo_actual,nodo_cst];
                
                    //$$ = [$1];
                }
;


INSTRUCCION: identifier igual EXPRESION semicolon 
            {   
                nodo_actual = new Nodo_Arbol("INSTRUCCION","");
                nodo_actual.agregar_hijo(new Nodo_Arbol($1, "id"));
                nodo_actual.agregar_hijo(new Nodo_Arbol($2,"="));
                nodo_actual.agregar_hijo($3[1]);
               // nodo_actual.agregar_hijo(new Nodo_Arbol($4,";"));
                
                nodo_cst = new Nodo_Arbol("INSTRUCCION","");
                nodo_cst.agregar_hijo(new Nodo_Arbol($1,"IDENTIFICADOR"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($2,"SIGNO"));
                nodo_cst.agregar_hijo($3[2]);
                nodo_cst.agregar_hijo(new Nodo_Arbol($4,"SIGNO"));         

                instruccion = new Instruccion3D(TipoInstruccion.Asignacion, new Asignacion(@1.first_line, @1.first_column,$1,$3, $1 + ' = ' + $3.C3D + $4));
                $$ = [instruccion, nodo_actual,nodo_cst];
                //$$ = new Instruccion3D(TipoInstruccion.Asignacion, new Asignacion(@1.first_line, @1.first_column,$1,$3, $1 + ' = ' + $3.C3D + $4));
            }
            | identifier igual identifier '[' '(' TIPO_DATO ')' PRIMITIVA ']' semicolon 
            { 
                nodo_actual = new Nodo_Arbol("INSTRUCCION","");
                nodo_actual.agregar_hijo(new Nodo_Arbol($1, "id"));
                nodo_actual.agregar_hijo(new Nodo_Arbol($2,"="));
                nodo_actual.agregar_hijo(new Nodo_Arbol($3, "id"));
               // nodo_actual.agregar_hijo(new Nodo_Arbol($4,"["));
                //nodo_actual.agregar_hijo(new Nodo_Arbol($1, "("));
                nodo_actual.agregar_hijo($6[1]);
               // nodo_actual.agregar_hijo(new Nodo_Arbol($3[1]));
                nodo_actual.agregar_hijo($8[1]);
                //nodo_actual.agregar_hijo(new Nodo_Arbol($3[1]));
                //nodo_actual.agregar_hijo(new Nodo_Arbol($4,";"));

                nodo_cst = new Nodo_Arbol("INSTRUCCION","");
                nodo_cst.agregar_hijo(new Nodo_Arbol($1,"IDENTIFICADOR"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($2,"SIGNO"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($3,"IDENTEFICADOR"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($4,"SIGNO")); 
                nodo_cst.agregar_hijo(new Nodo_Arbol($5,"SIGNO"));
                nodo_cst.agregar_hijo($6[2]);
                nodo_cst.agregar_hijo(new Nodo_Arbol($7, "SIGNO"));
                nodo_cst.agregar_hijo($8[2]);
                nodo_cst.agregar_hijo(new Nodo_Arbol($9,"SIGNO"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($10,"SIGNO"));            

                instruccion = new Instruccion3D(TipoInstruccion.AsignacionArray, new AsignacionArray(@1.first_line, @1.first_column,$1,$8, $1 + ' = ' + $3+ '[(' + $6 + ')' + $8.C3D + '];'));
                $$ = [instruccion, nodo_actual,nodo_cst];
                //$$ = new Instruccion3D(TipoInstruccion.AsignacionArray, new AsignacionArray(@1.first_line, @1.first_column,$1,$8, $1 + ' = ' + $3+ '[(' + $6 + ')' + $8.C3D + '];'));
            }
            | identifier '[' '(' TIPO_DATO ')' PRIMITIVA ']' igual EXPRESION semicolon 
            { 
                nodo_actual = new Nodo_Arbol("INSTRUCCION","");
                nodo_actual.agregar_hijo(new Nodo_Arbol($1, "id"));
                //nodo_actual.agregar_hijo(new Nodo_Arbol($2,"="));
                //nodo_actual.agregar_hijo(new Nodo_Arbol($3, "id"));
                nodo_actual.agregar_hijo($4[1]);
                //nodo_actual.agregar_hijo(new Nodo_Arbol($5, "("));
                nodo_actual.agregar_hijo($6[1]);
               // nodo_actual.agregar_hijo(new Nodo_Arbol($3[1]));
                nodo_actual.agregar_hijo($8,"=");
                nodo_actual.agregar_hijo($9[1]);
                //nodo_actual.agregar_hijo(new Nodo_Arbol($4,";"));

                nodo_cst = new Nodo_Arbol("INSTRUCCION","");
                nodo_cst.agregar_hijo(new Nodo_Arbol($1,"IDENTIFICADOR"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($2,"SIGNO"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($3,"SIGNO"));
                nodo_cst.agregar_hijo($4[2]); 
                nodo_cst.agregar_hijo(new Nodo_Arbol($5,"SIGNO"));
                nodo_cst.agregar_hijo($6[2]);
                nodo_cst.agregar_hijo(new Nodo_Arbol($7, "SIGNO"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($8,"IGUAL"));
                nodo_cst.agregar_hijo($9[2]);
                nodo_cst.agregar_hijo(new Nodo_Arbol($10,"SIGNO"));            

                instruccion = new Instruccion3D(TipoInstruccion.AsignacionArray, new AsignacionArray(@1.first_line, @1.first_column,$1,$8, $1 + ' = ' + $3+ '[(' + $6 + ')' + $8.C3D + '];'));
                $$ = [instruccion, nodo_actual,nodo_cst];
                //$$ = new Instruccion3D(TipoInstruccion.ArrayAsignacion, new Asignacion(@1.first_line, @1.first_column,$1,$9, $1 + '[(' + $4 + ')' + $6.C3D + '] = ' + $9.C3D + $10));
            }
            | identifier ':'
            { 
                nodo_actual = new Nodo_Arbol("INSTRUCCION","");
                nodo_actual.agregar_hijo(new Nodo_Arbol($1, "id"));

                nodo_cst = new Nodo_Arbol("INSTRUCCION","");
                nodo_cst.agregar_hijo(new Nodo_Arbol($1,"IDENTIFICADOR"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($2,"SIGNO"));
                instruccion =$$ = new Instruccion3D(TipoInstruccion.Etiqueta, new Etiqueta(@1.first_line, @1.first_column,$1, $1 + $2));

                $$ = [instruccion, nodo_actual,nodo_cst];
                //$$ = new Instruccion3D(TipoInstruccion.Etiqueta, new Etiqueta(@1.first_line, @1.first_column,$1, $1 + $2));
            }
            | goto identifier semicolon 
            {   
                nodo_actual = new Nodo_Arbol("INSTRUCCION","");
                nodo_actual.agregar_hijo(new Nodo_Arbol($1, "goto"));
                nodo_actual.agregar_hijo(new Nodo_Arbol($2, "id"));

                nodo_cst = new Nodo_Arbol("INSTRUCCION","");
                nodo_cst.agregar_hijo(new Nodo_Arbol($1,"GOTO"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($2,"IDENTIFICADOR"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($2,"SIGNO"));
                instruccion =  new Instruccion3D(TipoInstruccion.GoTo, new Etiqueta(@1.first_line, @1.first_column, $2, 'goto ' + $2 + $3));
                $$ = [instruccion, nodo_actual,nodo_cst];

                //$$ = new Instruccion3D(TipoInstruccion.GoTo, new Etiqueta(@1.first_line, @1.first_column, $2, 'goto ' + $2 + $3));
            }
            | identifier '(' ')' semicolon 
            { 
                nodo_actual = new Nodo_Arbol("INSTRUCCION","");
                nodo_actual.agregar_hijo(new Nodo_Arbol($1, "id"));
            //    nodo_actual.agregar_hijo(new Nodo_Arbol($2, "("));                
           //     nodo_actual.agregar_hijo(new Nodo_Arbol($3, ")"));

                nodo_cst = new Nodo_Arbol("INSTRUCCION","");
                nodo_cst.agregar_hijo(new Nodo_Arbol($1,"IDENTIFICADOR"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($2,"SIGNO"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($3,"SIGNO"));
                instruccion = new  Instruccion3D(TipoInstruccion.Llamada, new Etiqueta(@1.first_line, @1.first_column, $1,$1 + '();'));
                $$ = [instruccion, nodo_actual,nodo_cst];

                //$$ = new Instruccion3D(TipoInstruccion.Llamada, new Etiqueta(@1.first_line, @1.first_column, $1,$1 + '();'));
            }
            | printf '(' cadena ',' '(' TIPO_DATO ')' PRIMITIVA ')' semicolon 
            { 
                nodo_actual = new Nodo_Arbol("INSTRUCCION","");
                nodo_actual.agregar_hijo(new Nodo_Arbol($1, "printf"));
                //nodo_actual.agregar_hijo(new Nodo_Arbol($2, "cadena"));                
                nodo_actual.agregar_hijo(new Nodo_Arbol($3, "cadena"));
                //nodo_actual.agregar_hijo(new Nodo_Arbol($4, "printf"));
                //nodo_actual.agregar_hijo(new Nodo_Arbol($5, "cadena"));                
                nodo_actual.agregar_hijo($6[1]);
                //nodo_actual.agregar_hijo(new Nodo_Arbol($7, "printf"));
                nodo_actual.agregar_hijo($8[1]);                
                //nodo_actual.agregar_hijo(new Nodo_Arbol($9, ""));
                //nodo_actual.agregar_hijo(new Nodo_Arbol($10, "printf"));

                nodo_cst = new Nodo_Arbol("INSTRUCCION","");
                nodo_cst.agregar_hijo(new Nodo_Arbol($1,"RESERVADA"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($2,"SIGNO"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($3,"CADENA"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($4,"SIGNO"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($5,"SIGNO"));
                nodo_cst.agregar_hijo($6[2]);
                nodo_cst.agregar_hijo(new Nodo_Arbol($7,"SIGNO"));
                nodo_cst.agregar_hijo($8[2]);
                nodo_cst.agregar_hijo(new Nodo_Arbol($9,"SIGNO"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($10,"SIGNO"));
                
                instruccion = new Instruccion3D(TipoInstruccion.Print, new Etiqueta(@1.first_line, @1.first_column, '', $1 + $2 + $3 + $4 + ' ' + $5 + $6 + $7 + $8.C3D + $9 + $10));
                $$ = [instruccion, nodo_actual,nodo_cst];

                //$$ = new Instruccion3D(TipoInstruccion.Print, new Etiqueta(@1.first_line, @1.first_column, '', $1 + $2 + $3 + $4 + ' ' + $5 + $6 + $7 + $8.C3D + $9 + $10));
            }
            | if '(' EXPRESION ')' goto identifier semicolon 
            {   
                nodo_actual = new Nodo_Arbol("INSTRUCCION","");
                nodo_actual.agregar_hijo(new Nodo_Arbol($1, "if"));
                //nodo_actual.agregar_hijo(new Nodo_Arbol($2, "cadena"));                
                nodo_actual.agregar_hijo($3[1]);
                //nodo_actual.agregar_hijo(new Nodo_Arbol($4, "id"));
                nodo_actual.agregar_hijo(new Nodo_Arbol($5, "goto"));                
                nodo_actual.agregar_hijo(new Nodo_Arbol($6,"id"));
                //nodo_actual.agregar_hijo(new Nodo_Arbol($7, "printf"));

                nodo_cst = new Nodo_Arbol("INSTRUCCION","");
                nodo_cst.agregar_hijo(new Nodo_Arbol($1,"RESERVADA"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($2,"SIGNO"));
                nodo_cst.agregar_hijo($3[2]);
                nodo_cst.agregar_hijo(new Nodo_Arbol($4,"SIGNO"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($5,"GOTO"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($6, "IDENTIFICADOR"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($7,"SIGNO"));
                
                instruccion = new Instruccion3D(TipoInstruccion.If, new Asignacion(@1.first_line, @1.first_column,$6,$3, 'if( ' + $3.C3D + ') goto ' + $6 + $7));
                $$ = [instruccion, nodo_actual,nodo_cst];
                //$$ = new Instruccion3D(TipoInstruccion.If, new Asignacion(@1.first_line, @1.first_column,$6,$3, 'if( ' + $3.C3D + ') goto ' + $6 + $7));
            }
            | return semicolon { 
                nodo_actual = new Nodo_Arbol("INSTRUCCION","");
                nodo_actual.agregar_hijo(new Nodo_Arbol($1, "RESERVADA"));  

                nodo_cst = new Nodo_Arbol("INSTRUCCION","");
                nodo_cst.agregar_hijo(new Nodo_Arbol($1,"RESERVADA"));
                nodo_cst.agregar_hijo(new Nodo_Arbol($2,"SIGNO"));

                instruccion = new Instruccion3D(TipoInstruccion.Return, new Etiqueta(@1.first_line, @1.first_column, '','return;'));
                $$ = [instruccion, nodo_actual,nodo_cst];
                //$$ = new Instruccion3D(TipoInstruccion.Return, new Etiqueta(@1.first_line, @1.first_column, '','return;'));
            }
;

EXPRESION: PRIMITIVA 
        { 
            nodo_actual = new Nodo_Arbol("EXPRESION","");
            nodo_actual.agregar_hijo($1[1]);  

            nodo_cst = new Nodo_Arbol("EXPRESION","");
            nodo_cst.agregar_hijo($1[2]);
            $$ = [$1, nodo_actual, nodo_cst];
            //$$ = $1;
        }
        | OPERACION 
        { 
            nodo_actual = new Nodo_Arbol("EXPRESION","");
            nodo_actual.agregar_hijo($1[1]);  

            nodo_cst = new Nodo_Arbol("EXPRESION","");
            nodo_cst.agregar_hijo($1[2]);
            $$ = [$1, nodo_actual, nodo_cst];
            //$$ = $1;
        }
;

OPERACION: EXPRESION mas EXPRESION 
        { 
            nodo_actual = new Nodo_Arbol("EXPRESION","");
            nodo_actual.agregar_hijo($1[1]);             
            nodo_actual.agregar_hijo(new Nodo_Arbol($2,"+"));            
            nodo_actual.agregar_hijo($3[1]); 

            nodo_cst = new Nodo_Arbol("EXPRESION","");
            nodo_cst.agregar_hijo($1[2]);            
            nodo_cst.agregar_hijo(new Nodo_Arbol($2,"OPERADOR"));            
            nodo_cst.agregar_hijo($3[2]);
            operador = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Mas, $1, $3,  $1.C3D + ' + ' + $3.C3D);
            $$ = [operador, nodo_actual, nodo_cst];
            //$$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Mas, $1, $3,  $1.C3D + ' + ' + $3.C3D);
        }
        | EXPRESION menos EXPRESION 
        { 
            nodo_actual = new Nodo_Arbol("EXPRESION","");
            nodo_actual.agregar_hijo($1[1]);             
            nodo_actual.agregar_hijo(new Nodo_Arbol($2,"-"));            
            nodo_actual.agregar_hijo($3[1]); 

            nodo_cst = new Nodo_Arbol("EXPRESION","");
            nodo_cst.agregar_hijo($1[2]);            
            nodo_cst.agregar_hijo(new Nodo_Arbol($2,"OPERADOR"));            
            nodo_cst.agregar_hijo($3[2]);
            operador = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Menos, $1, $3,  $1.C3D + ' - ' + $3.C3D);
            $$ = [operador, nodo_actual, nodo_cst];
            //$$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Menos, $1, $3,  $1.C3D + ' - ' + $3.C3D);
        }  
        | EXPRESION mod EXPRESION 
        { 
            nodo_actual = new Nodo_Arbol("EXPRESION","");
            nodo_actual.agregar_hijo($1[1]);             
            nodo_actual.agregar_hijo(new Nodo_Arbol($2,"%"));            
            nodo_actual.agregar_hijo($3[1]); 

            nodo_cst = new Nodo_Arbol("EXPRESION","");
            nodo_cst.agregar_hijo($1[2]);            
            nodo_cst.agregar_hijo(new Nodo_Arbol($2,"OPERADOR"));            
            nodo_cst.agregar_hijo($3[2]);
            operador = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Mod, $1, $3,  $1.C3D + ' % ' + $3.C3D);
            $$ = [operador, nodo_actual, nodo_cst];
            //$$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Mod, $1, $3,  $1.C3D + ' % ' + $3.C3D);
        }   
        | EXPRESION por EXPRESION 
        {
            nodo_actual = new Nodo_Arbol("EXPRESION","");
            nodo_actual.agregar_hijo($1[1]);             
            nodo_actual.agregar_hijo(new Nodo_Arbol($2,"*"));            
            nodo_actual.agregar_hijo($3[1]); 

            nodo_cst = new Nodo_Arbol("EXPRESION","");
            nodo_cst.agregar_hijo($1[2]);            
            nodo_cst.agregar_hijo(new Nodo_Arbol($2,"OPERADOR"));            
            nodo_cst.agregar_hijo(3[2]);
            operador =new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Por, $1, $3,  $1.C3D + ' * ' + $3.C3D);
            $$ = [operador, nodo_actual, nodo_cst];
            //$$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Por, $1, $3,  $1.C3D + ' * ' + $3.C3D);
        }
        | EXPRESION div EXPRESION 
        { 
            nodo_actual = new Nodo_Arbol("EXPRESION","");
            nodo_actual.agregar_hijo($1[1]);             
            nodo_actual.agregar_hijo(new Nodo_Arbol($2,"/"));            
            nodo_actual.agregar_hijo($3[1]); 

            nodo_cst = new Nodo_Arbol("EXPRESION","");
            nodo_cst.agregar_hijo($1[2]);            
            nodo_cst.agregar_hijo(new Nodo_Arbol($2,"OPERADOR"));            
            nodo_cst.agregar_hijo($3[2]);
            operador = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Div, $1, $3,  $1.C3D + ' / ' + $3.C3D);
            $$ = [operador, nodo_actual, nodo_cst];
            //$$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Div, $1, $3,  $1.C3D + ' / ' + $3.C3D);
        }    
        | EXPRESION igualigual EXPRESION 
        { 
            nodo_actual = new Nodo_Arbol("EXPRESION","");
            nodo_actual.agregar_hijo($1[1]);             
            nodo_actual.agregar_hijo(new Nodo_Arbol($2,"=="));            
            nodo_actual.agregar_hijo($3[1]); 

            nodo_cst = new Nodo_Arbol("EXPRESION","");
            nodo_cst.agregar_hijo($1[2]);            
            nodo_cst.agregar_hijo(new Nodo_Arbol($2,"OPERADOR"));            
            nodo_cst.agregar_hijo($3[2]);
            operador = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Igual, $1, $3,  $1.C3D + ' == ' + $3.C3D);
            $$ = [operador, nodo_actual, nodo_cst];
            //$$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Igual, $1, $3,  $1.C3D + ' == ' + $3.C3D);
        }  
        | EXPRESION '!=' EXPRESION 
        { 
            nodo_actual = new Nodo_Arbol("EXPRESION","");
            nodo_actual.agregar_hijo(new Nodo_Arbol($1[1]));             
            nodo_actual.agregar_hijo(new Nodo_Arbol($2,"!="));            
            nodo_actual.agregar_hijo(new Nodo_Arbol($3[1])); 

            nodo_cst = new Nodo_Arbol("EXPRESION","");
            nodo_cst.agregar_hijo($1[2]);            
            nodo_cst.agregar_hijo(new Nodo_Arbol($2,"OPERADOR"));            
            nodo_cst.agregar_hijo($3[2]);
            operador = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Diferente, $1, $3,  $1.C3D + ' != ' + $3.C3D);
            $$ = [operador, nodo_actual, nodo_cst];
            //$$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Diferente, $1, $3,  $1.C3D + ' != ' + $3.C3D);
        }   
        | EXPRESION '<=' EXPRESION 
        { 
            nodo_actual = new Nodo_Arbol("EXPRESION","");
            nodo_actual.agregar_hijo($1[1]);             
            nodo_actual.agregar_hijo(new Nodo_Arbol($2,"<="));            
            nodo_actual.agregar_hijo($3[1]); 

            nodo_cst = new Nodo_Arbol("EXPRESION","");
            nodo_cst.agregar_hijo($1[2]);            
            nodo_cst.agregar_hijo(new Nodo_Arbol($2,"OPERADOR"));            
            nodo_cst.agregar_hijo($3[2]);
            operador = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.MenorIgual, $1, $3,  $1.C3D + ' <= ' + $3.C3D);
            $$ = [operador, nodo_actual, nodo_cst];
            //$$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.MenorIgual, $1, $3,  $1.C3D + ' <= ' + $3.C3D);
        } 
        | EXPRESION '>=' EXPRESION 
        { 
            nodo_actual = new Nodo_Arbol("EXPRESION","");
            nodo_actual.agregar_hijo($1[1]);             
            nodo_actual.agregar_hijo(new Nodo_Arbol($2,">="));            
            nodo_actual.agregar_hijo($3[1]); 

            nodo_cst = new Nodo_Arbol("EXPRESION","");
            nodo_cst.agregar_hijo($1[2]);            
            nodo_cst.agregar_hijo(new Nodo_Arbol($2,"OPERADOR"));            
            nodo_cst.agregar_hijo($3[2]);
            operador = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.MayorIgual, $1, $3,  $1.C3D + ' >= ' + $3.C3D);
            $$ = [operador, nodo_actual, nodo_cst];
            //$$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.MayorIgual, $1, $3,  $1.C3D + ' >= ' + $3.C3D);
        } 
        | EXPRESION '<' EXPRESION 
        { 
            nodo_actual = new Nodo_Arbol("EXPRESION","");
            nodo_actual.agregar_hijo($1[1]);             
            nodo_actual.agregar_hijo(new Nodo_Arbol($2,"<"));            
            nodo_actual.agregar_hijo($3[1]); 

            nodo_cst = new Nodo_Arbol("EXPRESION","");
            nodo_cst.agregar_hijo($1[2]);            
            nodo_cst.agregar_hijo(new Nodo_Arbol($2,"OPERADOR"));            
            nodo_cst.agregar_hijo($3[2]);
            operador = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Menor, $1, $3,  $1.C3D + ' < ' + $3.C3D);
            $$ = [operador, nodo_actual, nodo_cst];
            //$$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Menor, $1, $3,  $1.C3D + ' < ' + $3.C3D);
        }    
        | EXPRESION '>' EXPRESION 
        { 
            nodo_actual = new Nodo_Arbol("EXPRESION","");
            nodo_actual.agregar_hijo($1[1]);             
            nodo_actual.agregar_hijo(new Nodo_Arbol($2,">"));            
            nodo_actual.agregar_hijo($3[1]); 

            nodo_cst = new Nodo_Arbol("EXPRESION","");
            nodo_cst.agregar_hijo($1[2]);            
            nodo_cst.agregar_hijo(new Nodo_Arbol($2,"OPERADOR"));            
            nodo_cst.agregar_hijo($3[2]);
            operador = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Mayor, $1, $3,  $1.C3D + ' > ' + $3.C3D);
            $$ = [operador, nodo_actual, nodo_cst];
            //$$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Mayor, $1, $3,  $1.C3D + ' > ' + $3.C3D);
        }         
        | menos EXPRESION %prec UMINUS 
        { 
            nodo_actual = new Nodo_Arbol("EXPRESION","");            
            nodo_actual.agregar_hijo(new Nodo_Arbol($1,"-"));            
            nodo_actual.agregar_hijo($2[1]); 

            nodo_cst = new Nodo_Arbol("EXPRESION","");           
            nodo_cst.agregar_hijo(new Nodo_Arbol($1,"OPERADOR"));            
            nodo_cst.agregar_hijo($2[2]);
            operador = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Diferente, $2, null, '- ' + $2.C3D);
            $$ = [operador, nodo_actual, nodo_cst];
            //$$ = new OperacionC3D(@1.first_line, @1.first_column,TipoOperador.Diferente, $2, null, '- ' + $2.C3D);
        } 
;

PRIMITIVA: '(' TIPO_DATO ')' identifier 
        { 
            nodo_actual = new Nodo_Arbol("PRIMITIVA","");
            nodo_actual.agregar_hijo($2[1]);  
            nodo_actual.agregar_hijo(new Nodo_Arbol($4, "id")); 

            nodo_cst = new Nodo_Arbol("PRIMITIVA","");
            nodo_cst.agregar_hijo(new Nodo_Arbol($1,"SIGNO"));
            nodo_cst.agregar_hijo($2[1]);
            nodo_cst.agregar_hijo(new Nodo_Arbol($3,"SIGNO"));
            nodo_cst.agregar_hijo(new Nodo_Arbol($4,"IDENTIFICADOR"));
            simbolo = new Simbolo(@1.first_line, @1.first_column, $4, $1+$2+$3+$4, TipoDato.Primitivo, TipoParametro.Variable );
            $$ = [simbolo, nodo_actual, nodo_cst];
            //$$ = new Simbolo(@1.first_line, @1.first_column, $4, $1+$2+$3+$4, TipoDato.Primitivo, TipoParametro.Variable );
        }
        |  identifier 
        { 
            nodo_actual = new Nodo_Arbol("PRIMITIVA","");
            nodo_actual.agregar_hijo(new Nodo_Arbol($1, "id")); 

            nodo_cst = new Nodo_Arbol("PRIMITIVA","");
            nodo_cst.agregar_hijo(new Nodo_Arbol($1,"IDENTIFICADOR"));
            simbolo = new Simbolo(@1.first_line, @1.first_column, $1, $1, TipoDato.Primitivo, TipoParametro.Variable );
            $$ = [simbolo, nodo_actual, nodo_cst];
            
            //$$ = new Simbolo(@1.first_line, @1.first_column, $1, $1, TipoDato.Primitivo, TipoParametro.Variable );
        }
        | IntegerLiteral 
        { 
            nodo_actual = new Nodo_Arbol("PRIMITIVA","");
            nodo_actual.agregar_hijo(new Nodo_Arbol($1, "numero")); 

            nodo_cst = new Nodo_Arbol("PRIMITIVA","");
            nodo_cst.agregar_hijo(new Nodo_Arbol($1,"INTEGER"));
            simbolo = new Simbolo(@1.first_line, @1.first_column, $1, $1, TipoDato.Primitivo, TipoParametro.Entero );
            $$ = [simbolo, nodo_actual, nodo_cst];
            //$$ = new Simbolo(@1.first_line, @1.first_column, $1, $1, TipoDato.Primitivo, TipoParametro.Entero );
        }
        | DoubleLiteral 
        { 
            nodo_actual = new Nodo_Arbol("PRIMITIVA","");
            nodo_actual.agregar_hijo(new Nodo_Arbol($1, "decimal")); 

            nodo_cst = new Nodo_Arbol("PRIMITIVA","");
            nodo_cst.agregar_hijo(new Nodo_Arbol($1,"DOUBLE"));
            simbolo = new Simbolo(@1.first_line, @1.first_column, $1, $1, TipoDato.Primitivo, TipoParametro.Decimal );
            $$ = [simbolo, nodo_actual, nodo_cst];
            //$$ = new Simbolo(@1.first_line, @1.first_column, $1, $1, TipoDato.Primitivo, TipoParametro.Decimal );
        }
;
