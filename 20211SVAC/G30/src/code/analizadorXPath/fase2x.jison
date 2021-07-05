/* description: Parsea lenguaje XPath */

%{
    /*Acá importo mis cosas errores, tokens para la tabla de símbolos y eso*/
    const { Instruccion } = require('./codigo/lista')
    
    const listaInstrucciones = [];
%}

/* Analizador Léxico */
%lex

%options case-insensitive
number  [0-9]+("."[0-9]+)?\b 

%%

\s+                   /* skip whitespace */
{number}              {  
                        return 'NUMBER';}
"//"                   {  
                        return '//';}
"/"                   {  
                        return '/';}

\"([^\\\"\n]|\\.)*\"	{  
                        return 'cadena';}
\'([^\\\"\n]|\\.)*\'	{  
                        return 'cadena';}

"["                   {  
                        return '[';}
"]"                   {  
                        return ']';}
"("                   {  
                        return '(';}
")"                   {  
                        return ')';}
"|"                   {  
                        return '|';}

"+"                   {  
                        return '+';}
"-"                   {  
                        return '-';}
"*"                   {  
                        return '*';}
"div"                  {  
                        return 'div';}
"="                   {  
                        return '=';}
"!="                   {  
                        return '!=';}

"<="                   {  
                        return '<=';}
"<"                   {  
                        return '<';}
">="                   {  
                        return '>=';}
">"                   {  
                        return '>';}

"or"                   {  
                        return 'or';}
"and"                  {  
                        return 'and';}
"mod"                   {  
                        return 'mod';}

"@"                   {  
                        return '@';}
"'"                   {  
                        return '\'';}
"\""                   {  
                        return '\"';}
"ancestor-or-self"           {  
                        return 'ancestor-or-self';}
"ancestor"                   {  
                        return 'ancestor';}

"attribute"                  {  
                        return 'attribute';}
"child"                      {  
                        return 'child';}

"descendant-or-self"         {  
                        return 'descendant-or-self';}
"descendant"                 {  
                        return 'descendant';}
"following-sibling"          {  
                        return 'following-or-sibling';}
"following"                  {  
                        return 'following';}

"namespace"                  {  
                        return 'namespace';}
"parent"                     {  
                        return 'parent';}
"preceding-sibling"          {  
                        return 'preceding-sibling';}
"preceding"                  {  
                        return 'preceding';}

"self"                       {  
                        return 'self';}
"text"                       {  
                        return 'text';}
"node"                      {  
                        return 'node';}
"position"                       {  
                        return 'position';}
"last"                       {  
                        return 'last';}

"::"                   {  
                        return '::';}
".."                   {  
                        return '..';}
"."                  {  
                        return '.';}


([a-zA-Z_])[a-zA-Z0-9_ñÑ]*	{  
                        return 'ID';}
<<EOF>>               {  
                        return 'EOF';}
.           {             
                
                console.log(`Error Léxico: ${yytext} en la linea ${yylloc.first_line} y en la columna ${yylloc.first_column}`);
            }

/lex


/* operator associations and precedence */

%left '=', '!='
%left '>=', '<=', '<', '>'
%left '+' '-' 
%left '*' 'div'

%left '|'
%left 'or'
%left 'and'
%left 'mod'


%start Init

%% /* SINTACTICO == Gramática */

Init
    : instrucciones EOF {
		// cuado se haya reconocido la entrada completa retornamos el AST y todo lo demás
        console.log('XPATH completo! :D');
        return listaInstrucciones;
	}
;

instrucciones 
    : instrucciones primero 	{
                                    
                                }
	| primero					{
                                    $$ = {};
                                }
;

primero
    : aux4  segundo         
                            {
                                $$ = {};                                
                                                                 
                            }
    | puntos Barritas          {
                                $$ = {};
                                  
                            }
    | sinBarritas           {
                                $$ = {};
                            }
    | error Barritas {
                $$ = $1;
                @$.first_column = @1.first_column;
                @$.first_line = @1.first_line;                
                if($1 != ''){
                
                console.log('Sintáctico ->', $1, @1.first_column,",",@1.first_line);
                }
                
            }
;

/* HASTA ACÁ CHIDO*/

sinBarritas
    : aux3 Barritas         {
                                $$ = {};
                                  
                            } 
    | aux3                  {
                                $$ = $1;  
                                listaInstrucciones.push(new Instruccion('id', $$));
                                  
                            }
    | aux3 specs            {
                                $$ = {};
                                  
                            }
    | aux3 specs Barritas   {
                                $$ = {};
                            }
    | Axes Barritas         {
                                $$ = {};
                            }
;

Barritas
    : aux4 segundo         
                            {
                                $$ = {};
                            }
    | aux4 primero           {
                                $$ = {};
                            }
    |                       {
                                $$ = {};
                            }
;

aux4
    : '//'                  {
                                $$ = $1 ;   
                                listaInstrucciones.push(new Instruccion('//', $$));
                            }
    | '/'                    {
                                $$ = $1 ;  
                                listaInstrucciones.push(new Instruccion('/', $$));
                            }
    | '|'                   {                                
                                $$ = $1;  
                                listaInstrucciones.push(new Instruccion('|', $$));
                            }
