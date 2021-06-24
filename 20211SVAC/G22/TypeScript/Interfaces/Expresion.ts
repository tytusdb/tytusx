
import { AST } from "../Arboles/AST";
import { Entorno } from "../Arboles/Entorno";
import { Tipo } from "../Arboles/Tipo";

export interface Expresion {
  linea: number;
  columna: number;
    
  getTipo(ent: Entorno, arbol: AST): Tipo;
  getValorImplicito(ent: Entorno, arbol: AST): any;
}