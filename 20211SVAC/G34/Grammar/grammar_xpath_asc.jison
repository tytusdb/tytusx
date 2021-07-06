/* Definición Léxica */
%lex
%options case-insensitive
%%

\s+                   /* skip */
"//"                  { return "//";    }
"/"                   { return "/";     }
"("                   { return "(";     }
")"                   { return ")";     }
"["                   { return "[";     }
"]"                   { return "]";     }
"{"                   { return "{";     }
"}"                   { return "}";     } 
"::"                  { return "::";    }
"|"                   { return "|";     }
"+"                   { return "+";     }
"-"                   { return "-";     }
"*"                   { return "*";     }
"div"                 { return "div";   }
"="|"eq"              { return "=";     }
"!="|"ne"             { return "!=";    }
"<="|"le"             { return "<=";    }
">="|"ge"             { return ">=";    }
"<"|"lt"              { return "<";     }
">"|"gt"              { return ">";     }
"and"                 { return "and";   }
"or"	                { return "or";    }
"mod"                 { return "mod";   }
".."                  { return "..";    }
"."                   { return ".";     }
"@"                   { return "@";     }
","                   { return ",";     }
":="                  { return ":=";    }
"?"                   { return "?";     }
":"                   { return ":";     }
";"                   { return ";";     }

"node()"              { return "node()";      }
"text()"              { return "text()";      }
"last()"              { return "last()";      }
"position()"          { return "position()"; }

"ancestor-or-self"    { return "ancestor-or-self";   }
"descendant-or-self"  { return "descendant-or-self"; }
"following-sibling"   { return "following-sibling";  }
"preceding-sibling"   { return "preceding-sibling";  }
"ancestor"            { return "ancestor";           }
"attribute"           { return "attribute";          }
"child"               { return "child";              }
"descendant"          { return "descendant";         }
"following"           { return "following";          }
"namespace"           { return "namespace";          }
"parent"              { return "parent";             }
"preceding"           { return "preceding";          }
"self"                { return "self";               }

/* LEXICO XQUERY */
"for"                 { return "for";                }
"let"                 { return "let";                }
"where"               { return "where";              }
"order"               { return "order";              }
"return"              { return "return";             }
"by"                  { return "by";                 }
"in"                  { return "in";                 }
"to"                  { return "to";                 }
"if"                  { return "if";                 }
"then"                { return "then";               }
"else"                { return "else";               }
"string"              { return "string";             }
"integer"             { return "integer";            }
"float"               { return "float";              }
"decimal"             { return "decimal";            }
"declare"             { return "declare";            }
"as"                  { return "as";                 }
"xs"                  { return "xs";                 }
"function"            { return "function";           }
"local"               { return "local";              }
"substring"           { return "substring";          }
"upper-case"          { return "upper-case";         }
"lower-case"          { return "lower-case";         }
"number"              { return "number";             }
"string"              { return "string";             }
"boolean"             { return "boolean";            }

[0-9]+("."[0-9]+)?\b          { return "number_literal";  }
\".*?\"|\'.*?\'|\`.*?\`			  { yytext = yytext.substr(1,yyleng-2); return "string_literal"; }
("$")([a-zA-Z])[a-zA-Z0-9_]*  { return "identifier_xquery";      }
([a-zA-Z])[a-zA-Z0-9_]*	      { return "identifier";      }

<<EOF>>               { return "EOF"; }
.                     {yy.errorsXPATH.push(new yy.NodeError(yytext, 'lexico', 'Token no perteneciente al lenguaje.', yylloc.first_line, yylloc.first_column, 'XPATH'));}

/lex

%left ','
%right ':='
%left FLWOR
%left 'or'
%left 'and'
%left '<' '<=' '>' '>=' '!=' '=' '::'
%left 'to'
%left '+' '-'
%left '*' 'div' 'mod'
%left '|'
%right uminus
%left '//' '/'
%left '[' ']'

%start INI

/* Definición de la gramática */
%%

INI : EXP_MAIN EOF {
  yy.rgquerys.setValue('INI -> EXP EOF;\n');
  return new yy.AstXquery([$1], undefined);
}
| FUNCTIONS LEXP EOF{return new yy.AstXquery($2, $1); }
;

/* START XQUERY */

