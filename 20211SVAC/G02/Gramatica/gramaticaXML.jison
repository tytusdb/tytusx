/* Definición Léxica */
%lex

%options case-sensitive

escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
specialCharacters                   ['+'|'*'|'?'|'^'|'$'|'('|')'|'['|'\]'|'{'|'}'|'|'|'.'|'&'|'#'|'\''|'!'|':'|';'|'/'|'¿'|'¡'|',']
specialSymbols                      [[\u003F-\u0040]|[\u00A1-\u00AC]|[\u007B-\u007E]|[\u00AE-\uD7F0]|[\u0028-\u002F]|[\u005B-\u0060]|[\u003A-\u003B]|[\u0023-\u0025]|[\u0021]]
stringdouble                        {escape}|{acceptedcharsdouble}|{specialCharacters}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}\'

BSL                                 "\\".
%s                                  comment
%%

"//".*                              /* skip comments */
"/*"                                this.begin('comment');
<comment>"*/"                       this.popState();
<comment>.                          /* skip comment content*/
\s+                                 /* skip whitespace */

"xml"                      return 'xml';
"version"                   return 'version';
"encoding"                  return 'encoding';

"<"                         return 'lt';
">"                         return 'gt';
"="                         return 'asig';
"/"                         return 'div';

"?"                         return 'interrogante';

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';

((([a-zA-Z0-9_]|{specialCharacters}|{specialSymbols}))([a-zA-Z0-9_]|{specialCharacters}|{specialSymbols})*)           return 'identifier';

{stringliteral}                     return 'StringLiteral'
{charliteral}                       return 'CharLiteral'

//error lexico
.                                   {
                                        erroresXML.push(new ErrorCapturado(TipoError.ERROR_LEXICO, yytext, 'Error lexico detectado',yylloc.first_line, yylloc.first_column));
                                    }

<<EOF>>                     return 'EOF'

/lex

//SECCION DE IMPORTS
%{

%}


// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%


/* Definición de la gramática */
START : RECONOCIMIENTOUTF RAICES EOF         {  
        $2.forEach((element) => {$1.push(element)}); 
        $$ = $1; 
        reglasGramaticalesXML.push(new ReglaGramatical("START->RECONOCIMIENTOUTF RAICES EOF","RECONOCIMIENTOUTF.add(RAICES.val); START.val-> RECONOCIMIENTOUTF.val"));
        return $$; }
    ;

RECONOCIMIENTOUTF : 
    lt interrogante xml version asig StringLiteral encoding asig StringLiteral interrogante gt  {
        var temp = []; 
        var objeto = new Objeto('xmlEncoding', '', @3.first_line, @3.first_column, [new Atributo($4,$6,@6.first_line,@6.first_line),new Atributo($7,$9,@6.first_line,@6.first_column)], []); 
        temp.push(objeto);
        $$ = temp;
        reglasGramaticalesXML.push(new ReglaGramatical("RECONOCIMIENTOUTF->lt interrogante xml version asig StringLiteral encoding asig StringLiteral interrogante gt","RECONOCIMIENTOUTF.val-> new Objeto('xmlEncoding', [new Atributo(StringLiteral1.val), new Atributo(StringLiteral2.val)]);"));
        }

    ;

RAICES:
    RAICES RAIZ           { $1.push($2); $$ = $1; reglasGramaticalesXML.push(new ReglaGramatical("RAICES->RAICES RAIZ","RAICES'.add(RAIZ.val); RAICES.val=RAICES'.val;"));}
	| RAIZ                { $$ = [$1]; reglasGramaticalesXML.push(new ReglaGramatical("RAICES->RAIZ","RAICES.val->RAIZ.val;"));} ;

RAIZ:
    OBJETO              { $$ = $1; reglasGramaticalesXML.push(new ReglaGramatical("RAIZ->OBJETO","RAIZ.val->OBJETO.val;"));}
;

