import * as XMLGramAsc from './Gramatica/XML_GramaticaAsc';
import { Entorno } from './AST/Entorno';
import { Objeto } from './XML/Objeto';
import { Atributo } from './XML/Atributo';
import * as XMLGramDesc from './Gramatica/XML_GramaticaDesc';
import errores from './Global/ListaError';
import * as XPathGramAsc from './Gramatica/XPath_GramaticaAsc';
import * as XPathGramDesc from "./Gramatica/XPath_GramaticaDesc";
import { cstXmlAsc, cstXmlDesc } from './Reporte/CST';
//const XPathGramAsc = require('../XPath_GramaticaAsc');
//const XPathGramDesc = require('../XPath_GramaticaDesc');
class Analizador {
    constructor() {
        this.global = new Entorno('global', null, null);
        errores.limpiar();
        this.indice = 0;
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
        this.global = new Entorno('global', null, null);
        errores.limpiar();
    }
    xmlDescendente(entrada) {
        console.log("---GRAMATICA DESCENDENTE---");
        cstXmlDesc.id = 0;
        const objetos = XMLGramDesc.parse(entrada);
        objetos.forEach((elem) => {
            if (elem instanceof Objeto || elem instanceof Atributo) {
                elem.ejecutar(this.global);
            }
        });
        console.log(this.global);
        console.log(errores);
    }
    xmlAscendente(entrada) {
        console.log("---GRAMATICA ASCENDENTE---");
        cstXmlAsc.id = 0;
        const objetos = XMLGramAsc.parse(entrada);
        this.global = new Entorno('global', null, null);
        if (objetos !== null) {
            objetos.forEach((elem) => {
                console.log('Elemento: ' + elem);
                if (elem instanceof Objeto || elem instanceof Atributo) {
                    elem.ejecutar(this.global);
                }
            });
        }
        console.log(this.global);
        console.log(errores);
        /*global.tsimbolos.forEach((elem:any) => {
          console.log(elem);
        });*/
    }
    XPathAscendente(entrada) {
        console.log("-- XPATH ASCENDENTE -- ");
        const consultas = XPathGramAsc.parse(entrada);
        let salida = "";
        console.log("---------------------------------------");
        consultas.forEach((elem) => {
            console.log("CONSULTA: " + elem.ToString());
            let resultado = elem.ejecutar(this.global);
            salida += resultado;
            console.log("-----------RESULTADO----------------");
            console.log(resultado);
            console.log("---------------FIN---------------------");
        });
        return salida;
    }
    XPathDescendente(entrada) {
        console.log("-- XPATH DESCENDENTE -- ");
        const consultas = XPathGramDesc.parse(entrada);
        let salida = "";
        console.log("---------------------------------------");
        consultas.forEach((elem) => {
            console.log("CONSULTA: " + elem.ToString());
            let resultado = elem.ejecutar(this.global);
            salida += resultado;
            console.log("-----------RESULTADO----------------");
            console.log(resultado);
            console.log("---------------FIN---------------------");
        });
        return salida;
    }
    getTablaSimbolos() {
        return this.global;
    }
    getErrores() {
        let err = '';
        errores.listaError.forEach((elem) => {
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
            + '<td><b>FILA</b></td><td><b>COLUMNA</b></td>'
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
            if (elem.valor.valor instanceof Entorno) {
                this.indice++;
                simbolos = simbolos
                    + '<tr>'
                    + '<td>' + this.indice + '</td>'
                    + '<td>' + elem.valor.nombre + '</td>'
                    + '<td>' + this.getTipoDato(elem.valor.tipo) + '</td>'
                    + '<td>' + entrada.nombre + '</td>'
                    + '<td>' + elem.nombre + '</td>'
                    + '<td>' + elem.valor.valor.toString().replace('&', 'and') + '</td>'
                    + '<td>' + elem.valor.linea + '</td>'
                    + '<td>' + elem.valor.columna + '</td>'
                    + '</tr>';
                simbolos = simbolos + this.getSimbolosEntorno(elem.valor.valor);
            }
            else {
                if (elem.valor.valor !== false) {
                    this.indice++;
                    simbolos = simbolos
                        + '<tr>'
                        + '<td>' + this.indice + '</td>'
                        + '<td>' + elem.valor.nombre + '</td>'
                        + '<td>' + this.getTipoDato(elem.valor.tipo) + '</td>'
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
        cadenaDot = 'digraph {'
            + 'tbl ['
            + 'shape=plaintext,'
            + 'label=<'
            + '<table border="0" cellborder="1" color="blue" cellspacing="0">'
            + '<tr>'
            + '<td>No.</td><td>Tipo</td><td>Descripcion</td><td>Linea</td><td>Columna</td>'
            + '</tr>';
        errores.listaError.forEach((elem) => {
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
        cadenaDot = cadenaDot + '</table>'
            + '>];'
            + '}';
        return cadenaDot;
    }
    getCSTXmlAsc() {
        let cadenaDot = 'digraph {';
        cadenaDot = cadenaDot + this.recorridoCst(cstXmlAsc.getRaiz());
        cadenaDot = cadenaDot + '}';
        return cadenaDot;
    }
    getCSTXmlDesc() {
        let cadenaDot = 'digraph {';
        cadenaDot += this.recorridoCst(cstXmlDesc.getRaiz());
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
}
const analizador = new Analizador();
export default analizador;
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
