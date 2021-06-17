/*definición léxica*/
%{

%}

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

/*Espacios en blanco*/
[ \r\t]+     {}
\n           {}
[0-9]+                      return  'digits';
[0-9]+("."[0-9]+)?  return  'decimal';
(\"({EscapeQuot}|[^"])*\")|("'""({EscapeApos}|[^'])*""'") return 'cadena';
[A-Za-z_][A-Za-z_0-9]*	    return 'id';


<<EOF>>                 return 'EOF';
.       {
        console.error('Error');
}
/lex

/* Asociación de operadores y precedencia */
%right 'equal'
%left 'or', 'barra'
%left 'and'
%left 'mayor', 'menor', 'mayorIgual', 'menorIgual', 'diferent'



%left 'add', 'minus' /*binary*/
%left 'asterisk', 'slash', 'mod'


%left 'doubleSlash'
%left 'parIzq', 'parDer', 'corcheteIzq', 'corcheteDer'





%start ini
%% /*definicion de gramática*/

ini
        :XPATH EOF {
            $$ = new NodeDesc('INI', '');
            $$.setChild($1);
            return $$;
        }
;
XPATH:
        ENTRY LIST_STEP{
            $$ = new NodeDesc('XPATH', '');
            $$.setChild($1);
            $$.setChild($2);

        }
    |   LIST_STEP {
        $$ = new NodeDesc('XPATH', '');
        $$.setChild($1);
    }
;
ENTRY
        :slash{
            $$ = new NodeDesc('ENTRY', '');
            $$.setChild(new NodeDesc($1, 'SLASH'));
        }
        |doubleSlash{
            $$ = new NodeDesc('ENTRY', '');
            $$.setChild(new NodeDesc($1, 'DOUBLESLASH'));
        }
;

LIST_STEP: STEP LIST_STEPP {
    $$ = new NodeDesc('LIST_STEP', '');
    $$.setChild($1);
    if($2 === undefined || !$2) {
        $$.setChild(new NodeDesc('LIST_STEPP', ''));
    } else {
        $$.setChild($2);
        $$.setChild(new NodeDesc("EPSILON", ''));
    }

};

LIST_STEPP: SEPARATE STEP LIST_STEPP {
    $$ = new NodeDesc("LIST_STEPP", '');
    $$.setChild($1);
    $$.setChild($2);

    if($3 === undefined || !$3) {
        $$.setChild(new NodeDesc("EPSILON", ''));
    } else {
        $$.setChild($3);
    }
}
|  {}
    ;

SEPARATE
        :barra ENTRY {
    $$ = new NodeDesc("SEPARATE", '');
    $$.setChild(new NodeDesc($1, 'BARRA'));
    $$.setChild($2);
        }
        |barra {
            $$ = new NodeDesc("SEPARATE", '');
            $$.setChild(new NodeDesc($1, 'BARRA'));
        }
        |slash {
            $$ = new NodeDesc("SEPARATE", '');
            $$.setChild(new NodeDesc($1, 'SLASH'));
        }
        |doubleSlash {
            $$ = new NodeDesc("SEPARATE", '');
            $$.setChild(new NodeDesc($1, 'DOUBLESLASH'));
        }
;

STEP
        :id LIST_PREDICATE {
            $$ = new NodeDesc("STEP", '');
            $$.setChild(new NodeDesc($1, 'ID'));
            $$.setChild($2);
        }
        |id {
            $$ = new NodeDesc("STEP", '');
            $$.setChild(new NodeDesc($1, 'ID'));
        }
        |AXIS {
            $$ = new NodeDesc("STEP", '');
            $$.setChild($1);
        }
        |WILDCARD {
            $$ = new NodeDesc("STEP", '');
            $$.setChild($1);
        }

;


LIST_PREDICATE: PREDICATE LIST_PREDICATEP { 
    $$ = new NodeDesc("LIST_PREDICATE", '');
    $$.setChild($1);

    if($2 === undefined || !$2) {
        $$.setChild(new NodeDesc("EPSILON", ''));
    } else {
        $$.setChild($2);
    }
};
LIST_PREDICATEP: PREDICATE LIST_PREDICATEP {
    $$ = new NodeDesc("LIST_PREDICATEP", '');
    $$.setChild($1);

    if($2 === undefined || !$2) {
        $$.setChild(new NodeDesc("EPSILON", ''));
    } else {
        $$.setChild($2);
    }
}
    |  {}
