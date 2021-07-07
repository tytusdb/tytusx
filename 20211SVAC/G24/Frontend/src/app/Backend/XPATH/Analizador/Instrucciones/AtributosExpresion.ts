
import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../../../XML/Analizador/Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';


export default class AtributoExpresion extends Instruccion {
    public Operacion: string;
    public expresion: Instruccion;
    constructor(select: string,expresion:Instruccion, fila: number, columna: number){
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.Operacion = select
        this.expresion=expresion
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {

    }
    getNodosAST(): nodoAST {
        var nodo= new nodoAST("ATRIBUTO"); //PADRE SELECT
        if(this.expresion!=null){
            nodo.agregarHijo(this.Operacion)
            nodo.agregarHijoAST(this.expresion.getNodosAST())
           
        }
        
        return nodo;
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error('Method not implemented.');
      }
}