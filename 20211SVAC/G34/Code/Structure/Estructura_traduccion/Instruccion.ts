import { AST } from "./AST";
import * as enumGlobal from "../Estructura_traduccion/Listado_enums"

export interface Instruccion {
  linea: number;
  columna: number;
  tipoValor: enumGlobal.TIPO_PRIMITIVO;
  valor_temporal: any;
  etiqueta_verdadera: Array<string>;
  etiqueta_falsa: Array<string>;
  etiqueta_inicio: any;
  etiqueta_fin: any;

  traducir(arbol: AST): any;
}