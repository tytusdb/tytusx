/* Definición Léxica */
%lex

%options case-insensitive

escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}\'

charLiteralMulti                    \'{stringsingle}*\'

BSL                                 "\\".
%s                                  comment
%%

"//".*                              /* skip comments */
"<!--"                               this.begin('comment');
<comment>"-->"                       this.popState();
<comment>.                          /* skip comment content*/
\s+                                 /* skip whitespace */

"print"                     return 'print';
"null"                      return 'null';
"true"                      return 'true';
"false"                     return 'false';

"+"                         return 'plus';
"-"                         return 'minus';
"*"                         return 'times';
"/"                         return 'div';
"%"                         return 'mod';

"<="                        return 'lte';
">="                        return 'gte';
"<"                         return 'lt';
">"                         return 'gt';
"="                         return 'asig';
"=="                        return 'equal';
"!="                        return 'nequal';

"&&"                        return 'and';
"||"                        return 'or';
"!"                         return 'not';

";"                         return 'semicolon';
"("                         return 'lparen';
")"                         return 'rparen';

"&&"                        return 'and';
"||"                        return 'or';
"!"                         return 'not';
"xml"                       return 'rxml';
"version"                   return 'rversion';
"encoding"                  return 'rencoding';
"?"                         return 'interrogacion';

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';

[a-zA-Z_][a-zA-Z0-9_ñÑ]*            return 'identifier';

{stringliteral}                     return 'StringLiteral';
{charliteral}                       return 'CharLiteral';

{charLiteralMulti}                  return 'charLiteralMulti';