;

PREDICATE:
    corcheteIzq LIST_E corcheteDer {
        $$ = new NodeDesc("PREDICATE", '');
        $$.setChild(new NodeDesc($1, 'corcheteIzq'));
        $$.setChild($2);
        $$.setChild(new NodeDesc($3, 'corcheteDer'));
    }
;

LIST_E: E LIST_EP{
    $$ = new NodeDesc("LIST_E", '');
    $$.setChild($1);
    if($2 === undefined || !$2) {
        $$.setChild(new NodeDesc("EPSILON", ''));
    } else {
        $$.setChild($2);
    }
};

LIST_EP: OP E LIST_EP{
    $$ = new NodeDesc("LIST_EP", '');
    $$.setChild($1);
    $$.setChild($2);
    if($3 === undefined || !$3) {
        $$.setChild(new NodeDesc("EPSILON", ''));
    } else {
        $$.setChild($3);
    }

}
    |  {}
;

OP
        :add {
            $$ = new NodeDesc("OP", '');
            $$.setChild(new NodeDesc($1, 'ADD'));
        }
        |minus {
            $$ = new NodeDesc("OP", '');
            $$.setChild(new NodeDesc($1, 'MINUS'));
        }
        |asterisk{
            $$ = new NodeDesc("OP", '');
            $$.setChild(new NodeDesc($1, 'ASTERIK'));
        }
        |slash{
            $$ = new NodeDesc("OP", '');
            $$.setChild(new NodeDesc($1, 'SLASH'));
        }
        |equal{
            $$ = new NodeDesc("OP", '');
            $$.setChild(new NodeDesc($1, 'EQUAL'));
        }
        |diferent{
            $$ = new NodeDesc("OP", '');
            $$.setChild(new NodeDesc($1, 'Different'));
        }
        |menor{
            $$ = new NodeDesc("OP", '');
            $$.setChild(new NodeDesc($1, 'MENOR'));
        }
        |menorIgual{
            $$ = new NodeDesc("OP", '');
            $$.setChild(new NodeDesc($1, 'MENORIGUAL'));
        }
        |mayorIgual{
            $$ = new NodeDesc("OP", '');
            $$.setChild(new NodeDesc($1, 'MAYORIGUAL'));
        }
        |mayor{
            $$ = new NodeDesc("OP", '');
            $$.setChild(new NodeDesc($1, 'MAYOR'));
        }
        |or{
            $$ = new NodeDesc("OP", '');
            $$.setChild(new NodeDesc($1, 'OR'));
        }
        |barra{
            $$ = new NodeDesc("OP", '');
            $$.setChild(new NodeDesc($1, 'BARRA'));
        }
        |and{
            $$ = new NodeDesc("OP", '');
            $$.setChild(new NodeDesc($1, 'AND'));
        }
        |mod{
            $$ = new NodeDesc("OP", '');
            $$.setChild(new NodeDesc($1, 'OP'));
        }

;

E:
    STEP{
        $$ = new NodeDesc("E",' ');
        $$.setChild($1);
    }
    |ENTRY{
        $$ = new NodeDesc("E",' ');
        $$.setChild($1);
    }
    |decimal{
        $$ = new NodeDesc("E",' ');
        $$.setChild(new NodeDesc($1, 'DECIMAL'));
    }
    |digits{
        $$ = new NodeDesc("E",' ');
        $$.setChild(new NodeDesc($1, 'DIGITS'));
    }
    |cadena{
        $$ = new NodeDesc("E",' ');
        $$.setChild(new NodeDesc($1, 'CADENA'));
    }

;
AXIS
        :AXIS_NAME doubleColon STEP {
            $$ = new NodeDesc("AXIS", '');
            $$.setChild($1);
            $$.setChild(new NodeDesc($1, 'DOUBLECOLON'));
            $$.setChild($3);
        }
        |AXIS_NAME{
            $$ = new NodeDesc("AXIS", '');
            $$.setChild($1);
        }
