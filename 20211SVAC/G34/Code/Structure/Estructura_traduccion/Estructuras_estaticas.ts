import { AST } from "./AST";
import { Instruccion } from "./Instruccion";
import { etiqueta3d } from "./etiqueta3d";
import { Codigo3d } from "./Codigo3d";
import { TabladeSimbolos } from "./TablaSimbolos";
import { TIPO_PRIMITIVO } from "./Listado_enums";

//Tabla de simbolos global
export let tsGlobal = new TabladeSimbolos([], "global");

//estructura para manejar etiquetas inicio y fin en codigo 3D
export let l_switch: [etiqueta3d];

export let temporalInicial: number = 0;

//estructura que maneja las funciones dentro de la traduccion
export let l_funciones: { [id: string]: TIPO_PRIMITIVO };

//manejo de temporal 
export let g_temporales: number = 30;

//manejo de etiqueta 3d
export let g_etiquetas: number = 100;

//variable para escritura de codigo 3d
export let str_codigo3d = new Codigo3d();

export let etqSalida: String;

export function inicializarFunciones() {
  l_funciones = {};
}

export function setTemporalInicio() {
  temporalInicial = g_temporales;
}

export function setFuncion(id: string, tipo: TIPO_PRIMITIVO) {
  l_funciones[id] = tipo;
}

export function getFuncion(id: string): any {
  id = id.toLowerCase();
  if (l_funciones[id] !== undefined) {
    return l_funciones[id];
  }
  return null;
}

export function getTemporal3d(): string {
  const actual = g_temporales;
  g_temporales++;
  return "T" + actual.toString();
}

export function getEtiqueta3d(): string {
  const actual = g_etiquetas;
  g_etiquetas++;
  return "L" + actual.toString();
}

export function setEtiquetaSalida() {
  etqSalida = getEtiqueta3d();
}

export function TraducirXML(entrada: string) {
  tsGlobal = new TabladeSimbolos([], "global");
  // l_switch = [];
  l_funciones = {};
  g_temporales = 0;
  g_etiquetas = 0;
  str_codigo3d = new Codigo3d();
  str_codigo3d.setValor('\n');
  /*const instrucciones = gramatica_xml_asc.parse(entrada);

  const ast: AST = new AST(instrucciones);

  console.log(instrucciones);


  instrucciones.forEach((element: Instruccion) => {
    element.traducir(ast);
  });*/
}