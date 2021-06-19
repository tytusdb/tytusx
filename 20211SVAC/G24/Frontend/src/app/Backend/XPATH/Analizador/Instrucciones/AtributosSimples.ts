import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import NodoErrores from '../Excepciones/NodoErrores';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../../../XML/Analizador/Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class AtributoSimple extends Instruccion {
    public Operacion: string;
    public tipoAtributo: string
    constructor(select: string,tipo:string, fila: number, columna: number){
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.Operacion = select
        this.tipoAtributo=tipo

    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {

        let salidas = new tablaSimbolos();

        if(this.tipoAtributo==="*"){
            for (var key of tabla.getTabla()) {
                if(key.getidentificador() == this.Operacion){
                    if(key.getvalor() instanceof tablaSimbolos){
                      for(let sim of key.getvalor().getTabla()){
                        salidas.setVariable(sim)
                      }
                      
                    }
                    else{
                      
                    }
                }
            }
        }else if(this.tipoAtributo==="."){

        }
        
    }
    
    getNodosAST(): nodoAST {
        var nodo= new nodoAST("ATRIBUTO"); //PADRE SELECT
        if(this.tipoAtributo==="."){
            var nodoselect= new nodoAST(this.Operacion);
            nodo.agregarHijoAST(nodoselect)
            nodo.agregarHijo(this.tipoAtributo)
        }else if(this.tipoAtributo==="*"){
            var nodoselect= new nodoAST(this.Operacion);
            nodo.agregarHijoAST(nodoselect)
            nodo.agregarHijo(this.tipoAtributo)
        }
        

        return nodo;
    }
}