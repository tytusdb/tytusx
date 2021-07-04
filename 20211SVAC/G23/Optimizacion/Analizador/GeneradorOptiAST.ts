import { Nodo } from "../AST/Node";
import { Funcion } from "../OptimizadorAST/Funcion";
import { Operacion, TIPO_OPERACION } from "../OptimizadorValorImplicito/Operacion";
import { Exit } from "../OptimizadorPrimitivas/Exit";
import { GOTO } from "../OptimizadorAST/GOTO";
import { Etiqueta } from "../OptimizadorAST/Etiqueta";
import { Instruccion } from "../OptimizadorAST/Instruccion";
import { Asignacion } from "../OptimizadorValorImplicito/Asignacion";
import { Primitivo } from "../OptimizadorValorImplicito/Primitivo";
import { If } from "../OptimizadorCondicional/If";
import { Imprimir } from "../OptimizadorPrimitivas/Imprimir";
import { Call } from "../OptimizadorPrimitivas/Call";

export class GeneradorOptiAST{
    public funciones: Array<Funcion>;
    public head: string; //codigo donde guarda todo lo del encabezado

    public constructor(arbol: Nodo){
        this.generar(arbol);
    }

    public GeneradorOptiAST(arbol: Nodo) {
        this.generar(arbol);
    }

    private generar(raiz: Nodo) {
        let funciones = this.analizarNodo(raiz) as Array<Funcion>;
    }

