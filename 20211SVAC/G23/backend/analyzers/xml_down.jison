/* lexical grammar */
%{
	var attribute = '';
	var errors = [];
	let re = /[^\n\t\r ]+/g
	//let ast = null;
	let grammar_stack = [];



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
                         <title>Reporte gramatical</title>
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
                         <tr>
                         <th>Produccion</th>
                         <th>Cuerpo</th>
                         <th>Accion</th>
                         </tr>

                         <tr>
                         <th>INI-&gt;</th>
                         <td>XML_DECLARATION ROOT EOF</td>
                         <td>$$ = [$1, $2] </td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>XML_DECLARATION  EOF</td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>ROOT EOF</td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>
                         <tr>
                         <td></td>
                         <td>EOF</td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>
                         <tr>
                         <td></td>
                         <td>error EOF</td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         </tr>
                         <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         </tr>



                         <tr>
                         <th>ROOT-&gt;</th>
                         <td>XML ROOT</td>
                         <td>$$ = $2.push($1);</td>
                         </tr>
                         <tr>
                         <td></td>
                         <td>XML</td>
                         <td>$$ = []; $$.push($1);</td>
                         </tr>


                         <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         </tr>
                         <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         </tr>

                         <tr>
                         <th>XML_DECLARATION-&gt;</th>
                         <td>tk_open_declaration ATTRIBUTE_LIST XML_CLOSE_DECLARATION</td>
                         <td>$$ = $2</td>
                         </tr>


                         <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         </tr>
                         <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         </tr>





                         <tr>
                         <th>XML_CLOSE_DECLARATION-&gt;</th>
                         <td>tk_close_delcaraton</td>
                         <td>$$ = $1</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>tk_close</td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>


                         <tr>
                         <td></td>
                         <td>error tk_close</td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         </tr>
                         <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         </tr>

                         <tr>
                         <th>ATTRIBUTE_LIST-&gt;</th>
                         <td>ATTRIBUTE ATTRIBUTE_LIST </td>
                         <td>if($2 == null){$$=[]; $$.push($1)}else{$2.push($1)}</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>Empty</td>
                         <td>$$ = null</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         </tr>
                         <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         </tr>



                         <tr>
                         <th>ATTRIBUTE-&gt;</th>
                         <td>tk_attribute_name tk_string  </td>
                         <td>$$ = new Attribute($1, $2)</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>tk_attribute_name</td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>tk_equal tk_string   </td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>tk_tag_name</td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>cadena_err tk_string </td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>cadena_err</td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         </tr>
                         <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         </tr>

                         <tr>
                         <th>XML-&gt;</th>
                         <td>XML_OPEN CHILDREN tk_open_end_tag tk_tag_name tk_close   </td>
                         <td>$$ = $1; $1.children = $2</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>XML_OPEN tk_content tk_open_end_tag tk_tag_name tk_close  </td>
                         <td>$$ = $1; $$.content = $2</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>tk_open tk_tag_name ATTRIBUTE_LIST tk_bar tk_close </td>
                         <td>$$ = new Element(); $$.attributes = $3</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>XML_OPEN tk_open_end_tag tk_tag_name tk_close </td>
                         <td>$$ = $1; </td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>XML_OPEN tk_open_end_tag tk_tag_name  </td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>XML_OPEN tk_open_end_tag  tk_close </td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>XML_OPEN tk_content tk_open_end_tag tk_tag_name  </td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>XML_OPEN tk_content tk_open_end_tag  tk_close </td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>XML_OPEN tk_content  tk_open tk_tag_name ATTRIBUTE_LIST tk_close</td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>XML_OPEN CHILDREN tk_open_end_tag tk_tag_name  </td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>XML_OPEN CHILDREN tk_open_end_tag  tk_close  </td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>error tk_open_end_tag tk_tag_name tk_close </td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>error tk_open_end_tag tk_tag_name  </td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>error tk_bar tk_close </td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>error  tk_close </td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         </tr>
                         <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         </tr>


                         <tr>
                         <th>XML_OPEN-&gt;</th>
                         <td>tk_open tk_tag_name ATTRIBUTE_LIST tk_close </td>
                         <td>$$ = new Element(); $$.attributes = $3</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>tk_open tk_tag_name ATTRIBUTE_LIST  </td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>tk_open</td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td>tk_open   tk_close  </td>
                         <td>errors.add(new Error()); $$ = null;</td>
                         </tr>

                         <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         </tr>
                         <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         </tr>


                         <tr>
                         <th>CHILDREN-&gt;</th>
                         <td>XML CHILDREN</td>
                         <td>$2.push($1); $$ = $2;</td>
                         </tr>
                         <tr>
                         <td></td>
                         <td>XML</td>
                         <td>$$ = [$1]</td>
                         </tr>

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
            console.log("ERROR**************************");
        }else{// IS OBJECT
            for(let key in obj){
                str = `<li><span class="caret">
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
                     console.log(str + value);
                }else if(Array.isArray(value)){console.log("ERROR 5");}else{
                    str = ""
                    for(let i = 0; i < lines; i++){ str = str + "- ";}
                    for(let key in value){
                       console.log(`${str}${key}`);
                       printstrack(value[key], lines + 1);
                    }
                }

                //printstrack(value, lines +1);
            });
        }else if(typeof obj === 'string' ){ // IS STRING
            str = ""
            for(let i = 0; i < lines; i++){str = str + "- ";}
            console.log(str + obj);
        }else{// IS OBJECT
            str = ""
            for(let i = 0; i < lines; i++){ str = str + "- ";}
            for(let key in obj){
                console.log(`${str}Key: ${key}`);
                //console.log(obj[key]);
                printstrack(obj[key], lines + 1);
            }
        }
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
            <title>CST</title>
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

                /*# sourceMappingURL=sytle_.css.map */


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
            console.log("ERROR**************************");
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
%x content

/*Regular Expressions*/
unicode_chars                      [\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1]+
tag_name                           [_a-zA-Z]([a-zA-Z0-9_.-]|{unicode_chars})*
attribute_name                     {tag_name}\s*'='
string                             (\"[^\"\n]*[\"\n]) | (\'[^\'\n]*[\'\n])
element_content                    ([^<>&\"] | '&lt;' | '&gt;' | '&amp;' | '&apos;' | '&quot;' )+

cadena_err                              [0-9]+("."[0-9]+)?([a-zA-Z0-9_.-]|{unicode_chars})*"="?
%%

\s+                   	// Whitespace
"<!--"([^-]|\-[^-])*"-->"	    /* MultiLineComment*/
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
{cadena_err}                 {return cadena_err;}    /*USED FOR ERROR*/
{id_err}                     {return id_err;}     /*USED FOR ERROR*/


<content>"<!--"([^-]|\-[^-])*"-->"	    /* MultiLineComment*/
<content>{element_content}       {
                                    if(yytext.match(re)){return 'tk_content';}
                                 }

<content><<EOF>>               	 return 'EOF'
<content>">"                     {this.popState(); return 'tk_close';} //TODO: error
<content>"</"                    { this.popState(); return 'tk_open_end_tag'}
<content>"<"                     {  this.popState();
                                    return 'tk_open';}
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
                                            grammar_stack.push({'INI-> XML_DECLARATION ROOT EOF {﹩ = [﹩1, ﹩2]}': [prod_2, prod_1, 'EOF' ]});
                                            //printstrack(grammar_stack, 0); //TODO: Delete is just for testing purposes
                                            grammar_report =  getGrammarReport(grammar_stack);
                                            cst = getCST(grammar_stack);

                                            if($1!= null){
                                                encoding = new Encoding($1);
                                                ast = { ast: $2, encoding: encoding, errors: errors, cst: cst, grammar_report: grammar_report};
                                            } else{
                                                errors.push({ tipo: "Sintáctico", error: "La codificación del XML no es válida.", origen: "XML", linea: this._$.first_line, columna: this._$.first_column+1 }); return { ast: null, errors: errors };
                                                ast = { ast: $2, encoding: null,  errors: errors, cst: cst, grammar_report: grammar_report};
                                            }
                                            errors = [];
                                            return ast;
                                            }
    | XML_DECLARATION  EOF                  {
                                            prod_1 = grammar_stack.pop();
                                            grammar_stack.push({'INI -> XML_DECLARATION  EOF {	errors.add(new Error()); ﹩﹩ = null;}': [prod_1, 'EOF' ]});
                                            grammar_report =  getGrammarReport(grammar_stack);

                                            ast = { ast: null, encoding: null,  errors: errors, cst: null, grammar_report: grammar_report };
                                            errors = [];
                                            return ast;
                                            }
    | ROOT EOF                              {
                                            prod_1 = grammar_stack.pop();
                                            grammar_stack.push({'INI -> ROOT EOF {	errors.add(new Error()); ﹩﹩ = null;}': [prod_1, 'EOF' ]});
                                            grammar_report =  getGrammarReport(grammar_stack);

                                            errors.push({ tipo: "Sintáctico", error: "Falta declaracion del XML", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                            ast = { ast: null, encoding: null,  errors: errors, cst: null, grammar_report: grammar_report };
                                            errors = [];
                                            return ast;
                                            }
	| EOF                                   {
                                            grammar_stack.push({'INI -> EOF {	errors.add(new Error()); ﹩﹩ = null;}': [ 'EOF']});
                                            grammar_report =  getGrammarReport(grammar_stack);
                                            errors.push({ tipo: "Sintáctico", error: "El archivo viene vacio.", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });

	                                        ast = { ast: null, encoding: null,  errors: errors, cst: null, grammar_report: grammar_report }
	                                        errors = [];
	                                        return ast;
	                                        }
	| error EOF                             {
	                                        grammar_stack.push({'INI -> error EOF {	errors.add(new Error()); ﹩﹩ = null;}': ['Token: error\t Lexema: ', 'EOF' ]});
                                            grammar_report =  getGrammarReport(grammar_stack);

                                            errors.push({ tipo: "Sintáctico", error: "Token no esperado.", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                            ast = { ast: null, encoding: null,  errors: errors, cst: null, grammar_report: grammar_report };
                                            errors = [];
                                            return ast;
                                            }
	;



ROOT:  XML ROOT                                 {if($1 != null && $2 != null){ $2.push($1); $$ = $2; } else if($2 == null){$$ = []; $$.push($1); }else{$$ = null;}
                                                prod_1 = grammar_stack.pop();
                                                prod_2 = grammar_stack.pop();
                                                grammar_stack.push({'ROOT ->  XML ROOT  {﹩﹩ = ﹩2.push(﹩1);}': [prod_2, prod_1 ]});
                                                }
	| XML                                       {$$ = []; $$.push($1);
	                                            prod_1 = grammar_stack.pop();
	                                            grammar_stack.push({'ROOT -> XML {﹩﹩ = []; ﹩﹩.push(﹩1);}': [prod_1 ]});
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
                                                                           grammar_stack.push({'XML_DECLARATION -> tk_open_declaration ATTRIBUTE_LIST XML_CLOSE_DECLARATION {﹩﹩ = ﹩2}': ['Token: tk_open_declaration\t Lexema: ' + '&lt;?', prod_2, prod_3]} );
                                                                           }
                ;

XML_CLOSE_DECLARATION: tk_close_delcaraton     {  $$ = "?>"
                                                grammar_stack.push({'XML_CLOSE_DECLARATION -> tk_close_delcaraton { ﹩﹩= ﹩1}': ['Token: tk_close_delcaraton\t Lexema: ' + '?&gt;']});
                                                }
                    |   tk_close                {$$ = null;
                                                 errors.push({ tipo: "Sintáctico", error: "Se esperaba token /", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                                grammar_stack.push({'XML_CLOSE_DECLARATION -> tk_close {errors.add(new Error()); ﹩﹩ = null;}': ['Token: tk_close\t Lexema: ' + '&gt;']});
                                                }
                    |   error tk_close          { $$ = null;
                                                 errors.push({ tipo: "Sintáctico", error: "Token no esperado. " + $1, origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                                 grammar_stack.push({'XML_CLOSE_DECLARATION -> error tk_close {	errors.add(new Error()); ﹩﹩ = null;}': ['Token: error\t Lexema: ' + $1, 'Token: tk_close\t Lexema: ' + '&gt;']});
                                                 }
                    ;

ATTRIBUTE_LIST :  ATTRIBUTE  ATTRIBUTE_LIST {if($1 != null && $2 != null){$2.push($1); $$ = $2}else if($2 == null){$$ = []; $$.push($1);}else{$$ = null;}
                                            prod_1 = grammar_stack.pop();
                                            prod_2 = grammar_stack.pop();
                                            grammar_stack.push({'ATTRIBUTE_LIST -> ATTRIBUTE ATTRIBUTE_LIST {if(﹩2 == null){﹩﹩=[]; ﹩﹩.push(﹩1)}else{﹩2.push(﹩1)}}': [ prod_2, prod_1 ] });
                                          }
                |                           {$$ = null;             grammar_stack.push({'ATTRIBUTE_LIST -> Empty {﹩﹩ = null}': ['EMPTY'] });      }
                ;



ATTRIBUTE : tk_attribute_name tk_string     {attr = new Atributo($1.slice(0, -1), $2.slice(1,-1), this._$.first_line, this._$.first_column+1);
                                            attr.Cst= `<li><a href=''>ATTRIBUTE</a>
                                            <ul>
                                            <li><a href=''>tk_attribute_name</a><ul>\n<li><a href=''>${$1}</a></li></ul></li>
                                            <li><a href=''>tk_string</a><ul>\n<li><a href=''>${$2}</a></li></ul></li>
                                            </ul>
                                            </li>`;
                                            $$ = attr;
                                            grammar_stack.push({'ATTRIBUTE -> tk_attribute_name tk_string {	﹩﹩ = new Attribute(﹩1, ﹩2)}': ['Token: tk_attribute_name\t Lexema: ' + $1, 'Token: tk_string\t Lexema: ' + $2 ]});
                                            }
            | tk_attribute_name             { $$ = null;
                                            errors.push({ tipo: "Sintáctico", error: "Se esperaba un atributo despues de =.", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                            grammar_stack.push({'ATTRIBUTE -> tk_attribute_name {errors.add(new Error()); ﹩﹩ = null;}':['Token: tk_attribute_name\t Lexema: ' + $1]});
                                            }
            | tk_equal tk_string            { $$ = null;
                                            errors.push({ tipo: "Sintáctico", error: "Se esperaba un nombre para atributo antes de =.", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                            grammar_stack.push({'ATTRIBUTE -> tk_equal tk_string {errors.add(new Error()); ﹩﹩ = null;}':['Token: tk_equal\t Lexema: ' + $1, 'Token: tk_string\t Lexema: ' + $2]});
                                            }
            | tk_tag_name                   { $$ = null;
                                            errors.push({ tipo: "Sintáctico", error: "Se esperaba signo =", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                            grammar_stack.push({'ATTRIBUTE -> tk_tag_name {	errors.add(new Error()); ﹩﹩ = null;}':['Token: tk_tag_name\t Lexema: ' + $1]});
                                            }
            | cadena_err tk_string          { $$ = null;
                                            errors.push({ tipo: "Lexico", error: "Nombre del atributo no puede empezar con digitos.", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                            grammar_stack.push({'ATTRIBUTE -> cadena_err tk_string {errors.add(new Error()); ﹩﹩ = null;}':['Token: cadena_err\t Lexema: ' + $1, 'Token: tk_string\t Lexema: ' + $2]});
                                            }
            | cadena_err                    { $$ = null;
                                            errors.push({ tipo: "Lexico", error: "Nombre del atributo no puede empezar con digitos, y debe tener signo = y atributo a continuacion.", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                            grammar_stack.push({'ATTRIBUTE -> cadena_err {	errors.add(new Error()); ﹩﹩ = null;}':['Token: cadena_err\t Lexema: ' + $1]});
                                            }
            ;

XML: XML_OPEN CHILDREN tk_open_end_tag tk_tag_name tk_close                     {if($1 != null){  $1.Children = $2; $1.Close = $4; $$ = $1;
                                                                                let hasConflict = $1.verificateNames();
                                                                                if(hasConflict === "") {
                                                                                    if($1.childs){
                                                                                        $1.childs.forEach(child => {
                                                                                        child.Father = {id: $1.id_open, line: $1.line, column: $1.column};
                                                                                        });
                                                                                        $$ = $1;
                                                                                    }
																				}
                                                                                else {
																					errors.push({ tipo: "Semántico", error: hasConflict, origen: "XML", linea: @4.first_line, columna: @4.first_column+1 });
                                                                                    $$ = null;
																				}
                                                                                 }else{$$ = null;}
                                                                                 prod_1 = grammar_stack.pop();
                                                                                 prod_2 = grammar_stack.pop();
                                                                                 grammar_stack.push({'XML-> XML_OPEN CHILDREN tk_open_end_tag tk_tag_name tk_close {﹩﹩ = ﹩1; ﹩1.children = ﹩2}':[prod_2, prod_1, 'Token: tk_open_end_tag\t Lexema: ' + '&lt;/', 'Token: tk_tag_name\t Lexema: ' + $4, 'Token: tk_close\t Lexema: ' + '&gt;']});
                                                                                 }
	| XML_OPEN tk_content tk_open_end_tag tk_tag_name tk_close                  {if($1 != null){$1.Value = $2; $1.Close = $4;  $$ = $1;
                                                                                let hasConflict = $1.verificateNames();
                                                                                if(hasConflict !== ""){
                                                                                 errors.push({ tipo: "Semántico", error: hasConflict, origen: "XML", linea: @4.first_line, columna: @4.first_column+1 });
                                                                                 $$ = null;
                                                                                 }
	                                                                             }else{$$ = null;}
	                                                                             prod_1 = grammar_stack.pop();
	                                                                             grammar_stack.push({'XML -> XML_OPEN tk_content tk_open_end_tag tk_tag_name tk_close {﹩﹩ = ﹩1; ﹩﹩.content = ﹩2}':[prod_1, 'Token: tk_content\t Lexema: ' + $2, 'Token: tk_open_end_tag\t Lexema: ' + '&lt;/', 'Token: tk_tag_name\t Lexema: ' + $4, 'Token: tk_close\t Lexema: ' + '&gt;']});
	                                                                             }
	| tk_open tk_tag_name ATTRIBUTE_LIST tk_bar tk_close                        {$$ = new Element($2, $3, null, null, @1.first_line, @1.first_column+1, null);

                                                                                prod_1 = grammar_stack.pop();
                                                                                grammar_stack.push({'XML -> tk_open tk_tag_name ATTRIBUTE_LIST tk_bar tk_close {﹩﹩ = new Element(); ﹩﹩.attributes = ﹩3}':['Token: tk_open\t Lexema: ' + '&lt;', 'Token: tk_tag_name\t Lexema: ' + $2, prod_1, 'Token: tk_bar\t Lexema: ' + $4, 'Token: tk_close\t Lexema: ' + '&gt;']});
	                                                                            }
	| XML_OPEN tk_open_end_tag tk_tag_name tk_close                             {if($1 != null){$1.Close = $3; $$ = $1;
	                                                                            let hasConflict = $1.verificateNames();
	                                                                             if(hasConflict !== ""){
                                                                                errors.push({ tipo: "Semántico", error: hasConflict, origen: "XML", linea: @4.first_line, columna: @4.first_column+1 });
                                                                                $$ = null;

                                                                                prod_1 = grammar_stack.pop();
                                                                                }
	                                                                            }else{$$ = null;}
	                                                                            grammar_stack.push({'XML -> XML_OPEN tk_open_end_tag tk_tag_name tk_close {	﹩﹩ = ﹩1;}':[prod_1, 'Token: tk_open_end_tag\t Lexema: ' + '&lt;/', 'Token: tk_tag_name\t Lexema: ' + $3, 'Token: tk_close\t Lexema: '  + '&gt;']});
	                                                                            }
	| XML_OPEN tk_open_end_tag tk_tag_name                                      {$$ =null;
                                                                                errors.push({ tipo: "Sintáctico", error: "Falta etiquta de cierre \">\". ", origen: "XML", linea: @3.first_line, columna: @3.first_column+1 });

                                                                                prod_1 = grammar_stack.pop();
	                                                                            grammar_stack.push({'XML -> XML_OPEN tk_open_end_tag tk_tag_name {errors.add(new Error()); ﹩﹩ = null;}':[prod_1, 'Token: tk_open_end_tag\t Lexema: ' + '&lt;/', 'Token: tk_tag_name\t Lexema: '  + $3]});
	                                                                            }
	| XML_OPEN tk_open_end_tag  tk_close                                        {$$ =null;
                                                                                errors.push({ tipo: "Sintáctico", error: "Se esperaba un identificador. ", origen: "XML", linea: @2.first_line, columna: @2.first_column+1 });

                                                                                prod_1 = grammar_stack.pop();
	                                                                            grammar_stack.push({'XML -> XML_OPEN tk_open_end_tag  tk_close {errors.add(new Error()); ﹩﹩ = null;}':[prod_1, 'Token: tk_open_end_tag\t Lexema: ' + '&lt;/',  'Token: tk_close\t Lexema: ' + '&gt;']});
	                                                                            }
	| XML_OPEN tk_content tk_open_end_tag tk_tag_name                           {$$ =null;
                                                                                errors.push({ tipo: "Sintáctico", error: "Falta etiquta de cierre \">\". ", origen: "XML", linea: @4.first_line, columna: @4.first_column+1 });

                                                                                prod_1 = grammar_stack.pop();
	                                                                            grammar_stack.push({'XML -> XML_OPEN tk_content tk_open_end_tag tk_tag_name {errors.add(new Error()); ﹩﹩ = null;}':[prod_1, 'Token: tk_content\t Lexema: ' + $2, 'Token: tk_open_end_tag\t Lexema: ' + '&lt;/', 'Token: tk_tag_name\t Lexema: ' + $4]});
	                                                                            }
	| XML_OPEN tk_content tk_open_end_tag  tk_close                             {$$ =null;
                                                                                errors.push({ tipo: "Sintáctico", error: "Se esperaba un identificador. ", origen: "XML", linea: @3.first_line, columna: @3.first_column+1 });

                                                                                prod_1 = grammar_stack.pop();
                                                                                grammar_stack.push({'XML -> XML_OPEN tk_content tk_open_end_tag  tk_close {errors.add(new Error()); ﹩﹩ = null;}':[prod_1, 'Token: tk_content\t Lexema: ' + $2, 'Token: tk_open_end_tag\t Lexema: ' + '&lt;/',  'Token: tk_close\t Lexema: ' + $4  ]});
                                                                            	}
	| XML_OPEN tk_content  tk_open tk_tag_name ATTRIBUTE_LIST tk_close          {$$ =null;
                                                                                errors.push({ tipo: "Sintáctico", error: "Se esperaba etiqueta de cierre. ", origen: "XML", linea: @2.first_line, columna: @2.first_column+1 });

                                                                                prod_1 = grammar_stack.pop();
                                                                                prod_2 = grammar_stack.pop();
	                                                                            grammar_stack.push({'XML -> XML_OPEN tk_content  tk_open tk_tag_name ATTRIBUTE_LIST tk_close {errors.add(new Error()); ﹩﹩ = null;}':[prod_2, 'Token: tk_content\t Lexema: ' + $2,  'Token: tk_open\t Lexema: ' + '&lt;', 'Token: tk_tag_name\t Lexema: ' + $4, prod_1, 'Token: tk_close\t Lexema: ' + '&gt;']});
	                                                                            }
	| XML_OPEN CHILDREN tk_open_end_tag tk_tag_name                             {$$ =null;
	                                                                            errors.push({ tipo: "Sintáctico", error: "Falta etiquta de cierre \">\". ", origen: "XML", linea: @4.first_line, columna: @4.first_column+1 });

                                                                                prod_1 = grammar_stack.pop();
                                                                                prod_2 = grammar_stack.pop();
	                                                                            grammar_stack.push({'XML -> XML_OPEN CHILDREN tk_open_end_tag tk_tag_name {errors.add(new Error()); ﹩﹩ = null;}':[prod_2, prod_1, 'Token: tk_open_end_tag\t Lexema: ' + '&lt;/', 'Token: tk_tag_name\t Lexema: ' + $4]});
	                                                                            }
	| XML_OPEN CHILDREN tk_open_end_tag  tk_close                               {$$ =null;
	                                                                            errors.push({ tipo: "Sintáctico", error: "Se esperaba un identificador.", origen: "XML", linea: @3.first_line, columna: @3.first_column+1 });

                                                                                prod_1 = grammar_stack.pop();
                                                                                prod_2 = grammar_stack.pop();
	                                                                            grammar_stack.push({'XML -> XML_OPEN CHILDREN tk_open_end_tag  tk_close {errors.add(new Error()); ﹩﹩ = null;}':[prod_2, prod_1, 'Token: tk_open_end_tag\t Lexema: ' + '&lt;/',  'Token: tk_close\t Lexema: '  + '&gt;']});
	                                                                            }
	//| XML_OPEN CHILDREN tk_open_end_tag tk_tag_name tk_close
    //| tk_open_end_tag tk_tag_name tk_close                        {console.log("Prod error");}
	| error tk_open_end_tag tk_tag_name tk_close                            {$$ =null;
	                                                                        errors.push({ tipo: "Sintáctico", error: "Token no esperado " + $1, origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });

                                                                             grammar_stack.push({'XML -> error tk_open_end_tag tk_tag_name tk_close {errors.add(new Error()); ﹩﹩ = null;}':['Token: error\t Lexema: ' + $1, 'Token: tk_open_end_tag\t Lexema: ' + '&lt;/', 'Token: tk_tag_name\t Lexema: ' + $3, 'Token: tk_close\t Lexema: '  + '&gt;']});
                                                                             }
    | error tk_open_end_tag tk_tag_name                                     {$$ =null;
    	                                                                    errors.push({ tipo: "Sintáctico", error: "Token no esperado " + $1, origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });

                                                                            grammar_stack.push({'XML -> error tk_open_end_tag tk_tag_name {errors.add(new Error()); ﹩﹩ = null;}':['Token: error\t Lexema: ' + $1, 'Token: tk_open_end_tag\t Lexema: ' + '&lt;/', 'Token: tk_tag_name\t Lexema: ' + $3]});
                                                                            }
	| error tk_bar tk_close                                                 {$$ =null;
	                                                                        errors.push({ tipo: "Sintáctico", error: "Token no esperado " + $1, origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });

	                                                                        grammar_stack.push({'XML -> error tk_bar tk_close {errors.add(new Error()); ﹩﹩ = null;}':['Token: error\t Lexema: ' + $1, 'Token: tk_bar\t Lexema: ' + $2, 'Token: tk_close\t Lexema: ' + '&gt;']});
	                                                                        }
	| error  tk_close                                                       {$$ =null;
	                                                                        errors.push({ tipo: "Sintáctico", error: "Token no esperado " + $1, origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });

	                                                                        grammar_stack.push({'XML -> error  tk_close {errors.add(new Error()); ﹩﹩ = null;}':['Token: error\t Lexema: ' + $1,  'Token: tk_close\t Lexema: ' + '&gt;']});
	                                                                        }
	//| error tk_open    {console.log("Production error 7");}
;
//

XML_OPEN: tk_open tk_tag_name ATTRIBUTE_LIST tk_close   { $$ = new Element($2, $3, null, null,  @1.first_line,  @1.first_column+1);

                                                        prod_1 = grammar_stack.pop();
                                                        grammar_stack.push({'XML_OPEN -> tk_open tk_tag_name ATTRIBUTE_LIST tk_close {﹩﹩ = new Element(); ﹩﹩.attributes = ﹩3}':['Token: tk_open\t Lexema: ' + '&lt;', 'Token: tk_tag_name\t Lexema: ' + $2, prod_1, 'Token: tk_close\t Lexema: ' + '&gt;']});
                                                         }
        | tk_open tk_tag_name ATTRIBUTE_LIST            {
                                                        $$ = null;
                                                        errors.push({ tipo: "Sintáctico", error: "Se esperaba \">\" despues de la cadena de atributos.", origen: "XML", linea: @3.first_line, columna: @3.first_column+1 });

                                                        prod_1 = grammar_stack.pop();
                                                        grammar_stack.push({'XML_OPEN -> tk_open tk_tag_name ATTRIBUTE_LIST {errors.add(new Error()); ﹩﹩ = null;}':['Token: tk_open\t Lexema: ' + '&lt;', 'Token: tk_tag_name\t Lexema: ' + $2, prod_1]});
                                                        }
        | tk_open                                       { $$ = null;
                                                        errors.push({ tipo: "Sintáctico", error: "", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                                        grammar_stack.push({'XML_OPEN -> tk_open {errors.add(new Error()); ﹩﹩ = null;}':['Token: tk_open\t Lexema: ' + '&lt;']});
                                                        }
        |tk_open   tk_close                              { $$ = null;
                                                         errors.push({ tipo: "Sintáctico", error: "Se esperaba un identificador para la etiqueta", origen: "XML", linea: @1.first_line, columna: @1.first_column+1 });
                                                         grammar_stack.push({'XML_OPEN -> tk_open tk_close {errors.add(new Error()); ﹩﹩ = null;}':['Token: tk_open\t Lexema: ' + '&lt;', 'Token: tk_close\t Lexema: ' + '&gt;']});
                                                         }

        ;

CHILDREN:  XML  CHILDREN                                    {if($1 != null && $2 != null){ $2.push($1); $$ = $2; } else if($2 == null){$$ = []; $$.push($1); }else{$$ = null;}
                                                            prod_1 = grammar_stack.pop();
                                                            prod_2 = grammar_stack.pop();
                                                             grammar_stack.push({'CHILDREN -> XML CHILDREN {﹩2.push(﹩1); ﹩﹩ = ﹩2;}':[prod_2,  prod_1]});
                                                            }
	    |  XML                                              {$$ = []; $$.push($1);
	                                                        prod_1 = grammar_stack.pop();
	                                                        grammar_stack.push({'CHILDREN -> XML {﹩﹩ = [﹩1]}': [prod_1] });
	                                                        }
;



