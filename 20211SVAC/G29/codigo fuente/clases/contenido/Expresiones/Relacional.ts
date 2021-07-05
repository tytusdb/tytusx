import { Nodo } from "../AST/Nodo";
import { Tabla } from "../AST/Tabla";
import { Arbol } from "../AST/Arbol";
import { Errror } from "../AST/Errror";
import { tipos, Tipo } from "../AST/Tipo";
import { Primitivo } from './Primitivo';

class Relacional extends Nodo{
    nodo_izquierdo: Nodo;
    nodo_derecho: Nodo;
    operador: string;

    constructor(nodo_izquierdo: Nodo, nodo_derecho: Nodo, operador: string, linea: number, columna: number) {
        super(new Tipo(tipos.BOOLEAN), linea, columna);
        this.nodo_izquierdo = nodo_izquierdo;
        this.nodo_derecho = nodo_derecho;
        this.operador = operador;
    }
    traducir(tabla: Tabla, arbol: Arbol){
        let resultado_izq = this.nodo_izquierdo.traducir(tabla, arbol);
        if(resultado_izq instanceof Errror){
            return resultado_izq;
        }
        let resultado_der = this.nodo_derecho.traducir(tabla,arbol);
        if(resultado_der instanceof Errror){
            return resultado_der;
        }
        let tmp = arbol.generar_temporal();
        let e_si = arbol.generar_etiqueta();
        let e_no = arbol.generar_etiqueta();
        let e_fin = arbol.generar_etiqueta();
        if(this.operador == ">"){
            if(this.nodo_derecho.tipo.type == tipos.NUMBER && this.nodo_derecho.tipo.type == tipos.NUMBER){
                arbol.contenido += "\n//--------- Relacional > --------";
                arbol.contenido += "\nif(" + resultado_izq + " > " + resultado_der + ") goto " + e_si + ";";
            }else{
                const error = new Errror('Semantico',
                `Error al relacionar los tipos con >`,
                this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.toString());
                return error;
            }
        }else if(this.operador == "<"){

            if(this.nodo_derecho.tipo.type == tipos.NUMBER && this.nodo_derecho.tipo.type == tipos.NUMBER){
                arbol.contenido += "\n//--------- Relacional < --------";
                arbol.contenido += "\nif(" + resultado_izq + " < " + resultado_der + ") goto " + e_si + ";";
            }else{
                const error = new Errror('Semantico',
                `Error al relacionar los tipos con <`,
                this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.toString());
                return error;
            }
        }else if(this.operador == "<="){

            if(this.nodo_derecho.tipo.type == tipos.NUMBER && this.nodo_derecho.tipo.type == tipos.NUMBER){
                arbol.contenido += "\n//--------- Relacional <= --------";
                arbol.contenido += "\nif(" + resultado_izq + " <= " + resultado_der + ") goto " + e_si + ";";
            }else{
                const error = new Errror('Semantico',
                `Error al relacionar los tipos con <=`,
                this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.toString());
                return error;
            }
        }else if(this.operador == ">="){

            if(this.nodo_derecho.tipo.type == tipos.NUMBER && this.nodo_derecho.tipo.type == tipos.NUMBER){
                arbol.contenido += "\n//--------- Relacional >= --------";
                arbol.contenido += "\nif(" + resultado_izq + " >= " + resultado_der + ") goto " + e_si + ";";
            }else{
                const error = new Errror('Semantico',
                `Error al relacionar los tipos con >=`,
                this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.toString());
                return error;
            }
        }else if(this.operador == "=="){
            if(this.nodo_derecho.tipo.type ==  this.nodo_derecho.tipo.type){
                arbol.contenido += "\n//--------- Relacional == --------";
                if(this.nodo_derecho.tipo.type == tipos.STRING ||this.nodo_izquierdo.tipo.type == tipos.STRING){
                    if(this.nodo_izquierdo instanceof Primitivo){
                        let tmp1 = arbol.generar_temporal();
                        arbol.contenido += "\n" +tmp1 + " = h;\n";
                        arbol.contenido += "\n" +this.cadena_a_heap(this.nodo_izquierdo.valor.toString(), arbol);
                        arbol.contenido += "\nt1 =  -1;\nguardar_cadena();\n";
                        resultado_izq = tmp1;
                    }
                    if(this.nodo_derecho instanceof Primitivo){
                        let tmp1 = arbol.generar_temporal();
                        arbol.contenido += "\n" + tmp1 + " = h;\n";
                        arbol.contenido += "\n" +this.cadena_a_heap(this.nodo_derecho.valor.toString(), arbol);
                        arbol.contenido += "\nt1 =  -1;\nguardar_cadena();\n";
                        resultado_der = tmp1;
                    }


                    arbol.contenido += "\nt1 = " + resultado_izq + ";";
                    arbol.contenido += "\nt2 = " + resultado_der + ";";
                    arbol.contenido += "\ncomparar_cadena();";
                    arbol.contenido += "\nif(t5 == 1) goto " + e_si + ";";

                }else{
                    arbol.contenido += "\nif(" + resultado_izq + " == " + resultado_der + ") goto " + e_si + ";";
                }
            }else{
                const error = new Errror('Semantico',
                `Error al relacionar los tipos con ==`,
                this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.toString());
                return error;
            }
        }else if(this.operador == "!="){
            if(this.nodo_derecho.tipo.type ==  this.nodo_derecho.tipo.type){
                if(this.nodo_derecho.tipo.type == tipos.STRING ||this.nodo_izquierdo.tipo.type == tipos.STRING){
                    if(this.nodo_izquierdo instanceof Primitivo){
                        let tmp1 = arbol.generar_temporal();
                        arbol.contenido += "\n" +tmp1 + " = h;\n";
                        arbol.contenido += "\n" +this.cadena_a_heap(this.nodo_izquierdo.valor.toString(), arbol);
                        arbol.contenido += "\nt1 =  -1;\nguardar_cadena();\n";
                        resultado_izq = tmp1;
                    }
                    if(this.nodo_derecho instanceof Primitivo){
                        let tmp1 = arbol.generar_temporal();
                        arbol.contenido += "\n" + tmp1 + " = h;\n";
                        arbol.contenido += "\n" +this.cadena_a_heap(this.nodo_derecho.valor.toString(), arbol);
                        arbol.contenido += "\nt1 =  -1;\nguardar_cadena();\n";
                        resultado_der = tmp1;
                    }
                    arbol.contenido += "\nt1 = " + resultado_izq + ";";
                    arbol.contenido += "\nt2 = " + resultado_der + ";";
                    arbol.contenido += "\ncomparar_cadena();";
                    arbol.contenido += "\nif(t5 != 1) goto " + e_si + ";";

                }else{
                    arbol.contenido += "\n//--------- Relacional != --------";
                    arbol.contenido += "\nif(" + resultado_izq + " != " + resultado_der + ") goto " + e_si + ";";
                }
            }else{
                const error = new Errror('Semantico',
                `Error al relacionar los tipos con !=`,
                this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.toString());
                return error;
            }
        }
        arbol.contenido += "\ngoto " + e_no + ";";
        arbol.contenido += "\n" + e_si + ":";
        arbol.contenido += "\n" + tmp + " = 1;";
        arbol.contenido += "\ngoto " + e_fin + ";";
        arbol.contenido += "\n" + e_no + ":";
        arbol.contenido += "\n" + tmp + " = 0;";
        arbol.contenido += "\n" + e_fin + " :";
        return tmp;

    }

