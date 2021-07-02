import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";

export default class Nativo extends Instruccion {

  valor: any;
  constructor(tipo: Tipo, valor: any, fila: number, columna: number) {
    super(tipo, fila, columna);
    this.valor = valor;
    if (tipo.getTipo() == tipoDato.CADENA) {
      let val = this.valor.toString();
      this.valor = val
        .replace('\\n', '\n')
        .replace('\\t', '\t')
        .replace('\\r', '\r')
        .replace('\\\\', '\\')
        .replace("\\'", "'")
        .replace('\\"', '"');
    }
  }

  public getNodoAST(): nodoAST {
    let nodo = new nodoAST('NATIVO');
    nodo.agregarHijo(this.valor + '');
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
    if (this.tipoDato.getTipo() == tipoDato.BOOLEANO) {
      return this.valor == 'true' ? true : false;
    }
    return this.valor;
  }
  codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
    throw new Error('Method not implemented.');
  }
}
