/* Definición Léxica */
%lex

%options case-insensitive

BSL                         "\\".

%%


("$")([a-zA-ZáéíúóàèìòÁÉÍÓÚÀÈÌÒÙñÑ])[a-zA-Z0-9áéíúóàèìòÁÉÍÓÚÀÈÌÒÙñÑ_]*     %{ return 'tk_idflower'; %}
"node()"                      %{ return 'tk_node';  %}
"last()"                      %{ return 'tk_last';  %}
"position()"                  %{ return 'tk_position';  %}
"ancestor-or-self::"          %{ return 'tk_ancestorself';  %}
"ancestor::"                  %{ return 'tk_ancestor';  %}
"attribute::"                 %{ return 'tk_attribute';  %}
"child::"                     %{ return 'tk_child';  %}
"descendant-or-self::"        %{ return 'tk_descendantself';  %}
"descendant::"                %{ return 'tk_descendant';  %}
"following-sibling::"         %{ return 'tk_followingsibling';  %}
"following::"                  %{ return 'tk_following';  %}
"parent::"                    %{ return 'tk_parent';  %}
"preceding-sibling::"         %{ return 'tk_precedingsibling';  %}
"preceding::"                 %{ return 'tk_preceding';  %}
"self::"                      %{ return 'tk_self';  %}
"div"                       %{ return 'tk_division';  %}
"or"                        %{ return 'tk_or';  %}
"and"                       %{ return 'tk_and';  %}
"mod"                       %{ return 'tk_mod';  %}
"for"                       %{ return 'tk_for';  %}
"in"                       %{ return 'tk_in';  %}
"to"                       %{ return 'tk_to';  %}
"let"                       %{ return 'tk_let';  %}
"where"                       %{ return 'tk_where';  %}
"return"                       %{ return 'tk_return';  %}
"order"                       %{ return 'tk_order';  %}
"by"                       %{ return 'tk_by';  %}
"@*"                         %{ return 'tk_arrobaasterisco';  %}
"@"                         %{ return 'tk_arroba';  %}
"|"                         %{ return 'tk_barra';  %}
"+"                         %{ return 'tk_mas';  %}
"-"                         %{ return 'tk_menos';  %}
"*"                         %{ return 'tk_asterisco';  %}
"!="                        %{ return 'tk_noigual'; %}
":="                         %{ return 'tk_dospuntosigual'; %}
"<="                        %{ return 'tk_menorigual'; %}
">="                        %{ return 'tk_mayorigual'; %}
"="                         %{ return 'tk_igual'; %}
">"                         %{ return 'tk_mayor'; %}
"<"                         %{ return 'tk_menor'; %}
"?"                         %{ return 'tk_interrogacion'; %}
"..//"                        %{ return 'tk_dpds'; %}
".//"                        %{ return 'tk_pds'; %}
"../"                        %{ return 'tk_dps'; %}
"./"                        %{ return 'tk_ps'; %}
"/."                        %{ return 'tk_slashpunto'; %}
"/.."                        %{ return 'tk_slashdoblepunto'; %}
"//"                        %{ return 'tk_dobleslash'; %}
"/"                        %{ return 'tk_slash'; %}
".."                        %{ return 'tk_doblepunto'; %}
"."                         %{ return 'tk_punto'; %}
([0-9]+["."][0-9]+)\b        %{ return 'tk_decimal';  %}
[0-9]+\b                    %{ return 'tk_entero';  %}
\"[^\"]*\"                  %{ yytext = yytext.substr(1, yyleng-2); return 'tk_cadena1'; %}
\'[^\']*\'                  %{ yytext = yytext.substr(1, yyleng-2); return 'tk_cadena2'; %}
([a-zA-ZáéíúóàèìòÁÉÍÓÚÀÈÌÒÙñÑ])[a-zA-Z0-9áéíúóàèìòÁÉÍÓÚÀÈÌÒÙñÑ_]*     %{ return 'tk_identificador'; %}
"["                         %{ return 'tk_corchetea'; %}
"]"                         %{ return 'tk_corchetec'; %}
"("                         %{ return 'tk_parentesisa'; %}
")"                         %{ return 'tk_parentesisc'; %}

