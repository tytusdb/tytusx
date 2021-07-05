import {Nodo} from '../AST/Nodo';
import {Tabla} from '../AST/Tabla';
import {Arbol} from '../AST/Arbol';
import {Tipo} from '../AST/Tipo';
import {Errror} from '../AST/Errror';
import { Simbolo } from '../AST/Simbolo';
import {tipos} from '../AST/Tipo';
import { Primitivo } from '../Expresiones/Primitivo';

class Declaracion extends Nodo{

    tipo_declaracion: string;
    tipo: Tipo;
    id: string;
    valor: Nodo;

    constructor(tipo_declaracion:string, tipo: Tipo, id: string, valor: Nodo, linea: number, columna: number) {
        if(tipo == null){
            tipo = new Tipo(tipos.ANY);
        }
        super(tipo, linea, columna);
        this.id = id;
        this.valor = valor;
        this.tipo_declaracion = tipo_declaracion;
        
    }
    traducir(tabla: Tabla, arbol: Arbol){
        let simbolo: Simbolo;
        arbol.contador_tmp++;
        let tmp = "t" + arbol.contador_tmp;
        simbolo = new Simbolo(this.tipo, this.id, null, this.linea, this.columna);
        simbolo.tmp = tmp;
        simbolo.tipo_dec = this.tipo_declaracion;
        const resp = tabla.set_variable(simbolo);
        if(resp != null){
            const error = new Errror('Semantico',resp, this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;           
        }
        arbol.contenido += "\n" + tmp + " =  p + "+arbol.contador_p+";";
        arbol.contador_p++;
        if(this.valor != null){
            let res = this.valor.traducir(tabla, arbol);
            
            if(this.valor instanceof Primitivo){
                if(this.valor.tipo.type == tipos.STRING){
                    arbol.contador_tmp++;
                    arbol.contenido += "t" + arbol.contador_tmp + " = h;";
                    arbol.contenido += this.cadena_a_heap(res,arbol);
                    arbol.contenido += this.numero_a_heap(-1,arbol);
                    res = "t" + arbol.contador_tmp;
                }
            }

            arbol.contenido += "\nstack[(int)" + tmp +"] = " + res + ";\n";
        }
        
        return null;
    }

    ejecutar(tabla: Tabla, arbol: Arbol){
        let resultado = null;
        if(this.valor != null){
            resultado = this.valor.ejecutar(tabla, arbol);
            if (resultado instanceof Errror) {
                return resultado;
            }    
            if(this.tipo.type != this.valor.tipo.type && this.tipo.type != tipos.ANY){
                const error = new Errror('Semantico',
                `No se puede declarar la variable porque los tipos no coinciden.`,
                this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.toString());
                return error;
            }else if(this.tipo.type == tipos.ANY){
                this.tipo = this.valor.tipo;
            }
        }
        

        let simbolo: Simbolo;
        
        simbolo = new Simbolo(this.tipo, this.id, resultado, this.linea, this.columna);
        simbolo.tipo_dec = this.tipo_declaracion;
        const resp = tabla.set_variable(simbolo);
        if(resp != null){
            const error = new Errror('Semantico',resp, this.linea, this.columna);
            arbol.errores.push(error);
            arbol.consola.push(error.toString());
            return error;           
        }
        return null;
    }
}
export {Declaracion};