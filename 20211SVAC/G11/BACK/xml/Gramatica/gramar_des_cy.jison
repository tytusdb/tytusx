// IMPORTS ERRORES Y FUNCIONES
%{
    let tabla_err = require('./tabla_error');
    let nodo_err  = require('./nodo_error');
     
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
               tabla_err.errores.addError(new nodo_err.nodoError('Semántico','Las etiquetas no coinciden: '+izqid+' -- '+dereid,fila,columna));
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
               tabla_err.errores.addError(new nodo_err.nodoError('Sintactico','No se encuentra el token: encoding',fila,columna));
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
<Etiqueta>.                                                                               { tabla_err.errores.addError(new nodo_err.nodoError('Lexico','No se esperaba el caracter: '+yytext,yylloc.first_line,yylloc.first_column)); }

// RESERVADAS
"&lt;"                                          return 'LESS'
"&gt;"                                          return 'MORE'
"&amp;"                                         return 'AMP'
"&apos;"                                        return 'APOS'
"&quot;"                                        return 'QUOT'

([^><&'"])+                                     return 'TEXTO'

<<EOF>>                                         return 'EOF'
.                                               { parser.arbol.errores.push({tipo : 'Lexico', mensaje: yytext , linea: yylloc.first_line , columna: yylloc.first_column}); }//ERRORES LEXICOS
/lex

%start start

//SECCION DE IMPORTS
%{
     const Node = require('./nodo_tree');
%}

%%

/*
    SINTACTICO
*/
start : encod raices EOF   { $$ = new Node('start',''); $$.addChild($1); $$.addChild($2); return $$; }
      ;

encod : XML                { $$ = new Node('encod',''); $$.addChild(new Node($1,'XML')); }
      |                    { $$ = new Node('encod',''); $$.addChild(new Node('ε','ε')); }
      ;

raices : raiz raiz_p       { $$ = new Node('raices',''); $$.addChild($1); $$.addChild($2); }
       ;

raiz_p : raiz raiz_p       { $$ = new Node('raiz_p',''); $$.addChild($1); $$.addChild($2); }
       |                   { $$ = new Node('raiz_p',''); $$.addChild(new Node('ε','ε')); }
       ;

raiz : elemento            { $$ = new Node('raiz',''); $$.addChild($1); }
     | error               { $$ = new Node('error','error'); }
     ;

elemento : ETI_A list_atributos ETI_CS elementos  ETI_C ETI_CS       { $$ = new Node('elemento',''); $$.addChild(new Node('<'+$1,'ETI_A'));  $$.addChild($2); $$.addChild(new Node($3,'ETI_CS'));  $$.addChild($4); $$.addChild(new Node('</'+$5,'ETI_C')); $$.addChild(new Node($6,'ETI_CS')); }
         | ETI_A list_atributos ETI_CS list_elementos  ETI_C ETI_CS  { $$ = new Node('elemento',''); $$.addChild(new Node('<'+$1,'ETI_A'));  $$.addChild($2); $$.addChild(new Node($3,'ETI_CS'));  $$.addChild($4); $$.addChild(new Node('</'+$5,'ETI_C')); $$.addChild(new Node($6,'ETI_CS')); }
         | ETI_A list_atributos ETI_CC                               { $$ = new Node('elemento',''); $$.addChild(new Node('<'+$1,'ETI_A'));  $$.addChild($2); $$.addChild(new Node($3,'ETI_CC'));  }
         ;

list_atributos : atributos                               { $$ = new Node('list_atributos',''); $$.addChild($1); }
               |                                         { $$ = new Node('list_atributos',''); $$.addChild(new Node('ε','ε')); }
               ;

list_elementos : list_text_elemento                      { $$ = new Node('list_elementos',''); $$.addChild($1); }
               |                                         { $$ = new Node('list_elementos',''); $$.addChild(new Node('ε','ε')); }
               ;

atributos : atributo atributo_p                          { $$ = new Node('atributos',''); $$.addChild($1); $$.addChild($2); }
          ;

atributo_p : atributo atributo_p                         { $$ = new Node('atributo_p',''); $$.addChild($1); $$.addChild($2); }
           |                                             { $$ = new Node('raiz_p',''); $$.addChild(new Node('ε','ε')); }
           ;

atributo : ID IGUAL CADENA                               { $$ = new Node('atributo',''); $$.addChild(new Node($1,'ID')); $$.addChild(new Node($2,'IGUAL')); $$.addChild(new Node($3,'CADENA')); }
         ;

list_text_elemento : tipo lte_p                          { $$ = new Node('list_text_elemento',''); $$.addChild($1); $$.addChild($2); }
                   ;

lte_p : tipo lte_p                                       { $$ = new Node('lte_p',''); $$.addChild($1); $$.addChild($2); }
      |                                                  { $$ = new Node('lte_p',''); $$.addChild(new Node('ε','ε')); }
      ;

tipo : TEXTO                                            { $$ = new Node('tipo',''); $$.addChild(new Node($1,'TEXTO'));   }
     | LESS                                             { $$ = new Node('tipo',''); $$.addChild(new Node($1,'LESS'));   }
     | MORE                                             { $$ = new Node('tipo',''); $$.addChild(new Node($1,'MORE'));  }
     | AMP                                              { $$ = new Node('tipo',''); $$.addChild(new Node($1,'AMP'));  }
     | APOS                                             { $$ = new Node('tipo',''); $$.addChild(new Node($1,'APOS'));  }
     | QUOT                                             { $$ = new Node('tipo',''); $$.addChild(new Node($1,'QUOT'));  }
     ;

elementos : elemento elementos_p                       { $$ = new Node('elementos',''); $$.addChild($1); $$.addChild($2); }
          ;

elementos_p : elemento elementos_p                     { $$ = new Node('elementos_p',''); $$.addChild($1); $$.addChild($2); }
            |                                          { $$ = new Node('elementos_p',''); $$.addChild(new Node('ε','ε')); } 
            ;
%%

parser.arbol ={ 
    errores: []
};