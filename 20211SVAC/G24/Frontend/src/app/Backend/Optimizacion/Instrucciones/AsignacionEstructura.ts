import { listaErrores } from "src/app/componentes/contenido-inicio/contenido-inicio.component";
import NodoErrores from "../../XML/Analizador/Excepciones/NodoErrores";
import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Aritmetica from "../Expresion/Aritmetica";
import Bit from "../Expresion/Bit";
import Identificador from "../Expresion/Identificador";
import Logica from "../Expresion/Logica";
import Relacional from "../Expresion/Relacional";
import Termino from "../Expresion/Termino";
import Unario from "../Expresion/Unario";
import { reporteOp } from "../Reportes/reporteOp";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";

export default class AsignacionEstructura extends Instruccion {

    private Temporales: Instruccion;
    private ListaCorchetes: Instruccion;
    private Expresion: Instruccion;
    constructor(termino: Instruccion, l_corchetes: Instruccion, expresion: Instruccion, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.Temporales = termino
        this.ListaCorchetes = l_corchetes
        this.Expresion = expresion
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        // si es Temporal y si es expresion las instrucciones, ListaCorchetes tipo Instruccion
        let idtemp = ""
        let cadena = ""
        if (this.Temporales != null) {
            if (this.Temporales instanceof Termino) {
                let a = this.Temporales.interpretar(arbol, tabla)
                idtemp = a.contenido;
                cadena += idtemp + " "

            } else if (this.Temporales instanceof Identificador) {
                let a = this.Temporales.interpretar(arbol, tabla)
                idtemp = a.contenido;
                cadena += idtemp + " "
            }
        }
        if (this.ListaCorchetes != null) {
            var stack = /\[/gi;
            if (this.ListaCorchetes instanceof Array) {
                for (var a of this.ListaCorchetes) {
                    let temporal: Termino = a
                    let aux = temporal.interpretar(arbol, tabla);
                    cadena += "[" + aux.contenido + "] ="
                }
            }
        }
        if (this.Expresion != null) {
            if (this.Expresion instanceof Aritmetica) {
                let a = this.Expresion.interpretar(arbol, tabla)
                if (a.operadorder === "0" && a.operador === "+" || a.operadorder == 0 && a.operador === "+") {
                    let report = new reporteOp("Simplificación algebraica y por fuerza", "Regla 12", idtemp + "= " + a.operadorizq + "+0;", idtemp + "=" + a.operadorizq + ";", a.linea, a.columna)
                    arbol.setReporte(report)
                    return idtemp + "=" + a.operadorizq + ";"
                } else if (a.operadorizq === "0" && a.operador === "+" || a.operadorizq == 0 && a.operador === "+") {
                    let report = new reporteOp("Simplificación algebraica y por fuerza", "Regla 12", idtemp + "= 0+" + a.operadorder + ";", idtemp + "=" + a.operadorder + ";", a.linea, a.columna)
                    arbol.setReporte(report)
                    return idtemp + "=" + a.operadorder + ";"
                } else if (a.operadorder === "0" && a.operador === "-" || a.operadorder == 0 && a.operador === "-") {
                    let report = new reporteOp("Simplificación algebraica y por fuerza", "Regla 13", idtemp + "=" + a.operadorizq + "-0;", idtemp + "=" + a.operadorizq + ";", a.linea, a.columna)
                    arbol.setReporte(report)
                    return idtemp + "=" + a.operadorizq + ";"
                } else if (a.operadorizq === "0" && a.operador === "-" || a.operadorizq == 0 && a.operador === "-") {
                    let report = new reporteOp("Simplificación algebraica y por fuerza", "Regla 13", idtemp + "= 0-" + a.operadorder + ";", idtemp + "=" + a.operadorder + ";", a.linea, a.columna)
                    arbol.setReporte(report)
                    return idtemp + "=" + a.operadorder + ";"
                } else if (a.operadorder === "1" && a.operador === "*" || a.operadorder == 1 && a.operador === "*") {
                    let report = new reporteOp("Simplificación algebraica y por fuerza", "Regla 14", idtemp + "=" + a.operadorizq + "*1;", idtemp + "=" + a.operadorizq + ";", a.linea, a.columna)
                    arbol.setReporte(report)
                    return idtemp + "=" + a.operadorizq + ";"
                } else if (a.operadorizq === "1" && a.operador === "*" || a.operadorizq == 1 && a.operador === "*") {
                    let report = new reporteOp("Simplificación algebraica y por fuerza", "Regla 14", idtemp + "= 1*" + a.operadorder + ";", idtemp + "=" + a.operadorder + ";", a.linea, a.columna)
                    arbol.setReporte(report)
                    return idtemp + "=" + a.operadorder + ";"
                } else if (a.operadorder === "2" && a.operador === "*" || a.operadorder == 2 && a.operador === "*") {
                    let report = new reporteOp("Simplificación algebraica y por fuerza", "Regla 16", idtemp + "=" + a.operadorizq + "*2;", idtemp + "=" + a.operadorizq + "+" + a.operadorizq + ";", a.linea, a.columna)
                    arbol.setReporte(report)
                    return idtemp + "=" + a.operadorizq + "+" + a.operadorizq + ";"
                } else if (a.operadorizq === "2" && a.operador === "*" || a.operadorizq == 2 && a.operador === "*") {
                    let report = new reporteOp("Simplificación algebraica y por fuerza", "Regla 16", idtemp + "= 2*" + a.operadorder + ";", idtemp + "=" + a.operadorder + "+" + a.operadorder + ";", a.linea, a.columna)
                    arbol.setReporte(report)
                    return idtemp + "=" + a.operadorizq + "+" + a.operadorizq + ";"
                } else if (a.operadorder === "0" && a.operador === "*" || a.operadorder == 0 && a.operador === "*") {
                    let report = new reporteOp("Simplificación algebraica y por fuerza", "Regla 17", idtemp + "=" + a.operadorizq + "*0;", idtemp + "=" + "0;", a.linea, a.columna)
                    arbol.setReporte(report)
                    return idtemp + "=" + "0;"
                } else if (a.operadorizq === "0" && a.operador === "*" || a.operadorizq == 0 && a.operador === "*") {
                    let report = new reporteOp("Simplificación algebraica y por fuerza", "Regla 17", idtemp + "= 0*" + a.operadorder + ";", idtemp + "=" + "0;", a.linea, a.columna)
                    arbol.setReporte(report)
                    return idtemp + "=" + "0;"
                } else if (a.operadorder === "1" && a.operador === "/" || a.operadorder == 1 && a.operador === "/") {
                    let report = new reporteOp("Simplificación algebraica y por fuerza", "Regla 15", idtemp + "=" + a.operadorizq + "/1;", idtemp + "=" + a.operadorizq + ";", a.linea, a.columna)
                    arbol.setReporte(report)
                    return idtemp + "=" + a.operadorizq + ";"
                } else if (a.operadorizq === "0" && a.operador === "/" || a.operadorizq == 0 && a.operador === "/") {
                    let report = new reporteOp("Simplificación algebraica y por fuerza", "Regla 18", idtemp + "= 0/" + a.operadorder + ";", idtemp + "=" + "0;", a.linea, a.columna)
                    arbol.setReporte(report)
                    return idtemp + "=" + "0;"
                } else if (a.operadorder === "0" && a.operador === "/" || a.operadorder == 0 && a.operador === "/") {
                    listaErrores.push(new NodoErrores("Lexico Optimizacion","No se puede operar /0 ",this.fila, this.columna));
                    return ""
                } else if (a.operadorizq === "1" && a.operador === "/" || a.operadorder == 1 && a.operador === "/") {
                    return idtemp + "=" + a.operadorizq + a.operador + a.operadorder + ";"
                } else {
                    return idtemp + "=" + a.operadorizq + a.operador + a.operadorder + ";"
                }

            } else if (this.Expresion instanceof Logica) {
                let a = this.Expresion.interpretar(arbol, tabla)
                return idtemp + "=" + a.operadorizq + a.operador + a.operadorder + ";"
            } else if (this.Expresion instanceof Relacional) {
                let a = this.Expresion.interpretar(arbol, tabla)
                return idtemp + "=" + a.operadorizq + a.operador + a.operadorder + ";"
            } else if (this.Expresion instanceof Bit) {
                let a = this.Expresion.interpretar(arbol, tabla)
                return idtemp + "=" + a.operadorizq + a.operador + a.operadorder + ";"
            } else if (this.Expresion instanceof Unario) {
                let a = this.Expresion.interpretar(arbol, tabla)
                return idtemp + "=" + a.operadorizq + a.operador + a.operadorder + ";"
            } else if (this.Expresion instanceof Identificador) {
                //SE HACE OTRO PROCEDIMIENTO
            } else if (this.Expresion instanceof Termino) {
                //SE HACE OTRO PROCEDIMIENTO
            }


        }
    }

}