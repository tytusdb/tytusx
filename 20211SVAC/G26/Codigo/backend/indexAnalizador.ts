import * as XMLGramAsc from './Gramatica/XML_GramaticaAsc';
import * as XQueryGram from './Gramatica/XQuery_GramaticaAsc';
import {Entorno} from './AST/Entorno';
import { Objeto } from './XML/Objeto';
import { Atributo } from './XML/Atributo';
import * as XMLGramDesc from './Gramatica/XML_GramaticaDesc';
import errores from './Global/ListaError';
import mierror from './Global/Error';
import * as XPathGramAsc from './Gramatica/XPath_GramaticaAsc';
import * as XPathGramDesc from "./Gramatica/XPath_GramaticaDesc";
import { Consulta } from './XPath/Consulta';
import {cstXmlAsc, cstXmlDesc, cstXpathAsc, cstXpathDesc} from './Reporte/CST';
import {Nodo} from './Reporte/Nodo';
import { InstruccionXQuery } from './Interfaz/instruccionXQuery';
import {TraduceXML } from './Traduccion/TraduceXML';
import * as OptimizacionGrammar from './Gramatica/Optimizacion_Grammar';
import { Optimizer } from './Optimizacion/Optimizer';
import { Optimizacion } from './Reporte/Optimizacion';
import { Declaracion3D } from './Optimizacion/Declaraciones3D/Declaracion3D';
import { Metodo } from './Optimizacion/Declaraciones3D/Metodo';
import { Main } from './Optimizacion/Declaraciones3D/Main';
import { Simbolo } from './AST/Simbolo';
import { TranslateXQuery } from './Traduccion/TranslateXQuery';

//const XPathGramAsc = require('../XPath_GramaticaAsc');
//const XPathGramDesc = require('../XPath_GramaticaDesc');

class Analizador{

  private static _instance: Analizador;
  global:Entorno;
  indice:number;
  reporteOptimiza: Array<Optimizacion>;
  consultas: Array<Consulta>;
  xPathEntry: string;
  instrucciones: InstruccionXQuery | null;
  xQueryEntry: string;
  xqGlobal: Entorno;
  constructor(){
    this.global = new Entorno('global', null, null);
    this.xqGlobal = new Entorno("XQGlobal", null, null);
    errores.limpiar();
    this.indice = 0;
    this.reporteOptimiza = [];
    this.consultas = [];
    this.xPathEntry = "";
    this.xQueryEntry = "";
    this.instrucciones = null;
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
    this.xqGlobal = new Entorno("XQGlobal", null, null);
    errores.limpiar();
  }

  limpiarOptimizacion(){
    this.reporteOptimiza = [];
  }
  
  optimizacion(entrada: string): string{
    const codigo3d = OptimizacionGrammar.parse(entrada);
    let salida = "";
    let optimizador = new Optimizer();
    //this.reporteOptimiza = [];
    let antes = "";
    codigo3d.forEach((c: Declaracion3D) => {
        antes += c.getCodigo3Dir()+"\n"
      if(c instanceof Main || c instanceof Metodo){
        c.listaInstrucciones = optimizador.aplicar(c.listaInstrucciones, this.reporteOptimiza);
      }      
        salida += c.getCodigo3Dir()+"\n"
    })

    console.log("REPORTE: ", this.reporteOptimiza);
    return salida;
  }

