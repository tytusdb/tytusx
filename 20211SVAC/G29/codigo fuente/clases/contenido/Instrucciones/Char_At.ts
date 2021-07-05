import { Arbol } from '../AST/Arbol';
import { Errror } from '../AST/Errror';
import { Nodo } from "../AST/Nodo";
import { Simbolo } from '../AST/Simbolo';
import { Tabla } from '../AST/Tabla';
import { Tipo, tipos } from '../AST/Tipo';
import { Primitivo } from '../Expresiones/Primitivo';
import { Arreglo } from './Arreglo';

class Char_At extends Nodo{
    expresion: Nodo;
    posicion: Nodo;
    id: string;

    constructor(expresion:Nodo, posicion:Nodo,  linea: number, columna: number){
        super(null, linea, columna);
        this.expresion = expresion;
        this.posicion = posicion;
    }
    traducir(tabla: Tabla, arbol: Arbol){
        return null;
    }

    ejecutar(tabla: Tabla, arbol: Arbol){
        return 0;
    }

}
export {Char_At};
