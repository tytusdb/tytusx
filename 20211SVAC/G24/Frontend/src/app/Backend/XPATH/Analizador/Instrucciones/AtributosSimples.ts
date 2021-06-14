import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import Errores from '../Excepciones/Errores';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class All extends Instruccion {
    public Operacion: string;
    constructor(select: string, fila: number, columna: number){
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.Operacion = select
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    getNodo(): nodoAST {
        var nodo= new nodoAST('ALL'); //PADRE SELECT
        nodo.agregarHijo(this.Operacion);
        return nodo;
    }
}