\s+                         /* skip whitespace */
[ \t\r\n\f]                 %{ /*Los Ignoramos*/   %}
<<EOF>>                     %{ return 'EOF';       %}
.                           {  console.log("ERROR: "+yytext); }

/lex

//SECCION DE IMPORTS
%{

%}


/* Asociación de operadores y precedencia */
%left tk_identificador tk_slash tk_dobleslash tk_punto tk_doblepunto
%left tk_mas tk_menos
%left tk_asterisco tk_division tk_mod
%left tk_dobleslash tk_slash tk_dpds tk_pds tk_dps tk_ps
%left UMENOS
// DEFINIMOS PRODUCCIÓN INICIAL
%start INICIO

%%

/* Definición de la gramática */
INICIO : INSTRUCCION EOF     {  console.log("TODO CORRECTO :D XQUERY ASC VERSION");
                                $$ =[$1[0],$1[1]];
                                return $$; } ;

INSTRUCCION: SETS { $$ = $1; }
        | FLOWER  { $$ = $1; };


SETS: SETS SET { $1[1].agregarHijo($2[1]);
                 $1[0].push($2[0]); 
                 $$ = [$1[0],$1[1]]; }

    | SET { $$ = [[$1[0]],$1[1]] } ;

SET:    SELECTORES EXPRESION { nodoaux= new NodoArbol($1[1],"");
                               nodoaux.agregarHijo($2[1]);
                               $$ = [null,nodoaux]; }

        |    EXPRESION { $$ = [null,$1[1]] }

        |    AXES {     $$ = [null,$1[1]]; }

        |    SELECTORES AXES {       
                                nodoaux= new NodoArbol($1[1],"");
                                nodoaux.agregarHijo($2[1]);
                                $$ = [null,nodoaux]; };



SELECTORES: tk_dobleslash OTRO_SELECTOR { arr = [TipoSelector.DOBLE_SLASH]; 
                                          arr = arr.concat($2[0]);
                                          $1 = $1+""+$2[1] ;
                                          $$ = [arr,$1]; }

         |  tk_dobleslash { $$ = [[TipoSelector.DOBLE_SLASH],$1]; }

         |  tk_slash { $$ = [[TipoSelector.SLASH],$1]; }
         
         |  tk_slash OTRO_SELECTOR {    arr = [TipoSelector.SLASH] 
                                        arr = arr.concat($2[0]);
                                        $1 = $1+""+$2[1];
                                        $$ = [arr,$1];}

         |  OTRO_SELECTOR { $$ = [$1[0],$1[1]];  } ;

OTRO_SELECTOR: tk_dpds AGREGAR_SELECTOR { arr = [TipoSelector.DOSPUNTOS_DOSSLASH];
                                          arr = arr.concat($2[0]);
                                          $1 = $1+""+$2[1];
                                          $$ = [arr,$1];}

            |  tk_pds  AGREGAR_SELECTOR { arr = [TipoSelector.PUNTO_DOSSLASH];
                                          arr = arr.concat($2[0]);
                                          $1 = $1+""+$2[1];
                                          $$ = [arr,$1];}

            |  tk_dps  AGREGAR_SELECTOR { arr = [TipoSelector.DOSPUNTOS_SLASH];
                                          arr = arr.concat($2[0]);
                                          $1 = $1+""+$2[1];
                                          $$ = [arr,$1];}

            |  tk_ps   AGREGAR_SELECTOR { arr = [TipoSelector.PUNTO_SLASH];
                                          arr = arr.concat($2[0]);
                                          $1 = $1+""+$2[1];
                                          $$ = [arr,$1];};

AGREGAR_SELECTOR:  OTRO_SELECTOR { $$ = [$1[0],$1[1]];  }

                | { $$ = [[TipoSelector.FIN],""];  };

