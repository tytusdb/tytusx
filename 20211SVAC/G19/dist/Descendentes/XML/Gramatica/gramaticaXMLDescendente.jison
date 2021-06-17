%{

    const listaGramatical = [];

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
"<"[a-zA-Z_][a-zA-Z0-9_]*               { this.begin("TagApertura"); return 'OPEN_TAG'; }
<TagApertura>[\s\r\t\n]+                {}
<TagApertura>[a-zA-Z_][a-zA-Z0-9_]*     { return 'atName'; }
<TagApertura>"="                        { return 'atAsi' }
<TagApertura>\"[^\"\n]*\"               { return 'atValue'; }
<TagApertura>">"                        { this.popState(); return 'CIERRA_TAGAP'; }
<TagApertura>"/>"                       { this.popState();  return 'close_tag_u'; }

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
    $$.childList.push($2);


}
;

TAG_LIST : TAG TAG_LIST  {
        $$ = new NodeDescXML('TAG_LIST', '');
        $$.childList.push($1);
        $$.childList.push($2);
    }
| {

  }
;
TAG:
        TAG_APERTURA TAG_OP {
            $$ = new NodeDescXML('TAG', '');
            $$.childList.push($1);
            $$.childList.push(new NodeDescXML($2, 'TAG_OP'));
        }
        |U_TAG                              {
            $$ = new NodeDescXML('TAG', '');
            $$.childList.push($1);
         }


        | error  OPEN_TAG                     {

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
    openTagAp TAG_AP_MEN {
        $$ = new NodeDescXML('TAG_APERTURA', '');
        $$.childList.push(new NodeDescXML($1, 'openTagAp'));
        $$.childList.push($2);
    }



;

TAG_AP_MEN: LISTA_ATRIBUTOS cierra_tagap
    {
        $$ = new NodeDescXML('TAG_AP_MEN', '');
        $$.childList.push(new NodeDescXML($1, 'cierra_tagap'));
        $$.childList.push($2);
    }



    | cierra_tagap {
        $$ = new NodeDescXML('TAG_AP_MEN', '');
        $$.childList.push(new NodeDescXML($1, 'cierra_tagap'));
    }
;








TAG_CIERRE:
    openTag closingTag
    {
        $$ = new NodeDescXML('TAG_AP_MEN', '');
        $$.childList.push(new NodeDescXML($1, 'openTag'));
        $$.childList.push(new NodeDescXML($2, 'CLOSING_TAG'));
    }
;

U_TAG:
    openTagOp TAG_SELEC  {
        $$ = new NodeDescXML('U_TAG', '');
        $$.childList.push(new NodeDescXML($1, 'openTagOp'));
        $$.childList.push($2);
    }

;


TAG_SELEC:


    LISTA_ATRIBUTOS close_tag_u
    {
        $$ = new NodeDescXML('TAG_SELEC', '');
        $$.childList.push($1);
        $$.childList.push(new NodeDescXML($2, 'close_tag_u'));
    }




    |  close_tag_u
    {
        $$ = new NodeDescXML('TAG_SELEC', '');
        $$.childList.push(new NodeDescXML($1, 'close_tag_u'));

    }



;

T_CONF:
        t_congOp LISTA_ATRIBUTOS t_congClose   {
            $$ = new NodeDescXML('T_CONF', '');
            $$.childList.push(new NodeDescXML($1, 't_congOp'));
            $$.childList.push($2);
            $$.childList.push(new NodeDescXML($2, 't_congClose'));
        }
;

LISTA_ATRIBUTOS: ATRIBUTO LA  {
        $$ = new NodeDescXML('LISTA_ATRIBUTOS', '');
        $$.childList.push($1);

        if($2 === undefined || !$2) {
            $$.setChild(new NodeDescXML('LA', ''));
        } else {
            $$.setChild($2);
            $$.setChild(new NodeDescXML("EPSILON", ''));
        }
}

;
LA: ATRIBUTO LA {
    $$ = new NodeDescXML('LA', '');
    $$.childList.push($1);
    if($2 === undefined || !$2) {
        $$.setChild(new NodeDescXML('LA', ''));
    } else {
        $$.setChild($2);
        $$.setChild(new NodeDescXML("EPSILON", ''));
    }
}
|{}

;


ATRIBUTO:
        atName atAsi atValue    {
        $$ = new NodeDescXML('ATRIBUTO', '');
        $$.childList.push(new NodeDescXML($1, 'atName'));
        $$.childList.push(new NodeDescXML($2, 'atAsi'));
        $$.childList.push(new NodeDescXML($3, 'atValue'));
        }



;
