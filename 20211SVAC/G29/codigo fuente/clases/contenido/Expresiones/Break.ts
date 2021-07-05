import { Nodo } from '../AST/Nodo';
import { Tabla } from '../AST/Tabla';
import { Arbol } from '../AST/Arbol';

class Break extends Nodo {

    constructor(linea: number, columna: number) {
        super(null, linea, columna);
    }
    traducir(tabla: Tabla, arbol: Arbol){
        let etiqueta = arbol.etiquetas_fin.pop();
        arbol.contenido += "\ngoto " + etiqueta + ";";
        arbol.etiquetas_fin.push(etiqueta);
    }

    ejecutar(tabla: Tabla, arbol: Arbol){
        return this;
    }
}
export {Break};