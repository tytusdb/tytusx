import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/NodoAST";
import Excepcion from "../Excepciones/NodoErrores";
import Arbol from "../Simbolos/Arbol";
import  Simbolo  from "../Simbolos/Simbolo";
import tablaSimbolos from "../../../XML/Analizador/Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";
import { NumericLiteral } from "typescript";

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
   
    public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
      return this.identificador;
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
      throw new Error('Method not implemented.');
    }


  }
  