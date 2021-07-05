import { AstXml } from "./Code/AnalizerXML";
import { AstXquery } from "./Code/AnalizerXquery";
import { NodeError } from "./Code/Structure/Node";
import { GrammarReport } from "./Code/Util/GrammarReport";
import * as Gui from "./Gui";

import {
  createXmlParser,
  createXpathParser,
  createOptimizerParser,
} from "./Grammar";

import { Optimizador } from "./Code/Optimizer/optimizador";
import { Optimizacion } from "./Code/Optimizer";

//DECLARACION DE VARIABLES
export let errorsXML: Array<NodeError>; // Lista para errores lexicos, sintacticos y semanticos para xml
export let errorsXPATH: Array<NodeError>; // Lista para errores lexicos, sintacticos y semanticos para xpath
export let lstLabelXML: AstXml; // Lista de etiquetas de la gramatica xml
export let lstxquery: AstXquery;
export let optimizacionCode: string;
export let optimizacionReport: Array<Optimizacion>;
// export let lstAddress: Array<any>; // Lista de rutas de la gramatica xpath
export let rg: GrammarReport; // Lista para el reporte gramatical del xml
export let rgquerys: GrammarReport; // Lista para el reporte gramatical de los querys

export let encodingxml: string; // UTF 8, ASCII, ISO 9000
export let versionxml: string; // version del xml

export const analyzerXml = (input: string): AstXml => {
  errorsXML = new Array<NodeError>();
  rg = new GrammarReport();
  const XmlParser = createXmlParser(errorsXML, rg);
  lstLabelXML = XmlParser.parse(input) as AstXml;
  return lstLabelXML;
};

export const analyzerXpath = (input: string): AstXquery => {
  errorsXPATH = new Array<NodeError>();
  rgquerys = new GrammarReport();
  const XpathParser = createXpathParser(errorsXPATH, rgquerys);
  XpathParser.parse(input);
  const ast = XpathParser.parse(input);
  lstxquery = ast;
  return ast;
};

export const analyzerOptimizer = (input: string): Optimizador => {
  errorsXPATH = new Array<NodeError>();
  rgquerys = new GrammarReport();
  const XpathParser = createOptimizerParser(errorsXPATH, rgquerys);
  const instrucciones = XpathParser.parse(input);
  const optimizador = new Optimizador(instrucciones);
  optimizador.optimizar();

  //console.log("CODIGO OPTIMIZADO");
  //console.log(optimizador.getCodigo());
  optimizacionCode = optimizador.getCodigo().toString();
  Gui.optconsola.innerHTML = optimizacionCode;
  //console.log("REPORTE OPTIMIZACIONES");
  //console.log(optimizador.getOptimizaciones());
  optimizacionReport = optimizador.getOptimizaciones();
  reportOptimizacion();
  return optimizador;
};

const reportOptimizacion = () => {
  try {
    let cadena: string =
      "<thead><tr>" +
      "<th scope='col'>No.</th>" +
      "<th scope='col'>Codigo Anterior</th>" +
      "<th scope='col'>Codigo Nuevo</th>" +
      "<th scope='col'>Regla</th>" +
      "<th scope='col'>Linea</th>" +
      "</tr></thead>" +
      "<tbody id='contts'>";
    let p = 0;
    optimizacionReport.forEach((err) => {
      p = p + 1;
      cadena +=
        "<tr>\n<th scope='row'>" +
        p +
        "</th>\n" +
        "<td scope='row'>" +
        err.antiguo +
        "</td>\n" +
        "<td>" +
        err.nuevo +
        "</td>\n" +
        "<td>" +
        err.regla +
        "</td>\n" +
        err.linea +
        "</td>\n" +
        "</tr>\n";
    });
    Gui.tbodyoptimizacion.innerHTML = cadena;
  } catch (error) {
    Gui.consola.doc.setValue(
      "Mensaje Grupo34 >> No se realizo el reporte de errores XML.\n"
    );
  }
};

export const translateXml = (input: string): AstXml => {
  errorsXML = new Array<NodeError>();
  rg = new GrammarReport();
  const XmlParser = createXmlParser(errorsXML, rg);
  lstLabelXML = XmlParser.parse(input) as AstXml;
  return lstLabelXML;
};
