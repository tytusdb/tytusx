import { Instruccion } from '../Abstracto/Instruccion';
import Arbol from '../Simbolos/Arbol';
import nodoAST from '../Abstracto/nodoAST';
import tablaSimbolos from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class IdentificadorPredicado extends Instruccion {
   
    public Identificador: string;
    public Corchetes: Instruccion
    constructor(Identificador: string, lcorchetes:Instruccion, fila: number, columna: number){
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.Identificador = Identificador;
        this.Corchetes= lcorchetes
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    getNodosAST(): nodoAST {
        var nodo= new nodoAST('IDENTIFICADOR'); //PADRE SELECT
        /**TIPOS DE ATRIBUTOS
         * ATRIBUTOS EXPRESION (TIPO INSTRUCCION)
         * ATRIBUTOS SELECT
         * ATRIBUTOS MULTIPLICACION
         * ATRIBUTOS IDENTIFICADOR L_CORCHETES 
         * libro[][]
         * @año[]
         */
        if(this.Identificador!=null){
            nodo.agregarHijo("identificador");
            nodo.agregarHijo(this.Identificador);
            
        }
        
        if(this.Corchetes!=null){
            
            nodo.agregarHijoAST(this.Corchetes.getNodosAST())
           
        }
        
        return nodo;
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error('Method not implemented.');
      }
}