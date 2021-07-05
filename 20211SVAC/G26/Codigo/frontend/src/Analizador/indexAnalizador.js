import * as XMLGramAsc from './Gramatica/XML_GramaticaAsc';
import * as XQueryGram from './Gramatica/XQuery_GramaticaAsc';
import * as XQuery from './Gramatica/XQuery';
import { Entorno } from './AST/Entorno';
import { Objeto } from './XML/Objeto';
import { Atributo } from './XML/Atributo';
import * as XMLGramDesc from './Gramatica/XML_GramaticaDesc';
import errores from './Global/ListaError';
import * as XPathGramAsc from './Gramatica/XPath_GramaticaAsc';
import * as XPathGramDesc from "./Gramatica/XPath_GramaticaDesc";
import { cstXmlAsc, cstXmlDesc } from './Reporte/CST';
import { TraduceXML } from './Traduccion/TraduceXML';
import * as OptimizacionGrammar from './Gramatica/Optimizacion_Grammar';
import { Optimizer } from './Optimizacion/Optimizer';
import { Metodo } from './Optimizacion/Declaraciones3D/Metodo';
import { Main } from './Optimizacion/Declaraciones3D/Main';
//const XPathGramAsc = require('../XPath_GramaticaAsc');
//const XPathGramDesc = require('../XPath_GramaticaDesc');
class Analizador {
    constructor() {
        this.global = new Entorno('global', null, null);
        this.xqGlobal = new Entorno("XQGlobal", null, null);
        errores.limpiar();
        this.indice = 0;
        this.reporteOptimiza = [];
        this.consultas = [];
        this.xPathEntry = "";
        this.xQueryEntry = "";
        this.instrucciones = null;
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
        this.xqGlobal = new Entorno('xqGlobal', null, null);
        errores.limpiar();
    }
    optimizacion(entrada) {
        const codigo3d = OptimizacionGrammar.parse(entrada);
        let salida = "";
        let optimizador = new Optimizer();
        this.reporteOptimiza = [];
        let antes = "";
        codigo3d.forEach((c) => {
            antes += c.getCodigo3Dir() + "\n";
            if (c instanceof Main || c instanceof Metodo) {
                c.listaInstrucciones = optimizador.aplicar(c.listaInstrucciones, this.reporteOptimiza);
            }
            salida += c.getCodigo3Dir() + "\n";
        });
        console.log("REPORTE: ", this.reporteOptimiza);
        return salida;
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
        //this.iniciarVariables();
        this.xqGlobal = new Entorno("XQGlobal", null, null);
        this.instrucciones = XQueryGram.parse(entrada);
        console.log("instrucciones: ", this.instrucciones);
        this.xQueryEntry = entrada;
        let salida = "";
        if (this.instrucciones != null) {
            salida += this.instrucciones.ejecutar(this.xqGlobal, this.global);
            console.log("s:", salida);
        }
        this.global.tsimbolos = this.global.tsimbolos.concat(this.xqGlobal.tsimbolos);
        console.log(this.global);
        console.log("SALIDA: ", salida);
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
            if (elem.valor.valor instanceof Entorno) {
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
    traduceXML() {
        let resultado = '';
        let traductor = new TraduceXML(this.consultas);
        resultado = traductor.traducirXML();
        console.log(this.global);
        return resultado;
    }
}
const analizador = new Analizador();
export default analizador;
function pruebaXQuery(entrada) {
    console.log("-- XQUERY --");
    const objetos = XQuery.parse(entrada);
    objetos.forEach((elem) => {
        console.log(elem);
    });
}
pruebaXQuery(`
declare function local:ackerman($m as xs:integer, $n as xs:integer ) as xs:integer
{
  if ($m eq 0) then $n+1
  else if ($m gt 0 and $n eq 0) then local:ackerman($m - 1, 1)
  else local:ackerman ($m - 1, local:ackerman($m, $n - 1))
};

declare function local:factorial($x as xs:integer)as xs:integer
{
  if ($x eq 0) then 1
  else ($x*local:factorial($x - 1))
};

declare function local:fibonacci($num as xs:integer) as xs:integer
{
  let $a := $num + 1
  let $b := $a * 8
  for $l in (4 to 6)
  return if ($num eq 0) then 0
  else if ($num eq 1) then 1
  else (local:fibonacci($num - 1) + local:fibonacci($num - 2))
};

declare function local:tipo1() as xs:integer
{
  let $a := 1
  let $b := $a * 8
  return local:fibonacci($a - 2)
};

declare function local:tipo2() as xs:integer
{
  for $a in (1)
  where $a/price < 5
  let $b := $a * 8
  return if ($b eq 8) then local:factorial($a)
else 5
};

let $go := 5
let $ruta := /pruebas
`);
/*
declare function local:ackerman($m as xs:integer, $n as xs:integer ) as xs:integer
{
  if ($m eq 0) then $n+1
  else if ($m gt 0 and $n eq 0) then local:ackerman($m - 1, 1)
  else local:ackerman ($m - 1, local:ackerman($m, $n - 1))
};

declare function local:factorial($x as xs:integer)as xs:integer
{
  if ($x eq 0) then 1
  else ($x*local:factorial($x - 1))
};

declare function local:fibonacci($num as xs:integer) as xs:integer
{
  let $a := $num + 1
  let $b := $a * 8
  for $l in (4 to 6)
  return if ($num eq 0) then 0
  else if ($num eq 1) then 1
  else (local:fibonacci($num - 1) + local:fibonacci($num - 2))
};

declare function local:tipo1() as xs:integer
{
  let $a := 1
  let $b := $a * 8
  return local:fibonacci($a - 2)
};

declare function local:tipo2() as xs:integer
{
  for $a in (1)
  where $a < 5
  let $b := $a * 8
  return if ($b eq 8) then local:factorial($a)
else 5
};



let $go := (1,3)
let $ruta := /pruebas
for $x in (1 to 2)
let $y := (4)
return if(1 eq 1) then "FUNCIONA"
else "NO FUNCIONA"

(:
return if ($ruta/m eq 5) then local:tipo2()
else 3
(:($y eq 4) then local:tipo2()
else local:factorial(0):)
:)
*/
/*pruebaXQuery(`
declare function local:ackerman($m as xs:integer, $n as xs:integer ) as xs:integer
{
  if ($m eq 0) then $n+1
  else if ($m gt 0 and $n eq 0) then local:ackerman($m - 1, 1)
  else local:ackerman ($m - 1, local:ackerman($m, $n - 1))
};


declare function local:factorial($x as xs:integer)as xs:integer
{
  if ($x eq 0) then 1
  else ($x*local:factorial($x - 1))
};

declare function local:fibonacci($num as xs:integer) as xs:integer
{
  for $l in (4 to 6)
  return if ($num eq 0) then 0
  else if ($num eq 1) then 1
  else (local:fibonacci($num - 1) + local:fibonacci($num - 2))
};

let $go := (5)
for $x in (1 to 2)
let $y := (4)
return if ($y eq 4) then local:factorial($y)
else local:factorial(0)
`);
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
