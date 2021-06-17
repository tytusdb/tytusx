/* Definición Léxica */
%lex

/*%options case-sensitive*/
%options case-insensitive

escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}\'

BSL                                 "\\".
%s                                  comment
%%

"//".*                              /* skip comments */
"<!--"                              this.begin('comment');
<comment>"-->"                      this.popState();
<comment>.                          /* skip comment content*/
\s+                                 /* skip whitespace */

"&lt;"                      return 'lesst'
"&gt;"                      return 'greatert'
"&amp;"                     return 'ampersand'
"&apos;"                    return 'apostro'
"&quot;"                    return 'quotation'

"null"                      return 'null';
"true"                      return 'true';
"false"                     return 'false';
"xml"                       return 'xml';
"version"                   return 'version';
"encoding"                  return 'encoding';

"+"                         return 'plus';
"-"                         return 'minus';
"*"                         return 'times';
"/"                         return 'div';
"%"                         return 'mod';

"<="                        return 'lte';
">="                        return 'gte';
"<"                         return 'lt';
">"                         return 'gt';
"="                         return 'asig';
"=="                        return 'equal';
"!="                        return 'nequal';

"&&"                        return 'and';
"||"                        return 'or';
"!"                         return 'not';
"?"                         return 'interC';

";"                         return 'semicolon';
","                         return 'coma';
"."                         return 'period';
// "'"                         return 'apost';

"("                         return 'lparen';
")"                         return 'rparen';
"{"                         return 'lcurly';
"}"                         return 'rcurly';
"["                         return 'lbracket';
"]"                         return 'rbracket';

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';

/* Identifier literals */
[a-zA-Z_áÁéÉíÍóÓ][a-zA-Z0-9_ñÑ]*            return 'identifier';

{stringliteral}                     return 'StringLiteral';
{charliteral}                       return 'CharLiteral';

//error lexico
.   {
        listaErrores.push(new tError('Léxico',`Simbolo inesperado: ${yytext}`,yylloc.first_line,yylloc.first_column ));
        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
    }

<<EOF>>                     return 'EOF'

/lex

//SECCION DE IMPORTS
%{
    const {Objeto} = require("../Expresiones/Objeto");
    const {Atributo} = require("../Expresiones/Atributo");
    const {SalidaGramatica} = require("../AST/SalidaGramatica");
    const {tError} = require("../Expresiones/tError");

    var listaErrores = [];
    var reportBNF = [];
    var reportBNF2 = [];
%}

// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'or'
%left 'and'
%left 'lt' 'lte' 'gt' 'gte' 'equal' 'nequal'
%left 'plus' 'minus'
%left 'times' 'div' 'mod'
%left 'pow'
%left 'not'
%left UMINUS

%left 'lparen' 'rparen'


// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%


/* Definición de la gramática */
START : 
    ENCODING RAIZ EOF
        {   
            reportBNF.push(`<START> ::= <ENCODING> <RAIZ> EOF`);
            reportBNF2.push('Start.val = Raiz.val. // Fin del documento');
            $$ = $2;
            return new SalidaGramatica($$, reportBNF, reportBNF2, $1,listaErrores);
        };

ENCODING: 
    lt interC xml version asig StringLiteral encoding asig StringLiteral interC gt      
        {
            reportBNF.push(`<ENCODING> ::= lt interC xml version asig StringLiteral encoding asig StringLiteral interC gt`);
            reportBNF2.push('Encoding.val = StringLiteral'); 
            $$ = $9; 
        }
    |   error gt                                                                            
        {
            listaErrores.push(new tError('Sintactico',`Token inesperado: ${yytext}`,@1.first_line,@1.first_column));
        }
        ;

RAIZ: 
    OBJETO RAIZ
        { 
            reportBNF.push('<RAIZ> ::= <OBJETO> <RAIZ>');
            reportBNF2.push('Raiz.val = Objeto.val.Concatenar(Raiz.Val])');
            $$ = $1.concat($2);
        }
    | { $$ = [] };

OBJETO:
    lt OBJETOPRIN 
        { 
            reportBNF.push('<OBJETO> ::= lt <OBJETOPRIN>');
            reportBNF2.push('OBJETO.val = [Objetoprin.val]');
            $$ = [$2] 
        };

OBJETOPRIN:
    identifier LATRIBUTOS OBJETOSEC
        {
            let nuevo = null;
            if ($3.tipo === 0){
                nuevo = new Objeto($1, '', @1.first_line, @1.first_column, $2, [], 0, $3.id)
            }else if ($3.id !== ""){
                if ($3.lista !== null){
                    nuevo = new Objeto($1, '', @1.first_line, @1.first_column, $2, $3.lista, 1, $3.id)
                }else if ($3.texto !== ""){
                    nuevo = new Objeto($1, $3.texto, @1.first_line, @1.first_column, $2, [], 1, $3.id)
                }else{
                    nuevo = new Objeto($1, '', @1.first_line, @1.first_column, $2, [], 1, $3.id)
                }
                
            }
            reportBNF.push('<OBJETOPRIN> ::= identifier <LATRIBUTOS> <OBJETOSEC>')
            reportBNF2.push('Objetoprin.val = new Objeto(id, texto, linea, columna, atributos, objetos, completo, cierre)')
            $$ = nuevo
        };

