/* lexical grammar */
%{
	var attribute = '';
	var errors = [];
	let re = /[^\n\t\r ]+/g
	//let ast = null;
	let grammar_stack = [];


    function printHtml(obj){
        if(obj == null){return "";}
        let str = "";
        if(Array.isArray(obj)){ //IS ARRAY
            obj.forEach((value)=>{
            if(typeof value === 'string' ){
                str = str + `<li class= "string">${value}</li>
                `;
            }else if(Array.isArray(value)){console.log("ERROR 5: Arreglo de arreglos");}else{
                for(let key in value){
                    str = str + printHtml(value);
                }
            }
            });
        }else if(typeof obj === 'string' ){ // IS STRING
            return "";
        }else{// IS OBJECT
            for(let key in obj){
                str = `<li><span class="caret">${key}</span>
                <ul class="nested">
                `;
                str = str + printHtml(obj[key]);
                str = str + `
                </ul>
                </li>`;
            }
        }
                return str;
    }



//just for testing purposes
	function printstrack(obj, lines){
	return;

        if(Array.isArray(obj)){ //IS ARRAY
            str = ""
            for(let i = 0; i < lines; i++){str = str + "- ";}
            obj.forEach((value)=>{
                if(typeof value === 'string' ){
                     str = ""
                     for(let i = 0; i < lines; i++){str = str + "- ";}
                     // console.log(str + value);
                }else if(Array.isArray(value)){console.log("ERROR 5");}else{
                    str = ""
                    for(let i = 0; i < lines; i++){ str = str + "- ";}
                    for(let key in value){
                       // console.log(`${str}${key}`);
                       printstrack(value[key], lines + 1);
                    }
                }

                //printstrack(value, lines +1);
            });
        }else if(typeof obj === 'string' ){ // IS STRING
            str = ""
            for(let i = 0; i < lines; i++){str = str + "- ";}
            // console.log(str + obj);
        }else{// IS OBJECT
            str = ""
            for(let i = 0; i < lines; i++){ str = str + "- ";}
            for(let key in obj){
                // console.log(`${str}Key: ${key}`);
                //console.log(obj[key]);
                printstrack(obj[key], lines + 1);
            }
        }
	}


%}
%lex

%options case-insensitive
%x content

