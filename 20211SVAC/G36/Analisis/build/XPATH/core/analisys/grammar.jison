%{

     const Ast = require('../AST/ast.js');
     const Literal = require('../Literal/literal.js');
     const NodoRaiz = require('../nodeAcces/nodoRaiz.js');
     const NodoCurrent = require('../nodeAcces/nodoRaiz.js');
     //op
     const Additive = require('../operacion/additive.js');
     const Div = require('../operacion/div.js');
     const Mod = require('../operacion/mod.js');
     const Equal = require('../relacionales/equal.js');
     const NotEqual = require('../relacionales/notEqual.js');
     const LessThan = require('../relacionales/lessThan.js');
     const GreatThan = require('../relacionales/greatThan.js');
     const LEThan    = require('../relacionales/lEThan.js');
     const GEThan    = require('../relacionales/gEthan.js');
     const And    = require('../logicas/and.js');
     const Or    = require('../logicas/or.js');
     const Mul   = require('../operacion/mult.js');
     
     //table
    const tablaSimbolos = require('./prueba.js');

    var simbolos    = [];
    var errorList   = [];
    let tokenList   = [];
    var contadorNodos = 0; 


    function insertToken(fila, column , tipo , descrip){
        tokenList.push({"fila": fila, "column": column, "tipo": tipo, "descripcion": descrip  });      
    }
    function insertError(tipo, fila, columna, descrip){
        errorList.push({"tipo": tipo , "fila": fila , "columna": columna , "descripcion": descrip});    
    }    
    function yyerror(val) {  
        console.log("Error!", val); 
         } 

    function insertToken(tok){
        tokenList.push({"valor": tok});

        
    }     
 

%}


/*  ========================= LEX ==============================*/
  %lex 


%%

"ancestor-or-self"      return      'tkAncestorOS'
"descendant-or-self"    return      'tkDescendantOS'
"preceding-sibling"     return      'tkPrecedSibling'
"following-sibling"     return      'tkFollowSibling'   
"ancestor"              return      'tkAncestor'
"attribute"             return      'tkAttribute'
"child"                 return      'tkChild'
"descendant"            return      'tkDescendant'         
"following"             return      'tkFollowing'
"namespace"             return      'tkNamespace'
"parent"                return      'tkParent'
"preceding"             return      'tkPreced'
"self"                  return      'tkSelf'
"last"                  return      'tkLast'
"node"                  return      'tkNode'
"position"              return      'tkPosition' 
"text"                  return      'tkText'
"or"                    return      'tkOr'
"div"                   return      'tkDiv'
"and"                   return      'tkAnd'
"mod"                   return      'tkMod' 
"false"                 return      'tkFalse'
"true"                  return      'tkTrue'    


"::"        return      'tkAccesPoints' 
"&&"        return      'tkAnd'
[|]        return       'tkUnion'
">="        return      'tkMayorIgual'
"<="        return      'tkMenorIgual'
">"         return      'tkMayor'
"<"         return      'tkMenor'
"="         return      'tkIgual'
"!="        return      'tkNotIgual'


"*"         return      'tkMul'
"+"         return      'tkSuma'
"-"         return      'tkResta'




/* Simbolos */
","     return  'tkComa'
"{"     return  'tkLlaveIzq'
"}"     return  'tkLlaveDer' 
"("     return  'tkParIzq'
")"     return  'tkParDer'
"["     return  'tkBraIzq'
"]"     return  'tkBraDer' 
[.]{2}  return  'tkPAbrev'  
[.]     return  'tkContexItemExpr'
"@"     return  'tkSelectAtrib'
[\/]{2} return  'tkCurrentNode' 
[\/]    return  'tkRoot'   


[0-9]+                      %{  return 'tkEntero';   %}
[0-9]+"."[0-9]+             %{  return 'tkDecimal';  %}
[a-zA-ZñÑ][a-zA-ZñÑ0-9_]*   %{  return 'tkId';       %}
"\""[^"\""]*"\""            %{  return 'tkCadena';   %} 


//\/\/.*                yytext = yytext.substr(2).trim(); return 'COMMENT'; // skip C++-style comments
//\/\*[\s\S]*?\*\/      yytext = yytext.substring(2, yyleng - 2).trim(); return 'COMMENT'; // skip C-style multi-line comments                          

[ \t\r\n\f] %{  /*Los Ignoramos*/   %}

<<EOF>>     %{  return 'EOF';   %}

//Para los eerrore que s enecunetren 
. insertError('Lexico',yylineno,'-', `No se esperaba este caracter ${yytext}`);


/* ====================================    Bison ======================*/
/lex

%options error-recovery-token-discard-count=42

%left  tkAnd tkOr 

%left tkMayor tkMayorIgual tkMenor tkMenorIgual tkIgual tkNotIgual

%left tkSuma tkResta
%left tkMod tkDiv tkMul
%left tkUnion
%left tkParIzq tkParDer
%left tkOrnodes
%left tkBraIzq tkBraDer
%token INVALID

%start S 

%%

S: Body  EOF                                                        {  $$= new Ast($1);   $$.errores = errorList; return  $$.execute(tablaSimbolos);    }
;


Body  : Expr                                                       { $$ = $1;  }
;


