%{



%}

//_______________________________

%lex
%options case-insensitive
%x Comentario
%x TagApertura
%x TagCierre
%%

//Comentario
"<!--"                  {this.begin("Comentario"); }
<Comentario>[\r\t]+     {}
<Comentario>\n          {}
<Comentario>"-->"       {this.popState(); }
<Comentario>[^"-->"]+   {}

//TagConfiguracion
"<?xml"                                 { this.begin("TagApertura"); return 't_congOp'; }
<TagApertura>[\s\r\t\n]+                {}
<TagApertura>[a-zA-Z_][a-zA-Z0-9_]*     { return 'atName'; }
<TagApertura>"="                        { return 'atAsi' }
<TagApertura>\"[^\"\n]*\"               { return 'atValue'; }
<TagApertura>"?>"                       { this.popState(); return 't_congClose'; }

//TagApertura
"<"[a-zA-Z_][a-zA-Z0-9_]*               { this.begin("TagApertura"); return 'tag_open'; }
<TagApertura>[\s\r\t\n]+                {}
<TagApertura>[a-zA-Z_][a-zA-Z0-9_]*     { return 'atName'; }
<TagApertura>"="                        { return 'atAsi' }
<TagApertura>\"[^\"\n]*\"               { return 'atValue'; }
<TagApertura>">"                        { this.popState(); return 'close_gatap'; }
<TagApertura>"/>"                       { this.popState();  return 'close_tag'; }

//TagCierre
"</"[a-zA-Z_][a-zA-Z0-9_]*        { this.begin("TagCierre"); return 'openTag' }
<TagCierre>">"                    { this.popState(); return 'closingTag' }

[\s\r\t\n]+           {}
[^<]+                 { return 'cadena_letras'; }
<<EOF>>               { return 'EOF'; }
.                     { };
/lex

//_______________________________

%start XML
%%

XML:
        T_CONF TAGS_LIST EOF   {
            $$ = new NodeDescXML('XML', '');
            $$.childList.push($1);
            $$.childList.push($2);
            return $$;
         }
        |TAGS_LIST EOF                    {


            $$ = new NodeDescXML('XML', '');
            $$.childList.push($1);
            return $$;
        }
;

TAGS_LIST:    TAG TAG_LIST {
    $$ = new NodeDescXML('TAGS_LIST', '');
    $$.childList.push($1);
    if($2 === undefined || !$2) {
        $$.setChild(new NodeDescXML("EPSILON", ''));
    } else {
        $$.setChild($2);
    }

}
;

TAG_LIST : TAG TAG_LIST  {
        $$ = new NodeDescXML('TAG_LIST', '');
        $$.childList.push($1);
        if($2 === undefined || !$2) {
        $$.setChild(new NodeDescXML("EPSILON", ''));
    } else {
        $$.setChild($2);
    }
    }
| {

  }
;
TAG:
        TAG_APERTURA TAG_OP {
            $$ = new NodeDescXML('TAG', '');
            $$.childList.push($1);
            $$.childList.push($2);
        }
        |U_TAG                              {
            $$ = new NodeDescXML('TAG', '');
            $$.childList.push($1);
         }


        | error  tag_open                     {

        }

;

TAG_OP:
    TAGS_LIST TAG_CIERRE
    {
            $$ = new NodeDescXML('TAG_OP', '');
            $$.childList.push($1);
            $$.childList.push($2);
    }
    | cadena_letras TAG_CIERRE
        {
            $$ = new NodeDescXML('TAG_OP', '');
            $$.childList.push(new NodeDescXML($1, 'cadena_letras'));
            $$.childList.push($2);
    }
    | TAG_CIERRE
        {
            $$ = new NodeDescXML('TAG_OP', '');
            $$.childList.push($1);
    }

;


TAG_APERTURA:
    tag_open OP_AP {
        $$ = new NodeDescXML('TAG_APERTURA', '');
        $$.childList.push(new NodeDescXML($1, 'TAG_OPEN'));
        $$.childList.push($2);
    }



;

OP_AP: LISTA_ATRIBUTOS close_gatap
    {
        $$ = new NodeDescXML('OP_AP', '');
        $$.childList.push($1);
        $$.childList.push(new NodeDescXML($2, 'close_gatap'));
    }



    | close_gatap {
        $$ = new NodeDescXML('OP_AP', '');
        $$.childList.push(new NodeDescXML($1, 'close_gatap'));
    }
;








TAG_CIERRE:
    openTag closingTag
    {
        $$ = new NodeDescXML('OP_AP', '');
        $$.childList.push(new NodeDescXML($1, 'openTag'));
        $$.childList.push(new NodeDescXML($2, 'CLOSING_TAG'));
    }
;

U_TAG:
    tag_open TAG_SELEC  {
        $$ = new NodeDescXML('U_TAG', '');
        $$.childList.push(new NodeDescXML($1, 'TAG_OPEN'));
        $$.childList.push($2);
    }

;


TAG_SELEC:


    LISTA_ATRIBUTOS close_tag
    {
        $$ = new NodeDescXML('TAG_SELEC', '');
        $$.childList.push($1);
        $$.childList.push(new NodeDescXML($2, 'CLOSE_TAG'));
    }




    |  close_tag
    {
        $$ = new NodeDescXML('TAG_SELEC', '');
        $$.childList.push(new NodeDescXML($1, 'CLOSE_TAG'));

    }



;

T_CONF:
        t_congOp LISTA_ATRIBUTOS t_congClose   {
            $$ = new NodeDescXML('T_CONF', '');
            $$.childList.push(new NodeDescXML($1, 'openTag'));
            $$.childList.push($2);
            $$.childList.push(new NodeDescXML($2, 'CLOSING_TAG'));
        }
;

LISTA_ATRIBUTOS: ATRIBUTO LA  {
    $$ = new NodeDescXML('LISTA_ATRIBUTOS', '');
    $$.childList.push($1);

    if($2 === undefined || !$2) {
        $$.setChild(new NodeDescXML("EPSILON", ''));
    } else {
        $$.setChild($2);
    }

}

;
LA: ATRIBUTO LA {
    $$ = new NodeDescXML('LISTA_ATRIBUTOS', '');
    $$.childList.push($1);
    if($2 === undefined || !$2) {
        $$.setChild(new NodeDescXML("EPSILON", ''));
    } else {
        $$.setChild($2);
    }
 }
|{}

;


ATRIBUTO:
        atName atAsi atValue    {
            $$ = new NodeDescXML('LISTA_ATRIBUTOS', '');
            $$.childList.push(new NodeDescXML($1, 'ATNAME'));
            $$.childList.push(new NodeDescXML($1, 'ATASI'));
            $$.childList.push(new NodeDescXML($1, 'ATVALUE'));
        }



;
