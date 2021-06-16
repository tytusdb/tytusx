import { Entorno } from "../controllers/xml/entorno.controller";
import { Tipo } from "./tipo.model";
import { ArbolXML } from "./xmlArbol.model";

export interface Nodo {
  linea: number;
  columna: number;

  getTipo(entorno: Entorno, arbolXML: ArbolXML): Tipo;
  getValor(entorno: Entorno, arbolXML: ArbolXML): any;
}
