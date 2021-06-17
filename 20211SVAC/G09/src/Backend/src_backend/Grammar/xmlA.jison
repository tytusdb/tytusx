%{      
        const { EtiquetaDoble } = require('../Xml/EtiquetaDoble')
        const { EtiquetaSimple } = require('../Xml/EtiquetaSimple')
        const { EtiquetaInicio } = require('../Xml/EtiquetaInicio')
        const { Atributo } = require('../Xml/Atributo')
        const { XmlResultado } = require('../Xml/XmlResultado')
            const { ControlError } = require('../Xpath/ControlError')
                    const { TipoSeleccion } = require('../Xpath/TipoSeleccion')

                    const {ReporteGramatica }= require('../Reportes/ReporteGramatica')

        let idSent = 1;

        function getId() {
                idSent += 100
                return idSent
        }

        function formatTagName(AbreTagApertura) {
                return AbreTagApertura.substring(1, AbreTagApertura.length)
        }

%}

//_____________________________________________________________________________________________

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
.                     { $$ = listaError.push(new ControlError(yytext, TipoSeleccion.ERROR_SINTACTICO, this._$.first_line, this._$.first_column,"XPathAscendente"))};
/lex

//_____________________________________________________________________________________________

%start XML
%%

XML: 
        TAG_CONFIGURACION LISTA_ETIQUETAS EOF   { $$ = new XmlResultado($1, $2); return $$
        
         new ReporteGramatica("XML -> TAG_CONFIGURACION LISTA_ETIQUETAS EOF",  "XML.val = TAG_CONFIGURACION.val+LISTA_ETIQUETAS.val"      )
        
         }
        |LISTA_ETIQUETAS EOF                    { $$ = new XmlResultado(null, $2); return $$ 
         new ReporteGramatica("XML -> N LISTA_ETIQUETAS EOF",  "XML.val = LISTA_ETIQUETAS.val"      )
        
        
        }
;

LISTA_ETIQUETAS:        
        LISTA_ETIQUETAS ETIQUETA        { $1.push($2); $$=$1;  
        
        
         new ReporteGramatica("LISTA_ETIQUETAS -> LISTA_ETIQUETAS  ETIQUETA ", " LISTA_ETIQUETAS = new Array (Etiquetas)              ----    LISTA_ETIQUETAS.push(ETIQUETA.val)"      ) }
        |ETIQUETA                       { $$ = [$1];
        
        
         new ReporteGramatica("LISTA_ETIQUETAS ->  ETIQUETA ",  "LISTA_ETIQUETAS.val =[ETIQUETA.val["      ) }
;

ETIQUETA: 
        TAG_APERTURA LISTA_ETIQUETAS TAG_CIERRE 
        { $$ = new EtiquetaDoble($1.nombreTagApertura, $3, $1.listaAtributos, '', $2, @1.first_line, @1.first_column, getId()) 
           new ReporteGramatica("ETIQUETA -> TAG_APERTURA LISTA_ETIQUETAS TAG_CIERRE ",  "ETIQUETA.val = new ETITQUETA_DOBLE (TAG_APERTURA.val,LISTA_ETIQUETAS.val,TAG_CIERRE.val)"      )}
      
        
        }
        |TAG_APERTURA CadenaValores TAG_CIERRE  { $$ = new EtiquetaDoble($1.nombreTagApertura, $3, $1.listaAtributos, $2, [], @1.first_line, @1.first_column, getId()) 
                new ReporteGramatica("ETIQUETA -> TAG_APERTURA CadenaValores TAG_CIERRE ",  "ETIQUETA.val = new ETITQUETA_DOBLE (TAG_APERTURA.val,CadenaValores.lexval,TAG_CIERRE.val)"      )}
      
       
       
       
        |TAG_APERTURA TAG_CIERRE                { $$ = new EtiquetaDoble($1.nombreTagApertura, $2, $1.listaAtributos, '', [], @1.first_line, @1.first_column, getId()) 
        
        
        
        
               new ReporteGramatica("ETIQUETA -> TAG_APERTURA  TAG_CIERRE ",  "ETIQUETA.val = new ETITQUETA_DOBLE (TAG_APERTURA.val,[],TAG_CIERRE.val)"  )}
  
    
    
    
    
        |TAG_UNICO                              { $$ = $1   

     new ReporteGramatica("ETIQUETA -> TAG_UNICO ",  "ETIQUETA.val =TAG_UNICO.val"  )   }
   


        | error AbreTagApertura                  { $$ = listaError.push(new ControlError(yytext, TipoSeleccion.ERROR_SINTACTICO, this._$.first_line, this._$.first_column,"XPathAscendente"))}
