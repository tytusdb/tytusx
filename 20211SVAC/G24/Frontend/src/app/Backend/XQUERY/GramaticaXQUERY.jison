%lex

%%
[(][:][^)]*[:]+[)]                        {} //COMENTARIO


[ \r\t]+    {}
\n+          {}
"//".* {}  //comentario simple
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {} //comentario multiple

"for"       return 'RFOR';
"let"       return 'RLET';
"where"     return 'RWHERE';
"order by"  return 'RORDERBY';
"return"    return 'RRETURN';
"in"        return 'RIN';
"doc"       return 'RDOC';
"if"        return 'RIF';
"else"      return 'ELSE';
"


"("         return 'PARIZQ';
")"         return 'PARDER';    
"\""        return 'COMILLADOBLE';
"\'"        return 'QUOTE';
"/"         return 'BARRA';
"["         return 'CORIZQ';
"]"         return 'CORDER';
"$"         return 'DOLAR';
"<"         return 'MENORQUE';
">"         return 'MAYORQUE';
"{"         return 'LLAVEIZQ';
"}"         return 'LLAVEDER';