EXP_MAIN : EXP {yy.rgquerys.setValue('EXP_MAIN -> EXP ;\n'); $$ = $1; }
| FLWRExpr {yy.rgquerys.setValue('EXP_MAIN -> FLWRExp ;\n'); $$ = $1; }
| IFEXP { yy.rgquerys.setValue('EXP_MAIN -> IFEXP ;\n'); $$ = $1; }
| RETURN_ { yy.rgquerys.setValue('EXP_MAIN -> RETURN ;\n'); $$ = $1; }
| error 
     {
        yy.errorsXPATH.push(new yy.NodeError(yytext, 'Sintactico', 'se esperaba EXP|FLWREXPR|IFEXP|RETURN_', this._$.first_line, this._$.first_column, 'XPATH'));
     };

FLWRExpr : LCLAUSE WHERECLAUSE ORDERBY 'return' EXP_MAIN
          {
            yy.rgquerys.setValue('FLWRExpr -> LCLAUSE WHERECLAUSE ORDERBY return EXP_MAIN ;\n');
            $$ = new yy.Expression.FLWR(@1.first_line, @1.first_column, $1, $3, $2, new yy.Expression.Return(@1.first_line, @1.first_column, $5)); 
          }
         | LCLAUSE WHERECLAUSE  'return' EXP_MAIN
         {
           yy.rgquerys.setValue('FLWRExpr -> LCLAUSE WHERECLAUSE return EXP_MAIN ;\n');
           $$ = new yy.Expression.FLWR(@1.first_line, @1.first_column, $1, undefined, $2, new yy.Expression.Return(@1.first_line, @1.first_column, $4)); 
         }
         | LCLAUSE ORDERBY  'return' EXP_MAIN 
         {
            yy.rgquerys.setValue('FLWRExpr -> LCLAUSE ORDERBY return EXP_MAIN ;\n');
           $$ = new yy.Expression.FLWR(@1.first_line, @1.first_column, $1, $2, undefined, new yy.Expression.Return(@1.first_line, @1.first_column, $4)); 
         }
         | LCLAUSE 'return' EXP_MAIN { 
           yy.rgquerys.setValue('FLWRExpr -> LCLAUSE  return EXP_MAIN ;\n');
           $$ = new yy.Expression.FLWR(@1.first_line, @1.first_column, $1, undefined, undefined, new yy.Expression.Return(@1.first_line, @1.first_column, $3)); 
           };

ORDERBY: 'order' 'by' EXP_MAIN { yy.rgquerys.setValue('ORDERBY -> order by  EXP_MAIN ;\n');
        $$ = new yy.Expression.OrderBy(@1.first_line, @1.first_column, $3); } ;

WHERECLAUSE : 'where' EXP_MAIN { 
                yy.rgquerys.setValue('WHERECLAUSE -> were   EXP_MAIN ;\n');
                $$ = new yy.Expression.Where(@1.first_line, @1.first_column, $2); };

LCLAUSE : LCLAUSE CLAUSE {yy.rgquerys.setValue('LCLAUSE -> LCLAUSE CLAUSE;\n'); $1.push($2); $$ = $1; }
        | CLAUSE { yy.rgquerys.setValue('LCLAUSE->CLAUSE;\n'); $$ = [$1]; } ;

CLAUSE : 'for' LFOR { 
              yy.rgquerys.setValue('CLAUSE -> for LFOR ;\n');
              $$ = new yy.Expression.ForStament(@1.first_line, @1.first_column, $2); }
       | 'let' LLET {
                  yy.rgquerys.setValue('CLAUSE -> let;\n'); 
                  $$ = new yy.Expression.LetStament(@1.first_line, @1.first_column, $2); };

LFOR : LFOR ',' identifier_xquery 'in' EXP_MAIN
      {
        yy.rgquerys.setValue('LFOR -> LFOR , identificador_xquery in EXP_MAIN ;\n');
        $1.push(new yy.Expression.Assigment(@1.first_line, @1.first_column, $3, $5));
        $$ = $1;
      }
     | identifier_xquery 'in' EXP_MAIN {
       yy.rgquerys.setValue('LFOR -> identificador_xquery in  EXP_MAIN ;\n');
       $$ = [new yy.Expression.Assigment(@1.first_line, @1.first_column, $1, $3)];
     };