OBJETOSEC:
    gt LISTA_ID_OBJETO lt OBJETOTER
        {
            reportBNF.push('<OBJETOSEC> ::= gt <LISTA_ID_OBJETO> lt <OBJETOTER>')
            reportBNF2.push('Objetosec.val = Objetoter.val')
            if ($4.id !== ""){
                if($2 !== "") { $4.texto = $2 }
                $$ = $4
            }
        }
    | div gt 
        {
            reportBNF.push('<OBJETOSEC> ::= div gt')
            reportBNF2.push('Objetosec.val = {texto: vacio, lista: vacia: id: vacio, tipo: simple}')
            $$ = {texto: '', lista: null, id: '', tipo: 0}
        }
    |   error gt                                                                            
        {
            listaErrores.push(new tError('Sintactico',`Token inesperado: ${yytext}`,@1.first_line,@1.first_column));
        };

OBJETOTER:
    div identifier gt
        {
            reportBNF.push('<OBJETOTER> ::= div identifier gt')
            reportBNF2.push('Objetoter = {texto: vacio, lista: vacia, id: identifier, tipo: doble}')
            $$ = {texto: '', lista: null, id: $2, tipo: 1}
        }
    | OBJETOPRIN lt OBJETOTER
        {
            reportBNF.push('<OBJETOTER> ::= <OBJETOPRIN> lt <OBJETOTER>')
            if($3.id !== ""){
                if ($1 instanceof Objeto){
                    if ($3.lista === null){
                        reportBNF2.push('Objetoter.val = {texto: vacio, lista: [Objetoprin.val], id: Objetoter.val, tipo: doble}}')
                        $$ = {texto: '', lista: [$1], id: $3.id, tipo: 1}
                    }else{
                        reportBNF2.push('Objetoter.lista.agregarAlInicio(Objetoprin.val); Objetoter.val = {texto: vacio, lista: Objetoter.val, id: Objetoter.val, tipo: doble}}')
                        $3.lista.unshift($1)
                        $$ = {texto: '', lista: $3.lista, id: $3.id, tipo: 1}
                    }
                }else if($1 === null) { 
                    reportBNF2.push('Objetoter.val = Objetoter.val')
                    $$ === $3 
                }
            }
        }
        |   error gt                                                                            
        {
            listaErrores.push(new tError('Sintactico',`Token inesperado: ${yytext}`,@1.first_line,@1.first_column));
        };

LATRIBUTOS: 
    ATRIBUTO LATRIBUTOS
        { 
            reportBNF.push('<LATRIBUTOS> ::= <ATRIBUTOS> <LATRIBUTOS>');
            reportBNF2.push('Latributos.val.agregar(Atributo.val)');
            $$ = $1.concat($2)
        }
    |                             
        { 
            reportBNF.push('<LATRIBUTOS> ::= epsilon');
            reportBNF2.push('Latributos.val = [] ');
            $$ = [];
        };

ATRIBUTO: 
    identifier asig StringLiteral
        {   
            reportBNF.push('<ATRIBUTO> ::= identifier asig StringLiteral');
            reportBNF2.push('Atributo.val = [new Atributo(id, valor, fila, columna)]');
            $$ = [new Atributo($1, $3, @1.first_line, @1.first_column)]
        };

LISTA_ID_OBJETO: 
    LISTA_VALORES LISTA_ID_OBJETO
        {
            reportBNF.push('<LISTA_ID_OBJETO> ::= <LISTA_VALORES> <LISTA_ID_OBJETO>');
            reportBNF2.push('Lista_id_objeto.val = Lista_valores.val + \" \" + Lista_id_objeto.val');
            $$ = $1 + " " +  $2;
        }
    | 
        {   
            reportBNF.push('<LISTA_ID_OBJETO> ::= epsilon');
            reportBNF2.push('Lista_id_objeto.val = \"\"');
            $$ = "";
        };

LISTA_VALORES : 
    IntegerLiteral  
        {
            reportBNF.push('<LISTA_VALORES> ::= IntegerLiteral');
            reportBNF2.push('Lista_valores.val = IntegerLiteral');
            $$ = $1; 
        }
    | DoubleLiteral 
        { 
            reportBNF.push('<LISTA_VALORES> ::= DoubleLiteral');
            reportBNF2.push('Lista_valores.val = DoubleLiteral');
            $$ = $1; 
        }
    | identifier    
        { 
            reportBNF.push('<LISTA_VALORES> ::= identifier');
            reportBNF2.push('Lista_valores.val = identifier');
            $$ = $1; 
        }
    | StringLiteral 
        { 
            reportBNF.push('<LISTA_VALORES> ::= StringLiteral');
            reportBNF2.push('Lista_valores.val = StringLiteral');
            $$ = $1; 
        }
    | CharLiteral   
        { 
            reportBNF.push('<LISTA_VALORES> ::= CharLiteral');
            reportBNF2.push('Lista_valores.val = CharLiteral');
            $$ = $1; 
        }
    | xml           
        { 
            reportBNF.push('<LISTA_VALORES> ::= xml');
            reportBNF2.push('Lista_valores.val = xml');
            $$ = $1; 
        }
    | CARACTERES    
        { 
            reportBNF.push('<LISTA_VALORES> ::= <CARACTERES>');
            reportBNF2.push('Lista_valores.val = Caracteres.val');
            $$ = $1; 
        };