EXPRESION : tk_identificador PREDICADO { nodoaux = new NodoArbol($1,"");
                                         nodoaux.agregarHijo($2[1]);
                                         $$ = [null,nodoaux];}

        |  tk_asterisco PREDICADO {     nodoaux = new NodoArbol($1,"");
                                        nodoaux.agregarHijo($2[1]);
                                        $$ = [null,nodoaux];}

        |  tk_punto PREDICADO { nodoaux = new NodoArbol($1,"");
                                $$ = [null,nodoaux]; }

        |  tk_arrobaasterisco PREDICADO { nodoaux = new NodoArbol($1,"");
                                          $$ = [null,nodoaux];}

        |  tk_arroba tk_identificador PREDICADO { nodoaux = new NodoArbol($1,"");
                                                  $$ = [null,nodoaux]; }

        |  tk_texto PREDICADO { nodoaux = new NodoArbol($1,"");
                                nodoaux.agregarHijo($2[1]);
                                $$ = [null,nodoaux]; }

        |  tk_doblepunto PREDICADO {    nodoaux = new NodoArbol($1,"");
                                         $$ = [null,nodoaux];}

        |  tk_node PREDICADO { nodoaux = new NodoArbol($1,"");
                               nodoaux.agregarHijo($2[1]);
                               $$ = [null,nodoaux]; };

PREDICADO : tk_corchetea EXPRESION_FILTRO tk_corchetec { nodoaux = new NodoArbol("Predicado","");
                                                         nodoaux.agregarHijo(new NodoArbol("[",""));
                                                         nodoaux.agregarHijo($2[1]);
                                                         nodoaux.agregarHijo(new NodoArbol("]",""));
                                                         $$ = [null,nodoaux]; } 
        |  {    nodoaux = new NodoArbol("Predicado","");
                nodoaux.agregarHijo(new NodoArbol("[",""));
                nodoaux.agregarHijo(new NodoArbol("]",""));
                $$ = [null,nodoaux];} ;


EXPRESION_FILTRO : EXPRESION_LOGICA { };

AXES :          tk_ancestorself   EXPRESION      { nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [null,nodoaux];}

        |       tk_ancestor   EXPRESION          { nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [null,nodoaux];}

        |       tk_child      EXPRESION          { nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [null,nodoaux];}

        |       tk_descendantself EXPRESION      { nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [null,nodoaux];}

        |       tk_descendant  EXPRESION         { nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [null,nodoaux];}

        |       tk_followingsibling EXPRESION    { nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [null,nodoaux]; }

        |       tk_following  EXPRESION          { nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [null,nodoaux];}

        |       tk_self  EXPRESION               { nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [null,nodoaux];}

        |       tk_parent  EXPRESION             { nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [null,nodoaux];}

        |       tk_precedingsibling EXPRESION    { nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [null,nodoaux];}

        |       tk_preceding  EXPRESION          { nodoaux = new NodoArbol($1,"");
                                                   nodoaux.agregarHijo($2[1]);
                                                   $$ = [null,nodoaux]; };

ATRIBUTO : tk_arroba tk_identificador tk_igual CADENA {    nodoaux = new NodoArbol("=","");
                                                           nodoaux.agregarHijo(new NodoArbol("attribute::"+$2,""));
                                                           nodoaux.agregarHijo($4[1]);
                                                           $$ = [null,nodoaux]; }

        |  tk_attribute tk_identificador tk_igual CADENA { nodoaux = new NodoArbol("=","");
                                                           nodoaux.agregarHijo(new NodoArbol("attribute::"+$2,""));
                                                           nodoaux.agregarHijo($4[1]);
                                                           $$ = [null,nodoaux]; } ;


EXPRESION_LOGICA : EXPRESION_LOGICA tk_and EXPRESION_RELACIONAL { nodoaux = new NodoArbol("and","");
                                                                  nodoaux.agregarHijo($1[1]);
                                                                  nodoaux.agregarHijo($3[1]);
                                                                  $$ = [null,nodoaux]; }

                |  EXPRESION_LOGICA tk_or EXPRESION_RELACIONAL {  nodoaux = new NodoArbol("or","");
                                                                  nodoaux.agregarHijo($1[1]);
                                                                  nodoaux.agregarHijo($3[1]);
                                                                  $$ = [null,nodoaux]; }     
                |  EXPRESION_RELACIONAL { $$ = $1;  };


