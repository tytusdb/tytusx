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

.           Error.add(new NodoError("Lexico","No se esperaba el caracter: "+yytext,yylineno))

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
S: LISTA EOF {$$=$1; ReporteGA.agregar('S::=LISTA','S.VAL = LISTA.VAL',''); return $$;};

LISTA: PUNTO              {$$=$1; ReporteGA.agregar('LISTA::=PUNTO','LISTA.VAL = PUNTO.VAL','');}
    |  LISTAS             {$$=$1; ReporteGA.agregar('LISTA::=LISTAS','LISTA.VAL = LISTAS.VAL','');}
    ;

LISTAS: LISTAS LISTA1   {$1.push($2); $$=$1; ReporteGA.agregar('LISTAS::=LISTASLISTA1','LISTAS.VAL = LISTAS.VAL + LISTA1.VAL','');}
    |LISTA1             {$$=[$1]; ReporteGA.agregar('LISTAS::=LISTA1','LISTAS.VAL = LISTA1.VAL','');}
    ;

LISTA1:IDS BARRAS LISTA1            {$$=$3; ReporteGA.agregar('LISTA1::=IDS','LISTA1.VAL = IDS.VAL','');}
    |ATRIBUTO BARRAS LISTA1         {$$=$3; ReporteGA.agregar('LISTA1::=ATRIBUTO','LISTA1.VAL = ATRIBUTO.VAL','');}
    |ASTERISCO BARRAS LISTA1        {$$=$3; ReporteGA.agregar('LISTA1::=ASTERISCO','LISTA1.VAL = ASTERISCO.VAL','');}
    |PALABRAS_R BARRAS LISTA1       {$$=$3; ReporteGA.agregar('LISTA1::=PALABRAS_R','LISTA1.VAL = PALABRAS_R.VAL','');}
    |ATRIBUTO1 BARRAS LISTA1        {$$=$1; ReporteGA.agregar('LISTA1::=ATRIBUTO1','LISTA1.VAL = ATRIBUTO1.VAL','');}
    |PR TK_PARENTESIS BARRAS LISTA1 {$$=$1; ReporteGA.agregar('LISTA1::=PR','LISTA1.VAL = PR.VAL','');}
    |IDS                            {$$=$1; ReporteGA.agregar('LISTA1::=IDS','LISTA1.VAL = IDS.VAL','');}
    |ATRIBUTO                       {$$=$1; ReporteGA.agregar('LISTA1::=ATRIBUTO','LISTA1.VAL = ATRIBUTO.VAL','');}
    |ATRIBUTO1                      {$$=$1; ReporteGA.agregar('LISTA1::=ATRIBUTO1','LISTA1.VAL = ATRIBUTO1.VAL','');}
    |PR  TK_PARENTESIS              {$$=$1; ReporteGA.agregar('LISTA1::=PR','LISTA1.VAL = PR.VAL','');}
    |PALABRAS_R                     {$$=$1; ReporteGA.agregar('LISTA1::=PALABRAS_R','LISTA1.VAL = PALABRAS_R.VAL','');}
    |ASTERISCO                      {$$=$1; ReporteGA.agregar('LISTA1::=ASTERISCO','LISTA1.VAL = ASTERISCO.VAL','');}
    |                               {ReporteGA.agregar('LISTA1::=ε','LISTA1.VAL = EPSILON','');}
    |error                          {Error.add(new NodoError("Sintactico","No se esperaba el caracter: "+yytext,yylineno))}
    ;

BARRAS: TK_BARRA_VERTICAL {$$=$1}
    |TK_AND {$$ = $1}
    |TK_OR {$$ = $1};

PUNTO: TK_PUNTO PUNTO1          {$$=$2; ReporteGA.agregar('PUNTO::=tk_punto PUNTO1','PUNTO.VAL = TK_PUNTO + PUNTO1.VAL','');}
    |error                      {Error.add(new NodoError("Sintactico","No se esperaba el caracter: "+yytext,yylineno))}
    ;

PUNTO1: LISTAS                  {$$=$1; ReporteGA.agregar('PUNTO1::=LISTAS','PUNTO1.VAL = LISTAS.VAL','');}
    |error                      {Error.add(new NodoError("Sintactico","No se esperaba el caracter: "+yytext,yylineno))}
    ;

