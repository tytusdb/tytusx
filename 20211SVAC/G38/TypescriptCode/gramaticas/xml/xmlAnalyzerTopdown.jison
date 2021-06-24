
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


%right 'igual'
%left 'menor'

%start S

%% /* language grammar */



LISTA_TAGS      : LISTA_TAGS TAG
                {{
					//parent
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="LISTA_TAGS_P",'+'color="lightblue3",'+"];\n ";
					//RESULTADO
                    var cad = cadenaRoot  + $2["cad"] + $1["cad"];
					cad+=nombreRoot+"->"+$2["nombre"]+";\n";
					cad+=nombreRoot+"->"+$1["nombre"]+";\n";
					$$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;

                }}
                | TAG
                {{

					//parent
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="LISTA_TAGS",'+'color="lightblue3",'+"];\n ";
					//childs
					//RESULTADO
                    var cad = cadenaRoot + $1["cad"];
					cad+=nombreRoot+"->"+$1["nombre"]+";\n";
					$$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;

                }}

                ;


/*********************************************************************************************/
/*********************************************************************************************/
/***********************************	S	**************************************************/
/*********************************************************************************************/
/*********************************************************************************************/


S   :  TAG EOF
        {{
					//parent
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="S",'+'color="lightblue3",'+"];\n ";
					//RESULTADO
                    var cad = cadenaRoot + $1["cad"]  ;
					cad+=nombreRoot+"->"+$1["nombre"] +";\n";


                    var cadena
                    cadena = "digraph G { \n ";
                    cadena += cad;
                    cadena += "}";
                    return cadena;
        }}
    ;

LiSTA_TAGS      :  TAG LISTA_TAGS_P
                {{
					//parent
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="LISTA_TAGS",'+'color="lightblue3",'+"];\n ";
					//RESULTADO
                    var cad = cadenaRoot + $1["cad"] + $2["cad"] ;
					cad+=nombreRoot+"->"+$1["nombre"]+";\n";
					cad+=nombreRoot+"->"+$2["nombre"]+";\n";
					$$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;
                }}
                ;

 LISTA_TAGS_P     : TAG     LISTA_TAGS_P
                {
					//parent CONTENIDO->CONTENIDO VALOR
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="LISTA_TAGS_P",'+'color="lightblue3",'+"];\n ";
					//RESULTADO
                    var cad = cadenaRoot + $1["cad"] + $2["cad"] ;
					cad+=nombreRoot+"->"+$1["nombre"]+";\n";
					cad+=nombreRoot+"->"+$2["nombre"]+";\n";
					$$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;
                }
                |
                {
					//parent CONTENIDO->CONTENIDO VALOR
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="LISTA_TAGS_P",'+'color="lightblue3",'+"];\n ";
                    //epsion
                    var nombreEpison = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaEpsion =nombreRoot+"["+'label="Ɛ",'+'color="green",'+"];\n ";
                    //
                    var cad = cadenaRoot + cadenaEpsion;
                    cad += nombreRoot+"->"+nombreEpison+"; \n ";
                    //Resultado
					$$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;
                }

                ;

TAG             :  TAG_APERTURA mayor TAG_CIERRE
                {{
					//parent TAG_APERTURA mayor TAG_CIERRE
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="TAG",'+'color="lightblue3",'+"];\n ";
					//childs
                    var nombreMayor = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaMayor=nombreMayor+"["+'label=">",'+'color="greenyellow",'+"];\n ";

					//RESULTADO
					var cad = cadenaRoot + $1["cad"]+ cadenaMayor + $3["cad"]     ;
					cad+=nombreRoot+"->"+$1["nombre"]+";\n";
					cad+=nombreRoot+"->"+nombreMayor+";\n";
					cad+=nombreRoot+"->"+$3["nombre"]+";\n";

                    $$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;

                }}
                |  TAG_APERTURA slash mayor
                {{
					//parent TAG_APERTURA slash mayor
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="TAG",'+'color="lightblue3",'+"];\n ";
					//childs
                    var nombreMayor = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaMayor=nombreMayor+"["+'label="/>",'+'color="greenyellow",'+"];\n ";

					//RESULTADO
					var cad = cadenaRoot + $1["cad"]+ cadenaMayor    ;
					cad+=nombreRoot+"->"+$1["nombre"]+";\n";
					cad+=nombreRoot+"->"+nombreMayor+";\n";
                    $$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;


                }}
                |  TAG_APERTURA mayor LISTA_TAGS TAG_CIERRE
                {{
					//parent TAG_APERTURA mayor LISTA_TAGS TAG_CIERRE
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="TAG",'+'color="lightblue3",'+"];\n ";
					//childs
                    var nombreMayor = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaMayor=nombreMayor+"["+'label=">",'+'color="greenyellow",'+"];\n ";

					//RESULTADO
					var cad = cadenaRoot + $1["cad"]+ cadenaMayor + $3["cad"]+ $4["cad"]    ;
					cad+=nombreRoot+"->"+$1["nombre"]+";\n";
					cad+=nombreRoot+"->"+nombreMayor+";\n";
					cad+=nombreRoot+"->"+$3["nombre"]+";\n";
					cad+=nombreRoot+"->"+$4["nombre"]+";\n";

                    $$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;


                }}
                |  TAG_APERTURA mayor CONTENIDO TAG_CIERRE
                {{
					//parent TAG_APERTURA mayor CONTENIDO TAG_CIERRE
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="TAG",'+'color="lightblue3",'+"];\n ";
					//childs
                    var nombreMayor = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaMayor=nombreMayor+"["+'label=">",'+'color="greenyellow",'+"];\n ";

					//RESULTADO
					var cad = cadenaRoot + $1["cad"]+ cadenaMayor + $3["cad"]+ $4["cad"]    ;
					cad+=nombreRoot+"->"+nombreMayor+";\n";
					cad+=nombreRoot+"->"+$1["nombre"]+";\n";
					cad+=nombreRoot+"->"+$3["nombre"]+";\n";
					cad+=nombreRoot+"->"+$4["nombre"]+";\n";

                    $$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;

                }}
                ;

