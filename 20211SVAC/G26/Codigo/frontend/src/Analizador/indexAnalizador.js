"use strict";
exports.__esModule = true;
var XMLGramAsc = require("./Gramatica/XML_GramaticaAsc");
var Entorno_1 = require("./AST/Entorno");
var Objeto_1 = require("./XML/Objeto");
var Atributo_1 = require("./XML/Atributo");
var XMLGramDesc = require("./Gramatica/XML_GramaticaDesc");
var ListaError_1 = require("./Global/ListaError");
var XPathGramAsc = require("./Gramatica/XPath_GramaticaAsc");
var XPathGramDesc = require("./Gramatica/XPath_GramaticaDesc");
var CST_1 = require("./Reporte/CST");
//const XPathGramAsc = require('../XPath_GramaticaAsc');
//const XPathGramDesc = require('../XPath_GramaticaDesc');
var Analizador = /** @class */ (function () {
    function Analizador() {
        this.global = new Entorno_1.Entorno('global', null, null);
        ListaError_1["default"].limpiar();
        this.indice = 0;
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
        ListaError_1["default"].limpiar();
    };
    Analizador.prototype.xmlDescendente = function (entrada) {
        var _this = this;
        console.log("---GRAMATICA DESCENDENTE---");
        CST_1.cstXmlDesc.id = 0;
        var objetos = XMLGramDesc.parse(entrada);
        objetos.forEach(function (elem) {
            if (elem instanceof Objeto_1.Objeto || elem instanceof Atributo_1.Atributo) {
                elem.ejecutar(_this.global);
            }
        });
        console.log(this.global);
        console.log(ListaError_1["default"]);
    };
    Analizador.prototype.xmlAscendente = function (entrada) {
        var _this = this;
        console.log("---GRAMATICA ASCENDENTE---");
        CST_1.cstXmlAsc.id = 0;
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
        console.log(ListaError_1["default"]);
        /*global.tsimbolos.forEach((elem:any) => {
          console.log(elem);
        });*/
    };
    Analizador.prototype.XPathAscendente = function (entrada) {
        var _this = this;
        console.log("-- XPATH ASCENDENTE -- ");
        var consultas = XPathGramAsc.parse(entrada);
        var salida = "";
        console.log("---------------------------------------");
        consultas.forEach(function (elem) {
            console.log("CONSULTA: " + elem.ToString());
            var resultado = elem.ejecutar(_this.global);
            salida += resultado;
            console.log("-----------RESULTADO----------------");
            console.log(resultado);
            console.log("---------------FIN---------------------");
        });
        return salida;
    };
    Analizador.prototype.XPathDescendente = function (entrada) {
        var _this = this;
        console.log("-- XPATH DESCENDENTE -- ");
        var consultas = XPathGramDesc.parse(entrada);
        var salida = "";
        console.log("---------------------------------------");
        consultas.forEach(function (elem) {
            console.log("CONSULTA: " + elem.ToString());
            var resultado = elem.ejecutar(_this.global);
            salida += resultado;
            console.log("-----------RESULTADO----------------");
            console.log(resultado);
            console.log("---------------FIN---------------------");
        });
        return salida;
    };
    Analizador.prototype.getTablaSimbolos = function () {
        return this.global;
    };
    Analizador.prototype.getErrores = function () {
        var err = '';
        ListaError_1["default"].listaError.forEach(function (elem) {
            err = err + elem.getMensaje() + '\n';
        });
        return err;
    };
    Analizador.prototype.getRepTablaSimbolos = function () {
        var cadenaDot = '';
        var tabla = this.global.tsimbolos;
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
            + '<td><b>FILA</b></td><td><b>COLUMNA</b></td>'
            + '</tr>';
        cadenaDot = cadenaDot + this.getSimbolosEntorno(this.global);
        cadenaDot = cadenaDot + '</table>'
            + '>];'
            + '}';
        return cadenaDot;
    };
    Analizador.prototype.getSimbolosEntorno = function (entrada) {
        var _this = this;
        var simbolos = '';
        entrada.tsimbolos.forEach(function (elem) {
            if (elem.valor.valor instanceof Entorno_1.Entorno) {
                _this.indice++;
                simbolos = simbolos
                    + '<tr>'
                    + '<td>' + _this.indice + '</td>'
                    + '<td>' + elem.valor.nombre + '</td>'
                    + '<td>' + _this.getTipoDato(elem.valor.tipo) + '</td>'
                    + '<td>' + entrada.nombre + '</td>'
                    + '<td>' + elem.nombre + '</td>'
                    + '<td>Nodo</td>'
                    + '<td>' + elem.valor.linea + '</td>'
                    + '<td>' + elem.valor.columna + '</td>'
                    + '</tr>';
                simbolos = simbolos + _this.getSimbolosEntorno(elem.valor.valor);
            }
            else {
                if (elem.valor.valor !== false) {
                    _this.indice++;
                    simbolos = simbolos
                        + '<tr>'
                        + '<td>' + _this.indice + '</td>'
                        + '<td>' + elem.valor.nombre + '</td>'
                        + '<td>' + _this.getTipoDato(elem.valor.tipo) + '</td>'
                        + '<td>' + entrada.nombre + '</td>'
                        + '<td>' + elem.nombre + '</td>'
                        + '<td>' + elem.valor.valor.toString().replace('&', 'and') + '</td>'
                        + '<td>' + elem.valor.linea + '</td>'
                        + '<td>' + elem.valor.columna + '</td>'
                        + '</tr>';
                }
            }
        });
        return simbolos;
    };
    Analizador.prototype.getTipoDato = function (t) {
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
    };
    Analizador.prototype.getRepErrores = function () {
        var cadenaDot = '';
        var indice = 0;
        cadenaDot = '<table class="tablaDatos" >'
            + '<tr>'
            + '<th>No.</th><th>Tipo</th><th>Descripcion</th><th>Linea</th><th>Columna</th>'
            + '</th>';
        ListaError_1["default"].listaError.forEach(function (elem) {
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
    };
    Analizador.prototype.getCSTXmlAsc = function () {
        var cadenaDot = 'digraph {';
        cadenaDot = cadenaDot + this.recorridoCst(CST_1.cstXmlAsc.getRaiz());
        cadenaDot = cadenaDot + '}';
        return cadenaDot;
    };
    Analizador.prototype.getCSTXmlDesc = function () {
        var cadenaDot = 'digraph {';
        cadenaDot += this.recorridoCst(CST_1.cstXmlDesc.getRaiz());
        cadenaDot += '}';
        return cadenaDot;
    };
    Analizador.prototype.recorridoCst = function (nodo) {
        var _this = this;
        var concatena = '';
        if (nodo !== null) {
            concatena += nodo.id + '[label="' + nodo.valor + '"];\n';
            nodo.hijos.forEach(function (hijo) {
                concatena += _this.recorridoCst(hijo);
                concatena += nodo.id + ' -> ' + hijo.id + ';\n';
            });
        }
        return concatena;
    };
    return Analizador;
}());
var analizador = new Analizador();
exports["default"] = analizador;
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
