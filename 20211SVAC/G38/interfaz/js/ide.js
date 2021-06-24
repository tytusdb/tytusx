
const CONSOLE_LINE_MARK = '>';
const CONSOLE_MESSAGE_SUCCESSFULL="OK XML";
const CONSOLE_MESSAGE_SUCCESSFULL_XPATH="OK XPATH";
const CONSOLE_MESSAGE_SUCCESSFULL_XQUERY="OK XQUERY";
const ENTER = "\n";


var _backEnd;
var _graphicUtil;
var _txtConsola;

var _rootXml;
var _tsXml;

var _rootXpath;

/**
 * Metodo que analiza el xml
 * @param entrada
 */
const analizarXML= function (cadEntrada){
    try {
        print("Iniciando ejecucion: "+new Date());
        ReporteGramatical.InicializarReporteGramaticalXML();
        try {
            ListaErrores.InicializarXML();
            if(cadEntrada!=null){
                cadEntrada = cadEntrada.replace(/\<\?xml.+\?\>|\<\!DOCTYPE.+]\>/g, ' ');
            }
            let rootXml = xmlAnalyzer.parse(cadEntrada);
            if(rootXml){
                console.info('Se genero correctamente el árbol. ');
            }else{
                throw "No se pudo generar correctamente el árbol. ";
            }
            if(ListaErrores.hayErroresXml()){
                //print("Hubieron errores durante el analisis")
            }
            _rootXml = rootXml;
        }catch (e){
            throw ('Error al generar el AST. '+e);
        }

        try {
            _tsXml = new TablaSimbolos(_rootXml) ;
        }catch (e) {
            throw ('No se pudo generar correctamente la Tabla de Simbolos. ');
        }

        console.info('Se cargo exitosamente las tabla de simbolos. ');
        print(CONSOLE_MESSAGE_SUCCESSFULL);
    }catch (e){
        print(e);
        console.log(e);
    }
};


/**
 * Metodo genera el aST ascendente
 * @param entrada
 */
const generarAstAscennteXml= function (cadEntrada){
    try {
        print("Iniciando generacion de AST: "+new Date());
        XpathUtil.contador_nodo = 1;
        try {
            if(cadEntrada!=null){
                cadEntrada = cadEntrada.replace(/\<\?xml.+\?\>|\<\!DOCTYPE.+]\>/g, ' ');
            }
            let rootXml = xmlAnalyzer.parse(cadEntrada);
            if(rootXml){
                console.info('Se genero correctamente el árbol. ');
            }else{
                throw "No se pudo generar correctamente el árbol. ";
            }
            _rootXml = rootXml;

        }catch (e){
            throw ('Error al generar el AST. '+e);
        }

        let catDot = "";
        try {
            _tsXml = new TablaSimbolos(_rootXml) ;
            catDot = _tsXml.getStrAst();
        }catch (e) {
            throw ('No se pudo generar AST. ');
        }


        console.info('Se genero correctamente el árbol. ');
        let pagina = "https://dreampuf.github.io/GraphvizOnline/#"+catDot;
        let url=encodeURI(pagina);
        window.open(url);

        console.info('Se genero exitosamente el AST. ');
        print(CONSOLE_MESSAGE_SUCCESSFULL);
    }catch (e){
        print(e);
        console.log(e);
    }
};


/**
 * Genera CstXmlAscendente
 * @param entrada
 */
const generarCstXMLAscendnete= function (cadEntrada){
    try {
        XpathUtil.contador_nodo = 1;
        print("Generando CST: "+new Date());
        try {
            if(cadEntrada!=null){
                cadEntrada = cadEntrada.replace(/\<\?xml.+\?\>|\<\!DOCTYPE.+]\>/g, ' ');
            }
            let catDot = xmlAnalyzerAst.parse(cadEntrada);
            if(catDot){
                console.info('Se genero correctamente el árbol. ');
                let pagina = "https://dreampuf.github.io/GraphvizOnline/#"+catDot;
                let url=encodeURI(pagina);
                window.open(url);
            }else{
                throw "No se pudo generar correctamente el árbol. ";
            }
        }catch (e){
            throw ('Error al generar el AST. '+e);
        }
        print(CONSOLE_MESSAGE_SUCCESSFULL);
    }catch (e){
        print(e);
        console.log(e);
    }
};


/**
 * Genera CstXmlAscendente
 * @param entrada
 */
const generarCstXMLDescendente= function (cadEntrada){
    try {
        XpathUtil.contador_nodo = 1;
        print("Generando CST: "+new Date());
        try {
            if(cadEntrada!=null){
                cadEntrada = cadEntrada.replace(/\<\?xml.+\?\>|\<\!DOCTYPE.+]\>/g, ' ');
            }
            let catDot = xmlAnalyzerTopdown.parse(cadEntrada);
            if(catDot){
                console.info('Se genero correctamente el árbol. ');
                let pagina = "https://dreampuf.github.io/GraphvizOnline/#"+catDot;
                let url=encodeURI(pagina);
                window.open(url);
            }else{
                throw "No se pudo generar correctamente el árbol. ";
            }
        }catch (e){
            throw ('Error al generar el AST. '+e);
        }
        print(CONSOLE_MESSAGE_SUCCESSFULL);
    }catch (e){
        print(e);
        console.log(e);
    }
};


