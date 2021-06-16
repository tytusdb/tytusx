import * as XMLGramAsc from './Gramatica/XML_GramaticaAsc';
import {Entorno} from './AST/Entorno';
import { Objeto } from './XML/Objeto';
import { Atributo } from './XML/Atributo';
import * as XMLGramDesc from './Gramatica/XML_GramaticaDesc';
import errores from './Global/ListaError';
import mierror from './Global/Error';
import * as XPathGramAsc from './Gramatica/XPath_GramaticaAsc';
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