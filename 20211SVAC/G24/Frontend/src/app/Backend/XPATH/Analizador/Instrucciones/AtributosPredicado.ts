import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import NodoErrores from '../Excepciones/NodoErrores';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class AtributosPredicado extends Instruccion {
   
    public Identificador: string;
    public Corchetes: Instruccion
    constructor(select: string, lcorchetes:Instruccion, fila: number, columna: number){
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.Identificador = select
        this.Corchetes= lcorchetes
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    getNodosAST(): nodoAST {
        var nodo= new nodoAST('ATRIBUTOS'); //PADRE SELECT
        /**TIPOS DE ATRIBUTOS
         * ATRIBUTOS EXPRESION (TIPO INSTRUCCION)
         * ATRIBUTOS SELECT
         * ATRIBUTOS MULTIPLICACION
         * ATRIBUTOS IDENTIFICADOR L_CORCHETES 
         * libro[][]
         * @año[]
         */
        if(this.Identificador!=null){
            nodo.agregarHijo("@");
            nodo.agregarHijo(this.Identificador);
            
        }
        
        if(this.Corchetes!=null){
            
            nodo.agregarHijoAST(this.Corchetes.getNodosAST())
           
        }
        
        return nodo;
    }
}