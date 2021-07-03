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
"Node_tree"                   return 'TK_Node_tree'
"text"                   return 'TK_TEXT'


/*EXPRESIONES REGULARES */
\s+                            /QUITA ESPACIOS EN BLANCO/
[0-9]+("."[0-9]+)\b            %{ return 'TK_DECIMAL'; %}
[0-9]+\b                       %{ return 'TK_ENTERO'; %}
[A-Za-z]+["_"0-9A-Za-z]*       %{ return 'TK_IDENTIFICADOR'; %}
[[\']([^\'\n]|(\\\'))*[\']|[[\"]([^\"\n]|(\\\"))*[\"]]      %{ return 'TK_CADENA'; %} 

<<EOF>>     %{  return 'EOF';   %}

/*.           CErrores.Errores.add(new CNodoError.NodoError("Lexico","No se esperaba el caracter: "+yytext,yylineno)) */

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
S: LISTA EOF { $$ = new Node_tree('S',''); $$.addChild($1); return $$; };

LISTA: PUNTO              { $$ = new Node_tree('LISTA',''); $$.addChild($1); }
    |  LISTA2             { $$ = new Node_tree('LISTA',''); $$.addChild($1); }
    ;

LISTA2 : LISTA2 BARRAS LISTA2 { $$ = new Node_tree('LISTA2',''); $$.addChild($1); $$.addChild($2); $$.addChild($3); }
       | LISTAS               { $$ = new Node_tree('LISTA2',''); $$.addChild($1); }
       ;

LISTAS: LISTA1 LISTAS    { $$ = new Node_tree('LISTAS',''); $$.addChild($1); $$.addChild($2); }
    |LISTA1              { $$ = new Node_tree('LISTAS',''); $$.addChild($1); }
    ;

LISTA1: PALABRAS_R                  { $$ = new Node_tree('LISTA1',''); $$.addChild($1); }
    |IDS                            { $$ = new Node_tree('LISTA1',''); $$.addChild($1); }
    |ATRIBUTO                       { $$ = new Node_tree('LISTA1',''); $$.addChild($1); }
    |ATRIBUTO1                      { $$ = new Node_tree('LISTA1',''); $$.addChild($1); }
    |ASTERISCO                      { $$ = new Node_tree('LISTA1',''); $$.addChild($1); }
    |                               { $$ = new Node_tree('LISTA1',''); $$.addChild(new Node_tree('ε','ε')); }
    |error                          { $$ = new Node_tree('error','error'); }
    ;

BARRAS: TK_BARRA_VERTICAL { $$ = new Node_tree('BARRAS',''); $$.addChild(new Node_tree($1,'TK_BARRA_VERTICAL')); }
    |TK_AND { $$ = new Node_tree('BARRAS',''); $$.addChild(new Node_tree($1,'TK_AND')); }
    |TK_OR { $$ = new Node_tree('BARRAS',''); $$.addChild(new Node_tree($1,'TK_OR')); };

PUNTO: TK_PUNTO PUNTO1          { $$ = new Node_tree('PUNTO',''); $$.addChild(new Node_tree($1,'TK_PUNTO')); $$.addChild($2); }
    |error                      { $$ = new Node_tree('error','error');}
    ;
PUNTO1: LISTAS                  { $$ = new Node_tree('PUNTO1',''); $$.addChild($1); }
    |error                      { $$ = new Node_tree('error','error');}
    ;

IDS: TK_DBARRA TK_IDENTIFICADOR ASTERISCO1      { $$ = new Node_tree('IDS',''); $$.addChild(new Node_tree($1,'TK_DBARRA')); $$.addChild(new Node_tree($2,'TK_IDENTIFICADOR')); $$.addChild($3); }
    |TK_BARRA TK_IDENTIFICADOR  ASTERISCO1      { $$ = new Node_tree('IDS',''); $$.addChild(new Node_tree($1,'TK_BARRA'));  $$.addChild(new Node_tree($2,'TK_IDENTIFICADOR')); $$.addChild($3); }
    |TK_DBARRA TK_IDENTIFICADOR                 { $$ = new Node_tree('IDS',''); $$.addChild(new Node_tree($1,'TK_DBARRA')); $$.addChild(new Node_tree($2,'TK_IDENTIFICADOR')); }
    |TK_BARRA TK_IDENTIFICADOR                  { $$ = new Node_tree('IDS',''); $$.addChild(new Node_tree($1,'TK_BARRA'));  $$.addChild(new Node_tree($2,'TK_IDENTIFICADOR')); }
    |TK_IDENTIFICADOR                           { $$ = new Node_tree('IDS',''); $$.addChild(new Node_tree($1,'TK_IDENTIFICADOR')); }
    ;


ATRIBUTO: TK_DBARRA TK_ARROBA TK_POR L_ATRIBUTO         { $$ = new Node_tree('ATRIBUTO',''); $$.addChild(new Node_tree($1,'TK_DBARRA')); $$.addChild(new Node_tree($2,'TK_ARROBA')); $$.addChild(new Node_tree($3,'TK_POR')); $$.addChild($4); }
    |TK_BARRA TK_ARROBA TK_POR L_ATRIBUTO               { $$ = new Node_tree('ATRIBUTO',''); $$.addChild(new Node_tree($1,'TK_BARRA'));  $$.addChild(new Node_tree($2,'TK_ARROBA')); $$.addChild(new Node_tree($3,'TK_POR')); $$.addChild($4); } 
    |TK_ARROBA TK_POR  L_ATRIBUTO                       { $$ = new Node_tree('ATRIBUTO',''); $$.addChild(new Node_tree($1,'TK_ARROBA')); $$.addChild(new Node_tree($2,'TK_POR')); $$.addChild($3); }
    |TK_DBARRA TK_ARROBA TK_IDENTIFICADOR L_ATRIBUTO    { $$ = new Node_tree('ATRIBUTO',''); $$.addChild(new Node_tree($1,'TK_DBARRA')); $$.addChild(new Node_tree($2,'TK_ARROBA')); $$.addChild(new Node_tree($3,'TK_IDENTIFICADOR')); $$.addChild($4); }
    |TK_BARRA TK_ARROBA TK_IDENTIFICADOR L_ATRIBUTO     { $$ = new Node_tree('ATRIBUTO',''); $$.addChild(new Node_tree($1,'TK_BARRA'));  $$.addChild(new Node_tree($2,'TK_ARROBA')); $$.addChild(new Node_tree($3,'TK_IDENTIFICADOR')); $$.addChild($4); } 
    |TK_ARROBA TK_IDENTIFICADOR  L_ATRIBUTO             { $$ = new Node_tree('ATRIBUTO',''); $$.addChild(new Node_tree($1,'TK_ARROBA')); $$.addChild(new Node_tree($2,'TK_IDENTIFICADOR')); $$.addChild($3); }     
    ;


L_ATRIBUTO: ATRIBUTO1 L_ATRIBUTO    { $$ = new Node_tree('L_ATRIBUTO',''); $$.addChild($1); $$.addChild($2); }
    |ATRIBUTO1                      { $$ = new Node_tree('L_ATRIBUTO',''); $$.addChild($1); }
    ;

ATRIBUTO1: TK_DBARRA  TK_DPUNTO     { $$ = new Node_tree('ATRIBUTO1',''); $$.addChild(new Node_tree($1,'TK_DBARRA')); $$.addChild(new Node_tree($2,'TK_DPUTNO')); }
    |TK_DBARRA TK_PUNTO             { $$ = new Node_tree('ATRIBUTO1',''); $$.addChild(new Node_tree($1,'TK_DBARRA')); $$.addChild(new Node_tree($2,'TK_PUNTO')); }
    |TK_BARRA TK_DPUNTO             { $$ = new Node_tree('ATRIBUTO1',''); $$.addChild(new Node_tree($1,'TK_DBARRA')); $$.addChild(new Node_tree($2,'TK_DPUNTO')); }
    |TK_BARRA TK_PUNTO              { $$ = new Node_tree('ATRIBUTO1',''); $$.addChild(new Node_tree($1,'TK_BARRA')); $$.addChild(new Node_tree($2,'TK_PUNTO')); }
    |                               { $$ = new Node_tree('ATRIBUTO1',''); $$.addChild(new Node_tree('ε','ε')); }
    ;

PALABRAS_R: TK_DBARRA PR TK_DDP OPCION ASTERISCO1   { $$ = new Node_tree('PALABRAS_R',''); $$.addChild(new Node_tree($1,'TK_DBARRA')); $$.addChild($2); $$.addChild(new Node_tree($3,'TK_DDP')); $$.addChild($4); $$.addChild($5); }
    |TK_BARRA PR TK_DDP OPCION  ASTERISCO1          { $$ = new Node_tree('PALABRAS_R',''); $$.addChild(new Node_tree($1,'TK_BARRA'));  $$.addChild($2); $$.addChild(new Node_tree($3,'TK_DDP')); $$.addChild($4); $$.addChild($5); }
    |TK_DBARRA PR TK_DDP OPCION                     { $$ = new Node_tree('PALABRAS_R',''); $$.addChild(new Node_tree($1,'TK_DBARRA')); $$.addChild($2); $$.addChild(new Node_tree($3,'TK_DDP')); $$.addChild($4); }
    |TK_BARRA PR TK_DDP OPCION                      { $$ = new Node_tree('PALABRAS_R',''); $$.addChild(new Node_tree($1,'TK_BARRA'));  $$.addChild($2); $$.addChild(new Node_tree($3,'TK_DDP')); $$.addChild($4); }
    |TK_BARRA PR  TK_PARENTESIS                     { $$ = new Node_tree_tree('PALABRAS_R',''); $$.addChild(new Node_tree_tree($1,'TK_BARRA')); $$.addChild($2); $$.addChild(new Node_tree_tree($3,'TK_PARENTESIS')); }
    |TK_DBARRA PR  TK_PARENTESIS                    { $$ = new Node_tree_tree('PALABRAS_R',''); $$.addChild(new Node_tree_tree($1,'TK_DBARRA')); $$.addChild($2); $$.addChild(new Node_tree_tree($3,'TK_PARENTESIS')); }
    ;

PR: TK_ANCESTOR             { $$ = new Node_tree('PR',''); $$.addChild(new Node_tree($1,'TK_ANCESTOR')); }
    |TK_ANCESTOR_OR_SELF    { $$ = new Node_tree('PR',''); $$.addChild(new Node_tree($1,'TK_ANCESTOR_OR_SELF')); }
    |TK_ATTRIBUTE           { $$ = new Node_tree('PR',''); $$.addChild(new Node_tree($1,'TK_ATTRIBUTE')); }
    |TK_CHILD               { $$ = new Node_tree('PR',''); $$.addChild(new Node_tree($1,'TK_CHILD')); }
    |TK_DESCENDANT          { $$ = new Node_tree('PR',''); $$.addChild(new Node_tree($1,'TK_DESCENDANT')); }
    |TK_DESCENDANT_OR_SELF  { $$ = new Node_tree('PR',''); $$.addChild(new Node_tree($1,'TK_DESCENDANT_OR_SELF')); }
    |TK_FOLLOWING           { $$ = new Node_tree('PR',''); $$.addChild(new Node_tree($1,'TK_FOLLOWING')); }
    |TK_FOLLOWING_SIBLING   { $$ = new Node_tree('PR',''); $$.addChild(new Node_tree($1,'TK_FOLLOWING_SIBLING')); }
    |TK_NAMESPACE           { $$ = new Node_tree('PR',''); $$.addChild(new Node_tree($1,'TK_NAMESPACE')); }
    |TK_PARENT              { $$ = new Node_tree('PR',''); $$.addChild(new Node_tree($1,'TK_PARENT')); }
    |TK_PRECEDING           { $$ = new Node_tree('PR',''); $$.addChild(new Node_tree($1,'TK_PRECEDING')); }
    |TK_PRECEDING_SIBLING   { $$ = new Node_tree('PR',''); $$.addChild(new Node_tree($1,'TK_PRECEDING_SIBLING')); }
    |TK_SELF                { $$ = new Node_tree('PR',''); $$.addChild(new Node_tree($1,'TK_SELF')); }
    |TK_LAST                { $$ = new Node_tree('PR',''); $$.addChild(new Node_tree($1,'TK_LAST')); }
    |TK_POSITION            { $$ = new Node_tree('PR',''); $$.addChild(new Node_tree($1,'TK_POSITION')); }
    |TK_Node                { $$ = new Node_tree('PR',''); $$.addChild(new Node_tree($1,'TK_Node_tree')); }
    |TK_TEXT                { $$ = new Node_tree('PR',''); $$.addChild(new Node_tree($1,'TK_TEXT')); }
    ;


OPCION: TK_LAST TK_PARENTESIS   { $$ = new Node_tree('OPCION',''); $$.addChild(new Node_tree($1,'TK_LAST')); $$.addChild(new Node_tree($2,'TK_PARENTESIS')); }
    |TK_POSITION TK_PARENTESIS  { $$ = new Node_tree('OPCION',''); $$.addChild(new Node_tree($1,'TK_POSITION')); $$.addChild(new Node_tree($2,'TK_PARENTESIS')); }
    |TK_Node TK_PARENTESIS      { $$ = new Node_tree('OPCION',''); $$.addChild(new Node_tree($1,'TK_Node_tree')); $$.addChild(new Node_tree($2,'TK_PARENTESIS')); }
    |TK_TEXT TK_PARENTESIS      { $$ = new Node_tree('OPCION',''); $$.addChild(new Node_tree($1,'TK_TEXT')); $$.addChild(new Node_tree($2,'TK_PARENTESIS')); }
    |TK_IDENTIFICADOR           { $$ = new Node_tree('OPCION',''); $$.addChild(new Node_tree($1,'TK_IDENTIFICADOR')); }
    ;

ASTERISCO:TK_DBARRA TK_POR L_ASTERISCO    { $$ = new Node_tree('ASTERISCO',''); $$.addChild(new Node_tree($1,'TK_DBARRA')); $$.addChild(new Node_tree($2,'TK_POR')); $$.addChild($3); }
    |TK_BARRA TK_POR L_ASTERISCO          { $$ = new Node_tree('ASTERISCO',''); $$.addChild(new Node_tree($1,'TK_BARRA'));  $$.addChild(new Node_tree($2,'TK_POR')); $$.addChild($3); }
    |TK_DBARRA TK_POR                     { $$ = new Node_tree('ASTERISCO',''); $$.addChild(new Node_tree($1,'TK_DBARRA')); $$.addChild(new Node_tree($2,'TK_POR')); }
    |TK_BARRA TK_POR                      { $$ = new Node_tree('ASTERISCO',''); $$.addChild(new Node_tree($1,'TK_BARRA'));  $$.addChild(new Node_tree($2,'TK_POR')); }
    ;

L_ASTERISCO: ASTERISCO1 L_ASTERISCO          { $$ = new Node_tree('L_ASTERISCO',''); $$.addChild($1); $$.addChild($2); }
    |ASTERISCO1                              { $$ = new Node_tree('L_ASTERISCO',''); $$.addChild($1); }
    ;

ASTERISCO1:TK_CORCHETE_IZQUIERDO EXP TK_CORCHETE_DERECHO    { $$ = new Node_tree('ASTERISCO1',''); $$.addChild(new Node_tree($1,'TK_CORCHETE_IZQUIERDO')); $$.addChild($2); $$.addChild(new Node_tree($3,'TK_CORCHETE_DERECHO'));  }
    |TK_IDENTIFICADOR          { $$ = new Node_tree('ASTERISCO1',''); $$.addChild(new Node_tree($1,'TK_IDENTIFICADOR')); }
    ;

EXP:  EXP1 EXP_P                { $$ = new Node_tree('EXP',''); $$.addChild($1); $$.addChild($2); };
EXP_P: TK_MAS EXP1 EXP_P        { $$ = new Node_tree('EXP_P',''); $$.addChild(new Node_tree($1,'TK_MAS')); $$.addChild($2); $$.addChild($3); }
    | TK_MENOS EXP1 EXP_P       { $$ = new Node_tree('EXP_P',''); $$.addChild(new Node_tree($1,'TK_MENOS')); $$.addChild($2); $$.addChild($3); }
    |                           { $$ = new Node_tree('EXP_P',''); $$.addChild(new Node_tree('ε','ε')); } 
    ;
EXP1: EXP2 EXP1_P               { $$ = new Node_tree('EXP1',''); $$.addChild($1); $$.addChild($2); };
EXP1_P:TK_POR EXP2 EXP1_P       { $$ = new Node_tree('EXP1_P',''); $$.addChild(new Node_tree($1,'TK_POR')); $$.addChild($2); $$.addChild($3); }
    | TK_DIVISION EXP2 EXP1_P   { $$ = new Node_tree('EXP1_P',''); $$.addChild(new Node_tree($1,'TK_DIVISION')); $$.addChild($2); $$.addChild($3); }
    | TK_MODULO EXP2 EXP1_P     { $$ = new Node_tree('EXP1_P',''); $$.addChild(new Node_tree($1,'TK_MODULO')); $$.addChild($2); $$.addChild($3); }
    |                           { $$ = new Node_tree('EXP1_P',''); $$.addChild(new Node_tree('ε','ε')); }
    ;
EXP2: EXP3 EXP2_P                   { $$ = new Node_tree('EXP2',''); $$.addChild($1); $$.addChild($2); };
EXP2_P:TK_MENOR EXP3 EXP2_P         { $$ = new Node_tree('EXP2_P',''); $$.addChild(new Node_tree($1,'TK_MENOR')); $$.addChild($2); $$.addChild($3); }
    | TK_MAYOR EXP3 EXP2_P          { $$ = new Node_tree('EXP2_P',''); $$.addChild(new Node_tree($1,'TK_MAYOR')); $$.addChild($2); $$.addChild($3); }
    | TK_MENOR_IGUAL EXP3 EXP2_P    { $$ = new Node_tree('EXP2_P',''); $$.addChild(new Node_tree($1,'TK_MENOR_IGUAL')); $$.addChild($2); $$.addChild($3); }
    | TK_MAYOR_IGUAL EXP3 EXP2_P    { $$ = new Node_tree('EXP2_P',''); $$.addChild(new Node_tree($1,'TK_MAYOR_IGUAL')); $$.addChild($2); $$.addChild($3); }
    | TK_IGUALDAD EXP3 EXP2_P       { $$ = new Node_tree('EXP2_P',''); $$.addChild(new Node_tree($1,'TK_IGUALDAD')); $$.addChild($2); $$.addChild($3); }
    | TK_DESIGUALDAD EXP3 EXP2_P    { $$ = new Node_tree('EXP2_P',''); $$.addChild(new Node_tree($1,'TK_DESIGUALDAD')); $$.addChild($2); $$.addChild($3); }
    |                               { $$ = new Node_tree('EXP2_P',''); $$.addChild(new Node_tree('ε','ε')); }
    ;
EXP3: EXP4 EXP3_P                       { $$ = new Node_tree('EXP3',''); $$.addChild($1); $$.addChild($2); };
EXP3_P: TK_OR EXP4 EXP3_P               { $$ = new Node_tree('EXP3_P',''); $$.addChild(new Node_tree($1,'TK_OR')); $$.addChild($2); $$.addChild($3); }
    | TK_AND EXP4 EXP3_P                { $$ = new Node_tree('EXP3_P',''); $$.addChild(new Node_tree($1,'TK_AND')); $$.addChild($2); $$.addChild($3); }
    | TK_BARRA_VERTICAL EXP4 EXP3_P     { $$ = new Node_tree('EXP3_P',''); $$.addChild(new Node_tree($1,'TK_BARRA_VERTICAL')); $$.addChild($2); $$.addChild($3); }
    |                                   { $$ = new Node_tree('EXP3_P',''); $$.addChild(new Node_tree('ε','ε')); }
    ;
EXP4: TK_PARENTESIS_IZQUIERDO EXP TK_PARENTESIS_DERECHO  { $$ = new Node_tree('EXP4',''); $$.addChild(new Node_tree($1,'TK_PARENTESIS_IZQUIERDO')); $$.addChild($2); $$.addChild(new Node_tree($3,'TK_PARENTESIS_DERECHO')); }
    | ATRI                                               { $$ = new Node_tree('EXP4',''); $$.addChild($1); }
    | TK_ARROBA EXP                                      { $$ = new Node_tree('EXP4',''); $$.addChild(new Node_tree($1,'TK_ARROBA')); $$.addChild($2); }
    | TK_DECIMAL                                         { $$ = new Node_tree('EXP4',''); $$.addChild(new Node_tree($1,'TK_DECIMAL')); }
    | TK_ENTERO                                          { $$ = new Node_tree('EXP4',''); $$.addChild(new Node_tree($1,'TK_ENTERO')); }
    | TK_CADENA                                          { $$ = new Node_tree('EXP4',''); $$.addChild(new Node_tree($1,'TK_CADENA')); }
    | TK_IDENTIFICADOR                                   { $$ = new Node_tree('EXP4',''); $$.addChild(new Node_tree($1,'TK_IDENTIFICADOR')); }
    | TK_POSITION TK_PARENTESIS                          { $$ = new Node_tree('EXP4',''); $$.addChild(new Node_tree($1,'TK_POSITION')); $$.addChild(new Node_tree($2,'TK_PARENTESIS')); }
    | TK_LAST TK_PARENTESIS                              { $$ = new Node_tree('EXP4',''); $$.addChild(new Node_tree($1,'TK_LAST')); $$.addChild(new Node_tree($2,'TK_PARENTESIS'));}
    | PAL_RE                                             { $$ = new Node_tree('EXP4',''); $$.addChild($1); }
    ;


PAL_RE: PR TK_DDP OPCION { $$ = new Node_tree('PAL_RE',''); $$.addChild($1); $$.addChild(new Node_tree($2,'TK_DDP')); $$.addChild($3); };

ATRI: TK_ARROBA TK_POR L_ATRI { $$ = new Node_tree('ATRI',''); $$.addChild(new Node_tree($1,'TK_ARROBA')); $$.addChild(new Node_tree($2,'TK_POR')); $$.addChild($3); };

L_ATRI: ATRI1 L_ATRI { $$ = new Node_tree('L_ATRI',''); $$.addChild($1); $$.addChild($2); }
    |ATRI1          { $$ = new Node_tree('L_ATRI',''); $$.addChild($1); }
    ;

ATRI1: TK_DBARRA TK_DPUNTO      { $$ = new Node_tree('ATRI1',''); $$.addChild(new Node_tree($1,'TK_DBARRA')); $$.addChild(new Node_tree($2,'TK_DPUTNO')); }
    |TK_DBARRA TK_PUNTO         { $$ = new Node_tree('ATRI1',''); $$.addChild(new Node_tree($1,'TK_BARRA'));  $$.addChild(new Node_tree($2,'TK_PUTNO')); }
    |TK_BARRA TK_DPUNTO         { $$ = new Node_tree('ATRI1',''); $$.addChild(new Node_tree($1,'TK_DBARRA')); $$.addChild(new Node_tree($2,'TK_DPUTNO')); }
    |TK_BARRA TK_PUNTO          { $$ = new Node_tree('ATRI1',''); $$.addChild(new Node_tree($1,'TK_BARRA'));  $$.addChild(new Node_tree($2,'TK_PUTNO')); }
    |                           { $$ = new Node_tree('ATRI1',''); $$.addChild(new Node_tree('ε','ε')); }         
    ;

/*FIN DE LA GRAMATICA */