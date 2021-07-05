%lex

%%
\s+                                         {/*espacio en blanco*/}
"/"                                         {return 'diagonal';}
"."                                         {return 'punto';}
"@"                                         {return 'arroba';}
"node"                                      {return 'node';}
"text"                                      {return 'text';}
"last"                                      {return 'last';}
"position"                                  {return 'position';}
"ancestor"                                  {return 'ancestor';}
"attribute"                                 {return 'attribute';}
"child"                                     {return 'child';}
"descendant"                                {return 'descendant';}
"-or-self"                                  {return 'or-self';}
"following"                                 {return 'following';}
"-sibling"                                  {return 'sibling';}
"parent"                                    {return 'parent';}
"preceding"                                 {return 'preceding';}
"self"                                      {return 'self';}
"|"                                         {return 'operador_o';}
"+"                                         {return 'suma';}
"-"                                         {return 'resta';}
"*"                                         {return 'multiplicacion';}
"div"                                       {return 'division';}
"="                                         {return 'igual';}
"!="                                        {return 'diferente';}
"<"                                         {return 'menor';}
"<="                                        {return 'menor_igual';}
">"                                         {return 'mayor';}
">"                                         {return 'mayor_igual';}
"or"                                        {return 'or';}
"and"                                       {return 'and';}
"mod"                                       {return 'mod';}
"("                                         {return 'parentesis_abierto';}
")"                                         {return 'parentesis_cerrado';}
"["                                         {return 'corchete_abierto';}
"]"                                         {return 'corchete_cerrado';}
":"                                         {return 'dos_puntos';}
(0|[1-9][0-9]*)(\.(0|[0-9]*[1-9](0)?))?     {return 'digito';}
\w+                                         {return 'identificador';}
"&&"[^\n]* {}
"\""[^"\""]*"\""                            {return 'string';}
<<EOF>>                                     {return 'eof';}
.					{
    agregarErrorLexico("Lexico",yytext,yylloc.first_line,yylloc.first_column+1);
    }
/lex

%left 'suma' 'resta'
%left 'multiplicacion' 'division' 'mod'

%left 'igual' 'diferente' 'menor' 'menor_igual' 'mayor' 'mayor_igual'
%left 'or' 'and'

%start INIT

%%

INIT
    : CONSULTAS_XPATH eof {
        console.log('\nexito al analizar\n');
        return $1;
    }
    | error eof {
        erroresXpath.agregarError("Sintactico","Errores seguidos"+yytext,this._$.first_line,this._$.first_column);
        return [];
    }
;


CONSULTAS_XPATH
    : CONSULTA_XPATH operador_o CONSULTAS_XPATH         {$3.unshift($1); $$ = $3;}
    | CONSULTA_XPATH                                    {$$ = [$1]}
    | corchete_abierto error corchete_cerrado {
        $$ = [];
        erroresXpath.agregarError("Sintactico","No puede venir un predicado como un nodo\n"+yytext,this._$.first_line,this._$.first_column);
    }
    | parentesis_abierto error parentesis_cerrado {
        $$ = [];
        erroresXpath.agregarError("Sintactico","No puede venir una expresion como un nodo\n"+yytext,this._$.first_line,this._$.first_column);
    }
;

CONSULTA_XPATH
    : RELATIVA                  {$$ = [new ConsultaSimple($1)];}
    | EXPRESIONES_RUTA          {$$ = $1;}
    | PUNTOS EXPRESIONES_RUTA   {
        $$ = [];
        if ($1 === "punto") {
            $2.forEach(e => $$.unshift(e));
        }
        $2.forEach(e => $$.push(e));
    }
;

EXPRESIONES_RUTA
    : EXPRESION_RUTA EXPRESIONES_RUTA       {$1.reverse().forEach(e => $2.unshift(e)); $$ = $2;}
    | EXPRESION_RUTA                        {$$ = $1;}
    | error operador_o {
        $$ = [];
        erroresXpath.agregarError("Sintactico","Consulta no aceptada:\n"+yytext,this._$.first_line,this._$.first_column);
    }
;

