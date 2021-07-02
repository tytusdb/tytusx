import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";

export default class Identificador extends Instruccion {
    getNodoAST(): nodoAST {
        let nodo = new nodoAST(this.identificador);
        return nodo;
    }

    public identificador: string;
    constructor(identificador: string, fila: number, columna: number) {
      super(new Tipo(tipoDato.CADENA), fila, columna);
      this.identificador = identificador.toLowerCase();
    }
   
    public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
      return this.identificador;
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
      throw new Error('Method not implemented.');
    }


  }
  