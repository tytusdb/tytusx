
const CONSOLE_LINE_MARK = '>';
const CONSOLE_MESSAGE_SUCCESSFULL="OK XML";
const CONSOLE_MESSAGE_SUCCESSFULL_XPATH="OK XPATH";
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