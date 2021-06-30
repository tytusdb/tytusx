
import { Instruccion } from '../Abstracto/Instruccion';
import nodoAST from '../Abstracto/nodoAST';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../../../XML/Analizador/Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';


export default class Instrucciones extends Array<Instruccion[]>{
    
    constructor(instruction1: Instruccion[],instruction2:Instruccion[], fila: number, columna: number){
        super();
        if(instruction1!=null){
            this.push(instruction1);
        }
        if(instruction2!=null){
            this.push(instruction2)
        }
        
    }
    

}