//error lexico
.                                   {
                                        lista_de_Errores.agregar_Error(new Error(contError, yylloc.first_line, yylloc.first_column + 1, "Lexico", "El caracter " + yytext + " no pertenece al lenguaje.")); 
                                        contError++;
                                       
                                       // console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF'

/lex

//SECCION DE IMPORTS
%{
    const {Print} = require("../Instrucciones/Primitivas/Print");
    const {Primitivo} = require("../Expresiones/Primitivo");
    const {Operacion, Operador} = require("../Expresiones/Operacion");
    const {Objeto} = require("../Expresiones/Objeto");
    const {Atributo} = require("../Expresiones/Atributo");

    const {Nodo_Arbol} = require("../AST/NodoArbol");
    const {ReporteGramatical} = require("../AST/ReporteGramatical");
    const {Lista_Errores} = require("../AST/ListaErrores");
    const {Error} =  require("../AST/Error");
    
    var lista_de_Errores = new Lista_Errores();
    var reportegramatical_ = new ReporteGramatical();
    var contError=0;

%}

// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'or'
%left 'and'
%left 'lt' 'lte' 'gt' 'gte' 'equal' 'nequal'
%left 'plus' 'minus'
%left 'times' 'div' 'mod'
%left 'pow'
%left 'not'
%left UMINUS

%left 'lparen' 'rparen'


// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%


/* Definición de la gramática */
START : RAICES EOF
        {
            reportegramatical_.agregar_Elemento(`START -> RAICES `,"START.val = RAICES.val");
            var root = new Nodo_Arbol("START","");
                    root.agregar_hijo($1[1]);
                    $$ = [$1[0], root,reportegramatical_,lista_de_Errores];
                    return $$;
        };
/*
INICIO : lt interrogacion rxml rversion asig StringLiteral rencoding asig StringLiteral interrogacion gt {console.log('version' + $6);}
        
;


RAICES:
    OBJETO RAICESP           
    { 
        //$2.push($1); $$ = $2;
        reportegramatical_.agregar_Elemento("RAICES -> OBJETO OBJETOSP","RAICES.val := RAICESP.push(OBJETO.val)");
        nodo_actual = new Nodo_Arbol("RAICES","");                                  
        nodo_actual.agregar_hijo($1[1]);
        nodo_actual.agregarHijo($2[1]);
        //arr = [$1[0]];
        //arr = arr.concat($2[0]); 
        $2[0].push($1[0]);
        $$ = [$2[0]],nodo_actual]; 
}
	;

RAICESP:
     OBJETO RAICESP          
     { 
       // $2.push($1); $$ = $2;
        reportegramatical_.agregar_Elemento("RAICES -> OBJETO OBJETOSP","RAICES.val := RAICESP.push(OBJETO.val)");
        nodo_actual = new Nodo_Arbol("RAICES","");                                  
        nodo_actual.agregar_hijo($1[1]);
        nodo_actual.agregarHijo($2[1]);
        //arr = [$1[0]];
        //arr = arr.concat($2[0]); 
        $2[0].push($1[0]);
        $$ = [$2[0],nodo_actual]; 
     
     }
    |
    { 
        //$$ = []; 
        reportegramatical_.agregar_Elemento("RAICESP -> EPSILON","RAICES.val := null");
        objeto = new Objeto("","","",1, 1,[],[]);
        nodo_actual = new Nodo_Arbol("RAICESP","");
        nodo_actual.agregarHijo(new Nodo_Arbol("EPSILON",""));
        $$ = [[objeto],nodo_actual]; 
    }
    ;
*/



RAICES:
    RAICES OBJETO
            {
                reportegramatical_.agregar_Elemento(`RAICES -> RAICES OBJETO`,"RAICES.val := RAICES.push(OBJETO.val)");
                nodo_actual = new Nodo_Arbol("RAICES","");                                  
                nodo_actual.agregar_hijo($2[1]);
                $1[1].agregar_hijo(nodo_actual);
                $1[0].push($2[0]); 
                $$ = [$1[0],$1[1]]; 
            }
            |OBJETO
            {
                reportegramatical_.agregar_Elemento(`RAICES -> OBJETO`,"RAICES.val := OBJETO.val");
                nodo_actual = new Nodo_Arbol("OBJETO","");
                nodo_actual.agregar_hijo($1[1]);
                $$ = [[$1[0]],nodo_actual];
            };

OBJETO:
      lt identifier LATRIBUTOS gt RAICES lt div identifier gt       
    { 
        //$$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,$5); 
        reportegramatical_.agregar_Elemento(`OBJETO -> "<" id LATRIBUTOS ">" RAICES "<" / id>`,"OBJETO.val := new Objeto(id.val,LATRIBUTOS.val,RAICES.val)");
        nodo_actual = new Nodo_Arbol("UN_OBJETO","");
        nodo_actual.agregar_hijo(new Nodo_Arbol($1,"menor"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($2,"identificador"));
        nodo_actual.agregar_hijo($3[1]);
        nodo_actual.agregar_hijo(new Nodo_Arbol($4,"mayor"));
        nodo_actual.agregar_hijo($5[1]);
        nodo_actual.agregar_hijo(new Nodo_Arbol($6,"menor"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($7,"diagonal"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($8,"identificador"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($9,"mayor"));
        objeto = new Objeto($2,$8,'',@1.first_line, @1.first_column,$3[0],$5[0]);
        $$ = [objeto,nodo_actual];
    }
    | lt identifier LATRIBUTOS gt LISTA_ID_OBJETO   lt div identifier gt       
    { 
        //$$ = new Objeto($2,$5,@1.first_line, @1.first_column,$3,[]); 
        reportegramatical_.agregar_Elemento(`OBJETO -> "<" id LATRIBUTOS ">" LISTA_ID_OBJETO "<" / id>`,"OBJETO.val := new Objeto(id.val,LATRIBUTOS.val,LISTA_ID_OBJETO.val)");
        nodo_actual = new Nodo_Arbol("UN_OBJETO","");
        nodo_actual.agregar_hijo(new Nodo_Arbol($1,"menor"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($2,"identificador"));
        nodo_actual.agregar_hijo($3[1]);
        nodo_actual.agregar_hijo(new Nodo_Arbol($4,"mayor"));
        nodo_actual.agregar_hijo($5[1]);
        nodo_actual.agregar_hijo(new Nodo_Arbol($6,"menor"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($7,"diagonal"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($8,"identificador"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($9,"mayor"));
        objeto = new Objeto($2,$8,$5[0],@1.first_line, @1.first_column,$3[0],[]);
        $$ = [objeto,nodo_actual];
    }
    | lt identifier LATRIBUTOS div gt                                          
    { 
        //$$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,[]); 
        reportegramatical_.agregar_Elemento(`OBJETO -> "<" id LATRIBUTOS />`,"OBJETO.val := new Objeto(id.val,LATRIBUTOS.val,null)");
        nodo_actual = new Nodo_Arbol("UN_OBJETO","");
        nodo_actual.agregar_hijo(new Nodo_Arbol($1,"menor"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($2,"identificador"));
        nodo_actual.agregar_hijo($3[1]);
        nodo_actual.agregar_hijo(new Nodo_Arbol($4,"diagonal"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($5,"mayor"));
        objeto = new Objeto($2,$2,'',@1.first_line, @1.first_column,$3[0],[]);
        $$ = [objeto,nodo_actual];
    }
    |  lt interrogacion rxml rversion asig StringLiteral rencoding asig StringLiteral interrogacion gt 
    {
        reportegramatical_.agregar_Elemento(`OBJETO -> "<" "?" "xml" "version" "=" cadena "encoding" "=" cadena "?" ">"`,"OBJETO.val := new Objeto(encoding, null, null)");
        nodo_actual = new Nodo_Arbol("UN_OBJETO","");
        nodo_actual.agregar_hijo(new Nodo_Arbol($1,"menor"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($2,"interrogacion"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($3,"RESERVADA"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($4,"RESERVADA"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($5,"igual"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($6,"cadena"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($7,"RESERVADA"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($8,"igual"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($9,"cadena"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($10,"interrogacion"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($11,"mayor"));
        objeto = new Objeto("version","version",$9[0],@1.first_line, @1.first_column,[],[]);
        $$ = [objeto,nodo_actual];
        
    } 
        | error ERR {
        nodo_actual = new Nodo_Arbol("UN_OBJETO","");
        nodo_actual.agregar_hijo(new Nodo_Arbol("ERROR","ERROR"));
        lista_de_Errores.agregar_Error(new Error(contError, yylineno,this._$.first_column + 1, "Sintactico", "Se esperaba un OBJETO y se encontro "+ yytext)); 
        contError++;
        objeto = new Objeto("","",'',@1.first_line, @1.first_column,[],[]);
        $$ = [objeto,nodo_actual];
        
        } 
;
ERR :
        gt 
        | lt
        | identifier
        | div
        | asig
        | texto
        | StringLiteral
        | charLiteralMulti
        | EOF
;




/*
OBJETO:
      lt identifier LATRIBUTOS OBJ 
;
OBJ: gt OBJ2 lt div identifier gt 
    |div gt
;

OBJ2:
     OBJETOS
    |LISTA_ID_OBJETO 
LATRIBUTOS: ATRIBUTOS                               { $$ = $1; }
           |                                        { $$ = []; }
;

ATRIBUTOS:
    ATRIBUTOS ATRIBUTO                              { $1.push($2); $$ = $1;}
    | ATRIBUTO                                      { $$ = [$1]; } 
;

;*/

LATRIBUTOS: ATRIBUTOS                                   
    { 
    //$$ = $1; 
        reportegramatical_.agregar_Elemento(`LATRIBUTOS -> ATRIBUTOS`,"LATRIBUTOS.val := ATRIBUTOS.val");
        nodo_actual = new Nodo_Arbol("LATRIBUTOS","");
        nodo_actual.agregar_hijo($1[1]);
        $$ = [$1[0], nodo_actual]; 
    }
    |                                        
    { 
        //$$ = []; 
        reportegramatical_.agregar_Elemento(`LATRIBUTOS -> ε`,"LATRIBUTOS.val := []");
        nodo_actual = new Nodo_Arbol("EPSILON","");
        nodo_actual.agregar_hijo(new Nodo_Arbol("E","epsilon"));
        $$ = [[], nodo_actual]; 
    }
;
ATRIBUTOS:
    ATRIBUTOS ATRIBUTO                              
    {
       reportegramatical_.agregar_Elemento(`ATRIBUTOS -> ATRIBUTOS ATRIBUTO`,"ATRIBUTOS.val := ATRIBUTOS.push(ATRIBUTOS.val)");
        nodo_actual = new Nodo_Arbol("ATRIBUTOS","");                                  
        nodo_actual.agregar_hijo($2[1]);
        $1[1].agregar_hijo(nodo_actual);
        $1[0].push($2[0]); 
        $$ = [$1[0],$1[1]];
        // $1.push($2); $$ = $1;
    }
    | ATRIBUTO                                      
    {
        //$$ = [$1];  
        reportegramatical_.agregar_Elemento(`ATRIBUTOS -> ATRIBUTO`,"ATRIBUTOS.val := ATRIBUTO.val");
        nodo_actual = new Nodo_Arbol("ATRIBUTO","");
        nodo_actual.agregar_hijo($1[1]);
        $$ = [[$1[0]],nodo_actual];
    } 
;

/*ATRIBUTOS:
    ATRIBUTO ATRIBUTOSP           
    { 
        //$2.push($1); $$ = $2;
        reportegramatical_.agregar_Elemento("ATRIBUTOS -> ATRIBUTO ATRIBUTOP","ATRIBUTOS.val := ATRIBUTOS.push(ATRIBUTO.val)");
        nodo_actual = new Nodo_Arbol("ATRIBUTOS","");                                  
        nodo_actual.agregar_hijo($1[1]);
        nodo_actual.agregar_hijo($2[1]);
        //arr = [$1[0]];
        //arr = arr.concat($2[0]); 
        $2[0].push($1[0]);
        $$ = [$2[0],nodo_actual]; 
    }
;

ATRIBUTOP:
     ATRIBUTO ATRIBUTOP          
     { //$2.push($1); $$ = $2;
        reportegramatical_.agregar_Elemento("ATRIBUTOP -> ATRIBUTO ATRIBUTOP","ATRIBUTOP.val :=  ATRIBUTOP.push(ATRIBUTO.val)"); 
        nodo_actual = new Nodo_Arbol("ATRIBUTOP","");                                  
        nodo_actual.agregar_hijo($1[1]);
        nodo_actual.agregar_hijo($2[1]);
        $2[0].push($1[0]);
        $$ = [$2[0],nodo_actual]; 
        //$$ = [arr,nodo_actual]; 
     }
    |
    { 
        reportegramatical_.agregar_Elemento("ATRIBUTOP -> EPSILON","ATRIBUTOP.val := null");
        atributo = new Atributo("", "", @1.first_line, @1.first_column);
        nodo_actual = new Nodo_Arbol("OtroAtributo","");
        nodo_actual.agregar_hijo(new Nodo_Arbol("ϵ",""));
        $$ = [[atributo],nodoAux]; 
        //$$ = []; 

    }
;*/


/*

*/
ATRIBUTO: 
    identifier asig STR_CHR                   
    { 
        reportegramatical_.agregar_Elemento(`ATRIBUTO -> id "=" STR_CHR`,"ATRIBUTO.val := new Atributo(id.val,STR_CHR.val)");
        //$$ = new Atributo($1, $3, @1.first_line, @1.first_column); 
        nodo_actual = new Nodo_Arbol("ATRIBUTO","");
        nodo_actual.agregar_hijo(new Nodo_Arbol($1,"identificador"));
        nodo_actual.agregar_hijo(new Nodo_Arbol($2,"asignacion"));
        nodo_actual.agregar_hijo($3[1]);
        atributo = new Atributo($1, $3, @1.first_line, @1.first_column);
        $$ = [atributo,nodo_actual]; 
    }
    | error ERR
    {
        nodo_actual = new Nodo_Arbol("ATRIBUTO","");
        nodo_actual.agregar_hijo(new Nodo_Arbol("ERROR","ERROR"));
        lista_de_Errores.agregar_Error(new Error(contError, yylineno,this._$.first_column + 1, "Sintactico", "Se esperaba un OBJETO y se encontro "+ yytext)); 
        contError++;
        
        $$ = [null,nodo_actual];
               
    } 
;

STR_CHR:   StringLiteral               
        { 
            //$$ = $1 
            reportegramatical_.agregar_Elemento(`STR_CHR -> cadenaString`,`STR_CHR.val := cadenaString.lexval`);
            nodo_actual = new Nodo_Arbol($1,"cadena");
            $$ = [$1, nodo_actual]; 
        }
        |  charLiteralMulti            
        { 
            reportegramatical_.agregar_Elemento(`STR_CHR -> cadenaChar`,`STR_CHR.val := cadenaChar.lexval`);
            nodo_actual = new Nodo_Arbol($1,"cadenaChar");
            $$ = [$1, nodo_actual]; 
            //$$ = $1 
        };


/*
LISTA_ID_OBJETO: LISTA_ID_OBJETO identifier          { $1=$1 + ' ' +$2 ; $$ = $1;}
        | identifier                                 { $$ = $1 }
;
*/

/*

OBJETOS:
      OBJETOS OBJETO        { $1.push($2); $$ = $1;}
	| OBJETO                { $$ = [$1]; } ;

OBJETOS:
    RAIZ OBJETOSP           //{ $$ = $2; $2.push($1);}
;

OBJETOSP:
     RAIZ OBJETOSP         // { $$ = $2; $2.push($1);}
    |                         //{ $$ = []; }
;

*/

LISTA_ID_OBJETO:  ID LISTA_ID_OBJETOP
                { 
                    //$2=$1 + ' '+ $2 ; $$ = $2;
                    reportegramatical_.agregar_Elemento(`LISTA_ID_OBJETO -> ID LISTA_ID_OBJETOP`,`LISTA_ID_OBJETO.val := ID.val + " " + LISTA_ID_OBJETOP.val`);
                    nodo_actual = new Nodo_Arbol("LISTA_ID_OBJETO","");                                  
                    nodo_actual.agregar_hijo($1[1]);
                    nodo_actual.agregar_hijo($2[1]);
                    $1[0]= $1[0] + " " + $2[0]; 
                    $$ = [$1[0],nodo_actual];
                }
;

LISTA_ID_OBJETOP:  ID LISTA_ID_OBJETOP
                {
                    // $2=$1 + ' ' + $2 ; $$ = $2;
                    reportegramatical_.agregar_Elemento(`LISTA_ID_OBJETOP -> ID LISTA_ID_OBJETOP`,`LISTA_ID_OBJETOP.val := ID.val + " " + LISTA_ID_OBJETOP.val`);
                    nodo_actual = new Nodo_Arbol("LISTA_ID_OBJETOP","");                                  
                    nodo_actual.agregar_hijo($1[1]);
                    nodo_actual.agregar_hijo($2[1]);
                    $1[0]= $1[0] + " " + $2[0]; 
                    $$ = [$1[0],nodo_actual];
                }
                |
                { 
                    reportegramatical_.agregar_Elemento(`LISTA_ID_OBJETOP -> EPSIOLON`,`LISTA_ID_OBJETOP.val := ""`);
                    nodo_actual = new Nodo_Arbol("LISTA_ID_OBJETOP","");                                  
                    nodo_actual.agregar_hijo(new Nodo_Arbol(`""`,""));
                    $$ = ["",nodo_actual];
                    //$$ = ''; 
                }
;



ID:          identifier      
            {  
                reportegramatical_.agregar_Elemento(`id -> identificador`,`ID.val := identificador.lexval`);
                nodo_actual = new Nodo_Arbol("IDENTIFICADOR","");
                nodo_actual.agregar_hijo(new Nodo_Arbol($1,"texto"));
                $$ = [$1,nodo_actual];
                //$$ = $1 
            }
            | DoubleLiteral   
            { 
                reportegramatical_.agregar_Elemento(`ID -> double`,`ID.val := double.lexval`);
                nodo_actual = new Nodo_Arbol("DOUBLE","");
                nodo_actual.agregar_hijo(new Nodo_Arbol($1,"texto"));
                $$ = [$1,nodo_actual];
                //$$ = $1 
            }
            | IntegerLiteral  
            { 
                reportegramatical_.agregar_Elemento(`ID -> integer`,`ID.val := integer.lexval`);
                nodo_actual = new Nodo_Arbol("INTEGER","");
                nodo_actual.agregar_hijo(new Nodo_Arbol($1,"texto"));
                $$ = [$1,nodo_actual];
                //$$ = $1 
            }
;


