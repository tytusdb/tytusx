/******************************EXPORTACIONES*******************************/
%{
    /********************AST**************************/
    const { Simbolo } = require ('./AST/Simbolo')
    const { Entorno } = require ('./AST/Entorno')
    const { AST } = require ('./AST/AST')
    const { Tipo } = require('./AST/Tipo')

     /***************INSTRUCCIONES*********************/
    const { For } = require ('./Instrucciones/For')
    const { Let } = require ('./Instrucciones/Let')
    const { Where } = require ('./Instrucciones/Where')
    const { Return } = require ('./Instrucciones/Return')
    const { Function } = require ('./Instrucciones/Function')
    const { HeaderC3D } = require ('./Instrucciones/HeaderC3D')
    const { MainC3D } = require ('./Instrucciones/MainC3D')
    const { FunctionsC3D } = require ('./Instrucciones/FunctionsC3D')

    /*****************EXPRESIONES**********************/
    const { Primitivo } = require ('./Expresiones/Primitivo')
    const { Operacion, Operador } = require ('./Expresiones/Operacion')
    const { Path } = require ('./Expresiones/Path')
    const { SourcePath } = require ('./Expresiones/SourcePath')
    const { Variable } = require ('./Expresiones/Variable')
    const { If } = require ('./Expresiones/If')
    const { Call } = require ('./Expresiones/Call')
    const { Substring } = require ('./Expresiones/Substring')
    const { UpperCase } = require ('./Expresiones/UpperCase')
    const { LowerCase } = require ('./Expresiones/LowerCase')
    const { ToString } = require ('./Expresiones/ToString')
    const { ToNumber } = require ('./Expresiones/ToNumber')

    //se crea el entorno global
    var Entorno_Global = new Entorno('global',null)

    //se crea el ast y se le pasa el entorno global
    var Arbol_AST = new AST([],Entorno_Global)

    //manejo de errores
    var errores = [];

    //codigo 3 direcciones
    var c3d = '';
    var cont_temp = 0;
    var SP = 0;
    var HP = 0;
    var variables = [];
    var returns = [];

    // //functions
    //     //obtener contador
    // function GetErrorStorage() {
    //     var data = localStorage.getItem('errores_xquery');
    //     return JSON.parse(data);
    // }
    // //actualizar contador
    // function SetStorage(data, identificador) {
    //     localStorage.setItem(identificador, JSON.stringify(data));
    // }

    


%}
 
/******************************LEXICO***************************************/ 

%lex 
%options case-sensitive
escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"
entero                              [0-9]+("."[0-9]+)?

%%
\s+                             /* skip white space */

// XPATH 
"child"                     return 'child'  

"descendant-or-self"        return 'descendantorself'
"following-sibling"         return 'followingsibling'
"preceding-sibling"     return 'precedingsibling'
"ancestor-or-self"      return 'ancestororself'

"descendant"                return 'descendant'
"following"             return 'following'
"preceding"             return 'preceding'
"ancestor"              return 'ancestor'

"attribute"                 return 'attribute'
"self"                      return 'self'
"namespace"             return 'namespace'
"parent"                return 'parent'
"text"                 return 'text'
"node"                 return 'node'
"position"             return 'position'
"last"                 return 'last'

//XQUERY
"for"   return 'for'
"let"   return 'let'
"where" return 'where'
"order by" return 'order'
"return"    return 'return'
"to"    return 'to'
"in"    return 'in'
"doc" return 'doc'
"eq"    return 'eq' // =
"ne"    return 'ne' // !=
"it"    return 'it' // <
"le"    return 'le' // <=
"gt"    return 'gt' // >
"ge"    return 'ge' // >=
","     return 'coma'
"as"    return 'as'
"if"    return 'rif'
"then"  return 'rthen'
"else"  return 'relse'

//TYPES
"string" return 'string'
"date" return 'date'
"decimal" return 'dec'
"integer" return 'integer'
"int" return 'int'
"long" return 'long'
"short" return 'short'
"boolean" return 'boolean'
"double" return 'double'
"float" return 'float'