EXPRESION_RUTA
    : RELATIVA DIAGONALES ACCESORES {
        $$ = [];
        if (!($1 === "")) {
            $$.push(new ConsultaSimple($1));
        }
        $$.push(FabricaConsulta.fabricar($2, $3.id, $3.eje));
    }
    | error identificador {
        erroresXpath.agregarError("Sintactico",yytext,this._$.first_line,this._$.first_column);
        $$ = [];
    }
;

RELATIVA
    :                                       {$$ = "";}
    | identificador OPCIONAL_PREDICADO      {$$ = $1;}
;

DIAGONALES
    : diagonal diagonal                     {$$ = "doble";}
    | diagonal                              {$$ = "simple";}
;

PUNTOS
    : punto                 {$$ = "punto";}
    | punto punto           {$$ = "puntos";}
;

ACCESORES
    : ID OPCIONAL_PREDICADO             {$$ = $1;}
    | ATRIBUTO OPCIONAL_PREDICADO       {$$ = {id: $1, eje: ""};}
    | PUNTOS OPCIONAL_PREDICADO         {$$ = {id: $1, eje: ""};}
    | multiplicacion                    {$$ = {id: $1, eje: ""};}
    | NODE                              {$$ = {id: $1, eje: ""};}
    | TEXT                              {$$ = {id: $1, eje: ""};}
;

TEXT
    : text parentesis_abierto parentesis_cerrado {$$ = $1 + "()";}
;

NODE
    : node parentesis_abierto parentesis_cerrado {$$ = $1 + "()";}
;

ATRIBUTO
    : arroba identificador          {$$ = $1 + $2;}
    | arroba multiplicacion         {$$ = $1 + $2;}
;

ID
    : identificador         {$$ = {id: $1, eje: ""};}
    | EJE                   {$$ = $1;}
;

EJE
    : EJES dos_puntos dos_puntos ACCESORES_EJE  {$$ = {id: $4, eje: $1}}
;

ACCESORES_EJE
    : identificador             {$$ = $1;}
    | NODE                      {$$ = $1;}
    | TEXT                      {$$ = $1;}
    | multiplicacion            {$$ = $1;}
;

EJES
    : ancestor                  {$$ = $1;}
    | ancestor or-self          {$$ = $1+$2;}
    | attribute                 {$$ = $1;}
    | child                     {$$ = $1;}
    | descendant or-self        {$$ = $1+$2;}
    | descendant                {$$ = $1;}
    | following                 {$$ = $1;}
    | following sibling         {$$ = $1+$2;}
    | parent                    {$$ = $1;}
    | preceding                 {$$ = $1;}
    | preceding sibling         {$$ = $1+$2;}
    | self                      {$$ = $1;}
;

OPCIONAL_PREDICADO
    : PREDICADOS
    |
;

PREDICADOS
    : PREDICADO PREDICADOS
    | PREDICADO
    | corchete_abierto error corchete_cerrado {
        erroresXpath.agregarError("Sintactico","Error en predicado\n"+yytext,this._$.first_line,this._$.first_column);
    }
;

PREDICADO
    : corchete_abierto FILTRO corchete_cerrado
;

FILTRO
    : FILTRO_P1 FILTRO_P2
;

FILTRO_P1
    : EXPR AUX_EXPR
    | EJE OPCIONAL_PREDICADO
;

FILTRO_P2
    : and FILTRO
    | or FILTRO
    |
;

AUX_EXPR
    : igual EXPR
    | diferente EXPR
    | mayor EXPR
    | menor EXPR
    | mayor_igual EXPR
    | menor_igual EXPR
    |
;

EXPR
    : EXPR_P1 EXPR_P2
    | parentesis_abierto error parentesis_cerrado {
        erroresXpath.agregarError("Sintactico","Error dentro expresion\n"+yytext,this._$.first_line,this._$.first_column);
    }
;

EXPR_P1
    : parentesis_abierto EXPR parentesis_cerrado
    | TIPOS
;

EXPR_P2
    : suma EXPR
    | resta EXPR
    | multiplicacion EXPR
    | division EXPR
    | mod EXPR
    |
;

TIPOS
    : string
    | digito
    | ATRIBUTO
    | PUNTOS
    | CONSULTA_XPATH
    | last parentesis_abierto parentesis_cerrado
    | position parentesis_abierto parentesis_cerrado
    | TEXT
;