;


DELIMITADOR: AbreTagApertura {$$=$1;} 
| CierreTagApertura { $$=$1} 
;

TAG_APERTURA: 
        AbreTagApertura LISTA_ATRIBUTOS CierreTagApertura {
                
                
                  new ReporteGramatica("TAG_APERTURA -> AbreTagApertura LISTA_ATRIBUTOS CierreTagApertura ",  
        "TAG_APERTURA.val =AbreTagApertura.lexval + LISTA_ATRIBUTOS.val + CierreTagApertura.lexval   ")
                
                
                
                 $$ = {
                nombreTagApertura: formatTagName($1),
                listaAtributos: $2
     
     
     
     
        }}

        |AbreTagApertura CierreTagApertura { 
                
                new ReporteGramatica("TAG_APERTURA ->AbreTagApertura CierreTagApertura ",  "TAG_APERTURA.val =AbreTagApertura.lexval  + CierreTagApertura.lexval "  )
                
                
                
                $$ = {
                nombreTagApertura: formatTagName($1),
                listaAtributos: []
        }}
;

TAG_CIERRE:
        AbreTagCierre CierreTagCierre { $$ = formatTagName(formatTagName($1))
        
        new ReporteGramatica("TAG_CIERRE ->AbreTagApertura CierreTagApertura ",  "TAG_CIERRE.val =AbreTagApertura.lexval  + CierreTagApertura.lexval "  )
                
        
        
        
        
        
         }
;

TAG_UNICO:
        AbreTagApertura LISTA_ATRIBUTOS CierreTagUnico  { $$ = new EtiquetaSimple(formatTagName($1), $2, @1.first_line, @1.first_column, getId())
        
        
        new ReporteGramatica("TAG_UNICO -> AbreTagApertura LISTA_ATRIBUTOS CierreTagUnico ",  "TAG_UNICO.val =new EtiquetaSimple(AbreTagApertura.lexval,LISTA_ATRIBUTOS.val  , CierreTagApertura.lexval) "  )
                
        
        
        
        
        
         }
        |AbreTagApertura CierreTagUnico { $$ = new EtiquetaSimple(formatTagName($1), [], @1.first_line, @1.first_column, getId())
        
        
              new ReporteGramatica("TAG_UNICO ->AbreTagApertura CierreTagApertura ",   "TAG_UNICO.val =new EtiquetaSimple(AbreTagApertura.lexval,[ ]  , CierreTagApertura.lexval) ")
                
        
        }               
;

TAG_CONFIGURACION:
        AbreTagConf LISTA_ATRIBUTOS CierreTagConf   { $$ = new EtiquetaInicio($2, @1.first_line, @1.first_column, getId()); 
        
        
              new ReporteGramatica("TAG_CONFIGURACION ->AbreTagConf LISTA_ATRIBUTOS CierreTagConf",   "TAG_CONFIGURACION.val =new EtiquetaInicio(AbreTagConf.lexval,LISTA_ATRIBUTOS.val  , CierreTagConf.lexval) "  )
                
        
        }
;

LISTA_ATRIBUTOS:
        LISTA_ATRIBUTOS ATRIBUTO        { $1.push($2); $$=$1; 
         new ReporteGramatica("LISTA_ATRIBUTOS -> LISTA_ATRIBUTOS  ATRIBUTO ", " LISTA_ATRIBUTO= new Array () ----- LISTA_ATRIBUTO.push(ATRIBUTO.val)"      ) 
        
        }
        |ATRIBUTO                       { $$ = [$1]; new ReporteGramatica("LISTA_ATRIBUTO -> ATRIBUTO ",  "LISTA_ATRIBUTO.=[ATRIBUTO.val]"      ) }
;

ATRIBUTO:
        NombreAtributo IgualAtributo ValorAtributo    {
 new ReporteGramatica("ATRIBUTO -> NombreAtributo IgualAtributo ValorAtributo  ",  "ATRIBUTO.val=new Atributo (NombreAtributo.lexval,IgualAtributo.lexval,ValorAtributo.lexval)"      ) 
                   
                
                
                
                 $$ = new Atributo($1, $3, @1.first_line, @1.first_column, getId()) }
;