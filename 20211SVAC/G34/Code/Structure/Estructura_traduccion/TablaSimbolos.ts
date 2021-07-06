enum Tipo {
  STRING,
  INT,
  DOUBLE,
  BOOL,
  VOID,
  OBJETO,
  ATRIBUTO,
  NULL,
  ARRAY
}

import * as enumGlobal from "../Estructura_traduccion/Listado_enums";
import * as Globals3d from "../Estructura_traduccion/Estructuras_estaticas";

export function Simbolo(identificador: string, tipo: enumGlobal.TIPO_PRIMITIVO, entorno: string, tipoEtiqueta: boolean, pos: number, dimencion: number, parametros: any, tam: number, tipoS: enumGlobal.TIPO_SIMBOLO) {
  return {
    identificador: identificador,
    tipo: tipo,
    entorno: entorno,
    tipoEtiqueta: tipoEtiqueta,
    posicion: pos,
    dimenciones: dimencion,
    parametros: parametros,
    tam: tam,
    tipoObjeto: tipoS
  }
}

export class TabladeSimbolos {
  //Clase tabla simbolos
  public simbolos: any;
  entorno: string;

  constructor(tabla: any, entorno: string) {
    this.simbolos = tabla;
    this.entorno = entorno;
  }

  setEntorno(entorno: string) {
    this.entorno = entorno;
  }

  setValor(valor: any) {
    this.simbolos.valor = valor;
  }

  setSimbolo(identificador: string, tipo: enumGlobal.TIPO_PRIMITIVO, alcance: string, tipoEtiqueta: boolean, pos: number, dimencion: number, parametros: any, tam: number, tipoS: enumGlobal.TIPO_SIMBOLO) {
    const NuevoSimbolo = Simbolo(identificador, tipo, alcance, tipoEtiqueta, pos, dimencion, parametros, tam, tipoS);
    this.simbolos.push(NuevoSimbolo);
  }

  setHijo(hijo: any) {
    this.simbolos.push(hijo);
  }
  getSimbolo(identificador: string): any {
    const simbolo = this.simbolos.filter((simbolo: any) => simbolo.identificador === identificador)[0];
    if (simbolo) return simbolo;
    else return "ERROR";
  }

  getAlcance(): string {
    return this.entorno;
  }

  getVariablesLocales(): number {
    return this.simbolos.length + Globals3d.g_temporales - Globals3d.temporalInicial;
  }




}