TAG_APERTURA    :  TAG_APERTURA id igual str
                {{
					//parent
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="TAG_APERTURA",'+'color="lightblue3",'+"];\n ";
					//childs
					var nombreId = XpathUtil.generarIdUnicoXmlNode();
					var cadenaId = nombreId + "["+'label="id(valLex='+$2+')",'+'color="greenyellow",'+"];\n ";

                    var nombreIgual = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaIgual=nombreIgual+"["+'label="=",'+'color="greenyellow",'+"];\n ";

					var nombreStr = XpathUtil.generarIdUnicoXmlNode();
					var cadenaStr = nombreStr + "["+'label="str(valLex='+$4.substr(1,($4).length-2)+')",'+'color="greenyellow",'+"];\n ";

					//RESULTADO
					var cad = cadenaRoot + $1["cad"] + cadenaId + cadenaIgual + cadenaStr ;
					cad+=nombreRoot+"->"+$1["nombre"]+";\n";
					cad+=nombreRoot+"->"+nombreId+";\n";
					cad+=nombreRoot+"->"+nombreIgual+";\n";
					cad+=nombreRoot+"->"+nombreStr+";\n";

                    $$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;

                }}
                | menor id
                {{
					//parent
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="TAG_APERTURA",'+'color="lightblue3",'+"];\n ";
					//childs
                    var nombreMenor = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaMenor=nombreMenor+"["+'label="<",'+'color="greenyellow",'+"];\n ";
					var nombreId = XpathUtil.generarIdUnicoXmlNode();
					var cadenaId = nombreId + "["+'label="id(valLex='+$2+')",'+'color="greenyellow",'+"];\n ";
					//RESULTADO asdf
					var cad = cadenaRoot + cadenaMenor + cadenaId ;
					cad+=nombreRoot+"->"+nombreMenor+";\n";
					cad+=nombreRoot+"->"+nombreId+";\n";

                    $$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;

                }}
                ;

TAG_CIERRE      : menor slash id mayor
                {{
					//parent
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="TAG_CIERRE",'+'color="lightblue3",'+"];\n ";
					//childs
                    var nombreMenor = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaMenor=nombreMenor+"["+'label="</",'+'color="greenyellow",'+"];\n ";

					var nombreId = XpathUtil.generarIdUnicoXmlNode();
					var cadenaId = nombreId + "["+'label="id(valLex='+$3+')",'+'color="greenyellow",'+"];\n ";

                    var nombreMayor = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaMayor=nombreMayor+"["+'label=">",'+'color="greenyellow",'+"];\n ";
					//RESULTADO
					var cad = cadenaRoot + cadenaMenor + cadenaId + cadenaMayor;
					cad+=nombreRoot+"->"+nombreMenor+";\n";
					cad+=nombreRoot+"->"+nombreId+";\n";
					cad+=nombreRoot+"->"+nombreMayor+";\n";

                    $$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;

                }}
                ;


/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++     CONTENIDO   ++++++++++++*/


CONTENIDO       :  VALOR CONTENIDO_P
                {{
					//parent CONTENIDO->VALOR
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="CONTENIDO",'+'color="lightblue3",'+"];\n ";
					//childs
					//RESULTADO
                    var cad = cadenaRoot + $1["cad"]+ $2["cad"];
					cad+=nombreRoot+"->"+$1["nombre"]+";\n";
					cad+=nombreRoot+"->"+$2["nombre"]+";\n";
					$$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;

                }}
				;


