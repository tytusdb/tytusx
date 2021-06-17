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
"("      return 'TK_PARENTESIS_IZQUIERDO';
")"      return 'TK_PARENTESIS_DERECHO';
"["      return 'TK_CORCHETE_IZQUIERDO';
"]"      return 'TK_CORCHETE_DERECHO';
"::"     return 'TK_DDP';
"//"     return 'TK_DBARRA'
"/"      return 'TK_BARRA'
"@"      return 'TK_ARROBA'
".."     return 'TK_DPUNTO'
"."      return 'TK_PUNTO'

/*PALABRAS RESERVADAS */
"ancestor"               return 'TK_ANCESTOR'
"ancestor-or-self"      return 'TK_ANCESTOR_OR_SELF'
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

.           Errores.Error.add(new CNodoError.NodoError("Lexico","No se esperaba el caracter: "+yytext,yylineno))

/lex
/*ANALISIS LEXICO TERMINADO */

//SECCION DE IMPORTS
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
%start S
%%
/*INICIO DE LA GRAMATICA */
S: LISTA EOF { $$ = new Node('S'); $$.addChild($1); return $$; };

LISTA: PUNTO              { $$ = new Node('LISTA'); $$.addChild($1); }
    |  LISTAS             { $$ = new Node('LISTA'); $$.addChild($1); }
    ;

LISTAS: LISTAS LISTA1   { $$ = new Node('LISTAS'); $$.addChild($1); $$.addChild($2); }
    |LISTA1             { $$ = new Node('LISTAS'); $$.addChild($1); }
    ;

LISTA1:ATRIBUTO BARRAS LISTA1   { $$ = new Node('LISTA1'); $$.addChild($1); $$.addChild($2); $$.addChild($3); }
    |ASTERISCO BARRAS LISTA1    { $$ = new Node('LISTA1'); $$.addChild($1); $$.addChild($2); $$.addChild($3); }
    |PALABRAS_R BARRAS LISTA1   { $$ = new Node('LISTA1'); $$.addChild($1); $$.addChild($2); $$.addChild($3); }
    |IDS BARRAS LISTA1          { $$ = new Node('LISTA1'); $$.addChild($1); $$.addChild($2); $$.addChild($3); } 
    |ATRIBUTO                   { $$ = new Node('LISTA1'); $$.addChild($1); }
    |ATRIBUTO1                  { $$ = new Node('LISTA1'); $$.addChild($1); }
    |PR  TK_PARENTESIS          { $$ = new Node('LISTA1'); $$.addChild($1); $$.addChild(new Node($2,'TK_PARENTESIS')); }
    |PALABRAS_R                 { $$ = new Node('LISTA1'); $$.addChild($1); }
    |IDS                        { $$ = new Node('LISTA1'); $$.addChild($1); }
    |ASTERISCO                  { $$ = new Node('LISTA1'); $$.addChild($1); }    
    |                           { $$ = new Node('LISTA1'); $$.addChild(new Node('ε','ε')); }
    |error                      {Errores.Error.add(new CNodoError.NodoError("Sintactico","No se esperaba el caracter: "+yytext,yylineno))}
    ;

BARRAS: TK_BARRA_VERTICAL   { $$ = new Node('BARRAS'); $$.addChild(new Node($1,'TK_BARRA_VERTICAL')); }
    |TK_AND                 { $$ = new Node('BARRAS'); $$.addChild(new Node($1,'TK_AND')); }
    |TK_OR                  { $$ = new Node('BARRAS'); $$.addChild(new Node($1,'TK_OR')); }
    ;

PUNTO: TK_PUNTO PUNTO1          { $$ = new Node('PUNTO'); $$.addChild(new Node($1,'TK_PUNTO')); $$.addChild($2); }
    |error                      {Errores.Error.add(new CNodoError.NodoError("Sintactico","No se esperaba el caracter: "+yytext,yylineno))}
    ;

PUNTO1: LISTAS                  { $$ = new Node('PUNTO1'); $$.addChild($1); }
    |error                      {Errores.Error.add(new CNodoError.NodoError("Sintactico","No se esperaba el caracter: "+yytext,yylineno))}
    ;

