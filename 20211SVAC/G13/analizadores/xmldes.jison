/*------------------------------------IMPORTS----------------------------------*/
%{
    const { AtributoXML } = require('./AtributoXML.js');
    const { ObjetoXML } = require('./ObjetoXML.js');
    const { Error } = require('./Error.js');
    const { Nodo } = require('./Nodo.js');
    const {FilaGrammar} = require('./FilaGrammar.js');

    let codificacion = 'UTF-8'
    let errores = []; 
    let gramatica = [];
    

    //Variables para uso local
    let contador = 1;

    /*Metodo que quita caracters innecesarios y regresa el nombre de una etiqueta*/
    const setTag = (cadena) =>{
        return cadena = cadena.replace(/\n/g,'').replace(/\r/g,'').replace(/\t/g,'').replace(/ /g,'').replace(/</g,''); 
    }

    const setid = () =>{
        return contador++;
    }

    const getGrammar = (production) =>{
        let cadena = [];
        switch(production){
            case 'S':
                cadena = ['S -> ROOT ','{ S = ROOT; }'];
                break;

            case 'ROOT':
                cadena = ['ROOT -> ENCODING ELEMENTO',
                '{ ROOT.tag = ELEMENTO.tag; ROOT.enc = ENCODING.enc; }'];
                break;

            case 'ENCODING1':
                cadena = ['ENCODING -> StartP Name Name Igual Value ENDDEF',
                '{ ENCODING.enc = Value.val }'];
                break;

            case 'ENCODING2':
                cadena = ['ENCODING -> epsilon','{ ENCODING.enc = "UTF-8"; }'];
                break;

            case 'ELEMENTO1':
                cadena = ['ELEMENTO -> Start ATRIBUTOS Slash Close ',
                '{ ELEMENTO.tag = newTag(Start.val,ATRIBUTOS.list); }'];
                break;

            case 'ELEMENTO2':
                cadena = ['ELEMENTO -> Start ATRIBUTOS Close CONTENIDO End Name Close',
                '{ ELEMENTO.tag = new Tag(Start.val,ATRIBUTOS.list,CONTENIDO.val); }'];
                break;

            case 'ELEMENTO3':
                cadena = ['ELEMENTO -> Start ATRIBUTOS Close ELEMENTOS End Name Close',
                '{ ELEMENTO.tag = newTag(Start.val,ATRIBUTOS.list,ELEMENTOS.list);  }'];
                break;

            case 'ATRIBUTOS1':
                cadena = ['ATRIBUTOS -> LISTA_ATRIBUTOS','{ ATRIBUTOS.list = LISTA_ATRIBUTOS.list; }'];
                break;

            case 'ATRIBUTOS2':
                cadena = ['ATRIBUTOS -> epsilon','{ ATRIBUTOS.list = newList(); }'];
                break;

            case 'LISTA_ATRIBUTOS':
                cadena = ['LISTA_ATRIBUTOS -> ATRIBUTO LISTA_ATRIBUTOS_P',
                '{ LISTA_ATRIBUTOS_P.list.add(ATRIBUTO.atrib); LISTA_ATRIBUTOS.list = LISTA_ATRIBUTOS_P.list; }'];
                break;

            case 'LISTA_ATRIBUTOS_P1':
                cadena = ['LISTA_ATRIBUTOS_P -> ATRIBUTO LISTA_ATRIBUTOS_P',
                '{ LISTA_ATRIBUTO_P.list.add(ATRIBUTO.atrib); }'];
                break;

            case 'LISTA_ATRIBUTOS_P2':
                cadena = ['LISTA_ATRIBUTOS_P -> epsilon',
                '{ LISTA_ATRIBUTOS_P.list = new List(); }'];
                break;

            case 'ATRIBUTO':
                cadena = ['ATRIBUTO -> Name Igual Value',
                '{ ATRIBUTO.atrib = new Atributo(Name.val,Value,val); }'];
                break;

            case 'ELEMENTOS':
                cadena = ['ELEMENTOS -> ELEMENTO ELEMENTOS_P',
                '{ ELEMENTOS_P.list.add(ELEMENTO.elem); ELEMENTOS.list = ELEMENTOS_P.list; }'];
                break;

            case 'ELEMENTOS_P1':
                cadena = ['ELEMENTOS_P -> ELEMENTO ELEMENTOS_P',
                '{ ELEMENTOS_P.list.add(ELEMENTO.alem); }'];
                break;

            case 'ELEMENTOS_P2':
                cadena = ['ELEMENTOS_P -> epsilon',
                '{ ELEMENTOS_P.list = new List(); }'];
                break;

            case 'CONTENIDO1':
                cadena = ['CONTENIDO -> LISTA_DATOS','{ CONTENIDO.list = LISTA_DATOS.list; }'];
                break;

            case 'CONTENIDO2':
                cadena = ['CONTENIDO -> epsilon','{ CONTENIDO.list = new List(); }'];
                break;

            case 'LISTA_DATOS':
                cadena = ['LISTA_DATOS -> DATOS LISTA_DATOS_P','{ LISTA_DATOS_P.list.add(DATOS.val); }'];
                break;

            case 'LISTA_DATOS_P1':
                cadena = ['LISTA_DATOS_P -> DATOS LISTA_DATOS_P ','{ LISTA_DATOS_P.list.add(DATOS.val); }'];
                break;

            case 'LISTA_DATOS_P2':
                cadena = ['LISTA_DATOS_P -> epsilon','{ LISTA_DATOS_P.list = new List(); }'];
                break;

            case 'DATOS1':
                cadena = ['DATOS ->Data','{ DATOS.val = Data.val }'];
                break;

            case 'DATOS2':
                cadena = ['DATOS -> Name','{ DATOS.val = Name.val }'];
                break;
            
            default:
                break;
        }
        return cadena;
    }

    const addErr = (err,loc,msj) => {
        //tipo,linea,columna,mensaje
        errores.push(new Error('semantico',err,loc.first_line,loc.first_column,msj));
    }

    let tgs = '';
    let tgc = '';
    let aux;
%}