/*Regular Expressions*/
unicode_chars                      	[\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1]+
tag_name                           	[_a-zA-Z]([a-zA-Z0-9_.-]|{unicode_chars})*
attribute_name                     	{tag_name}\s*'='
string                             	(\"[^\"\n]*[\"\n]) | (\'[^\'\n]*[\'\n])
element_content                    	([^<>&\"] | '&alt;' | '&gt;' | '&amp;' | '&apos;' | '&quot;' )+

cadena_err							[0-9]+("."[0-9]+)?([a-zA-Z0-9_.-]|{unicode_chars})*"="?
%%

\s+                   			// Whitespace
[<][!][-][-][\s\S\n]*?[-][-][>]	//MultiLineComment 
"<?"{tag_name}              {return 'tk_open_declaration';}
"?>"                        {return 'tk_close_delcaraton';}
{attribute_name}            {return 'tk_attribute_name';}
{tag_name}                  {return 'tk_tag_name';}
"</"                        {return 'tk_open_end_tag'}
"<"						    {return 'tk_open';}
">"						    { this.pushState('content');  return 'tk_close';}
"/"						    {return 'tk_bar';}
"="						    {return 'tk_equal';}
{string}                    {return 'tk_string';}
{cadena_err}                {return cadena_err;}    /*USED FOR ERROR*/
{id_err}                    {return id_err;}     /*USED FOR ERROR*/


<content>{element_content}       {
                                    if(yytext.match(re)){return 'tk_content';}
                                 }

<content><<EOF>>               	 return 'EOF'
<content>">"                     {this.popState(); return 'tk_close';} //TODO: error
<content>"</"                    { this.popState(); return 'tk_open_end_tag'}
<content>"<"                     {  this.popState(); return 'tk_open';}
<content>.                     	 { errors.push({ tipo: "Léxico", error: yytext, origen: "XML", linea: yylloc.first_line, columna: yylloc.first_column+1 }); return 'INVALID'; }


<<EOF>>               	return 'EOF'

.                     	{ errors.push({ tipo: "Léxico", error: yytext, origen: "XML", linea: yylloc.first_line, columna: yylloc.first_column+1 }); return 'INVALID'; }

/lex
%{
	const { Atributo } = require('../model/xml/Atributo');
	const { Element } = require('../model/xml/Element');
	const { Encoding } = require('../model/xml/Encoding/Encoding');
%}

/* operator associations and precedence */

%start INI

%% // GRAMATICA DE DOCUMENTO XML ANALISIS ASCENDENTE


INI: XML_DECLARATION ROOT EOF               {/*$1[0].printTest(0);console.log($1[0].getTree());*/
                                            prod_1 = grammar_stack.pop();
                                            prod_2 = grammar_stack.pop();
                                            grammar_stack.push({'INI-> XML_DECLARATION ROOT EOF': [prod_2, prod_1, 'EOF' ]});
                                            printstrack(grammar_stack, 0); //TODO: Delete is just for testing purposes
                                            // console.log(printHtml(grammar_stack));

                                            if($1!= null){
                                                encoding = new Encoding($1);
                                                if (encoding.encoding === encoding.codes.INVALID ) {
                                                    errors.push({ tipo: "Léxico", error: "La codificación del XML no es válida.", origen: "XML", linea: this._$.first_line, columna: this._$.first_column+1 }); return { ast: null, errors: errors };
                                                }
                                                ast = { ast: $2, encoding: encoding, errors: errors, cst:"<p>TEST CST </p>", grammar_report: "<p>grammar report test</p>"};
                                            } else{
                                                ast = { ast: $2, encoding: null, cst: null, grammar_report: null, errors: errors };
                                            }
                                            errors = [];
                                            return ast;
                                            }
    | XML_DECLARATION  EOF                  {
                                            prod_1 = grammar_stack.pop();
                                            grammar_stack.push({'INI -> XML_DECLARATION  EOF': [prod_1, 'EOF' ]});
                                            printstrack(grammar_stack, 0);
                                            // console.log(printHtml(grammar_stack));

                                            ast = { ast: null, encoding: null,  errors: errors, cst: null, grammar_report: "<p>grammar report test</p>" };
                                            errors = [];
                                            return ast;
                                            }
    | ROOT EOF                              {
                                            prod_1 = grammar_stack.pop();
                                            grammar_stack.push({'INI -> ROOT EOF': [prod_1, 'EOF' ]});
                                            printstrack(grammar_stack, 0);
                                            // console.log(printHtml(grammar_stack));

                                            errors.push({ tipo: "Sintáctico", error: "Falta declaracion del XML", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                            ast = { ast: null, encoding: null,  errors: errors, cst: null, grammar_report: "<p>grammar report test</p>" };
                                            errors = [];
                                            return ast;
                                            }
	| EOF                                   {
                                            grammar_stack.push({'INI -> EOF': [ 'EOF']});
                                            printstrack(grammar_stack, 0);
                                            // console.log(printHtml(grammar_stack));

	                                        ast = { ast: null, encoding: null,  errors: errors, cst: null, grammar_report: "<p>grammar report test</p>" }
	                                        errors = [];
	                                        return ast;
	                                        }
	| error EOF                             {
	                                        grammar_stack.push({'INI -> error EOF': ['Token: error\t Lexema: ', 'EOF' ]});
                                            printstrack(grammar_stack, 0);
                                            // console.log(printHtml(grammar_stack));

                                            errors.push({ tipo: "Sintáctico", error: "Token no esperado.", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                            ast = { ast: null, encoding: null,  errors: errors, cst: null, grammar_report: "<p>grammar report test</p>" };
                                            errors = [];
                                            return ast;
                                            }
	;



ROOT: ROOT XML                                  {$1.push($2);
                                                prod_1 = grammar_stack.pop();
                                                prod_2 = grammar_stack.pop();
                                                grammar_stack.push({'ROOT -> ROOT XML': [prod_2, prod_1 ]});
                                                }
	| XML                                       {$$ = [$1];
	                                            prod_1 = grammar_stack.pop();
	                                            grammar_stack.push({'ROOT -> XML': [prod_1 ]});
	                                            }
    ;


XML_DECLARATION: tk_open_declaration ATTRIBUTE_LIST XML_CLOSE_DECLARATION {if($2 == null || $3 == null){
                                                                            $$ = null}else{
                                                                            let str = "";
                                                                           $2.forEach((value)=>{
                                                                           str = str + value.id+value.value;
                                                                           });
                                                                           $$=str;
                                                                           }

                                                                           prod_3 = grammar_stack.pop();
                                                                           prod_2 = grammar_stack.pop();
                                                                           grammar_stack.push({'XML_DECLARATION': ['Token: tk_open_declaration\t Lexema: ' + $1, prod_2, prod_3]} );
                                                                           }
                ;

XML_CLOSE_DECLARATION: tk_close_delcaraton     {  $$ = "?>"
                                                grammar_stack.push({'XML_CLOSE_DECLARATION -> tk_close_delcaraton': ['Token: tk_close_delcaraton\t Lexema: ' + $1]});
                                                }
                    |   tk_close                {$$ = null;
                                                 errors.push({ tipo: "Sintáctico", error: "Se esperaba token /", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                                grammar_stack.push({'XML_CLOSE_DECLARATION -> tk_close': ['Token: tk_close\t Lexema: ' + $1]});
                                                }
                    |   error tk_close          { $$ = null;
                                                 errors.push({ tipo: "Sintáctico", error: "Token no esperado. " + $1, origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                                 grammar_stack.push({'XML_CLOSE_DECLARATION -> error tk_close': ['Token: error\t Lexema: ' + $1, 'Token: tk_close\t Lexema: ' + $2]});
                                                 }
                    ;

ATTRIBUTE_LIST : ATTRIBUTE_LIST ATTRIBUTE {if($2 == null){$$ = null}else if($1 == null){$$ = [$2]}else{$1.push($2); $$ = $1}
                                            prod_1 = grammar_stack.pop();
                                            prod_2 = grammar_stack.pop();
                                            grammar_stack.push({'ATTRIBUTE_LIST -> ATTRIBUTE_LIST ATTRIBUTE': [ prod_2, prod_1 ] });
                                          }
                | {$$ = null;             grammar_stack.push({'ATTRIBUTE_LIST -> Empty': ['EMPTY'] });      }
                ;


ATTRIBUTE : tk_attribute_name tk_string     {attr = new Atributo($1.slice(0, -1), $2.slice(1,-1), this._$.first_line, this._$.first_column+1);
                                            attr.Cst= `<li><a href=''>ATTRIBUTE</a>
                                            <ul>
                                            <li><a href=''>tk_attribute_name</a><ul>\n<li><a href=''>${$1}</a></li></ul></li>
                                            <li><a href=''>tk_string</a><ul>\n<li><a href=''>${$2}</a></li></ul></li>
                                            </ul>
                                            </li>`;
                                            $$ = attr;
                                            grammar_stack.push({'ATTRIBUTE -> tk_attribute_name tk_string': ['Token: tk_attribute_name\t Lexema: ' + $1, 'Token: tk_string\t Lexema: ' + $2 ]});
                                            }
            | tk_attribute_name             { $$ = null;
                                            errors.push({ tipo: "Sintáctico", error: "Se esperaba un atributo después de =.", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                            grammar_stack.push({'ATTRIBUTE -> tk_attribute_name':['Token: tk_attribute_name\t Lexema: ' + $1]});
                                            }
            | tk_equal tk_string            { $$ = null;
                                            errors.push({ tipo: "Sintáctico", error: "Se esperaba un nombre para atributo antes de =.", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                            grammar_stack.push({'ATTRIBUTE -> tk_equal tk_string':['Token: tk_equal\t Lexema: ' + $1, 'Token: tk_string\t Lexema: ' + $2]});
                                            }
            | tk_tag_name                   { $$ = null;
                                            errors.push({ tipo: "Sintáctico", error: "Se esperaba signo =", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                            grammar_stack.push({'ATTRIBUTE -> tk_tag_name':['Token: tk_tag_name\t Lexema: ' + $1]});
                                            }
            | cadena_err tk_string          { $$ = null;
                                            errors.push({ tipo: "Léxico", error: "Nombre del atributo no puede empezar con dígitos.", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                            grammar_stack.push({'ATTRIBUTE -> cadena_err tk_string':['Token: cadena_err\t Lexema: ' + $1, 'Token: tk_string\t Lexema: ' + $2]});
                                            }
            | cadena_err                    { $$ = null;
                                            errors.push({ tipo: "Léxico", error: "Nombre del atributo no puede empezar con dígitos, y debe tener signo = y atributo a continuación.", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                            grammar_stack.push({'ATTRIBUTE -> cadena_err':['Token: cadena_err\t Lexema: ' + $1]});
                                            }
            ;

XML: XML_OPEN CHILDREN tk_open_end_tag tk_tag_name tk_close                     {if($1 != null){  $1.Children = $2; $1.Close = $4; $$ = $1;
                                                                                let hasConflict = $1.verificateNames();
																				if(hasConflict === "") {
																					$1.childs.forEach(child => {
																					child.Father = {id: $1.id_open, line: $1.line, column: $1.column};
																					});
																					$$ = $1;
																				}
																				 else {
																					errors.push({ tipo: "Semántico", error: hasConflict, origen: "XML", linea: @4.first_line, columna: @4.first_column+1 });
                                                                                    $$ = null;
																				 }
                                                                                 }else{$$ = null;}
                                                                                 prod_1 = grammar_stack.pop();
                                                                                 prod_2 = grammar_stack.pop();
                                                                                 grammar_stack.push({'XML-> XML_OPEN CHILDREN tk_open_end_tag tk_tag_name tk_close':[prod_2, prod_1, 'Token: tk_open_end_tag\t Lexema: ' + $3, 'Token: tk_tag_name\t Lexema: ' + $4, 'Token: tk_close\t Lexema: ' +$5]});
                                                                                 }
	| XML_OPEN tk_content tk_open_end_tag tk_tag_name tk_close                  {if($1 != null){$1.Value = $2; $1.Close = $4;  $$ = $1;
                                                                                let hasConflict = $1.verificateNames();
                                                                                if(hasConflict !== ""){
                                                                                 errors.push({ tipo: "Semántico", error: hasConflict, origen: "XML", linea: @4.first_line, columna: @4.first_column+1 });
                                                                                 $$ = null;
                                                                                 }
	                                                                             }else{$$ = null;}
	                                                                             prod_1 = grammar_stack.pop();
	                                                                             grammar_stack.push({'XML -> XML_OPEN tk_content tk_open_end_tag tk_tag_name tk_close':[prod_1, 'Token: tk_content\t Lexema: ' + $2, 'Token: tk_open_end_tag\t Lexema: ' + $3, 'Token: tk_tag_name\t Lexema: ' + $4, 'Token: tk_close\t Lexema: ' + $5]});
	                                                                             }
	| tk_open tk_tag_name ATTRIBUTE_LIST tk_bar tk_close                        {$$ = new Element($2, $3, null, null, @1.first_line, @1.first_column+1, null);

                                                                                prod_1 = grammar_stack.pop();
                                                                                grammar_stack.push({'XML -> tk_open tk_tag_name ATTRIBUTE_LIST tk_bar tk_close':['Token: tk_open\t Lexema: ' + $1, 'Token: tk_tag_name\t Lexema: ' + $2, prod_1, 'Token: tk_bar\t Lexema: ' + $4, 'Token: tk_close\t Lexema: ' + $5]});
	                                                                            }
	| XML_OPEN tk_open_end_tag tk_tag_name tk_close                             {if($1 != null){$1.Close = $3; $$ = $1;
	                                                                            let hasConflict = $1.verificateNames();
	                                                                             if(hasConflict !== ""){
                                                                                errors.push({ tipo: "Semántico", error: hasConflict, origen: "XML", linea: @4.first_line, columna: @4.first_column+1 });
                                                                                $$ = null;

                                                                                prod_1 = grammar_stack.pop();
                                                                                }
	                                                                            }else{$$ = null;}
	                                                                            grammar_stack.push({'XML -> XML_OPEN tk_open_end_tag tk_tag_name tk_close':[prod_1, 'Token: tk_open_end_tag\t Lexema: ' + $2, 'Token: tk_tag_name\t Lexema: ' + $3, 'Token: tk_close\t Lexema: '  + $4]});
	                                                                            }
	| XML_OPEN tk_open_end_tag tk_tag_name                                      {$$ =null;
                                                                                errors.push({ tipo: "Sintáctico", error: "Falta etiquta de cierre \">\". ", origen: "XML", linea: @3.first_line, columna: @3.first_column+1 });

                                                                                prod_1 = grammar_stack.pop();
	                                                                            grammar_stack.push({'XML -> XML_OPEN tk_open_end_tag tk_tag_name':[prod_1, 'Token: tk_open_end_tag\t Lexema: ' + $2, 'Token: tk_tag_name\t Lexema: '  + $3]});
	                                                                            }
	| XML_OPEN tk_open_end_tag  tk_close                                        {$$ =null;
                                                                                errors.push({ tipo: "Sintáctico", error: "Se esperaba un identificador. ", origen: "XML", linea: @2.first_line, columna: @2.first_column+1 });

                                                                                prod_1 = grammar_stack.pop();
	                                                                            grammar_stack.push({'XML -> XML_OPEN tk_open_end_tag  tk_close':[prod_1, 'Token: tk_open_end_tag\t Lexema: ' + $2,  'Token: tk_close\t Lexema: ' + $3]});
	                                                                            }
	| XML_OPEN tk_content tk_open_end_tag tk_tag_name                           {$$ =null;
                                                                                errors.push({ tipo: "Sintáctico", error: "Falta etiquta de cierre \">\". ", origen: "XML", linea: @4.first_line, columna: @4.first_column+1 });

                                                                                prod_1 = grammar_stack.pop();
	                                                                            grammar_stack.push({'XML -> XML_OPEN tk_content tk_open_end_tag tk_tag_name':[prod_1, 'Token: tk_content\t Lexema: ' + $2, 'Token: tk_open_end_tag\t Lexema: ' + $3, 'Token: tk_tag_name\t Lexema: ' + $4]});
	                                                                            }
	| XML_OPEN tk_content tk_open_end_tag  tk_close                             {$$ =null;
                                                                                errors.push({ tipo: "Sintáctico", error: "Se esperaba un identificador. ", origen: "XML", linea: @3.first_line, columna: @3.first_column+1 });

                                                                                prod_1 = grammar_stack.pop();
                                                                                grammar_stack.push({'XML -> XML_OPEN tk_content tk_open_end_tag  tk_close':[prod_1, 'Token: tk_content\t Lexema: ' + $2, 'Token: tk_open_end_tag\t Lexema: ' + $3,  'Token: tk_close\t Lexema: ' + $4  ]});
                                                                            	}
	| XML_OPEN tk_content  tk_open tk_tag_name ATTRIBUTE_LIST tk_close          {$$ =null;
                                                                                errors.push({ tipo: "Sintáctico", error: "Se esperaba etiqueta de cierre. ", origen: "XML", linea: @2.first_line, columna: @2.first_column+1 });

                                                                                prod_1 = grammar_stack.pop();
                                                                                prod_2 = grammar_stack.pop();
	                                                                            grammar_stack.push({'XML -> XML_OPEN tk_content  tk_open tk_tag_name ATTRIBUTE_LIST tk_close':[prod_2, 'Token: tk_content\t Lexema: ' + $2,  'Token: tk_open\t Lexema: ' + $3, 'Token: tk_tag_name\t Lexema: ' + $4, prod_1, 'Token: tk_close\t Lexema: ' + $6]});
	                                                                            }
	| XML_OPEN CHILDREN tk_open_end_tag tk_tag_name                             {$$ =null;
	                                                                            errors.push({ tipo: "Sintáctico", error: "Falta etiquta de cierre \">\". ", origen: "XML", linea: @4.first_line, columna: @4.first_column+1 });

                                                                                prod_1 = grammar_stack.pop();
                                                                                prod_2 = grammar_stack.pop();
	                                                                            grammar_stack.push({'XML -> XML_OPEN CHILDREN tk_open_end_tag tk_tag_name':[prod_2, prod_1, 'Token: tk_open_end_tag\t Lexema: ' + $3, 'Token: tk_tag_name\t Lexema: ' + $4]});
	                                                                            }
	| XML_OPEN CHILDREN tk_open_end_tag  tk_close                               {$$ =null;
	                                                                            errors.push({ tipo: "Sintáctico", error: "Se esperaba un identificador.", origen: "XML", linea: @3.first_line, columna: @3.first_column+1 });

                                                                                prod_1 = grammar_stack.pop();
                                                                                prod_2 = grammar_stack.pop();
	                                                                            grammar_stack.push({'XML -> XML_OPEN CHILDREN tk_open_end_tag  tk_close':[prod_2, prod_1, 'Token: tk_open_end_tag\t Lexema: ' + $3,  'Token: tk_close\t Lexema: '  + $4]});
	                                                                            }
	//| XML_OPEN CHILDREN tk_open_end_tag tk_tag_name tk_close
    //| tk_open_end_tag tk_tag_name tk_close                        {console.log("Prod error");}
	| error tk_open_end_tag tk_tag_name tk_close                            {$$ =null;
	                                                                        errors.push({ tipo: "Sintáctico", error: "Token no esperado " + $1, origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });

                                                                             grammar_stack.push({'XML -> error tk_open_end_tag tk_tag_name tk_close':['Token: error\t Lexema: ' + $1, 'Token: tk_open_end_tag\t Lexema: ' + $2, 'Token: tk_tag_name\t Lexema: ' + $3, 'Token: tk_close\t Lexema: '  + $4]});
                                                                             }
    | error tk_open_end_tag tk_tag_name                                     {$$ =null;
    	                                                                    errors.push({ tipo: "Sintáctico", error: "Token no esperado " + $1, origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });

                                                                            grammar_stack.push({'XML -> error tk_open_end_tag tk_tag_name':['Token: error\t Lexema: ' + $1, 'Token: tk_open_end_tag\t Lexema: ' + $2, 'Token: tk_tag_name\t Lexema: ' + $3]});
                                                                            }
	| error tk_bar tk_close                                                 {$$ =null;
	                                                                        errors.push({ tipo: "Sintáctico", error: "Token no esperado " + $1, origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });

	                                                                        grammar_stack.push({'XML -> error tk_bar tk_close':['Token: error\t Lexema: ' + $1, 'Token: tk_bar\t Lexema: ' + $2, 'Token: tk_close\t Lexema: ' + $3]});
	                                                                        }
	| error  tk_close                                                       {$$ =null;
	                                                                        errors.push({ tipo: "Sintáctico", error: "Token no esperado " + $1, origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });

	                                                                        grammar_stack.push({'XML -> error  tk_close':['Token: error\t Lexema: ' + $1,  'Token: tk_close\t Lexema: ' + $2]});
	                                                                        }
	//| error tk_open    {console.log("Production error 7");}
;
//

XML_OPEN: tk_open tk_tag_name ATTRIBUTE_LIST tk_close   { $$ = new Element($2, $3, null, null,  @1.first_line,  @1.first_column+1);

                                                        prod_1 = grammar_stack.pop();
                                                        grammar_stack.push({'XML_OPEN -> tk_open tk_tag_name ATTRIBUTE_LIST tk_close':['Token: tk_open\t Lexema: ' + $1, 'Token: tk_tag_name\t Lexema: ' + $2, prod_1, 'Token: tk_close\t Lexema: ' + $4]});
                                                         }
        | tk_open tk_tag_name ATTRIBUTE_LIST            {
                                                        $$ = null;
                                                        errors.push({ tipo: "Sintáctico", error: "Se esperaba \">\" después de la cadena de atributos.", origen: "XML", linea: @3.first_line, columna: @3.first_column+1 });

                                                        prod_1 = grammar_stack.pop();
                                                        grammar_stack.push({'XML_OPEN -> tk_open tk_tag_name ATTRIBUTE_LIST':['Token: tk_open\t Lexema: ' + $1, 'Token: tk_tag_name\t Lexema: ' + $2, prod_1]});
                                                        }
        | tk_open                                       { $$ = null;
                                                        errors.push({ tipo: "Sintáctico", error: "", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                                        grammar_stack.push({'XML_OPEN -> tk_open':['Token: tk_open\t Lexema: ' + $1]});
                                                        }
        |tk_open   tk_close                              { $$ = null;
                                                         errors.push({ tipo: "Sintáctico", error: "Se esperaba un identificador para la etiqueta", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                                         grammar_stack.push({'XML_OPEN -> tk_open tk_close':['Token: tk_open\t Lexema: ' + $1, 'Token: tk_close\t Lexema: ' + $2]});
                                                         }

        ;

CHILDREN: CHILDREN XML                                      {if($1 != null && $2 != null){ $1.push($2); $$ = $1; } else{$$ = null;}
                                                            prod_1 = grammar_stack.pop();
                                                            prod_2 = grammar_stack.pop();
                                                             grammar_stack.push({'CHILDREN -> CHILDREN XML':[prod_2,  prod_1]});
                                                            }
	    | XML                                               { if($1!=null ){$$ = [$1];}else{$$ = null;}
	                                                        prod_1 = grammar_stack.pop();
                                                            grammar_stack.push({'CHILDREN -> XML':[prod_1]});
	                                                        }
;
