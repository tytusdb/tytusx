%{      
        const { EtiquetaDoble } = require('../Xml/EtiquetaDoble')
        const { EtiquetaSimple } = require('../Xml/EtiquetaSimple')
        const { EtiquetaInicio } = require('../Xml/EtiquetaInicio')
        const { Atributo } = require('../Xml/Atributo')
        const { XmlResultado } = require('../Xml/XmlResultado')
        const { ControlError } = require('../Xpath/ControlError')
            const {ReporteGramatica }= require('../Reportes/ReporteGramatica')
        let idSent = 1;

        function getId() {
                idSent += 100
                return idSent
        }

        function formatTagName(AbreTagApertura) {
                return AbreTagApertura.substring(1, AbreTagApertura.length)
        }
        listaError = []

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
.                     { new ControlError(yytext, TipoSeleccion.ERROR_LEXICO, yylloc.first_line,yylloc.first_column,"XmlDescendente")};
/lex

//_______________________________

%start XML
%%

XML: 
        TAG_CONFIGURACION LISTA_ETIQUETAS EOF   { $$ = new XmlResultado($1, $2); return $$;
        
         new ReporteGramatica("XML -> TAG_CONFIGURACION LISTA_ETIQUETAS EOF",  "XML.val = TAG_CONFIGURACION.val+LISTA_ETIQUETAS.val"      )
        
         }
        |LISTA_ETIQUETAS EOF                    { $$ = new XmlResultado(null, $2); return $$ ;
         new ReporteGramatica("XML -> N LISTA_ETIQUETAS EOF",  "XML.val = LISTA_ETIQUETAS.val"      )
        
        
        }
;

LISTA_ETIQUETAS:    ETIQUETA ListaEtiqueta {

   $2.push($1);
    $$=$2 ;

       new ReporteGramatica("LISTA_ETIQUETAS -> ETIQUETA ListaEtiqueta ",  "LISTA_ETIQUETAS.val=ListaEtiqueta.val--- ListaEtiqueta = new Array(ETIQUETA)     ////    ListaEtiqueta.push(ETIQUETA.val)"      ) 
  

 
}
;

ListaEtiqueta : ETIQUETA ListaEtiqueta  {
  
   $2.push($1);
    
    $$=$2 ;
    new ReporteGramatica("ListaEtiqueta -> ETIQUETA ListaEtiqueta ",  "    ListaEtiqueta.push(ETIQUETA.val)"      ) 
  


  
    }
| { $$ = []; 
 new ReporteGramatica("ListaEtiqueta -> epsilon ",  "  ListaEtiqueta.val = []"      ) 
 

  }
;
ETIQUETA: 
        TAG_APERTURA MenuEtiqueta { $$ = new EtiquetaDoble($1.nombreTagApertura, $2.nombreTagCierre, 
        $1.listaAtributos, $2.cadena, $2.listaEtiqueta, @1.first_line, @1.first_column, getId()) ;
         new ReporteGramatica("ETIQUETA -> TAG_APERTURA MenuEtiqueta ",
           " ETIQUTA.val= new EtiquetaDoble(TAG_APERTURA.val, MenuEtiqueta.val)"      ) ;
 
        
        }
        |TAG_UNICO                              { $$ = $1;
        
             new ReporteGramatica("ETIQUETA -> TAG_UNICO    ",
           " ETIQUTA.val= TAG_UNICO.val"      ) ;
 
         }
        
        
        | error  AbreTagApertura                     { $$ = new ControlError(yytext, TipoSeleccion.ERROR_SINTACTICO, this._$.first_line, this._$.first_column,"XmlDEscendiente")}

;
DELIMITADOR: AbreTagApertura {$$=$1;} 
| CierreTagApertura { $$=$1} 

; 
MenuEtiqueta:
        LISTA_ETIQUETAS TAG_CIERRE

        { 
                
                        
         
        
                
                $$ = {
                nombreTagCierre:$2,
                listaEtiqueta: $1,
                cadena:''

       
        };

             new ReporteGramatica("MenuEtiqueta -> LISTA_ETIQUETAS TAG_CIERRE    ",
           " MenuEtiqueta.val= LISTA_ETIQUETAS.val +TAG_CIERRE.val"      ) ;

              
        
        
        
        }
        | CadenaValores TAG_CIERRE




             {        
                     
                     $$ = {
                nombreTagCierre: $2,
                listaEtiqueta: [],
                cadena:$1
        };
        
         new ReporteGramatica("MenuEtiqueta ->  CadenaValores TAG_CIERRE  ",
           " MenuEtiqueta.val= CadenaValores.lexval +TAG_CIERRE.val"      ) ;
              
        }
        | TAG_CIERRE         
             { 
                    

               
                     $$ = {
                nombreTagCierre: $1,
                listaEtiqueta: [],
                cadena:''
                
        };
        
                new ReporteGramatica("MenuEtiqueta ->   TAG_CIERRE  ",
           " MenuEtiqueta.val=TAG_CIERRE.val"      ) ;
             
        }

;


TAG_APERTURA: 
        AbreTagApertura MENU_TAG_APERTURA {
                
                

        
                
                 $$ = {
                nombreTagApertura: formatTagName($1),
                listaAtributos: $2.listaAtributos_
        };
        
        
             new ReporteGramatica("TAG_APERTURA ->   AbreTagApertura MENU_TAG_APERTURA ",
           " TAG_APERTURA.val=  AbreTagApertura.lexval+ MENU_TAG_APERTURA.val"      ) ;
                
        }

        

;

MENU_TAG_APERTURA: LISTA_ATRIBUTOS CierreTagApertura 
         {
                 
       
                 
                  $$ = {
                
                listaAtributos_: $1
        };
                    new ReporteGramatica("MENU_TAG_APERTURA: ->   LISTA_ATRIBUTOS CierreTagApertura ",
           " MENU_TAG_APERTURA.val=  LISTA_ATRIBUTOS.val+ CierreTagApertura.lexval"      ) ;
           
        
        }



        | CierreTagApertura { 
                
 
                
                $$ = {
              
                listaAtributos_: []
        };
        
                             new ReporteGramatica("MENU_TAG_APERTURA: ->    CierreTagApertura ",
           " MENU_TAG_APERTURA.val=   CierreTagApertura.lexval"      ) ;
           
                
        }
;








TAG_CIERRE:
        AbreTagCierre CierreTagCierre { $$ = formatTagName(formatTagName($1));
        
        new ReporteGramatica("TAG_CIERRE ->AbreTagApertura CierreTagApertura ",  "TAG_CIERRE.val =AbreTagApertura.lexval  + CierreTagApertura.lexval "  );
                
        
        
        
        
        
         }
;

TAG_UNICO:
        AbreTagApertura MENU_TAG_UNICO  { 
                
           
                $$ = new EtiquetaSimple(formatTagName($1), $2.listaAtributos_unico, @1.first_line, @1.first_column, getId()) ;
                
                
                
                                    new ReporteGramatica("TAG_UNICO: ->    AbreTagApertura MENU_TAG_UNICO",
           " TAG_UNICO.val=   AbreTagApertura.lexval+ MENU_TAG_UNICO.val"      ) ;
           
           
                
                }
      
;


MENU_TAG_UNICO:


 LISTA_ATRIBUTOS CierreTagUnico


  {
          
                         
  
          
           $$ = {
                
                listaAtributos_unico: $1
        };
                                  new ReporteGramatica("MENU_TAG_UNICO: ->    LISTA_ATRIBUTOS CierreTagUnico",
           " MENU_TAG_UNICO.val=   LISTA_ATRIBUTOS.val +CierreTagUnico.lexval"      ) ;
           
              
        
        }




 | CierreTagUnico
  {
          
           $$ = {
                
                listaAtributos_unico: []
        };
        
                          
                          new ReporteGramatica("MENU_TAG_UNICO: ->    CierreTagUnico",
           " MENU_TAG_UNICO.val=   CierreTagUnico.lexval"      ) ;
     
        }



;

TAG_CONFIGURACION:
        AbreTagConf LISTA_ATRIBUTOS CierreTagConf   { 
                
                
          
                
                
                
                $$ = new EtiquetaInicio($2, @1.first_line, @1.first_column, getId());
                
                
                            
                          new ReporteGramatica("TAG_CONFIGURACION: ->    AbreTagConf LISTA_ATRIBUTOS CierreTagConf ",
           " TAG_CONFIGURACION.val=     AbreTagConf.lexval LISTA_ATRIBUTOS.val CierreTagConf.lexval "      ) ;
             
                
                 }
;

LISTA_ATRIBUTOS: ATRIBUTO ListaA  {
    
     $2.push($1);  $$=$2;
     
          new ReporteGramatica("LISTA_ATRIBUTOS -> ATRIBUTO ListaA ",  "LISTA_ATRIBUTOS.val=ListaA.val--- ListaA = new Array(ATRIBUTO)     ////    ListaA.push(ATRIBUTO.val)"      ) ;
  
     
     }

; 
ListaA: ATRIBUTO ListaA {
        
      
        
         $2.push($1);  $$=$2;
              new ReporteGramatica("ListaA -> ATRIBUTO ListaA ",  "    ListaA.push(ATRIBUTO.val)"      ) ;
 
         
         }
|{
     
        
         $$ = [ ];  

             new ReporteGramatica("ListaA -> epsilon ",  "  ListaA.val = []"      ) ;
 

 }

;


ATRIBUTO:
        NombreAtributo IgualAtributo ValorAtributo    {
       
                
                
                 $$ = new Atributo($1, $3, @1.first_line, @1.first_column, getId()) ;
                 
                  new ReporteGramatica("ATRIBUTO -> NombreAtributo IgualAtributo ValorAtributo  ",  "ATRIBUTO.val=new Atributo (NombreAtributo.lexval,IgualAtributo.lexval,ValorAtributo.lexval)"      ) ;
                   
         }



;