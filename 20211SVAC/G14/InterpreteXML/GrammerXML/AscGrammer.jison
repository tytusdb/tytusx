%{
    const { Objeto }    = require('../Expresion/Objeto');
    const { Atributo }  = require('../Expresion/Atributo');
    const { Etiqueta }  = require('../../InterpreteXPath/AST/Etiqueta');

    const RepGramatical  = require('../Expresion/RepGramatical');
    var RG =[];
%}

%lex

%options case-insensitive

%%
\s+                                         /* skip whitespace */
\<\!--.*?--\>                               /* skip whitespace */
"<?xml"                                     return 'xml_open';
\>([^<]|\n)*\<                              { const re = /[\s\t\n]+/
                                              var aux = yytext.replace('<', ''); 
                                              aux = aux.replace('>', '');
                                              aux = aux.replace(re, '');
                                              if(aux.length > 0) {
                                                  return 'text'
                                              } else {
                                                  return 'open_close'
                                              }
                                            }

"?>"                                        return 'special_close';
"/>"                                        return 'slash_close';
">"                                         return 'close';
"<"                                         return 'open';
"/"                                         return 'slash';
"="                                         return 'equal';

(\"[^"]*\")                                 return 'string';

[a-zA-Zá-úÁ-Úä-üÄ-Ü_][a-zA-Z0-9_\-ñÑá-úÁ-Úä-üÄ-Ü]*                    return 'identifier';


<<EOF>>			    	                    return 'EOF'
.   { 
        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
    }
/lex

%start S

%%

S 
    : START EOF                                                                     { $$ = $1; return $$; }
;

START
    : PROLOG RAIZ                                                                   {   
                                                                                        $2.unshift($1); $$ = $2;  
                                                                                        RG.push( new RepGramatical.default(`START`, `PROLOG RAIZ`));  
                                                                                    }
;

RAIZ
    : open OBJETO                                                                   { 
                                                                                        $$ = [$2]; 
                                                                                        RG.push( new RepGramatical.default(`RAIZ`, `"<" OBJETO`));   
                                                                                    }
;

PROLOG
    : xml_open LATRIBUTOS special_close                                             {
                                                                                        $$ = new Objeto('xml', '', @1.first_line, @1.first_column, $2, []);
                                                                                        RG.push( new RepGramatical.default(`PROLOG`, `"<?xml" LATRIBUTOS "?>"`)); 
                                                                                    }
;

OBJETO
    : identifier LATRIBUTOS open_close OBJETOS slash identifier CERRAR              {   
                                                                                        if($1 === $6) {
                                                                                            $$ = new Objeto($1, '', @1.first_line, @1.first_column, $2, $4, $7);
                                                                                        } else {                                                                                        
                                                                                            $$ = null;
                                                                                        };
                                                                                        RG.push( new RepGramatical.default(`OBJETO`, `identificador.lexval LATRIBUTOS open_close.lexval OBJETOS "/" identifier.lexval CERRAR`));   
                                                                                    }

    | identifier LATRIBUTOS text slash identifier CERRAR                            {   
                                                                                        if($1 === $5){
                                                                                            $3 = $3.replace("<", ""); 
                                                                                            $3 = $3.replace(">", "");
                                                                                            $$ = new Objeto($1, $3, @1.first_line, @1.first_column, $2, null, $6);
                                                                                        } else {
                                                                                            $$ = null;
                                                                                        };
                                                                                        RG.push( new RepGramatical.default(`OBJETO`, `identificador.lexval LATRIBUTOS text.lexval "/" identifier.lexval CERRAR`));   
                                                                                    }
    | identifier LATRIBUTOS slash_close                                             {   
                                                                                        $$ = new Objeto($1, '', @1.first_line, @1.first_column, $2, null, $3); 
                                                                                        RG.push( new RepGramatical.default(`OBJETO`, `identificador.lexval LATRIBUTOS  "/>"`));   
                                                                                    }
;

CERRAR
    : close                                                                         {
                                                                                        $$ = $1; 
                                                                                        RG.push( new RepGramatical.default(`CERRAR`, `">"`));                                                                                       
                                                                                    }
    | open_close                                                                    {
                                                                                        $$ = $1;    
                                                                                        RG.push( new RepGramatical.default(`CERRAR`, `open_close.lexval`));  
                                                                                    }
;

LATRIBUTOS
    : ATRIBUTOS                                                                     { 
                                                                                        $$ =$1;   
                                                                                        RG.push( new RepGramatical.default(`LATRIBUTOS`, `ATRIBUTOS`));  
                                                                                    }
    |                                                                               { 
                                                                                        $$ = null;  
                                                                                        RG.push( new RepGramatical.default(`LATRIBUTOS`, `e`));  
                                                                                    }
;

ATRIBUTOS
    : ATRIBUTOS ATRIBUTO                                                            {   
                                                                                        $$ = new Etiqueta("atributo",0,0,$1,$2);   
                                                                                        RG.push( new RepGramatical.default(`ATRIBUTOS`, `ATRIBUTOS ATRIBUTO`));  
                                                                                    }
    | ATRIBUTO                                                                      {   
                                                                                        $$ = new Etiqueta("atributo",0,0,null,$1); 
                                                                                        RG.push( new RepGramatical.default(`ATRIBUTOS`, `ATRIBUTO`));  
                                                                                    }
;

ATRIBUTO
    : identifier equal string                                                       {   $$ = new Atributo($1, $3, @1.first_line, @1.first_column); 
                                                                                        RG.push( new RepGramatical.default(`ATRIBUTO`, `identifier.lexval "=" string.lexval`));  
                                                                                    }
;

OBJETOS
    : OBJETOS OBJETO                                                                {   
                                                                                        if($2 !== null ){
                                                                                             $$ = new Etiqueta("objeto",0,0,$1,$2);  
                                                                                        } else { 
                                                                                            $$ =  new Etiqueta("objeto",0,0,$1,null); 
                                                                                        };
                                                                                        RG.push( new RepGramatical.default(`OBJETOS`, `OBJETOS OBJETO`));                                                                                     
                                                                                    }
    | OBJETO                                                                        {   
                                                                                        if($1 !== null ){
                                                                                           $$ = new Etiqueta("objeto",0,0,null,$1); 
                                                                                        } else { 
                                                                                            $$ = new Etiqueta("objeto",0,0,null,null); 
                                                                                        };
                                                                                        RG.push( new RepGramatical.default(`OBJETOS`, `OBJETO`));   
                                                                                    }
;   