IDS: TK_DBARRA TK_IDENTIFICADOR ASTERISCO1      {$$ = new Conca('&',$1,$2,$3,@1.first_line,@1.first_column); ReporteGA.agregar('IDS::=tk_dbarra tk_identificador ASTERISCO1','IDS.VAL = TK_DBARRA.VAL + TK_IDENTIFICADOR.VAL + ASTERISCO1.VAL','');}
    |TK_BARRA TK_IDENTIFICADOR  ASTERISCO1      {$$ = new Conca('&',$1,$2,$3,@1.first_line,@1.first_column); ReporteGA.agregar('IDS::=tk_barra tk_identificador ASTERISCO1','IDS.VAL = TK_BARRA.VAL + TK_IDENTIFICADOR.VAL +  ASTERISCO1.VAL','');}
    |TK_DBARRA TK_IDENTIFICADOR                 {$$ = new Conca('.',$1,$2,new Dato('',@1.first_line,@1.first_column),@1.first_line,@1.first_column); ReporteGA.agregar('IDS::=tk_dbarra tk_identificador','IDS.VAL = TK_DBARRA.VAL + TK_IDENTIFICADOR.VAL','');}
    |TK_BARRA TK_IDENTIFICADOR                  {$$ = new Conca('.',$1,$2,new Dato('',@1.first_line,@1.first_column),@1.first_line,@1.first_column); ReporteGA.agregar('IDS::=tk_barra tk_identificador','IDS.VAL = TK_BARRA.VAL + TK_IDENTIFICADOR.VAL','');}
    |TK_IDENTIFICADOR                           {$$ = new Conca('.','',$1,new Dato('',@1.first_line,@1.first_column),@1.first_line,@1.first_column); ReporteGA.agregar('IDS::=tk_identificador','IDS.VAL = TK_IDENTIFICADOR.VAL  ','');}
    ;

ATRIBUTO: TK_DBARRA TK_ARROBA TK_POR L_ATRIBUTO     {$$ = new Conca('?',$1,$2+$3,new L_Atributo($4,@4.first_line,@4.first_column),@1.first_line,@1.first_column); ReporteGA.agregar('ATRIBUTO::=tk_dbarra tk_arroba tk_por L_ATRIBUTO','ATRIBUTO.VAL = TK_DBARRA.VAL + TK_ARROBA.VAL + TK_POR.VAL + L_ATRIBUTO.VAL','');}
    |TK_BARRA TK_ARROBA TK_POR L_ATRIBUTO           {$$ = new Conca('?',$1,$2+$3,new L_Atributo($4,@4.first_line,@4.first_column),@1.first_line,@1.first_column); ReporteGA.agregar('ATRIBUTO::=tk_barra tk_arroba tk_por L_ATRIBUTO','ATRIBUTO.VAL = TK_BARRA.VAL + TK_ARROBA.VAL + TK_POR.VAL + L_ATRIBUTO.VAL','');} 
    |TK_ARROBA TK_POR  L_ATRIBUTO                   {$$ = new Conca('?','',$1+$2,new L_Atributo($3,@3.first_line,@3.first_column),@1.first_line,@1.first_column); ReporteGA.agregar('ATRIBUTO::=tk_arroba tk_por L_ATRIBUTO','ATRIBUTO.VAL = TK_ARROBA.VAL + TK_POR.VAL + L_ATRIBUTO.VAL','');}
    |TK_DBARRA TK_ARROBA TK_IDENTIFICADOR L_ATRIBUTO{$$ = new Conca('?',$1,$2+$3,new L_Atributo($4,@4.first_line,@4.first_column),@1.first_line,@1.first_column); ReporteGA.agregar('ATRIBUTO::=tk_dbarra tk_arroba tk_por L_ATRIBUTO','ATRIBUTO.VAL = TK_DBARRA.VAL + TK_ARROBA.VAL + TK_IDENTIFICADOR.VAL + L_ATRIBUTO.VAL','');}
    |TK_BARRA TK_ARROBA TK_IDENTIFICADOR L_ATRIBUTO {$$ = new Conca('?',$1,$2+$3,new L_Atributo($4,@4.first_line,@4.first_column),@1.first_line,@1.first_column); ReporteGA.agregar('ATRIBUTO::=tk_barra tk_arroba tk_por L_ATRIBUTO','ATRIBUTO.VAL = TK_BARRA.VAL + TK_ARROBA.VAL + TK_IDENTIFICADOR.VAL + L_ATRIBUTO.VAL','');} 
    |TK_ARROBA TK_IDENTIFICADOR  L_ATRIBUTO         {$$ = new Conca('?','',$1+$2,new L_Atributo($3,@3.first_line,@3.first_column),@1.first_line,@1.first_column); ReporteGA.agregar('ATRIBUTO::=tk_arroba tk_por L_ATRIBUTO','ATRIBUTO.VAL = TK_ARROBA.VAL + TK_IDENTIFICADOR.VAL + L_ATRIBUTO.VAL','');}
     
    ;