//FUNCTIONS
"declare" return 'dec'
"function" return 'fun'
"number" return 'number'
"substring" return 'substring'
"upper-case" return 'up_case'
"lower-case" return 'low_case'

//PREFIX
"fn" return 'fn'
"xs" return 'xs'
"?" return  'quest'
"local" return 'local'

/* LOGIC OPERATOR */

"and"                   return 'land'
"or"                    return 'lor'

/* RELATIONAL OPERATOR */
"="                    return 'igual'
"eq"                   return 'eq'
"!="                   return 'diferente'
"ne"                    return 'ne'
"<="                   return 'menorigual'
"le"                    return 'le'
"<"                    return 'menorque'
"lt"                    return 'lt'
">="                   return 'mayorigual'
"ge"                    return 'ge'
">"                    return 'mayorque'
"gt"                    return 'gt'

/* ARITHMETIC OPERATOR */
"+"                     return 'mas'
"-"                     return 'menos'
"*"                     return 'por'
"div"                   return 'div' 
"mod"                   return 'mod'

/* SYMBOL */
"["                     return 'c_abre'
"]"                     return 'c_cierra'
"{"                     return 'l_abre'
"}"                     return 'l_cierra'
"("                     return 'p_abre'
")"                     return 'p_cierra'
"::"                    return 'cpuntos'
":"                     return 'dpuntos'
".."                    return 'ppunto'
"."                     return 'punto'
";"                     return 'pyc'
"$"                     return 'dollasign'
"@"                     return 'at'
"|"                     return 'or'
"//"                    return 'd_axis'
"/"                     return 'axis'

// OTHER
{stringliteral}                     return 'StringLiteral'
{charliteral}                       return 'CharLiteral'
(([0-9]+"."[0-9]*)|("."[0-9]+))|[0-9]+    return 'numero';
[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ0-9_ñÑ]*             return 'identificador';  


//errores
. {  
    errores.push({
        Tipo:'Léxico', 
        Fila: yylloc.first_line, 
        Columna: yylloc.first_column, 
        Description: 'El caracter: '+yytext+' no pertenece al lenguaje'
        });
    // var err = GetErrorStorage();
    // errores = errores.concat(err);
    // SetStorage(errores);
}


<<EOF>>     return 'EOF'

/lex

// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'lor'
%left 'land' 
%left 'menorque' 'menorigual' 'mayorque' 'mayorigual' 'igual' 'diferente'
%left 'lt' 'le' 'gt' 'ge' 'eq' 'ne'
%left 'mas' 'menos' 
%left 'por' 'div'
%left 'mod'
%left 'EXPRESION''CONDITION'
%left 'dollasign'

 

/* operator associations and precedence */

%start BEGIN        
%%                   

/******************************SINTACTICO***************************************/ 

BEGIN: INSTRUCCIONES EOF {  
                           /*  //guardando variable de inicio
                            let cont_ini = cont_temp; */
                            //generando codigo 3d
                            var mainc3d = new MainC3D(@1.first_line, @1.first_column, variables, returns, cont_temp, SP, HP );
                            //[codigo, contador]
                            var code = mainc3d.ejecutar(Arbol_AST.getEntorno('global'));
                            //header
                            // var headc3d = new HeaderC3D(@1.first_line, @1.first_column, cont_ini, code[1], code[0]);
                            //agregando encabezado
                            // var code_header = headc3d.ejecutar(Arbol_AST.getEntorno('global')); 



/*                             //SE AGREGA LA TABLA
                            Arbol_AST.AddTabla(); */
                            //SE AGREGA EL CODIGO
                           // Arbol_AST.AddC3D(code_header);
                            //SE AGREGA LA RESPUESTA
                            Arbol_AST.addResultado($$);
                            Arbol_AST.addErrores(errores);
                            
                            console.log(Arbol_AST)

                            //seteando variables
                            c3d = '';
                            cont_temp = 0;
                            SP = 0;
                            HP = 0;
                            variables = [];
                            returns = [];
                            errores = [];
                            
                            return Arbol_AST;
                        }                    
