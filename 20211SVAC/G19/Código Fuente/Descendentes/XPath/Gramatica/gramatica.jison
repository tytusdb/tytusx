%lex
%options case-insensitive

%%
"*"         return 'asterisk';
".."        return 'twoPoint';
"."         return 'point';
"("         return 'parIzq';
")"         return 'parDer';
"{"         return 'llaIzq';
"}"         return 'llaDer';
"::"        return 'doubleColon';
":"         return 'colon';
"|"         return 'barra';
"["         return 'corcheteIzq';
"]"         return 'corcheteDer';
";"         return 'ptcoma';
"+"         return 'add';
","         return 'comma';
"-"         return 'minus';
"=>"        return 'arrow';
"="         return 'equal';
"/""/"      return 'doubleSlash';
"/"         return 'slash';

"!="        return 'diferent';
"<"         return 'menor';
"<="        return 'menorIgual';
">"         return 'mayor';
">="        return 'mayorIgual';
"@"         return 'at';
"or"        return 'or';
"let"       return 'let';
"last"      return 'last';
"and"       return 'and';
"div"       return 'div';
"mod"       return 'mod';
"text"      return 'text';
"node"      return 'node';
"child"     return 'child';
"self"      return 'self';
"parent"    return 'parent';
"comment"   return 'comment';
"element"   return 'element';
"ancestor"  return 'ancestor';
"namespace" return 'namespace';
"attribute" return 'attribute';
"preceding" return 'preceding';
"following" return 'following';
"ancestor_or_self"   return 'ancestor_or_self';
"descendant_or_self" return 'descendant_or_self';
"following_sibling"  return 'following_sibling';
"preceding_sibling"  return 'preceding_sibling';
"processing_instruction" return 'processing_instruction';

[ \r\t]+     {}
\n           {}
[0-9]+                      return  'digits';
[0-9]+("."[0-9]+)?  return  'decimal';
(\"({EscapeQuot}|[^"])\")|("'""({EscapeApos}|[^'])""'") return 'cadena';
[A-Za-z_][A-Za-z_0-9]*	    return 'id';


<<EOF>>                 return 'EOF';

/lex


%right 'equal'
%left 'or', 'barra'
%left 'and'
%left 'mayor', 'menor', 'mayorIgual', 'menorIgual', 'diferent'



%left 'add', 'minus' /binary/
%left 'asterisk', 'slash', 'mod'


%left 'doubleSlash'
%left 'parIzq', 'parDer', 'corcheteIzq', 'corcheteDer'



%start ini
%%
ini
        :XPATH EOF {
            $$ = new NodeDesc('INI');
            $$.setChild($1);
            return $$;
        }
;
XPATH:
        ENTRY LIST_STEP{
            $$ = new NodeDesc('XPATH');
            $$.setChild($1);
            $$.setChild($2);

        }
    |   LIST_STEP {
        $$ = new NodeDesc('XPATH');
        $$.setChild($1);
    }
;

ENTRY
        :slash{
            $$ = new NodeDesc('ENTRY');
            $$.setChild($1);
        }
        |doubleSlash{
            $$ = new NodeDesc('ENTRY');
            $$.setChild($1);
        }
;

LIST_STEP: STEP LIST_STEPP {
    $$ = new NodeDesc('LIST_STEP');
    $$.setChild($1);
    $$.setChild($2);

}
;

LIST_STEPP: SEPARATE STEP LIST_STEPP {
    $$ = new NodeDesc(`LIST_STEP'`);
    $$.setChild($1);
    $$.setChild($2);
    $$.setChild($3);
}
    |
;

SEPERATE
        :barra ENTRY {
            $$ = new NodeDesc(`SEPARATE`);
            $$.setChild($1);
            $$.setChild($2);
        }
        |barra {
            $$ = new NodeDesc(`SEPARATE`);
            $$.setChild($1);
        }
        |slash {
            $$ = new NodeDesc(`SEPARATE`);
            $$.setChild($1);
        }
        |doubleSlash {
            $$ = new NodeDesc(`SEPARATE`);
            $$.setChild($1);
        }
;

STEP
        :id LIST_PREDICATE {
            $$ = new NodeDesc(`STEP`);
            $$.setChild($1);
            $$.setChild($2);
        }
        |id {
            $$ = new NodeDesc(`STEP`);
            $$.setChild($1);
        }
        |AXIS {
            $$ = new NodeDesc(`STEP`);
            $$.setChild($1);
        }
        |WILDCARD {
            $$ = new NodeDesc(`STEP`);
            $$.setChild($1);
        }

;


LIST_PREDICATE: PREDICATE LIST_PREDICATEP { 
    $$ = new NodeDesc(`LIST_PREDICATE`);
    $$.setChild($1);
    $$.setChild($2);
}
;

LIST_PREDICATEP: PREDICATE LIST_PREDICATEP {
    $$ = new NodeDesc(`LIST_PREDICATEP`);
    $$.setChild($1);
    $$.setChild($2);
}
        |
;

PREDICATE:
    corcheteIzq LIST_E corcheteDer {
        $$ = new NodeDesc(`PREDICATE`);
        $$.setChild($1);
        $$.setChild($2);
        $$.setChild($3);
    }
;

LIST_E: E LIST_EP {
        $$ = new NodeDesc(`LIST_E`);
        $$.setChild($1);
        $$.setChild($2);
};