L_ATRIBUTO: L_ATRIBUTO ATRIBUTO1    {$1.push($2); $$=$1; ReporteGA.agregar('L_ATRIBUTO::=L_ATRIBUTO ATRIBUTO1','L_ATRIBUTO.VAL = L_ATRIBUTO.VAL + ATRIBUTO1.VAL','');}
    |ATRIBUTO1                      {$$=[$1]; ReporteGA.agregar('L_ATRIBUTO::=ATRIBUTO1','L_ATRIBUTO.VAL = ATRIBUTO1.VAL','');}
    ;


ATRIBUTO1: TK_DBARRA  TK_DPUNTO     {$$ = new AtributoXpath($1,$2,@1.first_line,@1.first_column); ReporteGA.agregar('ATRIBUTO1::=tk_dbarra tk_dpunto','ATRIBUTO1.VAL = TK_DBARRA.VAL + TK_DPUNTO.VAL','');}
    |TK_DBARRA TK_PUNTO             {$$ = new AtributoXpath($1,$2,@1.first_line,@1.first_column); ReporteGA.agregar('ATRIBUTO1::=tk_dbarra tk_punto','ATRIBUTO1.VAL = TK_DBARRA.VAL + TK_PUNTO.VAL','');}
    |TK_BARRA TK_DPUNTO             {$$ = new AtributoXpath($1,$2,@1.first_line,@1.first_column); ReporteGA.agregar('ATRIBUTO1::=tk_barra tk_dpunto','ATRIBUTO1.VAL = TK_BARRA.VAL + TK_DPUNTO.VAL','');}
    |TK_BARRA TK_PUNTO              {$$ = new AtributoXpath($1,$2,@1.first_line,@1.first_column); ReporteGA.agregar('ATRIBUTO1::=tk_barra tk_punto','ATRIBUTO1.VAL = TK_BARRA.VAL + TK_PUNTO.VAL','');}
    |                               {$$ = new AtributoXpath('','',@1.first_line,@1.first_column); ReporteGA.agregar('ATRIBUTO1::= ε','ATRIBUTO1.VAL = EPSILON','');}
    ;

PALABRAS_R: TK_DBARRA PR TK_DDP OPCION ASTERISCO1{$$ = new Conca('!',$1,$2,$4,@1.first_line,@1.first_column); ReporteGA.agregar('PALABRAS_R::=tk_dbarra PR tk_ddp OPCION','PALABRAS_R.VAL = TK_DBARRA.VAL + PR.VAL + TK_DDP.VAL + OPCION.VAL','');}
    |TK_BARRA PR TK_DDP OPCION  ASTERISCO1       {$$ = new Conca('!',$1,$2,$4,@1.first_line,@1.first_column); ReporteGA.agregar('PALABRAS_R::=tk_barra PR tk_ddp OPCION','PALABRAS_R.VAL = TK_BARRA.VAL + PR.VAL + TK_DDP.VAL + OPCION.VAL','');}
    |TK_DBARRA PR TK_DDP OPCION                  {$$ = new Conca('!',$1,$2,$4,@1.first_line,@1.first_column); ReporteGA.agregar('PALABRAS_R::=tk_dbarra PR tk_ddp OPCION','PALABRAS_R.VAL = TK_DBARRA.VAL + PR.VAL + TK_DDP.VAL + OPCION.VAL','');}
    |TK_BARRA PR TK_DDP OPCION                   {$$ = new Conca('!',$1,$2,$4,@1.first_line,@1.first_column); ReporteGA.agregar('PALABRAS_R::=tk_barra PR tk_ddp OPCION','PALABRAS_R.VAL = TK_BARRA.VAL + PR.VAL + TK_DDP.VAL + OPCION.VAL','');}
    
    ;

