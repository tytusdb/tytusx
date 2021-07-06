/************************************************  Aqui los imports ************************************************/
%{
    const {Objeto} = require("../Expresiones/Objeto");
    const {Atributo} = require("../Expresiones/Atributo");
    const {Encoding} = require("../Expresiones/Encoding");
    let tokenArrayD = new Array();
    module.exports.tokenArrayD = tokenArrayD;

    let gramaticalArrayD = new Array();
    module.exports.gramaticalArrayD = gramaticalArrayD;
%}


/************************************************ Aqui va el lenguaje lexico ***************************************/

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

%%

//ESPACIOS, ENTER Y RETORNOS
[ \t\r\n\f]                                     /*skip*/

"<!--".*"-->"    //Comentario


//PALABRAS RESERVADAS
"xml"       return 'tk_xml'
"version"   return 'tk_version'
"encoding"  return 'tk_encoding'
"&lt"       return 'res_menor'
"&gt"       return 'res_mayor'
"&amp"      return 'res_amp'
"&quot"     return 'res_comillaDoble'
"&apos"     return 'res_comillaSimple'


//SIMBOLOS
"</"                return '</'
"<"                 return '<'
">"                 return '>'
"/"                 return '/'
"="                 return '='
"?"                 return '?'
"&"                 return '&'
"!"                 return '!'
"#"                 return '#'
"$"                 return '$'
"%"                 return '%'
"("                 return '('
")"                 return ')'
"["                 return '['
"]"                 return ']'
"@"                 return '@'
"¡"                 return '¡'
"¿"                 return '¿'


//NUMERO Y ID
[0-9]+("."[0-9]+)*          %{ return 'tk_numero'; %}
[a-zA-Z_]([a-zA-Z0-9_ñÑ])*  %{ return 'tk_id'; %}

{stringliteral}             %{ return 'StringLiteral'; %}
{charliteral}               %{ return 'CharLiteral'; %}



//error lexico
.	{return 'otro'}



<<EOF>>             %{ return 'EOF'; %}
/lex





/************************************************ Aqui va el lenguaje sintactico ***********************************************/

%left  '<' '>'
%left  '/'
%left  '?'
%left   res_menor, res_mayor
%left   res_amp
%left   res_comillaDoble, res_comillaSimple


%start RAIZ 
%%
RAIZ: L_RAIZ 				{ return $1; } 
	;

L_RAIZ: ENCODING L_RAIZ 	{ $$ = [$1]; $$ = $$.concat($2);}
      | EOF
      ;

ENCODING: '<' '?' XML tk_version "=" StringLiteral tk_encoding "=" StringLiteral '?' '>' HIJOS	{ $$ = new Encoding("almacenamiento", $5, $8, @1.first_line, @1.first_column, $11); 
																									let newSymgd1 = "<tr> <td>ENCODING-> '<' '?' XML tk_version '=' StringLiteral tk_encoding '=' StringLiteral '?' '>' HIJOS</td>   <td>ENCODING.val = concat('<'+'?' + XML.val + tk_version.lexVal + '=' + StringLiteral.lexVal + tk_encoding.lexVal + '=' + StringLiteral.lexVal + '?' + '>' + HIJOS.val)</td> </tr>"
                                                                                                    gramaticalArrayD.push(newSymgd1);
																								}
		| HIJOS																					{ $$ = new Encoding("almacenamiento", "", "", @1.first_line, @1.first_column, $1); 
																									let newSymgd2 = "<tr> <td>ENCODING-> HIJOS</td>   <td>ENCODING.val = HIJOS.val</td> </tr>"
                                                                                                    gramaticalArrayD.push(newSymgd2);
																								}
	    ;

XML: tk_xml     { $$ = $1;  
                    let newSymgd3 = "<tr> <td>XML-> tk_xml</td> <td>XML.val = tk_xml.lexVal</td> </tr>"
                    gramaticalArrayD.push(newSymgd3);
                }
    |           { $$ = []; 
                    let newSymgd4 = "<tr> <td>XML-> epsilon</td> <td>XML.val = epsilon</td> </tr>"
                    gramaticalArrayD.push(newSymgd4);
                }
    ;

HIJOS: '<' tk_id ATRIBUTOS2 FIN_HIJO		{ $$ = new Objeto($2, '', @1.first_line, @1.first_column, $3, $4); 
                                                let newSym = "<tr><td>"+$2+"</td> <td>Objeto</td> <td>"+$2+"</td> <td></td> <td>"+@1.first_line+"</td> <td>"+@1.first_column+"</td> </tr>"
                                                tokenArrayD.push(newSym);
                    							let newSymgd5 = "<tr> <td>HIJOS-> '<' tk_id ATRIBUTOS2 FIN_HIJO</td> <td>HIJOS.val = concat('<' + tk_id.lexVal + ATRIBUTOS2 + FIN_HIJO)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd5);
											}
	    ;

