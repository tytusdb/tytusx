import {Nodo} from '../AST/Nodo';
import {Tabla} from '../AST/Tabla';
import {Arbol} from '../AST/Arbol';
import {Tipo} from '../AST/Tipo';
import {Errror} from '../AST/Errror';
import { Simbolo } from '../AST/Simbolo';
import {tipos} from '../AST/Tipo';
import { Primitivo } from '../Expresiones/Primitivo';

class Asignacion extends Nodo{
    id: string;
    valor: Nodo;
    
    constructor(id: string, valor:Nodo, linea: number, columna: number){
        super(null, linea, columna);
        this.id = id;
        this.valor = valor;
    }

    traducir(tabla: Tabla, arbol: Arbol){
        let res = this.valor.traducir(tabla,arbol);
        if(res instanceof Errror){
            return res;
        }
        let variable: Simbolo;
        variable = tabla.get_var(this.id);
        if (variable == null) {
            const error = new Errror('Semantico',
                'No esta declarada la variable ' + this.id,
                this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;
        }

        if (this.valor.tipo.type != variable.tipo.type && variable.tipo.type != tipos.ANY) {
            const error = new Errror('Semantico',
                `No se puede asignar la variable porque los tipos no coinciden.`,
                this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;
        }else if(variable.tipo.type == tipos.ANY){
            variable.tipo = this.valor.tipo;
        }
        if(variable.tipo_dec != "const"){
            let tmp = variable.tmp;
            if(this.valor instanceof Primitivo){
                 if(this.valor.tipo.type == tipos.STRING){
                    arbol.contador_tmp++;
                    arbol.contenido += "t" + arbol.contador_tmp + " = h;";
                    arbol.contenido += this.cadena_a_heap(res,arbol);
                    arbol.contenido += this.numero_a_heap(-1,arbol);
                }
            }

            arbol.contenido += "\nstack[(int)" + tmp +"] = t" + arbol.contador_tmp + ";\n";    }else{
            const error = new Errror('Semantico',
            `No se le puede cambiar el valor a la constante` + this.id,
            this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;
        }
        return null;
    }
    

    ejecutar(tabla: Tabla, arbol:Arbol){
        const res:Nodo = this.valor.ejecutar(tabla,arbol);
        if(res instanceof Errror){
            return res;
        }
        let variable: Simbolo;
        variable = tabla.get_var(this.id);
        if (variable == null) {
            const error = new Errror('Semantico',
                'No esta declarada la variable ' + this.id,
                this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;
        }

        if (this.valor.tipo.type != variable.tipo.type && variable.tipo.type != tipos.ANY) {
            const error = new Errror('Semantico',
                `No se puede asignar la variable porque los tipos no coinciden.`,
                this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;
        }else if(variable.tipo.type == tipos.ANY){
            variable.tipo = this.valor.tipo;
        }
        if(variable.tipo_dec != "const"){
            variable.valor = res;
        }else{
            const error = new Errror('Semantico',
            `No se le puede cambiar el valor a la constante` + this.id,
            this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;
        }
        return null;
    }
}
export{Asignacion};