PR: TK_ANCESTOR             {$$=$1; ReporteGA.agregar('PR::=tk_ancestor','PR.VAL = TK_ANCESTOR.VAL','');}
    |TK_ANCESTOR_OR_SELF    {$$=$1; ReporteGA.agregar('PR::=tk_ancestor_or_self','PR.VAL = TK_ANCESTOR_OR_SELF.VAL','');}
    |TK_ATTRIBUTE           {$$=$1; ReporteGA.agregar('PR::=tk_attribute','PR.VAL = TK_ATTRIBUTE.VAL','');}
    |TK_CHILD               {$$=$1; ReporteGA.agregar('PR::=tk_child','PR.VAL = TK_CHILD.VAL','');}
    |TK_DESCENDANT          {$$=$1; ReporteGA.agregar('PR::=tk_descendant','PR.VAL = TK_DESCENDANT.VAL','');}
    |TK_DESCENDANT_OR_SELF  {$$=$1; ReporteGA.agregar('PR::=tk_descendant_or_self','PR.VAL = TK_DESCENDANT_OR_SELF.VAL','');}
    |TK_FOLLOWING           {$$=$1; ReporteGA.agregar('PR::=tk_following','PR.VAL = TK_FOLLOWING.VAL','');}
    |TK_FOLLOWING_SIBLING   {$$=$1; ReporteGA.agregar('PR::=tk_following_sibling','PR.VAL = TK_FOLLOWING_SIBLING.VAL','');}
    |TK_NAMESPACE           {$$=$1; ReporteGA.agregar('PR::=tk_namespace','PR.VAL = TK_NAMESPACE.VAL','');}
    |TK_PARENT              {$$=$1; ReporteGA.agregar('PR::=tk_parent','PR.VAL = TK_PARENT.VAL','');}
    |TK_PRECEDING           {$$=$1; ReporteGA.agregar('PR::=tk_preceding','PR.VAL = TK_PRECEDING.VAL','');}
    |TK_PRECEDING_SIBLING   {$$=$1; ReporteGA.agregar('PR::=tk_preceding_sibling','PR.VAL = TK_PRECEDING_SIBLING.VAL ','');}
    |TK_SELF                {$$=$1; ReporteGA.agregar('PR::=tk_self','PR = TK_SELF.VAL','');}
    |TK_LAST                {$$=$1; ReporteGA.agregar('PR::=tk_self','PR = TK_SELF.VAL','');}
    |TK_POSITION            {$$=$1; ReporteGA.agregar('PR::=tk_self','PR = TK_SELF.VAL','');}
    |TK_NODE                {$$=$1; ReporteGA.agregar('PR::=tk_self','PR = TK_SELF.VAL','');}
    |TK_TEXT                {$$=$1; ReporteGA.agregar('PR::=tk_self','PR = TK_SELF.VAL','');}
    |error                  {Error.add(new NodoError("Sintactico","No se esperaba el caracter: "+yytext,yylineno));}
    ;

OPCION: TK_LAST TK_PARENTESIS   {$$ = new PR($1,@1.first_line,@1.first_column); ReporteGA.agregar('OPCION::=tk_last tk_parentesis','OPCION.VAL = TK_LAST.VAL + TK_PARENTESIS.VAL','');}
    |TK_POSITION TK_PARENTESIS  {$$ = new PR($1,@1.first_line,@1.first_column); ReporteGA.agregar('OPCION::=tk_position tk_parentesis','OPCION.VAL = TK_NODE.VAL + TK_PARENTESIS.VAL','');}
    |TK_NODE TK_PARENTESIS      {$$ = new PR($1,@1.first_line,@1.first_column); ReporteGA.agregar('OPCION::=tk_node tk_parentesis','OPCION.VAL = TK_NODE.VAL + TK_PARENTESIS.VAL','');}
    |TK_TEXT TK_PARENTESIS      {$$ = new PR($1,@1.first_line,@1.first_column); ReporteGA.agregar('OPCION::=tk_text tk_parentesis','OPCION.VAL = TK_TEXT.VAL + TK_PARENTESIS.VAL','');}
    |TK_IDENTIFICADOR           {$$ = new PR($1,@1.first_line,@1.first_column); ReporteGA.agregar('OPCION::=tk_identificador','OPCION.VAL = TK_IDENTIFICADOR.VAL','');}
    ;

