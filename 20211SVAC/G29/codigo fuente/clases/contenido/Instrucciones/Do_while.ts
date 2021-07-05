import { Arbol } from '../AST/Arbol';
import { Errror } from '../AST/Errror';
import { Nodo } from "../AST/Nodo";
import { Tabla } from '../AST/Tabla';
import { tipos } from '../AST/Tipo';
import { Break } from '../Expresiones/Break';
import { Continue } from '../Expresiones/Continue';
import { Return } from '../Expresiones/Return';

class Do_while extends Nodo{

    condicion: Nodo;
    contenido: Array<Nodo>;

    constructor(condicion: Nodo, contenido: Array<Nodo>, linea: number, columna: number) {
        super(null, linea, columna);
        this.condicion = condicion;
        this.contenido = contenido;
    }

    traducir(tabla: Tabla, arbol: Arbol){
        return null;
    }
    ejecutar(tabla:Tabla, arbol: Arbol){
        return null;
    }
}
export{Do_while};