;

INSTRUCCIONES: INSTRUCCIONES XQUERY { $$ = $1+$2 }
            | XQUERY { $$ = $1 }
            | error { 
                        errores.push({
                            Tipo:'Sintáctico', 
                            Fila: @1.first_line, 
                            Columna: @1.first_column, 
                            Description: 'No se esperaba el caracter: '+yytext
                        }); 
                        // var err = GetErrorStorage();
                        // errores = errores.concat(err);
                        // SetStorage(errores); 
                    }
        
;

XQUERY: FLWOR               { $$ = $1; }
    | CALL                  { $$ = $1.getValorImplicito(Arbol_AST.getEntorno('global')); }
    | FUNCTION              { $$ = '' }
;

FLWOR: FOR LET WHERE ORDER RETURN           { 
                                                //ejecutando for
                                                if ($1 != undefined){
                                                    for(let inst_for of $1){
                                                    inst_for.ejecutar(Arbol_AST.getEntorno('flwor'));
                                                    }
                                                }
                                                //ejecutando let
                                                if($2 != undefined){
                                                    for(let inst_let of $2){
                                                    inst_let.ejecutar(Arbol_AST.getEntorno('flwor'));
                                                    variables.push(inst_let.VariableC3D(Arbol_AST.getEntorno('flwor')));
                                                    
                                                    }
                                                }
                                                if($3 != undefined){
                                                    //ejecutando where
                                                    for(let inst_where of $3){
                                                    inst_where.ejecutar(Arbol_AST.getEntorno('flwor'));
                                                    }
                                                }
                                                //ejecutando return
                                                $$ = $5.ejecutar(Arbol_AST.getEntorno('flwor'));
                                                console.log($5)
                                                returns = $5.VariableC3D(Arbol_AST.getEntorno('global'));
                                            }                                         
;
 
FOR: for DEFINITION             {   
                                  $$ = $2;
                                }
    |                           { $$ = [] }
;
 
DEFINITION: dollasign identificador in SOURCE DEFINITION    { 
                                                                let inst1 = [];
                                                                let inst_for1 = new For(@1.first_line, @1.first_column, $4, $2);
                                                                inst1.push(inst_for1);                                                                
                                                                $$ = inst1.concat($5);
                                                            }
    | coma dollasign identificador in SOURCE DEFINITION     {
                                                                let inst2 = [];
                                                                let inst_for2 = new For(@1.first_line, @1.first_column, $5, $3);
                                                                inst2.push(inst_for2);
                                                                $$ = inst2.concat($6);
                                                            }
    |                                                       { $$ = [] }
;

SOURCE: doc p_abre StringLiteral p_cierra PATH  {  
                                                    $$ = $5;
                                                    Arbol_AST.CrearEntorno('flwor', Entorno_Global);
                                                }
    | PATH                                      { 
                                                    $$ = $1;
                                                    Arbol_AST.CrearEntorno('flwor', Entorno_Global);
                                                }
    | RANK                                      {  
                                                    $$ = $1;
                                                    Arbol_AST.CrearEntorno('flwor', Entorno_Global);
                                                }
;

LET: let DEF_LET                      { $$ = $2 }
    |                                 { $$ = [] }
;

DEF_LET: dollasign identificador dpuntos igual EXPRESION DEF_LET
                                                            {
                                                                Arbol_AST.CrearEntorno('flwor', Entorno_Global); 
                                                                let let1 = [];
                                                                let inst_let1 = new Let(@1.first_line, @1.first_column, $5, $2);
                                                                let1.push(inst_let1);                                                                
                                                                $$ = let1.concat($6);
                                                            }
    | coma dollasign identificador dpuntos igual EXPRESION DEF_LET
                                                            {
                                                                Arbol_AST.CrearEntorno('flwor', Entorno_Global); 
                                                                let let2 = [];
                                                                let inst_let2 = new Let(@1.first_line, @1.first_column, $6, $3);
                                                                let2.push(inst_let2);                                                                
                                                                $$ = let2.concat($7);
                                                            }
    |                                                       { $$ = [] }