ASTERISCO:TK_PUNTO TK_DBARRA TK_POR L_ASTERISCO         {$$ = new Conca('#',$2,$3,$4,@1.first_line,@1.first_column); ReporteGA.agregar('ASTERISCO::=tk_punto tk_dbarra tk_por L_ASTERISCO','ASTERISCO.VAL = TK_DBARRA.VAL+ TK_POR.VAL + L_ASTERISCO.VAL','');}
    |TK_PUNTO TK_BARRA TK_POR L_ASTERISCO               {$$ = new Conca('#',$2,$3,$4,@1.first_line,@1.first_column); ReporteGA.agregar('ASTERISCO::=tk_punto tk_barra tk_por L_ASTERISCO','ASTERISCO.VAL = TK_DBARRA.VAL + TK_BARRA.VAL+ TK_POR.VAL + L_ASTERISCO.VAL','');}
    |TK_DBARRA TK_POR L_ASTERISCO                       {$$ = new Conca('#',$1,$2,$3,@1.first_line,@1.first_column); ReporteGA.agregar('ASTERISCO::=tk_dbarra tk_por L_ASTERISCO','ASTERISCO.VAL = TK_DBARRA TK_POR.VAL + L_ASTERISCO.VAL','');}
    |TK_BARRA TK_POR L_ASTERISCO                        {$$ = new Conca('#',$1,$2,$3,@1.first_line,@1.first_column); ReporteGA.agregar('ASTERISCO::=tk_barra tk_por L_ASTERISCO','ASTERISCO.VAL = TK_BARRA.VAL+TK_POR.VAL+L_ASTERISCO.VAL','');}
    |TK_PUNTO TK_DBARRA TK_POR                          {$$ = new Conca('por',$2,$3,new Dato('',@3.first_line,@3.first_column),@1.first_line,@1.first_column); ReporteGA.agregar('ASTERISCO::=tk_punto tk_dbarra tk_por','ASTERISCO.VAL = TK_PUNTO.VAL+ TK_DBARRA.VAL+TK_POR.VAL','');}
    |TK_PUNTO TK_BARRA TK_POR                           {$$ = new Conca('por',$2,$3,new Dato('',@3.first_line,@3.first_column),@1.first_line,@1.first_column); ReporteGA.agregar('ASTERISCO::=tk_punto tk_barra tk_por','ASTERISCO.VAL =TK_PUNTO.VAL+TK_BARRA.VAL+TK_POR.VAL','');}
    |TK_DBARRA TK_POR                                   {$$ = new Conca('por',$1,$2,new Dato('',@2.first_line,@2.first_column),@1.first_line,@1.first_column); ReporteGA.agregar('ASTERISCO::=tk_dbarra tk_por','ASTERISCO.VAL = TK_DBARRA.VAL + TK_POR.VAL','');}
    |TK_BARRA TK_POR                                    {$$ = new Conca('por',$1,$2,new Dato('',@2.first_line,@2.first_column),@1.first_line,@1.first_column); ReporteGA.agregar('ASTERISCO::=tk_barra tk_por','ASTERISCO.VAL = TK_BARRA.VAL + TK_POR.VAL','');}
    ;

L_ASTERISCO: L_ASTERISCO ASTERISCO1          {$1.push($2); $$=$1; ReporteGA.agregar('L_ASTERISCO::=L_ASTESCO ASTERISCO1','L_ASTERISCO.VAL = L_ASTERISCO.VAL + ASTERISCO1.VAL','');}
    |ASTERISCO1                              {$$=[$1]; ReporteGA.agregar('L_ASTERISCO::=ASTERISCO1','L_ASTERISCO.VAL = ASTERISCO1.VAL','');}
    ;

ASTERISCO1:TK_CORCHETE_IZQUIERDO EXP TK_CORCHETE_DERECHO    {$$ = $2; ReporteGA.agregar('ASTERISCO1::=tk_corchete_izquierdo EXP tk_corchete_derecho','ASTERISCO1.VAL = EXP.VAL','');}
    |TK_IDENTIFICADOR          {$$ = $1; ReporteGA.agregar('ASTERISCO1::=TK_IDENTIFICADOR','ASTERISCO1.VAL = TK_IDENTIFICADOR.VAL','');}
    ;
    //QUITAR LA ambigüedad


