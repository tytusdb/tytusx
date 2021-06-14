
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
    : XML_STRUCTURE EOF     {        
        let auxRetorno = new NodoPadre("START","-> START","",
                [
                    new NodoPadre("XML_STRUCTURE","START -> XML_STRUCTURE EOF","{}",$1[1]),
                    new NodoHijo("EOF","","",)
                ]
            );
        return [$1[0],auxRetorno];
        }
;

XML_STRUCTURE
    : PROLOG NODES              {
        $$ = [$2[0],
            [
                new NodoPadre("PROLOG","XML_STRUCTURE -> PROLOG NODES","{}",$1),
                new NodoPadre("NODES","","",$2[1])
            ]
        ];
        }
    | COMMENT PROLOG NODES      {
        $$ = [$3[0],
            [
                new NodoPadre("PROLOG","XML_STRUCTURE -> PROLOG NODES","{}",$2),
                new NodoPadre("NODES","","",$3[1])
            ]
        ];
        }
;

PROLOG
    : less_than question_mark xml version assign value encoding assign TYPE_ENCODING question_mark greater_than TEXTTAG {
        $$ = [
            new NodoHijo("<","PROLOG -> <?xml version = value encoding = TYPE_ENCODING ?>","{}"),
            new NodoHijo("?","",""),
            new NodoHijo("xml","",""),
            new NodoHijo("version","",""),
            new NodoHijo("=","",""),
            new NodoHijo("value","",""),
            new NodoHijo("encoding","",""),
            new NodoHijo("=","",""),
            new NodoPadre("TYPE_ENCODING","","",$9[1]),
            new NodoHijo("?","",""),
            new NodoHijo(">","",""),
            new NodoPadre("TEXTTAG","","",$12[1]),
        ];
    }
    | less_than question_mark xml encoding assign TYPE_ENCODING version assign value question_mark greater_than TEXTTAG {
        $$ = [
            new NodoHijo("<","PROLOG -> <?xml version = value encoding = TYPE_ENCODING ?>","{}"),
            new NodoHijo("?","",""),
            new NodoHijo("xml","",""),
            new NodoHijo("encoding","",""),
            new NodoHijo("=","",""),
            new NodoPadre("TYPE_ENCODING","","",$6[1]),
            new NodoHijo("version","",""),
            new NodoHijo("=","",""),
            new NodoHijo("value","",""),            
            new NodoHijo("?","",""),
            new NodoHijo(">","",""),
            new NodoPadre("TEXTTAG","","",$12[1]),
        ];
    }
;

NODES
    : NODES NODE        {
        $1[0].push($2[0]); 
        $$ = [$1[0],
            [
                new NodoPadre("NODES","NODES -> NODES NODE","NODES.list = NODES.list",$1[1]),
                new NodoPadre("NODE","","",$2[1])
            ]
        ];        
        }
    | NODE              {
        $$ = [[$1[0]],
            [
                new NodoPadre("NODES","NODES -> NODE","{NODES.syn = NODE.syn}",$1[1])
            ]
        ];        
        }
;

NODE
    : OPENING_TAG NODES CLOSING_TAG         {        
        $$ = [new Nodo($1[0], $1[2], $2[0], Type.DOUBLE_TAG,  $1[0][1], @1.first_line, (@1.first_column + 1)),
            [
                new NodoPadre("OPENING_TAG","NODE -> OPENING_TAG NODES CLOSING_TAG","{}",$1[3]),
                new NodoPadre("NODES","","",$2[1]),
                new NodoPadre("CLOSING_TAG","","",$3[1])
            ]
        ];
        }
    | OPENING_TAG CLOSING_TAG               {        
        $$ = [new Nodo($1[0], $1[2], [], Type.DOUBLE_TAG,  $1[1], @1.first_line, (@1.first_column + 1)),
            [
                new NodoPadre("OPENING_TAG","NODE -> OPENING_TAG CLOSING_TAG","{}",$1[3]),
                new NodoPadre("CLOSING_TAG","","",$2[1])
            ]
        ];
        }
    | EMPTY_TAG                             {
        $$ = [new Nodo($1[0], $1[2], [], Type.EMPTY,       $1[1], @1.first_line, (@1.first_column + 1)),
            [
                new NodoPadre("EMPTY_TAG","NODE -> EMPTY_TAG","",$1[3])
            ]
        ];
        }
    | COMMENT                               {
        $$ = [new Nodo("",    [],    [], Type.COMMENT,     "",    0,             0),[]];
        
        }
