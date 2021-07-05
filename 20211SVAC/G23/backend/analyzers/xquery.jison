/* lexical grammar */
%{
var attribute = '';
var errors = [];
let grammar_stack = [];
let re = /[^\n\t\r ]+/g

function getGrammarReport(obj){
        let str = `<!DOCTYPE html>
                     <html lang="en" xmlns="http://www.w3.org/1999/html">
                     <head>
                         <meta charset="UTF-8">
                         <meta
                         content="width=device-width, initial-scale=1, shrink-to-fit=no"
                         name="viewport">
                         <!-- Bootstrap CSS -->
                         <link
                         crossorigin="anonymous"
                         href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                               integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                               rel="stylesheet">
                         <title>Title</title>
                         <style>
                             table, th, td {
                                 border: 1px solid black;
                             }
                             ul, .ul-tree-view {
                                 list-style-type: none;
                             }

                             #div-table{
                                 width: 1200px;
                                 margin: 100px;
                                 border: 3px solid #73AD21;
                             }

                             .ul-tree-view {
                                 margin: 0;
                                 padding: 0;
                             }

                             .caret {
                                 cursor: pointer;
                                 -webkit-user-select: none; /* Safari 3.1+ */
                                 -moz-user-select: none; /* Firefox 2+ */
                                 -ms-user-select: none; /* IE 10+ */
                                 user-select: none;
                             }

                             .caret::before {
                                 content: "\u25B6";
                                 color: black;
                                 display: inline-block;
                                 margin-right: 6px;
                             }

                             .caret-down::before {
                                 -ms-transform: rotate(90deg); /* IE 9 */
                                 -webkit-transform: rotate(90deg); /* Safari */'
                             transform: rotate(90deg);
                             }

                             .nested {
                                 display: none;
                             }

                             .active {
                                 display: block;
                             }

                             li span:hover {
                                 font-weight: bold;
                                 color : white;
                                 background-color: #dc5b27;
                             }

                             li span:hover + ul li  {
                                 font-weight: bold;
                                 color : white;
                                 background-color: #dc5b27;
                             }

                             .tree-view{
                                 display: inline-block;
                             }

                             li.string {
                                 list-style-type: square;
                             }
                             li.string:hover {
                                 color : white;
                                 background-color: #dc5b27;
                             }
                             .center {
                                margin: auto;
                                width: 50%;
                                border: 3px solid green;
                                padding-left: 15%;
                             }
                         </style>
                     </head>
                     <body>
                     <h1 class="center">Reporte Gramatical</h1>
                     <div class="tree-view">
                     <ul class="ul-tree-view" id="tree-root">`;


        str = str + buildGrammarReport(obj);


        str = str + `
                    </ul>
                    </ul>
                    </div>
                             <br>
                             <br>
                             <br>
                             <br>
                             <br>
                             <br>
                        <button onclick="fun1()">Expand Grammar Tree</button>

                     <div id="div-table">
                     <table style="width:100%">

                     <tr><th>Produccion</th><th>Cuerpo</th><th>Accion</th></tr>
                     <tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr>
                     <tr><th>ini</th><td>XPATH_U EOF</td><td>SS= S1</td></tr>
                     <tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr>
                     <tr><th>XPATH_U</th><td>XPATH_U tk_line XPATH</td><td>S1.push(S3); SS = S1;</td></tr>
                     <tr><th></th><td>XPATH_U tk_2line XPATH</td><td>S1.push(S3); SS = S1;</td></tr>
                     <tr><th></th><td>XPATH</td><td>SS = [S1]</td></tr>
                     <tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr>
                     <tr><th>XPATH</th><td>XPATH QUERY</td><td>S1.push(S2); SS = S1;</td></tr>
                     <tr><th></th><td>QUERY</td><td>SS = [S1]</td></tr>
                     <tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr>
                     <tr><th>QUERY</th><td>tk_2bar QUERY</td><td>SS=builder.newDoubleAxis(Param);</td></tr>
                     <tr><th></th><td>tk_bar QUERY</td><td>SS=builder.newAxis(Param);</td></tr>
                     <tr><th></th><td>EXP_PR</td><td>SS=S1</td></tr>
                     <tr><th></th><td>AXIS</td><td>SS=S1</td></tr>
                     <tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr>
                     <tr><th>CORCHET</th><td>CORCHET tk_corA E tk_corC</td><td>S1.push(builder.NewPredicate(Param))</td></tr>
                     <tr><th></th><td>tk_corA E tk_corC</td><td>SS=builder.newPredicate(Param)</td></tr>
                     <tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr>
                     <tr><th>CORCHETP</th><td>CORCHET</td><td>SS=S1</td></tr>
                     <tr><th></th><td>Empty</td><td>SS=null</td></tr>
                     <tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr>
                     <tr><th>E</th><td>E tk_menorigual E</td><td>SS=builder.newOperation(Param)</td></tr>
                     <tr><th></th><td>E tk_menor E</td><td>SS=builder.newOperation(Param)</td></tr>
                     <tr><th></th><td>E tk_mayorigual E</td><td>SS=builder.newOperation(Param)</td></tr>
                     <tr><th></th><td>E tk_mayor E</td><td>SS=builder.newOperation(Param)</td></tr>
                     <tr><th></th><td>E tk_mas E</td><td>SS=builder.newOperation(Param)</td></tr>
                     <tr><th></th><td>E tk_menos E</td><td>SS=builder.newOperation(Param)</td></tr>
                     <tr><th></th><td>E tk_asterisco E</td><td>SS=builder.newOperation(Param)</td></tr>
                     <tr><th></th><td>E tk_div E </td><td>SS=builder.newOperation(Param)</td></tr>
                     <tr><th></th><td>E tk_mod E</td><td>SS=builder.newOperation(Param)</td></tr>
                     <tr><th></th><td>tk_menos E</td><td>SS=builder.newOperation(Param)</td></tr>
                     <tr><th></th><td>tk_ParA E tk_ParC</td><td>SS=S2</td></tr>
                     <tr><th></th><td>E tk_or E</td><td>SS=builder.newOperation(Param)</td></tr>
                     <tr><th></th><td>E tk_and E</td><td>SS=builder.newOperation(Param)</td></tr>
                     <tr><th></th><td>E tk_equal E</td><td>SS=builder.newOperation(Param)</td></tr>
                     <tr><th></th><td>E tk_diferent E</td><td>SS=builder.newOperation(Param)</td></tr>
                     <tr><th></th><td>QUERY</td><td>SS=S1</td></tr>
                     <tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr>
                     <tr><th>EXP_PR</th><td>FUNC CORCHETP</td><td>SS=builder.newExpression(Param)</td></tr>
                     <tr><th></th><td>PRIMITIVO CORCHETEP</td><td>SS=builder.newExpression(Param)</td></tr>
                     <tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr>
                     <tr><th>PRIMITIVO</th><td>tk_id</td><td>SS=builder.newNodename(Param)</td></tr>
                     <tr><th></th><td>tk_attribute_d</td><td>SS=builder.newValue(Param)</td></tr>
                     <tr><th></th><td>tk_attribute_s</td><td>SS=builder.newValue(Param)</td></tr>
                     <tr><th></th><td>num</td><td>SS=builder.newValue(Param)</td></tr>
                     <tr><th></th><td>tk_asterisco</td><td>SS=builder.newValue(Param)</td></tr>
                     <tr><th></th><td>tk_punto</td><td>SS=builder.newCurrent(Param)</td></tr>
                     <tr><th></th><td>tk_2puntos</td><td>SS=builder.newParent(Param)</td></tr>
                     <tr><th></th><td>tk_arroba tk_id</td><td>SS=builder.newAttribute(Param)</td></tr>
                     <tr><th></th><td>tk_arroba tk_asterisco</td><td>SS=builder.newAttribute(Param)</td></tr>
                     <tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr>
                     <tr><th>FUNC</th><td>tk_text tk_ParA tk_tk_ParC</td><td>SS=builder.newValue(Param)</td></tr>
                     <tr><th></th><td>tk_last tk_ParA tk_ParC</td><td>SS=builder.newValue(Param)</td></tr>
                     <tr><th></th><td>tk_position tk_ParA tk_ParC</td><td>SS=builder.newValue(Param)</td></tr>
                     <tr><th></th><td>tk_node tk_ParA tk_ParC</td><td>SS=builder.newValue(Param)</td></tr>
                     <tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr>
                     <tr><th>AXIS</th><td>AXISNAME tk_4puntos QUERY</td><td>SS=builder.newAxisObject(Param)</td></tr>
                     <tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr>
                     <tr><th>AXISNAME</th><td>tk_ancestor</td><td>SS = Tipos.'AxisTipo'</td></tr>
                     <tr><th></th><td>tk_ancestor2</td><td>SS = Tipos.'AxisTipo'</td></tr>
                     <tr><th></th><td>tk_attribute</td><td>SS = Tipos.'AxisTipo'</td></tr>
                     <tr><th></th><td>tk_child</td><td>SS = Tipos.'AxisTipo'</td></tr>
                     <tr><th></th><td>tk_descendant</td><td>SS = Tipos.'AxisTipo'</td></tr>
                     <tr><th></th><td>tk_descendant2</td><td>SS = Tipos.'AxisTipo'</td></tr>
                     <tr><th></th><td>tk_following</td><td>SS = Tipos.'AxisTipo'</td></tr>
                     <tr><th></th><td>tk_following2</td><td>SS = Tipos.'AxisTipo'</td></tr>
                     <tr><th></th><td>tk_namespace</td><td>SS = Tipos.'AxisTipo'</td></tr>
                     <tr><th></th><td>tk_parent</td><td>SS = Tipos.'AxisTipo'</td></tr>
                     <tr><th></th><td>tk_preceding</td><td>SS = Tipos.'AxisTipo'</td></tr>
                     <tr><th></th><td>tk_preceding2</td><td>SS = Tipos.'AxisTipo'</td></tr>
                     <tr><th></th><td>tk_self</td><td>SS = Tipos.'AxisTipo'</td></tr>

                         </table>
                     </div>

                     <script
                     src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.js">
                     </script>
                     <script
                     crossorigin="anonymous" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
                             src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js">
                             </script>
                     <script
                     crossorigin="anonymous" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
                             src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js">
                             </script>

                             <script>
                                 var toggler = document.getElementsByClassName("caret");
                                 var i;

                                 for (i = 0; i < toggler.length; i++) {
                                     toggler[i].addEventListener("click", function() {
                                         this.parentElement
                                         .querySelector(".nested")
                                         .classList.toggle("active");
                                         this.classList.toggle("caret-down");
                                     });
                                 }


                                        function fun1() {
                                            if ($("#tree-root").length > 0) {

                                                $("#tree-root").find("li").each
                                                (
                                                    function () {
                                                        var $span = $("<span></span>");
                                                        //$(this).toggleClass("expanded");
                                                        if ($(this).find("ul:first").length > 0) {
                                                            $span.removeAttr("class");
                                                            $span.attr("class", "expanded");
                                                            $(this).find("ul:first").css("display", "block");
                                                            $(this).append($span);
                                                        }

                                                    }
                                                )
                                            }

                                        }

                             </script>

                     </body>
                     </html>`;
                     return str;
    }
    function buildGrammarReport(obj){
        if(obj == null){return "";}
        let str = "";
        if(Array.isArray(obj)){ //IS ARRAY
            obj.forEach((value)=>{
            if(typeof value === 'string' ){
                str = str + `<li class= "string">
                ${value}
                </li>
                `;
            }else if(Array.isArray(value)){console.log("ERROR 5: Arreglo de arreglos");}else{
                for(let key in value){
                    str = str + buildGrammarReport(value);
                }
            }
            });
        }else if(typeof obj === 'string' ){ // IS STRING
            return "";
        }else{// IS OBJECT
            for(let key in obj){

                str = `<li class="grammar-tree"><span class="caret">
                ${key}
                </span>
                <ul class="nested">
                `;
                str = str + buildGrammarReport(obj[key]);
                str = str + `
                </ul>
                </li>`;
            }
        }
        return str;
    }

    function getCST(obj){
        let str = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport">
            <!-- Bootstrap CSS -->
            <link crossorigin="anonymous" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" rel="stylesheet">
            <title>Title</title>
            <style>

                #divheight{
                    height: 400px;
                    width: 1050px;
                }

                .nav-tabs > li .close {
                    margin: -2px 0 0 10px;
                    font-size: 18px;
                }

                .nav-tabs2 > li .close {
                    margin: -2px 0 0 10px;
                    font-size: 18px;
                }

            </style>

            <style>
                body {
                    font-family: sans-serif;
                    font-size: 15px;
                }

                .tree ul {
                    position: relative;
                    padding: 1em 0;
                    white-space: nowrap;
                    margin: 0 auto;
                    text-align: center;
                }
                .tree ul::after {
                    content: "";
                    display: table;
                    clear: both;
                }

                .tree li {
                    display: inline-block;
                    vertical-align: top;
                    text-align: center;
                    list-style-type: none;
                    position: relative;
                    padding: 1em 0.5em 0 0.5em;
                }
                .tree li::before, .tree li::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 50%;
                    border-top: 1px solid #ccc;
                    width: 50%;
                    height: 1em;
                }
                .tree li::after {
                    right: auto;
                    left: 50%;
                    border-left: 1px solid #ccc;
                }
                /*
                ul:hover::after  {
                    transform: scale(1.5); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport)
                }*/

                .tree li:only-child::after, .tree li:only-child::before {
                    display: none;
                }
                .tree li:only-child {
                    padding-top: 0;
                }
                .tree li:first-child::before, .tree li:last-child::after {
                    border: 0 none;
                }
                .tree li:last-child::before {
                    border-right: 1px solid #ccc;
                    border-radius: 0 5px 0 0;
                }
                .tree li:first-child::after {
                    border-radius: 5px 0 0 0;
                }

                .tree ul ul::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 50%;
                    border-left: 1px solid #ccc;
                    width: 0;
                    height: 1em;
                }

                .tree li a {
                    border: 1px solid #ccc;
                    padding: 0.5em 0.75em;
                    text-decoration: none;
                    display: inline-block;
                    border-radius: 5px;
                    color: #333;
                    position: relative;
                    top: 1px;
                }

                .tree li a:hover,
                .tree li a:hover + ul li a {
                    background: #e9453f;
                    color: #fff;
                    border: 1px solid #e9453f;
                }

                .tree li a:hover + ul li::after,
                .tree li a:hover + ul li::before,
                .tree li a:hover + ul::before,
                .tree li a:hover + ul ul::before {
                    border-color: #e9453f;
                }

            </style>
        </head>
        <body>

        <div class="tree">
            <ul id="tree-list">

            <!--AQUI-->
        `;
        str = str + buildCSTTree(obj);
        str = str + `
        </ul>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.js"></script>
        <script crossorigin="anonymous" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
                src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
        <script crossorigin="anonymous" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
                src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
        </body>
        </html>
        `;
        return str;
    }

    function buildCSTTree(obj){
        if(obj == null){return "";}
        let str = "";
        if(Array.isArray(obj)){ //IS ARRAY
            obj.forEach((value)=>{
            if(typeof value === 'string' ){
                let words = value.split('Lexema:');
                if(words.length == 2){
                    let lex = words[1];     //TODO check not go out of bounds
                    let token = words[0];
                    str = str + `<li><a href="">${token}</a><ul>
                    <li><a href="">${lex}
                    </a></li>
                    </ul></li>
                    `;
                }else{
                    str = str + `<li><a href="">${value}</a></li>
                    `;
                }

            }else if(Array.isArray(value)){console.log("ERROR 5: Arreglo de arreglos");}else{
                for(let key in value){
                    str = str + buildCSTTree(value);
                }
            }
            });
        }else if(typeof obj === 'string' ){ // IS STRING
            return "";
        }else{// IS OBJECT
            for(let key in obj){
                const words = key.split('->');
                //console.log(words[3]);
                str = `<li><a href="">${words[0]}</a>
                <ul>
                `;
                str = str + buildCSTTree(obj[key]) + `
                </ul>
                </li>`;
            }
        }
        return str;
    }
%}
%lex

%options case-insensitive
%x string_doubleq
%x string_singleq

/*Regular Expressions*/
%%

\s+                   	// Whitespace
"(:"[\s\S\n]*?":)"		// XQUERYComment
"<!--"[\s\S\n]*?"-->"	// MultiLineComment

[0-9]+("."[0-9]+)?\b    return 'num'
"upper-case"			return 'tk_uppercase'
"lower-case"			return 'tk_lowercase'
"number"				return 'tk_number'
"substring"				return 'tk_substring'
"let"                   return 'tk_let'
("<="|"le")				return 'tk_menorigual'
(">="|"ge")				return 'tk_mayorigual'
("<"|"lt")				return 'tk_menor'
(">"|"gt")				return 'tk_mayor'
"//"                    return 'tk_2bar'
"/"                     return 'tk_bar'
":="                    return 'tk_2puntos_igual'
("="|"eq")				return 'tk_equal'
".."                    return 'tk_2puntos'
"."                     return 'tk_punto'
"::"                    return 'tk_4puntos'
"@"                     return 'tk_arroba'
"$"                     return 'tk_dolar'
"["                     return 'tk_corA'
"]"                     return 'tk_corC'
"("                     return 'tk_ParA'
")"                     return 'tk_ParC'
"{"                     return 'tk_labre'
"}"                     return 'tk_lcierra'
"*"                     return 'tk_asterisco'
"div"                   return 'tk_div'
"ancestor-or-self"      return 'tk_ancestor2'
"ancestor"              return 'tk_ancestor'
"attribute"             return 'tk_attribute'
"child"                 return 'tk_child'
"descendant-or-self"    return 'tk_descendant2'
"descendant"            return 'tk_descendant'
"following-sibling"     return 'tk_following2'
"following"             return 'tk_following'
"namespace"             return 'tk_namespace'
"parent"                return 'tk_parent'
"preceding-sibling"     return 'tk_preceding2'
"preceding"             return 'tk_preceding'
"self"                  return 'tk_self'
"node"                  return 'tk_node'
"last"                  return 'tk_last'
"text"                  return 'tk_text'
"position"              return 'tk_position'
"|"                     return 'tk_line'
"+"                     return 'tk_mas'
"-"                     return 'tk_menos'
("!="|"ne")				return 'tk_diferent'
"or"                    return 'tk_or'
"and"                   return 'tk_and'
"mod"                   return 'tk_mod'
"doc"                   return 'tk_doc'
"for"                   return 'tk_for'
"at"                    return 'tk_at'
"in"                    return 'tk_in'
"where"                 return 'tk_where'
"order"                 return 'tk_order'
"by"                    return 'tk_by'
"return"                return 'tk_return'
"to"                    return 'tk_to'
","                     return 'tk_coma'
"data"                  return 'tk_data'
"if"					return 'tk_if'
"then"					return 'tk_then'
"else"					return 'tk_else'
"declare"				return 'tk_declare'
"function"				return 'tk_function'
"local"					return 'tk_local'
"as"					return 'tk_as'
"xs"					return 'tk_xs'
":"						return 'tk_dospts'
";"						return 'tk_ptcoma'
"?"						return 'tk_interrogacion'
"string"				return 'tk_string'
"normalizedString"		return 'tk_normalizedString'
"token"					return 'tk_token'
"date"					return 'tk_date'
"dateTime"				return 'tk_dateTime'
"duration"				return 'tk_duration'
"time"					return 'tk_time'
"integer"				return 'tk_integer'
"decimal"				return 'tk_decimal'
"boolean"				return 'tk_boolean'
"true"					return 'tk_true'
"false"					return 'tk_false'
"hexBinary"				return 'hexBinary'
"anyURI"				return 'tk_uri'


["]                             { attribute = ''; this.begin("string_doubleq"); }
<string_doubleq>[^"\\]+			{ attribute += yytext; }
<string_doubleq>"\\\""			{ attribute += "\""; }
<string_doubleq>"\\n"           { attribute += "\n"; }
<string_doubleq>\s	            { attribute += " ";  }
<string_doubleq>"\\t"           { attribute += "\t"; }
<string_doubleq>"\\\\"			{ attribute += "\\"; }
<string_doubleq>"\\\'"			{ attribute += "\'"; }
<string_doubleq>"\\r"           { attribute += "\r"; }
<string_doubleq>["]	            { yytext = attribute; this.popState(); return 'tk_string_d'; }

[']                             { attribute = ''; this.begin("string_singleq"); }
<string_singleq>[^'\\]+			{ attribute += yytext; }
<string_singleq>"\\\""			{ attribute += "\""; }
<string_singleq>"\\n"			{ attribute += "\n"; }
<string_singleq>\s				{ attribute += " ";  }
<string_singleq>"\\t"			{ attribute += "\t"; }
<string_singleq>"\\\\"			{ attribute += "\\"; }
<string_singleq>"\\\'"			{ attribute += "\'"; }
<string_singleq>"\\r"           { attribute += "\r"; }
<string_singleq>[']	            { yytext = attribute; this.popState(); return 'tk_string_s'; }


[\w\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1]+ return 'tk_id'

<<EOF>>               	return 'EOF'
.                     	{ errors.push({ tipo: "Léxico", error: yytext, origen: "XQuery", linea: yylloc.first_line, columna: yylloc.first_column+1 }); return 'INVALID'; }

/lex

%{
	const { Objeto } = require('../model/xpath/Objeto');
	const { Tipos } = require('../model/xpath/Enum');
    const { XQObjeto } = require('../model/xquery/XQObjeto');
    var builder = new Objeto();
    var queryBuilder = new XQObjeto();
    const getASTTree = require('./ast_xpath');

	function insert_current(_variable, _predicate, _linea, _columna) {
		return builder.newAxis(builder.newExpression(builder.newCurrent(_variable, _linea, _columna), _predicate, _linea, _columna), _linea, _columna);
	}
	function insert_text(_linea, _columna) {
		return builder.newDoubleAxis(builder.newExpression(builder.newValue("text()", Tipos.FUNCION_TEXT, _linea, _columna), null, _linea, _columna), _linea, _columna);
	}
%}

/* operator associations and precedence */
%left 'tk_or' 'tk_line'
%left 'tk_and'
%left 'tk_equal' 'tk_diferent' 'tk_menor' 'tk_menorigual' 'tk_mayor' 'tk_mayorigual'
%left 'tk_mas' 'tk_menos'
%left 'tk_div' 'tk_mod' 'tk_asterisco'
%left umas
%left umenos
%left 'tk_ParA'
%left 'tk_bar' 'tk_2bar'


%start ini

%% // GRAMATICA DE DOCUMENTO XQUERY ANALISIS ASCENDENTE

ini: XPATH_U EOF{   
					prod_1 = grammar_stack.pop();
					prod_2 = grammar_stack.pop();
			 		grammar_stack.push({'ini -> XPATH_U EOF': [prod_2, prod_1]});
					grammar_report =  getGrammarReport(grammar_stack); cst = getCST(grammar_stack); arbol_ast = getASTTree($1);
					ast = { xpath: $1, errors: errors, cst: cst, grammar_report: grammar_report,  arbolAST : arbol_ast }; return ast;
                }
    | XQUERY EOF {
				prod_1 = grammar_stack.pop();
				prod_2 = grammar_stack.pop();
				grammar_stack.push({'ini -> XQUERY EOF': [prod_2, prod_1]});
				grammar_report =  getGrammarReport(grammar_stack); cst = getCST(grammar_stack); arbol_ast = getASTTree($1);
				ast = { xquery: $1, errors: errors, cst: cst, grammar_report: grammar_report,  arbolAST : arbol_ast }; return ast;
		}
;

XQUERY: XQUERY INSTR_QUERY  { $1.push($2); $$=$1; }
        | INSTR_QUERY { $$=[$1]; }
;

INSTR_QUERY: FOR_LOOP { $$=$1; }
			| LET_CLAUSE { $$=$1; }
			| RETURN_STATEMENT { $$=$1; }
            | FUNCIONES { $$=$1; }
			| LLAMADA { $$=$1; }
			| IF_THEN_ELSE { $$=$1; }
;

IF_THEN_ELSE: IF THEN ELSE { $$=queryBuilder.nuevoIf_Then_Else($1, $2, $3, this._$.first_line, this._$.first_column+1); }
;

IF: tk_if tk_ParA E tk_ParC { $$=$3; }
;

THEN: tk_then E { $$=$2; }
	| tk_then tk_ParA tk_ParC { $$=[]; }
;

ELSE: tk_else E { $$=$2; }
	| tk_else tk_ParA tk_ParC { $$=[]; }
	| tk_else IF_THEN_ELSE { $$=$2; }
;

FUNCIONES: tk_declare tk_function tk_local tk_dospts tk_id tk_ParA LISTA_PARAMETROS tk_ParC tk_as DATATPYE tk_labre INSTR_FUNCIONES tk_lcierra tk_ptcoma
			{ $$=queryBuilder.nuevaFuncion($5, $7, $10, $12, this._$.first_line, this._$.first_column+1); }
;

LISTA_PARAMETROS: LISTA_PARAMETROS tk_coma PARAMETRO { $1.push($3); $$=$1; }
				| PARAMETRO { $$=[$1]; }
;

PARAMETRO: VARIABLE tk_as DATATPYE { $$=queryBuilder.nuevoParametro($1, $3, this._$.first_line, this._$.first_column+1); }
;

DATATPYE: tk_xs tk_dospts RESERVED_TYPES TERM { $$=$3; }
;

TERM: tk_interrogacion
	| tk_asterisco
	|
;

INSTR_FUNCIONES: XQUERY { $$=$1; }
;

LLAMADA: tk_local tk_dospts tk_id tk_ParA VALORES tk_ParC { $$=queryBuilder.nuevaLlamada($3, $5, this._$.first_line, this._$.first_column+1); }
		| NATIVAS tk_ParA VALORES tk_ParC { $$=queryBuilder.llamadaNativa($1, $3, this._$.first_line, this._$.first_column+1); }
;

NATIVAS: tk_uppercase { $$ = Tipos.TO_UPPERCASE; }
		| tk_lowercase { $$ = Tipos.TO_LOWERCASE; }
		| tk_string { $$ = Tipos.TO_STRING; }
		| tk_number { $$ = Tipos.TO_NUMBER; }
		| tk_substring { $$ = Tipos.SUBSTRING; }
;

FOR_LOOP: tk_for DECLARACION INSTRUCCIONES_FOR RETURN_STATEMENT { $3.push($4); $$ = queryBuilder.nuevoFor($2, $3, this._$.first_line, this._$.first_column+1); }
		| tk_for DECLARACION RETURN_STATEMENT { $$ = queryBuilder.nuevoFor($2, [$3], this._$.first_line, this._$.first_column+1); }
;

INSTRUCCIONES_FOR: INSTRUCCIONES_FOR INSTR_FOR_P { $1.push($2); $$=$1; }
                | INSTR_FOR_P { $$=[$1]; }
;

INSTR_FOR_P: WHERE_CONDITION { $$ = $1; }
            | ORDER_BY { $$ = queryBuilder.nuevoOrderBy($1, this._$.first_line, this._$.first_column+1); }
			| LET_CLAUSE { $$=$1; }
;

LET_CLAUSE: tk_let VARIABLE tk_2puntos_igual DECLARACIONPP { $$ = queryBuilder.nuevoLet($2, $4, this._$.first_line, this._$.first_column+1); }
;

COMA_AUX: COMA_AUX tk_coma E { $1.push($3); $$=$1; }
        | E { $$=[$1]; }
;

WHERE_CONDITION: tk_where E { $$ = queryBuilder.nuevoWhere($2, this._$.first_line, this._$.first_column+1); }
;

ORDER_BY: ORDER_BY tk_coma E { $$=$3; }
        | tk_order tk_by E { $$=$3; }
;

RETURN_STATEMENT: tk_return HTML { $$ = queryBuilder.nuevoReturn($2, this._$.first_line, this._$.first_column+1); }
                | tk_return E { $$ = queryBuilder.nuevoReturn($2, this._$.first_line, this._$.first_column+1); }
				| tk_return IF_THEN_ELSE { $$ = queryBuilder.nuevoReturn($2, this._$.first_line, this._$.first_column+1); }
;

VARIABLE: tk_dolar tk_id { $$=queryBuilder.nuevaVariable("$"+$2, this._$.first_line, this._$.first_column+1); }
;

DECLARACION: DECLARACION tk_coma DECLARACIONP { $1.push($3); $$=$1; }
            | DECLARACIONP { $$=[$1] }
;

DECLARACIONP: VARIABLE tk_in DECLARACIONPP { $$ = queryBuilder.nuevaDeclaracion($1, null, $3, this._$.first_line, this._$.first_column+1); }
            | VARIABLE tk_at VARIABLE tk_in DECLARACIONPP { $$ = queryBuilder.nuevaDeclaracion($1, $3, $5, this._$.first_line, this._$.first_column+1); }
;

DECLARACIONPP: tk_ParA E tk_to E tk_ParC { $$ = queryBuilder.nuevoIntervalo($2, $4, this._$.first_line, this._$.first_column+1); }
            | tk_ParA E tk_coma COMA_AUX tk_ParC { $4.unshift($2); $$ = queryBuilder.nuevosValores($4, this._$.first_line, this._$.first_column+1); }
            | E { $$=$1; }
;

DOC: tk_doc tk_ParA STRING tk_ParC
	|
;

VALORES: VALORES tk_coma E { $1.push($3); $$=$1; }
            | E { $$=[$1]; }
;


XPATH_U: XPATH_U tk_line XPATH  { $1.push($3); $$=$1;
								 prod_1 = grammar_stack.pop();
								 prod_2 = grammar_stack.pop();
			 					 grammar_stack.push({'XPATH_U -> XPATH_U tk_line XPATH {S1.push(S3); SS = S1;}': [prod_2, 'token: tk_line\t Lexema: ' + $1, prod_1]}); }
		| XPATH { $$=[$1];
				  prod_1 = grammar_stack.pop();
			 	  grammar_stack.push({'XPATH_U -> XPATH {SS = [S1]}': [prod_1]}); }
;

XPATH: XPATH QUERY  { $1.push($2); $$=$1;
					  prod_1 = grammar_stack.pop();
					  prod_2 = grammar_stack.pop();
			 		  grammar_stack.push({'XPATH -> XPATH QUERY {S1.push(S2); SS = S1;}': [prod_2, prod_1]}); }
	| DOC QUERY  { $$=[$2];
			   prod_1 = grammar_stack.pop();
			   grammar_stack.push({'XPATH -> QUERY {SS = [S1]}': [prod_1]}); }
;

QUERY: tk_2bar QUERY { $$=builder.newDoubleAxis($2, this._$.first_line, this._$.first_column+1);
					   prod_1 = grammar_stack.pop();
			 		   grammar_stack.push({'QUERY -> tk_2bar QUERY SS=builder.newDoubleAxis(Param);': ['token: tk_2bar\t Lexema: ' + $1, prod_1]}); }
	| tk_bar QUERY { $$=builder.newAxis($2, this._$.first_line, this._$.first_column+1);
					 prod_1 = grammar_stack.pop();
			 		 grammar_stack.push({'QUERY -> tk_bar QUERY {SS=builder.newAxis(Param);}': ['token: tk_bar\t Lexema: ' + $1, prod_1]}); }
	| tk_bar tk_asterisco CORCHETP {
			var linea = this._$.first_line;
			var columna = this._$.first_column+1;
			$$=builder.newAxis(builder.newExpression(builder.newValue($2, Tipos.ASTERISCO, linea, columna), $3, linea, columna), linea, columna);
		}
	| tk_2bar tk_asterisco CORCHETP {
			var linea = this._$.first_line;
			var columna = this._$.first_column+1;
			$$=builder.newDoubleAxis(builder.newExpression(builder.newValue($2, Tipos.ASTERISCO, linea, columna), $3, linea, columna), linea, columna);
		}
	| EXP_PR { $$=$1; }
	| AXIS { $$=$1; }
;

CORCHET: CORCHET tk_corA E tk_corC { $1.push(builder.newPredicate($3, this._$.first_line, this._$.first_column+1)); $$=$1;
									 prod_1 = grammar_stack.pop();
									 prod_2 = grammar_stack.pop();
						 			 grammar_stack.push({'CORCHET -> CORCHET tk_ParA E tk_ParC {S1.push(builder.NewPredicate(Param))}': [prod_2, 'token: tk_ParA\t Lexema: ' + $2, prod_1, 'token: tk_ParC\t Lexema: ' + $4]}); }
	| tk_corA E tk_corC{ $$=[builder.newPredicate($2, this._$.first_line, this._$.first_column+1)];
						 prod_1 = grammar_stack.pop();
						 grammar_stack.push({'CORCHET -> tk_corA E tk_corC {SS=builder.newPredicate(Param)}': ['token: tk_corA\t Lexema: ' + $1, prod_1, 'token: tk_corC\t Lexema: ' + $3]}); } // Lista de predicados
;

CORCHETP: CORCHET { $$=$1;
					prod_1 = grammar_stack.pop();
					grammar_stack.push({'CORCHETP -> CORCHET {SS=S1;}': [prod_1]}); }
		| { $$=null;
			grammar_stack.push({'CORCHETP -> Empty {SS=null}': ['EMPTY'] }); }
;

E:	E tk_menorigual E { $$=builder.newOperation($1, $3, Tipos.RELACIONAL_MENORIGUAL, this._$.first_line, this._$.first_column+1);
						prod_1 = grammar_stack.pop();
				 		prod_2 = grammar_stack.pop();
					    grammar_stack.push({'E -> E tk_menorigual E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_menorigual\t Lexema: ' + $2, prod_1]}); }
	| E tk_menor E { $$=builder.newOperation($1, $3, Tipos.RELACIONAL_MENOR, this._$.first_line, this._$.first_column+1);
					 prod_1 = grammar_stack.pop();
				 	 prod_2 = grammar_stack.pop();
				 	 grammar_stack.push({'E -> E tk_menor E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_menor\t Lexema: ' + $2, prod_1]}); }
	| E tk_mayorigual E { $$=builder.newOperation($1, $3, Tipos.RELACIONAL_MAYORIGUAL, this._$.first_line, this._$.first_column+1);
						  prod_1 = grammar_stack.pop();
				 		  prod_2 = grammar_stack.pop();
						  grammar_stack.push({'E -> E tk_mayorigual E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_mayorigual\t Lexema: ' + $2, prod_1]}); }
	| E tk_mayor E { $$=builder.newOperation($1, $3, Tipos.RELACIONAL_MAYOR, this._$.first_line, this._$.first_column+1);
					 prod_1 = grammar_stack.pop();
				 	 prod_2 = grammar_stack.pop();
				 	 grammar_stack.push({'E -> E tk_mayor E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_mayor\t Lexema: ' + $2, prod_1]}); }
	| E tk_mas E { $$=builder.newOperation($1, $3, Tipos.OPERACION_SUMA, this._$.first_line, this._$.first_column+1);
				   prod_1 = grammar_stack.pop();
				   prod_2 = grammar_stack.pop();
				   grammar_stack.push({'E -> E tk_mas E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_mas\t Lexema: ' + $2, prod_1]}); }
	| E tk_menos E { $$=builder.newOperation($1, $3, Tipos.OPERACION_RESTA, this._$.first_line, this._$.first_column+1);
					 prod_1 = grammar_stack.pop();
				 	 prod_2 = grammar_stack.pop();
				  	 grammar_stack.push({'E -> E tk_menos E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_menos\t Lexema: ' + $2, prod_1]}); }
	| E tk_asterisco E { $$=builder.newOperation($1, $3, Tipos.OPERACION_MULTIPLICACION, this._$.first_line, this._$.first_column+1);
						 prod_1 = grammar_stack.pop();
				 		 prod_2 = grammar_stack.pop();
				  		 grammar_stack.push({'E -> E tk_asterisco E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_asterisco\t Lexema: ' + $2, prod_1]}); }
	| E tk_div E { $$=builder.newOperation($1, $3, Tipos.OPERACION_DIVISION, this._$.first_line, this._$.first_column+1);
				   prod_1 = grammar_stack.pop();
				   prod_2 = grammar_stack.pop();
				   grammar_stack.push({'E -> E tk_div E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_div\t Lexema: ' + $2, prod_1]}); }
	| E tk_mod E { $$=builder.newOperation($1, $3, Tipos.OPERACION_MODULO, this._$.first_line, this._$.first_column+1);
				   prod_1 = grammar_stack.pop();
				   prod_2 = grammar_stack.pop();
				   grammar_stack.push({'E -> E tk_mod E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_mod\t Lexema: ' + $2, prod_1]}); }
	| tk_menos E %prec umenos { $$=builder.newOperation(builder.newValue(0, Tipos.NUMBER, @1.first_line, @1.first_column+1), $2, Tipos.OPERACION_RESTA, this.$.first_line, this.$.first_column+1); 
								prod_1 = grammar_stack.pop();
						  		grammar_stack.push({'E -: tk_menos E': ['token: tk_menos\t Lexema: ' + $1, prod_1]});}
	| tk_mas E %prec umas { $$=builder.newOperation(builder.newValue(0, Tipos.NUMBER, @1.first_line, @1.first_column+1), $2, Tipos.OPERACION_SUMA, this.$.first_line, this.$.first_column+1); 
								prod_1 = grammar_stack.pop();
						  		grammar_stack.push({'E -: tk_mas E': ['token: tk_mas\t Lexema: ' + $1, prod_1]});}
	| tk_ParA E tk_ParC { $$=$2;
						  prod_1 = grammar_stack.pop();
						  grammar_stack.push({'E -> tk_ParA E tk_ParC {SS=S2}': ['token: tk_ParA\t Lexema: ' + $1, prod_1, 'token: tk_ParC\t Lexema: ' + $3]}); }
	| E tk_or E { $$=builder.newOperation($1, $3, Tipos.LOGICA_OR, this._$.first_line, this._$.first_column+1);
				  prod_1 = grammar_stack.pop();
				  prod_2 = grammar_stack.pop();
				  grammar_stack.push({'E -> E tk_or E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_or\t Lexema: ' + $2, prod_1]}); }
	| E tk_and E { $$=builder.newOperation($1, $3, Tipos.LOGICA_AND, this._$.first_line, this._$.first_column+1);
				   prod_1 = grammar_stack.pop();
				   prod_2 = grammar_stack.pop();
				   grammar_stack.push({'E -> E tk_and E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_and\t Lexema: ' + $2, prod_1]}); }
	| E tk_equal E { $$=builder.newOperation($1, $3, Tipos.RELACIONAL_IGUAL, this._$.first_line, this._$.first_column+1); 
					 prod_1 = grammar_stack.pop();
					 prod_2 = grammar_stack.pop();
					 grammar_stack.push({'E -> E tk_equal E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_equal\t Lexema: ' + $2, prod_1]}); }
	| E tk_diferent E { $$=builder.newOperation($1, $3, Tipos.RELACIONAL_DIFERENTE, this._$.first_line, this._$.first_column+1); 
						prod_1 = grammar_stack.pop();
						prod_2 = grammar_stack.pop();
						grammar_stack.push({'E -> E tk_diferent E {SS=builder.newOperation(Param)}': [prod_2, 'token: tk_diferent\t Lexema: ' + $2, prod_1]}); }
    | XPATH { $$=$1; }
	| tk_data tk_ParA XPATH tk_ParC { $3.push(insert_text(this._$.first_line, this._$.first_column+1)); $$ = $3; }
	| LLAMADA { $$=$1; }
;

EXP_PR: FUNC CORCHETP { $$=builder.newExpression($1, $2, this._$.first_line, this._$.first_column+1);
						prod_1 = grammar_stack.pop();
						prod_2 = grammar_stack.pop();
						grammar_stack.push({'EXP_PR -> FUNC CORCHETP {SS=builder.newExpression(Param)}': [prod_2, prod_1]}); } // Predicado puede ser nulo
		| PRIMITIVO CORCHETP { $$=builder.newExpression($1, $2, this._$.first_line, this._$.first_column+1); 
								prod_1 = grammar_stack.pop();
								prod_2 = grammar_stack.pop();
								grammar_stack.push({'EXP_PR -> PRIMITIVO CORCHETP {SS=builder.newExpression(Param)}': [prod_2, prod_1]}); }
		| VARIABLE CORCHETP { $$=insert_current($1.variable, $2, this._$.first_line, this._$.first_column+1); }
;

PRIMITIVO: tk_id { $$=builder.newNodename($1, this._$.first_line, this._$.first_column+1);
				   grammar_stack.push({'PRIMITIVO -> tk_id {SS=builder.newNodename(Param)}':['token: tk_text\t Lexema: ' + $1]}); }
        | STRING { $$ = $1; }
		| num { $$=builder.newValue(Number($1), Tipos.NUMBER, this._$.first_line, this._$.first_column+1);
				grammar_stack.push({'PRIMITIVO -> num {SS=builder.newValue(Param)}':['token: num\t Lexema: ' + $1]}); }
		| tk_punto { $$=builder.newCurrent($1, this._$.first_line, this._$.first_column+1); 
					 grammar_stack.push({'PRIMITIVO -> tk_punto {SS=builder.newCurrent(Param)}':['token: tk_punto\t Lexema: ' + $1]}); }
		| tk_2puntos { $$=builder.newParent($1, this._$.first_line, this._$.first_column+1);
					   grammar_stack.push({'PRIMITIVO -> tk_2puntos {SS=builder.newParent(Param)}':['token: tk_2puntos\t Lexema: ' + $1]}); }
		| tk_arroba tk_id { $$=builder.newAttribute($2, this._$.first_line, this._$.first_column+1);
							grammar_stack.push({'PRIMITIVO -> tk_arroba tk_id {SS=builder.newAttribute(Param)}':['token: tk_arroba\t Lexema: ' + $1, 'token: tk_id\t Lexema: ' + $2]}); }
		| tk_arroba tk_asterisco { $$=builder.newAttribute($2, this._$.first_line, this._$.first_column+1); 
							 grammar_stack.push({'PRIMITIVO -> tk_arroba tk_asterisco {SS=builder.newAttribute(Param)}':['token: tk_arroba\t Lexema: ' + $1, 'token: tk_asterisco\t Lexema: ' + $2]});}
;

STRING: tk_string_d { $$=builder.newValue($1, Tipos.STRING, this._$.first_line, this._$.first_column+1);
						   grammar_stack.push({'PRIMITIVO -> tk_attribute_d {SS=builder.newValue(Param)}':['token: tk_attribute_d\t Lexema: ' + $1]}); }
		| tk_string_s { $$=builder.newValue($1, Tipos.STRING, this._$.first_line, this._$.first_column+1); 
						   grammar_stack.push({'PRIMITIVO -> tk_attribute_s {SS=builder.newValue(Param)}':['token: tk_attribute_s\t Lexema: ' + $1]}); }
;

FUNC: tk_text tk_ParA tk_ParC { $$=builder.newValue($1, Tipos.FUNCION_TEXT, this._$.first_line, this._$.first_column+1);
								grammar_stack.push({'FUNC -> tk_text tk_ParA tk_ParC {SS=builder.newValue(Param)}':['token: tk_text\t Lexema: ' + $1, 'token: tk_ParA\t Lexema: ' + $2, 'token: tk_ParC\t Lexema: ' + $3]}); }
	| tk_last tk_ParA tk_ParC { $$=builder.newValue($1, Tipos.FUNCION_LAST, this._$.first_line, this._$.first_column+1);
								grammar_stack.push({'FUNC -> tk_last tk_ParA tk_ParC {SS=builder.newValue(Param)}':['token: tk_last\t Lexema: ' + $1, 'token: tk_ParA\t Lexema: ' + $2, 'token: tk_ParC\t Lexema: ' + $3]}); }
	| tk_position tk_ParA tk_ParC { $$=builder.newValue($1, Tipos.FUNCION_POSITION, this._$.first_line, this._$.first_column+1); 
									grammar_stack.push({'FUNC -> tk_position tk_ParA tk_ParC {SS=builder.newValue(Param)}':['token: tk_position\t Lexema: ' + $1, 'token: tk_ParA\t Lexema: ' + $2, 'token: tk_ParC\t Lexema: ' + $3]});}
	| tk_node tk_ParA tk_ParC { $$=builder.newValue($1, Tipos.FUNCION_NODE, this._$.first_line, this._$.first_column+1); 
								grammar_stack.push({'FUNC -> tk_node tk_ParA tk_ParC {SS=builder.newValue(Param)}':['token: tk_node\t Lexema: ' + $1, 'token: tk_ParA\t Lexema: ' + $2, 'token: tk_ParC\t Lexema: ' + $3]});}
;

AXIS: AXISNAME tk_4puntos QUERY { $$=builder.newAxisObject($1, $3, this._$.first_line, this._$.first_column+1);
								prod_1 = grammar_stack.pop();
								prod_2 = grammar_stack.pop();
								grammar_stack.push({'AXIS -> AXISNAME tk_4puntos QUERY {SS=builder.newAxisObject(Param)}':[prod_2, 'token: tk_4puntos\t Lexema: ' + $2, prod_1]}); }
	| AXISNAME tk_4puntos tk_asterisco CORCHETP { 
		var linea = this._$.first_line;
		var columna = this._$.first_column+1;
		$$=builder.newAxisObject($1, builder.newExpression(builder.newValue($3, Tipos.ASTERISCO, linea, columna), $4, linea, columna), linea, columna);
	}
;

AXISNAME: tk_ancestor { $$ = Tipos.AXIS_ANCESTOR;
						grammar_stack.push({'AXISNAME -> tk_ancestor {SS = Tipos.AxisTipo}':['token: tk_ancestor\t Lexema: ' + $1]}); }
		| tk_ancestor2 { $$ = Tipos.AXIS_ANCESTOR_OR_SELF;
						grammar_stack.push({'AXISNAME -> tk_ancestor2 {SS = Tipos.AxisTipo}':['token: tk_ancestor2\t Lexema: ' + $1]}); }
		| tk_attribute { $$ = Tipos.AXIS_ATTRIBUTE;
						grammar_stack.push({'AXISNAME -> tk_attribute {SS = Tipos.AxisTipo}':['token: tk_attribute\t Lexema: ' + $1]}); }
		| tk_child { $$ = Tipos.AXIS_CHILD;
						grammar_stack.push({'AXISNAME -> tk_child {SS = Tipos.AxisTipo}':['token: tk_child\t Lexema: ' + $1]}); }
		| tk_descendant { $$ = Tipos.AXIS_DESCENDANT;
						grammar_stack.push({'AXISNAME -> tk_descendant {SS = Tipos.AxisTipo}':['token: tk_descendant\t Lexema: ' + $1]}); }
		| tk_descendant2 { $$ = Tipos.AXIS_DESCENDANT_OR_SELF;
						grammar_stack.push({'AXISNAME -> tk_descendant2 {SS = Tipos.AxisTipo}':['token: tk_descendant2\t Lexema: ' + $1]}); }
		| tk_following { $$ = Tipos.AXIS_FOLLOWING;
						grammar_stack.push({'AXISNAME -> tk_following {SS = Tipos.AxisTipo}':['token: tk_following\t Lexema: ' + $1]}); }
		| tk_following2 { $$ = Tipos.AXIS_FOLLOWING_SIBLING;
						grammar_stack.push({'AXISNAME -> tk_following2 {SS = Tipos.AxisTipo}':['token: tk_follownig2\t Lexema: ' + $1]}); }
		| tk_namespace { $$ = Tipos.AXIS_NAMESPACE;
						grammar_stack.push({'AXISNAME -> tk_namespace {SS = Tipos.AxisTipo}':['token: tk_namespace\t Lexema: ' + $1]}); }
		| tk_parent { $$ = Tipos.AXIS_PARENT;
						grammar_stack.push({'AXISNAME -> tk_parent {SS = Tipos.AxisTipo}':['token: tk_parent\t Lexema: ' + $1]}); }
		| tk_preceding { $$ = Tipos.AXIS_PRECEDING;
						grammar_stack.push({'AXISNAME -> tk_preceding {SS = Tipos.AxisTipo}':['token: tk_preceding\t Lexema: ' + $1]}); }
		| tk_preceding2 { $$ = Tipos.AXIS_PRECEDING_SIBLING;
						grammar_stack.push({'AXISNAME -> tk_preceding2 {SS = Tipos.AxisTipo}':['token: tk_preceding2\t Lexema: ' + $1]}); }
		| tk_self { $$ = Tipos.AXIS_SELF;
						grammar_stack.push({'AXISNAME -> tk_self {SS = Tipos.AxisTipo}':['token: tk_self\t Lexema: ' + $1]}); }
;

RESERVED_TYPES: tk_string { $$ = Tipos.TIPADO_STRING; }
		| tk_integer { $$ = Tipos.TIPADO_INTEGER; }
		| tk_decimal { $$ = Tipos.TIPADO_DECIMAL; }
		| tk_boolean { $$ = Tipos.TIPADO_BOOLEANO; }
		| tk_normalizedString { $$ = Tipos.TIPADO_STRING; }
		| tk_token { $$ = Tipos.TIPADO_STRING; }
		| tk_date { $$ = Tipos.TIPADO_STRING; }
		| tk_dateTime { $$ = Tipos.TIPADO_STRING; }
		| tk_duration { $$ = Tipos.TIPADO_STRING; }
		| tk_time { $$ = Tipos.TIPADO_STRING; }
		| hexBinary { $$ = Tipos.TIPADO_STRING; }
		| tk_uri { $$ = Tipos.TIPADO_STRING; }
;



/******************************************************************* Ya no se implementó HTML, se puede ignorar *******************************************************************/
HTML: tk_menor tk_id ATTRIBUTE_LIST tk_mayor CONTENT_LL tk_menor tk_bar tk_id tk_mayor { $$ = queryBuilder.nuevoHTML($2, $3, $5, $8, this._$.first_line, this._$.first_column+1); }
    | tk_menor tk_id ATTRIBUTE_LIST tk_mayor tk_menor tk_bar tk_id tk_mayor { $$ = queryBuilder.nuevoHTML($2, $3, null, $7, this._$.first_line, this._$.first_column+1); }
    | tk_menor tk_id ATTRIBUTE_LIST tk_bar tk_mayor { $$ = queryBuilder.nuevoHTML($2, $3, null, null, this._$.first_line, this._$.first_column+1); }
;

CONTENT_LL: CONTENT_LL CONTENT_TAG { $1.push($2); $$=$1; }
        | CONTENT_TAG { $$=[$1]; }
        | HTML
;

CONTENT_TAG: tk_id { $$ = queryBuilder.nuevoContenido($1, this._$.first_line, this._$.first_column+1); } // era tk_content
            | tk_labre XPATH tk_lcierra { $$ = queryBuilder.nuevaInyeccion($2, false, this._$.first_line, this._$.first_column+1); }
            | tk_labre tk_data tk_ParA XPATH tk_ParC tk_lcierra { $$ = queryBuilder.nuevaInyeccion($4, true, this._$.first_line, this._$.first_column+1); }
;

ATTRIBUTE_LIST: tk_id tk_equal STRING { $$=$3; }
                | tk_id tk_equal CONTENT_LL { $$=$3; }
                | { $$=null; }
;
/*********************************************************************************************************************************************************************************/