EXPRESION_RELACIONAL :  EXPRESION_NUMERICA tk_mayor EXPRESION_NUMERICA { nodoaux = new NodoArbol(">","");
                                                                         nodoaux.agregarHijo($1[1]);
                                                                         nodoaux.agregarHijo($3[1]);
                                                                         $$ = [null,nodoaux]; }

                |       EXPRESION_NUMERICA tk_menor EXPRESION_NUMERICA { nodoaux = new NodoArbol("<","");
                                                                         nodoaux.agregarHijo($1[1]);
                                                                         nodoaux.agregarHijo($3[1]);
                                                                         $$ = [null,nodoaux]; }

                |       EXPRESION_NUMERICA tk_mayorigual EXPRESION_NUMERICA { nodoaux = new NodoArbol(">=","");
                                                                         nodoaux.agregarHijo($1[1]);
                                                                         nodoaux.agregarHijo($3[1]);
                                                                         $$ = [null,nodoaux];}

                |       EXPRESION_NUMERICA tk_menorigual EXPRESION_NUMERICA { nodoaux = new NodoArbol("<=","");
                                                                         nodoaux.agregarHijo($1[1]);
                                                                         nodoaux.agregarHijo($3[1]);
                                                                         $$ = [null,nodoaux]; }

                |       EXPRESION_NUMERICA tk_igual EXPRESION_CADENA { nodoaux = new NodoArbol("=","");
                                                                         nodoaux.agregarHijo($1[1]);
                                                                         nodoaux.agregarHijo($3[1]);
                                                                         $$ = [null,nodoaux]; } 

                |       EXPRESION_NUMERICA tk_noigual EXPRESION_CADENA { nodoaux = new NodoArbol("!=","");
                                                                         nodoaux.agregarHijo($1[1]);
                                                                         nodoaux.agregarHijo($3[1]);
                                                                         $$ = [null,nodoaux]; }  
                |       EXPRESION_NUMERICA { $$ = $1; }   

                |       ATRIBUTO { $$ = $1; }

                |       tk_asterisco { nodoaux = new NodoArbol("*","");
                                        $$ = [null,nodoaux]; }

                |       tk_texto {      nodoaux = new NodoArbol($1,"");
                                        $$ = [null,nodoaux]; }  

                |       tk_arrobaasterisco { nodoaux = new NodoArbol("@*","");
                                             $$ = [null,nodoaux];}

                |       tk_node { nodoaux = new NodoArbol($1,"");
                                  $$ = [null,nodoaux]; }  ;


EXPRESION_CADENA :      CADENA { $$ = $1; }
                |      EXPRESION_NUMERICA { $$ = $1; };

EXPRESION_NUMERICA : tk_menos EXPRESION_NUMERICA %prec UMENOS	{ nodoaux = new NodoArbol("*","");
                                                                  nodoaux.agregarHijo(new NodoArbol("-1",""));
                                                                  nodoaux.agregarHijo($2[1]);
                                                                  $$ = [null,nodoaux]; }

	| EXPRESION_NUMERICA tk_mas EXPRESION_NUMERICA		{ nodoaux = new NodoArbol("+","");
                                                                  nodoaux.agregarHijo($1[1]);
                                                                  nodoaux.agregarHijo($3[1]);
                                                                  $$ = [null,nodoaux];  }

	| EXPRESION_NUMERICA tk_menos EXPRESION_NUMERICA	{ nodoaux = new NodoArbol("-","");
                                                                  nodoaux.agregarHijo($1[1]);
                                                                  nodoaux.agregarHijo($3[1]);
                                                                  $$ = [null,nodoaux];  }

	| EXPRESION_NUMERICA tk_asterisco EXPRESION_NUMERICA	{ nodoaux = new NodoArbol("*","");
                                                                  nodoaux.agregarHijo($1[1]);
                                                                  nodoaux.agregarHijo($3[1]);
                                                                  $$ = [null,nodoaux];  }

        | EXPRESION_NUMERICA tk_mod EXPRESION_NUMERICA	        { nodoaux = new NodoArbol("%","");
                                                                  nodoaux.agregarHijo($1[1]);
                                                                  nodoaux.agregarHijo($3[1]);
                                                                  $$ = [null,nodoaux];   }

	| EXPRESION_NUMERICA tk_division EXPRESION_NUMERICA	{ nodoaux = new NodoArbol("÷","");
                                                                  nodoaux.agregarHijo($1[1]);
                                                                  nodoaux.agregarHijo($3[1]);
                                                                  $$ = [null,nodoaux]; }

	| tk_parentesisa EXPRESION_NUMERICA tk_parentesisc	{ $$ = $2; }

	| tk_entero						{ nodoaux = new NodoArbol($1,"");
                                                                  $$ = [null,nodoaux]; }

	| tk_decimal						{ nodoaux = new NodoArbol($1,"");
                                                                  $$ = [null,nodoaux]; }

        | tk_last                                               { nodoaux = new NodoArbol($1,"");
                                                                  $$ = [null,nodoaux]; }

        | AXES                                                  { $$ = $1; }

        | tk_position                                           { nodoaux = new NodoArbol($1,"");
                                                                  $$ = [null,nodoaux]; }

	| tk_identificador	                                { nodoaux = new NodoArbol($1,"");
                                                                  $$ = [null,nodoaux]; };


