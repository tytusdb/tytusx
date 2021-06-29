import { Instruccion } from "src/app/Backend/Optimizacion/Abstracto/Instruccion";
import Arbol from "src/app/Backend/Optimizacion/Simbolo/Arbol";
import Tipo, { tipoDato } from "src/app/Backend/Optimizacion/Simbolo/Tipo";
import tablaSimbolos from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";

export default class For extends Instruccion {


    private instrucciones: Array<Instruccion>;
    private asignacion: Instruccion;
    private consulta:Instruccion;
    private respuesta:Instruccion;

    constructor(asignacion: Instruccion,consulta:Instruccion, respuesta:Instruccion, linea: number, columna: number,instrucciones?: Array<Instruccion>) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.asignacion = asignacion;
        this.consulta = consulta;
        this.instrucciones = instrucciones;
        this.respuesta=respuesta;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolos) {


    }
}