  xmlDescendente(entrada:string){    
    console.log("---GRAMATICA DESCENDENTE---");
    cstXmlDesc.id = 0;
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
    cstXmlAsc.id = 0;
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

  XPathAscendente(entrada: string): String {
    console.log("-- XPATH ASCENDENTE -- ")
    this.consultas = XPathGramAsc.parse(entrada);
    this.xPathEntry = entrada;
    let salida = "";
    console.log("---------------------------------------")
    this.consultas.forEach((elem: Consulta) => {
        console.log("CONSULTA: "+ elem.ToString());
        let resultado = elem.ejecutar(this.global);
        salida += elem.simbolosToString(resultado)+"\n";
        console.log("-----------RESULTADO----------------");
        console.log(resultado);
        console.log("StringResult:")
        console.log(elem.simbolosToString(resultado));
        console.log("---------------FIN---------------------")
    });
    return salida;
  }

  XPathDescendente(entrada: string): String {
    console.log("-- XPATH DESCENDENTE -- ");
    this.consultas = XPathGramDesc.parse(entrada);
    let salida = "";
    console.log("---------------------------------------");
    this.consultas.forEach((elem: Consulta) => {
      console.log("CONSULTA: " + elem.ToString());
      let resultado = elem.ejecutar(this.global);
      salida += elem.simbolosToString(resultado)+"\n";
      console.log("-----------RESULTADO----------------");
      console.log(resultado);
      console.log("TOSTRING:")
      console.log(elem.simbolosToString(resultado));
      console.log("---------------FIN---------------------");
    });
    return salida
  }


  XQueryAscendente(entrada: string): String{
    console.log("---- XQUERY ASCENDENTE ----- ")
    //this.iniciarVariables();
    this.xqGlobal = new Entorno("XQGlobal", null, null);
    this.instrucciones= XQueryGram.parse(entrada);
    console.log("instrucciones: ", this.instrucciones)
    this.xQueryEntry = entrada;
    let salida = "";
    if(this.instrucciones != null){
      salida += this.instrucciones.ejecutar(this.xqGlobal, this.global);
      console.log("s:", salida);
    }
    this.global.tsimbolos = this.global.tsimbolos.concat(this.xqGlobal.tsimbolos);
    console.log(this.global);
    console.log("SALIDA: ", salida);
    return salida;
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
    this.indice = 0;
    cadenaDot = 'digraph {'
                +  'tbl ['
                +    'shape=plaintext,'
                +    'label=<'
                +      '<table border="0" cellborder="1" color="#ddd" cellspacing="0">'
                +        '<tr bgcolor="#04AA6D">'
                +            '<td><b>NO.</b></td>'
                +            '<td><b>NOMBRE</b></td>'
                +            '<td><b>TIPO</b></td>'
                +            '<td><b>AMBITO</b></td>'
                +            '<td><b>NODO</b></td>'
                +            '<td><b>VALOR</b></td>'
                +            '<td><b>FILA</b></td>'
                +            '<td><b>COLUMNA</b></td>'
                +            '<td><b>POSICION</b></td>'
                +        '</tr>';
    cadenaDot = cadenaDot + this.getSimbolosEntorno(this.global);
    cadenaDot = cadenaDot +      '</table>'
                          +    '>];'
                          +'}';
    return cadenaDot;
  }

  getSimbolosEntorno(entrada:Entorno):string{
    let simbolos:string = '';
    entrada.tsimbolos.forEach((elem: any) => {
      if(elem.valor.valor instanceof Entorno){
        this.indice++;
        simbolos = simbolos
                +        '<tr>'
                +            '<td>'+this.indice+'</td>'
                +            '<td>'+elem.valor.getNombre()+'</td>'
                +            '<td>'+this.getTipoDato(elem.valor.getTipo())+'</td>'
                +            '<td>'+entrada.nombre+'</td>'
                +            '<td>'+elem.nombre+'</td>'
                +            '<td>Nodo</td>'
                +            '<td>'+elem.valor.getLinea()+'</td>'
                +            '<td>'+elem.valor.getColumna()+'</td>'
                +            '<td>'+elem.valor.getPosicion()+'</td>'
                +        '</tr>';
        simbolos = simbolos + this.getSimbolosEntorno(elem.valor.valor);
      }else{
        if(elem.valor.valor !== false){
          let valor;
          if(elem.valor.valor instanceof Array){
            if(elem.valor.valor[0] instanceof Simbolo){
              valor = "Simbolo "+elem.valor.valor[0].nombre;
            }else{
              valor = elem.valor.getValor().toString().replace('&','and')

            }
          }else{
            valor = elem.valor.getValor().toString().replace('&','and')
          }
          this.indice++;
          simbolos = simbolos
                  +        '<tr>'
                  +            '<td>'+this.indice+'</td>'
                  +            '<td>'+elem.valor.getNombre()+'</td>'
                  +            '<td>'+this.getTipoDato(elem.valor.getTipo())+'</td>'
                  +            '<td>'+entrada.nombre+'</td>'
                  +            '<td>'+elem.nombre+'</td>'
                  +            '<td>'+valor+'</td>'
                  +            '<td>'+elem.valor.getLinea()+'</td>'
                  +            '<td>'+elem.valor.getColumna()+'</td>'
                  +            '<td>'+elem.valor.getPosicion()+'</td>'
                  +        '</tr>';
        }
      }
    });
    return simbolos;
  }

  getTipoDato(t: number):string{
    switch(t){
        case 0: 
            return 'Texto';
        case 1:
            return 'Cadena';
        case 2:
            return 'Etiqueta';
        case 3:
            return 'Atributo';
        case 4: 
            return 'Variable XQuery';
    };
    return '';
  }

  getRepErrores():string{
    let cadenaDot:string = '';
    let indice:number = 0;
    cadenaDot = '<table class="tablaDatos" >'
                +        '<tr>'
                +            '<th>No.</th><th>Tipo</th><th>Descripcion</th><th>Linea</th><th>Columna</th>'
                +        '</th>';
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
    cadenaDot = cadenaDot +      '</table>';

    return cadenaDot;
  }

  getRepOptimizacion():string{
    let cadenaDot:string = '';
    let indice:number = 0;
    cadenaDot = '<table class="tblRepOpti" >'
                +        '<tr>'
                +            '<th>No.</th><th>CODIGO ANTES</th><th>CODIGO AHORA</th><th>REGLA</th><th>Columna</th><th>FILA</th>'
                +        '</th>';
    this.reporteOptimiza.forEach((elem:Optimizacion) => {
      indice++;
      cadenaDot = cadenaDot
                +        '<tr>'
                +            '<td>'+indice+'</td>'
                +            '<td>'+elem.getCodigoAntes()+'</td>'
                +            '<td>'+elem.getCodigoAhora()+'</td>'
                +            '<td>'+elem.tipoReglaToString()+'</td>'
                +            '<td>'+elem.getColumna()+'</td>'
                +            '<td>'+elem.getFila()+'</td>'
                +        '</tr>';
    });
    cadenaDot = cadenaDot +      '</table>';

    return cadenaDot;
  }

  getCSTXmlAsc():string{
    let cadenaDot:string = 'digraph {';
    cadenaDot = cadenaDot + this.recorridoCst(cstXmlAsc.getRaiz());
    cadenaDot = cadenaDot + '}';
    return cadenaDot;
  }

  getCSTXmlDesc():string{
    let cadenaDot:string = 'digraph {';
    cadenaDot += this.recorridoCst(cstXmlDesc.getRaiz());
    cadenaDot += '}';
    return cadenaDot;
  }

  private recorridoCst(nodo: Nodo | null):string{
    let concatena: string = '';
    if (nodo !== null){
      concatena += nodo.id + '[label="' + nodo.valor + '"];\n';
      nodo.hijos.forEach((hijo: Nodo) => {
        concatena += this.recorridoCst(hijo);
        concatena += nodo.id + ' -> ' + hijo.id + ';\n';
      });
    }
    return concatena;
  }

  
  public traduceXML():string{
    let resultado:string = '';
    let test = XPathGramDesc.parse(this.xPathEntry);
    console.log("this: ", this.instrucciones);
    let traductor = new TraduceXML(test, this.instrucciones, this.xqGlobal);
    resultado = traductor.traducirXML();
    console.log(this.global);
    return resultado;
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
