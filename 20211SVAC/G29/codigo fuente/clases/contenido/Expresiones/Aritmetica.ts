import {Arbol} from '../AST/Arbol';
import {Errror} from '../AST/Errror';
import {Tipo, tipos} from  '../AST/Tipo';
import {Nodo} from '../AST/Nodo';
import { Tabla } from '../AST/Tabla';
import { Primitivo } from './Primitivo';
import { Llamada_funcion } from '../Instrucciones/Llamada_funcion';

class Aritmetica extends Nodo{

    nodo_izquierdo: Nodo;
    nodo_derecho: Nodo;
    operador: string;

    constructor(nodo_izquierdo: Nodo, nodo_derecho: Nodo, operador:string, linea: number, columna: number){
        super(null,linea, columna);
        this.nodo_derecho = nodo_derecho;
        this.nodo_izquierdo = nodo_izquierdo;
        this.operador = operador;

    }

    traducir(tabla: Tabla, arbol:Arbol){
        let ret = "";
        let resultado_der;
        let resultado_izq;
        if(this.nodo_izquierdo instanceof Llamada_funcion || this.nodo_derecho instanceof Llamada_funcion){
            if(this.nodo_derecho instanceof Llamada_funcion){
                if(this.nodo_derecho != null){
                    resultado_der = this.nodo_derecho.traducir(tabla, arbol);
                }
                if(this.nodo_izquierdo != null){
                    resultado_izq = this.nodo_izquierdo.traducir(tabla, arbol);
                }
            }else if(this.nodo_izquierdo instanceof Llamada_funcion){
                if(this.nodo_izquierdo != null){
                    resultado_izq = this.nodo_izquierdo.traducir(tabla, arbol);
                }
                if(this.nodo_derecho != null){
                    resultado_der = this.nodo_derecho.traducir(tabla, arbol);
                }
            }
        }else{

            if(this.nodo_derecho != null){
                resultado_izq = this.nodo_izquierdo.traducir(tabla, arbol);
                if(resultado_izq instanceof Errror){
                    return resultado_izq;
                }
                resultado_der  = this.nodo_derecho.traducir(tabla, arbol);
                if(resultado_der instanceof Errror){
                    return resultado_der;
                }
            }
        }
        arbol.contador_tmp++;
        if(this.nodo_derecho != null){
            if(this.operador == '+'){
                ret = "t" + arbol.contador_tmp;
                if(this.nodo_izquierdo.tipo.type == tipos.NUMBER &&
                    this.nodo_derecho.tipo.type == tipos.NUMBER){

                    this.tipo = new Tipo(tipos.NUMBER);
                    arbol.contenido += "\nt" + arbol.contador_tmp + " = " + resultado_izq + " + " + resultado_der + ";";
                    return "t" + arbol.contador_tmp;

                }else if(this.nodo_izquierdo.tipo.type == tipos.STRING ||
                    this.nodo_derecho.tipo.type == tipos.STRING){
                    this.tipo = new Tipo(tipos.STRING);

                    arbol.contenido += "\nt"  + arbol.contador_tmp + " = h;\n";

                    if(this.nodo_izquierdo instanceof Primitivo){
                        if(this.nodo_izquierdo.tipo.type == tipos.NUMBER){
                            this.guardar_numero(resultado_izq, arbol);
                            arbol.contenido += this.numero_a_heap(-1, arbol);
                        }else{

                            arbol.contenido += this.cadena_a_heap(resultado_izq, arbol);
                            arbol.contenido += this.numero_a_heap(-1, arbol);
                        }
                    }else{
                        if(this.nodo_izquierdo.tipo.type == tipos.NUMBER){
                            this.guardar_numero(resultado_izq, arbol);
                            arbol.contenido += this.numero_a_heap(-1, arbol);
                            ret = "t" + arbol.contador_tmp;
                        }else{
                            ret = resultado_izq;
                        }
                    }

                    arbol.contador_tmp++;
                    arbol.contenido += "\nt" + arbol.contador_tmp + " = h;\n";
                    arbol.contenido += "t1 = " + ret + ";\n";
                    arbol.contenido += "unir_cadena();\n";
                    ret = "t" + arbol.contador_tmp;

                    if(this.nodo_derecho instanceof Primitivo){
                        if(this.nodo_derecho.tipo.type == tipos.NUMBER){
                            this.guardar_numero(resultado_der, arbol);
                            arbol.contenido += this.numero_a_heap(-1, arbol);
                         }else{
                            arbol.contenido += this.cadena_a_heap(resultado_der, arbol);
                            arbol.contenido += this.numero_a_heap(-1, arbol);
                        }

                    }else{
                        if(this.nodo_derecho.tipo.type == tipos.NUMBER){
                            this.guardar_numero(resultado_der, arbol);
                            arbol.contenido += this.numero_a_heap(-1, arbol);
                        }else{
                            arbol.contador_tmp++;
                            arbol.contenido += "\nt" + arbol.contador_tmp + " = h;\n";
                            arbol.contenido += "t1 = " + resultado_der + ";\n";
                            arbol.contenido += "unir_cadena();\n";
                            arbol.contenido += this.numero_a_heap(-1, arbol);
                       }
                    }
                    return ret;
                }else{
                    const error = new Errror("Semantico","Error al operar con +,  los tipos no coinciden", this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.desc);
                    return error;
                }
            }else if(this.operador == '*'){
                if(this.nodo_izquierdo.tipo.type == tipos.NUMBER &&
                    this.nodo_derecho.tipo.type == tipos.NUMBER){

                    this.tipo = new Tipo(tipos.NUMBER);
                    arbol.contenido += "\nt" + arbol.contador_tmp + " = " + resultado_izq + " * " + resultado_der + ";";
                    return "t" + arbol.contador_tmp;

                }else{
                    const error = new Errror("Semantico","Error al operar con +,  los tipos no coinciden", this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.desc);
                    return error;
                }
            }else if(this.operador == '-'){
                if(this.nodo_izquierdo.tipo.type == tipos.NUMBER &&
                    this.nodo_derecho.tipo.type == tipos.NUMBER){

                    this.tipo = new Tipo(tipos.NUMBER);
                    arbol.contenido += "\nt" + arbol.contador_tmp + " = " + resultado_izq + " - " + resultado_der + ";";
                    return "t" + arbol.contador_tmp;

                }else{
                    const error = new Errror("Semantico","Error al operar con +,  los tipos no coinciden", this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.desc);
                    return error;
                }
            }else if(this.operador == '/'){
                if(this.nodo_izquierdo.tipo.type == tipos.NUMBER &&
                    this.nodo_derecho.tipo.type == tipos.NUMBER){

                    this.tipo = new Tipo(tipos.NUMBER);
                    arbol.contenido += "\nt" + arbol.contador_tmp + " = " + resultado_izq + " / " + resultado_der + ";";
                    return "t" + arbol.contador_tmp;

                }else{
                    const error = new Errror("Semantico","Error al operar con +,  los tipos no coinciden", this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.desc);
                    return error;
                }
            }else if(this.operador == '**'){
                if(this.nodo_izquierdo.tipo.type == tipos.NUMBER &&
                    this.nodo_derecho.tipo.type == tipos.NUMBER){

                    this.tipo = new Tipo(tipos.NUMBER);
                    arbol.contenido += "\nt1 = " + resultado_izq + ";";
                    arbol.contenido += "\nt2 = " + resultado_der + ";";
                    arbol.contenido += "\npotencia();";
                    arbol.contenido += "\nt" + arbol.contador_tmp + " = t3;";
                    return "t" + arbol.contador_tmp;

                }else{
                    const error = new Errror("Semantico","Error al operar con +,  los tipos no coinciden", this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.desc);
                    return error;
                }
            }

        }else{
            if(this.operador == '-'){
                if(this.nodo_izquierdo.tipo.type == tipos.NUMBER){
                    resultado_izq = this.nodo_izquierdo.traducir(tabla, arbol);
                    this.tipo = new Tipo(tipos.NUMBER);
                    arbol.contenido += "\nt" + arbol.contador_tmp + " = " + resultado_izq + " *  -1;";
                    return "t" + arbol.contador_tmp;

                }else{
                    const error = new Errror("Semantico","Error al operar con +,  los tipos no coinciden", this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.desc);
                    return error;
                }
            }else{
                const error = new Errror("Semantico","Error con operador unario", this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.desc);
                return error;

            }
        }
        return '';
    }

