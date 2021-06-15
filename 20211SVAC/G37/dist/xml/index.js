"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {Atributo } from '../CLASES/Atributo';
const analizador = require('./GRAMATICAS/Gramatica1');
console.log("Esta funcionando todo");
//const ambito:Ambito = new Ambito(null);
let hash; // Tabla hash, que representa la tabla de simbolos interna del ambito
hash = {};
hash['hola'] = 'hola';
const elementos = analizador.parse(`
<?xml version="1.0" encoding="UTF-8"?>
<bookstore libreria="Usac" ciudad="Guatemala">
  <book category="children">
          hola    &amp; mundo
    <title>   !ABC ABC</title>
    <author>!2013 = "abc_123"
    continuacion </author>
    <year>2005</year>
    <price>
        29.99
        <WORK>ABC</WORK>
    </price>
  </book>
  <book2 category="web &amp;">
    <title2>Learning   XML</title2>
    <author2>Erik     T. Ray = ""?</author2>
    <year2>2003</year2>
    <price2>39.95</price2>
  </book2>
</bookstore>
`);
//console.log(typeof elementos);
let elementosCast = elementos;
const ambitoGlobal = elementosCast.construirTablaSimbolos(null);
console.log(ambitoGlobal);