    private analizarNodo(actual: Nodo): object {
        if (this.compararNodo(actual, "Inicio")) {
            this.head = "";
            this.analizarNodo(actual.hijos[0]);
            return this.analizarNodo(actual.hijos[1]);
        } else if (this.compararNodo(actual, "HEAD")) {
            this.head += "#include <stdio.h>\n";
            this.analizarNodo(actual.hijos[5]); //L_VR
            this.analizarNodo(actual.hijos[6]); //G_TMP
        } else if (this.compararNodo(actual, "L_VR")) {
            for(let hijo of actual.hijos){
                this.analizarNodo(hijo);
            }
        } else if (this.compararNodo(actual, "VR")) {
            if(actual.hijos.length == 6) {
                this.head += "float " + this.getLexema(actual.hijos[1]) + "["+ this.getLexema(actual.hijos[3]) + "];\n";
            } else {//3 HIJOS
                this.head += "int " + this.getLexema(actual.hijos[1]) + ";\n";
            }
        } else if (this.compararNodo(actual, "G_TMP")) {
            this.head += "float ";
            this.analizarNodo(actual.hijos[1]);
        } else if (this.compararNodo(actual, "L_TMP")) {
            for(let i = 0; i < actual.hijos.length; i++) {
                let temporal = actual.hijos[i];
                let cadtemporal = this.getLexema(temporal);
                if(i+1 == actual.hijos.length) {//si es el ultimo
                    this.head += cadtemporal + ";\n\n";
                } else {
                    if (cadtemporal.endsWith("0")) this.head += cadtemporal + ",\n";
                    else this.head += cadtemporal + ",";
                }
            }
        } else if (this.compararNodo(actual, "L_FUN")) {
            let funciones = new Array<Funcion>();
            for(let hijo of actual.hijos) {
                let funcion = this.analizarNodo(hijo) as Funcion;
                funciones.push(funcion);
            }
            return funciones;
        } else if (this.compararNodo(actual, "FUN")) {
            let id = this.getLexema(actual.hijos[1]);
            let etiquetas: Array<Etiqueta>;
            if (actual.hijos.length == 8) {
                let sentencias = this.analizarNodo(actual.hijos[5]) as Array<Instruccion>;
                let subetiquetas = this.analizarNodo(actual.hijos[6]) as Array<Etiqueta>;
                
                //Simulo la primera etiqueta
                let primerEtiqueta = new Etiqueta("//PET", sentencias, actual.hijos[0].id, actual.hijos[0].id);//poner parametro en el Nodo para linea y columna
                etiquetas = new Array<Etiqueta>();
                etiquetas.push(primerEtiqueta);
                for(let eti of subetiquetas) {
                    etiquetas.push(eti);
                }
            } else {//7 hijos
                if (this.compararNodo(actual.hijos[5], "L_SEN")) {
                    let sentencias = this.analizarNodo(actual.hijos[5]) as Array<Instruccion>;

                    //Simulo la primera etiqueta
                    let primerEtiqueta = new Etiqueta("//PET", sentencias, actual.hijos[0].id, actual.hijos[0].id);
                    etiquetas = new Array<Etiqueta>();
                    etiquetas.push(primerEtiqueta);
                } else {//L_ET
                    etiquetas = this.analizarNodo(actual.hijos[5]) as Array<Etiqueta>;
                }
            }
            return new Funcion(id, etiquetas);
        } else if (this.compararNodo(actual, "L_ET")) {
            let etiquetas = new Array<Etiqueta>();
            for(let hijo of actual.hijos) {
                let etiqueta = this.analizarNodo(hijo) as Etiqueta;
                etiquetas.push(etiqueta);
            }
            return etiquetas;
        } else if (this.compararNodo(actual, "ET")) {
            let id = this.getLexema(actual.hijos[0]);
            let sentencias: Array<Instruccion>;
            if (actual.hijos.length == 3) {
                sentencias = this.analizarNodo(actual.hijos[2]) as Array<Instruccion>;
            } else { //2 HIJOS
                sentencias = new Array<Instruccion>();
            }// parametros para lineas y columnas
            return new Etiqueta(id,sentencias,actual.hijos[0].id, actual.hijos[0].id);
        } else if (this.compararNodo(actual, "L_SEN")) {
            let sentencias = new Array<Instruccion>();
            for(let hijo of actual.hijos) {
                let sentencia = this.analizarNodo(hijo) as Instruccion;
                sentencias.push(sentencia);
            }
            return sentencias;
        } else if (this.compararNodo(actual, "SEN")) {
            return this.analizarNodo(actual.hijos[0]);
        } else if (this.compararNodo(actual, "ASIG")) {
            let target = this.analizarNodo(actual.hijos[0]) as unknown as string;
            let expresion = this.analizarNodo(actual.hijos[2]) as Operacion;// parametros de fila y columna
            return new Asignacion(target, expresion, actual.hijos[1].id, actual.hijos[1].id);
        } else if (this.compararNodo(actual, "TG")) {
            let target;
            if(actual.hijos.length == 1) {
                target = this.getLexema(actual.hijos[0]);
            } else {
                target = this.getLexema(actual.hijos[0]);
                target += "[" + this.analizarNodo(actual.hijos[2]) + "]";//espero que no de problemas
            }
            return target;
        } else if (this.compararNodo(actual, "INDEX")) {
            let index;
            if(actual.hijos.length == 1) {
                index = this.getLexema(actual.hijos[0]);
            } else {
                index = "(int)" + this.getLexema(actual.hijos[3]); 
            }
            return index;
        } else if (this.compararNodo(actual, "EXP")) {
            return this.analizarNodo(actual.hijos[0]);
        } else if (this.compararNodo(actual, "EXPNUM")) {
            let opIzq = this.analizarNodo(actual.hijos[0]) as Operacion;
            let operacion = this.analizarNodo(actual.hijos[1]);
            let opDer = this.analizarNodo(actual.hijos[2]) as Operacion;
            let op = new Operacion();
            op.Operation(opIzq, opDer, operacion as unknown as TIPO_OPERACION, 1, 1);
            return op;
        } else if (this.compararNodo(actual, "VALO")) {
            return this.analizarNodo(actual.hijos[0]);
        } else if (this.compararNodo(actual, "PUN")) {
            let op = new Operacion();//parametros de linea y columna
            op.Identificador(this.getLexema(actual.hijos[0]) as unknown as object ,actual.hijos[0].id, actual.hijos[0].id);
            return op;
        } else if (this.compararNodo(actual, "PRIMI")) {
            let op = new Operacion();
            let valor;
            let nuePri;
            if(actual.hijos.length == 1) {
                valor = this.getLexema(actual.hijos[0]);
                nuePri = new Primitivo(valor);//aqui puede dar problemas, espero que no.
                op.Primitivo(nuePri);
            } else {
                valor = "-" + this.getLexema(actual.hijos[1]);
                nuePri = new Primitivo(valor);//aqui puede dar problemas, espero que no.
                op.Primitivo(nuePri);
            }
            return op;
        } else if (this.compararNodo(actual, "TEMP")) {
            let op = new Operacion();
            op.Identificador(this.getLexema(actual.hijos[0]) as unknown as object, actual.hijos[0].id, actual.hijos[0].id);
            return op;
        } else if (this.compararNodo(actual, "STR")) {
            let estructura = this.getLexema(actual.hijos[0]);
            estructura += "[" + this.analizarNodo(actual.hijos[2]) + "]";
            let op = new Operacion();//parametros de linea y columna para el node
            op.Identificador(estructura as unknown as object, actual.hijos[0].id, actual.hijos[0].id);
            return op;
        } else if (this.compararNodo(actual, "ARI")) {
            return this.getOperacion(actual.hijos[0]) as unknown as object;
        } else if (this.compararNodo(actual, "IF")) {
            let condicion = this.analizarNodo(actual.hijos[2]) as Operacion;
            let etiqueta = this.getLexema(actual.hijos[5]); // tambien parametros de fila y columna
            return new If(condicion, etiqueta, actual.hijos[0].id, actual.hijos[0].id);
        } else if (this.compararNodo(actual, "COND")) {
            let izq = this.analizarNodo(actual.hijos[0]) as Operacion;
            let operacion = this.analizarNodo(actual.hijos[1]) as unknown as TIPO_OPERACION;
            let der = this.analizarNodo(actual.hijos[2]) as Operacion;
            let op = new Operacion();//parametros de fila y columna
            op.Operation(izq, der, operacion, actual.hijos[1].hijos[0].id, actual.hijos[1].hijos[0].id);
            return op;
        } else if (this.compararNodo(actual, "VALI")) {
            return this.analizarNodo(actual.hijos[0]);
        } else if (this.compararNodo(actual, "RELA")) {
            return this.getOperacion(actual.hijos[0]) as unknown as object;
        } else if (this.compararNodo(actual, "GO")) {
            let id = this.getLexema(actual.hijos[1]); // parametros de fila y columna
            return new GOTO(id, actual.hijos[0].id, actual.hijos[0].id);
        } else if (this.compararNodo(actual, "PRT")) {
            let cadena = this.getLexema(actual.hijos[2]);
            let value = this.analizarNodo(actual.hijos[4]);
            let op = new Operacion();//parametros para fila y columna
            op.Identificador(value, actual.hijos[0].id, actual.hijos[0].id); 
            return new Imprimir(op, cadena, actual.hijos[0].id, actual.hijos[0].id);
        } else if (this.compararNodo(actual, "VALP")) {
            let valp;
            if(actual.hijos.length == 1) {
                valp = this.getLexema(actual.hijos[0]);
            } else if(actual.hijos.length == 2) {
                valp = "-" + this.getLexema(actual.hijos[1]);
            } else {
                valp = "(int)" + this.getLexema(actual.hijos[3]);
            }
            return valp;
        } else if (this.compararNodo(actual, "RET")) {
            return new Exit();
        } else if (this.compararNodo(actual, "CALL")) {
            let id = this.getLexema(actual.hijos[0]);
            return new Call(id);
        }
        return null;
    }

