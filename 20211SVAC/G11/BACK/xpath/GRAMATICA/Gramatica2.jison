/*AQUI VAN LAS IMPORTATCIONES PARA EL AST */
%{
 
%}

/*ANILISIS LEXICO */

%lex
%options case-sensitive
%%
/*OPERADORES */
">="    return 'TK_MAYOR_IGUAL';
"<="    return 'TK_MENOR_IGUAL';
"<"     return 'TK_MENOR';
">"     return 'TK_MAYOR';
"="     return 'TK_IGUALDAD';
"!="    return 'TK_DESIGUALDAD';
"+"     return 'TK_MAS';
"-"     return 'TK_MENOS';
"*"     return 'TK_POR';
"|"     return 'TK_BARRA_VERTICAL';
"div"   return 'TK_DIVISION';
"and"   return 'TK_AND';
"or"    return 'TK_OR';
"mod"   return 'TK_MODULO';

/*SIMBOLOS */
"()"     return 'TK_PARENTESIS';
"("     return 'TK_PARENTESIS_IZQUIERDO';
")"     return 'TK_PARENTESIS_DERECHO';
"["     return 'TK_CORCHETE_IZQUIERDO';
"]"     return 'TK_CORCHETE_DERECHO';
"::"     return 'TK_DDP';
"//"     return 'TK_DBARRA'
"/"     return 'TK_BARRA'
"@"     return 'TK_ARROBA'
".."     return 'TK_DPUNTO'
"."     return 'TK_PUNTO'

/*PALABRAS RESERVADAS */
"ancestor"               return 'TK_ANCESTOR'
"ancestor-or-self"       return 'TK_ANCESTOR_OR_SELF'
"attribute"              return 'TK_ATTRIBUTE'
"child"                  return 'TK_CHILD'
"descendant"             return 'TK_DESCENDANT'
"descendant-or-self"     return 'TK_DESCENDANT_OR_SELF'
"following"              return 'TK_FOLLOWING'
"following-sibling"      return 'TK_FOLLOWING_SIBLING'
"namespace"              return 'TK_NAMESPACE'
"parent"                 return 'TK_PARENT'
"preceding"              return 'TK_PRECEDING'
"preceding-sibling"      return 'TK_PRECEDING_SIBLING'
"self"                   return 'TK_SELF'
"last"                   return 'TK_LAST'
"position"               return 'TK_POSITION'
"node"                   return 'TK_NODE'
"text"                   return 'TK_TEXT'


