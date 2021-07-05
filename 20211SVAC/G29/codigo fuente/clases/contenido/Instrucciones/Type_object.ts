import { Arbol } from '../AST/Arbol';
import { Errror } from '../AST/Errror';
import { Nodo } from "../AST/Nodo";
import { Simbolo } from '../AST/Simbolo';
import { Tabla } from '../AST/Tabla';
import { Tipo, tipos } from '../AST/Tipo';
import { Typo } from './Typo';


class Type_object extends Nodo{

    type: Typo = null;
    valores= new Map<string, Simbolo>();

    nombre_tipo: string;

    nombre: string;
    id: string;

    atributos: Array<Array<Object>>;

    constructor(nombre: string, nombre_tipo: string, atributos:Array<Array<Object>>, linea: number, columna: number){
        super(new Tipo(tipos.TYPE), linea, columna);
        this.nombre = nombre;
        this.nombre_tipo = nombre_tipo;
        this.atributos = atributos;
        this.id = "TYPEDEC#_" + nombre;
    }

    buscar_padre(tabla: Tabla){
        let padre = tabla.get_var("TYPEREF#_" + this.nombre_tipo);
        if(padre.valor instanceof Typo){
            this.type = padre.valor;
        }
        return this.type;
    }

    buscar_atributo(id){
        for(let key of Array.from(this.valores.keys()) ) {
            if(key === id){
                return this.valores.get(key);
            }
        }
        return null;
    }
    agregar_params(){
        for(let key of Array.from(this.type.attributos.keys()) ) {
            this.valores.set(key, new Simbolo(null, key, null, this.linea, this.columna));
        }
    }
    agregar_valores(tabla: Tabla, arbol: Arbol){
        this.atributos.forEach(element => {
            let key;
            let val;
            if(element[0] instanceof String){
                key = element[0];
            }

            if(element[1] instanceof Nodo){
                val = element[1].ejecutar(tabla, arbol);

                let att = this.buscar_atributo(key);
                if(att != null){
                    att.tipo = element[1].tipo;
                    att.valor = val;
                }else{//error

                }
            }else{//error

            }

        });
    }
    traducir(tabla: Tabla, arbol: Arbol){}

    ejecutar(tabla: Tabla, arbol: Arbol){
        if(this.buscar_padre(tabla) != null){
            this.agregar_params();
            this.agregar_valores(tabla, arbol);
            let simbolo: Simbolo;

            simbolo = new Simbolo(this.tipo, this.id, this, this.linea, this.columna);
            const resp = tabla.set_variable(simbolo);
            if(resp != null){
                const error = new Errror('Semantico',resp, this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.toString());
                return error;
            }
            return null;
        }else{
            return null;
            //no existe el type
        }
    }
}

class Set_type extends Nodo{

    parms:Array<string>;
    valor: Nodo;
    constructor(parms: Array<string>, valor:Nodo, linea:number, columna:number){
        super(null,linea,columna);
        this.parms = parms;
        this.valor = valor;
    }

    buscar_padre(tabla: Tabla){
        let padre = tabla.get_var("TYPEDEC#_" + this.parms[0]);
        if(padre instanceof Simbolo){
            return  padre.valor;
        }
        return null;
    }
    buscar_parm(padre, tabla, arbol){
        let tmp;
        for (let  i= 1;  i< this.parms.length; i++) {
            for(let key of Array.from( padre.valores.keys()) ) {
                if(key === this.parms[i]){
                    if(padre.valores.get(key) instanceof Type_object){
                        padre = padre.valores.get(key);
                    }else{
                        tmp = key;
                    }
                }
            }
        }
        if(tmp != null){
            if(padre instanceof Type_object){
                let val = this.valor.ejecutar(tabla, arbol);
                if(padre.type.attributos.get(tmp).type == this.valor.tipo.type){
                    let simb = padre.valores.get(tmp);
                    simb.valor = val;
                }else{
                    // derror
                    const error = new Errror('Semantico',"El tipo de dato no es igual al tipo de" +tmp , this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.toString());
                    return null;
                }
            }
        }else{
            //error
            const error = new Errror('Semantico',"No existe el id ", this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return null;
        }
    }
    traducir(tabla: Tabla, arbol: Arbol){}

    ejecutar(tabla: Tabla, arbol: Arbol){
        if(this.valor instanceof Nodo){
               return this.buscar_parm(this.buscar_padre(tabla), tabla, arbol);
        }
    }
}
export{Type_object, Set_type};
