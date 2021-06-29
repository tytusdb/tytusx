/* Definición Léxica */
%lex

%options case-insensitive

escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}\'
content                                [^<]
%s                                  comment
%%
\s+                                 /* skip whitespace */
"<!--"                              this.begin('comment');
<comment>"-->"                      this.popState();
<comment>.                          /* skip comment content*/



/* SIMBOLOS PARA OPERACIONES RELACIONALES */

"<?"                        return 'lteq';
"?>"                        return 'gteq';
"xml"                       return 'xml';
"version"                   return 'version';
"encoding"                  return 'encoding'
"<"                         return 'lt';
">"                         return 'gt';
"="                         return 'asig';
"/"                         return 'div';
"!"                         return 'not';
"."                         return 'punto';
"'"                         return 'csimple';
","                         return 'coma';
":"                         return 'dospuntos';
"#"                         return 'numeral';
"+"                         return 'mas';
"-"                         return 'guion';

'&lt;'                              return 'menor';
'&gt;'                              return 'mayorque';
'&amp;'                             return 'ampersand';
'&apos;'                            return "apostrofe";
'&quot;'                            return "quot";

/* Number literals */
[0-9]+"."[0-9]*                      return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';
[0-9]{2}-[0-9]{2}-[0-9]{4}          return 'fecha'

[a-zA-Z_][a-zA-Z0-9_ñÑàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]*            return 'identifier';

{stringliteral}                     return 'StringLiteral'
{charliteral}                       return 'CharLiteral'

//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF'

/lex
%{
    var usados = new Array();

    function repetido(num){
        var repe = false;
        for (i=0; i<=usados.length; i++) {
            if (num == usados[i]) {
                repe = true;
            }
        }
        return repe;
    }

    function aleatorio() {
        while (repe != false) {
            var num = Math.floor(Math.random()*(100000-1+1))+1;
            var repe = repetido(num);
        }
        usados.push(num);
        return num;
    }
%}



// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%


/* Definición de la gramática */
START : lteq xml  version asig StringLiteral encoding asig StringLiteral gteq RAIZ EOF 
{ 
    var tablaSimbolos = new tsXML();     
    let arr = new Array();    
    for (var i = 0; i < $10.length; i+=1) {  
        arr.push($10[i]);        
    }      
    tablaSimbolos.listaObjetos=arr;
    return tablaSimbolos;
}
;



RAIZ:
    lt identifier ATRIBUTOS gt RAICES  lt div identifier gt  { 
                                                        var num_id=aleatorio();
                                                        var id = new tsObjeto(num_id,$2, "Etiqueta","GLOBAL",null);
                                                        let array_raiz = new Array();
                                                        array_raiz.push(id);
                                                        for (var i = 0; i < $3.length; i+=1) {
                                                            if($3[i].padre==null)
                                                            {
                                                                $3[i].padre=id;
                                                            }
                                                            if($3[i].entorno==""){
                                                                $3[i].entorno=$2;
                                                            }                                                              
                                                            array_raiz.push($3[i]);
                                                        }  
                                                        for (var i = 0; i < $5.length; i+=1) {  
                                                            if($5[i].padre==null)
                                                            {
                                                                $5[i].padre=id;
                                                            }
                                                            if($5[i].entorno==""){
                                                                $5[i].entorno=$2;
                                                            }
                                                            array_raiz.push($5[i]);
                                                        }  
                                                        $$=array_raiz;
                                                    }
    | lt identifier  gt RAICES  lt div identifier gt {
                                                        var num_id=aleatorio();
                                                        var id = new tsObjeto(num_id,$2, "Etiqueta","GLOBAL",null);
                                                        let array8 = new Array();
                                                        array8.push(id);
                                                        for (var i = 0; i < $4.length; i+=1) {  
                                                            if($4[i].padre==null){
                                                                $4[i].padre=$2;
                                                            }
                                                            if($4[i].entorno==""){
                                                                $4[i].entorno=$2;
                                                            }
                                                            array8.push($4[i]);
                                                        }  
                                                        $$=array8;
                                                    }    
             
;

RAICES:
    RAICES OBJETO {
            let array_raices = new Array();            
            for (var i = 0; i < $1.length; i+=1) {                                                                      
                array_raices.push($1[i]);
            }  
            for (var i = 0; i < $2.length; i+=1) {                                                                      
                array_raices.push($2[i]);
            }              
            $$=array_raices;            

    }
	| OBJETO  {$$= $1;}
