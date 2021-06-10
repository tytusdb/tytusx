%{
    class SUMA
    {
        constructor(izq,der)
        {
            this.izq=izq
            this.der=der
        }

    }

    class POR
    {
        constructor(izq,der)
        {
            this.izq=izq
            this.der=der
        }
    }
%}

%lex

      %options case-insensitive

%%

[0-9]+      								              return "INTEGER"
"+"         return "MAS"
"-"         return "MENOS"
"*"         return "POR"
"("         return "PARA"
")"         return "PARB"

.	{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex



%start ini

%%

ini
    :E  { console.log(JSON.stringify($1,2)); /* Inicio */ }
;

E
    : T EP { if($2==null){$$=$1;}else{$$=new SUMA($1,$2);}  /* Entrada Suma */ } //Entrada Suma
;

EP
    : MAS T EP  { if($3==null){$$=$2;}else{$$=new SUMA($2,$3);}/* Suma Recursiva */ } // Suma Recursiva
    |            { $$ = null    /* Epsilon Suma */ } 
;

T 
    : F TP  { if($2==null){$$=$1;}else{$$=new POR($1,$2);}  /* Entrada Multiplicacion */ }
;

TP
    : POR F TP   {  if($3==null){$$=$1;}else{$$=new POR($2,$3);}  /* Por Recursiva */ }
    |            { $$ = null;  /* Epsilon Por */ } //Epsilon *
;

F
    : INTEGER   { $$ = Number($1); /* Numero */  }
    | PARA E PARB { $$ = $2 /* Parentesis */ }
;