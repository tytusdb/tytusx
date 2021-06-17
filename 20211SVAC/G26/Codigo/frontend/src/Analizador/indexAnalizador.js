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
var XMLGramAsc = __importStar(require("./Gramatica/XML_GramaticaAsc"));
var Entorno_1 = require("./AST/Entorno");
var Objeto_1 = require("./XML/Objeto");
var Atributo_1 = require("./XML/Atributo");
var XMLGramDesc = __importStar(require("./Gramatica/XML_GramaticaDesc"));
var ListaError_1 = __importDefault(require("./Global/ListaError"));
var XPathGramAsc = __importStar(require("./Gramatica/XPath_GramaticaAsc"));
//const XPathGramAsc = require('../XPath_GramaticaAsc');
//const XPathGramDesc = require('../XPath_GramaticaDesc');
var Analizador = /** @class */ (function () {
    function Analizador() {
        this.global = new Entorno_1.Entorno('global', null, null);
        ListaError_1.default.limpiar();
        if (typeof Analizador._instance === "object") {
            return Analizador._instance;
        }
        Analizador._instance = this;
        return this;
    }
    Analizador.getInstance = function () {
        return this._instance;
    };
    Analizador.prototype.iniciarVariables = function () {
        this.global = new Entorno_1.Entorno('global', null, null);
        ListaError_1.default.limpiar();
    };
    Analizador.prototype.xmlDescendente = function (entrada) {
        var _this = this;
        console.log("---GRAMATICA DESCENDENTE---");
        var objetos = XMLGramDesc.parse(entrada);
        objetos.forEach(function (elem) {
            if (elem instanceof Objeto_1.Objeto || elem instanceof Atributo_1.Atributo) {
                elem.ejecutar(_this.global);
            }
        });
        console.log(this.global);
        console.log(ListaError_1.default);
    };
    Analizador.prototype.xmlAscendente = function (entrada) {
        var _this = this;
        console.log("---GRAMATICA ASCENDENTE---");
        var objetos = XMLGramAsc.parse(entrada);
        this.global = new Entorno_1.Entorno('global', null, null);
        if (objetos !== null) {
            objetos.forEach(function (elem) {
                console.log('Elemento: ' + elem);
                if (elem instanceof Objeto_1.Objeto || elem instanceof Atributo_1.Atributo) {
                    elem.ejecutar(_this.global);
                }
            });
        }
        console.log(this.global);
        console.log(ListaError_1.default);
        /*global.tsimbolos.forEach((elem:any) => {
          console.log(elem);
        });*/
    };
    Analizador.prototype.XPathAscendente = function (entrada) {
        var _this = this;
        console.log("-- XPATH ASCENDENTE -- ");
        var consultas = XPathGramAsc.parse(entrada);
        console.log("---------------------------------------");
        consultas.forEach(function (elem) {
            console.log("CONSULTA: " + elem.ToString());
            var resultado = elem.ejecutar(_this.global);
            console.log("-----------RESULTADO----------------");
            console.log(resultado);
            console.log("---------------FIN---------------------");
        });
    };
    Analizador.prototype.getTablaSimbolos = function () {
        return this.global;
    };
    Analizador.prototype.getErrores = function () {
        var err = '';
        ListaError_1.default.listaError.forEach(function (elem) {
            err = err + elem.getMensaje() + '\n';
        });
        return err;
    };
    return Analizador;
}());
var analizador = new Analizador();
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

xmlDescendente(`
<?xml version="1.0" encoding="UTF-8"?>

<bookstore>
  <book category="children">
    <title>Harry Potter</title>
    <author>J K. Rowlin</author>
    <price at="asd"></price>
    <hola> </Hola>
  </book>
  <!-- HOLAAA -->
  <book category="web">
    <title>Learning XML</title>
    <author>Erik T. Ray</author>
    <year>2003</year>
    <price>39.95 &lt 30</price>
  </book>
</bookstore>
`);

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
