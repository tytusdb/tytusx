import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";
import Simbolo from "../Simbolos/Simbolo";
import Aritmetica from "../Expresiones/Aritmetica";
import BarrasNodo from "./BarrasNodo";

export default class Let extends Instruccion {

    private variable: String;
    private expresion: Instruccion | String;
    private retorno: Instruccion | String;

    constructor(variable: String, expreison: Instruccion | String, retorno: Instruccion | String, linea: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.variable = variable;
        this.expresion = expreison;
        this.retorno = retorno;
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {

        if (this.expresion instanceof Instruccion) {
            var search = tabla.getVariable(this.variable);
            if (search == null) {
                //NO SE ENCONTRO NINGUNA COINCIDENCIA CON LA VARIABLE
                var resexp = this.expresion.interpretar(arbol, tabla, tablaxml)

                var simbolo = new Simbolo(new Tipo(tipoDato.FUNCION), this.variable, this.fila.toString(), this.columna.toString(), "", resexp);
                tabla.setVariable(simbolo)
                //PARTE DE RETORNO QUE FUNCIONA COMO UN PRINT
                //var resultadoretorno = this.retorno.interpretar(arbol, tabla, tablaxml);

                if (this.retorno instanceof Instruccion) {

                } else {
                    if (this.retorno as string) {
                        console.log(typeof this.retorno)
                        var buscar = tabla.getVariable(this.retorno);
                        if (buscar != null) {
                            return buscar
                        }
                    }
                }
            } else {
                //SI SE ENCONTRO COINCIDENCIA POR ENDE NO SE PUEDE VOLVER A DECLARAR ESE LET
            }

        } else if (this.expresion instanceof Array) {
            var sim;
            let c = 0;
            var cadena = '';
            var retornoscadena = null;
            let salidas: tablaSimbolos = new tablaSimbolos();
            var longitud = this.expresion.length
            this.expresion.forEach(element => {
                c++
                if (element as BarrasNodo) {
                    //se compara el tablaxml para hacer validar los datos
                    var resultador = element.interpretar(arbol, tabla, tablaxml)
                    if (resultador instanceof tablaSimbolosxml) {
                        tablaxml = resultador
                        if (c == longitud) {
                            if (arbol != null) {
                                console.log("LOS ELEMENTOS DE EL RESULTADO DE LA CONSULTA\n")
                                sim = new Simbolo(new Tipo(tipoDato.FUNCION), this.variable, this.fila.toString(), this.columna.toString(), "", resultador);
                                tabla.setVariable(sim)
                                var buscar = tabla.getVariable(this.retorno.toString());
                                if (buscar != null) {
                                    retornoscadena = buscar.getvalor()
                                    return buscar
                                }
                            }
                        }

                    }
                    if (resultador instanceof Array) {
                        console.log(resultador)
                        if (this.retorno as string) {
                            console.log(typeof this.retorno)
                            sim = new Simbolo(new Tipo(tipoDato.FUNCION), this.variable, this.fila.toString(), this.columna.toString(), "", resultador);
                            tabla.setVariable(sim)
                            var buscar = tabla.getVariable(this.retorno.toString());
                            if (buscar != null) {
                                retornoscadena = buscar.getvalor()
                                return buscar
                            }
                        }
                    }

                }
            });
            if (cadena != '') {
                return cadena
            }
            if (retornoscadena != null) {
                return retornoscadena
            }
            if (salidas != null) {
                return salidas
            }

        }


    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }

}