LLET : LLET ',' identifier_xquery ':=' EXP_MAIN 
      {
        yy.rgquerys.setValue('LLET -> LLET , identificador_xquery :=  EXP_MAIN ;\n');
        $1.push(new yy.Expression.Assigment(@1.first_line, @1.first_column, $3, $5));
        $$ = $1;
      }
     | identifier_xquery ':=' EXP_MAIN {
       yy.rgquerys.setValue('LLET -> identificador_xquery :=  EXP_MAIN ;\n');
       $$ = [new yy.Expression.Assigment(@1.first_line, @1.first_column, $1, $3)];
     };



IFEXP : 'if' '(' EXP_MAIN ')' 'then' EXP_MAIN 'else' EXP_MAIN
      {
        yy.rgquerys.setValue('IFEXP -> if ( EXP_MAIN ) then EXP_MAIN else  EXP_MAIN ;\n');
        $$ = new yy.Expression.IfStament(@1.first_line, @1.first_column, $3, $6, $8);
      };

FUNCTIONS : FUNCTIONS FUNCTION {yy.rgquerys.setValue('FUNCTIONS -> FUNCTIONS FUNCTION;\n'); $1.push($2); $$ = $1; }
          | FUNCTION {yy.rgquerys.setValue('FUNCTIONS -> FUNCTION ;\n'); $$ = [$1]; };

FUNCTION : 'declare' 'function' 'local' ':' identifier '(' LPARAMS ')' 'as' DATATYPE '?' '{' EXP_MAIN '}' ';'
         {
           yy.rgquerys.setValue('FUNCTION -> declare function local : identicador ( LPARAMS ) as DATATYPE ? { EXP_MAIN } ; ;\n');
           $$ = new yy.FunctionXquery(@1.first_line, @1.first_column, $5, $7, $10, $13);
         }
         | 'declare' 'function' 'local' ':' identifier '(' ')' 'as' DATATYPE '?' '{' EXP_MAIN '}' ';'
         {
           yy.rgquerys.setValue('FUNCTION -> declare function local : identicador ( ) as DATATYPE ? { EXP_MAIN} ; ;\n');
           $$ = new yy.FunctionXquery(@1.first_line, @1.first_column, $5, undefined, $9, $12);
         }
;

//BODYFUNCTION : BODYFUNCTION EXP_MAIN
//             | EXP_MAIN;

RETURN_ : 'return' EXP_MAIN { 
  yy.rgquerys.setValue('RETURN_ -> return EXP_MAIN ;\n');
  $$ = new yy.Expression.Return(@1.first_line, @1.first_column, $2); };

LPARAMS : LPARAMS ',' identifier_xquery 'as' DATATYPE '?' { 
          yy.rgquerys.setValue('LPARAMS -> LPARAMS ,  identificador_xquery as DATATYPE ? ;\n');
          $1.push(new yy.ParamsXquery(@1.first_line, @1.first_column, $3, $5));
          $$ = $1; 
        }
        | identifier_xquery 'as' DATATYPE '?' { 
          yy.rgquerys.setValue('LPARAMS -> identificador_xquery as  DATATYPE ?;\n');
          $$ = [new yy.ParamsXquery(@1.first_line, @1.first_column, $1, $3)]; };

DATATYPE : 'xs' ':' TYPE {  yy.rgquerys.setValue('DATATYPE -> xs :  TYPE ;\n'); $$ = $3; };

TYPE : 'string'  {yy.rgquerys.setValue('TYPE -> string;\n'); $$ = $1; }
     | 'integer' {yy.rgquerys.setValue('TYPE -> integer;\n'); $$ = 'number'; }
     | 'decimal' {yy.rgquerys.setValue('TYPE -> decimal;\n'); $$ = 'number'; }
     | 'float'   {yy.rgquerys.setValue('TYPE -> float ;\n'); $$ = 'number'; }
     | 'boolean' {yy.rgquerys.setValue('TYPE -> boolean ;\n'); $$ = 'boolean'; };

//LC : LC ',' CALL_FUNCTION { $1.push($3); $$ = $1; }
//| CALL_FUNCTION { $$ = [$1]; };

