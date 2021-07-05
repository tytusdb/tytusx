import {Nodo} from '../AST/Nodo';
import {Tabla} from '../AST/Tabla';
import {Arbol} from '../AST/Arbol';
import {Tipo} from '../AST/Tipo';
import {tipos} from '../AST/Tipo';
import { Simbolo } from '../AST/Simbolo';
import { Errror } from '../AST/Errror';

class Identificador extends Nodo{
    id: string;
    
    constructor(id: string, linea: number, columna: number) {
        // tipo null porque aun no se el tipo
        super(null, linea, columna);
        this.id = id;
    }
    traducir(tabla: Tabla, arbol: Arbol){
        let variable: Simbolo;
        variable = tabla.get_var(this.id);
        if (variable == null) {
            const error = new Errror('Semantico',
                'No existe la variable ' + this.id, this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;
        }
        this.tipo = variable.tipo;
        let tmp = arbol.generar_temporal();
        arbol.contenido += "\n" + tmp + " = stack[(int)" + variable.tmp+"];";
        return tmp;
    }


    ejecutar(tabla: Tabla, arbol: Arbol) {
        let variable: Simbolo;
        variable = tabla.get_var(this.id);
        if (variable == null) {
            const error = new Errror('Semantico',
                'No existe la variable ' + this.id, this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;
        }
        this.tipo = variable.tipo;
        return variable.valor;
    }
}
export{Identificador};