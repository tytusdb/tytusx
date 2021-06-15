


%{
%}
%lex
%options case-insensitive 


escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
alfanumerico                       \"{stringdouble}*\"
//strings                            {stringdouble}+

integer [0-9]+
double {integer}"."{integer}
letras [(a-z)|(A-Z)]+
keyboard [\n\r\t ]               // Tabulador, espacios, saltos de linea, retornos de carro -> forman parte del identificador para evitar conflictos, sin embargo deben ser eliminados unicamente cuando venga un nombre de un TAG
identificador  {letras}( [0-9]|(\-|\_)*|{letras} )*{keyboard}*
strings   [^ \n][^<&]+

%%     

//\s+                         /* skip whitespace */
//"print"                     return "print"
//{double}                    return 'Number_Literal'
//{integer}                   return 'Number_Literal'
{identificador}             return 'Tag_ID'
"&lt;"                      return 'lthan'
"&gt;"                      return 'gthan'
"&amp;"                     return 'amp'
"&apos;"                    return 'apos'
"&quot;"                    return 'quot'
"/"                         return 'F_Slash'
"?"                         return 'qm'
//"("                         return '('
//")"                         return ')'
">"                         return 'GT'
"<"                         return 'LT'
">"                         return 'QM'
"="                         return 'Equal'
{alfanumerico}              return "Alphanumeric"
"\""                        return 'Quote'
{strings}                   return 'strings'

\s+                         /* skip whitespace */

//[a-zA-Z_][a-zA-Z0-9_ñÑ]*    return 'identifier';

//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }


<<EOF>>                     return 'EOF';



/lex

//SECCION DE IMPORTS
%{
    const {Elemento} = require("../../CLASES/Elemento");
    const {Atributo} = require("../../CLASES/Atributo");
%}

// DEFINIMOS PRESEDENCIA DE OPERADORES



%start START

%%  

START: TAGS EOF         { $$ = $1; /*console.log($1, $2);*/ return $$; } //strings PREDEFINIDOS Tag_ID
;
   
TAGS: PROLOG TAG               {$$ = $2; console.log($2);} // objetos tipo TAG ($$ = clase Elemento)
;

PROLOG: LT qm Tag_ID Tag_ID Equal Alphanumeric Tag_ID Equal Alphanumeric qm GT { 

    if(String($4).replace(/\s/g,'') == 'version') 
        if(String($7).replace(/\s/g,'') == 'encoding')
            $$ = $9; // retornamos el encodigo que requiere
        else $$ = null;  
    else $$ = null;
    
    }
;

TAG:  LT Tag_ID L_ATRIBUTOS GT  ELEMENTOS   LT F_Slash Tag_ID GT          { $$ =  new Elemento(String($2).replace(/\s/g,''), $5.texto, @1.first_line, @1.first_column, $3, $5.hijos); /*console.log('Tag->',$2,'\n',$5.hijos,'\n <-cerrar');*/}
    | LT Tag_ID L_ATRIBUTOS GT              LT F_Slash Tag_ID GT          {$$ =  new Elemento(String($2).replace(/\s/g,''), $5.texto, @1.first_line, @1.first_column, $3, []);}
    //| LT Tag_ID L_ATRIBUTOS GT  L_STRINGS   LT F_Slash Tag_ID GT          {$$ = $1;}
    | LT Tag_ID L_ATRIBUTOS F_Slash GT                                    {$$ =  new Elemento(String($2).replace(/\s/g,''), $5.texto, @1.first_line, @1.first_column, $3, []) ;}
;

ELEMENTOS: ELEMENTOS TAG                { $1.hijos.push($2); $$ = $1;         }
        |  ELEMENTOS strings            { $1.texto += $2; $$ = $1;             /* console.log('ELEMENTOS strings ->',$1, $2, '--> ', $1);*/ }
        |  ELEMENTOS PREDEFINIDOS       { $1.texto += $2; $$ = $1; }
        //|  ELEMENTOS Alphanumeric       { $1.texto += $2; $$ = $1;              console.log('ELEMENTOS ALPHA ->',$1, $2, '--> ', $1); }
        |  ELEMENTOS Tag_ID             { $1.texto += ('' + $2); $$ = $1;      /*console.log('ELEMENTOS Tag_ID ->',$1, $2, '--> ', $1);*/ }
        |  TAG                          { $$ = {texto:'', hijos:[$1]};        } 
        |  strings                      { $$ = {texto:String($1), hijos:[]}; /* console.log('strings ->', $1,'END');*/}
        |  Tag_ID                       { $$ = {texto:String($1), hijos:[]};  /*console.log('Tag_ID ->', $1);*/}
        | PREDEFINIDOS                  { $$ = {texto: $1, hijos:[]}; }
        //|  Alphanumeric               { $$ = {texto:String($1), hijos:[]};  console.log('Alphanumeric ->', $1);} 
;

PREDEFINIDOS: lthan     { $$ = String('<');  }
            | gthan     { $$ = String('>');  }
            | amp       { $$ = String('&');  }
            | apos      { $$ = String("'");  }
            | quot      { $$ = String('"');  }
;

L_ATRIBUTOS: ATRIBUTOS      { $$ = $1; /*console.log($1);*/} 
            |               { $$ = []; } // arreglo vacio de atributos
;            


ATRIBUTOS: ATRIBUTOS ATRIBUTO   { $1.push($2); $$ = $1; }
        | ATRIBUTO              { $$ = [$1]; } // Creacion del arreglo de atributos
;

ATRIBUTO: Tag_ID Equal Alphanumeric         { $$ = new Atributo(String($1).replace(/\s/g,''), $3, @1.first_line, @1.first_column);}
;


