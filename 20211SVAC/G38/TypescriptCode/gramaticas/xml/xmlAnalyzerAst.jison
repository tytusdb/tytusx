
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
        }}
        | EOF
    ;

LISTA_TAGS      : LISTA_TAGS TAG 
                {{

                }}
                | LISTA_TAGS error
                                 {{


                                 }}
                | TAG 
                {{


                }}

                |error
                {{



                }}
                ;

TAG             :  TAG_APERTURA mayor TAG_CIERRE 
                {{

                }}
                |  TAG_APERTURA slash mayor 
                {{

                }}
                |  TAG_APERTURA mayor LISTA_TAGS TAG_CIERRE 
                {{

                }}
                |  TAG_APERTURA mayor CONTENIDO TAG_CIERRE 
                {{

                }}
                |error mayor
                ;

TAG_APERTURA    :  TAG_APERTURA id igual str 
                {{

                }}
                | menor id 
                {{

                }}
                ;

TAG_CIERRE      : menor slash id mayor
                {{
                    var label = 'label="TAG_CIERRE",';
                    var color = 'color="lightblue3",'
                    var nombre = XpathUtil.generarIdUnicoXmlNode();
                    var cadena=nombre+"["+label+color+"];\n ";

                    var nombreMenor = XpathUtil.generarIdUnicoXmlNode();
                    var labelMenor = 'label="</",color="greenyellow",';
                    var cadenaMenor = nombreMenor+"["+labelMenor+color+"];\n ";

                    var id = XpathUtil.generarIdUnicoXmlNode();
                    var nombreMayor = XpathUtil.generarIdUnicoXmlNode();
                    var cadId = 'label="id(valLex='+$2+')",';
                    var cadMayor = 'label=">",';
                    
                    

                    var labelTerminal = 'label="TAG_CIERRE",';
                    var color = 'color="lightblue3",'
                    var nombre = XpathUtil.generarIdUnicoXmlNode();
                    var cadena=nombre+"["+label+color+"];\n ";


                    var apuntador = nombre"->"$1["nombre"]+";\n"+nombre"->"$2["nombre"]+";\n"
                    $$=[];
                    $$["nombre"]=nombre;
                    $$["cadena"]=cadena+$1["cadena"]+apuntador;

                }}
                ;


/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++     CONTENIDO   ++++++++++++*/


CONTENIDO       :  CONTENIDO VALOR
                {{
                    var label = 'label="VALOR",';
                    var color = 'color="lightblue3",'
                    var nombre = XpathUtil.generarIdUnicoXmlNode();
                    var cadena=nombre+"["+label+color+"];\n ";
                    var apuntador = nombre"->"$1["nombre"]+";\n"+nombre"->"$2["nombre"]+";\n"
                    $$=[];
                    $$["nombre"]=nombre;
                    $$["cadena"]=cadena+$1["cadena"]+apuntador;
                }}
                | VALOR
                {{
                    var label = 'label="VALOR",';
                    var color = 'color="lightblue3",'
                    var nombre = XpathUtil.generarIdUnicoXmlNode();
                    var cadena=nombre+"["+label+color+"];\n ";
                    var apuntador = nombre"->"$1["nombre"]+";\n"
                    $$=[];
                    $$["nombre"]=nombre;
                    $$["cadena"]=cadena+$1["cadena"]+apuntador;
                }}
                ;

VALOR           : id
                {{
                    var label = 'label="id(valLex='+$1+')",';
                    var color = 'color="greenyellow",'
                    var nombre = XpathUtil.generarIdUnicoXmlNode();
                    var cadena=nombre+"["+label+color+"];\n ";
                    $$=[];
                    $$["nombre"]=nombre;
                    $$["cadena"]=cadena;

                }}
                | str
                {{
                    var label = 'label="str(valLex='+$1+')",';
                    var color = 'color="greenyellow",'
                    var nombre = XpathUtil.generarIdUnicoXmlNode();
                    var cadena=nombre+"["+label+color+"];\n ";
                    $$=[];
                    $$["nombre"]=nombre;
                    $$["cadena"]=cadena;

                }}
                | signo_especial
                {{
                    var label = 'label="signo_especial(valLex='+$1+')",';
                    var color = 'color="greenyellow",'
                    var nombre = XpathUtil.generarIdUnicoXmlNode();
                    var cadena=nombre+"["+label+color+"];\n ";
                    $$=[];
                    $$["nombre"]=nombre;
                    $$["cadena"]=cadena;

                }}
                |caracter_especial
                {{
                    var label = 'label="caracter_especial(valLex='+$1+')",';
                    var color = 'color="greenyellow",'
                    var nombre = XpathUtil.generarIdUnicoXmlNode();
                    var cadena=nombre+"["+label+color+"];\n ";
                    $$=[];
                    $$["nombre"]=nombre;
                    $$["cadena"]=cadena;

                }}
                | signo
                {{
                    var label = 'label="signo(valLex='+$1+')",';
                    var color = 'color="greenyellow",'
                    var nombre = XpathUtil.generarIdUnicoXmlNode();
                    var cadena=nombre+"["+label+color+"];\n ";
                    $$=[];
                    $$["nombre"]=nombre;
                    $$["cadena"]=cadena;

                }}
                | num
                {{
                    var label = 'label="num(valLex='+$1+')",';
                    var color = 'color="greenyellow",'
                    var nombre = XpathUtil.generarIdUnicoXmlNode();
                    var cadena=nombre+"["+label+color+"];\n ";
                    $$=[];
                    $$["nombre"]=nombre;
                    $$["cadena"]=cadena;

                }}
                ;