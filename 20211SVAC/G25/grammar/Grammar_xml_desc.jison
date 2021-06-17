%{
    /*const { Atributo } = require("../dist/xml/expresiones/Atributo");
    const { Objeto } = require("../dist/xml/expresiones/Objeto");
    const { Encoding } = require("../dist/xml/expresiones/Encoding");
    const { AST_XML } = require("../dist/xml/ast/AST_XML");
    const { Gramatica } = require("../dist/xml/reportes/Gramatica");
    const { Error } = require("../dist/xml/reportes/Error");*/

    var list_grammar = [];
    var list_error = [];
    
    //REPORTE GRAMATICAL
    function addProduccion(valor, valor) {
        let gramatica = new Gramatica(valor,valor);
        list_grammar.push(gramatica);
    }

    //REPORTE DE ERRORES
    function addError(tipo, descripcion, line, column) {
        let error = new Error(tipo,descripcion,line,column);
        list_error.push(error);
    }

    function specialCharacter(text){
        let text2;
        if (text.search("&lt;") != -1) {
            text2 = text.replace(`&lt;`,`<`);
        } else if (text.search("&gt;") != -1) {
            text2 = text.replace(`&gt;`,`>`);
        } else if (text.search("&amp;") != -1) {
            text2 = text.replace(`&amp;`,`&`);
        } else if (text.search("&apos;") != -1) {
            text2 = text.replace(`&apos;`,`'`);
        } else if (text.search("&quot;") != -1) {
            text2 = text.replace(`&quot;`,`"`);
        } else {
            return text;
        }
        return text2;
    }

%}

/*Deinicion lèxica*/

%lex

%options case-insensitive
%x Comentario
%s Texto

%%
\s+             //ignorando espacios en blanco

"<!--"                               this.begin('Comentario');
<Comentario>"-->"                    this.popState();
<Comentario>.                        /* skip commentario content*/

">"                 { this.begin("Texto"); return 'mayorQ';}
<Texto>[ \r\t]+     {}
<Texto>\n           {}
<Texto><<EOF>>      { return 'EOF';} 
<Texto>"<"          { this.popState(); return 'menorQ'; }
<Texto>[^"<"]+      { return 'Texto';} 

"xml"					    return 'xml';
"encoding"					return 'encoding';
"version"					return 'version';

"/"					        return 'slash';

"?"						return 'interrogacion';
">"						return 'mayorQ';
"<"						return 'menorQ';
"="						return 'igual';