/*EXPRESIONES REGULARES */
\s+                            /QUITA ESPACIOS EN BLANCO/
[0-9]+("."[0-9]+)\b            %{ return 'TK_DECIMAL'; %}
[0-9]+\b                       %{ return 'TK_ENTERO'; %}
[A-Za-z]+["_"0-9A-Za-z]*       %{ return 'TK_IDENTIFICADOR'; %}
[[\']([^\'\n]|(\\\'))*[\']|[[\"]([^\"\n]|(\\\"))*[\"]]      %{ return 'TK_CADENA'; %} 

<<EOF>>     %{  return 'EOF';   %}

.           Error.add(new NodoError("Lexico","No se esperaba el caracter: "+yytext,yylineno));

/lex
/*ANALISIS LEXICO TERMINADO */
%{

%}


/*PRECEDENCIA DE OPERADORES */
%left 'TK_OR'
%left 'TK_AND'

%left 'TK_IGUALDAD' 'TK_DESIGUALDAD'
%left 'TK_MENOR' 'TK_MAYOR' 'TK_MAYOR_IGUAL' 'TK_MENOR_IGUAL'

%left 'TK_MAS' 'TK_MENOS'
%left 'TK_POR' 'TK_DIVISION' 'TK_MODULO'

%right UMINUS
%left 'TK_PARENTESIS_IZQUIERDO' 'TK_PARENTESIS_DERECHO'
/*FIN PRECEDENCIA DE OPERADORES */

/*ANALISIS SINTACTICO */
/*INICIO DE LA GRAMATICA */
%start S

%% /* GRAMATICA  ε */

/*INICIO DE LA GRAMATICA */
S: LISTA EOF {$$=$1; ReporteGD.agregar('S::=LISTA','S.VAL = LISTA.VAL',''); return $$;};

LISTA: PUNTO              {$$=$1; ReporteGD.agregar('LISTA::=PUNTO','LISTA.VAL = PUNTO.VAL','');}
    |  LISTA2             {$$=$1; ReporteGD.agregar('LISTA::=LISTA2','LISTA.VAL = LISTA2.VAL','');}
    ;

LISTA2 : LISTA2 BARRAS LISTA2 { ReporteGA.agregar('LISTA2::=LISTA2 BARRAS LISTA2','LISTA2.VAL = ARRAY(LISTA2.VAL,LISTA2.VAL)',''); }
       | LISTAS               { ReporteGA.agregar('LISTA2::=LISTAS','LISTA2.VAL = LISTAS.VAL',''); }
       ;

LISTAS: LISTA1 LISTAS    {$2.push($1); $$=$2; ReporteGD.agregar('LISTAS::=LISTA1LISTAS','LISTAS.VAL = LISTA1.VAL + LISTAS.VAL','');}
    |LISTA1              {$$=[$1]; ReporteGD.agregar('LISTAS::=LISTA1','LISTAS.VAL = LISTA1.VAL','');}
    ;

LISTA1: PALABRAS_R                  {$$=$1; ReporteGD.agregar('LISTA1::=PALABRAS_R','LISTA1.VAL = PALABRAS_R.VAL','');}
    |IDS                            {$$=$1; ReporteGD.agregar('LISTA1::=IDS','LISTA1.VAL = IDS.VAL','');}
    |ATRIBUTO                       {$$=$1; ReporteGD.agregar('LISTA1::=ATRIBUTO','LISTA1.VAL = ATRIBUTO.VAL','');}
    |ATRIBUTO1                      {$$=$1; ReporteGD.agregar('LISTA1::=ATRIBUTO1','LISTA1.VAL = ATRIBUTO1.VAL','');}
    |ASTERISCO                      {$$=$1; ReporteGD.agregar('LISTA1::=ASTERISCO','LISTA1.VAL = ASTERISCO.VAL','');}
    |                               {ReporteGD.agregar('LISTA1::=ε','LISTA1.VAL = EPSILON','');}
    |error                          { }
    ;

BARRAS: TK_BARRA_VERTICAL {$$=$1}
    |TK_AND {$$ = $1}
    |TK_OR {$$ = $1};

PUNTO: TK_PUNTO PUNTO1          {$$=$2; ReporteGD.agregar('PUNTO::=tk_punto PUNTO1','PUNTO.VAL = TK_PUNTO.VAL + PUNTO1.VAL','');}
    |error                      { }
    ;
PUNTO1: LISTAS                  {$$=$1; ReporteGD.agregar('PUNTO1::=LISTAS','PUNTO1.VAL = LISTAS.VAL','');}
    |error                      { }
    ;

IDS: TK_DBARRA TK_IDENTIFICADOR ASTERISCO1      { ReporteGD.agregar('IDS::=tk_dbarra tk_identificador ASTERISCO1','IDS.VAL = TK_DBARRA.VAL + TK_IDENTIFICADOR.VAL + ASTERISCO1.VAL','');}
    |TK_BARRA TK_IDENTIFICADOR  ASTERISCO1      { ReporteGD.agregar('IDS::=tk_barra tk_identificador ASTERISCO1','IDS.VAL = TK_BARRA.VAL + TK_IDENTIFICADOR.VAL +  ASTERISCO1.VAL','');}
    |TK_DBARRA TK_IDENTIFICADOR                 { ReporteGD.agregar('IDS::=tk_dbarra tk_identificador','IDS.VAL = TK_DBARRA.VAL + TK_IDENTIFICADOR.VAL','');}
    |TK_BARRA TK_IDENTIFICADOR                  { ReporteGD.agregar('IDS::=tk_barra tk_identificador','IDS.VAL = TK_BARRA.VAL + TK_IDENTIFICADOR.VAL','');}
    |TK_IDENTIFICADOR                           { ReporteGD.agregar('IDS::=tk_identificador','IDS.VAL = TK_IDENTIFICADOR.VAL  ','');}
    ;


ATRIBUTO: TK_DBARRA TK_ARROBA TK_POR L_ATRIBUTO     { ReporteGD.agregar('ATRIBUTO::=tk_dbarra tk_arroba tk_por L_ATRIBUTO','ATRIBUTO.VAL = TK_DBARRA.VAL + TK_ARROBA.VAL + TK_POR.VAL + L_ATRIBUTO.VAL','');}
    |TK_ARROBA TK_POR  L_ATRIBUTO                   { ReporteGD.agregar('ATRIBUTO::=tk_arroba tk_por L_ATRIBUTO','ATRIBUTO.VAL = TK_ARROBA.VAL + TK_POR.VAL + L_ATRIBUTO.VAL','');}
    |TK_BARRA TK_ARROBA TK_POR L_ATRIBUTO           { ReporteGD.agregar('ATRIBUTO::=tk_barra tk_arroba tk_por L_ATRIBUTO','ATRIBUTO.VAL = TK_BARRA.VAL + TK_ARROBA.VAL + TK_POR.VAL + L_ATRIBUTO.VAL','');} 
    |TK_DBARRA TK_ARROBA TK_IDENTIFICADOR L_ATRIBUTO{ ReporteGD.agregar('ATRIBUTO::=tk_dbarra tk_arroba tk_por L_ATRIBUTO','ATRIBUTO.VAL = TK_DBARRA.VAL + TK_ARROBA.VAL + TK_IDENTIFICADOR.VAL + L_ATRIBUTO.VAL','');}
    |TK_BARRA TK_ARROBA TK_IDENTIFICADOR L_ATRIBUTO { ReporteGD.agregar('ATRIBUTO::=tk_barra tk_arroba tk_por L_ATRIBUTO','ATRIBUTO.VAL = TK_BARRA.VAL + TK_ARROBA.VAL + TK_IDENTIFICADOR.VAL + L_ATRIBUTO.VAL','');} 
    |TK_ARROBA TK_IDENTIFICADOR  L_ATRIBUTO         { ReporteGD.agregar('ATRIBUTO::=tk_arroba tk_por L_ATRIBUTO','ATRIBUTO.VAL = TK_ARROBA.VAL + TK_IDENTIFICADOR.VAL + L_ATRIBUTO.VAL','');}
    ;


L_ATRIBUTO: ATRIBUTO1 L_ATRIBUTO   {$2.push($1); $$=$2; ReporteGD.agregar('L_ATRIBUTO::=ATRIBUTO1 L_ATRIBUTO','L_ATRIBUTO.VAL = ATRIBUTO1.VAL + L_ATRIBUTO.VAL','');}
    |ATRIBUTO1                      {$$=[$1]; ReporteGD.agregar('L_ATRIBUTO::=ATRIBUTO1','L_ATRIBUTO.VAL = ATRIBUTO1.VAL','');}
    ;

ATRIBUTO1: TK_DBARRA  TK_DPUNTO     { ReporteGD.agregar('ATRIBUTO1::=tk_dbarra tk_dpunto','ATRIBUTO1.VAL = TK_DBARRA.VAL + TK_DPUNTO.VAL','');}
    |TK_DBARRA TK_PUNTO             { ReporteGD.agregar('ATRIBUTO1::=tk_dbarra tk_punto','ATRIBUTO1.VAL = TK_DBARRA.VAL + TK_PUNTO.VAL','');}
    |TK_BARRA TK_DPUNTO             { ReporteGD.agregar('ATRIBUTO1::=tk_barra tk_dpunto','ATRIBUTO1.VAL = TK_BARRA.VAL + TK_DPUNTO.VAL','');}
    |TK_BARRA TK_PUNTO              { ReporteGD.agregar('ATRIBUTO1::=tk_barra tk_punto','ATRIBUTO1.VAL = TK_BARRA.VAL + TK_PUNTO.VAL','');}
    |                               { ReporteGD.agregar('ATRIBUTO1::= ε','ATRIBUTO1.VAL = EPSILON','');}
    ;

PALABRAS_R: TK_DBARRA PR TK_DDP OPCION ASTERISCO1{ ReporteGD.agregar('PALABRAS_R::=tk_dbarra PR tk_ddp OPCION','PALABRAS_R.VAL = TK_DBARRA.VAL + PR.VAL + TK_DDP.VAL + OPCION.VAL','');}
    |TK_BARRA PR TK_DDP OPCION  ASTERISCO1       { ReporteGD.agregar('PALABRAS_R::=tk_barra PR tk_ddp OPCION','PALABRAS_R.VAL = TK_BARRA.VAL + PR.VAL + TK_DDP.VAL + OPCION.VAL','');}
    |TK_DBARRA PR TK_DDP OPCION                  { ReporteGD.agregar('PALABRAS_R::=tk_dbarra PR tk_ddp OPCION','PALABRAS_R.VAL = TK_DBARRA.VAL + PR.VAL + TK_DDP.VAL + OPCION.VAL','');}
    |TK_BARRA PR TK_DDP OPCION                   { ReporteGD.agregar('PALABRAS_R::=tk_barra PR tk_ddp OPCION','PALABRAS_R.VAL = TK_BARRA.VAL + PR.VAL + TK_DDP.VAL + OPCION.VAL','');}
    |TK_BARRA PR  TK_PARENTESIS                  {$$=$2; ReporteGA.agregar('PALABRAS_R::=TK_BARRA PR TK_PARENTESIS','PALABRAS_R.VAL = PR.VAL','');}
    |TK_DBARRA PR  TK_PARENTESIS                 {$$=$2; ReporteGA.agregar('PALABRAS_R::=TK_DBARRA PR TK_PARENTESIS','PALABRAS_R.VAL = PR.VAL','');}
    ;

PR: TK_ANCESTOR             {$$=$1; ReporteGD.agregar('PR::=tk_ancestor','PR.VAL = TK_ANCESTOR.VAL','');}
    |TK_ANCESTOR_OR_SELF    {$$=$1; ReporteGD.agregar('PR::=tk_ancestor_or_self','PR.VAL = TK_ANCESTOR_OR_SELF.VAL','');}
    |TK_ATTRIBUTE           {$$=$1; ReporteGD.agregar('PR::=tk_attribute','PR.VAL = TK_ATTRIBUTE.VAL','');}
    |TK_CHILD               {$$=$1; ReporteGD.agregar('PR::=tk_child','PR.VAL = TK_CHILD.VAL','');}
    |TK_DESCENDANT          {$$=$1; ReporteGD.agregar('PR::=tk_descendant','PR.VAL = TK_DESCENDANT.VAL','');}
    |TK_DESCENDANT_OR_SELF  {$$=$1; ReporteGD.agregar('PR::=tk_descendant_or_self','PR.VAL = TK_DESCENDANT_OR_SELF.VAL','');}
    |TK_FOLLOWING           {$$=$1; ReporteGD.agregar('PR::=tk_following','PR.VAL = TK_FOLLOWING.VAL','');}
    |TK_FOLLOWING_SIBLING   {$$=$1; ReporteGD.agregar('PR::=tk_following_sibling','PR.VAL = TK_FOLLOWING_SIBLING.VAL','');}
    |TK_NAMESPACE           {$$=$1; ReporteGD.agregar('PR::=tk_namespace','PR.VAL = TK_NAMESPACE.VAL','');}
    |TK_PARENT              {$$=$1; ReporteGD.agregar('PR::=tk_parent','PR.VAL = TK_PARENT.VAL','');}
    |TK_PRECEDING           {$$=$1; ReporteGD.agregar('PR::=tk_preceding','PR.VAL = TK_PRECEDING.VAL','');}
    |TK_PRECEDING_SIBLING   {$$=$1; ReporteGD.agregar('PR::=tk_preceding_sibling','PR.VAL = TK_PRECEDING_SIBLING.VAL ','');}
    |TK_SELF                {$$=$1; ReporteGD.agregar('PR::=tk_self','PR = TK_SELF.VAL','');}
    |TK_LAST                {$$=$1; ReporteGD.agregar('PR::=tk_self','PR = TK_SELF.VAL','');}
    |TK_POSITION            {$$=$1; ReporteGD.agregar('PR::=tk_self','PR = TK_SELF.VAL','');}
    |TK_NODE                {$$=$1; ReporteGD.agregar('PR::=tk_self','PR = TK_SELF.VAL','');}
    |TK_TEXT                {$$=$1; ReporteGD.agregar('PR::=tk_self','PR = TK_SELF.VAL','');}
    ;


OPCION: TK_LAST TK_PARENTESIS   { ReporteGD.agregar('OPCION::=tk_last tk_parentesis','OPCION.VAL = TK_LAST.VAL + TK_PARENTESIS.VAL','');}
    |TK_POSITION TK_PARENTESIS  { ReporteGD.agregar('OPCION::=tk_position tk_parentesis','OPCION.VAL = TK_NODE.VAL + TK_PARENTESIS.VAL','');}
    |TK_NODE TK_PARENTESIS      { ReporteGD.agregar('OPCION::=tk_node tk_parentesis','OPCION.VAL = TK_NODE.VAL + TK_PARENTESIS.VAL','');}
    |TK_TEXT TK_PARENTESIS      { ReporteGD.agregar('OPCION::=tk_text tk_parentesis','OPCION.VAL = TK_TEXT.VAL + TK_PARENTESIS.VAL','');}
    |TK_IDENTIFICADOR           { ReporteGD.agregar('OPCION::=tk_identificador','OPCION.VAL = TK_IDENTIFICADOR.VAL','');}
    ;

ASTERISCO:TK_PUNTO TK_DBARRA TK_POR L_ASTERISCO         { ReporteGD.agregar('ASTERISCO::=tk_punto tk_dbarra tk_por L_ASTERISCO','ASTERISCO.VAL = TK_DBARRA.VAL+ TK_POR.VAL + L_ASTERISCO.VAL','');}
    |TK_PUNTO TK_BARRA TK_POR L_ASTERISCO               { ReporteGD.agregar('ASTERISCO::=tk_punto tk_barra tk_por L_ASTERISCO','ASTERISCO.VAL = TK_DBARRA.VAL + TK_BARRA.VAL+ TK_POR.VAL + L_ASTERISCO.VAL','');}
    |TK_DBARRA TK_POR L_ASTERISCO                       { ReporteGD.agregar('ASTERISCO::=tk_dbarra tk_por L_ASTERISCO','ASTERISCO.VAL = TK_DBARRA TK_POR.VAL + L_ASTERISCO.VAL','');}
    |TK_BARRA TK_POR L_ASTERISCO                        { ReporteGD.agregar('ASTERISCO::=tk_barra tk_por L_ASTERISCO','ASTERISCO.VAL = TK_BARRA.VAL+TK_POR.VAL+L_ASTERISCO.VAL','');}
    |TK_PUNTO TK_DBARRA TK_POR                          { ReporteGD.agregar('ASTERISCO::=tk_punto tk_dbarra tk_por','ASTERISCO.VAL = TK_PUNTO.VAL+ TK_DBARRA.VAL+TK_POR.VAL','');}
    |TK_PUNTO TK_BARRA TK_POR                           { ReporteGD.agregar('ASTERISCO::=tk_punto tk_barra tk_por','ASTERISCO.VAL =TK_PUNTO.VAL+TK_BARRA.VAL+TK_POR.VAL','');}
    |TK_DBARRA TK_POR                                   { ReporteGD.agregar('ASTERISCO::=tk_dbarra tk_por','ASTERISCO.VAL = TK_DBARRA.VAL + TK_POR.VAL','');}
    |TK_BARRA TK_POR                                    { ReporteGD.agregar('ASTERISCO::=tk_barra tk_por','ASTERISCO.VAL = TK_BARRA.VAL + TK_POR.VAL','');}
    ;

L_ASTERISCO: ASTERISCO1 L_ASTERISCO          {$2.push($1); $$=$2; ReporteGD.agregar('L_ASTERISCO::= ASTERISCO1 L_ASTERISCO','L_ASTERISCO.VAL = ASTERISCO1.VAL + L_ASTERISCO.VAL','');}
    |ASTERISCO1                              {$$=[$1]; ReporteGD.agregar('L_ASTERISCO::=ASTERISCO1','L_ASTERISCO.VAL = ASTERISCO1.VAL','');}
    ;

ASTERISCO1:TK_CORCHETE_IZQUIERDO EXP TK_CORCHETE_DERECHO    {$$ = $2; ReporteGD.agregar('ASTERISCO1::=tk_corchete_izquierdo EXP tk_corchete_derecho','ASTERISCO1.VAL = EXP.VAL','');}
    |TK_IDENTIFICADOR          {$$ = $1; ReporteGD.agregar('ASTERISCO1::=TK_IDENTIFICADOR','ASTERISCO1.VAL = TK_IDENTIFICADOR.VAL','');}
    ;

EXP:  EXP1 EXP_P                { ReporteGD.agregar('EXP::=EXP1 EXP_P','EXP_P.inh = EXP1.VAL | EXP.VAL= EXP_P.syn','');};
EXP_P: TK_MAS EXP1 EXP_P        { ReporteGD.agregar('EXP_P::=tk_mas EXP1 EXP_P','EXP_P.inh = EXP_P.inh + EXP1.VAL | EXP_P.syn = EXP_P.syn','');}
    | TK_MENOS EXP1 EXP_P       { ReporteGD.agregar('EXP_P::=tk_menos EXP1 EXP_P','EXP_P.inh = EXP_P.inh - EXP1.VAL | EXP_P.syn = EXP_P.syn','');}
    |                           { ReporteGD.agregar('EXP_P::=ε','EXP_P.syn = EXP_P.inh','');}
    ;
EXP1: EXP2 EXP1_P               { ReporteGD.agregar('EXP1::=EXP2 EXP1_P','EXP1_P.inh = EXP2.VAL | EXP1.VAL= EXP1_P.syn','');};
EXP1_P:TK_POR EXP2 EXP1_P       { ReporteGD.agregar('EXP1_P::=tk_por EXP2 EXP1_P','EXP1_P.inh = EXP1_P.inh * EXP2.VAL | EXP1_P.syn = EXP1_P.syn','');}
    | TK_DIVISION EXP2 EXP1_P   { ReporteGD.agregar('EXP1_P::=tk_division EXP2 EXP1_P','EXP1_P.inh = EXP1_P.inh / EXP2.VAL | EXP1_P.syn = EXP1_P.syn','');}
    | TK_MODULO EXP2 EXP1_P     { ReporteGD.agregar('EXP1_P::=tk_modulo EXP2 EXP1_P','EXP1_P.inh = EXP1_P.inh mod EXP2.VAL | EXP1_P.syn = EXP1_P.syn','');}
    |                           { ReporteGD.agregar('EXP1_P::=ε','EXP1_P.syn = EXP1_P.inh','');}
    ;
EXP2: EXP3 EXP2_P                   { ReporteGD.agregar('EXP2::=EXP3 EXP2_P','EXP2_P.inh = EXP3.VAL | EXP2.VAL= EXP2_P.syn');};
EXP2_P:TK_MENOR EXP3 EXP2_P         { ReporteGD.agregar('EXP2_P::=tk_menor EXP3 EXP2_P','EXP2_P.inh = EXP2_P.inh  EXP3.VAL | EXP2_P.syn = EXP2_P.syn','');}
    | TK_MAYOR EXP3 EXP2_P          { ReporteGD.agregar('EXP2_P::=tk_mayor EXP3 EXP2_P','EXP2_P.inh = EXP2_P.inh  EXP3.VAL | EXP2_P.syn = EXP2_P.syn','');}
    | TK_MENOR_IGUAL EXP3 EXP2_P    { ReporteGD.agregar('EXP2_P::=tk_menor_igual EXP3 EXP2_P','EXP2_P.inh = EXP2_P.inh = EXP3.VAL | EXP2_P.syn = EXP2_P.syn','');}
    | TK_MAYOR_IGUAL EXP3 EXP2_P    { ReporteGD.agregar('EXP2_P::=tk_mayor_igual EXP3 EXP2_P','EXP2_P.inh = EXP2_P.inh = EXP3.VAL | EXP2_P.syn = EXP2_P.syn','');}
    | TK_IGUALDAD EXP3 EXP2_P       { ReporteGD.agregar('EXP2_P::=tk_igualdad EXP3 EXP2_P','EXP2_P.inh = EXP2_P.inh = EXP3.VAL | EXP2_syn = EXP2_P.syn','');}
    | TK_DESIGUALDAD EXP3 EXP2_P    { ReporteGD.agregar('EXP2_P::=tk_desigualdad EXP3 EXP2_P','EXP2_P.inh = EXP2_P.inh != EXP3.VAL | EXP2_syn = EXP2_P.syn','');}
    |                               { ReporteGD.agregar('EXP2_P::=ε','EXP2_P.syn = EXP2_P.inh','');}
    ;
EXP3: EXP4 EXP3_P                       { ReporteGD.agregar('EXP3::=EXP4 EXP3_P','EXP3_P.inh = EXP4.VAL | EXP4.VAL= EXP3_P.syn','');};
EXP3_P: TK_OR EXP4 EXP3_P               { ReporteGD.agregar('EXP3_P::=tk_or EXP4 EXP3_P','EXP3_P.inh = EXP3_P.inh  EXP4.VAL | EXP3_P.syn = EXP3_P.syn','');}
    | TK_AND EXP4 EXP3_P                { ReporteGD.agregar('EXP3_P::=tk_and EXP4 EXP3_P','EXP3_P.inh = EXP3_P.inh  EXP4.VAL | EXP3_P.syn = EXP3_P.syn','');}
    | TK_BARRA_VERTICAL EXP4 EXP3_P     { ReporteGD.agregar('EXP3::=tk_barra_vertical EXP4 EXP3_P','EXP3_P.inh = EXP3_P.inh  EXP4.VAL | EXP3_P.syn = EXP3_P.syn','');}
    |                                   { ReporteGD.agregar('EXP3::=ε','EXP3_P.syn = EXP3_P.inh','');}
    ;
EXP4: TK_PARENTESIS_IZQUIERDO EXP TK_PARENTESIS_DERECHO  { ReporteGD.agregar('EXP4::=tk_parentesis_izquierdo EXP tk_parentesis_derecho','EXP4.VAL = EXP.VAL ','');}
    | ATRI                                               { ReporteGD.agregar('EXP4::=ATRI','EXP4.VAL = ATRI.VAL','');}
    | TK_ARROBA EXP                                      { ReporteGD.agregar('EXP4::=tk_arroba EXP','EXP4.VAL = TK_ARROBA.VAL + EXP.VAL','');}
    | TK_DECIMAL                                         { ReporteGD.agregar('EXP4::=tk_decimal','EXP4.VAL = TK_DECIMA.LEXVAL','');}
    | TK_ENTERO                                          { ReporteGD.agregar('EXP4::=tk_entero','EXP4.VAL = TK_ENTERO.LEXVAL','');}
    | TK_CADENA                                          { ReporteGD.agregar('EXP4::=tk_cadena','EXP4.VAL = TK_CADENA.VAL','');}
    | TK_IDENTIFICADOR                                   { ReporteGD.agregar('EXP4::=tk_identificador','EXP4.VAL = TK_IDENTIFICADOR.VAL','');}
    | TK_POSITION TK_PARENTESIS                          { ReporteGD.agregar('EXP4::=tk_position tk_parentesis','EXP4.VAL = TK_POSITION.VAL + TK_PARENTESIS.VAL','');}
    | TK_LAST TK_PARENTESIS                              { ReporteGD.agregar('EXP4::=tk_last tk_parentesis','EXP4.VAL = TK_LAST.VAL + TK_PARENTESIS.VAL','');}
    | PAL_RE                                             { ReporteGD.agregar('EXP4::=PAL_RE','EXP4.VAL = PAL_RE.VAL','');}
    ;


PAL_RE: PR TK_DDP OPCION {  ReporteGD.agregar('PAL_RE::=PR tk_ddp OPCION','PAL_RE.VAL = PR.VAL + TK_DDP.VAL + OPCION.VAL','');};

ATRI: TK_ARROBA TK_POR L_ATRI {  ReporteGD.agregar('ATRI::=tk_arroba tk_por L_ATRI','ATRI.VAL = TK_ARROBA.VAL + TK_POR.VAL + L_ATRI.VAL','');};

L_ATRI: ATRI1 L_ATRI {$2.push($1); $$=$2;  ReporteGD.agregar('L_ATRI::= ATRI1 L_ATRI','L_ATRI.VAL = ATRI1.VAL + L_ATRI.VAL','');}
    |ATRI1          {$$=[$1];  ReporteGD.agregar('ATRI1::=ATRI1','L_ATRI.VAL = ATRI1.VAL','');}
    ;

ATRI1: TK_DBARRA TK_DPUNTO      {  ReporteGD.agregar('ATRI1::=tk_dbarra tk_dpunto','ATRI1.VAL = TK_DBARRA.VAL + TK_DPUNTO.VAL','');}
    |TK_DBARRA TK_PUNTO         {  ReporteGD.agregar('ATRI1::=tk_dbarra tk_punto' ,'ATRI1.VAL = TK_DBARRA.VAL + TK_PUNTO.VAL','');}
    |TK_BARRA TK_DPUNTO         {  ReporteGD.agregar('ATRI1::=tk_barra  tk_dpunto','ATRI1.VAL = TK_BARRA.VAL  + TK_TK_DPUNTO.VAL','');}
    |TK_BARRA TK_PUNTO          {  ReporteGD.agregar('ATRI1::=tk_barra  tk_punto' ,'ATRI1.VAL = TK_BARRA.VAL  + TK_PUNTO.VAL','');}
    |                           { ReporteGD.agregar('ATRI1::=ε','ATRI1.VAL = EPSILON','');}
    ;

/*FIN DE LA GRAMATICA */