;

OPENING_TAG
    : less_than IDENTIFIER greater_than TEXTTAG             {
        $$=[$2[0],$4[0],[],
            [
                new NodoHijo("<","OPENING_TAG -> < IDENTIFIER > TEXTTAG","{OPENING_TAG.list = OPENING_TAG.list;}"),
                new NodoPadre("IDENTIFIER","","",[$2[1]]),                
                new NodoHijo(">","",""),
                new NodoPadre("TEXTTAG","","",$4[1])
            ]
        ];
        
        }
    | less_than IDENTIFIER ATTRIBS greater_than TEXTTAG     {
        $$=[$2[0],$5[0],$3[0],
            [
                new NodoHijo("<","OPENING_TAG -> < IDENTIFIER ATRIBS > TEXTTAG","{OPENING_TAG.list = OPENING_TAG.list;}"),
                new NodoPadre("IDENTIFIER","","",[$2[1]]),
                new NodoPadre("ATRIBS","","",$3[1]),
                new NodoHijo(">","",""),
                new NodoPadre("TEXTTAG","","",$5[1])
            ]
        ];        
        }
;

CLOSING_TAG
    : less_than slash IDENTIFIER greater_than TEXTTAG       {
            $$ = [$3[0],
                [
                    new NodoHijo("<","< / IDENTIFIER > TEXTTAG","{EMPTY_TAG.list = EMPTY_TAG.list}"),
                    new NodoHijo("/","",""),
                    new NodoPadre("IDENTIFIER","","",$3[1]),
                    new NodoHijo(">","",""),
                    new NodoPadre("TEXTTAG","","",$5[1])
                ]
            ];        
        }
;

EMPTY_TAG
    : less_than IDENTIFIER slash greater_than TEXTTAG               {
            $$=[$2[0], $5[0],[],
                [
                    new NodoHijo("<","< IDENTIFIER / > TEXTTAG","{EMPTY_TAG.list = EMPTY_TAG.list}"),
                    new NodoPadre("IDENTIFIER","","",$2[1]),                    
                    new NodoHijo("/","",""),
                    new NodoHijo(">","",""),
                    new NodoPadre("TEXTTAG","","",$5[1])
                ]
            ];
            
            }
    
    | less_than IDENTIFIER ATTRIBS slash greater_than TEXTTAG       {
        $$=[$2[0], $6[0], $3[0],
                [
                    new NodoHijo("<","< IDENTIFIER ATRIBS / > TEXTTAG","{EMPTY_TAG.list = EMPTY_TAG.list}"),
                    new NodoPadre("IDENTIFIER","","",$2[1]),
                    new NodoPadre("ATRIBS","","",$3[1]),
                    new NodoHijo("/","",""),
                    new NodoHijo(">","",""),
                    new NodoPadre("TEXTTAG","","",$6[1])
                ]
            ];
        }
;

ATTRIBS
    : ATTRIBS ATTRIB            {
            $1[0].push($2[0]);
            $$ = [$1[0],
                [
                    new NodoPadre ("ATRIBS","ATRIBS -> ATRIBS ATRIB","ATRIBS.list = ATRIBUTO.list",$1[1]),
                    new NodoPadre ("ATRIB","","",$2[1])
                ]
            ];
            }
    | ATTRIB                    {        
            $$ = [ [ $1[0] ], [ new NodoPadre("ATRIB","ATRIBS -> ATRIB","{ATTRIBS.syn = ATRIB.syn}",[$1]) ] ];
        }
;

ATTRIB
    : IDENTIFIER assign value           {
        $$ = [
            new Atributo($1[0],$3.replaceAll('\"', ""), Type.ATRIBUTO, @1.first_line, (@1.first_column + 1)),
            [
                new NodoPadre("IDENTIFIER","ATRIB -> IDENTIFIER = value","{ATRIB.syn=value.lexval}",$1[1]),
                new NodoHijo("=","",""),
                new NodoHijo("value","","")
            ]
        ];}