/**
 * Metodo que analiza el xpath
 * @param entrada
 */
const analizarXQUERY= function (cadEntrada){
    try {
        print("Iniciando ejecucion: "+new Date());
        try {
            ListaErrores.InicializarXquery();
            let rootXpath = XqueryAnalyzer.parse(cadEntrada);
            if(rootXpath){
                console.info('Se genero correctamente el árbol xquery. ');
            }else{
                throw "No se pudo generar correctamente el árbol de xquery. ";
            }
            if(ListaErrores.hayErroresXquery()){
                print("Hubieron errores durante el analisis en XQUERY");
            }
            _rootXpath = rootXpath;
        }catch (e){
            throw ('Error al generar el AST. '+e);
        }
        console.info('Se cargo exitosamente las tabla de simbolos. ');
        print(CONSOLE_MESSAGE_SUCCESSFULL_XQUERY);
    }catch (e){
        print(e);
        console.log(e);
    }
};

/**
 * Metodo que analiza el xpath
 * @param entrada
 */
const analizarXPATH= function (cadEntrada){
    try {
        print("Iniciando ejecucion: "+new Date());
        ReporteGramatical.InicializarReporteGramaticalXpath();
        try {
            ListaErrores.InicializarXpath();
            let rootXpath = XpathAnalyzer.parse(cadEntrada);
            if(rootXpath){
                console.info('Se genero correctamente el árbol xpath. ');
            }else{
                throw "No se pudo generar correctamente el árbol de xpath. ";
            }
            if(ListaErrores.hayErroresXpath()){
                print("Hubieron errores durante el analisis en XPATH");
            }
            _rootXpath = rootXpath;
        }catch (e){
            throw ('Error al generar el AST. '+e);
        }
        console.info('Se cargo exitosamente las tabla de simbolos. ');
        print(CONSOLE_MESSAGE_SUCCESSFULL_XPATH);
    }catch (e){
        print(e);
        console.log(e);
    }
};


/**
 * Metodo que analiza el xpath
 * @param entrada
 */
const analizarXPATHDescendente= function (cadEntrada){
    try {
        print("Iniciando ejecucion: "+new Date());
        ReporteGramatical.InicializarReporteGramaticalXpath();
        try {
            ListaErrores.InicializarXpath();
            let rootXpath = XpathAnalyzerDescendant.parse(cadEntrada);
            if(rootXpath){
                console.info('Se genero correctamente el árbol xpath. ');
            }else{
                throw "No se pudo generar correctamente el árbol de xpath. ";
            }
            if(ListaErrores.hayErroresXpath()){
                print("Hubieron errores durante el analisis en XPATH");
            }
            _rootXpath = rootXpath;
        }catch (e){
            throw ('Error al generar el AST. '+e);
        }
        console.info('Se cargo exitosamente las tabla de simbolos. ');
        print(CONSOLE_MESSAGE_SUCCESSFULL_XPATH);
    }catch (e){
        print(e);
        console.log(e);
    }
};

/**
 * Metodo que ejecuta la entrada
 * @param entrada
 */
const ejecutar= function (cadEntradaXml, cadEntradaXpath){
    try {
        analizarXML(cadEntradaXml);
        analizarXPATH(cadEntradaXpath);
        let nodoAImprimir = _rootXpath.getValor(_tsXml);
        let result = XpathUtil.convertirNodosXpathATexto(nodoAImprimir);
        print(result);
        print('FIN EJECUCION');
    }catch (e){
        print('error en ejecucion: '+e);
        console.log(e);
    }
};


const print = function (strTexto){
    let strCad=_txtConsola.val();
    _txtConsola.val(strCad+strTexto+ENTER+CONSOLE_LINE_MARK);
};



const getStringAst = function (){
    if(_tsXml==undefined || _tsXml==undefined){
        print("No existe árbol que graficar.");
    }

    _graphicUtil = new GraphicUtil();
    return _graphicUtil.generarGrafo(_backEnd.root);
};

function  generar3D(cadEntradaXml){
    var tablaSimbolosXml;
    try {
        analizarXML(cadEntradaXml);
        CodeUtil.init();
        tablaSimbolosXml = _tsXml;
        tablaSimbolosXml.cargarXml_3d();
        CodeUtil.finalizeCad();
        print('Fin de generación');
    }catch (e){
        print('error en ejecucion: '+e);
        console.log(e);
    }
};


function descargarArchivo(cadEntradaXml){
    generar3D(cadEntradaXml);
    var blob = new Blob([CodeUtil._cadSalida], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "XPath.c");

};
