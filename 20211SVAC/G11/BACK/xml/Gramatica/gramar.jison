// IMPORTS ERRORES Y FUNCIONES
%{
     
     function change_especials(etiqueta){
          if(etiqueta.includes("&lt;")){
               return etiqueta.replace(/&lt;/g,'<');
          }else if(etiqueta.includes("&gt;")){
               return etiqueta.replace(/&gt;/g,'>');
          }else if(etiqueta.includes("&amp;")){
               return etiqueta.replace(/&amp;/g,'&');
          }else if(etiqueta.includes("&apos;")){
               return etiqueta.replace(/&apos;/g,'\'');
          }else if(etiqueta.includes("&quot;")){
               return etiqueta.replace(/&quot;/g,'\"');
          }else{
               return etiqueta;
          }
     }

     function return_only_id(etiqueta){
          if(etiqueta.includes("</")){
               return etiqueta.substr(2,etiqueta.lenght);
          }else{
               return etiqueta.substr(1,etiqueta.lenght);
          }
     }

     function tag_principal(etiqueta){
          if(etiqueta.includes("</")){
               return 'ETI_C'
          }else if(etiqueta.includes("<")){
               return 'ETI_A'
          }else if(etiqueta.includes("/>")){
               return 'ETI_CC'
          }else if(etiqueta.includes(">")){
               return 'ETI_CS'
          }
          return etiqueta;
     }

     function error_semanti(izqid,dereid,fila,columna){
          if(!(izqid==dereid)){
               errores.addError(new nodoError('Semántico','Las etiquetas no coinciden: '+izqid+' -- '+dereid,fila,columna));
          }
     }

     function get_type_xml(text,fila,columna){
          let termino = "encoding=\"";
          let posicion = text.indexOf(termino);
          let pos_final= posicion+10;
          let posicion2 = text.indexOf('"',pos_final);
          let longitud= posicion2-pos_final;

          if (posicion !== -1){
               return text.substr(pos_final,longitud);
          }else{
               errores.addError(new nodoError('Sintactico','No se encuentra el token: encoding',fila,columna));
          }
     }
%}
/* Definición Léxica */
%lex

%options case-insensitive
%x Etiqueta
%%     

