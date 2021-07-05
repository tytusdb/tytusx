import { Arbol } from '../AST/Arbol';
import { Errror } from '../AST/Errror';
import { Nodo } from "../AST/Nodo";
import { Simbolo } from '../AST/Simbolo';
import { Tabla } from '../AST/Tabla';
import { Tipo, tipos } from '../AST/Tipo';
import { Arreglo } from './Arreglo';

class Length extends Nodo{
    expresion: Nodo;
    id: string;
    
    constructor(expresion:Nodo, linea: number, columna: number){
        super(null, linea, columna);
        this.expresion = expresion;
    }
    traducir(tabla: Tabla, arbol: Arbol){
         let res = this.expresion.traducir(tabla, arbol);
         if(res instanceof Errror){
             //error
             return null;
         }   
        this.tipo = new Tipo(tipos.NUMBER);
        arbol.contenido += "\nt1 = " + res + ";";
        let tmp  = arbol.generar_temporal();
        arbol.contenido += "\nlength_expresion();";
        arbol.contenido += "\n" + tmp + " = t5;";
        return tmp;  
    }

    ejecutar(tabla: Tabla, arbol: Arbol){
        return 0;
    }
    
}
export {Length};