;

WHERE: where DEF_WHERE      {
                                $$ = $2;
                            }
    |
;

DEF_WHERE: dollasign identificador WHERE_PATH DEF_WHERE    
                                                            {
                                                                let where1 = [];
                                                                let inst_where1 = new Where(@1.first_line, @1.first_column, $3, $2);
                                                                where1.push(inst_where1);                                                                
                                                                $$ = where1.concat($4);
                                                            }

        | land dollasign identificador WHERE_PATH DEF_WHERE 
                                                            {
                                                                let where2 = [];
                                                                let inst_where2 = new Where(@1.first_line, @1.first_column, $4, $3);
                                                                where2.push(inst_where2);                                                                
                                                                $$ = where2.concat($5);
                                                            }
        |                                                   { $$ = [] }
;
 
WHERE_PATH:  axis EXP_WHERE WHERE_PATH { 
                                            $$ = [];
                                            $$.push($2);
                                            $$ = $$.concat($3);
                                        }
        |                               { $$ = []; }
;

EXP_WHERE: EXP_WHERE menorque EXP_WHERE             { $$ = $1.getValorImplicito({})+$2+$3.getValorImplicito({});}
        | EXP_WHERE lt EXP_WHERE                    { $$ = $1.getValorImplicito({})+$2+$3.getValorImplicito({});}
        | EXP_WHERE menorigual EXP_WHERE            { $$ = $1.getValorImplicito({})+$2+$3.getValorImplicito({});}
        | EXP_WHERE le EXP_WHERE                    { $$ = $1.getValorImplicito({})+$2+$3.getValorImplicito({});}
        | EXP_WHERE mayorque EXP_WHERE              { $$ = $1.getValorImplicito({})+$2+$3.getValorImplicito({});}
        | EXP_WHERE gt EXP_WHERE                    { $$ = $1.getValorImplicito({})+$2+$3.getValorImplicito({});}
        | EXP_WHERE mayorigual EXP_WHERE            { $$ = $1.getValorImplicito({})+$2+$3.getValorImplicito({});}
        | EXP_WHERE ge EXP_WHERE                    { $$ = $1.getValorImplicito({})+$2+$3.getValorImplicito({});}
        | EXP_WHERE igual EXP_WHERE                 { $$ = $1.getValorImplicito({})+$2+$3.getValorImplicito({});}
        | EXP_WHERE eq EXP_WHERE                    { $$ = $1.getValorImplicito({})+$2+$3.getValorImplicito({});}
        | EXP_WHERE ne EXP_WHERE                    { $$ = $1.getValorImplicito({})+$2+$3.getValorImplicito({});}
        | F                                         { $$ = $1; }
;


ORDER: order CONT_ORDER
    |
;

CONT_ORDER: dollasign identificador ORDER_PATH CONT_ORDER
        | coma dollasign identificador ORDER_PATH CONT_ORDER
        |
;

ORDER_PATH: axis identificador ORDER_PATH
            | axis at identificador ORDER_PATH
            | 
;

RETURN: return dollasign identificador PATH             { 
                                                            $$ = new Return(@1.first_line, @1.first_column, '', '/'+$3+$4);
                                                        }
    | return EXPRESION                                  {                     
                                                            $$ = new Return(@1.first_line, @1.first_column, $2,'');
                                                        } 
    | return CONDITION                                  {                     
                                                            $$ = new Return(@1.first_line, @1.first_column, $2,'');
                                                        }
;

CONDITION: rif p_abre EXPRESION p_cierra rthen IF_RES relse IF_RES 
                                                                    {
                                                                        $$ = new If(@1.first_line, @1.first_column, $3, $6, $8);
                                                                    }
; 

IF_RES: EXPRESION               {
                                    $$ = $1; 
                                }
    | CONDITION                 {
                                    $$ = $1;
                                }
