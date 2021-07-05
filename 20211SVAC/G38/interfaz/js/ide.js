
const CONSOLE_LINE_MARK = '>';
const CONSOLE_MESSAGE_SUCCESSFULL="OK XML";
const CONSOLE_MESSAGE_SUCCESSFULL_XPATH="OK XPATH";
const CONSOLE_MESSAGE_SUCCESSFULL_XQUERY="OK XQUERY";
const CONSOLE_MESSAGE_SUCCESSFULL_C3D="OK C3D";
const ENTER = "\n";


var _backEnd;
var _graphicUtil;
var _txtConsola;

var _rootXml;
var _tsXml;
var _tsXquery;

var _rootXpath;
var _rootXquery;

/**
 * Metodo que analiza el xml
 * @param entrada
 */
const analizarXML= function (cadEntrada){
    try {
        InterfazGrafica.print("Iniciando ejecucion: "+new Date());
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
        InterfazGrafica.print(CONSOLE_MESSAGE_SUCCESSFULL);
    }catch (e){
        InterfazGrafica.print(e);
        console.log(e);
    }
};


/**
 * Metodo que analiza el c3d
 * @param entrada
 */
const analizarC3D= function (cadEntrada){
    try {
        InterfazGrafica.print("Iniciando ejecucion: "+new Date());
        ListaErrores.InicializarC3D();
        ReporteOptimizacion.InicializarReporteOptimizacion();
        try {
            let rootC3D = Codigo3dAnalyzer.parse(cadEntrada);
            if(rootC3D){
                console.info('Se genero correctamente el árbol. ');
                if(rootC3D instanceof Optimizador){
                   let codigoOptimizado =  rootC3D.optimizarCodigo();
                    if(codigoOptimizado!=null){
                        InterfazGrafica.printOptimizacion(codigoOptimizado);
                    }
                }
            }else{
                throw "No se pudo generar correctamente el árbol. ";
            }
            if(ListaErrores.hayErroresC3D()){
                InterfazGrafica.print("Hubieron errores durante el analisis de C3D")
            }
        }catch (e){
            throw ('Error al generar el AST. '+e);
        }
        InterfazGrafica.print(CONSOLE_MESSAGE_SUCCESSFULL_C3D);
    }catch (e){
        InterfazGrafica.print(e);
        console.log(e);
    }
};

/**
 * Metodo genera el aST ascendente
 * @param entrada
 */
const generarAstAscennteXml= function (cadEntrada){
    try {
        InterfazGrafica.print("Iniciando generacion de AST: "+new Date());
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
        InterfazGrafica.print(CONSOLE_MESSAGE_SUCCESSFULL);
    }catch (e){
        InterfazGrafica.print(e);
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
        InterfazGrafica.print("Generando CST: "+new Date());
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
        InterfazGrafica.print(CONSOLE_MESSAGE_SUCCESSFULL);
    }catch (e){
        InterfazGrafica.print(e);
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
        InterfazGrafica.print("Generando CST: "+new Date());
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
        InterfazGrafica.print(CONSOLE_MESSAGE_SUCCESSFULL);
    }catch (e){
        InterfazGrafica.print(e);
        console.log(e);
    }
};


/**
 * Metodo que analiza el xpath
 * @param entrada
 */
const analizarXQUERY= function (cadEntrada){
    try {
        InterfazGrafica.print("Iniciando ejecucion: "+new Date());
        try {
            ListaErrores.InicializarXquery();
            ListaFunciones.limipiarFunciones();
            let rootXquery = XqueryAnalyzer.parse(cadEntrada);
            if(rootXquery){
                console.info('Se genero correctamente el árbol xquery. ');
            }else{
                throw "No se pudo generar correctamente el árbol de xquery. ";
            }
            if(ListaErrores.hayErroresXquery()){
                InterfazGrafica.print("Hubieron errores durante el analisis en XQUERY");
            }
            _rootXquery = rootXquery;
        }catch (e){
            throw ('Error al generar el AST. '+e);
        }
        console.info('Se cargo exitosamente las tabla de simbolos. ');
        InterfazGrafica.print(CONSOLE_MESSAGE_SUCCESSFULL_XQUERY);
    }catch (e){
        InterfazGrafica.print(e);
        console.log(e);
    }
};

/**
 * Metodo que analiza el xpath
 * @param entrada
 */
const analizarXPATH= function (cadEntrada){
    try {
        InterfazGrafica.print("Iniciando ejecucion: "+new Date());
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
                InterfazGrafica.print("Hubieron errores durante el analisis en XPATH");
            }
            _rootXpath = rootXpath;
        }catch (e){
            throw ('Error al generar el AST. '+e);
        }
        console.info('Se cargo exitosamente las tabla de simbolos. ');
        InterfazGrafica.print(CONSOLE_MESSAGE_SUCCESSFULL_XPATH);
    }catch (e){
        InterfazGrafica.print(e);
        console.log(e);
    }
};


