import { Nodo } from "../AST/Nodo";
import { Tabla } from "../AST/Tabla";
import { Arbol } from "../AST/Arbol";
import { Errror } from "../AST/Errror";
import { tipos, Tipo } from "../AST/Tipo";

class Logica extends Nodo{

    nodo_izquierdo: Nodo;
    nodo_derecho: Nodo;
    operador: string;

    constructor(nodo_izquierdo: Nodo, nodo_derecho: Nodo, operador: string, linea: number, columna: number){
        super(new Tipo(tipos.BOOLEAN), linea, columna);
        this.nodo_izquierdo = nodo_izquierdo;
        this.nodo_derecho = nodo_derecho;
        this.operador = operador;
    }
    traducir(tabla: Tabla, arbol: Arbol){
        if(this.nodo_derecho != null){
            const resultado_izq  =  this.nodo_izquierdo.traducir(tabla,arbol);
            if(resultado_izq instanceof Errror){
                return resultado_izq;
            }
            const resultado_der = this.nodo_derecho.traducir(tabla, arbol);
            if(resultado_der instanceof Errror){
                return  resultado_der;
            }
            let tmp = arbol.generar_temporal();
            let e_si = arbol.generar_etiqueta();
            let e_no = arbol.generar_etiqueta();
            let e_fin = arbol.generar_etiqueta();

            if(this.operador == '&&'){
                if (this.nodo_izquierdo.tipo.type == tipos.BOOLEAN &&
                        this.nodo_derecho.tipo.type == tipos.BOOLEAN) {

                        arbol.contenido += "\n//--------- Logica && --------";
                        arbol.contenido += "\nif(" + resultado_izq + " && " + resultado_der + ") goto " + e_si + ";";
                } else {
                    const error = new Errror('Semantico',"AND",this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.toString());
                    return error;
                }
            }else if(this.operador == '||'){
                if (this.nodo_izquierdo.tipo.type == tipos.BOOLEAN &&
                        this.nodo_derecho.tipo.type == tipos.BOOLEAN) {

                        arbol.contenido += "\n//--------- Logica || --------";
                        arbol.contenido += "\nif(" + resultado_izq + " || " + resultado_der + ") goto " + e_si + ";";
                } else {
                    const error = new Errror('Semantico',"AND",this.linea, this.columna);
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

        }else{
                const resultado_izq  =  this.nodo_izquierdo.traducir(tabla,arbol);
                if(resultado_izq instanceof Errror){
                    return resultado_izq;
                }
                if (this.operador == '!') {
                    let tmp = arbol.generar_temporal();
                    let e_si = arbol.generar_etiqueta();
                    let e_no = arbol.generar_etiqueta();
                    let e_fin = arbol.generar_etiqueta();


                    if (this.nodo_izquierdo.tipo.type == tipos.BOOLEAN) {
                        arbol.contenido += "\n/*****Negacion !****/";
                        arbol.contenido += "\nif(!" + resultado_izq +   ") goto " + e_si + ";";
                        arbol.contenido += "\ngoto " + e_no + ";";
                        arbol.contenido += "\n" + e_si + ":";
                        arbol.contenido += "\n" + tmp + " = 1;";
                        arbol.contenido += "\ngoto " + e_fin + ";";
                        arbol.contenido += "\n" + e_no + ":";
                        arbol.contenido += "\n" + tmp + " = 0;";
                        arbol.contenido += "\n" + e_fin + " :";
                        return tmp;

                    } else {
                        const error = new Errror('Semantico',"Negacion",this.linea, this.columna);
                        arbol.errores.push(error);
                        arbol.consola.push(error.toString());
                        return error;
                    }
                }else {
                    const error = new Errror('Semantico',"Desconcido",this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.toString());
                    return error;
                }

        }
        return '';
    }
    ejecutar(tabla: Tabla, arbol: Arbol){
        if(this.nodo_derecho != null){
            const resultado_izq  =  this.nodo_izquierdo.ejecutar(tabla,arbol);
            if(resultado_izq instanceof Errror){
                return resultado_izq;
            }
            const resultado_der = this.nodo_derecho.ejecutar(tabla, arbol);
            if(resultado_der instanceof Errror){
                return  resultado_der;
            }

            if(this.operador == '&&'){
                if (this.nodo_izquierdo.tipo.type == tipos.BOOLEAN &&
                        this.nodo_derecho.tipo.type == tipos.BOOLEAN) {
                    return resultado_izq && resultado_der;
                } else {
                    const error = new Errror('Semantico',"AND",this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.toString());
                    return error;
                }
            }else if(this.operador == '||'){
                if (this.nodo_izquierdo.tipo.type == tipos.BOOLEAN &&
                        this.nodo_derecho.tipo.type == tipos.BOOLEAN) {
                    return resultado_izq || resultado_der;
                } else {
                    const error = new Errror('Semantico',"OR",this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.toString());
                    return error;
                }
            } else {
                const error = new Errror('Semantico',"OR",this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.toString());
                return error;
            }
        }else{
            const resultado_izq  =  this.nodo_izquierdo.ejecutar(tabla,arbol);
            if(resultado_izq instanceof Errror){
                return resultado_izq;
            }
            if (this.operador == '!') {
                if (this.nodo_izquierdo.tipo.type == tipos.BOOLEAN) {
                    return !resultado_izq;
                } else {
                    const error = new Errror('Semantico',"Negacion",this.linea, this.columna);
                    arbol.errores.push(error);
                    arbol.consola.push(error.toString());
                    return error;
                }
            }else {
                const error = new Errror('Semantico',"Desconcido",this.linea, this.columna);
                arbol.errores.push(error);
                arbol.consola.push(error.toString());
                return error;
            }
        }
      return '';
    }
}
export{Logica};