    ejecutar(tabla: Tabla, arbol:Arbol){
        if(this.nodo_derecho != null){
            const resultado_izq = this.nodo_izquierdo.ejecutar(tabla, arbol);
            if(resultado_izq instanceof Errror){
                return resultado_izq;
            }
            const resultado_der  = this.nodo_derecho.ejecutar(tabla, arbol);
            if(resultado_der instanceof Errror){
                return resultado_der;
            }

            if(this.operador == '+'){
                if(this.nodo_izquierdo.tipo.type == tipos.NUMBER &&
                    this.nodo_derecho.tipo.type == tipos.NUMBER){

                    this.tipo = new Tipo(tipos.NUMBER);
                    return resultado_izq + resultado_der;

                }else if(this.nodo_izquierdo.tipo.type == tipos.STRING ||
                    this.nodo_derecho.tipo.type == tipos.STRING){

                        this.tipo = new Tipo(tipos.STRING);
                        return resultado_izq + resultado_der;
                }else{
                    const error = new Errror("Semantico","Error al operar con +", this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.desc);
                    return error;
                }
            }else if(this.operador == '-'){
                if(this.nodo_izquierdo.tipo.type == tipos.NUMBER &&
                    this.nodo_derecho.tipo.type == tipos.NUMBER){

                    this.tipo = new Tipo(tipos.NUMBER);
                    return resultado_izq - resultado_der;

                }else{
                    const error = new Errror("Semantico","Error al operar con - ", this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.desc);
                    return error;
                }
            }else if(this.operador == '*'){
                if(this.nodo_izquierdo.tipo.type == tipos.NUMBER &&
                    this.nodo_derecho.tipo.type == tipos.NUMBER){

                    this.tipo = new Tipo(tipos.NUMBER);
                    return resultado_izq * resultado_der;

                }else{
                    const error = new Errror("Semantico","Error al operar con * :( ", this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.toString());
                    return error;
                }
            }else if(this.operador == '/'){
                if(this.nodo_izquierdo.tipo.type == tipos.NUMBER &&
                    this.nodo_derecho.tipo.type == tipos.NUMBER){
                    this.tipo = new Tipo(tipos.NUMBER);
                    if (resultado_der === 0) {
                        const error = new Errror("Semantico", "No se puede dividir entre 0", this.linea, this.columna);
                            arbol.errores.push(error);
                            arbol.consola.push(error.desc);
                            return error;
                        }
                    return resultado_izq / resultado_der;

                }else{
                    const error = new Errror("Semantico","Error al operar con /", this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.desc);
                    return error;
                }
            }else if(this.operador == '**'){
                if(this.nodo_izquierdo.tipo.type == tipos.NUMBER &&
                    this.nodo_derecho.tipo.type == tipos.NUMBER){

                    this.tipo = new Tipo(tipos.NUMBER);
                    return resultado_izq ** resultado_der;

                }else{
                    const error = new Errror("Semantico","Error al operar con ** ", this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.desc);
                    return error;
                }
            }else if(this.operador == '%'){
                if(this.nodo_izquierdo.tipo.type == tipos.NUMBER &&
                    this.nodo_derecho.tipo.type == tipos.NUMBER){

                    this.tipo = new Tipo(tipos.NUMBER);
                    return resultado_izq % resultado_der;

                }else{
                    const error = new Errror("Semantico","Error al operar con % ", this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.desc);
                    return error;
                }
            }
        }else{
            const resultado_izq = this.nodo_izquierdo.ejecutar(tabla, arbol);
            if (resultado_izq instanceof Errror) {
                return resultado_izq;
            }
            if (this.operador === '-') {
                if (this.nodo_izquierdo.tipo.type === tipos.NUMBER) {
                    this.tipo = new Tipo(tipos.NUMBER);
                    return -1 * resultado_izq;
                } else {
                    const error = new Errror('Semantico',"Error en operacion unaria, valor no es numeric",this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.desc);
                    return error;
                }
            } else {
                const error = new Errror('Semantico',"Error operador desconocido",this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.desc);
                return error;
            }
        }
    }
}
export {Aritmetica};