CONTENIDO_P     :   VALOR   CONTENIDO_P
                {
					//parent CONTENIDO->CONTENIDO VALOR
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="CONTENIDO_P",'+'color="lightblue3",'+"];\n ";
					//RESULTADO
                    var cad = cadenaRoot + $1["cad"] + $2["cad"] ;
					cad+=nombreRoot+"->"+$1["nombre"]+";\n";
					cad+=nombreRoot+"->"+$2["nombre"]+";\n";
					$$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;
                }
                 |
                 {
					//parent CONTENIDO->CONTENIDO VALOR
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="CONTENIDO_P",'+'color="lightblue3",'+"];\n ";
                    //epsion
                    var nombreEpison = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaEpsion =nombreRoot+"["+'label="Ɛ",'+'color="green",'+"];\n ";
                    //
                    var cad = cadenaRoot + cadenaEpsion;
                    cad += nombreRoot+"->"+nombreEpison+"; \n ";
                    //Resultado
					$$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;
                 }
                 ;


VALOR           : id
                {{
					//parent  id
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="VALOR",'+'color="lightblue3",'+"];\n ";
					//childs
                    var labelTerminal = 'label="id(valLex='+$1+')",';
                    var colorTerminal = 'color="greenyellow",';
                    var nombreTerminal = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaTerminal=nombreTerminal+"["+labelTerminal+colorTerminal+"];\n ";
					//RESULTADO
                    var cad = cadenaRoot + cadenaTerminal;
					cad+=nombreRoot+"->"+nombreTerminal+";\n";
					$$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;

                }}
                | str
                {{
					//parent
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="VALOR",'+'color="lightblue3",'+"];\n ";
					//childs
                    var labelTerminal = 'label="str(valLex='+$1.substr(1,($1).length-2)+')",';
                    var colorTerminal = 'color="greenyellow",';
                    var nombreTerminal = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaTerminal=nombreTerminal+"["+labelTerminal+colorTerminal+"];\n ";
					//RESULTADO
                    var cad = cadenaRoot + cadenaTerminal;
					cad+=nombreRoot+"->"+nombreTerminal+";\n";
					$$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;


                }}
                | signo_especial
                {{
					//parent
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="VALOR",'+'color="lightblue3",'+"];\n ";
					//childs
                    var labelTerminal = 'label="signo_especial(valLex='+$1+')",';
                    var colorTerminal = 'color="greenyellow",';
                    var nombreTerminal = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaTerminal=nombreTerminal+"["+labelTerminal+colorTerminal+"];\n ";
					//RESULTADO
                    var cad = cadenaRoot + cadenaTerminal;
					cad+=nombreRoot+"->"+nombreTerminal+";\n";
					$$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;


                }}
                |caracter_especial
                {{
					//parent
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="VALOR",'+'color="lightblue3",'+"];\n ";
					//childs
                    var labelTerminal = 'label="caracter_especial(valLex='+$1+')",';
                    var colorTerminal = 'color="greenyellow",';
                    var nombreTerminal = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaTerminal=nombreTerminal+"["+labelTerminal+colorTerminal+"];\n ";
					//RESULTADO
                    var cad = cadenaRoot + cadenaTerminal;
					cad+=nombreRoot+"->"+nombreTerminal+";\n";
					$$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;


                }}
                | signo
                {{
					//parent
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="VALOR",'+'color="lightblue3",'+"];\n ";
					//childs
                    var labelTerminal = 'label="signo(valLex='+$1+')",';
                    var colorTerminal = 'color="greenyellow",';
                    var nombreTerminal = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaTerminal=nombreTerminal+"["+labelTerminal+colorTerminal+"];\n ";
					//RESULTADO
                    var cad = cadenaRoot + cadenaTerminal;
					cad+=nombreRoot+"->"+nombreTerminal+";\n";
					$$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;


                }}
                | num
                {{
					//parent
                    var nombreRoot = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaRoot=nombreRoot+"["+'label="VALOR",'+'color="lightblue3",'+"];\n ";
					//childs
                    var labelTerminal = 'label="num(valLex='+$1+')",';
                    var colorTerminal = 'color="greenyellow",';
                    var nombreTerminal = XpathUtil.generarIdUnicoXmlNode();
                    var cadenaTerminal=nombreTerminal+"["+labelTerminal+colorTerminal+"];\n ";
					//RESULTADO
                    var cad = cadenaRoot + cadenaTerminal;
					cad+=nombreRoot+"->"+nombreTerminal+";\n";
					$$=[];
                    $$["nombre"]=nombreRoot;
                    $$["cad"]=cad;


                }}
                ;