import {Nodo} from '../AST/Nodo';
import {Tipo, tipos} from '../AST/Tipo';
import {Tabla} from '../AST/Tabla';
import {Arbol} from '../AST/Arbol';

class Primitivo extends Nodo{
    
    valor: Object;

    constructor(tipo:Tipo, valor: Object, linea: number, columna: number){
        super(tipo, linea, columna);
        this.valor = valor;
    }

    traducir(tabla: Tabla, arbol: Arbol){
        if(this.tipo.type == tipos.BOOLEAN){
            if(this.valor == "false"){
                return 0;
            }else{
                return 1;
            }
        }   
        return this.valor;
    }

    ejecutar(tabla: Tabla, arbol: Arbol) {
        if(this.tipo.type == tipos.BOOLEAN){
            if(this.valor == "false"){
                return false;
            }else{
                return true;
            }
        }
        return this.valor;
    }
}
export {Primitivo};
