%{
  const {Tipo,TipoPath,Comando} = require("./AST/Entorno");
  const {Logical} = require("./Expresion/Logical");
  const {Arithmetic, Unary} = require("./Expresion/Arithmetics")
  const {Literal,PathExp} = require("./Expresion/Expresiones");
  const { ComparisonExp } = require('./Expresion/Comparison')
  const { Atributo,Camino,Child,Descendant,Attribute,Self,DescSelf,FollowSibling,Follow } = require('./Expresion/axes')
  const { CaminoInverso,Parent,Ancestor,PrecedingSibling,AncestorSelf,Preceding } = require('./Expresion/axes')
  const { ContextItemExpr,CallFunction } = require('./Expresion/postfix')
  const { grafoCST } = require('../CST')
  
  const { AST } = require('./XQuery/ts/Arbol/AST')
  const { TipoXQ, EnumTipo } = require('./XQuery/ts/Entorno/TipoXQ')
  const { LiteralXQ } = require('./XQuery/ts/Expresiones/LiteralXQ')
  const { IdXQ } = require('./XQuery/ts/Expresiones/IdXQ')
  const { DeclaracionXQ } = require('./XQuery/ts/Instrucciones/DeclaracionXQ')
  const { AsignacionXQ } = require('./XQuery/ts/Instrucciones/AsignacionXQ')
  const { BloqueXQ } = require('./XQuery/ts/Instrucciones/Bloque')
  const { If } = require('./XQuery/ts/Instrucciones/If')
  const { Condicion_If } = require('./XQuery/ts/Instrucciones/Condicion_If')
  const { ParametroXQ } = require('./XQuery/ts/Funciones/ParametroXQ')
  const { FuncionXQ } = require('./XQuery/ts/Funciones/Funcion')
  const { ReturnXQ } = require('./XQuery/ts/Funciones/ReturnXQ')
  const { LlamadaF } = require('./XQuery/ts/Funciones/LlamadaF')
  const { SumaXQ } = require('./XQuery/ts/Operaciones/Aritmeticas/Suma')
  const { RestaXQ } = require('./XQuery/ts/Operaciones/Aritmeticas/Resta')
  const { MultiplicacionXQ } = require('./XQuery/ts/Operaciones/Aritmeticas/Multiplicacion')
  const { DivisionXQ } = require('./XQuery/ts/Operaciones/Aritmeticas/Division')
  const { ModuloXQ } = require('./XQuery/ts/Operaciones/Aritmeticas/Modulo')
  const { NegativoXQ } = require('./XQuery/ts/Operaciones/Aritmeticas/Negativo')
  const { IgualXQ } = require('./XQuery/ts/Operaciones/Relacionales/Igual')
  const { NoIgualXQ } = require('./XQuery/ts/Operaciones/Relacionales/NoIgual')
  const { MayorXQ } = require('./XQuery/ts/Operaciones/Relacionales/Mayor')
  const { MayorIgualXQ } = require('./XQuery/ts/Operaciones/Relacionales/MayorIgual')
  const { MenorXQ } = require('./XQuery/ts/Operaciones/Relacionales/Menor')
  const { MenorIgualXQ } = require('./XQuery/ts/Operaciones/Relacionales/MenorIgual')
  const { AndXQ } = require('./XQuery/ts/Operaciones/Logicas/And')
  const { OrXQ } = require('./XQuery/ts/Operaciones/Logicas/Or')
  const { NotXQ } = require('./XQuery/ts/Operaciones/Logicas/Not')
  const { ToStringXQ } = require('./XQuery/ts/Funciones/Nativas/ToString')
  const { ToNumberXQ } = require('./XQuery/ts/Funciones/Nativas/ToNumber')
  const { upperCaseXQ } = require('./XQuery/ts/Funciones/Nativas/upperCase')
  const { lowerCaseXQ } = require('./XQuery/ts/Funciones/Nativas/lowerCase')
  const { subStringXQ } = require('./XQuery/ts/Funciones/Nativas/substring')
  const { IteradorFor } = require('./XQuery/ts/Instrucciones/Iterador')
  const { ForXQ } = require('./XQuery/ts/Instrucciones/For')
    
  var grafo = new grafoCST(); 

  var ListaErrores = []
%}

/* Definición Léxica */
%lex
  %options case-insensitive
  %x Comentario
%%

/* Espacios en blanco */
[ \r\t]+ {}
\n {}

"(:"          { this.begin("Comentario"); }
<Comentario>":)"  { this.popState(); }
<Comentario>[ \r\t]+     {}
<Comentario>\n     {}
<Comentario>.     {}

"let"       return "RLET"
"as"        return "RAS"
"xs"        return "Rxs"
":="        return "ASIGNAR"
"{"         return "LLAVEA"
"}"         return "LLAVEC"
";"         return "SEMICOLON"
"at"        return "RAT"
"true"      return "RTRUE"
"false"     return "RFALSE"
"integer"   return "R_INT"
"double"    return "R_DOBLE"
"decimal"   return "R_DECIMAL"
"float"     return "R_FLOAT"
"string"    return "R_STRING"
"boolean"   return "R_BOOLEAN"
"if"        return "R_IF"
"then"      return "R_THEN"
"else"      return "R_ELSE"
"declare"   return "R_DECLARE"
"function"  return "R_FUNC"
"local"     return "R_LOCAL"
"return"    return "R_RETURN"
"toString"  return "R_TOSTRING"
"tostring"  return "R_TOSTRING"
"number"    return "R_NUMBER"
"toNumber"    return "R_TONUMBER"
"tonumber"    return "R_TONUMBER"
"upper-case" return "R_UPPER"
"lower-case" return "R_LOWER"
"substring" return "R_SUBSTRING"


