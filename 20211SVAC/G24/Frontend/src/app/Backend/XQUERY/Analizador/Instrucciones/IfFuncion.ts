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
    private condicion: Instruccion;
    private insThen: Array<Instruccion> | null;
    private insElse: Instruccion | null;


    constructor(condicion: Instruccion, insThen: Array<Instruccion>, linea: number, columna: number, insElse?: Instruccion) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.condicion = condicion;
        this.insThen = insThen;
        this.insElse = insElse;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {

        var value: any;
        value = this.condicion.interpretar(arbol, tabla, tablaxml);
        console.log("condicion ")
        console.log(value)

        var result = null;
        if (Boolean(value)) {
            for (let m of this.insThen) {
                if (m instanceof Instruccion) {
                    result = m.interpretar(arbol, tabla, tablaxml)
                }
                result=this.insThen
            }

        } else {

            if (this.insElse instanceof Instruccion) {
                if (this.insElse instanceof Variable) {
                    result = this.insElse.interpretar(arbol, tabla, tablaxml);
                    var buscar = tabla.getVariable(result);
                    if (buscar != null) {
                        result = buscar.getvalor()
                        return buscar
                    }
                } else {
                    result = this.insElse.interpretar(arbol, tabla, tablaxml);

                }
            } else {
                result = this.insElse
            }
            console.log(result)


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