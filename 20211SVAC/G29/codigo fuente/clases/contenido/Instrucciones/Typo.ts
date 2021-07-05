import { Arbol } from '../AST/Arbol';
import { Errror } from '../AST/Errror';
import { Nodo } from "../AST/Nodo";
import { Simbolo } from '../AST/Simbolo';
import { Tabla } from '../AST/Tabla';
import { Tipo, tipos } from '../AST/Tipo';

class Typo extends Nodo{

    nombre: String;
    id: string;
    attributos = new Map<string, Tipo>();
    valores: Array<Array<Object>>;

    constructor(nombre: String, atributos: Array<Array<Object>>, linea: number, columna: number){
        super(new Tipo(tipos.TYPE), linea, columna);
        this.nombre = nombre;
        this.id = "TYPEREF#_" + nombre;
        this.valores = atributos;
        this.agregar_atributos();
    }

    buscar_atributo(id){
        for(let key of Array.from(this.attributos.keys()) ) {
            if(key === id){
                return this.attributos.get(key);
            }
        }
        return null;
    }

    agregar_atributos(){
        this.valores.forEach(element => {
            let att;
            if(element[0] instanceof String){
                att = element[0];
            }
            if(this.buscar_atributo(att) == null){
                if(element[1] instanceof Tipo){
                    this.attributos.set(att, element[1]);
                }
            }else{
                this.attributos[att] = element[1];
            }
        });
    }
    traducir(tabla: Tabla, arbol: Arbol){}

    ejecutar(tabla: Tabla, arbol: Arbol){
        let simbolo: Simbolo;
        simbolo = new Simbolo(this.tipo, this.id, this, this.linea, this.columna);
        const resp = tabla.set_variable(simbolo);
        if(resp != null){
            const error = new Errror('Semantico: Declaracion de Type',resp, this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;
        }
        return null;
    }
}
export{Typo};
