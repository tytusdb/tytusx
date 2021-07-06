import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import BarrasNodo from "src/app/Backend/XQUERY/Analizador/Instrucciones/BarrasNodo";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";
import CondicionSimple from "./CondicionSimple";

export default class IfFuncion extends Instruccion {
    private condicion: Instruccion;
    private insThen: Array<Instruccion> | null;
    private insElse: Instruccion | null;

    constructor(condicion: Instruccion, linea: number, columna: number, insThen: Array<Instruccion>, insElse?: Instruccion) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.condicion = condicion;
        this.insThen = insThen;
        this.insElse = insElse;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        let c = 0;
        let sym;
        let searchconsulta;


    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }




}