ATRIBUTOS2: ATRIBUTOS ATRIBUTOS2			{ $$ = [$1]; $$ = $$.concat($2);
                    							let newSymgd6 = "<tr> <td>ATRIBUTOS2-> ATRIBUTOS ATRIBUTOS2 </td> <td>ATRIBUTOS2.val = concat(ATRIBUTOS.val + ATRIBUTOS2'.val)	</td> </tr>"
                    							gramaticalArrayD.push(newSymgd6);
											}
		|									{ $$ = []; 
                    							let newSymgd7 = "<tr> <td>ATRIBUTOS2-> epsilon</td> <td>ATRIBUTOS2.val = epsilon</td> </tr>"
                    							gramaticalArrayD.push(newSymgd7);
											}
		;

ATRIBUTOS: tk_id '=' ATRIBUTO 				{ $$ = new Atributo($1, $3, @1.first_line, @1.first_column); 
                                                let newSym2 = "<tr><td>"+$1+"</td> <td>Atributo</td> <td>"+$1+"</td> <td></td> <td>"+@1.first_line+"</td> <td>"+@1.first_column+"</td> </tr>"
                                                tokenArrayD.push(newSym2); 
                                        		let newSym3 = "<tr><td> String </td> <td>Atributo</td> <td>"+$1+"</td> <td>"+$3+"</td> <td>"+@1.first_line+"</td> <td>"+@1.first_column+"</td> </tr>"
                                        		tokenArrayD.push(newSym3);
                    							let newSymgd8 = "<tr> <td>ATRIBUTOS-> tk_id '=' ATRIBUTO </td> <td>ATRIBUTOS.val = concat(tk_id.lexVal + '=' + ATRIBUTO.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd8);
											}
	    ;

ATRIBUTO: StringLiteral						{ $$ = $1; 
                    							let newSymgd9 = "<tr> <td>ATRIBUTO-> StringLiteral</td> <td>ATRIBUTO.val = StringLiteral.lexVal</td> </tr>"
                    							gramaticalArrayD.push(newSymgd9);
											}
	    | charLiteral						{ $$ = $1; 
                    							let newSymgd10 = "<tr> <td>ATRIBUTO-> charLiteral</td> <td>ATRIBUTO.val = charLiteral.lexVal</td> </tr>"
                    							gramaticalArrayD.push(newSymgd10);
											}
	    ;

FIN_HIJO: '>' FIN_HIJO_P					{ $$ = [$2]; 
                    							let newSymgd11 = "<tr> <td>FIN_HIJO-> '>' FIN_HIJO_P</td> <td>FIN_HIJO.val =  concat('>' + FIN_HIJO_P.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd11);
											}
	    | '/' '>'							{  
                    							let newSymgd12 = "<tr> <td>FIN_HIJO-> '/' '>'</td> <td>FIN_HIJO.val =  concat('/' + '>')</td> </tr>"
                    							gramaticalArrayD.push(newSymgd12);
											}
	    ;

FIN_HIJO_P: L_HIJOS '</' tk_id '>'			{ $$ = new Objeto('objeto etiqueta', '', @1.first_line, @1.first_column, [], $1); 
                    							let newSymgd13 = "<tr> <td>FIN_HIJO_P-> L_HIJOS '<''/' tk_id '>'</td> <td>FIN_HIJO_P.val = concat(L_HIJOS.val + '<' +'/' + tk_id.lexVal + '>')</td> </tr>"
                    							gramaticalArrayD.push(newSymgd13);
											}
	      | L_ID_HIJOS '</' tk_id '>'		{ $$ = new Objeto('dentro etiqueta', $1, @1.first_line, @1.first_column, [], []); 
                                                let newSym4 = "<tr><td> String </td> <td>Cadena</td> <td>"+$3+"</td> <td>"+$1+"</td> <td>"+@1.first_line+"</td> <td>"+@1.first_column+"</td> </tr>"
                                                tokenArrayD.push(newSym4);
                    							let newSymgd14 = "<tr> <td>FIN_HIJO_P-> L_ID_HIJOS '<''/' tk_id '>'</td> <td>FIN_HIJO_P.val = concat(L_ID_HIJOS.val + '<' + '/' + tk_id.lexVal + '>')</td> </tr>"
                    							gramaticalArrayD.push(newSymgd14);
		  									}
	      ;

L_HIJOS: HIJOS L_HIJOS_P					{ $$ = [$1]; $$ = $$.concat($2);
                    							let newSymgd15 = "<tr> <td>L_HIJOS-> HIJOS L_HIJOS_P</td> <td>L_HIJOS.val = concat(HIJOS.val + L_HIJOS_P.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd15);
											}
       ;