CADENA :         tk_cadena1 { nodoaux = new NodoArbol($1,"");
                              $$ = [null,nodoaux]; }

        |        tk_cadena2 { nodoaux = new NodoArbol($1,"");
                              $$ = [null,nodoaux]; };



FLOWER: tk_for tk_idflower tk_in SETS SENTENCIAS { nodoaux = new NodoArbol("for","");
                                                   nodoaux.agregarHijo(new NodoArbol($2,""));
                                                   nodoaux.agregarHijo($4[1]);
                                                   nodoaux.agregarHijo($5[1]);
                                                   $$ = [null,nodoaux]; };

SENTENCIAS: SENTENCIAS SENTENCIA {                                   
                                   $1[1].agregarHijo($2[1]);
                                   $1[0].push($2[0]); 
                                   $$ = [$1[0],$1[1]];  }

        | SENTENCIA { $$ = [[$1[0]],$1[1]] };


SENTENCIA: tk_let tk_idflower tk_dospuntosigual EXPRESION_LOGICAX {  nodoaux = new NodoArbol(":=","");
                                                                     nodoaux.agregarHijo(new NodoArbol($1,""));
                                                                     nodoaux.agregarHijo($4[1]);
                                                                     $$ = [null,nodoaux]; }
        | tk_where EXPRESION_LOGICAX  {
                                        $$ = [null,$2[1]]; }
        | tk_order tk_by EXPRESION_LOGICAX { $$ = [null,$3[1]]; }
        | tk_return RETURN { $$ = [null,$2[1]];  };


RETURN : EXPRESION_LOGICAX { $$ = $1; };

EXPRESION_XQUERY : tk_idflower SETS { nodoaux = new NodoArbol($1,"");
                                      nodoaux.agregarHijo($2[1]);
                                      $$ = [null,nodoaux]; };

EXPRESION_LOGICAX : EXPRESION_LOGICAX tk_and EXPRESION_RELACIONALX { nodoaux = new NodoArbol("and","");
                                                                     nodoaux.agregarHijo($1[1]);
                                                                     nodoaux.agregarHijo($3[1]);
                                                                     $$ = [null,nodoaux]; }
                |  EXPRESION_LOGICAX tk_or EXPRESION_RELACIONALX { nodoaux = new NodoArbol("or","");
                                                                   nodoaux.agregarHijo($1[1]);
                                                                   nodoaux.agregarHijo($3[1]);
                                                                   $$ = [null,nodoaux]; }     
                |  EXPRESION_XQUERY { $$ = $1; }
                |  EXPRESION_RELACIONALX { $$ = $1;};