/*-------------------------------------LEXICO----------------------------------*/
%lex

//OPCIONES DE JISON
%options case-sensitive
%options ranges
//PALABRAS RESERVADAS

//DEFINICION DE CONJUNTOS PARA EXPRESIONES REGULARES
nl		    (\r\n|\r|\n)                            //NewLine
ws		    [ \t\r\n]+                              //WhiteSpace
open		{nl}?"<"
close		">"{nl}?
namestart   [A-Za-z\200-\377_]
namechar    [A-Za-z\200-\377_0-9.-]
esc		    "&#"[0-9]+";"|"&#x"[0-9a-fA-F]+";"|"&"[a-z]+";"
name		{namestart}{namechar}*                  //IDENTIFICADOR
data		([^<\n&]|\n[^<&]|\n{esc}|{esc})+        //DATOS DE UNA ETIQUETA
comment		{open}"!--"([^-]|"-"[^-])*"--"{close}   //COMENTARIO
string		"\""[^"\""]*"\""                        //CADENA DEL TIPO: "cadena"
attdef		{open}"?ROOT-ATT"

%s CONTENIDO


%%

//DEFINICION DE TOKENS DE GRAMATICA
{ws}		        %{ /* skip */ %}
"/"		            %{ return 'Slash'; %}
"="		            %{ return 'Igual'; %}
{close}             %{ return 'Close'; %}
{name}		        %{ return 'Name'; %}
{string}	        %{ return 'Value'; %}
"?"{close}	        %{ return 'ENDDEF'; %}
{attdef}		    %{ return 'ATTDEF'; %}
{open}{ws}?{name}	%{ return 'Start'; %}
{open}{ws}?"/"		%{ return 'End'; %}
{comment}		    %{ /*skip*/ %}
{data}		        %{ return 'Data'; %}
"<?"                %{ return 'StartP'; %}


{nl}			    %{/* skip, must be an extra one at EOF */; %}

<<EOF>>             %{  return 'EOF';   %}

.  %{ console.log('Se ha encontrado un error lexico: " ' + yytext + ' "  [linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column+']'); 
        errores.push(new Error('semantico',yytext,yylloc.first_line,yylloc.first_column,'Se ha encontrado un error lexico')); 
    %}



/lex
/*-------------------------------------SINTACTICO----------------------------------*/

//PRESEDECIA DE OPERADORES

/*-------------------------------------PRODUCCIONES----------------------------------*/

%start S
%%

