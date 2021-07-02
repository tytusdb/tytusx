import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";
import Simbolo from "../Simbolos/Simbolo";
import Aritmetica from "../Expresiones/Aritmetica";

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

        } else {

            var simbolo = new Simbolo(new Tipo(tipoDato.FUNCION), this.variable, this.fila.toString(), this.columna.toString(), this.expresion.toString());
            tabla.setVariable(simbolo)
        }


    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }

}