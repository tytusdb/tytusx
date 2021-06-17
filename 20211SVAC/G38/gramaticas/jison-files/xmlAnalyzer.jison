
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
"\\="|"\\<"|"\\>"|"\\/"|"\\“"|"\\\""|"\\'"|"\\’"|"\\`"|"\\`"|"\\‘"|.                         return 'signo_especial'
"&lt;"|"&gt;"|"&amp;"|"&apos;"|"&quot;"|"&eq;"                                             return 'caracter_especial'
[^a-zA-Z/<>=]                     return 'signo'

<<EOF>>               return 'EOF'

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
            $$=new XmlRoot($1);
            $1.parent = $$;
            return $$;
        }}
        | EOF
    ;

LISTA_TAGS      : LISTA_TAGS TAG 
                {{
                    ReporteGramatical.agregarProduccionXML("LISTA_TAGS -> LISTA_TAGS TAG","$$ = $1 ;$$.push($2);");
                    $$ = $1 ;
                    $$.push($2);
                }}
                | LISTA_TAGS error
                                 {{
                                     ListaErrores.AgregarErrorXML(new TokenError(TipoError.Sintactico,"No se esperaba "+yytext,@2.first_line,@2.first_column));
                                     $$ = $1 ;
                                 }}
                | TAG 
                {{
                    ReporteGramatical.agregarProduccionXML("LISTA_TAGS -> TAG","$$ = [] ;$$.push($1);");
                    $$ = [] ;
                    $$.push($1);
                }}

                |error
                {{
                    $$=[];
                    ListaErrores.AgregarErrorXML(new TokenError(TipoError.Sintactico,"No se esperaba "+yytext,@1.first_line,@1.first_column));

                }}
                ;

TAG             :  TAG_APERTURA mayor TAG_CIERRE 
                {{
                    ReporteGramatical.agregarProduccionXML("TAG -> TAG_APERTURA mayor TAG_CIERRE","var parent = $1;$$ = parent ;");
                    var parent = $1;
                    $$ = parent ;
                    ListaErrores.ValidarEtiquetas(parent._name,$3, @3.first_line, @3.first_column);
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
                    ListaErrores.ValidarEtiquetas(parent._name,$4, @4.first_line, @4.first_column);
                }}
                |  TAG_APERTURA mayor CONTENIDO TAG_CIERRE 
                {{
                    ReporteGramatical.agregarProduccionXML("TAG -> TAG_APERTURA mayor CONTENIDO TAG_CIERRE",
                                        "var parent = $1;var contenido = new XmlContent(null,null,parent,$3.firts_line,$3.firts_column,$3);parent.childs.push(contenido);$$ = parent;");
                    var parent = $1;
                    var contenido = new XmlContent(null,null,parent,$3.firts_line,$3.firts_column,$3);
                    parent.childs.push(contenido);
                    $$ = parent;
                    ListaErrores.ValidarEtiquetas(parent._name,$4, @4.first_line, @4.first_column);
                }}
                |error mayor
                ;

TAG_APERTURA    :  TAG_APERTURA id igual str 
                {{
                    ReporteGramatical.agregarProduccionXML("TAG_APERTURA -> TAG_APERTURA id igual str"
                                    ,"var attribute = new XmlAttribute($2,$4);$$=$1;var element = $$;$$.attributes.push(attribute);");
                    var attribute = new XmlAttribute($2,$4,$1,1,1);
                    $$=$1;
                    var element = $$;
                    $$.attributes.push(attribute);
                }}
                | menor id 
                {{
                    ReporteGramatical.agregarProduccionXML("TAG_APERTURA -> menor id"
                                    ,"$$=new XmlElement(null,$2,null, @2.first_line, @2.first_column,null);");
                     $$=new XmlElement(null,$2,null, @2.first_line, @2.first_column,null);
                }}
                ;

TAG_CIERRE      : menor slash id mayor
                {{
                    ReporteGramatical.agregarProduccionXML("TAG_CIERRE -> menor slash id mayor"
                                    ,"$$=$3;");
                       $$=$3;
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