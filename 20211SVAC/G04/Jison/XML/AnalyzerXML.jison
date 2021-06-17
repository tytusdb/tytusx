
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
%{
    let idNodos = 0;
    function getId(){        
        return idNodos++;
    }
%}
%start START

%%

START
    : XML_STRUCTURE EOF     {
        let auxRetorno = new NodoPadre(getId(),"START","-> START","",
                [
                    new NodoPadre(getId(),"XML_STRUCTURE","START -> XML_STRUCTURE EOF","return XML_STRUCTURE.info",$1.hijos),
                    new NodoHijo(getId(),"EOF","","")
                ]
            );            
        return {nodos:$1.nodos,raizCST:auxRetorno};
        }
;

XML_STRUCTURE
    : PROLOG NODES              {
        $$ = {nodos:$2.nodos
        ,hijos:[
                new NodoPadre(getId(),"PROLOG","XML_STRUCTURE -> PROLOG NODES","XML_STRUCTURE.info = [PROLOG.valor,NODES.listado]",$1.hijos),
                new NodoPadre(getId(),"NODES","","",$2.hijos)
            ]
        };
        }
    | COMMENT PROLOG NODES      {
        $$ = {nodos:$3.nodos
        ,hijos:[
                new NodoPadre(getId(),"PROLOG","XML_STRUCTURE -> PROLOG NODES","XML_STRUCTURE.info = [PROLOG.valor,NODES.listado]",$2.hijos),
                new NodoPadre(getId(),"NODES","","",$3.hijos)
            ]
        };
        }
;

PROLOG
    : less_than question_mark xml version assign value encoding assign TYPE_ENCODING question_mark greater_than TEXTTAG {
        $$ = {hijos:[
            new NodoHijo(getId(),"<","PROLOG -> &lt;?xml version = value encoding = TYPE_ENCODING ?&gt;","PROLOG.encoding = TYPE_ENCODING.valor"),
            new NodoHijo(getId(),"?","",""),
            new NodoHijo(getId(),"xml","",""),
            new NodoHijo(getId(),"version","",""),
            new NodoHijo(getId(),"=","",""),
            new NodoHijo(getId(),"value","",""),
            new NodoHijo(getId(),"encoding","",""),
            new NodoHijo(getId(),"=","",""),
            new NodoPadre(getId(),"TYPE_ENCODING","","",$9.hijos),
            new NodoHijo(getId(),"?","",""),
            new NodoHijo(getId(),">","",""),
            new NodoPadre(getId(),"TEXTTAG","","",$12.hijos),
        ]};
    }
    | less_than question_mark xml encoding assign TYPE_ENCODING version assign value question_mark greater_than TEXTTAG {
        $$ = {hijos:[
            new NodoHijo(getId(),"<","PROLOG -> &lt;?xml version = value encoding = TYPE_ENCODING ?&gt;","PROLOG.encoding = TYPE_ENCODING.valor"),
            new NodoHijo(getId(),"?","",""),
            new NodoHijo(getId(),"xml","",""),
            new NodoHijo(getId(),"encoding","",""),
            new NodoHijo(getId(),"=","",""),
            new NodoPadre(getId(),"TYPE_ENCODING","","",$6.hijos),
            new NodoHijo(getId(),"version","",""),
            new NodoHijo(getId(),"=","",""),
            new NodoHijo(getId(),"value","",""),
            new NodoHijo(getId(),"?","",""),
            new NodoHijo(getId(),">","",""),
            new NodoPadre(getId(),"TEXTTAG","","",$12.hijos),
        ]};
    }
;

NODES
    : NODES NODE        {
        $1.nodos.push($2.nodo);
        $$ = {nodos:$1.nodos
        ,hijos:[
                new NodoPadre(getId(),"NODES","NODES -> NODES NODE","NODES1.agregar(NODE.valor)<br>NODES.listado = NODES1.listado",$1.hijos),
                new NodoPadre(getId(),"NODE","","",$2.hijos)
            ]
        };
        }
    | NODE              {
        $$ = {nodos:[$1.nodo]
            ,hijos:[
                new NodoPadre(getId(),"NODES","NODES -> NODE","NODES.valor = nuevoListado[NODE.valor]",$1.hijos)
            ]
        };
        }