\"[^\"]*\"				{ yytext = specialCharacter(yytext.substr(1,yyleng-2)); return 'cadena' };
"'"[^']"'"				    return 'character';

[0-9]+("."[0-9]+)?\b 		return 'decimal';
[0-9]+\b					return 'integer';

[a-zA-Z_][a-zA-Z0-9_ñÑ]* 		return 'identificador';

[ \r\t]+			{}					
\n					{}
<<EOF>>				    return 'EOF';
.	{ 
        addError(`Error léxico`,`No se esperaba ${yytext}`,yylloc.first_line, yylloc.first_column);
	}


/lex

%% 
INI : ESTRUCTURA EOF    { 
        //return $1;
        var root = new AST_XML($1);
        addProduccion('INI -> ESTRUCTURA EOF', 'INI.val = ESTRUCTURA.val'); 
        root.setProducciones(list_grammar);
        list_grammar = [];
        return root; 
    }
	;

ESTRUCTURA : ROOT ESTRUCTURA    
    { 
        $2.push($1); $$ = $2; 

        addProduccion('ESTRUCTURA -> ROOT ESTRUCTURA', 'ESTRUCTURA.val = ESTRUCTURA.val.push(ROOT.val)'); 
    }
    | ROOT                      
    { 
        $$ = [$1]; 
        addProduccion('ESTRUCTURA -> ROOT', 'ESTRUCTURA.val = ROOT.val'); 
    }  
    ;

ROOT : menorQ interrogacion xml version igual cadena encoding igual cadena interrogacion mayorQ 
    {
        $$ = new Encoding($9, @1.first_line, @1.first_column); 
        addProduccion(`ROOT -> "<" "?" "xml" "version" "=" cadena encoding "=" cadena "?" ">"`, 'ROOT.val = new Encoding(cadena)');

    }
    |   menorQ identificador mayorQ LISTA_ELEMENTOS menorQ slash identificador mayorQ       
    { 
        $$ = new Objeto($2, $7, null, [], $4,@1.first_line, @1.first_column); 
        addProduccion(`ROOT -> "<" identificador ">" LISTA_ELEMENTOS "<" "/" identificador ">"`, `ROOT.val = new Objeto(identificador, LISTA_ELEMENTOS)`);
        if($2 != $7){
            addError(`Error Semantico`,`Se esperaba ${yytext}`,@1.first_line, @1.first_column);
        } 
    }
    ;

LISTA_ELEMENTOS :  LISTA_ELEMENTOS ELEMENTO     { $1.push($2); $$ = $1; addProduccion('LISTA_ELEMENTOS -> LISTA_ELEMENTOS ELEMENTO ',`LISTA_ELEMENTOS.val = LISTA_ELEMENTOS.val.push(ELEMENTO.val)`); }
    |   ELEMENTO                                { $$ = [$1]; addProduccion('LISTA_ELEMENTOS -> ELEMENTO',`LISTA_ELEMENTOS.val = [ELEMENTO.val]`); }
    |   error mayorQ { addError(`Error Sintáctico`,`Se esperaba ${yytext}`,@1.first_line, @1.first_column); }
    ;   

ELEMENTO : menorQ identificador mayorQ Texto menorQ slash identificador mayorQ                          
    { 
        $$ = new Objeto($2, $7, $4, null, null, @1.first_line, @1.first_column); 
        addProduccion(`ELEMENTO -> "<" identificador ">" Texto "<" "/" identificador ">"`,`ELEMENTO.val = new Objeto(identificador,identificador, Texto)`);
        if($2 != $7){
            addError(`Error Semantico`,`Se esperaba ${yytext}`,@1.first_line, @1.first_column);
        } 
    }
    |   menorQ identificador mayorQ LISTA_ELEMENTOS menorQ slash identificador mayorQ     
    { 
        $$ = new Objeto($2, $7, '', null, $4, @1.first_line, @1.first_column); 
        addProduccion(`ELEMENTO -> "<" identificador ">" LISTA_ELEMENTOS "<" "/" identificador ">"`,`ELEMENTO.val = new Objeto(identificador,identificador, LISTA_ELEMENTOS)`);
        if($2 != $7){
            addError(`Error Semantico`,`Se esperaba ${yytext}`,@1.first_line, @1.first_column);
        } 
    }
    |   menorQ identificador LISTA_ATRIBUTO mayorQ LISTA_ELEMENTOS menorQ slash identificador mayorQ    
    { 
        $$ = new Objeto($2, $8,'', $3, $5, @1.first_line, @1.first_column); 
        addProduccion(`ELEMENTO -> "<" identificador LISTA_ATRIBUTO ">" LISTA_ELEMENTOS "<" "/" identificador ">"`,`ELEMENTO.val = new Objeto(identificador,identificador, LISTA_ATRIBUTO, LISTA_ELEMENTOS)`);
        if($2 != $8){
            addError(`Error Semantico`,`Se esperaba ${yytext}`,@1.first_line, @1.first_column);
        } 
    }
    |   menorQ identificador LISTA_ATRIBUTO mayorQ Texto menorQ slash identificador mayorQ              
    { 
        $$ = new Objeto($2, $8, $5, $3, null, @1.first_line, @1.first_column); 
        addProduccion(`ELEMENTO -> "<" identificador LISTA_ATRIBUTO ">" TEXTO "<" "/" identificador ">"`,`ELEMENTO.val = new Objeto(identificador,identificador, LISTA_ATRIBUTO, Texto)`);
        if($2 != $8){
            addError(`Error Semantico`,`Se esperaba ${yytext}`,@1.first_line, @1.first_column);
        } 
    }
    |   menorQ identificador LISTA_ATRIBUTO slash mayorQ                                                
    { 
        $$ = new Objeto($2, $2, '', $3, null, @1.first_line, @1.first_column); 
        addProduccion(`ELEMENTO -> "<" identificador LISTA_ATRIBUTO "/" ">"`,`ELEMENTO.val = new Objeto(identificador, LISTA_ELEMENTOS)`);
    }
    |   menorQ identificador slash mayorQ                                                               
    { 
        $$ = new Objeto($2, $2, '', null, null, @1.first_line, @1.first_column); 
        addProduccion(`ELEMENTO -> "<" identificador "/" ">"`,`ELEMENTO.val = new Objeto(identificador)`);
    }
    |   error identificador { addError(`Error Sintáctico`,`Se esperaba ${yytext}`,@1.first_line, @1.first_column); }
    ;

LISTA_ATRIBUTO : ATRIBUTOS                          { $$ = $1; addProduccion(`LISTA_ATRIBUTO -> ATRIBUTOS`,`LISTA_ATRIBUTO.val = ATRIBUTOS.val`); }
    |                                               { $$ = []; addProduccion(`LISTA_ATRIBUTO -> ε`,`LISTA_ATRIBUTO.val = []`); }
;

ATRIBUTOS:
    ATRIBUTOS ATRIBUTO                              { $1.push($2); $$ = $1; addProduccion(`ATRIBUTOS -> ATRIBUTOS ATRIBUTO`,`ATRIBUTOS.val = ATRIBUTOS.val.push(ATRIBUTO.val)`); } 
    | ATRIBUTO                                      { $$ = [$1]; addProduccion(`ATRIBUTOS -> ATRIBUTO`,`ATRIBUTOS.val = ATRIBUTO.val`); }
;

ATRIBUTO : identificador igual cadena               
    { 
        $$ = new Atributo($1, $3, @1.first_line, @1.first_column);
        addProduccion(`ATRIBUTO -> identificador "=" cadena`,`ATRIBUTO.val = new Atributo(identificador, cadena)`);
    } 
;