IDS: TK_DBARRA TK_IDENTIFICADOR ASTERISCO1      { $$ = new Node('IDS'); $$.addChild(new Node($1,'TK_DBARRA')); $$.addChild(new Node($2,'TK_IDENTIFICADOR')); $$.addChild($3); }
    |TK_BARRA TK_IDENTIFICADOR  ASTERISCO1      { $$ = new Node('IDS'); $$.addChild(new Node($1,'TK_BARRA'));  $$.addChild(new Node($2,'TK_IDENTIFICADOR')); $$.addChild($3); }
    |TK_DBARRA TK_IDENTIFICADOR                 { $$ = new Node('IDS'); $$.addChild(new Node($1,'TK_DBARRA')); $$.addChild(new Node($2,'TK_IDENTIFICADOR')); }
    |TK_BARRA TK_IDENTIFICADOR                  { $$ = new Node('IDS'); $$.addChild(new Node($1,'TK_BARRA'));  $$.addChild(new Node($2,'TK_IDENTIFICADOR')); }
    |TK_IDENTIFICADOR                           { $$ = new Node('IDS'); $$.addChild(new Node($1,'TK_IDENTIFICADOR')); }
    ;

ATRIBUTO: TK_DBARRA TK_ARROBA TK_POR L_ATRIBUTO             { $$ = new Node('ATRIBUTO'); $$.addChild(new Node($1,'TK_DBARRA')); $$.addChild(new Node($2,'TK_ARROBA')); $$.addChild(new Node($3,'TK_POR')); $$.addChild($4); }
    |TK_BARRA TK_ARROBA TK_POR L_ATRIBUTO                   { $$ = new Node('ATRIBUTO'); $$.addChild(new Node($1,'TK_BARRA'));  $$.addChild(new Node($2,'TK_ARROBA')); $$.addChild(new Node($3,'TK_POR')); $$.addChild($4); } 
    |TK_ARROBA TK_POR  L_ATRIBUTO                           { $$ = new Node('ATRIBUTO'); $$.addChild(new Node($1,'TK_ARROBA')); $$.addChild(new Node($2,'TK_POR'));    $$.addChild($3); }    
    |TK_DBARRA TK_ARROBA TK_IDENTIFICADOR L_ATRIBUTO        { $$ = new Node('ATRIBUTO'); $$.addChild(new Node($1,'TK_DBARRA')); $$.addChild(new Node($2,'TK_ARROBA')); $$.addChild(new Node($3,'TK_IDENTIFICADOR')); $$.addChild($4); }
    |TK_BARRA TK_ARROBA TK_IDENTIFICADOR L_ATRIBUTO         { $$ = new Node('ATRIBUTO'); $$.addChild(new Node($1,'TK_DBARRA')); $$.addChild(new Node($2,'TK_ARROBA')); $$.addChild(new Node($3,'TK_IDENTIFICADOR')); $$.addChild($4); } 
    |TK_ARROBA TK_IDENTIFICADOR L_ATRIBUTO                  { $$ = new Node('ATRIBUTO'); $$.addChild(new Node($1,'TK_ARROBA')); $$.addChild(new Node($2,'TK_IDENTIFICADOR')); $$.addChild($3);}     
    ;

L_ATRIBUTO: L_ATRIBUTO ATRIBUTO1    { $$ = new Node('L_ATRIBUTO'); $$.addChild($1); $$.addChild($2); }
    |ATRIBUTO1                      { $$ = new Node('L_ATRIBUTO'); $$.addChild($1); }
    ;


ATRIBUTO1: TK_DBARRA  TK_DPUNTO     { $$ = new Node('ATRIBUTO1'); $$.addChild(new Node($1,'TK_DBARRA')); $$.addChild(new Node($2,'TK_DPUNTO')); }
    |TK_DBARRA TK_PUNTO             { $$ = new Node('ATRIBUTO1'); $$.addChild(new Node($1,'TK_DBARRA')); $$.addChild(new Node($2,'TK_PUNTO')); }
    |TK_BARRA TK_DPUNTO             { $$ = new Node('ATRIBUTO1'); $$.addChild(new Node($1,'TK_BARRA'));  $$.addChild(new Node($2,'TK_DPUNTO')); }
    |TK_BARRA TK_PUNTO              { $$ = new Node('ATRIBUTO1'); $$.addChild(new Node($1,'TK_BARRA'));  $$.addChild(new Node($2,'TK_PUNTO')); }
    |                               { $$ = new Node('ATRIBUTO1'); $$.addChild(new Node('ε','ε')); }
    ;