CARACTERES :
    plus        
        { 
            reportBNF.push('<CARACTERES> ::= plus');
            reportBNF2.push('Caracteres.val = plus');
            $$ = $1;
        }
    | minus       
        { 
            reportBNF.push('<CARACTERES> ::= plus');
            reportBNF2.push('Caracteres.val = plus');
            $$ = $1;
        }
    | times       
        { 
            reportBNF.push('<CARACTERES> ::= times');
            reportBNF2.push('Caracteres.val = times');
            $$ = $1;
        }
    | div
        { 
            reportBNF.push('<CARACTERES> ::= div');
            reportBNF2.push('Caracteres.val = div');
            $$ = $1;
        }
    | mod         
        { 
            reportBNF.push('<CARACTERES> ::= mod');
            reportBNF2.push('Caracteres.val = mod');
            $$ = $1;
        }
    | asig        
        { 
            reportBNF.push('<CARACTERES> ::= asign');
            reportBNF2.push('Caracteres.val = asign');
            $$ = $1;
        }
    | equal       
        { 
            reportBNF.push('<CARACTERES> ::= equal');
            reportBNF2.push('Caracteres.val = equal');
            $$ = $1;
        }
    | nequal      
        { 
            reportBNF.push('<CARACTERES> ::= nequal');
            reportBNF2.push('Caracteres.val = nequal');
            $$ = $1;
        }
    | and         
        { 
            reportBNF.push('<CARACTERES> ::= and');
            reportBNF2.push('Caracteres.val = and');
            $$ = $1;
        }
    | or          
        { 
            reportBNF.push('<CARACTERES> ::= or');
            reportBNF2.push('Caracteres.val = or');
            $$ = $1;
        }
    | not         
        { 
            reportBNF.push('<CARACTERES> ::= not');
            reportBNF2.push('Caracteres.val = not');
            $$ = $1;
        }
    | semicolon   
        { 
            reportBNF.push('<CARACTERES> ::= semicolon');
            reportBNF2.push('Caracteres.val = semicolon');
            $$ = $1;
        }
    | lparen      
        { 
            reportBNF.push('<CARACTERES> ::= lparen');
            reportBNF2.push('Caracteres.val = lparen');
            $$ = $1;
        }
    | rparen      
        { 
            reportBNF.push('<CARACTERES> ::= rparen');
            reportBNF2.push('Caracteres.val = rparen');
            $$ = $1;
        }
    | lcurly      
        { 
            reportBNF.push('<CARACTERES> ::= lcurly');
            reportBNF2.push('Caracteres.val = lcurly');
            $$ = $1;
        }
    | rcurly      
        { 
            reportBNF.push('<CARACTERES> ::= rcurly');
            reportBNF2.push('Caracteres.val = rcurly');
            $$ = $1;
        }
    | lbracket    
        { 
            reportBNF.push('<CARACTERES> ::= lbracket');
            reportBNF2.push('Caracteres.val = lbracket');
            $$ = $1;
        }
    | rbracket    
        { 
            reportBNF.push('<CARACTERES> ::= rbracket');
            reportBNF2.push('Caracteres.val = rbracket');
            $$ = $1;
        }
    | period      
        { 
            reportBNF.push('<CARACTERES> ::= period');
            reportBNF2.push('Caracteres.val = period');
            $$ = $1;
        }
    | coma        
        { 
            reportBNF.push('<CARACTERES> ::= coma');
            reportBNF2.push('Caracteres.val = coma');
            $$ = $1;
        }
    | lesst       
        { 
            reportBNF.push('<CARACTERES> ::= lesst');
            reportBNF2.push('Caracteres.val = >');
            $$ = '<';
        }
    | greatert    
        { 
            reportBNF.push('<CARACTERES> ::= greatert');
            reportBNF2.push('Caracteres.val = >');
            $$ = '>';
        }
    | ampersand   
        { 
            reportBNF.push('<CARACTERES> ::= ampersand');
            reportBNF2.push('Caracteres.val = &');
            $$ = '&';
        }
    | apostro     
        { 
            reportBNF.push('<CARACTERES> ::= apostro');
            reportBNF2.push('Caracteres.val = \'');
            $$ = '\'';
        }
    | quotation   
        { 
            reportBNF.push('<CARACTERES> ::= quotation');
            reportBNF2.push('Caracteres.val = \"');
            $$ = '"';
        };