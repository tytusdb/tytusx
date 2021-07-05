import { Arbol } from '../AST/Arbol';
import { Errror } from '../AST/Errror';
import { Nodo } from "../AST/Nodo";
import { Simbolo } from '../AST/Simbolo';
import { Tabla } from '../AST/Tabla';
import { Tipo, tipos } from '../AST/Tipo';
import { Arreglo } from './Arreglo';

class To_Upper_Case extends Nodo{
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
        if(this.expresion.tipo.type != tipos.STRING){
            return null;
        }
        this.tipo = this.expresion.tipo;   
        arbol.contenido += "\nt1 = " + res + ";";
        arbol.contenido += "\nto_upper_case();";
        return res;  
    }

    ejecutar(tabla: Tabla, arbol: Arbol){
        return 0;
    }
    
}
export {To_Upper_Case};