PALABRAS_R: TK_DBARRA PR TK_DDP OPCION ASTERISCO1       { $$ = new Node('PALABRAS_R'); $$.addChild(new Node($1,'TK_DBARRA')); $$.addChild($2); $$.addChild(new Node($3,'TK_DDP')); $$.addChild($4); $$.addChild($5); }
    |TK_BARRA PR TK_DDP OPCION  ASTERISCO1              { $$ = new Node('PALABRAS_R'); $$.addChild(new Node($1,'TK_DBARRA')); $$.addChild($2); $$.addChild(new Node($3,'TK_DDP')); $$.addChild($4); $$.addChild($5); }
    |TK_DBARRA PR TK_DDP OPCION                         { $$ = new Node('PALABRAS_R'); $$.addChild(new Node($1,'TK_DBARRA')); $$.addChild($2); $$.addChild(new Node($3,'TK_DDP')); $$.addChild($4); }
    |TK_BARRA PR TK_DDP OPCION                          { $$ = new Node('PALABRAS_R'); $$.addChild(new Node($1,'TK_DBARRA')); $$.addChild($2); $$.addChild(new Node($3,'TK_DDP')); $$.addChild($4); }    
    ;

PR: TK_ANCESTOR             { $$ = new Node('PR'); $$.addChild(new Node($1,'TK_DBARRA')); }
    |TK_ANCESTOR_OR_SELF    { $$ = new Node('PR'); $$.addChild(new Node($1,'TK_DBARRA')); }
    |TK_ATTRIBUTE           { $$ = new Node('PR'); $$.addChild(new Node($1,'TK_DBARRA')); }
    |TK_CHILD               { $$ = new Node('PR'); $$.addChild(new Node($1,'TK_DBARRA')); }
    |TK_DESCENDANT          { $$ = new Node('PR'); $$.addChild(new Node($1,'TK_DBARRA')); }
    |TK_DESCENDANT_OR_SELF  { $$ = new Node('PR'); $$.addChild(new Node($1,'TK_DBARRA')); }
    |TK_FOLLOWING           { $$ = new Node('PR'); $$.addChild(new Node($1,'TK_DBARRA')); }
    |TK_FOLLOWING_SIBLING   { $$ = new Node('PR'); $$.addChild(new Node($1,'TK_DBARRA')); }
    |TK_NAMESPACE           { $$ = new Node('PR'); $$.addChild(new Node($1,'TK_DBARRA')); }
    |TK_PARENT              { $$ = new Node('PR'); $$.addChild(new Node($1,'TK_DBARRA')); }
    |TK_PRECEDING           { $$ = new Node('PR'); $$.addChild(new Node($1,'TK_DBARRA')); }
    |TK_PRECEDING_SIBLING   { $$ = new Node('PR'); $$.addChild(new Node($1,'TK_DBARRA')); }
    |TK_SELF                { $$ = new Node('PR'); $$.addChild(new Node($1,'TK_DBARRA')); }
    |TK_LAST                { $$ = new Node('PR'); $$.addChild(new Node($1,'TK_DBARRA')); }
    |TK_POSITION            { $$ = new Node('PR'); $$.addChild(new Node($1,'TK_DBARRA')); }
    |TK_NODE                { $$ = new Node('PR'); $$.addChild(new Node($1,'TK_DBARRA')); }
    |TK_TEXT                { $$ = new Node('PR'); $$.addChild(new Node($1,'TK_DBARRA')); }
    |error                  {Errores.Error.add(new CNodoError.NodoError("Sintactico","No se esperaba el caracter: "+yytext,yylineno));}
    ;

OPCION: TK_LAST TK_PARENTESIS   { $$ = new Node('OPCION'); $$.addChild(new Node($1,'TK_LAST')); $$.addChild(new Node($2,'TK_PARENTESIS')); }
    |TK_POSITION TK_PARENTESIS  { $$ = new Node('OPCION'); $$.addChild(new Node($1,'TK_POSITION')); $$.addChild(new Node($2,'TK_PARENTESIS')); }
    |TK_NODE TK_PARENTESIS      { $$ = new Node('OPCION'); $$.addChild(new Node($1,'TK_NODE')); $$.addChild(new Node($2,'TK_PARENTESIS')); }
    |TK_TEXT TK_PARENTESIS      { $$ = new Node('OPCION'); $$.addChild(new Node($1,'TK_TEXT')); $$.addChild(new Node($2,'TK_PARENTESIS')); }
    |TK_IDENTIFICADOR           { $$ = new Node('OPCION'); $$.addChild(new Node($1,'TK_IDENTIFICADOR')); }
    ;