/**
 * Metodo que analiza el xpath
 * @param entrada
 */
const analizarXPATHDescendente= function (cadEntrada){
    try {
        InterfazGrafica.print("Iniciando ejecucion: "+new Date());
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
                InterfazGrafica.print("Hubieron errores durante el analisis en XPATH");
            }
            _rootXpath = rootXpath;
        }catch (e){
            throw ('Error al generar el AST. '+e);
        }
        console.info('Se cargo exitosamente las tabla de simbolos. ');
        InterfazGrafica.print(CONSOLE_MESSAGE_SUCCESSFULL_XPATH);
    }catch (e){
        InterfazGrafica.print(e);
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
        let nodoAImprimir = _rootXpath.getValor(new TablaSimbolosXquery(null,"GLOBAL"),_tsXml);
        let result = XpathUtil.convertirNodosXpathATexto(nodoAImprimir);
        InterfazGrafica.print(result);
        InterfazGrafica.print('FIN EJECUCION');
    }catch (e){
        InterfazGrafica.print('error en ejecucion: '+e);
        console.log(e);
    }
};


/**
 * Metodo que ejecuta la entrada
 * @param entrada
 */
const ejecutarXquery= function (cadEntradaXml, cadEntradaXpath){
    try {
        analizarXML(cadEntradaXml);
        analizarXQUERY(cadEntradaXpath);
        let tablaGlobal = new TablaSimbolosXquery(null,"GLOBAL");
        _rootXquery.ejecutar(tablaGlobal,_tsXml);
        if(tablaGlobal != null && tablaGlobal instanceof TablaSimbolosXquery){
            _tsXquery = tablaGlobal;
        }
        if(ListaErrores.hayErroresXquery()){
            InterfazGrafica.print("Hubieron errores durante la ejecucion en XQUERY");
        }
        InterfazGrafica.print('FIN EJECUCION');
    }catch (e){
        InterfazGrafica.print('error en ejecucion: '+e);
        console.log(e);
    }
};


const getStringAst = function (){
    if(_tsXml==undefined || _tsXml==undefined){
        InterfazGrafica.print("No existe árbol que graficar.");
    }

    _graphicUtil = new GraphicUtil();
    return _graphicUtil.generarGrafo(_backEnd.root);
};

function  generar3D(cadEntradaXml, cadEntradaXpath){
    var tablaSimbolosXml;
    try {
        analizarXML(cadEntradaXml);
        analizarXPATH(cadEntradaXpath);
        if(ListaErrores.hayErroresXml()){
            InterfazGrafica.print('Se encontraron errores durante la generacion. Se recupero. Ver tabla de erroes XML.');
        }

        CodeUtil.init();
        tablaSimbolosXml = _tsXml;
        tablaSimbolosXml.cargarXml_3d();
        CodeUtil.comenzarPrograma();
        let rootXpath = _rootXpath.traducir3D("","2");
        CodeUtil.finalizarProgrma();
        InterfazGrafica.print(CodeUtil._cadSalida);

        InterfazGrafica.print('Fin de generación');
    }catch (e){
        InterfazGrafica.print('error en ejecucion: '+e);
        console.log(e);
    }
};


function descargarArchivo(cadEntradaXml, cadEntradaXpath){
    generar3D(cadEntradaXml, cadEntradaXpath);
    var blob = new Blob([CodeUtil._cadSalida], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "XPath.c");

};



function  generar3DXquery(cadEntradaXml, cadEntradaXpath){
    var tablaSimbolosXml;
    try {
        ListaErrores.InicializarC3D();
        analizarXML(cadEntradaXml);
        analizarXQUERY(cadEntradaXpath);
        if(ListaErrores.hayErroresXml()){
            InterfazGrafica.print('Se encontraron errores durante la generacion. Se recupero. Ver tabla de erroes XML.');
        }
        CodeUtil.init();
        tablaSimbolosXml = _tsXml;
        tablaSimbolosXml.cargarXml_3d();
        CodeUtil.comenzarPrograma();
        let ts = _rootXquery.obtenerTS(_tsXml);
        _tsXquery = ts;
        XQueryUtil.tablaSimbolosGlobal = ts;
        XQueryUtil.tablaSimbolosLocal = ts;
        ts.borrarValoresInterprete();
        ts.cargarElementosXml();
        let rootXquery =    _rootXquery.traducirXQ(ts.listaSimbolos.length);//Ejecutar Xquery
        CodeUtil.finalizarProgrma();
        InterfazGrafica.print(CodeUtil._cadSalida);


        InterfazGrafica.print('Fin de generación');
    }catch (e){
        InterfazGrafica.print('error en ejecucion: '+e);
        console.log(e);
    }
};



function descargarArchivoXQuery(cadEntradaXml, cadEntradaXpath){
    generar3DXquery(cadEntradaXml, cadEntradaXpath);
    var blob = new Blob([CodeUtil._cadSalida], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "XQuery.c");

};