import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Nativo from "../Expresiones/Nativo";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";
import BarrasNodo from "./BarrasNodo";


export default class Llamada extends Instruccion {

    public identificador: string;
    public parametros: Instruccion[];
    constructor(identificador: string, parametros: Instruccion[], fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.identificador = identificador;
        this.parametros = parametros;
    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        var ListaParamentros: Array<Instruccion> = new Array<Instruccion>();
        var listaInstrucciones: Array<Instruccion> = new Array<Instruccion>();
        var cadenaparametros = ""
        var c=0;
        var sim
        if (this.parametros != null) {
            if (this.parametros instanceof Array) {
                this.parametros.forEach(element => {
                    if (element instanceof Array) {
                        element.forEach(iteracion => {
                            
                            if (iteracion instanceof Nativo) {
                                cadenaparametros += iteracion.tipoDato.getTipo()
                            } else if (iteracion instanceof BarrasNodo) {
                                var resultador = element.interpretar(arbol, tabla, tablaxml)
                                if (resultador instanceof tablaSimbolosxml) {
                                    c++;
                                    tablaxml = resultador
                                    if (c == element.length) {
                                        if (arbol != null) {
                                            console.log("LOS ELEMENTOS DE EL RESULTADO DE LA CONSULTA\n")
                                            sim = new Simbolo(new Tipo(tipoDato.FUNCION), this.identificador, this.fila.toString(), this.columna.toString(), "", resultador);
                                            tabla.setVariable(sim)
                                            
                                        }
                                    }

                                }
                                if (resultador instanceof Array) {
                                    console.log(resultador)
                                    resultador.forEach(element => {
                                        console.log(element.getvalor());
                                    });
                                }
                            }
                        });
                    } else {
                        ////SI FUERA STRING
                    }
                });
            }
        } else {

        }
    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}