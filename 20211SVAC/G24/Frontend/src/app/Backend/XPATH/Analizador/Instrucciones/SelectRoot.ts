import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import NodoErrores from '../Excepciones/NodoErrores';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../../../XML/Analizador/Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class SelectRoot extends Instruccion {
    public Operacion: string;
    public Operacion2:string;
    constructor(select: string, fila: number, columna: number,select2?:string){

        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.Operacion = select
        this.Operacion2= select2
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    getNodosAST(): nodoAST {
        var nodo= new nodoAST("ALL"); //PADRE SELECT
        var nodoselect= new nodoAST(this.Operacion)
        nodo.agregarHijoAST(nodoselect)
        if(this.Operacion2!=null){
            var nodohijo2= new nodoAST(this.Operacion2); //PADRE SELECT
            nodo.agregarHijoAST(nodohijo2)
        }
        
        return nodo;
    }
}