CALL_FUNCTION : 'local' ':' identifier '(' LEXP ')' {
                yy.rgquerys.setValue('CALL_FUNCTION -> local : identicador  ( LEXP ) ;\n');
                $$ = new yy.Expression.CallFunctions(@1.first_line, @1.first_column, $3, $5);
              }
              | 'local' ':' identifier '(' ')' {
                yy.rgquerys.setValue('CALL_FUNCTION -> local : identicador  () ;\n');
                $$ = new yy.Expression.CallFunctions(@1.first_line, @1.first_column, $3, undefined); 
              }
              | 'substring' '(' EXP_MAIN ',' EXP_MAIN ',' EXP_MAIN ')' { 
                yy.rgquerys.setValue('CALL_FUNCTION -> SUBSTRING ( EXP, EXP, EXP );\n');
                $$ = new yy.Expression.SubString(@1.first_line, @1.first_column, $3, $5, $7); 
              }
              | 'substring' '(' EXP_MAIN ',' EXP_MAIN ')' { 
                yy.rgquerys.setValue('CALL_FUNCTION -> SUBSTRING ( EXP, EXP );\n');
                $$ = new yy.Expression.SubString(@1.first_line, @1.first_column, $3, $5, undefined); 
              }
              | 'number' '(' EXP_MAIN ')' { 
                yy.rgquerys.setValue('CALL_FUNCTION -> NUMBER ( EXP );\n');
                $$ = new yy.Expression.NumberFn(@1.first_line, @1.first_column, $3); 
              }
              | 'string' '(' EXP_MAIN ')' { 
                yy.rgquerys.setValue('CALL_FUNCTION -> STRING ( EXP );\n');
                $$ = new yy.Expression.StringFn(@1.first_line, @1.first_column, $3); 
              }
              | 'upper-case' '(' EXP_MAIN ')' { 
                yy.rgquerys.setValue('CALL_FUNCTION -> UPPER-CASE ( EXP );\n');
                $$ = new yy.Expression.UpperCase(@1.first_line, @1.first_column, $3); 
              }
              | 'lower-case' '(' EXP_MAIN ')' { 
                yy.rgquerys.setValue('CALL_FUNCTION -> LOWER-CASE ( EXP );\n');
                $$ = new yy.Expression.LowerCase(@1.first_line, @1.first_column, $3); 
              };

LEXP : LEXP ',' EXP_MAIN {yy.rgquerys.setValue('LEXP -> LEXP ,  EXP_MAIN ;\n');$1.push($3); $$ = $1; }
     | EXP_MAIN {yy.rgquerys.setValue('LEXP ->EXP_MAIN ;\n'); $$ = [$1]; };

/* END XQUERY */

UNION_PATH : UNION_PATH '|' PATH_EXP_NO_ROOT {
  yy.rgquerys.setValue('UNION_PATH -> UNION_PATH | PATH_EXP_NO_ROOT;\n');
  $1.push($3);
  $$ = $1;
}
| PATH_EXP_NO_ROOT {
  yy.rgquerys.setValue('UNION_PATH -> PATH_EXP_NO_ROOT;\n');
  $$ = [$1];
}
;

LOCATION_PATH : RELATIVE_LOCATION_PATH { yy.rgquerys.setValue('LOCATION_PATH -> RELATIVE_LOCATION_PATH;\n'); $$ = $1; }
| ABSOLUTE_LOCATION_PATH { yy.rgquerys.setValue('LOCATION_PATH -> ABSOLUTE_LOCATION_PATH;\n'); $$ = $1; }
;

ABSOLUTE_LOCATION_PATH : '//' RELATIVE_LOCATION_PATH {
  yy.rgquerys.setValue('ABSOLUTE_LOCATION_PATH -> // RELATIVE_LOCATION_PATH;\n');
  $2[0] = new yy.Expression.RelativeLocationPath(
    @1.first_line, @1.first_column, $2[0]
  );
  $$ = $2;
}
| '/' RELATIVE_LOCATION_PATH {
  yy.rgquerys.setValue('ABSOLUTE_LOCATION_PATH -> / RELATIVE_LOCATION_PATH;\n');
  $2[0] = new yy.Expression.AbsoluteLocationPath(
    @1.first_line, @1.first_column, $2[0]
  );
  $$ = $2;
}
;

