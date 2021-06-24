%{      
        const { EtiquetaDoble } = require('../Xml/EtiquetaDoble')
        const { EtiquetaSimple } = require('../Xml/EtiquetaSimple')
        const { EtiquetaInicio } = require('../Xml/EtiquetaInicio')
        const { Atributo } = require('../Xml/Atributo')
        const { XmlResultado } = require('../Xml/XmlResultado')

        let idSent = 1;

        function getId() {
                idSent += 100
                return idSent
        }

        function formatTagName(AbreTagApertura) {
                return AbreTagApertura.substring(1, AbreTagApertura.length)
        }

%}

//_______________________________

%lex
%options case-insensitive
%x Comentario
%x TagApertura
%x TagCierre
%%                

//Comentario
"<!--"                  {this.begin("Comentario"); }
<Comentario>[\r\t]+     {}
<Comentario>\n          {}
<Comentario>"-->"       {this.popState(); }
<Comentario>[^"-->"]+   {}

//TagConfiguracion
"<?xml"                                 { this.begin("TagApertura"); return 'AbreTagConf'; }
<TagApertura>[\s\r\t\n]+                {}
<TagApertura>[a-zA-Z_][a-zA-Z0-9_]*     { return 'NombreAtributo'; }
<TagApertura>"="                        { return 'IgualAtributo' }
<TagApertura>\"[^\"\n]*\"               { return 'ValorAtributo'; }
<TagApertura>"?>"                       { this.popState(); return 'CierreTagConf'; }

//TagApertura
"<"[a-zA-Z_][a-zA-Z0-9_]*               { this.begin("TagApertura"); return 'AbreTagApertura'; }
<TagApertura>[\s\r\t\n]+                {}
<TagApertura>[a-zA-Z_][a-zA-Z0-9_]*     { return 'NombreAtributo'; }
<TagApertura>"="                        { return 'IgualAtributo' }
<TagApertura>\"[^\"\n]*\"               { return 'ValorAtributo'; }
<TagApertura>">"                        { this.popState(); return 'CierreTagApertura'; }
<TagApertura>"/>"                       { this.popState();  return 'CierreTagUnico'; }

//TagCierre
"</"[a-zA-Z_][a-zA-Z0-9_]*        { this.begin("TagCierre"); return 'AbreTagCierre' }
<TagCierre>">"                    { this.popState(); return 'CierreTagCierre' }

[\s\r\t\n]+           {}
[^<]+                 { return 'CadenaValores'; }
<<EOF>>               { return 'EOF'; }
.                     { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

//_______________________________

%start XML
%%

XML: 
        TAG_CONFIGURACION LISTA_ETIQUETAS EOF   { $$ = new XmlResultado($1, $2); return $$ }
        |LISTA_ETIQUETAS EOF                    { $$ = new XmlResultado(null, $2); return $$ }
;

LISTA_ETIQUETAS:    ETIQUETA ListaEtiqueta {
    s= eval('$$');
    $2.push($1);
    
    $$=$2 ;

console.log("suuuu");


}
;

ListaEtiqueta : ETIQUETA ListaEtiqueta  {
  
 $2.push($1);
    
    $$=$2 ;
   
   console.log("suuuu2");
    }
| { $$ = [];   }
;
//<  //asdasdasdasd/**/asdasdas
ETIQUETA: 
        TAG_APERTURA MenuEtiqueta { $$ = new EtiquetaDoble($1.nombreTagApertura, $2.nombreTagCierre, $1.listaAtributos, $2.cadena, $2.listaEtiqueta, @1.first_line, @1.first_column, getId()) }
        |TAG_UNICO                              { $$ = $1 }
;
MenuEtiqueta:
        LISTA_ETIQUETAS TAG_CIERRE

        { $$ = {
                nombreTagCierre: formatTagName($2),
                listaEtiqueta: $1,
                cadena:''
        }}
        | CadenaValores TAG_CIERRE
             { $$ = {
                nombreTagCierre: formatTagName($2),
                listaEtiqueta: [],
                cadena:$1
        }}
        
       
       
        | TAG_CIERRE         
        
        
        
             { $$ = {
                nombreTagCierre: formatTagName($1),
                listaEtiqueta: [],
                cadena:''
                
        }}



;



TAG_APERTURA: 
        AbreTagApertura MENU_TAG_APERTURA { $$ = {
                nombreTagApertura: formatTagName($1),
                listaAtributos: $2.listaAtributos_
        }}

;

MENU_TAG_APERTURA: LISTA_ATRIBUTOS CierreTagApertura 
         { $$ = {
                
                listaAtributos_: $1
        }}



        | CierreTagApertura { $$ = {
              
                listaAtributos_: []
        }}
;









TAG_CIERRE:
        AbreTagCierre CierreTagCierre { $$ = formatTagName(formatTagName($1)) }
;

TAG_UNICO:
        AbreTagApertura MENU_TAG_UNICO  { $$ = new EtiquetaSimple(formatTagName($1), $2.listaAtributos_unico, @1.first_line, @1.first_column, getId()) }
      
;


MENU_TAG_UNICO:


 LISTA_ATRIBUTOS CierreTagUnico


  { $$ = {
                
                listaAtributos_unico: $1
        }}




 | CierreTagUnico
  { $$ = {
                
                listaAtributos_unico: []
        }}



;

TAG_CONFIGURACION:
        AbreTagConf LISTA_ATRIBUTOS CierreTagConf   { $$ = new EtiquetaInicio($2, @1.first_line, @1.first_column, getId()); }
;

LISTA_ATRIBUTOS: ATRIBUTO ListaA  {
    
     $2.push($1);  $$=$2;}

; 
ListaA: ATRIBUTO ListaA { $2.push($1);  $$=$2;}
|{ $$ = [ ];   }



;


ATRIBUTO:
        NombreAtributo IgualAtributo ValorAtributo    { $$ = new Atributo($1, $3, @1.first_line, @1.first_column, getId()) }
;