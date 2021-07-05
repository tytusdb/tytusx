import { Nodo } from '../AST/Nodo';
import { Tabla } from '../AST/Tabla';
import { Arbol } from '../AST/Arbol';
import { Errror } from '../AST/Errror';
import { Tipo } from '../AST/Tipo';

class Return extends Nodo {

    condicion: Nodo;
    valor: Object;
    constructor(condicion: Nodo, linea: number, columna: number) {
        super(condicion.tipo, linea, columna);
        this.condicion = condicion;
        this.valor = null;
    }

    traducir(tabla: Tabla, arbol: Arbol){
        let e_retrn = arbol.etiquetas_return.pop();
        arbol.etiquetas_return.push(e_retrn);
        let tmp_return = arbol.return_principal;
        arbol.contenido += "\n//--------   Returnana  ----------";
        let tmp = this.condicion.traducir(tabla, arbol);
        arbol.contenido += "\n//--------   Return alavrga ----------";
        arbol.contenido += "\nstack[(int) " + tmp_return +"] = " + tmp + ";\ngoto " + e_retrn + ";";
        return '';
    }

    ejecutar(tabla: Tabla, arbol: Arbol){
        if(this.condicion != null){
            this.valor = this.condicion.ejecutar(tabla, arbol);
            this.tipo = this.condicion.tipo;
            return this;
        }
        return null;
    }
}
export {Return};
