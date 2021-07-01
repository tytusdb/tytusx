import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import Arbol from "../Simbolo/Arbol";
import Tipo from "../Simbolo/Tipo";

export abstract class Instruccion {
    public tipoDato: Tipo;
    public fila: number;
    public columna: number;
    constructor(tipo: Tipo, fila: number, columna: number) {
      this.tipoDato = tipo;
      this.fila = fila;
      this.columna = columna;
    }
  
    abstract interpretar(arbol: Arbol, tabla: tablaSimbolos): any;
    
  }