EXP: EXP TK_MAS EXP                                     {$$ = new Operacion($1,$3,Operador.SUMA,@1.first_line,@1.first_column); ReporteGA.agregar('EXP::=EXP tk_mas T','EXP.VAL = EXP1.VAL + T.VAL','');}
    |EXP TK_MENOS EXP                                   {$$ = new Operacion($1,$3,Operador.RESTA,@1.first_line,@1.first_column); ReporteGA.agregar('EXP::=EXP tk_menos T','EXP.VAL = EXP1.VAL - T.VAL','');}
    |EXP TK_POR EXP                                     {$$ = new Operacion($1,$3,Operador.MULTIPLICACION,@1.first_line,@1.first_column); ReporteGA.agregar('T::=T tk_por F','T.VAL = T1.VAL * F.VAL','');}    
    |EXP TK_DIVISION EXP                                {$$ = new Operacion($1,$3,Operador.DIVISION,@1.first_line,@1.first_column); ReporteGA.agregar('T::=T tk_division F','T.VAL = T1.VAL / F.VAL','');}
    |EXP TK_MODULO EXP                                  {$$ = new Operacion($1,$3,Operador.MODULO,@1.first_line,@1.first_column); ReporteGA.agregar('T::=T tk_modulo F','T.VAL = T1.VAL MOD F.VAL','');}
    |EXP TK_IGUALDAD EXP                                {$$ = new Operacion($1,$3,Operador.IGUALDAD,@1.first_line,@1.first_column); ReporteGA.agregar('F::=F tk_igualdad G','F.VAL = F1.VAL == G.VAL','');}
    |EXP TK_DESIGUALDAD EXP                             {$$ = new Operacion($1,$3,Operador.DESIGUALDAD,@1.first_line,@1.first_column); ReporteGA.agregar('F::=F tk_desigualdad G','F.VAL = F1.VAL != G.VAL','');}
    |EXP TK_MENOR EXP                                   {$$ = new Operacion($1,$3,Operador.MENOR,@1.first_line,@1.first_column); ReporteGA.agregar('F::=F tk_menor G','F.VAL = F1.VAL  G.VAL','');}
    |EXP TK_MENOR_IGUAL EXP                             {$$ = new Operacion($1,$3,Operador.MENOR_IGUAL,@1.first_line,@1.first_column); ReporteGA.agregar('F::=F tk_menor_igual G','F.VAL = F1.VAL = G.VAL','');}
    |EXP TK_MAYOR EXP                                   {$$ = new Operacion($1,$3,Operador.MAYOR,@1.first_line,@1.first_column); ReporteGA.agregar('F::=F tk_mayor G','F.VAL = F1.VAL  G.VAL','');}
    |EXP TK_MAYOR_IGUAL EXP                             {$$ = new Operacion($1,$3,Operador.MAYOR_IGUAL,@1.first_line,@1.first_column); ReporteGA.agregar('F::=F tk_mayor_igual G','F.VAL = F1.VAL = G.VAL','');}
    |EXP TK_OR EXP                                      {$$ = new Operacion($1,$3,Operador.OR,@1.first_line,@1.first_column); ReporteGA.agregar('F::=F tk_or G','F.VAL = F1.VAL OR G.VAL','');}
    |EXP TK_AND EXP                                     {$$ = new Operacion($1,$3,Operador.AND,@1.first_line,@1.first_column); ReporteGA.agregar('F::=F tk_and G','F.VAL = F1.VAL AND G.VAL','');}
    |EXP TK_BARRA_VERTICAL EXP                          {$$ = new Operacion($1,$3,Operador.CONCATENACION,@1.first_line,@1.first_column); ReporteGA.agregar('F::=F tk_barra_vertical G','F.VAL = F1.VAL | G.VAL','');} 
    |TK_PARENTESIS_IZQUIERDO EXP TK_PARENTESIS_DERECHO  {$$ = $2; ReporteGA.agregar('G::=tk_parentesis_izquierdo EXP tk_parentesis_derecho','G.VAL = EXP.VAL','');}
    |TK_MENOS EXP %prec UMINUS                          {$$ = new Operacion($1,$2,Operador.MENOS_UNARIO,@1.first_line,@1.first_column); ReporteGA.agregar('G::=tk_menos EXP','G.VAL = TK_MENOS.VAL * EXP.VAL','');}
    |ATRI                                               {$$=$1;  ReporteGA.agregar('G::=ATRI','G.VAL = ATRI.VAL','');}
    |TK_ARROBA EXP                                      {$$=$1;  ReporteGA.agregar('G::=tk_arroba EXP','EXP.VAL = TK_ARROBA + EXP.VAL','');}
    |TK_DECIMAL                                         {$$ = new Dato(Number($1),@1.first_line,@1.first_column); ReporteGA.agregar('G::=tk_decimal','G.VAL = TK_DECIMAL.LEXVAL','');}
    |TK_ENTERO                                          {$$ = new Dato(Number($1),@1.first_line,@1.first_column); ReporteGA.agregar('G::=tk_entero','G.VAL = TK_ENTERO.LEXVAL','');}
    |TK_CADENA                                          {$$ = new Dato($1,@1.first_line,@1.first_column); ReporteGA.agregar('G::=tk_cadena','G.VAL = TK_CADENA.VAL','');}
    |TK_IDENTIFICADOR TK_DBARRA                         {$$ = new Dato($1,@1.first_line,@1.first_column); ReporteGA.agregar('G::=tk_identificador','G.VAL = TK_IDENTIFICADOR.VAL','');} 
    |TK_IDENTIFICADOR                                   {$$ = new Dato($1,@1.first_line,@1.first_column); ReporteGA.agregar('G::=tk_identificador','G.VAL = TK_IDENTIFICADOR.VAL','');}
    |TK_POSITION TK_PARENTESIS                          {$$ = new Dato($1,@1.first_line,@1.first_column); ReporteGA.agregar('G::=tk_position tk_parentesis','G.VAL = TK_POSITION.VAL','');}
    |TK_LAST TK_PARENTESIS                              {$$ = new Dato($1,@1.first_line,@1.first_column); ReporteGA.agregar('G::=tk_last tk_parentesis','G.VAL = TK_LAST.VAL','');}
    |PAL_RE                                             {$$=$1;  ReporteGA.agregar('G::=PAL_RE','G.VAL = PAL_RE.VAL','');}   
    ;

  