/* PRODUCCION INICIAL->S: 'RAIZ' DE ARBOL */
S
    : ROOT EOF
    {
        console.log("Se inicia el analisis Lexico/Sintactico 'Descendente'");        
        let cst = new Nodo(0,'S',[$1.nodo]);
        cst.setProdu(new FilaGrammar(getGrammar('S')));
        let gramaticaRep = cst.getGrammar();
        //console.log($1.toString());
        console.log('Analisis XML Descendente Finalizado!');        
        errores.forEach(element =>{ console.log(element.toString()); });
        
        return [$1,{"S": cst},gramaticaRep,errores,codificacion];
    }
    | EOF
    {
        console.log('Nothing to show!');
        return {};
    }
;


/* ROOT: RAIZ CON UN OBJETO/ETIQUETA XML */
ROOT
    : ENCODING ELEMENTO 
    {
        aux = new Nodo(setid(),'ROOT',[$1.nodo,$2.nodo]);
        aux.setProdu(new FilaGrammar(getGrammar('ROOT')));

        $$ = $2;
        $$.nodo = aux;
    }
;

ENCODING
    : StartP Name Name Igual Value ENDDEF
    {
        console.log('<?xml encoding='+$5+'?>');
        codificacion = $5.replace(/"/g,'').toLowerCase();
        $$ = {};

        $$.nodo  = new Nodo(setid(),"ENCODING");
        $$.nodo.setProdu(new FilaGrammar(getGrammar('ENCODING1')));

        if((codificacion==='utf-8') 
        | (codificacion==='iso 88591') 
        | (codificacion==='hex')
        | (codificacion==='ascii')){
            $$.nodo.addNodo(new Nodo(setid(),'<?'));
            $$.nodo.addNodo(new Nodo(setid(),'xml'));
            $$.nodo.addNodo(new Nodo(setid(),'encoding'));
            $$.nodo.addNodo(new Nodo(setid(),'='));
            $$.nodo.addNodo(new Nodo(setid(),'Value',[],codificacion));
            $$.nodo.addNodo(new Nodo(setid(),'?>'));
        }else{
            errores.push(new Error('semantico',codificacion,@5.first_line,@5.first_column,'codificacion invalida'));
        }

    }
    | /*empty*/
    {
        $$ = {};
        $$.nodo = new Nodo(setid(),"ENCODING");
        $$.nodo.setProdu(new FilaGrammar(getGrammar('ENCODING2')));
    }
;

/* ELEMENTO: ELEMENTO QUE ESTA ENTRE UNA ETIQUETA-> <tag>ELEMENTO</tag> */
ELEMENTO
    : Start ATRIBUTOS Slash Close
    {

        tgs = setTag($1);
        aux = new Nodo(setid(),'ELEMENTO');
        aux.addNodo(new Nodo(setid(),'<'));
        aux.addNodo(new Nodo(setid(),tgs));
        aux.addNodo($2.nodo);
        aux.addNodo(new Nodo(setid(),'Slash'));
        aux.addNodo(new Nodo(setid(),'>'));
        aux.setProdu(new FilaGrammar(getGrammar('ELEMENTO1')));

        $$ = new ObjetoXML(1,setTag($1),'',$2);
        $$.linea = @1.first_line;
        $$.columna = @1.first_column;
        $$.nodo = aux;
    }
    | Start ATRIBUTOS Close CONTENIDO End Name Close 
    { 
        tgs = setTag($1);
        tgc = setTag($6);
        
        aux = new Nodo(setid(),'ELEMENTO');
        aux.addNodo(new Nodo(setid(),'<'));
        aux.addNodo(new Nodo(setid(),'Name',[],tgs));
        aux.addNodo($2.nodo);
        aux.addNodo(new Nodo(setid(),'>'));
        aux.addNodo($4.nodo);
        aux.addNodo(new Nodo(setid(),'<'));
        aux.addNodo(new Nodo(setid(),'Slash'));
        aux.addNodo(new Nodo(setid(),'Name',[],tgs));
        aux.addNodo(new Nodo(setid(),'>'));
        aux.setProdu(new FilaGrammar(getGrammar('ELEMENTO2')));

        $$ = new ObjetoXML(0,setTag($1),$4.toString(),$2);
        $$.linea = @1.first_line;
        $$.columna = @1.first_column;
        $$.nodo = aux;

        if(tgs != tgc){
            let mensaje = ('las etiquetas de inicio y fin no coindicen!');            
            errores.push(new Error('semantico',tgc,@6.first_line,@6.first_column,mensaje));            
            //return;
        }
    }
    | Start ATRIBUTOS Close ELEMENTOS End Name Close 
    { 
        tgs = setTag($1);
        tgc = setTag($6);

        aux = new Nodo(setid(),'ELEMENTO');
        aux.addNodo(new Nodo(setid(),'<'));
        aux.addNodo(new Nodo(setid(),'Name',[],tgs));
        aux.addNodo($2.nodo);
        aux.addNodo(new Nodo(setid(),'>'));
        if($4!=undefined){
            aux.addNodo($4.nodo);
        }
        aux.addNodo(new Nodo(setid(),'<'));
        aux.addNodo(new Nodo(setid(),'Slash'));
        aux.addNodo(new Nodo(setid(),'Name',[],tgs));
        aux.addNodo(new Nodo(setid(),'>'));
        aux.setProdu(new FilaGrammar(getGrammar('ELEMENTO3')));

        if($4!=undefined){
            $$ = new ObjetoXML(0,setTag($1),'',$2,$4);
        }else{
            $$ = new ObjetoXML(0,setTag($1),'',$2);
        }
        $$.linea = @1.first_line;
        $$.columna = @1.first_column;
        $$.nodo = aux;

        if(tgs != tgc){
            let mensaje = ('las etiquetas de inicio y fin no coindicen!');            
            errores.push(new Error('semantico',tgs,@6.first_line,@6.first_column,mensaje));            
            //return;
        }        
    }
    | error End {  addErr($error,@error,'Se esperaba '); $$ = undefined; }
    | error Close {  addErr($error,@error,'Se esperaba '); $$ = undefined; }
    | error Start {  addErr($error,@error,'Se esperaba '); $$ = undefined; }
;

/* ATRIBUTOS: LISTA CON ATRIBUTOS DE UN OBJETO/ETIQUETA XML */
ATRIBUTOS
    : LISTA_ATRIBUTOS
    {
        aux = new Nodo(setid(),'ATRIBUTOS');
        aux.addNodo($1.nodo);
        aux.setProdu(new FilaGrammar(getGrammar('ATRIBUTOS1')));

        $$ = $1;
        $$.nodo = aux;
    }
    | /*empty*/
    {
        $$ = [];
        $$.nodo = new Nodo(setid(),"ATRIBUTOS");
        $$.nodo.addNodo(new Nodo(setid(),'Epsilon'));
        $$.nodo.setProdu(new FilaGrammar(getGrammar('ATRIBUTOS2')));
    }
;

LISTA_ATRIBUTOS
    : ATRIBUTO LISTA_ATRIBUTOS_P
    {
        aux = new Nodo(setid(),'LISTA_ATRIBUTOS');
        aux.setProdu(new FilaGrammar(getGrammar('LISTA_ATRIBUTOS')));        
        aux.addNodo($2.nodo);

        if($1!=undefined){
            aux.addNodo($1.nodo);
            $$ = [$1];
        }else{
            $$ = [];
        }
        
        $$ = $$.concat($2);
        $$.nodo = aux;
    }
;

LISTA_ATRIBUTOS_P
    : ATRIBUTO LISTA_ATRIBUTOS_P
    {
        aux = new Nodo(setid(),'LISTA_ATRIBUTOS_P');
        aux.setProdu(new FilaGrammar(getGrammar('LISTA_ATRIBUTOS_P1')));
        aux.addNodo($2.nodo);
        if($1!=undefined){
            aux.addNodo($1.nodo);
            $$ = [$1];
        }else{
            $$ = [];
        }        
        
        $$ = $$.concat($2);
        $$.nodo = aux;
    }
    | /*emtpy*/
    {
        aux = new Nodo(setid(),'LISTA_ATRIBUTOS_P');
        aux.addNodo(new Nodo(setid(),'Epsilon'));
        aux.setProdu(new FilaGrammar(getGrammar('LISTA_ATRIBUTOS_P2')));

        $$ = [];
        $$.nodo = aux;
    }
;

/* ATRIBUTO: DEFINICION DE ATRIBUTO PARA UN OBJETO/ETIQUETA */
ATRIBUTO
    : Name Igual Value
    {
        $$ = new AtributoXML($1,$3,@1.first_line,@1.first_column);
        $$.nodo = new Nodo(setid(),'ATRIBUTO');
        $$.nodo.addNodo(new Nodo(setid(),'Name',[],$1));
        $$.nodo.addNodo(new Nodo(setid(),'='));
        $$.nodo.addNodo(new Nodo(setid(),'Value',[],$3));
        $$.nodo.setProdu(new FilaGrammar(getGrammar('ATRIBUTO')));
    }
    | error Value
    {
        addErr($error,@error,'Se esperaba "="');
        $$ = undefined;
        //console.log('errinfo: ', {loc: @error,val: $error,});
    }
;

/* ELEMENTOS: LISTA DE OBJETOS/ETIQUETAS XML PERTENECIENTES A UNA ETIQUETA PADRE */
ELEMENTOS
    : ELEMENTO ELEMENTOS_P
    {
        aux = new Nodo(setid(),'ELEMENTOS');
        aux.setProdu(new FilaGrammar(getGrammar('ELEMENTOS')));        
        aux.addNodo($2.nodo);

        if($1!=undefined){
            aux.addNodo($1.nodo);
            $$ = [$1];
        }else{
            $$ = [];
        }

        
        $$ = $$.concat($2);
        $$.nodo = aux;
    }
;

ELEMENTOS_P
    : ELEMENTO ELEMENTOS_P
    {
        aux = new Nodo(setid(),'ELEMENTOS_P');
        aux.setProdu(new FilaGrammar(getGrammar('ELEMENTOS_P1')));        
        aux.addNodo($2.nodo);

        if($1!=undefined){
            aux.addNodo($1.nodo);
            $$ = [$1];
        }else{
            $$ = [];
        }
        
        $$ = $$.concat($2);
        $$.nodo = aux;
    }
    | /*empty*/
    {
        aux = new Nodo(setid(),'ELEMENTOS_P');
        aux.addNodo(new Nodo(setid(),'Epsilon'));
        aux.setProdu(new FilaGrammar(getGrammar('ELEMENTOS_P2')));

        $$ = [];
        $$.nodo = aux;
    }
;

/* CONTENIDO: CONTENIDO DEL OBJETO/ETIQUETA XML */
CONTENIDO
    : LISTA_DATOS
    {
        aux = new Nodo(setid(),'CONTENIDO');
        aux.addNodo($1.nodo);
        aux.setProdu(new FilaGrammar(getGrammar('CONTENIDO1')));

        $$ = new String($1);
        $$.nodo = aux;
    }
    | /*empty*/
    {
        aux = new Nodo(setid(),'CONTENIDO');
        aux.addNodo(new Nodo(setid(),'Epsilon'));
        aux.setProdu(new FilaGrammar(getGrammar('CONTENIDO2')));

        $$ = [];
        $$.nodo = aux;
    }
;

/* LISTA_DATOS: UNA CADENA CON VARIOS DATOS CONCATENADOS */
LISTA_DATOS
    : DATOS LISTA_DATOS_P
    {
        aux = new Nodo(setid(),'LISTA_DATOS');
        aux.addNodo($1.nodo);
        aux.addNodo($2.nodo);
        aux.setProdu(new FilaGrammar(getGrammar('LISTA_DATOS')));

        $$ = $1;
        $$ = new String($$ + $2);
        $$.nodo = aux;
    }
;

LISTA_DATOS_P
    : DATOS LISTA_DATOS_P
    {
        aux = new Nodo(setid(),'LISTA_DATOS_P');
        aux.addNodo($1.nodo);
        aux.addNodo($2.nodo);
        aux.setProdu(new FilaGrammar(getGrammar('LISTA_DATOS_P1')));

        //$$ = $1;
        $$ = new String($1.toString() + $2.toString());
        $$.nodo = aux;
    }
    | /* empty */
    {
        aux = new Nodo(setid(),'LISTA_DATOS_P');
        aux.addNodo(new Nodo(setid(),'Epsilon'));
        aux.setProdu(new FilaGrammar(getGrammar('LISTA_DATOS_P2')));

        $$ = [];
        $$.nodo = aux;
    }
;

/* DATOS: POSIBLES DATOS QUE PUEDEN VENIR COMO CONTENIDO DE UNA ETIQUETA */
DATOS
    : Data
    {
        aux = new Nodo(setid(),'DATOS');
        aux.addNodo(new Nodo(setid(),'Data',[],$1));
        aux.setProdu(new FilaGrammar(getGrammar('DATOS1')));

        $$ = new String($1);
        $$.nodo = aux;
    }
    | Name
    {
        aux = new Nodo(setid(),'DATOS');
        aux.addNodo(new Nodo(setid(),'Name',[],$1));
        aux.setProdu(new FilaGrammar(getGrammar('DATOS2')));

        $$ = new String(' ' + $1);
        $$.nodo = aux;
    }
;


%% 
