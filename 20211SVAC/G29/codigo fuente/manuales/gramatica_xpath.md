# Gramática Ascendente XPATH
```xml
PRECEDENCIA

%left 'OR'
%left 'AND'
%right 'NOT'
%left 'MENORQUE' 'MAYORQUE' 'MENORIGUAL' 'MAYORIGUAL' 'IGUAL' 'IGUALIGUAL' 'DIFERENTE'
%left 'MAS' 'MENOS'
%left 'MULTI' 'DIVS' 'MODULO'

<lista_instrucciones> ::= <lista_instrucciones> <instruccion>    
 		       | <instruccion>                                       
   
<inicio>          ::= <lista_several> EOF
                

<lista_several> ::= <lista_several> <SEVERAL> <lista_select> 
                | <lista_select>

<lista_select>  ::= <lista_select> <select>
                | <select>

<select>        ::= <DIV> <ID> 
                | <DIV> <DIV> <ID> 
                | <DIV> <ATR> <ID>
                | <DIV> <DIV> <ATR> <ID> 
                | <DIV> <MULTI> 
                | <DIV> <DIV> <MULTI>
                | <DIV> <ATR> <MULTI>
                | <DIV> <DIV> <ATR> <MULTI>
                | <DIV> <ID> <CORA> <e> <CORC>
                | <DIV> <DIV> <ID> <CORA> <e> <CORC>
                | <DIV> <ID> <DPTN> <DPTN> <ID>
                | <DIV> <ID> <DPTN> <DPTN> <MULTI>
                | <DIV> <DIV> <ID> <DPTN> <DPTN> <ID>
                | <DIV> <DIV> <ID> <DPTN> <DPTN> <MULTI>
                | <DIV> <ID> <DPTN> <DPTN> <ID> <CORA> <e> <CORC>
                | <DIV> <DIV> <ID> <DPTN> <DPTN> <ID> <CORA> <e>CORC
                | <DIV> <PTN> 
                | <DIV> <DIV> <PTN> 
                | <DIV> <PTN> <PTN>
                | <DIV> <DIV> <PTN> <PTN>
                | <DIV> <ID> <PARA> <PARC>
                | <DIV> <DIV> <ID> <PARA> <PARC>

<instruccion>     ::= <PRINT> <PARA> <e> <PARC>

<e>             ::= <NUM> 
                | <CADENA> 
                | <LAST> <PARA> <PARC> 
                | <POSITION> <PARA> <PARC> 
                | <ID>
                | <ATR> <ID>
                | <TRUE> 
                | <FALSE> 
                | <e> <MAS> <e>
                | <e> <MENOS> <e>
                | <e> <MULTI> <e>
                | <e> <DIVS> <e>
                | <e> <MODULO> <e>
                | <MENOS> <e> %prec <UNARIO>
                | <e> <MENORQUE> <e>
                | <e> <MAYORQUE> <e>
                | <e> <MENORIGUAL> <e>
                | <e> <MAYORIGUAL> <e>
                | <e> <IGUAL> <e>
                | <e> <IGUALIGUAL> <e>
                | <e> <DIFERENTE> <e>
                | <e> <OR> <e>
                | <e> <AND> <e>
                | <NOT> <e>
                | <PARA> <e> <PARC>
                ;
```
# Gramática Descendente XPATH
```xml
PRECEDENCIA

%left 'OR'
%left 'AND'
%right 'NOT'
%left 'MENORQUE' 'MAYORQUE' 'MENORIGUAL' 'MAYORIGUAL' 'IGUAL' 'IGUALIGUAL' 'DIFERENTE'
%left 'MAS' 'MENOS'
%left 'MULTI' 'DIVS' 'MODULO'
%right 'UNARIO'


<inicio> : <lista_several> EOF 


<lista_several> : <lista_select> <SEVERAL> <lista_several> 
                | <lista_select>

<lista_select>  : <select> <lista_select>
                | <select>
                ;

<select>        :  <DIV>  <list_op_select>

<list_op_select>:  <DIV> <opcion_select>               
                | <opcion_select> 
                  
<opcion_select> : <ID> <otra_opcion_s> 
                | <ATR> <fin_opcion_s>
                | <MULTI>
                   

<opcion_padre_s>: <PTN> 
                |
                
                
<otra_opcion_s> : <CORA> <e> <CORC>
                | <DPTN> <DPTN> <axes_select> 
                | <PARA> <PARC> 
                | 

<axes_select>   : <ID> <axes_predi_slc>
                | <MULTI> 
                | 

<fin_opcion_s>  : <ID>
                | <MULTI>
                
<e>             : <e> <MAS> <e>
                | <e> <MENOS> <e>
                | <e> <MULTI> <e>
                | <e> <DIVS> <e>
                | <e> <MODULO> <e>
                | <MENOS> <e> %prec <UNARIO> 
                | <e> <MENORQUE> <e>
                | <e> <MAYORQUE> <e>
                | <e> <MENORIGUAL> <e>
                | <e> <MAYORIGUAL> <e>
                | <e> <IGUAL> <e>
                | <e> <IGUALIGUAL> <e>
                | <e> <DIFERENTE> <e>
                | <e> <OR> <e>
                | <e> <AND> <e>
                | <NOT> <e>
                | <PARA> <e> <PARC> 
                | <LAST> <PARA> <PARC> 
                | <POSITION> <PARA> <PARC> 
                | <ATR> <ID> 
                | <NUM> 
                | <CADENA> 
                | <ID> 
                | <TRUE> 
                | <FALSE>
