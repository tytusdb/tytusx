import { Instruccion } from "src/app/Backend/Optimizacion/Abstracto/Instruccion";
import Arbol from "src/app/Backend/Optimizacion/Simbolo/Arbol";
import Tipo, { tipoDato } from "src/app/Backend/Optimizacion/Simbolo/Tipo";
import tablaSimbolos from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";

export default class For extends Instruccion {


    private instrucciones: Array<Instruccion>;
    private declarasignacion: Instruccion;
    private condicion: Instruccion;
    private actualizacion: Instruccion;

    constructor(declarasignacion: Instruccion, condicion: Instruccion, actualizacion: Instruccion, instrucciones: Array<Instruccion>, linea: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.condicion = condicion;
        this.declarasignacion = declarasignacion;
        this.actualizacion = actualizacion;
        this.instrucciones = instrucciones;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}