PAL_RE: PR TK_DDP OPCION {$$ = new PAL_RE($1,$3,@1.first_line,@1.first_column);  ReporteGA.agregar('PAL_RE::=PR tk_ddp OPCION','PAL_RE.VAL = PR.VAL + TK_DDP.VAL + OPCION.VAL','');};

ATRI: TK_ARROBA TK_POR L_ATRI {$$ = new Atri($1+$2,$3,@1.first_line,@1.first_column);  ReporteGA.agregar('ATRI::=tk_arroba tk_por L_ATRI','ATRI.VAL = TK_ARROBA.VAL + TK_POR.VAL + L_ATRI.VAL','');};

L_ATRI:L_ATRI ATRI1 {$1.push($2); $$=$1;  ReporteGA.agregar('L_ATRI::=L_ATRI ATRI1','L_ATRI.VAL = L_ATRI.VAL + ATRI1.VAL','');}
    |ATRI1          {$$=[$1];  ReporteGA.agregar('ATRI1::=ATRI1','L_ATRI.VAL = ATRI1.VAL','');}
    ;

ATRI1: TK_DBARRA TK_DPUNTO      {$$ = new AtributoXpath($1,$2,@1.first_line,@1.first_column);  ReporteGA.agregar('ATRI1::=tk_dbarra tk_dpunto','ATRI1.VAL = TK_DBARRA.VAL + TK_DPUNTO.VAL','');}
    |TK_DBARRA TK_PUNTO         {$$ = new AtributoXpath($1,$2,@1.first_line,@1.first_column);  ReporteGA.agregar('ATRI1::=tk_dbarra tk_punto' ,'ATRI1.VAL = TK_DBARRA.VAL + TK_PUNTO.VAL','');}
    |TK_BARRA TK_DPUNTO         {$$ = new AtributoXpath($1,$2,@1.first_line,@1.first_column);  ReporteGA.agregar('ATRI1::=tk_barra  tk_dpunto','ATRI1.VAL = TK_BARRA.VAL  + TK_TK_DPUNTO.VAL','');}
    |TK_BARRA TK_PUNTO          {$$ = new AtributoXpath($1,$2,@1.first_line,@1.first_column);  ReporteGA.agregar('ATRI1::=tk_barra  tk_punto' ,'ATRI1.VAL = TK_BARRA.VAL  + TK_PUNTO.VAL','');}
    |                           { ReporteGA.agregar('ATRI1::=ε','ATRI1.VAL = EPSILON','');}         
    ;


/*FIN DE LA GRAMATICA */