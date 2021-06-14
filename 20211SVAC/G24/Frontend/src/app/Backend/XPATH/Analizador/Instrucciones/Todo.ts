import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';


export default class Todo extends Instruccion {
    public Operacion: string;
    constructor(select: string, fila: number, columna: number){
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.Operacion = select
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    getNodo(): nodoAST {
        var nodo= new nodoAST("ATRIBUTOS"); //PADRE SELECT
        var all= new nodoAST("MULTIPLICACION")
        all.agregarHijo(this.Operacion)
        nodo.agregarHijoAST(all);
        
        return nodo;
    }
}