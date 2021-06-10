
%lex

%x textTag
%x comment

%%
\s+                             //Ignorar espacios
">"                             {this.begin('textTag'); return 'greater_than';}
<textTag>"<"                    {this.begin('INITIAL'); return 'less_than';}
<textTag>\s+                    //ignorar
<textTag>"&lt;"                 {return "lt";}
<textTag>"&gt;"                 {return "gt";}
<textTag>"&amp;"                {return "amp";}
<textTag>"&apos;"               {return "apos";}
<textTag>"&quot;"               {return "quot";}
<textTag>[^<&]+                 {return 'textTag';}
<textTag><<EOF>>                {return 'EOF';}

"!"                             {this.begin('comment'); return 'exclamation_mark';}
<comment>">"                    {this.begin('INITIAL'); return 'greater_than';}
<comment>\s+                    /*Ignorar*/
<comment>"--"                   {return 'doble_guion';}
<comment>[^-]+                  {return 'textComment';}

"<"                             {return 'less_than';}

"xml"                           {return 'xml';}
"version"                       {return 'version';}
"encoding"                      {return 'encoding';}
"\"UTF-8\""                         {return 'utf';}
"\"ASCII\""                         {return 'ascii';}
"\"ISO-8859-1\""                    {return 'iso'}


"<"                             {return 'less_than';}
"?"                             {return 'question_mark';}
"="                             {return 'assign';}
"/"                             {return 'slash';}

(["][^"\""]+["])|(['][^']+['])  {return 'value';}
\w+                             {return 'identifier';}

<<EOF>>                         { return 'EOF'; }
.                               { console.log('Error lexico en: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + (yylloc.first_column + 1)); }


/lex

%start START

%%

START
    : XML_STRUCTURE EOF     {return $1;}
;

XML_STRUCTURE
    : PROLOG NODES              {$$ = $2;}
    | COMMENT PROLOG NODES      {$$ = $3;}
;

PROLOG
    : less_than question_mark xml version assign value encoding assign TYPE_ENCODING question_mark greater_than TEXTTAG
    | less_than question_mark xml encoding assign TYPE_ENCODING version assign value question_mark greater_than TEXTTAG
;

NODES
    : NODES NODE        {$1.push($2); $$ = $1;}
    | NODE              {$$ = [$1];}
;

NODE
    : OPENING_TAG NODES CLOSING_TAG         {$$ = new Nodo($1[0], $1[2], $2, Type.DOUBLE_TAG,  $1[1], @1.first_line, (@1.first_column + 1));}
    | OPENING_TAG CLOSING_TAG               {$$ = new Nodo($1[0], $1[2], [], Type.DOUBLE_TAG,  $1[1], @1.first_line, (@1.first_column + 1));}
    | EMPTY_TAG                             {$$ = new Nodo($1[0], $1[2], [], Type.EMPTY,       $1[1], @1.first_line, (@1.first_column + 1));}
    | COMMENT                               {$$ = new Nodo("",    [],    [], Type.COMMENT,     "",    0,             0);}
;

OPENING_TAG
    : less_than IDENTIFIER greater_than TEXTTAG             {$$=[$2,$4,[]];}
    | less_than IDENTIFIER ATTRIBS greater_than TEXTTAG     {$$=[$2,$5,$3];}
;

CLOSING_TAG
    : less_than slash IDENTIFIER greater_than TEXTTAG       {$$ = $3;}
;

EMPTY_TAG
    : less_than IDENTIFIER slash greater_than TEXTTAG               {$$=[$2, $5, []];}
    | less_than IDENTIFIER ATTRIBS slash greater_than TEXTTAG       {$$=[$2, $6, $3];}
;

ATTRIBS
    : ATTRIBS ATTRIB            {$1.push($2); $$ = $1;}
    | ATTRIB                    {$$ = [$1];}
;

ATTRIB
    : IDENTIFIER assign value           {$$ = new Atributo($1,$3.replaceAll('\"', ""), Type.ATRIBUTO, @1.first_line, (@1.first_column + 1));}
;

TEXTTAG
    : TEXT_TAG_CHARS        {$$ = $1;}
    |                       {$$ = "-";}
;

TEXT_TAG_CHARS
    : TEXT_TAG_CHARS TEXT_TAG_CHAR      {$$ = $1 + $2;}
    | TEXT_TAG_CHAR {$$ = $1;}
;

TEXT_TAG_CHAR
    : lt           {$$ = "<";}
    | gt           {$$ = ">";}
    | amp          {$$ = "&";}
    | apos         {$$ = "'";}
    | quot         {$$ = "\"";}
    | textTag      {$$ = $1;}
;

IDENTIFIER
    : identifier        {$$ = $1;}
    | xml               {$$ = $1;}
    | version           {$$ = $1;}
    | encoding          {$$ = $1;}
;

COMMENT
    : less_than exclamation_mark doble_guion textComment doble_guion greater_than
;

TYPE_ENCODING
    : utf       {$$ = $1;}
    | iso       {$$ = $1;}
    | ascii     {$$ = $1;}
;