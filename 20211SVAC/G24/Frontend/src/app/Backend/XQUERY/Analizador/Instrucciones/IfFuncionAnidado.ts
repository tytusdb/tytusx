import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import BarrasNodo from "src/app/Backend/XQUERY/Analizador/Instrucciones/BarrasNodo";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Variable from "../Expresiones/Variable";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";
import CondicionSimple from "./CondicionSimple";

export default class IfFuncion extends Instruccion {
    public condicion1: Instruccion;
    public instruccionThen: Array<Instruccion> | null;
    public condicion2: Instruccion;
    public instruccionThen2: Array<Instruccion> | null;
    public instruccionElse: Instruccion | null;


    constructor(condicion1: Instruccion, instruccionThen: Array<Instruccion>, condicion2: Instruccion, instruccionThen2: Array<Instruccion>, instruccionElse: Instruccion, linea: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.condicion1 = condicion1;
        this.instruccionThen = instruccionThen;
        this.condicion2 = condicion2;
        this.instruccionThen2 = instruccionThen2;
        this.instruccionElse = instruccionElse;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        var value: any;
        value = this.condicion1.interpretar(arbol, tabla, tablaxml);
        console.log("condicion 1")
        console.log(value)

        var result = null;
        if (Boolean(value)) {
            for (let m of this.instruccionThen) {
                result = m.interpretar(arbol, tabla, tablaxml)

            }
        } else {
            var value2: any
            value2 = this.condicion2.interpretar(arbol, tabla, tablaxml)
            console.log("condicion2")
            console.log(value2)
            if (Boolean(value2)) {
                for (let n of this.instruccionThen2) {
                    result = n.interpretar(arbol, tabla, tablaxml)

                }
            } else {
                if (this.instruccionElse instanceof Instruccion) {
                    if (this.instruccionElse instanceof Variable) {
                        result = this.instruccionElse.interpretar(arbol, tabla, tablaxml);
                        var buscar = tabla.getVariable(result);
                        if (buscar != null) {
                            result = buscar.getvalor()
                            return buscar
                        }
                    } else {
                        result = this.instruccionElse.interpretar(arbol, tabla, tablaxml);

                    }
                } else {
                    result = this.instruccionElse
                }
                console.log(result)

            }
        }
        return result;


    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }




}