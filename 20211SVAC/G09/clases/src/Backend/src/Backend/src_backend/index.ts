
import { Fila } from './Xml/Fila';
import { XmlResultado } from './Xml/XmlResultado';
//import { SimbolsReport } from './Reportes/TablaSimbolos'
import Parser from '../build/Grammar/xmlA.js'

import parserXpath from '../build/Grammar/xpathA.js'

import ParserD from '../build/Grammar/xmlD.js'

import parserXpathD from '../build/Grammar/xpathD.js'
import { ReporteGramatica } from '../build/Reportes/ReporteGramatica.js';
import { ControlError } from '../build/Xpath/ControlError.js';
import { Observable } from 'rxjs';





const port = 3000;
//const parserXpath = require('./Grammar/xpathA.js');






export function Analizar_XML(entrada: string,texto_path:string) {

  // aqui voy a vaciar antes que nada los nuevos simbolos
  //imbolsReport.aux = "";


  /**
   * 
   * const tree:XmlResultado = parser.parse(entrada)
  const {XmlResultado,errores} = parser.parse(entrada);
  //const {resXpath, errores} = parserXpath.parse("#//videojuego")
  const {resXpathD, erroresD}  = parserxpathD.parse("#//videojuego@")
  console.log("Respuesta xpathD:")
  console.log(JSON.stringify(resXpathD, null, 2))
  console.log("\nResultado de busqueda:")
  console.log(tree.getAsTable().buscar(resXpathD))
 // console.log(graficar(errores))
  console.log(graficar(erroresD))
   * 
   * 
   * */ 
  //console.log("suu adentro papasito")
 
 let Rxpath="";
 
    

  const tree: XmlResultado =Parser.parse(entrada)
  
 const resXpath:any = parserXpath.parse(texto_path)
  // Rxpath+="Respuesta xpath:"
   Rxpath+=resXpath
  //console.log("\nResultado de busqueda:")
  Rxpath+=tree.getAsTable().buscar(resXpath);






  /*  aqui termina el llenado de la tabla de simbolos **/





  console.log(tree.getErroresSemanticos())
  // console.log(Xpath)
  //console.log(tree.getCstDotA());
 /// console.log(ControlError.ListaE)
  //console.log("alv"+ReporteGramatica.Lista)
  var alv ={

    ReporteGramatica:ReporteGramatica.Lista,
   cst:tree.getCstDotA(),
   simbolo: tree.getAsTable().filas,
   consulta:Rxpath,
   Error:ControlError.ListaE,
   Encoding:tree.etiquitaInicio.encoding
   

  }

  ControlError.ListaE = []
  ReporteGramatica.Lista=[]

  return alv

}



export function Analisis_D(entrada: string,texto_path:string) {

  // aqui voy a vaciar antes que nada los nuevos simbolos
  //imbolsReport.aux = "";


  /**
   * 
   * const tree:XmlResultado = parser.parse(entrada)
  const {XmlResultado,errores} = parser.parse(entrada);
  //const {resXpath, errores} = parserXpath.parse("#//videojuego")
  const {resXpathD, erroresD}  = parserxpathD.parse("#//videojuego@")
  console.log("Respuesta xpathD:")
  console.log(JSON.stringify(resXpathD, null, 2))
  console.log("\nResultado de busqueda:")
  console.log(tree.getAsTable().buscar(resXpathD))
 // console.log(graficar(errores))
  console.log(graficar(erroresD))
   * 
   * 
   * */ 
  //console.log("suu adentro papasito")
 
 let Rxpath="";
 


  const tree: XmlResultado =ParserD.parse(entrada)


  const alv2=ParserD.parse(entrada)
 const resXpath:any = parserXpathD.parse(texto_path)
   Rxpath+="Respuesta xpath:"
   Rxpath+=resXpath
  //console.log("\nResultado de busqueda:")
  Rxpath+=tree.getAsTable().buscar(resXpath);






  /*  aqui termina el llenado de la tabla de simbolos **/





  console.log(tree.getErroresSemanticos())
  // console.log(Xpath)
  //console.log(tree.getCstDotA());
 // console.log(ControlError.ListaE)
  //console.log("alv"+ReporteGramatica.Lista)
  var alv ={

    ReporteGramatica:ReporteGramatica.Lista,
   cst:tree.getCstDotD(),
   simbolo: tree.getAsTable().filas,
   consulta:Rxpath,
   Error:ControlError.ListaE,
   Encoding:tree.etiquitaInicio.encoding
   

  }

  ControlError.ListaE = []
  ReporteGramatica.Lista=[]

  return alv

}