;

NODE
    : OPENING_TAG NODES CLOSING_TAG         {        
        $$ = {nodo:new Nodo($1.identificador, $1.atributos, $2.nodos, Type.DOUBLE_TAG,  $1.textoEtiqueta, @1.first_line, (@1.first_column + 1))
        ,hijos:[
                new NodoPadre(getId(),"OPENING_TAG","NODE -> OPENING_TAG NODES CLOSING_TAG","NODE.valor = nuevoNodo(NODES.listado)",$1.hijos),
                new NodoPadre(getId(),"NODES","","",$2.hijos),
                new NodoPadre(getId(),"CLOSING_TAG","","",$3.hijos)
            ]
        };
        }
    | OPENING_TAG CLOSING_TAG               {
        $$ = {nodo:new Nodo($1.identificador, $1.atributos, [], Type.DOUBLE_TAG,  $1.textoEtiqueta, @1.first_line, (@1.first_column + 1))
        ,hijos:[
                new NodoPadre(getId(),"OPENING_TAG","NODE -> OPENING_TAG CLOSING_TAG","NODE.valor = nuevoNodo()",$1.hijos),
                new NodoPadre(getId(),"CLOSING_TAG","","",$2.hijos)
            ]
        };
        }
    | EMPTY_TAG                             {
        $$ = {nodo:new Nodo($1.identificador, $1.atributos, [], Type.EMPTY,       $1.textoEtiqueta, @1.first_line, (@1.first_column + 1))
        ,hijos:[
                new NodoPadre(getId(),"EMPTY_TAG","NODE -> EMPTY_TAG","NODE.valor = nuevoNodo()",$1.hijos)
            ]
        };
        }
    | COMMENT                               {
        $$ = {nodo:new Nodo("",    [],    [], Type.COMMENT,     "",    0,             0),
            hijos:[]
        };

        }
;

OPENING_TAG
    : less_than IDENTIFIER greater_than TEXTTAG             {        
        $$={identificador:$2.contenido
            ,textoEtiqueta:$4.contenido
            ,atributos:[]
            ,hijos:[
                new NodoHijo(getId(),"<","OPENING_TAG -> < IDENTIFIER > TEXTTAG","OPENING_TAG.info = [IDENTIFIER.valor, TEXTAG.valor, ATTRIBS.listado]"),
                new NodoPadre(getId(),"IDENTIFIER","","",$2.hijos),
                new NodoHijo(getId(),">","",""),
                new NodoPadre(getId(),"TEXTTAG","","",$4.hijos)
            ]
        };

        }
    | less_than IDENTIFIER ATTRIBS greater_than TEXTTAG     {        
        $$={identificador:$2.contenido
            ,textoEtiqueta:$5.contenido
            ,atributos:$3.atributos
            ,hijos:[
                new NodoHijo(getId(),"<","OPENING_TAG -> < IDENTIFIER ATRIBS > TEXTTAG","OPENING_TAG.info = [IDENTIFIER.valor, TEXTAG.valor, ATTRIBS.listado]"),
                new NodoPadre(getId(),"IDENTIFIER","","",$2.hijos),
                new NodoPadre(getId(),"ATRIBS","","",$3.hijos),
                new NodoHijo(getId(),">","",""),
                new NodoPadre(getId(),"TEXTTAG","","",$5.hijos)
            ]
        };
        }
;

CLOSING_TAG
    : less_than slash IDENTIFIER greater_than TEXTTAG       {
        $$ = {identificador:$3.contenido
                ,hijos:[
                    new NodoHijo(getId(),"<","CLOSING_TAG -> < / IDENTIFIER > TEXTTAG","CLOSING_TAG.valor = IDENTIFIER.valor"),
                    new NodoHijo(getId(),"/","",""),
                    new NodoPadre(getId(),"IDENTIFIER","","",$3.hijos),
                    new NodoHijo(getId(),">","",""),
                    new NodoPadre(getId(),"TEXTTAG","","",$5.hijos)
            ]
            };
        }