;

CALL: local dpuntos identificador p_abre VALORES p_cierra 
                                            {
                                                $$ = new Call($3, $5, @1.first_line, @1.first_column );
                                            }
;

CALL_PRIM: substring p_abre EXPRESION coma numero coma numero p_cierra      {
                                                                                $$ = new Substring(@1.first_line, @1.first_column, $3, Number($5), Number($7)); 
                                                                            }
        | up_case p_abre EXPRESION p_cierra                                 {
                                                                                $$ = new UpperCase(@1.first_line, @1.first_column, $3); 
                                                                            }
        | low_case p_abre EXPRESION p_cierra                                {
                                                                                $$ = new LowerCase(@1.first_line, @1.first_column, $3); 
                                                                            }
        | string p_abre EXPRESION p_cierra                                  {
                                                                                $$ = new ToString(@1.first_line, @1.first_column, $3); 
                                                                            }
        | number p_abre EXPRESION p_cierra                                  {
                                                                                $$ = new ToNumber(@1.first_line, @1.first_column, $3); 
                                                                            }
;

RANK: p_abre numero to numero p_cierra          { $$ = [Number($2),Number($4)] }
    | p_abre numero coma numero p_cierra        { $$ = [Number($2),Number($4)] }
;

VALORES: EXPRESION VALORES                      { 
                                                    $$ = [];
                                                    $$.push($1);
                                                    $$ = $$.concat($2);
                                                }
        | coma EXPRESION VALORES                { 
                                                    $$ = [];
                                                    $$.push($2);
                                                    $$ = $$.concat($3);
                                                }
        |                                       { $$ = [] }
;

FUNCTION: dec fun local dpuntos identificador p_abre VARIABLES p_cierra as PREFIX dpuntos TYPE POSTFIX l_abre XQUERY l_cierra pyc //creamos un nuevo simbolo y en el valor le ponemos las intrucciones generadas
                                                {
                                                    var new_func = new Function($7, $5, $15, $12, @1.first_line, @1.first_column);
                                                    var new_simbol = new Simbolo($5, $12.toUpperCase(), @1.first_line, @1.first_column, new_func);
                                                    if(Arbol_AST.getEntorno('global').existe($5)){
                                                        //ya existe, se remplaza
                                                        Arbol_AST.getEntorno('global').reemplazar($5, new_simbol)
                                                    }else{
                                                        //no existe, se crea
                                                        Arbol_AST.getEntorno('global').agregar(new_simbol);
                                                    }
                                                }
        | dec fun local dpuntos identificador p_abre VARIABLES p_cierra as PREFIX dpuntos TYPE POSTFIX l_abre INST l_cierra pyc
                                                {
                                                    var new_func = new Function($7, $5, $15, $12, @1.first_line, @1.first_column);
                                                    var new_simbol = new Simbolo($5, $12.toUpperCase(), @1.first_line, @1.first_column, new_func);
                                                    if(Arbol_AST.getEntorno('global').existe($5)){
                                                        //ya existe, se remplaza
                                                        Arbol_AST.getEntorno('global').reemplazar($5, new_simbol)
                                                    }else{
                                                        //no existe, se crea
                                                        Arbol_AST.getEntorno('global').agregar(new_simbol);
                                                    }
                                                }
;

INST: rif p_abre EXPRESION p_cierra rthen IF_RES relse IF_RES 
                                                        {
                                                            $$ = new If(@1.first_line, @1.first_column, $3, $6, $8);
                                                        }
;

IF_RES: EXPRESION               {
                                    $$ = $1;
                                }
    | INST                      {
                                    $$ = $1;
                                }
;

VARIABLES: dollasign identificador as PREFIX dpuntos TYPE POSTFIX VARIABLES
                                                                            {
                                                                                $$ = [];
                                                                                $$.push([$2,$6]);
                                                                                $$ = $$.concat($8);
                                                                            }
        | coma dollasign identificador as PREFIX dpuntos TYPE POSTFIX VARIABLES
                                                                            {
                                                                                $$ = [];
                                                                                $$.push([$3,$7]);
                                                                                $$ = $$.concat($9);
                                                                            }
        |                                                                   { $$ = [] }