EXPRESION_RELACIONALX :  EXPRESION_NUMERICAX tk_mayor EXPRESION_NUMERICAX { nodoaux = new NodoArbol(">","");
                                                                            nodoaux.agregarHijo($1[1]);
                                                                            nodoaux.agregarHijo($3[1]);
                                                                            $$ = [null,nodoaux]; }

                |       EXPRESION_NUMERICAX tk_menor EXPRESION_NUMERICAX {  nodoaux = new NodoArbol("<","");
                                                                            nodoaux.agregarHijo($1[1]);
                                                                            nodoaux.agregarHijo($3[1]);
                                                                            $$ = [null,nodoaux]; }

                |       EXPRESION_NUMERICAX tk_mayorigual EXPRESION_NUMERICAX { nodoaux = new NodoArbol(">=","");
                                                                                nodoaux.agregarHijo($1[1]);
                                                                                nodoaux.agregarHijo($3[1]);
                                                                                $$ = [null,nodoaux]; }

                |       EXPRESION_NUMERICAX tk_menorigual EXPRESION_NUMERICAX { nodoaux = new NodoArbol("<=","");
                                                                                nodoaux.agregarHijo($1[1]);
                                                                                nodoaux.agregarHijo($3[1]);
                                                                                $$ = [null,nodoaux]; }

                |       EXPRESION_NUMERICAX tk_igual EXPRESION_CADENAX { nodoaux = new NodoArbol("=","");
                                                                         nodoaux.agregarHijo($1[1]);
                                                                         nodoaux.agregarHijo($3[1]);
                                                                         $$ = [null,nodoaux]; }    

                |       EXPRESION_NUMERICAX tk_noigual EXPRESION_CADENAX { nodoaux = new NodoArbol("=","");
                                                                           nodoaux.agregarHijo($1[1]);
                                                                           nodoaux.agregarHijo($3[1]);
                                                                           $$ = [null,nodoaux]; }  

                |       EXPRESION_NUMERICAX { $$ = $1; }  ;     


EXPRESION_CADENAX :      CADENA { $$ = $1; }
                |      EXPRESION_NUMERICAX { $$ = $1; };

EXPRESION_NUMERICAX : tk_menos EXPRESION_NUMERICAX %prec UMENOS	{ nodoaux = new NodoArbol("*","");
                                                                  nodoaux.agregarHijo(new NodoArbol("-1",""));
                                                                  nodoaux.agregarHijo($2[1]);
                                                                  $$ = [null,nodoaux]; }

	| EXPRESION_NUMERICAX tk_mas EXPRESION_NUMERICAX	{  
                                                                nodoaux = new NodoArbol("+","");
                                                                nodoaux.agregarHijo($1[1]);
                                                                nodoaux.agregarHijo($3[1]);
                                                                $$ = [null,nodoaux]; }

	| EXPRESION_NUMERICAX tk_menos EXPRESION_NUMERICAX	{  
                                                                nodoaux = new NodoArbol("-","");
                                                                nodoaux.agregarHijo($1[1]);
                                                                nodoaux.agregarHijo($3[1]);
                                                                $$ = [null,nodoaux]; }

	| EXPRESION_NUMERICAX tk_asterisco EXPRESION_NUMERICAX	{  
                                                                nodoaux = new NodoArbol("*","");
                                                                nodoaux.agregarHijo($1[1]);
                                                                nodoaux.agregarHijo($3[1]);
                                                                $$ = [null,nodoaux]; }

        | EXPRESION_NUMERICAX tk_mod EXPRESION_NUMERICAX	{  
                                                                nodoaux = new NodoArbol("%","");
                                                                nodoaux.agregarHijo($1[1]);
                                                                nodoaux.agregarHijo($3[1]);
                                                                $$ = [null,nodoaux]; }

	| EXPRESION_NUMERICAX tk_division EXPRESION_NUMERICAX	{  
                                                                nodoaux = new NodoArbol("÷","");
                                                                nodoaux.agregarHijo($1[1]);
                                                                nodoaux.agregarHijo($3[1]);
                                                                $$ = [null,nodoaux]; }

	| tk_parentesisa EXPRESION_NUMERICAX tk_parentesisc	{ $$ = $2; }

	| tk_entero						{ nodoaux = new NodoArbol($1,"");
                                                                  $$ = [null,nodoaux]; }

	| tk_decimal						{ nodoaux = new NodoArbol($1,"");
                                                                  $$ = [null,nodoaux]; } 

	| tk_identificador	                                {  nodoaux = new NodoArbol($1,"");
                                                                   $$ = [null,nodoaux];};


                