    ejecutar(tabla: Tabla, arbol: Arbol){
        const resultado_izq = this.nodo_izquierdo.ejecutar(tabla, arbol);
        if(resultado_izq instanceof Errror){
            return resultado_izq;
        }
        const resultado_der = this.nodo_derecho.ejecutar(tabla,arbol);
        if(resultado_der instanceof Errror){
            return resultado_der;
        }

        if(this.operador == ">"){

            if(this.nodo_derecho.tipo.type == tipos.NUMBER && this.nodo_derecho.tipo.type == tipos.NUMBER){
                return resultado_izq > resultado_der;
            }else{
                const error = new Errror('Semantico',
                `Error al relacionar los tipos con <`,
                this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.toString());
                return error;
            }
        }else if(this.operador == '<'){
            if(this.nodo_derecho.tipo.type == tipos.NUMBER && this.nodo_derecho.tipo.type == tipos.NUMBER){
                return resultado_izq < resultado_der;
            }else{
                const error = new Errror('Semantico',
                `Error al relacionar los tipos con <`,
                this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.toString());
                return error;
            }
        }else if(this.operador == '>='){
            if(this.nodo_derecho.tipo.type == tipos.NUMBER && this.nodo_derecho.tipo.type == tipos.NUMBER){
                return resultado_izq >= resultado_der;
            }else{
                const error = new Errror('Semantico',
                `Error al relacionar los tipos con >=`,
                this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.toString());
                return error;
            }
        }else if(this.operador == '<='){
            if(this.nodo_derecho.tipo.type == tipos.NUMBER && this.nodo_derecho.tipo.type == tipos.NUMBER){
                return resultado_izq <= resultado_der;
            }else{
                const error = new Errror('Semantico',
                `Error al relacionar los tipos con <=`,
                this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.toString());
                return error;
            }
        }else if(this.operador == '=='){
            if(this.nodo_derecho.tipo.type ==  this.nodo_derecho.tipo.type){
                return resultado_izq == resultado_der;
            }else{
                const error = new Errror('Semantico',
                `Error al relacionar los tipos con ==`,
                this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.toString());
                return error;
            }
        }else if(this.operador == '!='){
            if(this.nodo_derecho.tipo.type ==  this.nodo_derecho.tipo.type){
                return resultado_izq != resultado_der;
            }else{
                const error = new Errror('Semantico',
                `Error al relacionar los tipos con !=`,
                this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.toString());
                return error;
            }
        }
        return '';
    }
}
export {Relacional};
