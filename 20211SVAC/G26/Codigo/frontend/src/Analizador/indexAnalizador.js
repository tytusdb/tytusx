"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const XMLGramAsc = __importStar(require("./Gramatica/XML_GramaticaAsc"));
const XQueryGram = __importStar(require("./Gramatica/XQuery_GramaticaAsc"));
const Entorno_1 = require("./AST/Entorno");
const Objeto_1 = require("./XML/Objeto");
const Atributo_1 = require("./XML/Atributo");
const XMLGramDesc = __importStar(require("./Gramatica/XML_GramaticaDesc"));
const ListaError_1 = __importDefault(require("./Global/ListaError"));
const XPathGramAsc = __importStar(require("./Gramatica/XPath_GramaticaAsc"));
const XPathGramDesc = __importStar(require("./Gramatica/XPath_GramaticaDesc"));
const CST_1 = require("./Reporte/CST");
const TraduceXML_1 = require("./Traduccion/TraduceXML");
const OptimizacionGrammar = __importStar(require("./Gramatica/Optimizacion_Grammar"));
const Optimizer_1 = require("./Optimizacion/Optimizer");
const Metodo_1 = require("./Optimizacion/Declaraciones3D/Metodo");
const Main_1 = require("./Optimizacion/Declaraciones3D/Main");
//const XPathGramAsc = require('../XPath_GramaticaAsc');
//const XPathGramDesc = require('../XPath_GramaticaDesc');
class Analizador {
    constructor() {
        this.global = new Entorno_1.Entorno('global', null, null);
        ListaError_1.default.limpiar();
        this.indice = 0;
        this.reporteOptimiza = [];
        this.consultas = [];
        if (typeof Analizador._instance === "object") {
            return Analizador._instance;
        }
        Analizador._instance = this;
        return this;
    }
    static getInstance() {
        return this._instance;
    }
    iniciarVariables() {
        this.global = new Entorno_1.Entorno('global', null, null);
        ListaError_1.default.limpiar();
    }
    optimizacion(entrada) {
        const codigo3d = OptimizacionGrammar.parse(entrada);
        let salida = "";
        let optimizador = new Optimizer_1.Optimizer();
        this.reporteOptimiza = [];
        let antes = "";
        codigo3d.forEach((c) => {
            antes += c.getCodigo3Dir() + "\n";
            if (c instanceof Main_1.Main || c instanceof Metodo_1.Metodo) {
                c.listaInstrucciones = optimizador.aplicar(c.listaInstrucciones, this.reporteOptimiza);
            }
            salida += c.getCodigo3Dir() + "\n";
        });
        console.log("REPORTE: ", this.reporteOptimiza);
        return salida;
    }
    xmlDescendente(entrada) {
        console.log("---GRAMATICA DESCENDENTE---");
        CST_1.cstXmlDesc.id = 0;
        const objetos = XMLGramDesc.parse(entrada);
        objetos.forEach((elem) => {
            if (elem instanceof Objeto_1.Objeto || elem instanceof Atributo_1.Atributo) {
                elem.ejecutar(this.global);
            }
        });
        console.log(this.global);
        console.log(ListaError_1.default);
    }
    xmlAscendente(entrada) {
        console.log("---GRAMATICA ASCENDENTE---");
        CST_1.cstXmlAsc.id = 0;
        const objetos = XMLGramAsc.parse(entrada);
        this.global = new Entorno_1.Entorno('global', null, null);
        if (objetos !== null) {
            objetos.forEach((elem) => {
                console.log('Elemento: ' + elem);
                if (elem instanceof Objeto_1.Objeto || elem instanceof Atributo_1.Atributo) {
                    elem.ejecutar(this.global);
                }
            });
        }
        console.log(this.global);
        console.log(ListaError_1.default);
        /*global.tsimbolos.forEach((elem:any) => {
          console.log(elem);
        });*/
    }
    XPathAscendente(entrada) {
        console.log("-- XPATH ASCENDENTE -- ");
        this.consultas = XPathGramAsc.parse(entrada);
        let salida = "";
        console.log("---------------------------------------");
        this.consultas.forEach((elem) => {
            console.log("CONSULTA: " + elem.ToString());
            let resultado = elem.ejecutar(this.global);
            salida += elem.simbolosToString(resultado) + "\n";
            console.log("-----------RESULTADO----------------");
            console.log(resultado);
            console.log("StringResult:");
            console.log(elem.simbolosToString(resultado));
            console.log("---------------FIN---------------------");
        });
        return salida;
    }
    XPathDescendente(entrada) {
        console.log("-- XPATH DESCENDENTE -- ");
        this.consultas = XPathGramDesc.parse(entrada);
        let salida = "";
        console.log("---------------------------------------");
        this.consultas.forEach((elem) => {
            console.log("CONSULTA: " + elem.ToString());
            let resultado = elem.ejecutar(this.global);
            salida += elem.simbolosToString(resultado) + "\n";
            console.log("-----------RESULTADO----------------");
            console.log(resultado);
            console.log("TOSTRING:");
            console.log(elem.simbolosToString(resultado));
            console.log("---------------FIN---------------------");
        });
        return salida;
    }
    XQueryAscendente(entrada) {
        console.log("---- XQUERY ASCENDENTE ----- ");
        const instrucciones = XQueryGram.parse(entrada);
        let salida = "";
        salida += instrucciones.ejecutar(new Entorno_1.Entorno("XQGlobal", null, null), this.global);
        //console.log("SALIDA: ", salida);
        return salida;
    }
    getTablaSimbolos() {
        return this.global;
    }
    getErrores() {
        let err = '';
        ListaError_1.default.listaError.forEach((elem) => {
            err = err + elem.getMensaje() + '\n';
        });
        return err;
    }
    getRepTablaSimbolos() {
        let cadenaDot = '';
        let tabla = this.global.tsimbolos;
        this.indice = 0;
        cadenaDot = 'digraph {'
            + 'tbl ['
            + 'shape=plaintext,'
            + 'label=<'
            + '<table border="0" cellborder="1" color="#ddd" cellspacing="0">'
            + '<tr bgcolor="#04AA6D">'
            + '<td><b>NO.</b></td>'
            + '<td><b>NOMBRE</b></td>'
            + '<td><b>TIPO</b></td>'
            + '<td><b>AMBITO</b></td>'
            + '<td><b>NODO</b></td>'
            + '<td><b>VALOR</b></td>'
            + '<td><b>FILA</b></td>'
            + '<td><b>COLUMNA</b></td>'
            + '<td><b>POSICION</b></td>'
            + '</tr>';
        cadenaDot = cadenaDot + this.getSimbolosEntorno(this.global);
        cadenaDot = cadenaDot + '</table>'
            + '>];'
            + '}';
        return cadenaDot;
    }
    getSimbolosEntorno(entrada) {
        let simbolos = '';
        entrada.tsimbolos.forEach((elem) => {
            if (elem.valor.valor instanceof Entorno_1.Entorno) {
                this.indice++;
                simbolos = simbolos
                    + '<tr>'
                    + '<td>' + this.indice + '</td>'
                    + '<td>' + elem.valor.getNombre() + '</td>'
                    + '<td>' + this.getTipoDato(elem.valor.getTipo()) + '</td>'
                    + '<td>' + entrada.nombre + '</td>'
                    + '<td>' + elem.nombre + '</td>'
                    + '<td>Nodo</td>'
                    + '<td>' + elem.valor.getLinea() + '</td>'
                    + '<td>' + elem.valor.getColumna() + '</td>'
                    + '<td>' + elem.valor.getPosicion() + '</td>'
                    + '</tr>';
                simbolos = simbolos + this.getSimbolosEntorno(elem.valor.valor);
            }
            else {
                if (elem.valor.valor !== false) {
                    this.indice++;
                    simbolos = simbolos
                        + '<tr>'
                        + '<td>' + this.indice + '</td>'
                        + '<td>' + elem.valor.getNombre() + '</td>'
                        + '<td>' + this.getTipoDato(elem.valor.getTipo()) + '</td>'
                        + '<td>' + entrada.nombre + '</td>'
                        + '<td>' + elem.nombre + '</td>'
                        + '<td>' + elem.valor.getValor().toString().replace('&', 'and') + '</td>'
                        + '<td>' + elem.valor.getLinea() + '</td>'
                        + '<td>' + elem.valor.getColumna() + '</td>'
                        + '<td>' + elem.valor.getPosicion() + '</td>'
                        + '</tr>';
                }
            }
        });
        return simbolos;
    }
    getTipoDato(t) {
        switch (t) {
            case 0:
                return 'Texto';
            case 1:
                return 'Cadena';
            case 2:
                return 'Etiqueta';
            case 3:
                return 'Atributo';
        }
        ;
        return '';
    }
    getRepErrores() {
        let cadenaDot = '';
        let indice = 0;
        cadenaDot = '<table class="tablaDatos" >'
            + '<tr>'
            + '<th>No.</th><th>Tipo</th><th>Descripcion</th><th>Linea</th><th>Columna</th>'
            + '</th>';
        ListaError_1.default.listaError.forEach((elem) => {
            indice++;
            cadenaDot = cadenaDot
                + '<tr>'
                + '<td>' + indice + '</td>'
                + '<td>' + elem.getTipo() + '</td>'
                + '<td>' + elem.getDescripcion() + '</td>'
                + '<td>' + elem.getLinea() + '</td>'
                + '<td>' + elem.getColumna() + '</td>'
                + '</tr>';
        });
        cadenaDot = cadenaDot + '</table>';
        return cadenaDot;
    }
    getRepOptimizacion() {
        let cadenaDot = '';
        let indice = 0;
        cadenaDot = '<table class="tblRepOpti" >'
            + '<tr>'
            + '<th>No.</th><th>CODIGO ANTES</th><th>CODIGO AHORA</th><th>REGLA</th><th>Columna</th><th>FILA</th>'
            + '</th>';
        this.reporteOptimiza.forEach((elem) => {
            indice++;
            cadenaDot = cadenaDot
                + '<tr>'
                + '<td>' + indice + '</td>'
                + '<td>' + elem.getCodigoAntes() + '</td>'
                + '<td>' + elem.getCodigoAhora() + '</td>'
                + '<td>' + elem.tipoReglaToString() + '</td>'
                + '<td>' + elem.getColumna() + '</td>'
                + '<td>' + elem.getFila() + '</td>'
                + '</tr>';
        });
        cadenaDot = cadenaDot + '</table>';
        return cadenaDot;
    }
    getCSTXmlAsc() {
        let cadenaDot = 'digraph {';
        cadenaDot = cadenaDot + this.recorridoCst(CST_1.cstXmlAsc.getRaiz());
        cadenaDot = cadenaDot + '}';
        return cadenaDot;
    }
    getCSTXmlDesc() {
        let cadenaDot = 'digraph {';
        cadenaDot += this.recorridoCst(CST_1.cstXmlDesc.getRaiz());
        cadenaDot += '}';
        return cadenaDot;
    }
    recorridoCst(nodo) {
        let concatena = '';
        if (nodo !== null) {
            concatena += nodo.id + '[label="' + nodo.valor + '"];\n';
            nodo.hijos.forEach((hijo) => {
                concatena += this.recorridoCst(hijo);
                concatena += nodo.id + ' -> ' + hijo.id + ';\n';
            });
        }
        return concatena;
    }
    traduceXML() {
        let resultado = '';
        let traductor = new TraduceXML_1.TraduceXML(this.consultas);
        resultado = traductor.traducirXML();
        console.log(this.global);
        return resultado;
    }
}
const analizador = new Analizador();
exports.default = analizador;
/*
function xpathAscendente(entrada:string){
  console.log("-- XPATH ASCENDENTE -- ")
  const objetos = XPathGramAsc.parse(entrada);

  objetos.forEach((elem: any) => {
      console.log(elem);
  });
}

function xpathDescendente(entrada:string){
  console.log("-- XPATH DESCENDENTE -- ")
  const objetos = XPathGramDesc.parse(entrada);

  objetos.forEach((elem: any) => {
      console.log(elem);
  });
}

XPathAscendente(`
bookstore/book
|
//@category
`);
*/
/*
xmlAscendente(`
<?xml version="1.0" encoding="UTF-8"?>

<bookstore>
  <book category="children">
    <title>Harry Potter</title>
    <author>J K. Rowlin</author>
    <price at="asd"></price>
    <hola> </hola>
  </book>
  <book category="web">
    <title>Learning XML</title>
    <author>Erik T. Ray</author>
    <year>2003</year>
    <price>39.95 &lt 30</price>
  </book>
</bookstore>
`);*/
//export default Analizador;
