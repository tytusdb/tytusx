
%lex

%x textTag
%%
\s+                         //Ignorar espacios
">"                             {this.begin('textTag'); return 'greater_than';}
<textTag>"<"                    {this.begin('INITIAL');return 'less_than';}
<textTag>[^<]+                  {return 'textTag';}
<textTag><<EOF>>                {return 'EOF';}


"<"                             {return 'less_than';}

"xml"                           {return 'xml';}"asdasdasd\"asd"
"version"                       {return 'version'}
"encoding"                      {return 'encoding'}


"<"                             {return 'less_than';}
"?"                             {return 'question_mark';}
"="                             {return 'assign';}
"/"                             {return 'slash'}

(["][^"\""]+["])|(['][^']+['])    {return 'value'}
\w+                             {return 'identifier'}

<<EOF>>                         { return 'EOF'; }
.                               { console.log('Error lexico en: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + (yylloc.first_column + 1)); }


/lex

%start START

%%

START
    : XML_STRUCTURE EOF
;

XML_STRUCTURE
    : PROLOG ELEMENTS
;

PROLOG
    : less_than question_mark xml version assign value encoding assign value question_mark greater_than TEXTTAG {console.log('holi');}
    | less_than question_mark xml encoding assign value version assign value question_mark greater_than TEXTTAG {console.log('holi');}
;

ELEMENTS
    : ELEMENTS ELEMENT
    | ELEMENT
;

ELEMENT
    : OPENING_TAG ELEMENTS CLOSING_TAG
    | OPENING_TAG CLOSING_TAG
    | VOID_TAG
;

OPENING_TAG
    : less_than IDENTIFIER greater_than TEXTTAG
    | less_than IDENTIFIER ATTRIBS greater_than TEXTTAG
;

CLOSING_TAG
    : less_than slash IDENTIFIER greater_than TEXTTAG
;

VOID_TAG
    : less_than IDENTIFIER slash greater_than TEXTTAG
    | less_than IDENTIFIER ATTRIBS slash greater_than TEXTTAG
;

ATTRIBS
    : ATTRIBS ATTRIB
    | ATTRIB
;

ATTRIB
    : IDENTIFIER assign value
;

TEXTTAG
    : textTag
    |
;

IDENTIFIER
    : identifier
    | xml
    | version
    | encoding
;