    public compararNodo(nodo: Nodo, nombre: string): boolean {
        return nodo.nombre == nombre ;
    }

    private getLexema(nodo: Nodo): string {
        return nodo.valor;
    }

    private getOperacion(nodo: Nodo): TIPO_OPERACION {
        let nombre = nodo.valor;
        if (nombre.includes(">=")) return TIPO_OPERACION.MAYOR_IGUA_QUE;
        else if (nombre.includes("<=")) return TIPO_OPERACION.MENOR_IGUA_QUE;
        else if (nombre.includes("!=")) return TIPO_OPERACION.DIFERENTE_QUE;
        else if (nombre.includes(">")) return TIPO_OPERACION.MAYOR_QUE;
        else if (nombre.includes("<")) return TIPO_OPERACION.MENOR_QUE;
        else if (nombre.includes("==")) return TIPO_OPERACION.IGUAL_IGUAL;
        else if (nombre.includes("+")) return TIPO_OPERACION.SUMA;
        else if (nombre.includes("-")) return TIPO_OPERACION.RESTA;
        else if (nombre.includes("*")) return TIPO_OPERACION.MULTIPLICACION;
        else if (nombre.includes("/")) return TIPO_OPERACION.DIVISION;
        else return TIPO_OPERACION.MODULO; //MODULO
    }
}