;

segundo
    : aux3 specs Barritas   {
                                $$ = {};
                            }
    | aux3 Barritas         {
                                $$ = {};
                            }
    | aux3 specs        {
                                $$ = {};
                            }
    | Axes Barritas         {
                                $$ = {};
                            }
    | puntos specs Barritas    {
                                $$ = {};
                            }
    | puntos Barritas          {
                                $$ = {};
                            }
    | puntos specs Barritas   {
                                $$ = {};
                            }
    | puntos Barritas         {
                                $$ = {};
                            }
    | 'text''('')'          {
                                $$ = $1 + $2 + $3;
                                listaInstrucciones.push(new Instruccion('text', $$));
                            }
    | 'node''('')'          {
                                $$ = $1 + $2 + $3;
                                listaInstrucciones.push(new Instruccion('node', $$)); 
                            }
;

aux3
    : '@' 'ID'              {
                                $$ = $1 + $2;   
                                listaInstrucciones.push(new Instruccion('atribute', $$));
                            }
    | '@' '*'               {
                                $$ = $1 + $2;  
                                listaInstrucciones.push(new Instruccion('all_atributes', $$));
                            }
    | 'ID'              {                                
                            $$ = $1;  
                            listaInstrucciones.push(new Instruccion('id', $$));
                        }
    | '*'               {
                            $$ = $1;
                            listaInstrucciones.push(new Instruccion('all', $$));   
                             
                        }
;

puntos
    : '.'   {
                $$ = $1;
                listaInstrucciones.push(new Instruccion('.', $$));
            }
    | '..'   {
                $$ = $1;
                listaInstrucciones.push(new Instruccion('..', $$));
            }
;

/*    DE ACÁ PARA ABAJO TODO ESTÁ BIEN Y TODO FUNCIONA      */


/*PREDICADOS DE ESPECIALIDAD */
specs
    : aux1 expr aux2  {
                        $$ = {};
                    }
;



expr
    : aux1 expr aux2    {
                            $$ = {};
                             
                        }
    | expr signo expr   {
                            $$ = {};
                        }
    | ident             {
                            $$ = {};
                        }
;

signo
    : '+'   {
                $$ = $1;
                listaInstrucciones.push(new Instruccion('+', $$));
            }
    | '-'   {
                $$ = $1;
                listaInstrucciones.push(new Instruccion('-', $$));
            }
    | 'mod'   {
                $$ = $1;
                listaInstrucciones.push(new Instruccion('mod', $$));
            }
    | 'and'   {
                $$ = $1;
                listaInstrucciones.push(new Instruccion('and', $$));
            }
    | 'or'   {
                $$ = $1;
                listaInstrucciones.push(new Instruccion('or', $$));
            }
    | '>='   {
                $$ = $1;
                listaInstrucciones.push(new Instruccion('>=', $$));
            }
    | '>'   {
                $$ = $1;
                listaInstrucciones.push(new Instruccion('>', $$));
            }
    | '<'   {
                $$ = $1;
                listaInstrucciones.push(new Instruccion('<', $$));
            }
    | '<='   {
                $$ = $1;
                listaInstrucciones.push(new Instruccion('<=', $$));
            }
    | '*'   {
                $$ = $1;
                listaInstrucciones.push(new Instruccion('*', $$));
            }
    | 'div'   {
                $$ = $1;
                listaInstrucciones.push(new Instruccion('div', $$));
            }
    | '='   {
                $$ = $1;
                listaInstrucciones.push(new Instruccion('=', $$));
            }
    | '!='   {
                $$ = $1;
                listaInstrucciones.push(new Instruccion('!=', $$));
            }
;

aux1
    : '('   {
                $$ = $1;
                listaInstrucciones.push(new Instruccion('(', $$));
            }
    | '['   {
                $$ = $1;
                listaInstrucciones.push(new Instruccion('[', $$));
            }
;

aux2
    : ')'   {
                $$ = $1;
                listaInstrucciones.push(new Instruccion(')', $$));
            }
    | ']'   {
                $$ = $1;
                listaInstrucciones.push(new Instruccion(']', $$));
            }
;


