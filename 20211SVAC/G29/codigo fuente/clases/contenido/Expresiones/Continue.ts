import { Nodo } from '../AST/Nodo';
import { Tabla } from '../AST/Tabla';
import { Arbol } from '../AST/Arbol';

class Continue extends Nodo {
    constructor(linea: number, columna: number) {
        super(null, linea, columna);
    }
    traducir(tabla: Tabla, arbol: Arbol){}
    
    ejecutar(tabla: Tabla, arbol: Arbol){
        return this;
    }
}
export {Continue};