;

EMPTY_TAG
    : less_than IDENTIFIER slash greater_than TEXTTAG               {
            $$={identificador:$2.contenido
                ,textoEtiqueta: $5.contenido
                ,atributos:[]
                ,hijos:[
                    new NodoHijo(getId(),"<","EMPTY_TAG -> < IDENTIFIER / > ","EMPTY_TAG.info = [IDENTIFIER.valor, TEXTAG.valor, ATTRIBS.listado]"),
                    new NodoPadre(getId(),"IDENTIFIER","","",$2.hijos),
                    new NodoHijo(getId(),"/","",""),
                    new NodoHijo(getId(),">","",""),
                    new NodoPadre(getId(),"TEXTTAG","","",$5.hijos)
                ]
            };

            }

    | less_than IDENTIFIER ATTRIBS slash greater_than TEXTTAG       {
        $$={identificador:$2.contenido
            ,textoEtiqueta: $6.contenido
            ,atributos: $3.atributos
            ,hijos:[
                    new NodoHijo(getId(),"<","EMPTY_TAG -> < IDENTIFIER ATRIBS / > TEXTTAG","EMPTY_TAG.info = [IDENTIFIER.valor, TEXTAG.valor, ATTRIBS.listado]"),
                    new NodoPadre(getId(),"IDENTIFIER","","",$2.hijos),
                    new NodoPadre(getId(),"ATRIBS","","",$3.hijos),
                    new NodoHijo(getId(),"/","",""),
                    new NodoHijo(getId(),">","",""),
                    new NodoPadre(getId(),"TEXTTAG","","",$6.hijos)
                ]
        };
        }
;

ATTRIBS
    : ATTRIBS ATTRIB            {
            $1.atributos.push($2.atributo);            
            $$ = {atributos:$1.atributos
                ,hijos:[
                    new NodoPadre(getId(),"ATRIBS","ATRIBS -> ATRIBS ATRIB","ATRIB1.agregar(ATRIB.valor)<br>ATRIBS.listado = ATRIB1.listado",$1.hijos),
                    new NodoPadre(getId(),"ATRIB","","",$2.hijos)
                ]
            };
            }
    | ATTRIB                    {
            $$ = {atributos:[ $1.atributo ], hijos:[ new NodoPadre(getId(),"ATRIB","ATRIBS -> ATRIB","ATRIBS.valor = nuevoListado[ATRIB.valor]",$1.hijos) ] };
        }
;

ATTRIB
    : IDENTIFIER assign value           {
        $$ = {atributo:
            new Atributo($1.contenido,$3.replaceAll('\"', ""), Type.ATRIBUTO, @1.first_line, (@1.first_column + 1))
            ,hijos:[
                new NodoPadre(getId(),"IDENTIFIER","ATRIB -> IDENTIFIER = value","ATRIB.valor=value.lexicoValor",$1.hijos),
                new NodoHijo(getId(),"=","",""),
                new NodoHijo(getId(),"value","","")
            ]
        }
        ;}
;

TEXTTAG
    : TEXT_TAG_CHARS        {
        $$ = {contenido: $1.contenido,
                hijos:[
                    new NodoPadre(getId(),"TEXT_TAG_CHAR","TEXTTAG -> TEXT_TAG_CHARS","TEXTTAG.valor = TEXT_TAG_CHARS.valor",$1.hijos)
                ]
            };
        }
    |                       {
        $$ = {contenido:"",hijos:[new NodoHijo(getId(),"lambda","TEXTTAG -> lambda ","")]};
        }
;