/* ESTO SON LOS PREDICADOS */
ident
    : 'text''('')'      {                                
                            $$ = $1 + $2 + $3;
                            listaInstrucciones.push(new Instruccion('text', $$));
                             
                        }
    | 'node''('')'      {   
                            $$ = $1 + $2 + $3;
                            listaInstrucciones.push(new Instruccion('node', $$)); 
                             
                        }
    | 'position''('')'  {                                
                            $$ = $1 + $2 + $3;
                            listaInstrucciones.push(new Instruccion('position', $$));
                             
                        }
    | 'last''('')'      {                                
                            $$ = $1 + $2 + $3;
                            listaInstrucciones.push(new Instruccion('last', $$));
                            
                        }
    | '@''ID'           {                                
                           $$ = $1 + $2;   
                            listaInstrucciones.push(new Instruccion('atribute', $$));
                              
                        }
    | '@''*'            {                                
                            $$ = $1 + $2;  
                            listaInstrucciones.push(new Instruccion('all_atributes', $$));
                              
                        }
    | 'ID'              {                                
                            $$ = $1;  
                            listaInstrucciones.push(new Instruccion('id', $$));
                        }
    | 'NUMBER'          {                                
                            $$ = $1;  
                            listaInstrucciones.push(new Instruccion('number', $$));
                              
                        }
    | 'cadena'          {                                
                            $$ = $1; 
                            listaInstrucciones.push(new Instruccion('cadena', $$));
                        }
    | Axes              {
                            $$ = {};
                        }
    | error {
                $$ = $1;
                @$.first_column = @1.first_column;
                @$.first_line = @1.first_line;                
                if($1 != ''){
                
                console.log('Sintáctico ->', $1, @1.first_column,",",@1.first_line);
                }
                
            }
;

Axes
    : nombre '::' predicado         {
                                        $$ = {};
                                          
                                    }
    | nombre '::' predicado specs      {
                                        $$ = {};
                                          
                                    }
;

/* ESTA ES LA PRIMERA PARTE DE LOS AXES */
nombre
    : 'ancestor'            {                                
                                $$ = $1;  
                                listaInstrucciones.push(new Instruccion('ancestor', $$)); 
                                listaInstrucciones.push(new Instruccion('axes1', '::')); 
                            }
    | 'ancestor-or-self'    {                                
                                $$ = $1; 
                                listaInstrucciones.push(new Instruccion('ancestor-or-self', $$));
                                listaInstrucciones.push(new Instruccion('axes1', '::'));   
                            }
    | 'attribute'           {                                
                                $$ = $1; 
                                listaInstrucciones.push(new Instruccion('attribute', $$)); 
                                listaInstrucciones.push(new Instruccion('axes1', '::')); 
                            }
    | 'child'               {                                
                                $$ = $1;  
                                listaInstrucciones.push(new Instruccion('child', $$)); 
                                listaInstrucciones.push(new Instruccion('axes1', '::')); 
                            }
    | 'descendant'          {                                
                                $$ = $1; 
                                listaInstrucciones.push(new Instruccion('descendant', $$)); 
                                listaInstrucciones.push(new Instruccion('axes1', '::'));  
                            }
    | 'descendant-or-self'  {                                
                                $$ = $1;  
                                listaInstrucciones.push(new Instruccion('descendant-or-self', $$)); 
                                listaInstrucciones.push(new Instruccion('axes1', '::'));     
                            }
    | 'following'           {                                
                                $$ = $1; 
                                listaInstrucciones.push(new Instruccion('following', $$));    
                                listaInstrucciones.push(new Instruccion('axes1', '::')); 
                            }
    | 'following-sibling'   {                                
                                $$ = $1; 
                                listaInstrucciones.push(new Instruccion('following-sibling', $$));  
                                listaInstrucciones.push(new Instruccion('axes1', '::'));    
                            }
    | 'namespace'           {                                
                                $$ = $1;  
                                listaInstrucciones.push(new Instruccion('namespace', $$)); 
                                listaInstrucciones.push(new Instruccion('axes1', '::')); 
                            }
    | 'parent'              {                                
                                $$ = $1; 
                                listaInstrucciones.push(new Instruccion('parent', $$)); 
                                listaInstrucciones.push(new Instruccion('axes1', '::')); 
                            }
    | 'preceding'           {                                
                                $$ = $1;  
                                listaInstrucciones.push(new Instruccion('preceding', $$));
                                listaInstrucciones.push(new Instruccion('axes1', '::')); 
                            }
    | 'preceding-sibling'   {                                
                                $$ = $1; 
                                listaInstrucciones.push(new Instruccion('preceding-sibling', $$)); 
                                listaInstrucciones.push(new Instruccion('axes1', '::')); 
                                  
                            }
    | 'self'                {
                                $$ = $1; 
                                listaInstrucciones.push(new Instruccion('self', $$));
                                listaInstrucciones.push(new Instruccion('axes1', '::'));                                
                            }
    
;

/* ESTA ES LA SEGUNDA PARTE DE LOS AXES */
predicado
    : '*'               {
                            $$ = $1;
                            listaInstrucciones.push(new Instruccion('all', $$));   
                             
                        }
    | 'ID'              {
                            $$ = $1;
                            listaInstrucciones.push(new Instruccion('id', $$));   
                             
                        }
    | 'text''('')'      {
                            $$ = $1 + $2 + $3;
                            listaInstrucciones.push(new Instruccion('text', $$));   
                             
                        }
    | 'node''('')'      {
                            $$ = $1 + $2 + $3;
                            listaInstrucciones.push(new Instruccion('node', $$));                                
                             
                        }
    | 'position''('')'  {
                            $$ = $1 + $2 + $3;
                            listaInstrucciones.push(new Instruccion('position', $$));                            
                             
                        }
    | 'last''('')'      {
                            $$ = $1 + $2 + $3;
                            listaInstrucciones.push(new Instruccion('last', $$));                                                        
                             
                        }
;