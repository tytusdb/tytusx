
/* SECCION DE IMPORTS */
%{

%}

/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%options case-insensitive
%%

\s+                   /* skip whitespace */
"<!--"[^'-']*"-->"			/*skip multi line coment*/
/*WORD RESERVED*/


/*OPERATORS*/

"<"						return	'menor'
">"						return	'mayor'
"="                   	return 'igual'

/*ARITHMETIC OPERATORS */
"/"                   	return 'slash'


/*REGULAR EXPRESSIONS*/
"“"[^\"\n]*"”" 				return 'str'
"\""[^\"\n]*"\"" 			return 'str'
"'"[^''\n]*"'" 				return 'str'
"‘"[^''\n]*"’" 				return 'str'
"`"[^''\n]*"`" 				return 'str'
[0-9]+("."[0-9]+)?\b  				return 'num'
[a-zA-ZñÑáéíóúÁÉÍÓÚ]([a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ]|"_"|"-")*			return 'id'
"\\="|"\\<"|"\\>"|"\\/"|"\\“"|"\\\""|"\\'"|"\\’"|"\\`"|"\\`"|"\\‘"                         return 'signo_especial'
"&lt;"|"&gt;"|"&amp;"|"&apos;"|"&quot;"|"&eq;"                                             return 'caracter_especial'
[^a-zA-Z/<>=]                     return 'signo'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex



%start S

%% /* language grammar */


/*********************************************************************************************/
/*********************************************************************************************/
/***********************************	S	**************************************************/
/*********************************************************************************************/
/*********************************************************************************************/


S   :  TAG EOF
        {{
            ReporteGramatical.agregarProduccionXML("S -> TAG EOF","$$ = $1;return $$;");
            $$ = $1;
            return $$;
        }}
        | EOF
    ;

LISTA_TAGS      :  TAG  LISTA_TAGS_P
                {{
                    ReporteGramatical.agregarProduccionXML("LISTA_TAGS -> TAG LISTA_TAGS_P","$$ = $2; $$.unshift($1); ");
                    $$ = $2;
                    $$.unshift($1);
                }}
                ;

LISTA_TAGS_P      : TAG LISTA_TAGS_P
                {{
                    ReporteGramatical.agregarProduccionXML("LISTA_TAGS_P -> TAG LISTA_TAGS_P","$$ = $2;$$.unshift($1);");
                    $$ = $2;
                    $$.unshift($1);
                }}
                |
                {{
                    ReporteGramatical.agregarProduccionXML("LISTA_TAGS_P -> ε","$$ = [] ;");
                    $$ = [] ;
                }}
                ;




TAG             :  TAG_APERTURA mayor TAG_CIERRE 
                {{
                    ReporteGramatical.agregarProduccionXML("TAG -> TAG_APERTURA mayor TAG_CIERRE","var parent = $1;$$ = parent ;");
                    var parent = $1;
                    $$ = parent ;
                }}
                |  TAG_APERTURA slash mayor 
                {{
                    ReporteGramatical.agregarProduccionXML("TAG -> TAG_APERTURA slash mayor","var parent = $1;$$ = parent ;");
                    var parent = $1;
                    $$ = parent ;
                }}
                |  TAG_APERTURA mayor LISTA_TAGS TAG_CIERRE 
                {{
                    ReporteGramatical.agregarProduccionXML("TAG -> TAG_APERTURA mayor LISTA_TAGS TAG_CIERRE",
                                      "var parent = $1;var childs = $3;for(let child of childs){    child.parent = parent;};parent.childs = childs;$$ = parent;");
                    var parent = $1;
                    var childs = $3;
                    for(let child of childs){
                        child.parent = parent;
                    };
                    parent.childs = childs;
                    $$ = parent;
                }}
                |  TAG_APERTURA mayor CONTENIDO TAG_CIERRE 
                {{
                    ReporteGramatical.agregarProduccionXML("TAG -> TAG_APERTURA mayor CONTENIDO TAG_CIERRE",
                                        "var parent = $1;var contenido = new XmlContent(null,null,parent,$3.firts_line,$3.firts_column,$3);parent.childs.push(contenido);$$ = parent;");
                    var parent = $1;
                    var contenido = new XmlContent(null,null,parent,$3.firts_line,$3.firts_column,$3);
                    parent.childs.push(contenido);
                    $$ = parent;
                }}
                ;

TAG_APERTURA    :   menor id TAG_APERTURA_P
                {{
                    ReporteGramatical.agregarProduccionXML("TAG_APERTURA -> menor id TAG_APERTURA_P"
                                    ,"$$=new XmlElement(null,$2,null, @2.first_line, @2.first_column,null);$$.attributes = $3;");

                     $$=new XmlElement(null,$2,null, @2.first_line, @2.first_column,null);
                     $$.attributes = $3;

                }}
                ;

TAG_APERTURA_P    :  id igual str  TAG_APERTURA_P
                {{
                    ReporteGramatical.agregarProduccionXML("TAG_APERTURA_P -> id igual str  TAG_APERTURA_P"
                                    ,"var attribute = new XmlAttribute($1,$3);$$=$4;$$.unshift(attribute);");
                    var attribute = new XmlAttribute($1,$3);
                    $$=$4;
                    $$.unshift(attribute);
                }}
                |
                {{
                    ReporteGramatical.agregarProduccionXML("TAG_APERTURA_P -> ε "
                                    ,"$$=[]");
                     $$=[];
                }}
                ;

TAG_CIERRE      : menor slash id mayor
                {{
                    ReporteGramatical.agregarProduccionXML("TAG_CIERRE -> menor slash id mayor"
                                    ,"");
                }}
                ;


/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++     CONTENIDO   ++++++++++++*/


CONTENIDO       :  CONTENIDO VALOR
                {{
                    ReporteGramatical.agregarProduccionXML("CONTENIDO -> CONTENIDO VALOR"
                                    ,"$$=$1+$2;");
                    $$=$1+$2;
                }}
                | VALOR
                {{
                    ReporteGramatical.agregarProduccionXML("CONTENIDO -> VALOR"
                                    ,"$$=$1;");
                    $$=$1;
                }}
                ;

CONTENIDO_P       :  CONTENIDO CONTENIDO_P
                {{
                    ReporteGramatical.agregarProduccionXML("CONTENIDO_P -> CONTENIDO CONTENIDO_P "
                                    ,"$$=$2+$1; ");
                    $$=$2+$1;
                }}
                |
                {{
                    ReporteGramatical.agregarProduccionXML("CONTENIDO_P -> ε"
                                    ,"$$="";");
                    $$="";
                }}
                ;

VALOR           : id
                {{
                    ReporteGramatical.agregarProduccionXML("VALOR -> id"
                                    ,'$$=$1+" "');
                    $$=$1+" ";
                }}
                | str
                {{
                    ReporteGramatical.agregarProduccionXML("VALOR -> str"
                                    ,'$$=$1+" "');
                    $$=$1+" ";
                }}
                | signo_especial
                {{
                    ReporteGramatical.agregarProduccionXML("VALOR -> signo_especial"
                                    ,'$$=$1+" "');
                    $$=$1+" ";
                }}
                |caracter_especial
                {{
                    ReporteGramatical.agregarProduccionXML("VALOR -> caracter_especial"
                                    ,'$$=$1+" "');
                    $$=$1.toLowerCase()+" ";
                }}
                | signo
                {{
                    ReporteGramatical.agregarProduccionXML("VALOR -> signo"
                                    ,'$$=$1+" "');
                    $$=$1+" ";
                }}
                | num
                {{
                    ReporteGramatical.agregarProduccionXML("VALOR -> num"
                                    ,'$$=$1+" "');
                    $$=$1+" ";
                }}
                ;