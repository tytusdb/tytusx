import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Tipo, { tipoDato } from '../Simbolos/Tipo';
import tablaSimbolos from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";

export default class If extends Instruccion {
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
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