TEXT_TAG_CHARS
    : TEXT_TAG_CHARS TEXT_TAG_CHAR      {
        $$ = {contenido: $1.contenido + $2.contenido,
        hijos:[
            new NodoPadre(getId(),"TEXT_TAG_CHAR","TEXT_TAG_CHARS -> TEXT_TAG_CHARS TEXT_TAG_CHAR","TEXT_TAG_CHARS.valor = TEXT_TAG_CHARS.valor + TEXT_TAG_CHAR.valor",[$1.hijos]),
            new NodoPadre(getId(),"TEXT_TAG_CHARS","","",$1.hijos)
        ]};
        }
    | TEXT_TAG_CHAR {
        $$ = {contenido:$1.contenido,
            hijos:[
                new NodoPadre(getId(),"TEXT_TAG_CHAR","TEXT_TAG_CHARS -> TEXT_TAG_CHAR","TEXT_TAG_CHARS.valor = TEXT_TAG_CHAR.valor",[$1.hijos])
            ]
        };
        }
;

TEXT_TAG_CHAR
    : lt                {$$ = {contenido:"<"            ,hijos:new NodoHijo(getId(),$1,"TEXT_TAG_CHAR -> "+$1,"TEXT_TAG_CHAR.valor = "+$1+".lexicoValor")};}
    | gt                {$$ = {contenido:">"            ,hijos:new NodoHijo(getId(),$1,"TEXT_TAG_CHAR -> "+$1,"TEXT_TAG_CHAR.valor = "+$1+".lexicoValor")};}
    | amp               {$$ = {contenido:"&"            ,hijos:new NodoHijo(getId(),$1,"TEXT_TAG_CHAR -> "+$1,"TEXT_TAG_CHAR.valor = "+$1+".lexicoValor")};}
    | apos              {$$ = {contenido:"'"            ,hijos:new NodoHijo(getId(),$1,"TEXT_TAG_CHAR -> "+$1,"TEXT_TAG_CHAR.valor = "+$1+".lexicoValor")};}
    | quot              {$$ = {contenido:"\""           ,hijos:new NodoHijo(getId(),$1,"TEXT_TAG_CHAR -> "+$1,"TEXT_TAG_CHAR.valor = "+$1+".lexicoValor")};}
    | textTag           {$$ = {contenido:$1.trim()      ,hijos:new NodoHijo(getId(),$1,"TEXT_TAG_CHAR -> "+$1,"TEXT_TAG_CHAR.valor = "+$1+".lexicoValor")};}
;

IDENTIFIER
    : identifier        {$$ = {contenido:$1             ,hijos:[new NodoHijo(getId(),$1,"IDENTIFIER -> identifier","IDENTIFIER.valor = identifier.lexicoValor")]};}
    | xml               {$$ = {contenido:$1             ,hijos:[new NodoHijo(getId(),$1,"IDENTIFIER -> xml"       ,"IDENTIFIER.valor = xml.lexicoValor")]};}
    | version           {$$ = {contenido:$1             ,hijos:[new NodoHijo(getId(),$1,"IDENTIFIER -> version"   ,"IDENTIFIER.valor = version.lexicoValor")]};}
    | encoding          {$$ = {contenido:$1             ,hijos:[new NodoHijo(getId(),$1,"IDENTIFIER -> encoding"  ,"IDENTIFIER.valor = encoding.lexicoValor")]};}
;

COMMENT
    : less_than exclamation_mark doble_guion textComment doble_guion greater_than
;

TYPE_ENCODING
    : utf               {$$ = {contenido:$1             ,hijos:[new NodoHijo(getId(),$1,"TYPE_ENCODING -> "+$1,"TYPE_ENCODING.valor = uft.lexicoValor")]};}
    | iso               {$$ = {contenido:$1             ,hijos:[new NodoHijo(getId(),$1,"TYPE_ENCODING -> "+$1,"TYPE_ENCODING.valor = iso.lexicoValor")]};}
    | ascii             {$$ = {contenido:$1             ,hijos:[new NodoHijo(getId(),$1,"TYPE_ENCODING -> "+$1,"TYPE_ENCODING.valor = ascii.lexicoValor")]};}
;