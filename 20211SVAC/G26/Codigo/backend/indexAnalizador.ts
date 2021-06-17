import * as XMLGramAsc from './Gramatica/XML_GramaticaAsc';
import {Entorno} from './AST/Entorno';
import { Objeto } from './XML/Objeto';
import { Atributo } from './XML/Atributo';
import * as XMLGramDesc from './Gramatica/XML_GramaticaDesc';
import errores from './Global/ListaError';
import mierror from './Global/Error';
import * as XPathGramAsc from './Gramatica/XPath_GramaticaAsc';
import * as XPathGramDesc from "./Gramatica/XPath_GramaticaDesc";
import { Consulta } from './XPath/Consulta';

//const XPathGramAsc = require('../XPath_GramaticaAsc');
//const XPathGramDesc = require('../XPath_GramaticaDesc');

class Analizador{

  private static _instance: Analizador;
  global:Entorno;

  constructor(){
    this.global = new Entorno('global', null, null);
    errores.limpiar();

    if (typeof Analizador._instance === "object"){
      return Analizador._instance;
    }
    Analizador._instance = this;
    return this;
  }
  
  public static getInstance() {
    return this._instance;
  }

  iniciarVariables(){
    this.global = new Entorno('global', null, null);
    errores.limpiar();
  }

  xmlDescendente(entrada:string){    
    console.log("---GRAMATICA DESCENDENTE---");
    const objetos = XMLGramDesc.parse(entrada);
    objetos.forEach((elem: any) => {
      if (elem instanceof Objeto || elem instanceof Atributo){
        elem.ejecutar(this.global);
      }
    });
    console.log(this.global);
    console.log(errores);
  }

  xmlAscendente(entrada:string){
    console.log("---GRAMATICA ASCENDENTE---")
    const objetos = XMLGramAsc.parse(entrada);
    this.global = new Entorno('global', null, null);  
    if(objetos !== null){    
      objetos.forEach((elem: any) => {
          console.log('Elemento: ' + elem);
          if (elem instanceof Objeto || elem instanceof Atributo){
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

  XPathAscendente(entrada: string) {
    console.log("-- XPATH ASCENDENTE -- ")
    const consultas = XPathGramAsc.parse(entrada);
    console.log("---------------------------------------")
    consultas.forEach((elem: Consulta) => {
        console.log("CONSULTA: "+ elem.ToString());
        let resultado = elem.ejecutar(this.global);
        console.log("-----------RESULTADO----------------");
        console.log(resultado);
        console.log("---------------FIN---------------------")
    });  
  }

  XPathDescendente(entrada: string) {
    console.log("-- XPATH DESCENDENTE -- ");
    const consultas = XPathGramDesc.parse(entrada);
    console.log("---------------------------------------");
    consultas.forEach((elem: Consulta) => {
      console.log("CONSULTA: " + elem.ToString());
      let resultado = elem.ejecutar(this.global);
      console.log("-----------RESULTADO----------------");
      console.log(resultado);
      console.log("---------------FIN---------------------");
    });
  }

  getTablaSimbolos(){
    return this.global;
  }

  getErrores():string{
    let err:string = '';
    errores.listaError.forEach((elem:mierror) => {
      err = err + elem.getMensaje() + '\n';
    })
    return err;
  }
  
  getRepTablaSimbolos():string{
    let cadenaDot:string = '';
    let tabla:Array<any> = this.global.tsimbolos;
    let indice:number = 0;
    
    cadenaDot = 'digraph {'
                +  'tbl ['
                +    'shape=plaintext,'
                +    'label=<'
                +      '<table border="0" cellborder="1" color="blue" cellspacing="0">'
                +        '<tr>'
                +            '<td>No.</td><td>Nombre</td><td>Tipo</td><td>Ambito</td><td>Nodo</td><td>Fila</td><td>Columna</td>'
                +        '</tr>';
    tabla.forEach((elem: any) => {
      indice++;
      cadenaDot = cadenaDot
                +        '<tr>'
                +            '<td>'+indice+'</td>'
                +            '<td>'+elem.valor.nombre+'</td>'
                +            '<td>'+this.getTipoDato(elem.valor.tipo)+'</td>'
                +            '<td>'+elem.nombre+'</td>'
                +            '<td>'+elem.nombre+'</td>'
                +            '<td>'+elem.valor.linea+'</td>'
                +            '<td>'+elem.valor.columna+'</td>'
                +        '</tr>';
    });
    cadenaDot = cadenaDot +      '</table>'
                          +    '>];'
                          +'}';
    return cadenaDot;
  }

  getTipoDato(t: number):string{
    switch(t){
        case 1:
            return 'Cadena';
        case 2:
            return 'Etiqueta';
        case 3:
            return 'Atributo';
    };
    return '';
  }

  getRepErrores():string{
    let cadenaDot:string = '';
    let indice:number = 0;
    cadenaDot = 'digraph {'
                +  'tbl ['
                +    'shape=plaintext,'
                +    'label=<'
                +      '<table border="0" cellborder="1" color="blue" cellspacing="0">'
                +        '<tr>'
                +            '<td>No.</td><td>Tipo</td><td>Descripcion</td><td>Fila</td><td>Columna</td>'
                +        '</tr>';
    errores.listaError.forEach((elem:mierror) => {
      indice++;
      cadenaDot = cadenaDot
                +        '<tr>'
                +            '<td>'+indice+'</td>'
                +            '<td>'+elem.getTipo()+'</td>'
                +            '<td>'+elem.getDescripcion()+'</td>'
                +            '<td>'+elem.getLinea()+'</td>'
                +            '<td>'+elem.getColumna()+'</td>'
                +        '</tr>';
    });
    cadenaDot = cadenaDot +      '</table>'
                          +    '>];'
                          +'}';

    return cadenaDot;
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