LIST_EP: OP E LIST_EP{
    $$ = new NodeDesc(`LIST_E'`);
    $$.setChild($1);
    $$.setChild($2);
    $$.setChild($3);
}
    |
;

OP
        :add {
            $$ = new NodeDesc(`OP`);
            $$.setChild($1);
        }
        |minus {
            $$ = new NodeDesc(`OP`);
            $$.setChild($1);
        }
        |asterisk{
            $$ = new NodeDesc(`OP`);
            $$.setChild($1);
        }
        |slash{
            $$ = new NodeDesc(`OP`);
            $$.setChild($1);
        }
        |equal{
            $$ = new NodeDesc(`OP`);
            $$.setChild($1);
        }
        |diferent{
            $$ = new NodeDesc(`OP`);
            $$.setChild($1);
        }
        |menor{
            $$ = new NodeDesc(`OP`);
            $$.setChild($1);
        }
        |menorIgual{
            $$ = new NodeDesc(`OP`);
            $$.setChild($1);
        }
        |mayorIgual{
            $$ = new NodeDesc(`OP`);
            $$.setChild($1);
        }
        |mayor{
            $$ = new NodeDesc(`OP`);
            $$.setChild($1);
        }
        |or{
            $$ = new NodeDesc(`OP`);
            $$.setChild($1);
        }
        |barra{
            $$ = new NodeDesc(`OP`);
            $$.setChild($1);
        }
        |and{
            $$ = new NodeDesc(`OP`);
            $$.setChild($1);
        }
        |mod{
            $$ = new NodeDesc(`OP`);
            $$.setChild($1);
        }

;

E:
    STEP{
        $$ = new NodeDesc(`E`);
        $$.setChild($1);
    }
    |ENTRY{
        $$ = new NodeDesc(`E`);
        $$.setChild($1);
    }
    |decimal{
        $$ = new NodeDesc(`E`);
        $$.setChild($1);
    }
    |digits{
        $$ = new NodeDesc(`E`);
        $$.setChild($1);
    }
    |cadena{
        $$ = new NodeDesc(`E`);
        $$.setChild($1);
    }

;
AXIS
        :AXIS_NAME doubleColon STEP {
            $$ = new NodeDesc(`AXIS`);
            $$.setChild($1);
            $$.setChild($2);
            $$.setChild($3);
        }
        |AXIS_NAME{
            $$ = new NodeDesc(`AXIS`);
            $$.setChild($1);
        }
;

AXIS_NAME
        :ancestor{
            $$ = new NodeDesc(`AXIS_NAME`);
            $$.setChild($1);
        }
        |ancestor_or_self{
            $$ = new NodeDesc(`AXIS_NAME`);
            $$.setChild($1);
        }
        |attribute{
            $$ = new NodeDesc(`AXIS_NAME`);
            $$.setChild($1);
        }
        |child{
            $$ = new NodeDesc(`AXIS_NAME`);
            $$.setChild($1);
        }
        |descendant{
            $$ = new NodeDesc(`AXIS_NAME`);
            $$.setChild($1);
        }
        |descendant_or_self{
            $$ = new NodeDesc(`AXIS_NAME`);
            $$.setChild($1);
        }
        |following{
            $$ = new NodeDesc(`AXIS_NAME`);
            $$.setChild($1);
        }
        |following_sibling{
            $$ = new NodeDesc(`AXIS_NAME`);
            $$.setChild($1);
        }
        |namespace{
            $$ = new NodeDesc(`AXIS_NAME`);
            $$.setChild($1);
        }
        |parent{
            $$ = new NodeDesc(`AXIS_NAME`);
            $$.setChild($1);
        }
        |preceding{
            $$ = new NodeDesc(`AXIS_NAME`);
            $$.setChild($1);
        }
        |preceding_sibling{
            $$ = new NodeDesc(`AXIS_NAME`);
            $$.setChild($1);
        }
        |self{
            $$ = new NodeDesc(`AXIS_NAME`);
            $$.setChild($1);
        }
;

WILDCARD
        :asterisk{
            $$ = new NodeDesc(`WILDCARD`);
            $$.setChild($1);
        }
        |twoPoint{
            $$ = new NodeDesc(`WILDCARD`);
            $$.setChild($1);
        }
        |point{
            $$ = new NodeDesc(`WILDCARD`);
            $$.setChild($1);
        }
        |at asterisk{
            $$ = new NodeDesc(`WILDCARD`);
            $$.setChild($1);
            $$.setChild($2);
        }
        |at id PREDICATE{
            $$ = new NodeDesc(`WILDCARD`);
            $$.setChild($1);
            $$.setChild($2);
            $$.setChild($3);
        }
        |at id{
            $$ = new NodeDesc(`WILDCARD`);
            $$.setChild($1);
            $$.setChild($2);
        }
        |node parIzq parDer{
            $$ = new NodeDesc(`WILDCARD`);
            $$.setChild($1);
            $$.setChild($2);
            $$.setChild($3);
        }
        |text parIzq parDer{
            $$ = new NodeDesc(`WILDCARD`);
            $$.setChild($1);
            $$.setChild($2);
            $$.setChild($3);
        }
        |last parIzq parDer{
            $$ = new NodeDesc(`WILDCARD`);
            $$.setChild($1);
            $$.setChild($2);
            $$.setChild($3);
        }
;