RELATIVE_LOCATION_PATH : RELATIVE_LOCATION_PATH '//' STEP_ROOT {
  yy.rgquerys.setValue('RELATIVE_LOCATION_PATH -> // STEP_ROOT;\n');
  $1.push(new yy.Expression.RelativeLocationPath(
    @1.first_line, @1.first_column, $3
  ));
  $$ = $1;
}
| RELATIVE_LOCATION_PATH '/' STEP_ROOT {
  yy.rgquerys.setValue('RELATIVE_LOCATION_PATH -> / STEP_ROOT;\n');
  $1.push(new yy.Expression.AbsoluteLocationPath(
    @1.first_line, @1.first_column, $3
  ));
  $$ = $1;
}
| STEP_ROOT {
  yy.rgquerys.setValue('RELATIVE_LOCATION_PATH -> STEP_ROOT;\n');
  $$ = [$1];
}
;

STEP_ROOT : STEP PREDICATE {
  yy.rgquerys.setValue('STEP_ROOT -> STEP PREDICATE;\n');
  $$ = new yy.Expression.Predicate(@1.first_line, @1.first_column, $1, $2);
}
| STEP {
  yy.rgquerys.setValue('STEP_ROOT -> STEP;\n');
  $$ = $1;
}
| ABBREVIATED_STEP { yy.rgquerys.setValue('STEP_ROOT -> ABBREVIATED_STEP;\n'); $$ = $1; }
;

STEP : AXIS_NAME '::' NODE_TEST {
  yy.rgquerys.setValue('STEP -> AXIS_NAME :: NODE_TEST;\n');
  $1.nameAxis = $3.name;
  $$ = $1;
}
| '@' NODE_TEST { yy.rgquerys.setValue('STEP -> @ NODE_TEST;\n'); 
                $$= new yy.Expression.atributo(@1.first_line, @1.first_column, $2.name); }
| NODE_TEST {
  yy.rgquerys.setValue('STEP -> NODE_TEST;\n');
  $$ = $1;
}
;

ABBREVIATED_STEP : '.' { 
  yy.rgquerys.setValue('ABBREVIATED_STEP -> .;\n');
  $$ = new yy.Expression.Abbreviated(@1.first_line, @1.first_column, false); 
}
| '..' { 
  yy.rgquerys.setValue('ABBREVIATED_STEP -> ..;\n');
  $$ = new yy.Expression.Abbreviated(@1.first_line, @1.first_column, true); 
}
;

NODE_TEST : NAME_TEST {
  yy.rgquerys.setValue('NODE_TEST -> NAME_TEST;\n');
  $$ = $1;
}
| NODE_TYPE {
  yy.rgquerys.setValue('NODE_TEST -> NODE_TYPE;\n');
  $$ = $1;
}
;

NAME_TEST : '*' {
  yy.rgquerys.setValue('NAME_TEST -> *;\n');
  $$ = new yy.Expression.NodeAll(@1.first_line, @1.first_column);
}
| CNAME {
  yy.rgquerys.setValue('NAME_TEST -> CNAME;\n');
  $$ = $1;
}
;

CNAME : identifier {
  yy.rgquerys.setValue('CNAME -> ID;\n');
  $$ = new yy.Expression.Identifier(@1.first_line, @1.first_column, $1);
}
|identifier_xquery{
  yy.rgquerys.setValue('CNAME -> ID_XQUERY;\n');
  $$ = new yy.Expression.IdentifierXquery(@1.first_line, @1.first_column, $1);
}
| CALL_FUNCTION { yy.rgquerys.setValue('CNAME -> CALL_FUNCTION;\n'); $$ = $1; }
| AXIS_NAME {
  yy.rgquerys.setValue('CNAME -> AXIS_NAME;\n');
  $$ = $1;
};

NODE_TYPE : 'node()' { 
  yy.rgquerys.setValue('NODE_TYPE -> NODE();\n');
  $$ = new yy.Expression.Nodo(@1.first_line, @1.first_column); 
}
| 'text()' { 
  yy.rgquerys.setValue('NODE_TYPE -> TEXT();\n');
  $$ = new yy.Expression.Text(@1.first_line, @1.first_column); 
}
;

