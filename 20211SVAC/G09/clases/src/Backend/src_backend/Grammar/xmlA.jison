        %{      
                const { EtiquetaDoble } = require('../Xml/EtiquetaDoble')
                const { EtiquetaSimple } = require('../Xml/EtiquetaSimple')
                const { EtiquetaInicio } = require('../Xml/EtiquetaInicio')
                const { Atributo } = require('../Xml/Atributo')
                const { XmlResultado } = require('../Xml/XmlResultado')
                const { ControlError } = require('../Xpath/ControlError')
                listaError = []
                let idSent = 1;

                function getId() {
                        idSent += 100
                        return idSent
                }

                function formatTagName(AbreTagApertura) {
                        return AbreTagApertura.substring(1, AbreTagApertura.length)
                }

        %}

        //___________

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
        .       {listaError.push(new ControlError(yytext, TipoSeleccion.ERROR_LEXICO, yylloc.first_line,yylloc.first_column,"XmlAscendente"))}
        /lex

        //___________

        %start XML
        %%

        XML: 
                TAG_CONFIGURACION LISTA_ETIQUETAS EOF   { $$ = new XmlResultado($1, $2); return {resXml:$$, erroresxml:listaError} }
                |LISTA_ETIQUETAS EOF                    { $$ = new XmlResultado(null, $2); return $$ }
        ;

        LISTA_ETIQUETAS:        
                LISTA_ETIQUETAS ETIQUETA        { $1.push($2); $$=$1; }
                |ETIQUETA                       { $$ = [$1]; }
        ;

        ETIQUETA: 
                TAG_APERTURA LISTA_ETIQUETAS TAG_CIERRE { $$ = new EtiquetaDoble($1.nombreTagApertura, $3, $1.listaAtributos, '', $2, @1.first_line, @1.first_column, getId()) }
                |TAG_APERTURA CadenaValores TAG_CIERRE  { $$ = new EtiquetaDoble($1.nombreTagApertura, $3, $1.listaAtributos, $2, [], @1.first_line, @1.first_column, getId()) }
                |TAG_APERTURA TAG_CIERRE                { $$ = new EtiquetaDoble($1.nombreTagApertura, $2, $1.listaAtributos, '', [], @1.first_line, @1.first_column, getId()) }
                |TAG_UNICO                              { $$ = $1 }
                |  error  TAG_CIERRE                       { $$ = listaError.push(new ControlError(yytext, TipoSeleccion.ERROR_SINTACTICO, this.$.first_line, this.$.first_column,"XmlAscendente"))}
        ;

        TAG_APERTURA: 
                AbreTagApertura LISTA_ATRIBUTOS CierreTagApertura { $$ = {
                        nombreTagApertura: formatTagName($1),
                        listaAtributos: $2
                }}

                |AbreTagApertura CierreTagApertura { $$ = {
                        nombreTagApertura: formatTagName($1),
                        listaAtributos: []
                }}
        ;

        TAG_CIERRE:
                AbreTagCierre CierreTagCierre { $$ = formatTagName(formatTagName($1)) }
        ;

        TAG_UNICO:
                AbreTagApertura LISTA_ATRIBUTOS CierreTagUnico  { $$ = new EtiquetaSimple(formatTagName($1), $2, @1.first_line, @1.first_column, getId()) }
                |AbreTagApertura CierreTagUnico { $$ = new EtiquetaSimple(formatTagName($1), [], @1.first_line, @1.first_column, getId()) }               
        ;

        TAG_CONFIGURACION:
                AbreTagConf LISTA_ATRIBUTOS CierreTagConf   { $$ = new  ($2, @1.first_line, @1.first_column, getId()); }
        ;

        LISTA_ATRIBUTOS:
                LISTA_ATRIBUTOS ATRIBUTO        { $1.push($2); $$=$1; }
                |ATRIBUTO                       { $$ = [$1]; }
        ;

        ATRIBUTO:
                NombreAtributo IgualAtributo ValorAtributo    { $$ = new Atributo($1, $3, @1.first_line, @1.first_column, getId()) }
        ;