;

TEXTTAG
    : TEXT_TAG_CHARS        {
        $$ = [$1[0],
                [
                    new NodoPadre("TEXT_TAG_CHAR","TEXTTAG -> TEXT_TAG_CHARS","{TEXTTAG.syn = TEXT_TAG_CHARS.syn}",$1[1])
                ]
            ];
        }
    
    |                       {
        $$ = ["",[new NodoHijo("TEXTTAG","TEXTTAG ->  ","{}")]];
        }
;

TEXT_TAG_CHARS
    : TEXT_TAG_CHARS TEXT_TAG_CHAR      {        
        $$ = [$1[0] + $2[0],
        [
            new NodoPadre("TEXT_TAG_CHAR","TEXT_TAG_CHARS -> TEXT_TAG_CHARS TEXT_TAG_CHAR","{TEXT_TAG_CHARS.syn = TEXT_TAG_CHARS.syn + TEXT_TAG_CHAR.syn}",[$1[1]]),
            new NodoPadre("ATRIB","","",$1[1])
        ]];
        }
    | TEXT_TAG_CHAR {
        $$ = [$1[0],
            [
                new NodoPadre("TEXT_TAG_CHAR","TEXT_TAG_CHARS -> TEXT_TAG_CHAR","{TEXT_TAG_CHARS.syn = TEXT_TAG_CHAR.syn}",[$1[1]])
            ]
            ];
        }
;

TEXT_TAG_CHAR
    : lt                {$$ = [$1,new NodoHijo($1,"TEXT_TAG_CHAR -> "+$1,"{TEXT_TAG_CHAR.val = "+$1+".lexval}")];}
    | gt                {$$ = [$1,new NodoHijo($1,"TEXT_TAG_CHAR -> "+$1,"{TEXT_TAG_CHAR.val = "+$1+".lexval}")];}
    | amp               {$$ = [$1,new NodoHijo($1,"TEXT_TAG_CHAR -> "+$1,"{TEXT_TAG_CHAR.val = "+$1+".lexval}")];}
    | apos              {$$ = [$1,new NodoHijo($1,"TEXT_TAG_CHAR -> "+$1,"{TEXT_TAG_CHAR.val = "+$1+".lexval}")];}
    | quot              {$$ = [$1,new NodoHijo($1,"TEXT_TAG_CHAR -> "+$1,"{TEXT_TAG_CHAR.val = "+$1+".lexval}")];}
    | textTag           {$$ = [$1,new NodoHijo($1,"TEXT_TAG_CHAR -> "+$1,"{TEXT_TAG_CHAR.val = "+$1+".lexval}")];}
;

IDENTIFIER
    : identifier        {$$ = [$1,[new NodoHijo($1,"IDENTIFIER -> identifier","{IDENTIFIER.val = identifier.lexval}")]];}
    | xml               {$$ = [$1,[new NodoHijo($1,"IDENTIFIER -> xml"       ,"{IDENTIFIER.val = xml.lexval}")]];}
    | version           {$$ = [$1,[new NodoHijo($1,"IDENTIFIER -> version"   ,"{IDENTIFIER.val = version.lexval}")]];}
    | encoding          {$$ = [$1,[new NodoHijo($1,"IDENTIFIER -> encoding"  ,"{IDENTIFIER.val = encoding.lexval}")]];}
;

COMMENT
    : less_than exclamation_mark doble_guion textComment doble_guion greater_than
;

TYPE_ENCODING
    : utf       {$$ = [$1,[new NodoHijo($1,"TYPE_ENCODING -> "+$1,"{TYPE_ENCODING.val = uft.lexval}")]];}
    | iso       {$$ = [$1,[new NodoHijo($1,"TYPE_ENCODING -> "+$1,"{TYPE_ENCODING.val = uft.lexval}")]];}
    | ascii     {$$ = [$1,[new NodoHijo($1,"TYPE_ENCODING -> "+$1,"{TYPE_ENCODING.val = uft.lexval}")]];}
;