L_HIJOS_P: HIJOS L_HIJOS_P					{ $$ = [$1]; $$ = $$.concat($2);
                    							let newSymgd16 = "<tr> <td>L_HIJOS-> HIJOS L_HIJOS_P</td> <td>L_HIJOS.val = concat(HIJOS.val + L_HIJOS_P.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd16);
											}
	    | 									{ $$ = []; 
                    							let newSymgd17 = "<tr> <td>L_HIJOS-> epsilon </td> <td>L_HIJOS.val = epsilon</td> </tr>"
                    							gramaticalArrayD.push(newSymgd17);
											}
	    ;

L_ID_HIJOS: tk_id L_ID_HIJOS				{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd18 = "<tr> <td>L_ID_HIJOS-> tk_id L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat(tk_id.lexVal + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd18);
											}
	      | res_menor L_ID_HIJOS			{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd19 = "<tr> <td>L_ID_HIJOS-> res_menor L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat(res_menor.lexVal + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd19);
											}
	      | res_mayor L_ID_HIJOS			{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd20 = "<tr> <td>L_ID_HIJOS-> res_mayor L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat(res_mayor.lexVal + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd20);
											}
	      | res_amp L_ID_HIJOS		    	{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd21 = "<tr> <td>L_ID_HIJOS-> res_amp L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat(res_amp.lexVal + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd21);
											}
	      | res_comillaDoble L_ID_HIJOS		{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd22 = "<tr> <td>L_ID_HIJOS-> res_comillaDoble L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat(res_comillaDoble.lexVal + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd22);
											}
	      | res_comillaSimple L_ID_HIJOS	{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd23 = "<tr> <td>L_ID_HIJOS-> res_comillaSimple L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat(res_comillaSimple.lexVal + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd23);
											}
	      | '/' L_ID_HIJOS					{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd24 = "<tr> <td>L_ID_HIJOS-> '/' L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat('/' + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd24);
											}
	      | '=' L_ID_HIJOS					{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd25 = "<tr> <td>L_ID_HIJOS-> '=' L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat('=' + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd25);
											}
	      | '?' L_ID_HIJOS					{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd26 = "<tr> <td>L_ID_HIJOS-> '?' L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat('?' + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd26);
											}
	      | '!' L_ID_HIJOS					{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd27 = "<tr> <td>L_ID_HIJOS-> '!' L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat('!' + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd27);
											}
	      | '#' L_ID_HIJOS					{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd28 = "<tr> <td>L_ID_HIJOS-> '#' L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat('#' + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd28);
											}
	      | '$' L_ID_HIJOS					{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd29 = "<tr> <td>L_ID_HIJOS-> '$' L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat('$' + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd29);
											}
	      | '%' L_ID_HIJOS					{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd39 = "<tr> <td>L_ID_HIJOS-> '%' L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat('%' + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd39);
											}
	      | '(' L_ID_HIJOS					{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd40 = "<tr> <td>L_ID_HIJOS-> '(' L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat('(' + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd40);
											}
	      | ')' L_ID_HIJOS					{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd30 = "<tr> <td>L_ID_HIJOS-> ')' L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat(')' + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd30);
											}
	      | '[' L_ID_HIJOS					{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd31 = "<tr> <td>L_ID_HIJOS-> '[' L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat('[' + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd31);
											}
	      | ']' L_ID_HIJOS					{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd32 = "<tr> <td>L_ID_HIJOS-> ']' L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat(']' + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd32);
											}
	      | '@' L_ID_HIJOS					{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd33 = "<tr> <td>L_ID_HIJOS-> '@' L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat('@' + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd33);
											}
	      | '¡' L_ID_HIJOS					{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd34 = "<tr> <td>L_ID_HIJOS-> '¡' L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat('¡' + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd34);
											}
	      | '¿' L_ID_HIJOS					{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd35 = "<tr> <td>L_ID_HIJOS-> '¿' L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat('¿' + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd35);
											}
	      | tk_numero L_ID_HIJOS			{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd36 = "<tr> <td>L_ID_HIJOS-> tk_numero L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat(tk_numero.val + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd36);
											}
	      | otro L_ID_HIJOS					{ $$ = $1; $$ = $$.concat($2);
                    							let newSymgd37 = "<tr> <td>L_ID_HIJOS-> otro L_ID_HIJOS</td> <td>L_ID_HIJOS.val = concat(otro.lexVal + L_ID_HIJOS.val)</td> </tr>"
                    							gramaticalArrayD.push(newSymgd37);
											}
	      | 								{ $$ = []; 
                    							let newSymgd38 = "<tr> <td>L_ID_HIJOS-> epsilon</td> <td>L_ID_HIJOS.val = epsilon</td> </tr>"
                    							gramaticalArrayD.push(newSymgd38);
											}
	      ;






