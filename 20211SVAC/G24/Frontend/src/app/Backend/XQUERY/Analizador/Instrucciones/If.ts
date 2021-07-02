import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";

export default class If extends Instruccion {
    public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        throw new Error("Method not implemented.");
    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    
    private condicion: Instruccion;
    private insThen: Array<Instruccion> | null;
    private insElse: Instruccion | null;

    constructor(condicion: Instruccion, linea: number, columna: number, insThen: Array<Instruccion>, insElse?: Instruccion) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.condicion = condicion;
        this.insThen = insThen;
        this.insElse = insElse;
    }
    

}