Expr : Expr tkSuma Expr                                            { $$= new Additive($2,$1,$3,errorList,yylineno, @2.first_column ); }
     | Expr tkResta Expr                                           { $$= new Additive($2,$1,$3,errorList,yylineno, @2.first_column ); }     
     | Expr tkDiv   Expr                                           { $$= new Div($1,$3,errorList,yylineno, @2.first_column );         }     
     | Expr tkMod   Expr                                           { $$= new Mod($1,$3,errorList,yylineno, @2.first_column );         }
     | Expr tkIgual Expr                                           { $$= new Equal($1,$3,errorList,yylineno,@2.first_column);         }
     | Expr tkNotIgual Expr                                        { $$ = new NotEqual($1,$3,errorList,yylineno,@2.first_column);     }
     | Expr tkMenor    Expr                                        { $$ = new LessThan($1,$3,errorList,yylineno,@2.first_column);     } 
     | Expr tkMayor    Expr                                        { $$ = new GreatThan($1,$3,errorList,yylineno,@2.first_column);    } 
     | Expr tkMayorIgual    Expr                                   { $$ = new GEThan($1,$3,errorList,yylineno,@2.first_column);       } 
     | Expr tkMenorIgual    Expr                                   { $$ = new LEThan($1,$3,errorList,yylineno,@2.first_column);       } 
     | Expr tkAnd    Expr                                          { $$ = new And($1,$3,errorList,yylineno,@2.first_column);          } 
     | Expr tkOr     Expr                                          { $$ = new Or($1,$3,errorList,yylineno,@2.first_column);           }
     | Expr tkUnion  Expr                                          { $$ = $1; } 
     | Expr tkMul    Expr                                          { $$ = new Mul($1,$3,errorList,yylineno,@2.first_column);   }
     | PathExpr                                                    { $$=$1;   }
    
;

PathExpr :  tkRoot RelativePathExpr                                 {  $$ =  new NodoCurrent(undefined,$2,errorList,yylineno,@1.first_column);     }                   
         |  tkCurrentNode RelativePathExpr                          {  $$ =  new NodoRaiz($2,errorList, yylineno,@1.first_column);                 }
         |  RelativePathExpr                                        {  $$=$1; }            
;


RelativePathExpr :  StepTemp                                        {  $$=$1; }
;

StepTemp : StepTemp NodeType StepExpr                               { $$ =  new NodoCurrent($1,$2,errorList,yylineno,@2.first_column);         }
         | StepExpr                                                 { $$=$1;  }
;

NodeType : tkRoot                                                   { $$=$1;  }
         | tkCurrentNode                                            { $$=$1;  }
;     

StepExpr : FilterExpr                                    {   $$=$1;    }
         | AxisStep                                      {   $$=$1;    }
;

AxisStep : AxisOption   PredicateList                    {             }
         | AxisOption                                    {             }
;

AxisOption : ReverseStep                                {            }    
            | ForwardStep                               {  $$=$1;    }
;            

ForwardStep : ForwardAxis tkAccesPoints NodeTest        {              }
            | AbbrevForwardStep                         {  $$ = $1;    }
;

ForwardAxis : tkChild                           { $$=1;  }  
             | tkDescendant                     { $$=1;  }
             | tkAttribute                      { $$=1;  }    
             | tkSelf                           { $$=1;  }
             | tkDescendantOS                   { $$=1;  }
             | tkFollowSibling                  { $$=1;  }
             | tkFollowing                      { $$=1;  }
             | tkNamespace                      { $$=1;  }
;

AbbrevForwardStep : tkSelectAtrib NodeTest              {             } 
                  | NodeTest                            {  $$=$1;     }
;

ReverseStep : ReverseAxis tkAccesPoints NodeTest        {       }  
            | tkPAbrev                                  {       }
;

ReverseAxis : tkParent                                  {  $$=1; }
            | tkAncestorOS                              {  $$=1; }    
            | tkPrecedSibling                           {  $$=1; }
            | tkPreced                                  {  $$=1; }
            | tkAncestor                                {  $$=1; }
;


NodeTest : tkId                                         {   $$= new Literal('id', $1, yylineno, @1.first_column );   }
        |  tkMul                                        {       }
;

FilterExpr  :  PrimaryExpr                              { $$=$1; }  
              |PrimaryExpr    PredicateList             {  }    

;

PredicateList :  PredicateList   Predicate               {     }    
              |  Predicate                               {     }
;

Predicate  : tkBraIzq Expr tkBraDer                     { $$=$2;   }
;


 PrimaryExpr :  tkParIzq Expr tkParDer                  { $$= $2;   }  
    | tkEntero                                          { $$ = new  Literal('int', parseInt($1), yylineno, @1.first_column );            }
    | tkDecimal                                         { $$ = new  Literal('decimal', $1, yylineno, @1.first_column);                   }
    | tkCadena                                          { $$ = new  Literal('cadena', $1, yylineno, @1.first_column );                   }
    | tkTrue                                            { $$ = new  Literal('boolean', $1, yylineno, @1.first_column );                  } 
    | tkFalse                                           { $$ = new  Literal('boolean', $1, yylineno, @1.first_column );                  } 
    | tkContexItemExpr                                  {     }
    | tkLast tkParIzq tkParDer                          {     }
    | tkText tkParIzq tkParDer                          {     }
    | tkPosition tkParIzq tkParDer                      {     } 
    | tkNode tkParIzq tkParDer                          {     }        

;