;

PREFIX: xs                  { $$ = $1; }
        | fn                { $$ = $1; }
        | quest             { $$ = $1; }
;

POSTFIX: quest
        | 
;

TYPE: string                { $$ = $1; }
    | date                  { $$ = $1; }
    | dec                   { $$ = $1; }
    | integer               { $$ = $1; }
    | int                   { $$ = $1; }
    | long                  { $$ = $1; }
    | short                 { $$ = $1; }
    | boolean               { $$ = $1; }
    | double                { $$ = $1; }
    | float                 { $$ = $1; }
;

EXPRESION: EXPRESION mas EXPRESION          { $$ = new Operacion($1,$3,Operador.SUMA, @1.first_line, @1.first_column); }
        | EXPRESION menos EXPRESION         { $$ = new Operacion($1,$3,Operador.RESTA, @1.first_line, @1.first_column); }
        | EXPRESION por EXPRESION           { $$ = new Operacion($1,$3,Operador.MULTIPLICACION, @1.first_line, @1.first_column);}
        | EXPRESION div EXPRESION           { $$ = new Operacion($1,$3,Operador.DIVISION, @1.first_line, @1.first_column); }
        | EXPRESION mod EXPRESION           { $$ = new Operacion($1,$3,Operador.MODULO, @1.first_line, @1.first_column); }
        | T                                 { $$ = $1; }
; 

T: T menorque T                 { $$ = new Operacion($1,$3,Operador.MENOR_QUE, @1.first_line, @1.first_column); }
    | T lt T                    { $$ = new Operacion($1,$3,Operador.MENOR_QUE, @1.first_line, @1.first_column); }
    | T menorigual T            { $$ = new Operacion($1,$3,Operador.MENOR_IGUA_QUE, @1.first_line, @1.first_column); }
    | T le T                    { $$ = new Operacion($1,$3,Operador.MENOR_IGUA_QUE, @1.first_line, @1.first_column); }
    | T mayorque T              { $$ = new Operacion($1,$3,Operador.MAYOR_QUE, @1.first_line, @1.first_column); }
    | T gt T                    { $$ = new Operacion($1,$3,Operador.MAYOR_QUE, @1.first_line, @1.first_column); }
    | T mayorigual T            { $$ = new Operacion($1,$3,Operador.MAYOR_IGUA_QUE, @1.first_line, @1.first_column); }
    | T ge T                    { $$ = new Operacion($1,$3,Operador.MAYOR_IGUA_QUE, @1.first_line, @1.first_column); }
    | T igual T                 { $$ = new Operacion($1,$3,Operador.IGUAL_QUE, @1.first_line, @1.first_column); }
    | T eq T                    { $$ = new Operacion($1,$3,Operador.IGUAL_QUE, @1.first_line, @1.first_column); }
    | T diferente T             { $$ = new Operacion($1,$3,Operador.DIFERENTE_QUE, @1.first_line, @1.first_column); }
    | T ne T                    { $$ = new Operacion($1,$3,Operador.DIFERENTE_QUE, @1.first_line, @1.first_column); }
    | T land T                  { $$ = new Operacion($1,$3,Operador.AND, @1.first_line, @1.first_column); }
    | T lor T                   { $$ = new Operacion($1,$3,Operador.OR, @1.first_line, @1.first_column); }    
    | F                         { $$ = $1; }
;

F: p_abre EXPRESION p_cierra                { $$ = $2; }
    | numero                                { $$ = new Primitivo(Number($1), @1.first_line, @1.first_column); }
    | identificador                         { $$ = new Primitivo($1, @1.first_line, @1.first_column); }
    | dollasign identificador               { $$ = new Variable($2, @1.first_line, @1.first_column);}
    | StringLiteral                         { $$ = new Primitivo($1.split('"')[1], @1.first_line, @1.first_column); }
    | dollasign identificador PATH          { $$ = new Path('/'+$2+$3, $2, @1.first_line, @1.first_column);}
    | PATH                                  { $$ = new SourcePath($1, @1.first_line, @1.first_column); }
    | CALL                                  { $$ = $1 }
    | CALL_PRIM                             { $$ = $1 }
