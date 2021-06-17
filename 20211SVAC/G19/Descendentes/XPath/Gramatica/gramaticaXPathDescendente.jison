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

<<<<<<< HEAD
=======
/*Espacios en blanco*/
>>>>>>> 1b12fdc6b8708bf62b9047fc6ed7149c10d406d5
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

<<<<<<< HEAD

=======
/* Asociación de operadores y precedencia */
>>>>>>> 1b12fdc6b8708bf62b9047fc6ed7149c10d406d5
%right 'equal'
%left 'or', 'barra'
%left 'and'
%left 'mayor', 'menor', 'mayorIgual', 'menorIgual', 'diferent'



<<<<<<< HEAD
%left 'add', 'minus'
=======
%left 'add', 'minus' /*binary*/
>>>>>>> 1b12fdc6b8708bf62b9047fc6ed7149c10d406d5
%left 'asterisk', 'slash', 'mod'


%left 'doubleSlash'
%left 'parIzq', 'parDer', 'corcheteIzq', 'corcheteDer'



<<<<<<< HEAD
%start ini
%%

ini
        :XPATH EOF {
            $$ = new NodeDesc('INI');
            $$.childList.push($1);
=======


%start ini
%% /*definicion de gramática*/

ini
        :XPATH EOF {
            $$ = new NodeDesc('INI', '');
            $$.setChild($1);
>>>>>>> 1b12fdc6b8708bf62b9047fc6ed7149c10d406d5
            return $$;
        }
;
XPATH:
        ENTRY LIST_STEP{
<<<<<<< HEAD
            $$ = new NodeDesc('XPATH');
            $$.childList.push($1);
            $$.childList.push($2);

        }
    |   LIST_STEP {
        $$ = new NodeDesc('XPATH');
        $$.childList.push($1);
=======
            $$ = new NodeDesc('XPATH', '');
            $$.setChild($1);
            $$.setChild($2);

        }
    |   LIST_STEP {
        $$ = new NodeDesc('XPATH', '');
        $$.setChild($1);
>>>>>>> 1b12fdc6b8708bf62b9047fc6ed7149c10d406d5
    }
;
ENTRY
        :slash{
<<<<<<< HEAD
            $$ = new NodeDesc('ENTRY');
            $$.childList.push($1);
        }
        |doubleSlash{
            $$ = new NodeDesc('ENTRY');
            $$.childList.push($1);
=======
            $$ = new NodeDesc('ENTRY', '');
            $$.setChild(new NodeDesc($1, 'SLASH'));
        }
        |doubleSlash{
            $$ = new NodeDesc('ENTRY', '');
            $$.setChild(new NodeDesc($1, 'DOUBLESLASH'));
>>>>>>> 1b12fdc6b8708bf62b9047fc6ed7149c10d406d5
        }
;

LIST_STEP: STEP LIST_STEPP {
<<<<<<< HEAD
    $$ = new NodeDesc('LIST_STEP');
    $$.childList.push($1);
    $$.childList.push($2);
}
;

LIST_STEPP:
    SEPARATE STEP LIST_STEPP {
        $$ = new NodeDesc('LIST_STEP');
        $$.childList.push($1);
        $$.childList.push($2);
        $$.childList.push($3);
    }
    | {  }
;

SEPARATE
        :barra ENTRY {
            $$ = new NodeDesc("SEPARATE");
            $$.childList.push($1);
            $$.childList.push($2);
        }
        |barra {
            $$ = new NodeDesc("SEPARATE");
            $$.childList.push($1);
        }
        |slash {
            $$ = new NodeDesc("SEPARATE");
            $$.childList.push($1);
        }
        |doubleSlash {
            $$ = new NodeDesc("SEPARATE");
            $$.childList.push($1);
=======
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
>>>>>>> 1b12fdc6b8708bf62b9047fc6ed7149c10d406d5
        }
;

STEP
        :id LIST_PREDICATE {
<<<<<<< HEAD
            $$ = new NodeDesc("STEP");
            $$.childList.push($1);
            $$.childList.push($2);
        }
        |id {
            $$ = new NodeDesc("STEP");
            $$.childList.push($1);
        }
        |AXIS {
            $$ = new NodeDesc("STEP");
            $$.childList.push($1);
        }
        |WILDCARD {
            $$ = new NodeDesc("STEP");
            $$.childList.push($1);
=======
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
>>>>>>> 1b12fdc6b8708bf62b9047fc6ed7149c10d406d5
        }

;


LIST_PREDICATE: PREDICATE LIST_PREDICATEP { 
<<<<<<< HEAD
    $$ = new NodeDesc("LIST_PREDICATE");
    $$.childList.push($2);
    $$.childList.push($1);
};

LIST_PREDICATEP:
    PREDICATE LIST_PREDICATEP {
        $$ = new NodeDesc('LIST_PREDICATEP');
        $$.childList.push($1);
        $$.childList.push($2);


    }
    | {  }
;


PREDICATE:
    corcheteIzq LIST_E corcheteDer {
        $$ = new NodeDesc("PREDICATE");
        $$.childList.push($1);
        $$.childList.push($2);
    }
;



LIST_E:
    E LIST_EP {
        $$ = new NodeDesc("LIST_E");
        $$.childList.push($1);
        $$.childList.push($2);
    };

LIST_EP: OP E LIST_EP {
        $$ = new NodeDesc("LIST_EP");
        $$.childList.push($1);
        $$.childList.push($2);
        $$.childList.push($3);
}
        | { }
=======
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
>>>>>>> 1b12fdc6b8708bf62b9047fc6ed7149c10d406d5
;

OP
        :add {
<<<<<<< HEAD
            $$ = new NodeDesc("OP");
            $$.childList.push($1);
        }
        |minus {
            $$ = new NodeDesc("OP");
            $$.childList.push($1);
        }
        |asterisk{
            $$ = new NodeDesc("OP");
            $$.childList.push($1);
        }
        |slash{
            $$ = new NodeDesc("OP");
            $$.childList.push($1);
        }
        |equal{
            $$ = new NodeDesc("OP");
            $$.childList.push($1);
        }
        |diferent{
            $$ = new NodeDesc("OP");
            $$.childList.push($1);
        }
        |menor{
            $$ = new NodeDesc("OP");
            $$.childList.push($1);
        }
        |menorIgual{
            $$ = new NodeDesc("OP");
            $$.childList.push($1);
        }
        |mayorIgual{
            $$ = new NodeDesc("OP");
            $$.childList.push($1);
        }
        |mayor{
            $$ = new NodeDesc("OP");
            $$.childList.push($1);
        }
        |or{
            $$ = new NodeDesc("OP");
            $$.childList.push($1);
        }
        |barra{
            $$ = new NodeDesc("OP");
            $$.childList.push($1);
        }
        |and{
            $$ = new NodeDesc("OP");
            $$.childList.push($1);
        }
        |mod{
            $$ = new NodeDesc("OP");
            $$.childList.push($1);
=======
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
>>>>>>> 1b12fdc6b8708bf62b9047fc6ed7149c10d406d5
        }

;

E:
    STEP{
<<<<<<< HEAD
        $$ = new NodeDesc("E");
        $$.childList.push($1);
    }
    |ENTRY{
        $$ = new NodeDesc("E");
        $$.childList.push($1);
    }
    |decimal{
        $$ = new NodeDesc("E");
        $$.childList.push($1);
    }
    |digits{
        $$ = new NodeDesc("E");
        $$.childList.push($1);
    }
    |cadena{
        $$ = new NodeDesc("E");
        $$.childList.push($1);
=======
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
>>>>>>> 1b12fdc6b8708bf62b9047fc6ed7149c10d406d5
    }

;
AXIS
        :AXIS_NAME doubleColon STEP {
<<<<<<< HEAD
            $$ = new NodeDesc("AXIS");
            $$.childList.push($1);
            $$.childList.push($2);
            $$.childList.push($3);
        }
        |AXIS_NAME{
            $$ = new NodeDesc("AXIS");
            $$.childList.push($1);
=======
            $$ = new NodeDesc("AXIS", '');
            $$.setChild($1);
            $$.setChild(new NodeDesc($1, 'DOUBLECOLON'));
            $$.setChild($3);
        }
        |AXIS_NAME{
            $$ = new NodeDesc("AXIS", '');
            $$.setChild($1);
>>>>>>> 1b12fdc6b8708bf62b9047fc6ed7149c10d406d5
        }
;
AXIS_NAME
        :ancestor{
<<<<<<< HEAD
            $$ = new NodeDesc("AXIS_NAME");
            $$.childList.push($1);
        }
        |ancestor_or_self{
            $$ = new NodeDesc("AXIS_NAME");
            $$.childList.push($1);
        }
        |attribute{
            $$ = new NodeDesc("AXIS_NAME");
            $$.childList.push($1);
        }
        |child{
            $$ = new NodeDesc("AXIS_NAME");
            $$.childList.push($1);
        }
        |descendant{
            $$ = new NodeDesc("AXIS_NAME");
            $$.childList.push($1);
        }
        |descendant_or_self{
            $$ = new NodeDesc("AXIS_NAME");
            $$.childList.push($1);
        }
        |following{
            $$ = new NodeDesc("AXIS_NAME");
            $$.childList.push($1);
        }
        |following_sibling{
            $$ = new NodeDesc("AXIS_NAME");
            $$.childList.push($1);
        }
        |namespace{
            $$ = new NodeDesc("AXIS_NAME");
            $$.childList.push($1);
        }
        |parent{
            $$ = new NodeDesc("AXIS_NAME");
            $$.childList.push($1);
        }
        |preceding{
            $$ = new NodeDesc("AXIS_NAME");
            $$.childList.push($1);
        }
        |preceding_sibling{
            $$ = new NodeDesc("AXIS_NAME");
            $$.childList.push($1);
        }
        |self{
            $$ = new NodeDesc("AXIS_NAME");
            $$.childList.push($1);
=======
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
>>>>>>> 1b12fdc6b8708bf62b9047fc6ed7149c10d406d5
        }
;
WILDCARD
        :asterisk{
<<<<<<< HEAD
            $$ = new NodeDesc("WILDCARD");
            $$.childList.push($1);
        }
        |twoPoint{
            $$ = new NodeDesc("WILDCARD");
            $$.childList.push($1);
        }
        |point{
            $$ = new NodeDesc("WILDCARD");
            $$.childList.push($1);
        }
        |at asterisk{
            $$ = new NodeDesc("WILDCARD");
            $$.childList.push($1);
            $$.childList.push($2);
        }
        |at id PREDICATE{
            $$ = new NodeDesc("WILDCARD");
            $$.childList.push($1);
            $$.childList.push($2);
            $$.childList.push($3);
        }
        |at id{
            $$ = new NodeDesc("WILDCARD");
            $$.childList.push($1);
            $$.childList.push($2);
        }
        |node parIzq parDer{
            $$ = new NodeDesc("WILDCARD");
            $$.childList.push($1);
            $$.childList.push($2);
            $$.childList.push($3);
        }
        |text parIzq parDer{
            $$ = new NodeDesc("WILDCARD");
            $$.childList.push($1);
            $$.childList.push($2);
            $$.childList.push($3);
        }
        |last parIzq parDer{
            $$ = new NodeDesc("WILDCARD");
            $$.childList.push($1);
            $$.childList.push($2);
            $$.childList.push($3);
=======
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
>>>>>>> 1b12fdc6b8708bf62b9047fc6ed7149c10d406d5
        }
;
