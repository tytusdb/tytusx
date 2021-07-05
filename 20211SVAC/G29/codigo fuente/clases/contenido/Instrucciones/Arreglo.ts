import { Arbol } from '../AST/Arbol';
import { Errror } from '../AST/Errror';
import { Nodo } from "../AST/Nodo";
import { Simbolo } from '../AST/Simbolo';
import { Tabla } from '../AST/Tabla';
import { Tipo, tipos } from '../AST/Tipo';
import { Primitivo } from '../Expresiones/Primitivo';

class Arreglo extends Nodo{

    nombre: string;
    contenido = [];
    dimension: number;
    id: string;


    constructor(nombre: string, tipo:Tipo, contenido: Array<Object>, dimension: number,linea: number, columna:number){
        super(tipo, linea, columna);
        if(tipo == null){
            this.tipo = new Tipo(tipos.ANY);
        }

        this.nombre = nombre;
        this.contenido = contenido;
        this.dimension = dimension;
        this.id = "ARRAY#_" + nombre;

    }

    calcular_dimension(arr:Array<Object>){
        if(arr[0] instanceof Array){
            this.calcular_dimension(arr[0]);
            this.dimension +=1;
        }
    }

    obtener_tipos(arreglo, tabla, arbol){
        let is_tipo = true;
        arreglo.forEach(element => {
             if(element instanceof Nodo){
                element.ejecutar(tabla, arbol);
                if(this.tipo.type == tipos.ANY){
                    this.tipo = element.tipo;
                }
                if(this.tipo.type != element.tipo.type){
                    is_tipo = false;
                }
             }else if(element instanceof Array){
                 is_tipo = this.obtener_tipos(element, tabla, arbol);
             }
        });
        return is_tipo;
    }
    traducir(tabla: Tabla, arbol: Arbol){
      return '';
    }

    ejecutar(tabla: Tabla, arbol: Arbol){
        if(!this.obtener_tipos(this.contenido, tabla, arbol)){
            const error = new Errror('Semantico: Declaracion de Arreglo', "No se puede asignar por que el valor"+
            " no es de tipo: " + this.tipo.toString(), this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;
        }
        let simbolo: Simbolo;
        simbolo = new Simbolo(this.tipo, this.id, this, this.linea, this.columna);
        const resp = tabla.set_variable(simbolo);
        if(resp != null){
            const error = new Errror('Semantico: Declaracion de Arreglo',resp, this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;
        }
        return null;
    }

}

class Push extends Nodo{
    nombre: string;
    id: string;
    valor:Object;

    constructor(nombre:string, valor: Object, linea: number, columna: number){
        super(null, linea, columna);
        this.nombre = nombre;
        this.valor = valor;
        this.id = "ARRAY#_" + nombre;
    }
    traducir(tabla: Tabla, arbol: Arbol){
      return '';
    }

    ejecutar(tabla: Tabla, arbol: Arbol){
        let arreglo: Simbolo;
        arreglo = tabla.get_var(this.id);
        if (arreglo == null) {
            const error = new Errror('Semantico',
                'No esta declarado el Arreglo ' + this.nombre,
                this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;
        }
        if(arreglo.valor instanceof Arreglo){
            if(this.valor instanceof Nodo){
                let val = this.valor.ejecutar(tabla, arbol);
                let nodo_aux = new Primitivo(this.valor.tipo,val,this.linea, this.columna);
                if(this.tipo.type == this.valor.tipo.type){
                    arreglo.valor.contenido.push(nodo_aux);
                }else{
                    const error = new Errror('Semantico: Declaracion de Arreglo', "No se puede asignar por que el valor"+
                    " no es de tipo: " + this.tipo.toString(), this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.toString());
                    return error;
                }
            }else{
                arreglo.valor.contenido.push(this.valor);
            }
        }
        return null;
    }
}

class Pop extends Nodo{
    nombre: string;
    id: string;

    constructor(nombre:string, linea: number, columna: number){
        super(null, linea, columna);
        this.nombre = nombre;
        this.id = "ARRAY#_" + nombre;
    }
    traducir(tabla: Tabla, arbol: Arbol){
      return '';
    }

    ejecutar(tabla: Tabla, arbol: Arbol){
        let arreglo: Simbolo;
        arreglo = tabla.get_var(this.id);
        if (arreglo == null) {
            const error = new Errror('Semantico',
                'No esta declarado el Arreglo ' + this.nombre,
                this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;
        }
        if(arreglo.valor instanceof Arreglo){
            let po = arreglo.valor.contenido.pop();
            if(po instanceof Nodo){
                return po.ejecutar(tabla, arbol);
            }
        }
        return '';
    }
}
class GD_Arreglo extends Nodo{
    nombre: string;
    id: string;
    posicion: Array<Nodo>;
    arreglo: Array<Object>;
    constructor(nombre: string,posicion:Array<Nodo>, linea: number, columna:number){
        super(null, linea, columna);
        this.nombre  = nombre;
        this.posicion = posicion;
        this.id = "ARRAY#_" + nombre;
    }
    traducir(tabla: Tabla, arbol: Arbol){}

    get_valor(tabla: Tabla, arbol: Arbol){
        let arreglo_aux = this.arreglo;
        let tmp;
        let pos = 0;
        for (let i = 0; i < this.posicion.length; i++) {
            if(i== 0){tmp = arreglo_aux;}
            pos = this.posicion[i].ejecutar(tabla, arbol);
            try{
                if(i == this.posicion.length -1){
                    tmp = tmp[pos];
                    if(tmp instanceof Nodo){
                        let val = tmp.ejecutar(tabla,arbol);
                        this.tipo = tmp.tipo;
                        return val;
                    }else{
                        const error = new Errror('Semantico',
                        'Posicion incorrecta en el arreglo ' + this.nombre,
                        this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.toString());
                    return error;

                    }
                }else if(this.posicion[i].tipo.type == tipos.NUMBER){
                    tmp = tmp[pos];
                }
            }catch(e){
                const error = new Errror('Semantico',
                'Posicion incorrecta en el arreglo ' + this.nombre,
                this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;
            }

        }
        return null;
    }

    ejecutar(tabla: Tabla, arbol: Arbol){
        let arreglo: Simbolo;
        arreglo = tabla.get_var(this.id);
        if (arreglo == null) {
            const error = new Errror('Semantico',
                'No esta declarado el Arreglo ' + this.nombre,
                this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;
        }
        if(arreglo.valor instanceof Arreglo){
            this.arreglo = arreglo.valor.contenido;
            return this.get_valor(tabla, arbol);
        }
        return null;
    }
}
class SD_Arreglo extends Nodo{
    nombre: string;
    id: string;
    posicion: Array<Nodo>;
    valor: Object;
    arreglo: Array<Object>;
    dimension: number;
    constructor(nombre: string,posicion:Array<Nodo>, valor:Object, linea: number, columna:number){
        super(null, linea, columna);
        this.nombre  = nombre;
        this.posicion = posicion;
        this.valor = valor;
        this.id = "ARRAY#_" + nombre;
    }
    calcular_dim(){
        let val  = [];
        for(let i = 0; i < this.dimension; i++){
            val = [val];
        }
    }
    traducir(tabla: Tabla, arbol: Arbol){}

    set_valor(tabla: Tabla, arbol: Arbol){
        return null;
    }

    ejecutar(tabla: Tabla, arbol: Arbol){
        return null;
    }
}

export{Arreglo, Pop, Push, GD_Arreglo, SD_Arreglo};