OBJETO:
      lt identifier LATRIBUTOS gt OBJETOS           lt div identifier gt       { $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,$5); 
      reglasGramaticalesXML.push(new ReglaGramatical("OBJETO->lt identifier LATRIBUTOS gt OBJETOS lt div identifier gt","OBJETO.val-> new Objeto(identifier.val,LISTA_ID_OBJETO.val,LATRIBUTOS.val);"));}  
    | lt identifier LATRIBUTOS gt LISTA_ID_OBJETO   lt div identifier gt       { $$ = new Objeto($2,$5,@1.first_line, @1.first_column,$3,[]); 
        reglasGramaticalesXML.push(new ReglaGramatical("OBJETO->lt identifier LATRIBUTOS gt LISTA_ID_OBJETO   lt div identifier gt","OBJETO.val-> new Objeto(identifier.val,LISTA_ID_OBJETO.val,LATRIBUTOS.val);"));}
    | lt identifier LATRIBUTOS div gt                                          { $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,[]); 
        reglasGramaticalesXML.push(new ReglaGramatical("OBJETO->lt identifier LATRIBUTOS div gt","OBJETO.val-> new Objeto(identifier.val,LATRIBUTOS.val);"));}    
    | error { $$ = []; console.log('error sintactico ' + yytext); erroresXML.push(new ErrorCapturado(TipoError.ERROR_SINTACTICO, yytext, 'Se esperaba token diferente',this._$.first_line, this._$.first_column));}
;

LATRIBUTOS: ATRIBUTOS                               { $$ = $1; reglasGramaticalesXML.push(new ReglaGramatical("LATRIBUTOS->ATRIBUTOS","LATRIBUTOS.val->ATRIBUTOS.val;"));}
           |                                        { $$ = []; reglasGramaticalesXML.push(new ReglaGramatical("LATRIBUTOS-> empty","LATRIBUTOS.val-> null;"));}
                   
;

ATRIBUTOS:
    ATRIBUTOS ATRIBUTO                              { $1.push($2); $$ = $1; reglasGramaticalesXML.push(new ReglaGramatical("ATRIBUTOS->ATRIBUTOS ATRIBUTO","ATRIBUTOS'.add(ATRIBUTO.val); ATRIBUTOS.val->ATRIBUTOS'.val;"));}
    | ATRIBUTO                                      { $$ = [$1]; reglasGramaticalesXML.push(new ReglaGramatical("ATRIBUTOS->ATRIBUTO","ATRIBUTOS.val->ATRIBUTO.val;"));} 
;

ATRIBUTO: 
    identifier asig StringLiteral                   { $$ = new Atributo($1, $3, @1.first_line, @1.first_column); reglasGramaticalesXML.push(new ReglaGramatical("ATRIBUTO->identifier asig StringLiteral","ATRIBUTO.val->new Atributo(identifier.val, StringLiteral.val)"));}
    | error { $$ = []; console.log('error sintactico ' + yytext); erroresXML.push(new ErrorCapturado(TipoError.ERROR_SINTACTICO, yytext, 'Se esperaba token diferente',this._$.first_line, this._$.first_column));}  
;

LISTA_ID_OBJETO: LISTA_ID_OBJETO VALOR          { $1=$1 + ' ' +$2 ; $$ = $1; reglasGramaticalesXML.push(new ReglaGramatical("LISTA_ID_OBJETO->LISTA_ID_OBJETO VALOR","LISTA_ID_OBJETO'.val = LISTA_ID_OBJETO'.val+' '+VALOR.val; LISTA_ID_OBJETO.val->LISTA_ID_OBJETO'.val;"));}
        | VALOR                                 { $$ = $1; reglasGramaticalesXML.push(new ReglaGramatical("LISTA_ID_OBJETO->VALOR","LISTA_ID_OBJETO.val->VALOR.val;"));}
;

VALOR:  identifier {$$=$1; reglasGramaticalesXML.push(new ReglaGramatical("VALOR->identifier","VALOR.val->identifier.val;"));}
    | IntegerLiteral {$$ = $1; reglasGramaticalesXML.push(new ReglaGramatical("VALOR -> IntegerLiteral","VALOR.val->IntegerLiteral.val;"));}
    | DoubleLiteral {$$ = $1; reglasGramaticalesXML.push(new ReglaGramatical("VALOR -> DoubleLiteral","VALOR.val->DoubleLiteral.val;"));}

;

OBJETOS:
      OBJETOS OBJETO        { $1.push($2); $$ = $1; reglasGramaticalesXML.push(new ReglaGramatical("OBJETOS->OBJETOS OBJETO","OBJETOS'.add(OBJETO); OBJETOS.val->OBJETOS'.val;"));}
	| OBJETO                { $$ = [$1]; reglasGramaticalesXML.push(new ReglaGramatical("OBJETOS->OBJETO","OBJETOS.val->OBJETO.val;"));} 
;