"or"    return "ROR"
"and"   return "RAND"
"not" return "RNOT"
"idiv"  return "IDIV"
"div"   return "DIV"
"mod"   return "MOD"
"for" return "RFOR"
"in"  return "RIN"
"to"  return "RTO"
"eq"  return "EQ"
"ne"  return "NE"
"lt"  return "LT"
"le"  return "LE"
"gt"  return "GT"
"ge"  return "GE"
"child" return "RCHILD"
"descendant-or-self" return "RDESSELF"
"descendant" return "RDESCENDANT"
"attribute" return "RATTRIBUTE"
"self" return "RSELF"
"following-sibling" return "RFOLLOWSIBLING"
"following" return "RFOLLOW"
"namespace" return "RNAMESPACE"
"parent" return "RPARENT"
"ancestor-or-self" return "RANCESTORORSELF"
"ancestor" return "RANCESTOR"
"preceding-sibling" return "RPRECEDSIBLING"
"preceding" return "RPRECED"

("."[0-9]+)|([0-9]+"."[0-9]+) 				    return "DECIMAL"
[0-9]+      								              return "INTEGER"
('"'[^"]*'"')|("'"[^']*"'")         		  { yytext = yytext.substr(1,yyleng-2); return "CADENA" }
([a-zA-ZñÑ_])([a-zA-ZñÑ0-9_-]|".")* 	    return "NOMBRE"

"//"        return "DOBLEBARRA"
"/"         return "BARRA"
"@"         return "ARROBA"
"["         return "CORA"
"]"         return "CORB"
"+"         return "MAS"
"-"         return "MENOS"
"**"        return "DobleAsterisco"
"*"         return "POR"
">="        return "MAYORIG"
"<="        return "MENORIG"
"!="        return "DIFERENTE"

"<"         return "MENOR"
">"         return "MAYOR"
"="         return "IGUAL"
"|"         return "PIPE"
","         return "COMA"
"$"         return "DOLAR"
"!"         return "ADMIRACION"
"@"         return "ARROBA"
".."        return "DOBLEPUNTO"
"("         return "PARENTESISA"
")"         return "PARENTESISC"
"?"         return "INTERROGACIONC"
"."         return "PUNTO"
"::"        return "DOBLEDOSPUNTOS"
":"         return "DOSPUNTOS"

.	{ console.log(`LEXERR: ${yytext}. L:${yylloc.first_line} C:${yylloc.first_column}`); ListaErrores.push({Error:'Este es un error léxico: ' + yytext,tipo:"Lexico", Linea: yylloc.first_line , columna:yylloc.first_column}) }

/lex

%left 'ROR'
%left 'RAND'
%nonassoc 'IGUAL' 'DIFERENTE' 'MAYOR' 'MAYORIG' 'MENOR' 'MENORIG' 'EQ' 'NE' 'LT' 'LE' 'GT' 'GE'
%left 'MAS' 'MENOS'
%left 'POR' 'DIV' 'IDIV' 'MOD'
%left UMENOS UMAS
%right 'RNOT'

%start XQuery

%%

XQuery: LInstruccionesXQ
  {
    $$ = new AST($1);
    return $$;
  }
;

LInstruccionesXQ: 
  LInstruccionesXQ InstruccionXQ { $1.push($2); $$ = $1; }
  | InstruccionXQ { $$ = [$1] }
;

InstruccionXQ:
  Declaracion { $$ = $1; }
  | Asignacion { $$ = $1; }
  | SIf { $$ = $1; }
  | DFuncion { $$ = $1; }
  | IFor { $$ = $1; }
  | LlamadaFuncion  { $$ = $1; }
;

DFuncion: 
  R_DECLARE R_FUNC R_LOCAL DOSPUNTOS NOMBRE PARENTESISA L_PARAMF PARENTESISC RAS T INTERROGACIONC BloqueF
    {
      let auxDF0 = new FuncionXQ($5, $7, $12, @5.first_line, @5.first_column);
      auxDF0.setTipo($10);
      $$ = auxDF0;
    }
  | R_DECLARE R_FUNC R_LOCAL DOSPUNTOS NOMBRE PARENTESISA L_PARAMF PARENTESISC RAS T BloqueF
    {
      let auxDF1 = new FuncionXQ($5, $7, $11, @5.first_line, @5.first_column);
      auxDF1.setTipo($10);
      $$ = auxDF1;
    }
  | R_DECLARE R_FUNC R_LOCAL DOSPUNTOS NOMBRE PARENTESISA L_PARAMF PARENTESISC BloqueF
    {
      $$ = new FuncionXQ($5, $7, $9, @5.first_line, @5.first_column);
    }
;

L_PARAMF:
  L_PARAMF COMA PARAMF { $1.push($3); $$ = $1; }
  | PARAMF  { $$ = [$1]; }
  | { $$ = []; }
;

PARAMF:
  DOLAR NOMBRE RAS T INTERROGACIONC
    {
      let auxPF0 = new ParametroXQ($2);
      auxPF0.setTipo($4);
      $$ = auxPF0;
    }
  | DOLAR NOMBRE RAS T
    {
      let auxPF1 = new ParametroXQ($2);
      auxPF1.setTipo($4);
      $$ = auxPF1;
    }
  | DOLAR NOMBRE
    {
      $$ = new ParametroXQ($2);
    }
;

BloqueF:
  LLAVEA BloqueI LLAVEC SEMICOLON { $$ = $2; }
;

LInstrucciones: LInstrucciones Instruccion { $1.push($2); $$ = $1; }
  | Instruccion { $$ = [$1] }
;

Instruccion:
  Declaracion { $$ = $1; }
  | Asignacion { $$ = $1; }
  | SIf { $$ = $1; }
  | E { $$ = $1; }
  | Return { $$ = $1; }
;

Return: R_RETURN E { $$ = new ReturnXQ($2, @1.first_line, @1.first_column); }
  | R_RETURN { $$ = new ReturnXQ(null, @1.first_line, @1.first_column); }
;

LlamadaFuncion: 
  R_LOCAL DOSPUNTOS NOMBRE ParametrosLL
    {
      $$ = new LlamadaF($3, $4, @3.first_line, @3.first_column);
    }
;

ParametrosLL: PARENTESISA LPLL PARENTESISC  { $$ = $2; }
  | PARENTESISA PARENTESISC { $$ = []; }
;

LPLL: LPLL COMA E { $1.push($3); $$ = $1; }
  | E { $$ = [$1]; }
;

Declaracion:
  RLET DOLAR NOMBRE RAS T INTERROGACIONC ASIGNAR E 
    { 
      let auxD0 = new DeclaracionXQ($3, $8, @3.first_line, @3.first_column);
      auxD0.setTipo($5);
      $$ = auxD0;
    }
  | RLET DOLAR NOMBRE RAS T ASIGNAR E 
    { 
      let auxD1 = new DeclaracionXQ($3, $7, @3.first_line, @3.first_column);
      auxD1.setTipo($5);
      $$ = auxD1;
    }
  | RLET DOLAR NOMBRE ASIGNAR E
    {
      $$ = new DeclaracionXQ($3, $5, @3.first_line, @3.first_column);
    }
;

Asignacion: 
  DOLAR NOMBRE ASIGNAR E 
  { 
    $$ = new AsignacionXQ($2, @2.first_line, @2.first_column, $4);
  }
;

SIf: L_Condiciones R_ELSE BloqueI { $$ = new If($1, $3, @2.first_line, @2.first_column); }
  | L_Condiciones { $$ = new If($1, null, @1.first_line, @1.first_column); }
;

L_Condiciones: L_Condiciones R_ELSE R_IF PARENTESISA E PARENTESISC R_THEN BloqueI
    {
      let auxLC1 = new Condicion_If($5, $8, @3.first_line, @3.first_column); 
      $1.push(auxLC1);
      $$ = $1;
    }
  | R_IF PARENTESISA E PARENTESISC R_THEN BloqueI
    { 
      let auxLC0 = new Condicion_If($3, $6, @1.first_line, @1.first_column); 
      $$ = [auxLC0]
    }
;

IFor: RFOR L_IteradoresF Return      { $$ = new ForXQ($2, $3, @1.first_line, @1.first_column); }
;

L_IteradoresF:
  L_IteradoresF COMA IteradorF      { $1.push($3); $$ = $1; }
  | IteradorF                      { $$ = [$1]; }
;

IteradorF:
  DOLAR NOMBRE RAT DOLAR NOMBRE RIN OBJETIVO    { $$ = new IteradorFor($2, $5, $7); }
  | DOLAR NOMBRE RIN OBJETIVO             { $$ = new IteradorFor($2, null, $4); }
;   

OBJETIVO:
  E                                       { $$ = $1; }
  | PARENTESISA E RTO E PARENTESISC       { $$ = ['@TO@',$2,$4]; }
  | PARENTESISA L_ELEMENTO PARENTESISC    { $$ = $2; }
;

L_ELEMENTO:
  L_ELEMENTO COMA E   { $1.push($3); $$ = $1; }
  | E                 { $$ = [$1]; }
;

BloqueI: LInstrucciones 
    {
      let auxBlI = new BloqueXQ();
      auxBlI.setDatos($1, @1.first_line, @1.first_column);
      $$ = auxBlI;
    }
  | { 
      $$ = new BloqueXQ();
    }
;

T: Rxs DOSPUNTOS R_INT     { $$ = new TipoXQ(EnumTipo.entero); }
  | Rxs DOSPUNTOS R_DOBLE  { $$ = new TipoXQ(EnumTipo.doble); }
  | Rxs DOSPUNTOS R_DECIMAL  { $$ = new TipoXQ(EnumTipo.doble); }
  | Rxs DOSPUNTOS R_FLOAT  { $$ = new TipoXQ(EnumTipo.doble); }
  | Rxs DOSPUNTOS R_STRING  { $$ = new TipoXQ(EnumTipo.cadena); }
  | Rxs DOSPUNTOS R_BOOLEAN  { $$ = new TipoXQ(EnumTipo.booleano); }
;

E: 
//Aritmeticas
  E MAS E { $$ = new SumaXQ($1, $3, @2.first_line, @2.first_column); }
  | E MENOS E { $$ = new RestaXQ($1, $3, @2.first_line, @2.first_column); }
  | E POR E { $$ = new MultiplicacionXQ($1, $3, @2.first_line, @2.first_column); }
  | E DIV E { $$ = new DivisionXQ($1, $3, @2.first_line, @2.first_column); }
  | E MOD E { $$ = new ModuloXQ($1, $3, @2.first_line, @2.first_column); }
  | MENOS E %prec UMENOS { $$ = new NegativoXQ($2, @1.first_line, @1.first_column); }
//Relacionales
  | E IGUAL E { $$ = new IgualXQ($1, $3, @2.first_line, @2.first_column); }
  | E DIFERENTE E { $$ = new NoIgualXQ($1, $3, @2.first_line, @2.first_column); }
  | E MAYOR E { $$ = new MayorXQ($1, $3, @2.first_line, @2.first_column); }
  | E MAYORIG E { $$ = new MayorIgualXQ($1, $3, @2.first_line, @2.first_column); }
  | E MENOR E { $$ = new MenorXQ($1, $3, @2.first_line, @2.first_column); }
  | E MENORIG E { $$ = new MenorIgualXQ($1, $3, @2.first_line, @2.first_column); }
  | E EQ E { $$ = new IgualXQ($1, $3, @2.first_line, @2.first_column); }
  | E NE E { $$ = new NoIgualXQ($1, $3, @2.first_line, @2.first_column); }
  | E GT E { $$ = new MayorXQ($1, $3, @2.first_line, @2.first_column); }
  | E GE E { $$ = new MayorIgualXQ($1, $3, @2.first_line, @2.first_column); }
  | E LT E { $$ = new MenorXQ($1, $3, @2.first_line, @2.first_column); }
  | E LE E { $$ = new MenorIgualXQ($1, $3, @2.first_line, @2.first_column); }
//Logicas
  | E RAND E { $$ = new AndXQ($1, $3, @2.first_line, @2.first_column); }
  | E ROR E { $$ = new OrXQ($1, $3, @2.first_line, @2.first_column); }
  | RNOT E { $$ = new NotXQ($2, @2.first_line, @2.first_column); }
  | ADMIRACION E { $$ = new NotXQ($2, @2.first_line, @2.first_column); }
//Literales - Primitivos
  | PARENTESISA E PARENTESISC { $$ = $2; }
  | INTEGER  { $$ = new LiteralXQ(new TipoXQ(EnumTipo.entero), $1, @1.first_line, @1.first_column); }
  | DECIMAL { $$ = new LiteralXQ(new TipoXQ(EnumTipo.doble), $1, @1.first_line, @1.first_column); }
  | CADENA  { $$ = new LiteralXQ(new TipoXQ(EnumTipo.cadena), $1, @1.first_line, @1.first_column); }
  | XPath   { $$ = new LiteralXQ(new TipoXQ(EnumTipo.XPath), $1, @1.first_column, @1.first_column); }
  | RTRUE   { $$ = new LiteralXQ(new TipoXQ(EnumTipo.booleano), $1, @1.first_line, @1.first_column); }
  | RFALSE  { $$ = new LiteralXQ(new TipoXQ(EnumTipo.booleano), $1, @1.first_line, @1.first_column); }
  | DOLAR NOMBRE { $$ = new IdXQ($2, @2.first_line, @2.first_column); }
//Nativas
  | R_STRING PARENTESISA E PARENTESISC { $$ = new ToStringXQ($3, @1.first_line, @1.first_column); }
  | R_TOSTRING PARENTESISA E PARENTESISC {$$ = new ToStringXQ($3, @1.first_line, @1.first_column); }
  | R_NUMBER PARENTESISA E PARENTESISC { $$ = new ToNumberXQ($3, @1.first_line, @1.first_column); }
  | R_TONUMBER PARENTESISA E PARENTESISC {$$ = new ToNumberXQ($3, @1.first_line, @1.first_column); }
  | R_UPPER PARENTESISA E PARENTESISC {$$ = new upperCaseXQ($3, @1.first_line, @1.first_column); }
  | R_LOWER PARENTESISA E PARENTESISC {$$ = new lowerCaseXQ($3, @1.first_line, @1.first_column); }
  | R_SUBSTRING PARENTESISA E COMA E PARENTESISC {$$ = new subStringXQ($3, $5, null, @1.first_line, @1.first_column); }
  | R_SUBSTRING PARENTESISA E COMA E COMA E PARENTESISC {$$ = new subStringXQ($3, $5, $7, @1.first_line, @1.first_column); }
//LLAMADA
  | LlamadaFuncion  { $$ = $1; }
;

//======================================================


XPath 
  : Expr  
  { 
    grafo.generarPadre(1, "INICIO");grafo.generarHijos("Expr");
    var retornoErrores = Object.assign([], ListaErrores);
    ListaErrores = [];
    var retornoGrafo = Object.assign({}, grafo);
    grafo = new grafoCST();
    $$ = new Comando($1,retornoGrafo.pilaNodos,retornoGrafo.PilaEdges,retornoGrafo.GrahpvizNodo+retornoGrafo.GrahpvizEdges,retornoErrores,retornoGrafo.TablaGramatica);
    //return $$ 
  }
  | error 
    {  
      ListaErrores.push({Error:"Error sintactico :"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column});
      var retornoErrores = Object.assign([], ListaErrores);
      ListaErrores = [];
      grafo = new grafoCST(); 
      $$ = new Comando([],[],[],"",retornoErrores,[])
      //return new Comando([],[],[],"",retornoErrores,[])
    }
;

Expr 
  : ExprSingle            
  { 
    $$=[];$$.push($1); 
    grafo.generarPadre(1, "ExprSingle");
    grafo.generarHijos("ExprSingle");
    grafo.generarTexto(`expr = []; expr.push(ExprSingle.valor);`);
  }
  | Expr PIPE ExprSingle  
  { 
    $$=$1;$$.push($3);
    grafo.generarPadre(3, "ExprSingle");
    grafo.generarPadre(1, "Expr");
    grafo.generarHijos("Expr",$2,"ExprSingle");
    grafo.generarTexto(`expr.push(ExprSingle.valor);`);
  }
  | Expr PIPE error       
  { 
    $$=$1;grafo.generarPadre(1, "Expr");
    ListaErrores.push({Error:"Error sintactico se recupero en:"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column}); 
    grafo.generarHijos("Expt",$2,"error");
    grafo.generarTexto(`return expr; new Error();`); 
  }
  | error PIPE ExprSingle    
  { 
    $$=[];$$.push($3); grafo.generarPadre(3, "ExprSingle");
    grafo.generarHijos("error",$2,"ExprSingle");
    ListaErrores.push({Error:"Error sintactico se recupero en:"+yytext,tipo:"Sintactico",Linea:this._$.first_line,columna:this._$.first_column}); 
    grafo.generarPadre(1, "error"); grafo.generarHijos("error",$2);
    grafo.generarTexto(`expr = []; new Error();`);
  }
; 

ExprSingle  
  : OrExpr  
  { 
    $$=$1; grafo.generarPadre(1, "OrExpr");
    grafo.generarHijos("OrExpr");
    grafo.generarTexto(`ExprSingle.valor = OrExpr.valor`);
  }
;

OrExpr      
  : AndExpr                 
  { 
    $$ = $1; grafo.generarPadre(1,"AndExpr");
    grafo.generarHijos("AndExpr");
    grafo.generarTexto(`OrExpr.valor = AndExpr.valor`);
  }
  | OrExpr ROR AndExpr      
  { 
    $$ = new Logical($1,$2,$3); grafo.generarPadre(3, "AndExpr");
    grafo.generarPadre(1, "OrExpr");
    grafo.generarHijos("OrExpr",$2,"AndExpr");
    grafo.generarTexto(`OrExpr.valor = new Logical(OrExpr.valor,${$2},AndExpr.valor);`);
  }
;

AndExpr     
  : ComparisonExpr                
  { 
    $$ = $1; grafo.generarPadre(1, "ComparisonExpr");
    grafo.generarHijos("ComparisonExpr");
    grafo.generarTexto(`AndExpr.valor = ComparisonExpr.valor`);
  }
	| AndExpr RAND ComparisonExpr   
  { 
    $$ = new Logical($1,$2,$3); grafo.generarPadre(3, "ComparisonExpr");
    grafo.generarPadre(1, "AndExpr");
    grafo.generarHijos("AndExpr",$2,"ComparisonExpr");
    grafo.generarTexto(`AndExpr.valor = new Logical(AndExpr.valor,${$2},ComparisonExpr.valor);`);
  }
;

ComparisonExpr    
  : AdditiveExpr                              
  { 
    $$=$1; grafo.generarPadre(1, "AdditiveExpr");
    grafo.generarHijos("StringConcatExpr");
    grafo.generarTexto(`ComparisonExpr.valor = AdditiveExpr.valor`);
  }
  | AdditiveExpr GeneralComp AdditiveExpr 
  { 
    $$ = new ComparisonExp($1,$2,$3); grafo.generarPadre(3, "AdditiveExpr");
    grafo.generarPadre(2, "GeneralComp");
    grafo.generarPadre(1, "AdditiveExpr");
    grafo.generarHijos("StringConcatExpr","GeneralComp","StringConcatExpr");
    grafo.generarTexto(`ComparisonExpr.valor = new ComparisonExp(AdditiveExpr.valor, GeneralComp.valor, AdditiveExpr.valor)`);
  }
;

GeneralComp
  : IGUAL     { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`GeneralComp.valor = ${$1}`); } // 5 = 5 | nodo = nodo
	| DIFERENTE { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
	| MENOR     { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
	| MENORIG   { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
	| MAYOR     { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
	| MAYORIG   { $$ = $1; grafo.generarHijos($1); grafo.generarTexto(`GeneralComp.valor = ${$1}`); }
;

AdditiveExpr      
  : MultiplicativeExpr                    
  { 
    $$=$1; grafo.generarPadre(1, "MultiplicativeExpr"); grafo.generarHijos("MultiplicativeExpr");
    grafo.generarTexto(`AdditiveExpr.valor = MultiplicativeExpr.valor`);
  }
	| AdditiveExpr MAS MultiplicativeExpr   
  { 
    $$= new Arithmetic($1,$2,$3); grafo.generarPadre(3, "MultiplicativeExpr");
    grafo.generarPadre(1, "AdditiveExpr");
    grafo.generarHijos("AdditiveExpr",$2,"MultiplicativeExpr");
    grafo.generarTexto(`AdditiveExpr.valor = new Arithmetic(AdditiveExpr.valor, ${$2}, MultiplicativeExpr.valor);`);
  }
	| AdditiveExpr MENOS MultiplicativeExpr 
  { 
    $$= new Arithmetic($1,$2,$3); grafo.generarPadre(3, "MultiplicativeExpr");
    grafo.generarPadre(1, "AdditiveExpr");
    grafo.generarHijos("AdditiveExpr",$2,"MultiplicativeExpr");
    grafo.generarTexto(`AdditiveExpr.valor = new Arithmetic(AdditiveExpr.valor, ${$2}, MultiplicativeExpr.valor);`);
  }
;

MultiplicativeExpr      
  : UnaryExpr                         
  { 
    $$=$1; grafo.generarPadre(1, "UnaryExpr");
    grafo.generarHijos("UnaryExpr");
    grafo.generarTexto(`MultiplicativeExpr.valor = UnaryExpr.valor;`);
  }
	| MultiplicativeExpr POR UnaryExpr  
  { 
    $$= new Arithmetic($1,$2,$3);
    grafo.generarPadre(3, "UnaryExpr");
    grafo.generarPadre(1, "MultiplicativeExpr");
    grafo.generarHijos("MultiplicativeExpr",$2,"UnaryExpr");
    grafo.generarTexto(`MultiplicativeExpr.valor = new Arithmetic(MultiplicativeExpr.valor,${$2},UnaryExpr.valor);`);
  }
	| MultiplicativeExpr DIV UnaryExpr  
  { 
    $$= new Arithmetic($1,$2,$3); grafo.generarPadre(3, "UnaryExpr");
    grafo.generarPadre(1, "MultiplicativeExpr");
    grafo.generarHijos("MultiplicativeExpr",$2,"UnaryExpr");
    grafo.generarTexto(`MultiplicativeExpr.valor = new Arithmetic(MultiplicativeExpr.valor,${$2},UnaryExpr.valor);`);
  }
	| MultiplicativeExpr IDIV UnaryExpr 
  { 
    $$= new Arithmetic($1,$2,$3); grafo.generarPadre(3, "UnaryExpr");
    grafo.generarPadre(1, "MultiplicativeExpr");
    grafo.generarHijos("MultiplicativeExpr",$2,"UnaryExpr");
    grafo.generarTexto(`MultiplicativeExpr.valor = new Arithmetic(MultiplicativeExpr.valor,${$2},UnaryExpr.valor);`);
  }
	| MultiplicativeExpr MOD UnaryExpr  
  { 
    $$= new Arithmetic($1,$2,$3); grafo.generarPadre(3, "UnaryExpr");
    grafo.generarPadre(1, "MultiplicativeExpr");
    grafo.generarHijos("MultiplicativeExpr",$2,"UnaryExpr");
    grafo.generarTexto(`MultiplicativeExpr.valor = new Arithmetic(MultiplicativeExpr.valor,${$2},UnaryExpr.valor);`);
  }
;

UnaryExpr   
  : PathExpr                         
  { 
    $$=$1; grafo.generarPadre(1, "PathExpr");
    grafo.generarHijos("PathExpr");
    grafo.generarTexto(`UnaryExpr.valor = PathExpr.valor;`);
  }
	| MAS UnaryExpr                    
  { 
    $$=new Unary($1, $2); grafo.generarPadre(2, "UnaryExpr");
    grafo.generarHijos($1,"UnaryExp");
    grafo.generarTexto(`UnaryExp.valor = new Unary(${$1},UnaryExpr.valor);`);
  }
	| MENOS UnaryExpr                  
  { 
    $$=new Unary($1, $2);
    grafo.generarPadre(2, "UnaryExpr");
    grafo.generarHijos($1,"UnaryExp");
    grafo.generarTexto(`UnaryExp.valor = new Unary(${$1},UnaryExpr.valor);`);
  }
;

PathExpr    
  : BARRA RelativePathExpr              
  { 
    $2[0].tipo=TipoPath.ABS;
    $$=new PathExp($2); 
    grafo.generarPadre(2, "RelativePathExpr");
    grafo.generarHijos($1,"RelativePathExpr");
    grafo.generarTexto(`path[0].tipo = Absoluto; PathExpr.valor = new PathExp(path.valor);`);
  }
	| DOBLEBARRA RelativePathExpr         
  { 
    $2[0].tipo=TipoPath.REL;
    $$=new PathExp($2);
    grafo.generarPadre(2, "RelativePathExpr");
    grafo.generarHijos($1,"RelativePathExpr");
    grafo.generarTexto(`path[0].tipo = Relativo; PathExpr.valor = new PathExp(path.valor);`);
  }
	| RelativePathExpr                    
  { 
    $$=new PathExp($1); 
    grafo.generarPadre(1, "RelativePathExpr");
    grafo.generarHijos("RelativePathExpr");
    grafo.generarTexto(`PathExpr.valor = new PathExp(path.valor);`);
  }
	| BARRA                               
  { 
    $$=new PathExp([]);
    grafo.generarHijos($1);
    grafo.generarTexto(`PathExpr.valor = new PathExp();`);
  }
;

RelativePathExpr  
  : StepExpr                              
  { 
    $$ = []; $$.push($1); grafo.generarPadre(1, "StepExpr");
    grafo.generarHijos("StepExpr");
    grafo.generarTexto(`path = []; path.push(StepExpr.valor);`);
  }
	| RelativePathExpr BARRA StepExpr       
  { 
    $$ = $1; $3.tipo=TipoPath.ABS; $$.push($3); 
    grafo.generarPadre(3, "StepExpr");
    grafo.generarPadre(1, "RelativePathExpr");
    grafo.generarHijos("RelativePathExpr",$2,"StepExpr");
    grafo.generarTexto(`StepExpr.tipo = Absoluto; path.push(StepExpr.valor); `);
  }
	| RelativePathExpr DOBLEBARRA StepExpr  
  { 
    $$ = $1; $3.tipo=TipoPath.REL; $$.push($3);
    grafo.generarPadre(3,"StepExpr");
    grafo.generarPadre(1, "RelativePathExpr");
    grafo.generarHijos("RelativePathExpr",$2,"StepExpr");
    grafo.generarTexto(`StepExpr.tipo = Relativo; path.push(StepExpr.valor);`);
  }
;

StepExpr    
  : PostfixExpr { $$=$1; grafo.generarPadre(1, "PostfixExpr"); grafo.generarHijos("PostfixExpr"); grafo.generarTexto(`StepExpr.valor = PostfixExpr.valor;`); }
	| AxisStep    { $$=$1; grafo.generarPadre(1, "AxisStep"); grafo.generarHijos("AxisStep"); grafo.generarTexto(`StepExpr.valor = AxisStep.valor`);  }
;

AxisStep    
  : ReverseStep               { $$=$1; grafo.generarPadre(1, "ReverseStep");grafo.generarHijos("ReverseStep"); grafo.generarTexto(`AxisStep.valor = ReverseStep.valor;`); }
	| ForwardStep               { $$=$1; grafo.generarPadre(1, "ForwardStep");grafo.generarHijos("ForwardStep"); grafo.generarTexto(`AxisStep.valor = ForwardStep.valor;`);}
	| ReverseStep PredicateList 
  { 
    $$=$1; $$.predicado=$2; grafo.generarPadre(2, "PredicateList");
    grafo.generarPadre(1, "ReverseStep"); 
    grafo.generarHijos("ReverseStep","PredicateList");
    grafo.generarTexto(`ReverseStep.predicado = PredicateList.valor; AxisStep.valor = ReverseStep;`);
  }
	| ForwardStep PredicateList 
  { 
    $$=$1; $$.predicado=$2; grafo.generarPadre(2, "PredicateList");
    grafo.generarPadre(1, "ForwardStep"); 
    grafo.generarHijos("ForwardStep","PredicateList");
    grafo.generarTexto(`ForwardStep.predicado = PredicateList.valor; AxisStep.valor = ForwardStep;`);
  }
;

PredicateList     
  : Predicate                 
  { 
    $$=[];$$.push($1);
    grafo.generarPadre(1, "Predicate");
    grafo.generarHijos("Predicate");
    grafo.generarTexto(`predicateList = []; predicateList.push(Predicate.valor);`);  
  }
  | PredicateList Predicate   
  { 
    $$=$1;$$.push($2); grafo.generarPadre(2, "Predicate");
    grafo.generarPadre(1, "PredicateList");
    grafo.generarHijos("PredicateList","Predicate");
    grafo.generarTexto(`predicateList.push(Predicate.valor);`);
  }
;

ForwardStep 
  : AbbrevForwardStep    
  { 
    $$=$1; grafo.generarPadre(1, "AbbrevForwardStep");
    grafo.generarHijos("AbbrevForwardStep");
    grafo.generarTexto(`ForwardStep.valor = AbbrevForwardStep.valor`);
  }
  | ForwardAxis NameTest 
  { 
    $$=$1; $$.nombre=$2; grafo.generarPadre(2, "NameTest");
    grafo.generarPadre(1, "ForwardAxis");
    grafo.generarHijos("ForwardAxis","NameTest");
    grafo.generarTexto(`ForwardAxis.nombre = NameTest.valor; ForwardStep.valor = ForwardAxis.valor`);
  }
;

AbbrevForwardStep 
  : ARROBA NameTest 
  { 
    $$=new Atributo($2,[],TipoPath.ABS);
    grafo.generarPadre(2, "NameTest");
    grafo.generarHijos($1,"NameTest");
    grafo.generarTexto(`AbbrevForwardStep.valor = new Atributo(NameTest.valor);`);
  }
  | NameTest        
  { 
    $$=new Camino($1,[],TipoPath.ABS);
    grafo.generarPadre(1, "NameTest");
    grafo.generarHijos("NameTest");
    grafo.generarTexto(`AbbrevForwardStep.valor = new Camino(NameTest.valor);`);
  }
;

ForwardAxis
  : RCHILD DOBLEDOSPUNTOS         { $$=new Child(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ForwardAxis.valor = new Child();`); }
  | RDESCENDANT DOBLEDOSPUNTOS    { $$=new Descendant(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ForwardAxis.valor = new Descendant();`); }
  | RATTRIBUTE DOBLEDOSPUNTOS     { $$=new Attribute(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ForwardAxis.valor = new Attribute();`); }
  | RSELF DOBLEDOSPUNTOS          { $$=new Self(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ForwardAxis.valor = new Self();`); }
  | RDESSELF DOBLEDOSPUNTOS       { $$=new DescSelf(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ForwardAxis.valor = new DescSelf();`); }
  | RFOLLOWSIBLING DOBLEDOSPUNTOS { $$=new FollowSibling(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ForwardAxis.valor = new FollowSibling();`); }
  | RFOLLOW DOBLEDOSPUNTOS        { $$=new Follow(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ForwardAxis.valor = new Follow();`);  }
  | RNAMESPACE DOBLEDOSPUNTOS     {}
;

NodeTest    
  : NameTest    { $$=$1; grafo.generarPadre(1, "NameTest"); grafo.generarHijos("NameTest"); grafo.generarTexto(`NodeTest.valor = NameTest.valor;`); }
;

NameTest    
  : NOMBRE    { $$=$1; grafo.generarHijos($1); grafo.generarTexto(`NameTest.valor = ${$1};`); }
	| POR       { $$=$1; grafo.generarHijos($1); grafo.generarTexto(`NameTest.valor = ${$1};`); }
;

ReverseStep 
  :  AbbrevReverseStep    
  { 
    $$=$1; grafo.generarPadre(1, "AbbrevReverseStep");
    grafo.generarHijos("AbbrevReverseStep");
    grafo.generarTexto(`ReverseStep.valor = AbbrevReverseStep.valor`);
 }
  |  ReverseAxis NameTest 
  { $$=$1; $$.nombre=$2;
    grafo.generarPadre(2, "NameTest");
    grafo.generarPadre(1, "ReverseAxis");
    grafo.generarHijos("ReverseAxis","NameTest");
    grafo.generarTexto(`ReverseAxis.nombre = NameTest; ReverseStep.valor = ReverseAxis;`);
  }
;

AbbrevReverseStep 
  : DOBLEPUNTO  { $$=new CaminoInverso("*",[],TipoPath.ABS); grafo.generarHijos($1); grafo.generarTexto(`caminoInverso = new CaminoInverso(); caminoInverso.tipo = Absoluto; AbbrevReverseStep.valor = caminoInverso;`); }
;

ReverseAxis
  : RPARENT DOBLEDOSPUNTOS            { $$=new Parent(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`parent = new Parent(); parent.tipo = Absoluto; ReverseAxis.valor = parent;`); }
  | RANCESTOR DOBLEDOSPUNTOS          { $$=new Ancestor(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ancestor = new Ancestor(); ancestor.tipo = Absoluto; ReverseAxis.valor = ancestor;`); }
  | RPRECEDSIBLING DOBLEDOSPUNTOS     { $$=new PrecedingSibling(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`precedingS = new PrecedingSibling(); precedingS.tipo = Absoluto; ReverseAxis.valor = precedingS;`); }
  | RPRECED DOBLEDOSPUNTOS            { $$=new Preceding(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`preceding = new Preceding(); preceding.tipo = Absoluto; ReverseAxis.valor = preceding;`);}
  | RANCESTORORSELF DOBLEDOSPUNTOS    { $$=new AncestorSelf(null,[],TipoPath.ABS); grafo.generarHijos($1,$2); grafo.generarTexto(`ancestorS = new AncestorSelf(); ancestorS.tipo = Absoluto; ReverseAxis.valor = ancestorS;`); }
;

PostfixExpr   
  : PrimaryExpr               
  { 
    $$=$1; grafo.generarPadre(1, "PrimaryExpr"); 
    grafo.generarHijos("PrimaryExpr");
    grafo.generarTexto(`PostfixExpr.valor = PrimaryExpr.valor;`);
  }
	| PrimaryExpr PredicateList 
  { $$=$1; $$.predicado = $2; grafo.generarPadre(2, "PredicateList");
    grafo.generarPadre(1, "PrimaryExpr");
    grafo.generarHijos("PrimaryExpr","PostfixExprL");
    grafo.generarTexto(`PrimaryExpr.predicado = predicateList.valor; PostfixExpr.valor = PrimaryExpr.valor`);
  }
;

Predicate   
  : CORA ExprSingle CORB            
  { 
    $$=$2; grafo.generarPadre(2, "ExprSingle");
    grafo.generarHijos($1,"ExprSingle",$3);
    grafo.generarTexto(`Predicate.valor = ExprSingle.valor;`);
  }
;

PrimaryExpr 
  : Literal                   { $$=$1; grafo.generarPadre(1, "Literal"); grafo.generarHijos("Literal"); grafo.generarTexto("PrimaryExpr.valor = literal.valor"); }
	| FunctionCall              { $$=$1; grafo.generarPadre(1, "FunctionCall"); grafo.generarHijos("FunctionCall"); grafo.generarTexto("PrimaryExpr.valor = functionCall.valor");}
	| ContextItemExpr           { $$=$1; grafo.generarPadre(1, "ContextItemExpr"); grafo.generarHijos("ContextItemExpr"); grafo.generarTexto("PrimaryExpr.valor = contextItemExpr.valor");}
	| ParenthesizedExpr         { $$=$1; grafo.generarPadre(1, "ParenthesizedExpr"); grafo.generarHijos("ParenthesizedExpr"); grafo.generarTexto("PrimaryExpr.valor = ParenthesizedExpr.valor"); }
;

Literal     
  : INTEGER                   { $$=new Literal(Tipo.INTEGER,$1); grafo.generarHijos($1); grafo.generarTexto(`return literal = new Literal(${$1}); literal.tipo = INTEGER;`); }
	| DECIMAL                   { $$=new Literal(Tipo.DECIMAL,$1); grafo.generarHijos($1); grafo.generarTexto(`return literal = new Literal(${$1}); literal.tipo = DECIMAL;`); }
	| CADENA                    { $$=new Literal(Tipo.STRING,$1);  grafo.generarHijos($1); grafo.generarTexto(`return literal = new Literal(${$1}); literal.tipo = STRING;`); }
;

FunctionCall      
  : NOMBRE PARENTESISA PARENTESISC              
  {
    $$ = new CallFunction([],TipoPath.ABS,$1);
    grafo.generarHijos($1,$2,$3);
    grafo.generarTexto(`functionCall = new CallFunction(); functionCall.tipo = Absoluto;`);
  }
;

ContextItemExpr   
  : PUNTO  { $$=new ContextItemExpr([],TipoPath.ABS); grafo.generarHijos($1); grafo.generarTexto(`contextItemExpr =  new ContextItemExpr(); contextItemExpr.tipo = Absoluto;`);}
;

ParenthesizedExpr 
  : PARENTESISA PARENTESISC             { $$=[]; grafo.generarHijos($1,$2); grafo.generarTexto(`ParenthesizedExpr.valor = [];`);}
	| PARENTESISA ExprSingle PARENTESISC  { $$=$2; grafo.generarHijos($1,$2,$3); grafo.generarTexto(`ParenthesizedExpr.valor = ExprSingle.valor;`); }
;	