;

PATH: PATH axis AXISNAME NODO           { $$ = $1+$2+$3+$4; }
    | PATH d_axis AXISNAME NODO         { $$ = $1+$2+$3+$4; }
    | axis AXISNAME NODO                { $$ = $1+$2+$3; }
    | d_axis AXISNAME NODO              { $$ = $1+$2+$3; }
;

AXISNAME: ancestor cpuntos              { $$ = $1+$2; }
        | ancestororself cpuntos        { $$ = $1+$2; }
        | attribute cpuntos             { $$ = $1+$2; }
        | child cpuntos                 { $$ = $1+$2; }
        | descendant cpuntos            { $$ = $1+$2; }
        | descendantorself cpuntos      { $$ = $1+$2; }
        | following cpuntos             { $$ = $1+$2; }
        | followingsibling cpuntos      { $$ = $1+$2; }
        | namespace cpuntos             { $$ = $1+$2; }
        | parent cpuntos                { $$ = $1+$2; }
        | preceding cpuntos             { $$ = $1+$2; }
        | precedingsibling cpuntos      { $$ = $1+$2; }
        | self cpuntos                  { $$ = $1+$2; }
        |                               { $$ = ''; }
;

NODO: identificador PREDICADOS        {$$=$1+$2}
    | punto PREDICADOS                {$$=$1+$2}
    | ppunto PREDICADOS               {$$=$1+$2}
    | por PREDICADOS                  {$$=$1+$2}
    | at identificador PREDICADOS     {$$=$1+$2+$3}
    | at por PREDICADOS               {$$=$1+$2+$3}
    | text p_abre p_cierra            {$$=$1+$2+$3}
    | node p_abre p_cierra            {$$=$1+$2+$3}
;

PREDICADOS: PREDICADO PREDICADOS      {$$=$1+$2}
        |                             {$$=''}
;

PREDICADO: c_abre CONTENIDO c_cierra        {$$=$1+$2+$3}
;

CONTENIDO: EP CONTENIDO                     {$$=$1+$2}
        | at EP CONTENIDO                   {$$=$1+$2+$3}
        | text p_abre p_cierra CONTENIDO    {$$=$1+$2+$3+$4}
        | node p_abre p_cierra CONTENIDO    {$$=$1+$2+$3+$4}
        | axis CONTENIDO                    { $$ = $1+$2 } 
        |                                   { $$ = '' }
;

EP: EP mas EP                   {$$=$1+$2+$3}
    | EP menos EP               {$$=$1+$2+$3}
    | EP por EP                 {$$=$1+$2+$3}
    | EP div EP                 {$$=$1+$2+$3}
    | EP mod EP                 {$$=$1+$2+$3}
    | EP menorque EP            {$$=$1+$2+$3}
    | EP menorigual EP          {$$=$1+$2+$3}
    | EP mayorque EP            {$$=$1+$2+$3}
    | EP mayorigual EP          {$$=$1+$2+$3}
    | EP igual EP               {$$=$1+$2+$3}
    | EP diferente EP           {$$=$1+$2+$3}
    | EP land EP                {$$=$1+$2+$3}
    | EP lor EP                 {$$=$1+$2+$3}
    | K                         {$$=$1}
;

K: p_abre EP p_cierra           {$$=$1+$2+$3}   
    | numero                    {$$=$1}
    | identificador             {$$=$1}
    | StringLiteral             {$$=$1}                    
    | punto                     {$$=$1}
    | last p_abre p_cierra      {$$=$1+$2+$3}      
    | position p_abre p_cierra  {$$=$1+$2+$3}   
;



// bye :3