AXIS_NAME : 'ancestor' {
  yy.rgquerys.setValue('AXIS_NAME -> ANCESTOR;\n');
  $$ = new yy.Expression.Ancestor(@1.first_line, @1.first_column);
}
| 'ancestor-or-self' {
  yy.rgquerys.setValue('AXIS_NAME -> ANCESTOR-OR-SELF;\n');
  $$ = new yy.Expression.AncestorOrSelf(@1.first_line, @1.first_column);
}
| 'attribute'{
  yy.rgquerys.setValue('AXIS_NAME -> ATTRIBUTE-OR-SELF;\n');
  $$ = new yy.Expression.Attribute(@1.first_line, @1.first_column);
}
| 'child'{
  yy.rgquerys.setValue('AXIS_NAME -> CHILD;\n');
  $$ = new yy.Expression.Child(@1.first_line, @1.first_column);
}

| 'descendant'{
  yy.rgquerys.setValue('AXIS_NAME -> DESCAENDANT;\n');
  $$ = new yy.Expression.Descendant(@1.first_line, @1.first_column);
}
| 'descendant-or-self'{
  yy.rgquerys.setValue('AXIS_NAME -> DESCENDANT-OR-SELF;\n');
  $$ = new yy.Expression.DescendantOrSelf(@1.first_line, @1.first_column);
}
| 'following' {
  yy.rgquerys.setValue('AXIS_NAME -> FOLLOWING;\n');
  $$ = new yy.Expression.Following(@1.first_line, @1.first_column);
}
| 'following-sibling' {
  yy.rgquerys.setValue('AXIS_NAME -> FOLLOWING-SIBLING;\n');
  $$ = new yy.Expression.FollowingSibling(@1.first_line, @1.first_column);
}
| 'namespace' {
  yy.rgquerys.setValue('AXIS_NAME -> NAMESPACE;\n');
  $$ = new yy.Expression.Namespace(@1.first_line, @1.first_column);
}
| 'parent' {
  yy.rgquerys.setValue('AXIS_NAME -> PARENT;\n');
  $$ = new yy.Expression.Parent(@1.first_line, @1.first_column);
}
| 'preceding' {
  yy.rgquerys.setValue('AXIS_NAME -> PRECEDING;\n');
  $$ = new yy.Expression.Preceding(@1.first_line, @1.first_column);
}
| 'preceding-sibling' {
  yy.rgquerys.setValue('AXIS_NAME -> PRECEDING-SIBLING;\n');
  $$ = new yy.Expression.PrecedingSibling(@1.first_line, @1.first_column);
}
| 'self' {
  yy.rgquerys.setValue('AXIS_NAME -> SELF;\n');
  $$ = new yy.Expression.Self(@1.first_line, @1.first_column);
}
;

PREDICATE : '[' EXP ']' { yy.rgquerys.setValue('PREDICATE -> [ EXP ];\n'); $$ = $2; }
;

PATH_EXP_NO_ROOT: LOCATION_PATH {
  yy.rgquerys.setValue('PATH_EXP_NO_ROOT -> LOCATION_PATH;\n');
  $$ = new yy.Expression.PathExp(@1.first_line, @1.first_column, $1);
}
| FILTER_EXP '//' RELATIVE_LOCATION_PATH {
  yy.rgquerys.setValue('PATH_EXP_NO_ROOT -> // RELATIVE_LOCATION_PATH;\n');
}
| FILTER_EXP '/' RELATIVE_LOCATION_PATH {
  yy.rgquerys.setValue('PATH_EXP_NO_ROOT -> / RELATIVE_LOCATION_PATH;\n');
}
| FILTER_EXP { yy.rgquerys.setValue('PATH_EXP_NO_ROOT -> FILTER_EXP;\n'); $$ = $1; }
;

FILTER_EXP: PRIMARY_EXP { yy.rgquerys.setValue('FILTER_EXP -> PRIMARY_EXP;\n'); $$ = $1; }
| PRIMARY_EXP PREDICATE {
  yy.rgquerys.setValue('FILTER_EXP -> PRIMARY_EXP PREDICATE;\n');
  $$ = new yy.Expression.Predicate(@1.first_line, @1.first_column, $1, $2);
}
;

