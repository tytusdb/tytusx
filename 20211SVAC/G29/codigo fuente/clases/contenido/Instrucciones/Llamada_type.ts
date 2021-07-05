import { Arbol } from '../AST/Arbol';
import { Errror } from '../AST/Errror';
import { Nodo } from "../AST/Nodo";
import { Simbolo } from '../AST/Simbolo';
import { Tabla } from '../AST/Tabla';
import { tipos } from '../AST/Tipo';
import { Type_object } from './Type_object';


class Llamada_type extends Nodo{

    parms:Array<string>;
    valor: Simbolo;
    constructor(parms: Array<string>, linea: number, columna: number){
        super(null, linea, columna);
        this.parms = parms;
    }
    buscar_padre(tabla: Tabla, arbol: Arbol){
        let padre = tabla.get_var("TYPEDEC#_" + this.parms[0]);
        if(padre instanceof Simbolo){
            return  padre.valor;
        }else{
            const error = new Errror('Semantico',"No existe el tipo" +this.parms[0] , this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString()); 
            return null;
        }
        return null;
    }
    buscar_parm(padre){
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
                this.valor = padre.valores.get(tmp);
            }
        }

    }
    
    traducir(tabla: Tabla, arbol: Arbol){}

    ejecutar(tabla: Tabla, arbol: Arbol){
        this.buscar_parm(this.buscar_padre(tabla, arbol));
        if(this.valor != null){
            this.tipo = this.valor.tipo;
            return this.valor.valor;
        }else{
            // No existe el valor solicitado
            const error = new Errror('Semantico',"No existe el id" +this.parms.toString().replace(",",".") , this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString()); 
            return null;
        }
        return null;
    }
}

export{Llamada_type};