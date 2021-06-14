import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import Errores from '../Excepciones/Errores';
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
    getNodo(): nodoAST {
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
            var nodito= new nodoAST('IDENTIFICADOR')
            nodito.agregarHijo(this.Identificador);
            nodo.agregarHijoAST(nodito);
        }
        
        if(this.Corchetes!=null){
            var l_corchetes = new nodoAST("L_CORCHETES");
            l_corchetes.agregarHijoAST(this.Corchetes.getNodo())
            nodo.agregarHijoAST(l_corchetes);
        }
        
        return nodo;
    }
}