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
"<?xml"                                 { this.begin("TagApertura"); return 'AbreTagConf'; }
<TagApertura>[\s\r\t\n]+                {}
<TagApertura>[a-zA-Z_][a-zA-Z0-9_]*     { return 'NombreAtributo'; }
<TagApertura>"="                        { return 'IgualAtributo' }
<TagApertura>\"[^\"\n]*\"               { return 'ValorAtributo'; }
<TagApertura>"?>"                       { this.popState(); return 'CierreTagConf'; }

//TagApertura
"<"[a-zA-Z_][a-zA-Z0-9_]*               { this.begin("TagApertura"); return 'AbreTagApertura'; }
<TagApertura>[\s\r\t\n]+                {}
<TagApertura>[a-zA-Z_][a-zA-Z0-9_]*     { return 'NombreAtributo'; }
<TagApertura>"="                        { return 'IgualAtributo' }
<TagApertura>\"[^\"\n]*\"               { return 'ValorAtributo'; }
<TagApertura>">"                        { this.popState(); return 'CIERRA_TAGAP'; }
<TagApertura>"/>"                       { this.popState();  return 'TAG_CIERRE_U'; }

//TagCierre
"</"[a-zA-Z_][a-zA-Z0-9_]*        { this.begin("TagCierre"); return 'AbreTagCierre' }
<TagCierre>">"                    { this.popState(); return 'CierreTagCierre' }

[\s\r\t\n]+           {}
[^<]+                 { return 'CadenaValores'; }
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
        TAG_APERTURA MenuEtiqueta {
$$ = new NodeDescXML('TAG', '');
            $$.childList.push($1);
            $$.childList.push(new NodeDescXML($2, 'TAG_OP'));
        }
        |U_TAG                              {
$$ = new NodeDescXML('TAG', '');
            $$.childList.push($1);
         }


        | error  AbreTagApertura                     { }

;

MenuEtiqueta:
    TAGS_LIST TAG_CIERRE
    {
            $$ = new NodeDescXML('TAG_OP', '');
            $$.childList.push($1);
            $$.childList.push($2);
    }
    | CadenaValores TAG_CIERRE
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
    AbreTagApertura MENU_TAG_APERTURA {
            $$ = new NodeDescXML('TAG_APERTURA', '');
        $$.childList.push(new NodeDescXML($1, 'TAG_OPEN'));
        $$.childList.push($2);
    }



;

MENU_TAG_APERTURA: LISTA_ATRIBUTOS CIERRA_TAGAP
    {
            $$ = new NodeDescXML('OP_AP', '');
        $$.childList.push($1);
        $$.childList.push(new NodeDescXML($2, 'close_gatap'));
    }



    | CIERRA_TAGAP {
$$ = new NodeDescXML('OP_AP', '');
        $$.childList.push(new NodeDescXML($1, 'close_gatap'));
    }
;








TAG_CIERRE:
    AbreTagCierre CierreTagCierre
    {
            $$ = new NodeDescXML('OP_AP', '');
        $$.childList.push(new NodeDescXML($1, 'openTag'));
        $$.childList.push(new NodeDescXML($2, 'CLOSING_TAG'));
    }
;

U_TAG:
    AbreTagApertura TAG_SELEC  {
$$ = new NodeDescXML('U_TAG', '');
        $$.childList.push(new NodeDescXML($1, 'TAG_OPEN'));
        $$.childList.push($2);
    }

;


TAG_SELEC:


    LISTA_ATRIBUTOS TAG_CIERRE_U
    {
 $$ = new NodeDescXML('TAG_SELEC', '');
        $$.childList.push($1);
        $$.childList.push(new NodeDescXML($2, 'CLOSE_TAG'));
    }




    |  TAG_CIERRE_U
    {
                $$ = new NodeDescXML('TAG_SELEC', '');
        $$.childList.push(new NodeDescXML($1, 'CLOSE_TAG'));
    }



;

T_CONF:
        AbreTagConf LISTA_ATRIBUTOS CierreTagConf   {
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
        NombreAtributo IgualAtributo ValorAtributo    {
                $$ = new NodeDescXML('LISTA_ATRIBUTOS', '');
            $$.childList.push($1);
            $$.childList.push($2);
        }



;