ASTERISCO:TK_PUNTO TK_DBARRA TK_POR L_ASTERISCO         { $$ = new Node('OPCION'); $$.addChild(new Node($1,'TK_PUNTO'));  $$.addChild(new Node($2,'TK_DBARRA')); $$.addChild(new Node($3,'TK_POR')); $$.addChild($4); }
    |TK_PUNTO TK_BARRA TK_POR L_ASTERISCO               { $$ = new Node('OPCION'); $$.addChild(new Node($1,'TK_PUNTO'));  $$.addChild(new Node($2,'TK_BARRA'));  $$.addChild(new Node($3,'TK_POR')); $$.addChild($4); }
    |TK_DBARRA TK_POR L_ASTERISCO                       { $$ = new Node('OPCION'); $$.addChild(new Node($1,'TK_DBARRA')); $$.addChild(new Node($2,'TK_POR'));    $$.addChild($3); }
    |TK_BARRA TK_POR L_ASTERISCO                        { $$ = new Node('OPCION'); $$.addChild(new Node($1,'TK_BARRA'));  $$.addChild(new Node($2,'TK_POR'));    $$.addChild($3); }
    |TK_PUNTO TK_DBARRA TK_POR                          { $$ = new Node('OPCION'); $$.addChild(new Node($1,'TK_PUNTO'));  $$.addChild(new Node($2,'TK_DBARRA')); $$.addChild(new Node($3,'TK_POR')); }
    |TK_PUNTO TK_BARRA TK_POR                           { $$ = new Node('OPCION'); $$.addChild(new Node($1,'TK_PUNTO'));  $$.addChild(new Node($2,'TK_BARRA'));  $$.addChild(new Node($3,'TK_POR')); }
    |TK_DBARRA TK_POR                                   { $$ = new Node('OPCION'); $$.addChild(new Node($1,'TK_DBARRA')); $$.addChild(new Node($2,'TK_POR')); }
    |TK_BARRA TK_POR                                    { $$ = new Node('OPCION'); $$.addChild(new Node($1,'TK_BARRA'));  $$.addChild(new Node($2,'TK_POR'));}
    ;

L_ASTERISCO: L_ASTERISCO ASTERISCO1          { $$ = new Node('L_ASTERISCO'); $$.addChild($1); $$.addChild($2); }
    |ASTERISCO1                              { $$ = new Node('L_ASTERISCO'); $$.addChild($1); }
    ;

ASTERISCO1:TK_CORCHETE_IZQUIERDO EXP TK_CORCHETE_DERECHO    {}
    |TK_CORCHETE_IZQUIERDO EXP TK_CORCHETE_DERECHO          {}
    ;
    //QUITAR LA ambigüedad