;
AXIS_NAME
        :ancestor{
            $$ = new NodeDesc("AXIS_NAME", '');
            $$.setChild(new NodeDesc($1, 'ancestor'));
        }
        |ancestor_or_self{
            $$ = new NodeDesc("AXIS_NAME", '');
            $$.setChild(new NodeDesc($1, 'ancestor_or_self'));
        }
        |attribute{
            $$ = new NodeDesc("AXIS_NAME", '');
            $$.setChild(new NodeDesc($1, 'attribute'));
        }
        |child{
            $$ = new NodeDesc("AXIS_NAME", '');
            $$.setChild(new NodeDesc($1, 'child'));
        }
        |descendant{
            $$ = new NodeDesc("AXIS_NAME", '');
            $$.setChild(new NodeDesc($1, 'descendant'));
        }
        |descendant_or_self{
            $$ = new NodeDesc("AXIS_NAME", '');
            $$.setChild(new NodeDesc($1, 'descendant_or_self'));
        }
        |following{
            $$ = new NodeDesc("AXIS_NAME", '');
            $$.setChild(new NodeDesc($1, 'following'));
        }
        |following_sibling{
            $$ = new NodeDesc("AXIS_NAME", '');
            $$.setChild(new NodeDesc($1, 'following_sibling'));
        }
        |namespace{
            $$ = new NodeDesc("AXIS_NAME", '');
            $$.setChild(new NodeDesc($1, 'namspace'));
        }
        |parent{
            $$ = new NodeDesc("AXIS_NAME", '');
            $$.setChild(new NodeDesc($1, 'parent'));
        }
        |preceding{
            $$ = new NodeDesc("AXIS_NAME", '');
            $$.setChild(new NodeDesc($1, 'preceding'));
        }
        |preceding_sibling{
            $$ = new NodeDesc("AXIS_NAME", '');
            $$.setChild(new NodeDesc($1, 'preceding_sibling'));
        }
        |self{
            $$ = new NodeDesc("AXIS_NAME", '');
            $$.setChild(new NodeDesc($1, 'self'));
        }
;
WILDCARD
        :asterisk{
            $$ = new NodeDesc("WILDCARD", '');
            $$.setChild(new NodeDesc($1, 'asterisk'));
        }
        |twoPoint{
            $$ = new NodeDesc("WILDCARD", '');
            $$.setChild(new NodeDesc($1, 'twoPoint'));
        }
        |point{
            $$ = new NodeDesc("WILDCARD", '');
            $$.setChild(new NodeDesc($1, 'point'));
        }
        |at asterisk{
            $$ = new NodeDesc("WILDCARD", '');
            $$.setChild(new NodeDesc($1, 'at'));
            $$.setChild(new NodeDesc($1, 'asterisk'));
        }
        |at id PREDICATE{
            $$ = new NodeDesc("WILDCARD", '');
            $$.setChild(new NodeDesc($1, 'at'));
            $$.setChild(new NodeDesc($1, 'ID'));
            $$.setChild($3);
        }
        |at id{
            $$ = new NodeDesc("WILDCARD", '');
            $$.setChild(new NodeDesc($1, 'at'));
            $$.setChild(new NodeDesc($1, 'ID'));
        }
        |node parIzq parDer{
            $$ = new NodeDesc("WILDCARD", '');
            $$.setChild(new NodeDesc($1, 'node'));
            $$.setChild(new NodeDesc($2, 'parIzq'));
            $$.setChild(new NodeDesc($3, 'parDer'));

        }
        |text parIzq parDer{
            $$ = new NodeDesc("WILDCARD", '');
            $$.setChild(new NodeDesc($1, 'text'));
            $$.setChild(new NodeDesc($2, 'parIZq'));
            $$.setChild(new NodeDesc($3, 'parDer'));
        }
        |last parIzq parDer{
            $$ = new NodeDesc("WILDCARD", '');
            $$.setChild(new NodeDesc($1, 'last'));
            $$.setChild(new NodeDesc($2, 'parIZq'));
            $$.setChild(new NodeDesc($3, 'parDer'));
        }
;