<INITIAL,Etiqueta>
[\s\r\t\n]+                                     {} // ESPACIOS
[<][!][-][-][^-]*[-]+([^<!--][^-]*[-]+)*[>]     {} // COMENTARIO MULTI
[<][?]([^<?]*)*[?][>]                           { yytext = get_type_xml(yytext,yylloc.first_line,yylloc.first_column); return 'XML'; } // ENCABEZADO XML
// ESTADO ETIQUETA
[<][("\/")]?[A-Za-z_\ñ\Ñ][A-Za-z_0-9\ñ\Ñ]*                                                { let name=tag_principal(yytext); yytext= return_only_id(yytext); this.begin("Etiqueta"); return name; }
<Etiqueta>[ \r\t]+                                                                        {}
<Etiqueta>\n                                                                              {}
<Etiqueta>[A-Za-z_\ñ\Ñ][A-Za-z_0-9\ñ\Ñ]*                                                  { return 'ID'; }
<Etiqueta>"="                                                                             { return 'IGUAL'; }
<Etiqueta>([\"\“\”](([^\"\“\”\\])*([\\].)*)*[\"\“\”])|([\'](([^\'\\])*([\\].)*)*[\'])     { yytext=change_especials(yytext); return 'CADENA'; }
<Etiqueta>[\/]?[>]                                                                        { this.popState(); return tag_principal(yytext); }
<Etiqueta>.                                                                               { errores.addError(new nodoError('Lexico','No se esperaba el caracter: '+yytext,yylloc.first_line,yylloc.first_column)); }

// RESERVADAS
"&lt;"                                          return 'LESS'
"&gt;"                                          return 'MORE'
"&amp;"                                         return 'AMP'
"&apos;"                                        return 'APOS'
"&quot;"                                        return 'QUOT'

([^><&\'\"])+                                   return 'TEXTO'

<<EOF>>                                         return 'EOF'
.                                               { errores.addError(new nodoError('Lexico','No se esperaba el caracter: '+yytext,yylloc.first_line,yylloc.first_column)); }//ERRORES LEXICOS
/lex

%start start

//SECCION DE IMPORTS
%{

    let lista_gramatica = [];
    let tipo_encoding ="";
%}

%%

/*
    SINTACTICO
*/
start : encod raices EOF   { tipo_encoding=$1; $$ = $2; lista_gramatica.push({'p':'start -> encod raices','g':'start.val = encode.val + raices.val'}); return { objast:$$, reporteg: lista_gramatica, encode: tipo_encoding }; }
      ;

encod : XML                { $$ = $1; lista_gramatica.push({'p':'encod -> XML','g':'encod.val = XML.lexval'}); }
      |                    { lista_gramatica.push({'p':'encod -> ε','g':'e'}); }
      ;

raices : raices raiz       { $1.push($2); $$ = $1; lista_gramatica.push({'p':'raices -> raices raiz','g':'raices.val = raices.add(raiz.val)'}); }
       | raiz              { $$ = [$1]; lista_gramatica.push({'p':'raices -> raiz','g':'raices.val = raiz.val'}); }
       ;

raiz : elemento            { $$ = $1; lista_gramatica.push({'p':'raiz -> elemento','g':'raiz.val = elemento.val'}); }
     | error               { errores.addError(new nodoError('Sintactico','No se esperaba el token: '+yytext,this._$.first_line,this._$.first_column)); lista_gramatica.push({'p':'raiz -> error','g':'error'}); }
     ;

elemento : ETI_A list_atributos ETI_CS elementos  ETI_C ETI_CS               { $$ = new Elemento($1,'',@1.first_line, @1.first_column,$2,$4,$5); error_semanti($1,$5,@1.first_line,@1.first_column);  lista_gramatica.push({'p':'elemento -> ETI_A lista_atributos ETI_CS elementos ETI_C ETI_CS','g':'elemento.val = array(lista_atributos.val,elementos.val)'}); }
         | ETI_A list_atributos ETI_CS list_elementos  ETI_C ETI_CS          { $$ = new Elemento($1,$4,@1.first_line, @1.first_column,$2,[],$5); error_semanti($1,$5,@1.first_line,@1.first_column);  lista_gramatica.push({'p':'elemento -> ETI_A lista_atributos ETI_CS list_elementos ETI_C ETI_CS','g':'elemento.val = array(lista_atributos.val,list_elementos.val)'}); }
         | ETI_A list_atributos ETI_CC                                       { $$ = new Elemento($1,'',@1.first_line, @1.first_column,$2,[],'/'); error_semanti($1,$1,@1.first_line,@1.first_column); lista_gramatica.push({'p':'elemento -> ETI_A lista_atributos ETI_CC','g':'array(lista_atributos.val)'}); }
         ;

list_atributos : atributos                               { $$ = $1; lista_gramatica.push({'p':'list_atributos -> atributos','g':'list_atributos.val = atributos.val'}); }
               |                                         { $$ = []; lista_gramatica.push({'p':'list_atributos -> ε','g':'e'}); }
               ;

list_elementos : list_text_elemento                      { $$ = $1; lista_gramatica.push({'p':`list_elementos -> list_text_elemento`,'g':'list_elementos.val = list_text_elemento.val'}); }
               |                                         { $$ = []; lista_gramatica.push({'p':'list_elementos -> ε','g':'e'}); }
               ;

atributos : atributos atributo                           { $1.push($2); $$ = $1; lista_gramatica.push({'p':'atributos -> atributos atributo','g':'atributos.val = atributos.add(atributo.val)'}); }
          | atributo                                     { $$ = [$1]; lista_gramatica.push({'p':'atributos -> atributo','g':'atributos.val = atributo.val'}); }
          ;

atributo : ID IGUAL CADENA                               { $$ = new Atributo($1, $3, @1.first_line, @1.first_column); lista_gramatica.push({'p':'atributo -> ID IGUAL CADENA','g':'atributo.val = array(ID.lexval,CADENA.lexval)'}); }
         ;

list_text_elemento : list_text_elemento tipo            { $1 = $1 + ' ' +$2; $$ = $1; lista_gramatica.push({'p':'list_text_elemento -> list_text_elemento tipo','g':'list_text_elemento.val = list_text_elemento.add(tipo.val)'}); }
                   | tipo                               { $$ = $1; lista_gramatica.push({'p':'list_text_elemento -> tipo','g':'list_text_elemento.val = tipo.val'}); }
                   ;
tipo : TEXTO                                            { $$ = $1; lista_gramatica.push({'p':'tipo -> TEXTO','g':'tipo.val = TEXTO.lexval'}); }
     | LESS                                             { $$ = '<'; lista_gramatica.push({'p':'tipo -> LESS','g':'tipo.val = LESS.lexval'}); }
     | MORE                                             { $$ = '>'; lista_gramatica.push({'p':'tipo -> MORE','g':'tipo.val = MORE.lexval'}); }
     | AMP                                              { $$ = '&'; lista_gramatica.push({'p':'tipo -> AMP','g':'tipo.val = AMP.lexval'}); }
     | APOS                                             { $$ = '\''; lista_gramatica.push({'p':'tipo -> APOS','g':'tipo.val = APOS.lexval'}); }
     | QUOT                                             { $$ = `"`; lista_gramatica.push({'p':'tipo -> QUOT','g':'tipo.val = QUOT.lexval'}); }
     ;

elementos : elementos elemento                          { $1.push($2); $$ = $1; lista_gramatica.push({'p':'elementos -> elementos elemento','g':'elementos.val = elementos.add(elemento.val)'}); }
	     | elemento                                    { $$ = [$1]; lista_gramatica.push({'p':'elementos -> elemento','g':'elementos.val = elemento.val'}); }
          ;
%%