EXP: EXP TK_MAS EXP                                     { $$ = new Node('EXP',''); $$.addChild($1); $$.addChild(new Node($2,'TK_MAS')); $$.addChild($3); }
    |EXP TK_MENOS EXP                                   { $$ = new Node('EXP',''); $$.addChild($1); $$.addChild(new Node($2,'TK_MENOS')); $$.addChild($3); }
    |EXP TK_POR EXP                                     { $$ = new Node('EXP',''); $$.addChild($1); $$.addChild(new Node($2,'TK_POR')); $$.addChild($3) }    
    |EXP TK_DIVISION EXP                                { $$ = new Node('EXP',''); $$.addChild($1); $$.addChild(new Node($2,'TK_DIVISION')); $$.addChild($3); }
    |EXP TK_MODULO EXP                                  { $$ = new Node('EXP',''); $$.addChild($1); $$.addChild(new Node($2,'TK_MODULO')); $$.addChild($3); }
    |EXP TK_IGUALDAD EXP                                { $$ = new Node('EXP',''); $$.addChild($1); $$.addChild(new Node($2,'TK_IGUALDAD')); $$.addChild($3); }
    |EXP TK_DESIGUALDAD EXP                             { $$ = new Node('EXP',''); $$.addChild($1); $$.addChild(new Node($2,'TK_DESIGUALDAD')); $$.addChild($3); }
    |EXP TK_MENOR EXP                                   { $$ = new Node('EXP',''); $$.addChild($1); $$.addChild(new Node($2,'TK_MENOR')); $$.addChild($3); }
    |EXP TK_MENOR_IGUAL EXP                             { $$ = new Node('EXP',''); $$.addChild($1); $$.addChild(new Node($2,'TK_MENOR_IGUAL')); $$.addChild($3); }
    |EXP TK_MAYOR EXP                                   { $$ = new Node('EXP',''); $$.addChild($1); $$.addChild(new Node($2,'TK_MAYOR')); $$.addChild($3); }
    |EXP TK_MAYOR_IGUAL EXP                             { $$ = new Node('EXP',''); $$.addChild($1); $$.addChild(new Node($2,'TK_MAYOR_IGUAL')); $$.addChild($3);}
    |EXP TK_OR EXP                                      { $$ = new Node('EXP',''); $$.addChild($1); $$.addChild(new Node($2,'TK_OR')); $$.addChild($3); }
    |EXP TK_AND EXP                                     { $$ = new Node('EXP',''); $$.addChild($1); $$.addChild(new Node($2,'TK_AND')); $$.addChild($3); }
    |EXP TK_BARRA_VERTICAL EXP                          { $$ = new Node('EXP',''); $$.addChild($1); $$.addChild(new Node($2,'TK_BARRA_VERTICAL')); $$.addChild($3); } 
    |TK_PARENTESIS_IZQUIERDO EXP TK_PARENTESIS_DERECHO  { $$ = new Node('EXP',''); $$.addChild(new Node($1,'TK_PARENTESIS_IZQUIERDO')); $$.addChild($2); $$.addChild(new Node($3,'TK_PARENTESIS_DERECHO')); }
    |TK_MENOS EXP %prec UMINUS                          { $$ = new Node('EXP',''); $$.addChild(new Node($1,'TK_MENOS')); $$.addChild($2); }
    |ATRI                                               { $$ = new Node('EXP',''); $$.addChild($1); }
    |TK_ARROBA EXP                                      { $$ = new Node('EXP',''); $$.addChild(new Node($1,'TK_ARROBA')); $$.addChild($2); }
    |TK_DECIMAL                                         { $$ = new Node('EXP',''); $$.addChild(new Node($1,'TK_DECIMAL')); }
    |TK_ENTERO                                          { $$ = new Node('EXP',''); $$.addChild(new Node($1,'TK_ENTERO')); }
    |TK_CADENA                                          { $$ = new Node('EXP',''); $$.addChild(new Node($1,'TK_CADENA' )); }
    |TK_IDENTIFICADOR TK_DBARRA                         { $$ = new Node('EXP',''); $$.addChild(new Node($1,'TK_IDENTIFICADOR')); $$.addChild(new Node($2,'TK_DBARRA')); } 
    |TK_IDENTIFICADOR                                   { $$ = new Node('EXP',''); $$.addChild(new Node($1,'TK_IDENTIFICADOR')); }
    |TK_POSITION TK_PARENTESIS                          { $$ = new Node('EXP',''); $$.addChild(new Node($1,'TK_POSITION')); $$.addChild(new Node($2,'TK_PARENTESIS')); }
    |TK_LAST TK_PARENTESIS                              { $$ = new Node('EXP',''); $$.addChild(new Node($1,'TK_LAST')); $$.addChild(new Node($2,'TK_PARENTESIS')); }
    |PAL_RE                                             { $$ = new Node('EXP',''); $$.addChild($1);}   
    ;

    /*REVISAR ATRI Y PAL_RE QUE NO JALA MUY BIEN PERO TENIA SUEÑO GG SORRY*/

PAL_RE: PR TK_DDP OPCION { $$ = new Node('PAL_RE',''); $$.addChild($1); $$.addChild(new Nodo_Tree($1,'TK_DDP')); $$.addChild($3); };

ATRI: TK_ARROBA TK_POR L_ATRI { $$ = new Node('ATRI',''); $$.addChild(new Nodo_Tree($1,'TK_ARROBA')); $$.addChild(new Nodo_Tree($2,'TK_POR')); $$.addChild($3); };

L_ATRI:L_ATRI ATRI1 { $$ = new Node('L_ATRI',''); $$.addChild($1); $$.addChild($2); }
    |ATRI1          { $$ = new Node('L_ATRI',''); $$.addChild($1); }
    ;

ATRI1: TK_DBARRA TK_DPUNTO      { $$ = new Node('ATRI1',''); $$.addChild(new Node($1,'TK_DBARRA')); $$.addChild(new Node($2,'TK_DPUNTO')); }
    |TK_DBARRA TK_PUNTO         { $$ = new Node('ATRI1',''); $$.addChild(new Node($1,'TK_DBARRA')); $$.addChild(new Node($2,'TK_PUNTO'));  }
    |TK_BARRA TK_DPUNTO         { $$ = new Node('ATRI1',''); $$.addChild(new Node($1,'TK_BARRA'));  $$.addChild(new Node($2,'TK_DPUNTO')); }
    |TK_BARRA TK_PUNTO          { $$ = new Node('ATRI1',''); $$.addChild(new Node($1,'TK_BARRA'));  $$.addChild(new Node($2,'TK_PUNTO'));  }
    |                           { $$ = new Node('ATRI1',''); $$.addChild(new Node('ε','ε')); }         
    ;


/*FIN DE LA GRAMATICA ε*/