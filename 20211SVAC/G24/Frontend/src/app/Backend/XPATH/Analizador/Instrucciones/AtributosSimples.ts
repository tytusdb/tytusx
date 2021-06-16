import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import NodoErrores from '../Excepciones/NodoErrores';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class AtributoSimple extends Instruccion {
    public Operacion: string;
    public tipoAtributo: Tipo
    constructor(select: string,tipo:Tipo, fila: number, columna: number){
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.Operacion = select
        this.tipoAtributo=tipo

    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    
    getNodosAST(): nodoAST {
        var nodo= new nodoAST("ATRIBUTOS"); //PADRE SELECT
        if(tipoDato.SELECT ===this.tipoAtributo.getTipo()){
            var nodoselect= new nodoAST("SELECT");
            nodoselect.agregarHijo(this.Operacion)
            nodo.agregarHijoAST(nodoselect)
        }else if(tipoDato.OBJETO==this.tipoAtributo.getTipo()){
            var nodoselect= new nodoAST("MULTIPLICACION");
            nodoselect.agregarHijo(this.Operacion)
            nodo.agregarHijoAST(nodoselect)
        }
        

        return nodo;
    }
}