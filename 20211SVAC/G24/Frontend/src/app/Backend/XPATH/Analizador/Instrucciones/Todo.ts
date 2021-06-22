import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../../../XML/Analizador/Simbolos/tablaSimbolos';
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
    getNodosAST(): nodoAST {
        var nodo= new nodoAST(this.Operacion); //PADRE SELECT    
        return nodo;
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error('Method not implemented.');
    }
}