;        

  
OBJETO:
           lt identifier ATRIBUTOS gt RAICES  lt div identifier gt  { 
                                                                var num_id=aleatorio();
                                                                var id = new tsObjeto(num_id,$2, "Etiqueta","",null);
                                                                let arrayo = new Array();
                                                                arrayo.push(id);
                                                                    for (var i = 0; i < $3.length; i+=1)
                                                                    {  
                                                                        if($3[i].padre==null)
                                                                        {
                                                                            $3[i].padre=id;
                                                                        }
                                                                        if($3[i].entorno==""){
                                                                            $3[i].entorno=$2;
                                                                        }
                                                                        arrayo.push($3[i]);
                                                                    }  
                                                                    for (var i = 0; i < $5.length; i+=1)
                                                                    {
                                                                        if($5[i].padre==null)
                                                                        {
                                                                            $5[i].padre=id;
                                                                        }
                                                                        if($5[i].entorno==""){
                                                                            $5[i].entorno=$2;
                                                                        }
                                                                        arrayo.push($5[i]);
                                                                    }                                                                  
                                                                $$=arrayo;
                                                            } 
        |  lt identifier ATRIBUTOS gt VALORES  lt div identifier gt   { 
                                                                var num_id=aleatorio();
                                                                var id = new tsObjeto(num_id,$2, "Etiqueta","",null);                                                                
                                                                num_id=aleatorio();
                                                                var valor = new tsObjeto(num_id,$5, "Cadena",$2,id);
                                                                let array2 = new Array();
                                                                array2.push(id);
                                                                for (var i = 0; i < $3.length; i+=1) {  
                                                                    if($3[i].padre==null){
                                                                        $3[i].padre=id;
                                                                    }
                                                                    if($3[i].entorno==""){
                                                                        $3[i].entorno=$2;
                                                                    }
                                                                    array2.push($3[i]);                                                                    
                                                                }  
                                                                array2.push(valor);

                                                                $$=array2;         
                                                            } 
        |  lt identifier  gt RAICES  lt div identifier gt  {
                                                                var num_id=aleatorio();
                                                                var id = new tsObjeto(num_id,$2, "Etiqueta","",null);
                                                                let array3 = new Array();
                                                                array3.push(id);
                                                                for (var i = 0; i < $4.length; i+=1) {                                                                      
                                                                    if($4[i].padre==null){
                                                                        $4[i].padre=id;
                                                                    }
                                                                    if($4[i].entorno==""){
                                                                        $4[i].entorno=$2;
                                                                    }
                                                                    array3.push($4[i]);                                                                    
                                                                }                                                                  
                                                                $$=array3;
                                                            }       
        |  lt identifier  gt VALORES  lt div identifier gt  { 
                                                                var num_id=aleatorio();
                                                                var id = new tsObjeto(num_id,$2,"Etiqueta","",null);
                                                                num_id=aleatorio();
                                                                var valor = new tsObjeto(num_id,$4, "Cadena",$2,id);                                     
                                                                let array4 = new Array();
                                                                array4.push(id);
                                                                array4.push(valor);
                                                                $$=array4;
                                                            }    
           
;

VALORES: VALORES VALOR{$$=$1+" "+$2} 
        |VALOR {$$=$1;};

VALOR:DoubleLiteral{$$= $1;}
            |IntegerLiteral{$$= $1;}
            |identifier{$$= $1;}
            |StringLiteral{$$= $1;}
            |CharLiteral{$$= $1;}
            |menor{$$= $1;}
            |mayorque{$$= $1;}
            |ampersand{$$= $1;}
            |apostrofe{$$= $1;}
            |quot{$$= $1;}
            |content{$$= $1;}
            |punto{$$= $1;}
            |csimple{$$= $1;}
            |fecha{$$= $1;}
            |coma{$$= $1;}
            |dospuntos{$$= $1;}
            |numeral{$$= $1;}
            |mas{$$= $1;}
            |xml{$$= $1;}
            |guion{$$=$1;};
ATRIBUTOS:
    ATRIBUTOS ATRIBUTO   {
            let array_atributos = new Array();            
            for (var i = 0; i < $1.length; i+=1) {                                                                      
                array_atributos.push($1[i]);
            }  
            for (var i = 0; i < $2.length; i+=1) {                                                                      
                array_atributos.push($2[i]);
            }              
            $$=array_atributos;            
        }                           
    | ATRIBUTO {$$=$1;}

;

ATRIBUTO: 
    identifier asig StringLiteral {
                                    var num_id=aleatorio();
                                    var id = new tsObjeto(num_id,$1, "Atributo","",null);                                    
                                    num_id=aleatorio();
                                    var valor = new tsObjeto(num_id,$3, "Cadena","",null);                                                                         
                                    let array5 = new Array();                                    
                                    array5.push(id);
                                    array5.push(valor);                                    
                                    $$=array5;                                    
    }
;