EXP : EXP 'or' EXP { yy.rgquerys.setValue('EXP -> EXP OR EXP;\n'); $$ = new yy.Expression.Or(@1.first_line, @1.first_column, $1, $3, $2); }
| EXP 'and' EXP { yy.rgquerys.setValue('EXP -> EXP AND EXP;\n'); $$ = new yy.Expression.And(@1.first_line, @1.first_column, $1, $3, $2); }
| EXP '='   EXP { yy.rgquerys.setValue('EXP -> EXP = EXP;\n'); $$ = new yy.Expression.Relational(@1.first_line, @1.first_column, $1, $3, "="); }
| EXP '!='  EXP { yy.rgquerys.setValue('EXP -> EXP != EXP;\n'); $$ = new yy.Expression.Relational(@1.first_line, @1.first_column, $1, $3, "!="); }
| EXP '<'   EXP { yy.rgquerys.setValue('EXP -> EXP < EXP;\n'); $$ = new yy.Expression.Relational(@1.first_line, @1.first_column, $1, $3, "<"); }
| EXP '>'   EXP { yy.rgquerys.setValue('EXP -> EXP > EXP;\n'); $$ = new yy.Expression.Relational(@1.first_line, @1.first_column, $1, $3, ">"); }
| EXP '<='  EXP { yy.rgquerys.setValue('EXP -> EXP <= EXP;\n'); $$ = new yy.Expression.Relational(@1.first_line, @1.first_column, $1, $3, "<="); }
| EXP '>='  EXP { yy.rgquerys.setValue('EXP -> EXP >= EXP;\n'); $$ = new yy.Expression.Relational(@1.first_line, @1.first_column, $1, $3, ">="); }
| EXP '+'   EXP { yy.rgquerys.setValue('EXP -> EXP + EXP;\n'); $$ = new yy.Expression.Arithmetic(@1.first_line, @1.first_column, $1, $3, $2); }
| EXP '-'   EXP { yy.rgquerys.setValue('EXP -> EXP - EXP;\n'); $$ = new yy.Expression.Arithmetic(@1.first_line, @1.first_column, $1, $3, $2); }
| EXP '*'   EXP { yy.rgquerys.setValue('EXP -> EXP * EXP;\n'); $$ = new yy.Expression.Arithmetic(@1.first_line, @1.first_column, $1, $3, $2); }
| EXP 'div' EXP { yy.rgquerys.setValue('EXP -> EXP DIV EXP;\n'); $$ = new yy.Expression.Arithmetic(@1.first_line, @1.first_column, $1, $3, $2); }
| EXP 'mod' EXP { yy.rgquerys.setValue('EXP -> EXP MOD EXP;\n'); $$ = new yy.Expression.Arithmetic(@1.first_line, @1.first_column, $1, $3, $2); }
| EXP 'to' EXP  { yy.rgquerys.setValue('EXP -> EXP TO EXP;\n'); $$ = new yy.Expression.To(@1.first_line, @1.first_column, $1, $3); }
| '-' EXP %prec uminus { yy.rgquerys.setValue('EXP -> - EXP;\n'); $$ = new yy.Expression.NegativeNumber(@1.first_line, @1.first_column, $2); }
| '(' ')' { 
  yy.rgquerys.setValue('PRIMARY_EXP -> ();\n');
  $$ = new yy.Expression.Epsilon(@1.first_line, @1.first_column); 
  }
| UNION_PATH {
  yy.rgquerys.setValue('EXP -> UNION_PATH;\n');
  $$ = new yy.Expression.UnionPath(@1.first_line, @1.first_column, $1);
}
;

PRIMARY_EXP: '(' EXP_MAIN ')' { yy.rgquerys.setValue('PRIMARY_EXP -> ( EXP );\n'); $$ = $2; }
| string_literal {
  yy.rgquerys.setValue('PRIMARY_EXP -> STRING_LITERAL;\n');
  $$ = new yy.Expression.Literal(@1.first_line, @1.first_column, $1, "string");
}
| number_literal {
  yy.rgquerys.setValue('PRIMARY_EXP -> NUMBER_LITERAL;\n');
  $$ = new yy.Expression.Literal(@1.first_line, @1.first_column, +$1, "number");
}
| 'last()' { yy.rgquerys.setValue('PRIMARY_EXP -> LAST();\n'); 
          $$ = new yy.Expression.Last(@1.first_line, @1.first_column);}

| 'position()' { yy.rgquerys.setValue('PRIMARY_EXP -> POSITION();\n'); 
              $$ = new yy.Expression.Position(@1.first_line, @1.first_column);}
;
