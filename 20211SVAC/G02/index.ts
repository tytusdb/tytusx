
var consola = "";
var entornoGlobal:Entorno;
var erroresXML: ErrorCapturado[] = [];
var erroresXPath: ErrorCapturado[] = [];
var reglasGramaticalesXML: ReglaGramatical[];
var reglasGramaticalesXPath: ReglaGramatical[];
var instruccionesXML: Objeto[];
var instruccionesXPath: Instruccion[];

function procesarProyecto(instruccionesXML:any, instruccionesXPath:any){
    consola = "Iniciando analisis";
    entornoGlobal = new Entorno(null);
    ejecutarXML(instruccionesXML);
    ejecutarXPath(instruccionesXPath);
    return consola;
}

function ejecutarXML(instrucciones:any){
    agregarLinea("Analizando XML");
    const ast:AST = new AST(instrucciones);
    const objetos = instrucciones;
    
    objetos.forEach((element:Objeto)=>{
        entornoGlobal.registrarObjetoEnTS(element, entornoGlobal);
    });            
    
    agregarLinea("Finaliza analisis XML");

    var simbolo:Simbolo = entornoGlobal.getSimbolo('xmlEncoding');    
    var entornoEncoding: Entorno = simbolo.valor == null ? null : simbolo.valor.entorno
    var version:Atributo = entornoEncoding.getSimbolo("version") == null ? null : entornoEncoding.getSimbolo("version");
    var encoding:Atributo = entornoEncoding.getSimbolo("encoding") == null ? null : entornoEncoding.getSimbolo("encoding");
    agregarLinea("\n=====Informacion de XML=====");
    agregarLinea("Version " + (version == null ? "No se encontro version" : version.valor))
    agregarLinea("Encoding " + (encoding == null ? "No se encontro encoding" : encoding.valor));
    agregarLinea("============================");
}

function ejecutarXPath(instrucciones:any){
    agregarLinea("Analizando XPath");

    instrucciones.forEach((element:Instruccion) => {
        element.ejecutar(entornoGlobal, instrucciones);
    });
    agregarLinea("Finalizando XPath");
}


function agregarErroresXMLConsola(listaErrores: any){
    var header:string = "==========ERRORES XML==========";
    agregarErroresConsola(header, listaErrores);
}
function agregarErroresXPathConsola(listaErrores: any){
    var header:string = "==========ERRORES XPath==========";
    agregarErroresConsola(header, listaErrores);
}

function agregarErroresConsola(header:string, listaErrores:any){
    agregarLinea(header);
    listaErrores.forEach((err: ErrorCapturado) => {
       agregarLinea("Error: " + err.tipoError+ " - " + err.mensaje+ " - " + err.token + " - " + err.linea + " - "+err.columna);
    });
}



function agregarLinea(texto:string){
    consola+="\n"+texto;
}
