 /*---------------------------IMPORTS-------------------------------*/
%{
    let valDeclaration = '';
    let valTag = '';
    let valInside = '';

    const {Error_} = require('../Error');
    const {errores} = require('../Errores');
    const {NodoXML} = require('../Nodes/NodoXml');
%}

/*----------------------------LEXICO-------------------------------*/
%lex
%options case-sensitive
%empty epsilon
%x xmloptions
%x tagval1
%x tagval2
%x valin
%x comment

%%

"<!--"							%{ this.begin("comment"); %}
<comment>"-->"		  	        %{ this.popState(); %}
<comment>.				        %{ %}
<comment>[ \t\r\n\f]	        %{ %}

"<?xml"                        %{ this.begin("xmloptions");%}
<xmloptions>"?>"               %{ 
                                    this.popState();
                                    yytext = valDeclaration;
                                    valDeclaration = '';
                                    return 'tk_xmldec';
                               %}
<xmloptions>[^(\?>)]           %{ valDeclaration += yytext %}
<xmloptions><<EOF>>            %{ this.popState(); return 'EOF'; %}

["]                             %{ this.begin("tagval1"); %}   
<tagval1>["]                    %{ 
                                    this.popState();  
                                    yytext=valTag; valTag=""; 
                                    return 'tk_tagval';
                                %} 
<tagval1>"&lt;"                 %{ valTag +='<'; %}
<tagval1>"&gt;"                 %{ valTag +='>'; %}
<tagval1>"&amp;"                %{ valTag +='&'; %}
<tagval1>"&apos;"               %{ valTag +='\''; %}
<tagval1>"&quot;"               %{ valTag +='\"'; %}
<tagval1>.                      %{ valTag += yytext; %}

[']                             %{ this.begin("tagval2"); %}   
<tagval2>[']                    %{ 
                                    this.popState(); 
                                    yytext=valTag; valTag=""; 
                                    return 'tk_tagval';
                                %} 
<tagval2>"&lt;"                 %{ valTag +='<'; %}
<tagval2>"&gt;"                 %{ valTag +='>'; %}
<tagval2>"&amp;"                %{ valTag +='&'; %}
<tagval2>"&apos;"               %{ valTag +='\''; %}
<tagval2>"&quot;"               %{ valTag +='\"'; %}
<tagval2>.                      %{ valTag += yytext; %}

">"                             %{ this.begin("valin"); return 'tk_endtag';%}
<valin>"</"                      %{ 
                                    this.popState();
                                    return 'tk_closetag';
                                %}
<valin>"<!--"					%{ this.begin("comment"); %}

<valin>"<"                      %{ 
                                    this.popState();
                                    return 'tk_starttag';
                                %}
<valin>[^<]+                    %{ if(yytext.trim() != '') return 'tk_valin'; %}
<valin><<EOF>>                  %{ this.popState(); return 'EOF'; %}

"</"                            %{ return 'tk_closetag'; %}   

">"                             %{ return 'tk_endtag'; %}
"<"                             %{ return 'tk_starttag'; %}
"/"                             %{ return 'tk_slash'; %}           
"="                             %{ return 'tk_igual'; %}                                



[[a-zA-ZñÑáéíóúÁÉÍÓÚ][\_\-0-9a-zA-ZñÑáéíóúÁÉÍÓÚ]*|[\_\-]+[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ][\_\-0-9a-zA-ZñÑáéíóúÁÉÍÓÚ]*]  %{  return 'tk_id'; %}


[ \t\n\r\f] 		%{ /*se ignoran*/ %}
<<EOF>>             %{  return 'EOF';  %}

.                   %{ errores.push(new Error_(yylloc.first_line, yylloc.first_column, 'Lexico','Valor inesperado ' + yytext)); %}


/lex
/*-------------------------SINTACTICO------------------------------*/
/*-----ASOCIACION Y PRECEDENCIA-----*/
/*----------ESTADO INICIAL----------*/
%start S
%% 
%locations
/*-------------GRAMATICA------------*/
S: tk_xmldec I EOF  { 
                        var s = new NodoXML("S","S",@2.first_line+1,@2.first_column+1);
                        var dec = new NodoXML($1,"DEC",@1.first_line+1,@1.first_column+1);
                        s.addHijo(dec);
                        s.addHijo($2);
                        return s;
                    }
|I EOF  { 
            var s = new NodoXML("S","S",@1.first_line+1,+@1.first_column+1); 
            s.addHijo($1);
            return s;
        }
| EOF   {
            return new NodoXML("S","S",@1.first_line+1,+@1.first_column+1); 
        }
;

I: OTAG LELEMENT CTAG   {
                            var i = new NodoXML("I","I",@1.first_line+1,+@1.first_column+1); 
                            i.addHijo($1);
                            if($2 != null) i.addHijo($2);
                            i.addHijo($3);
                            $$ = i;
                        }
| error tk_endtag   { 
                        errores.push(new Error_(@1.first_line+1,+@1.first_column+1, 'Sintactico','Valor esperado ' + yytext)); 
                    }
;


LELEMENT: OTAG LELEMENT CTAG LELEMENT   {
                                            var content = new NodoXML('CONTENT','CONTENT',@1.first_line+1,+@1.first_column+1);
                                            if($4 != null) content.addHijo($4);
                                            content.addHijo($1);
                                            if($2 != null) content.addHijo($2);
                                            content.addHijo($3);
                                            $$ = content;
                                        }
        | tk_valin LELEMENT {
                                if($2 === null){
                                    var val = new NodoXML($1,'VAL',@1.first_line+1,+@1.first_column+1);
                                    $$ = val;
                                } else {
                                    var content = new NodoXML('CONTENT','CONTENT',@1.first_line+1,+@1.first_column+1);
                                    var val = new NodoXML($1,'VAL',@1.first_line+1,+@1.first_column+1);
                                    content.addHijo($2);
                                    content.addHijo(val);
                                    $$ = content;
                                }
                            }
        | { $$ = null; }
        | error tk_endtag   { 
                                errores.push(new Error_(@1.first_line+1,+@1.first_column+1, 'Sintactico','Valor esperado ' + yytext)); 
                            }
        ;

OTAG: tk_starttag tk_id tk_endtag   {
                                        $$ = new NodoXML($2,'OTAG',@1.first_line+1,+@1.first_column+1);
                                    }
|tk_starttag tk_id ARGUMENTOS tk_endtag {
                                            var tag = new NodoXML($2,'OTAG',@1.first_line+1,+@1.first_column+1);
                                            tag.addHijo($3);
                                            $$ = tag;
                                        }
;

ARGUMENTOS: tk_id tk_igual tk_tagval ARGUMENTOSP {
                                                  var args = new NodoXML('ARGS','ARGS',@1.first_line+1,+@1.first_column+1);
                                                  var arg = new NodoXML($1,'ARG',@1.first_line+1,+@1.first_column+1);
                                                  var val = new NodoXML($3,'VAL',@3.first_line+1,+@3.first_column+1);
                                                  arg.addHijo(val);
                                                  args.addHijo(arg);
                                                  if($4 != null) args.addHijo($4);
                                                  $$ = args;
                                                 }
          ;

ARGUMENTOSP: tk_id tk_igual tk_tagval ARGUMENTOSP {
                                                    var args = new NodoXML('ARGS','ARGS',@1.first_line+1,+@1.first_column+1);
                                                    var arg = new NodoXML($1,'ARG',@1.first_line+1,+@1.first_column+1);
                                                    var val = new NodoXML($3,'VAL',@3.first_line+1,+@3.first_column+1);
                                                    arg.addHijo(val);
                                                    args.addHijo(arg);
                                                    if($4 != null) args.addHijo($4);
                                                    $$ = args;
                                                  }
          | { $$ = null}
          ;

CTAG: tk_closetag tk_id tk_endtag   {
                                        $$ = new NodoXML($2,'CTAG',@1.first_line+1,+@1.first_column+1);
                                    }
;