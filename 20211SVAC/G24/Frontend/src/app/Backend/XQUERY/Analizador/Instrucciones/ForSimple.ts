import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Tipo, { tipoDato } from '../Simbolos/Tipo';
import tablaSimbolos from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";

export default class ForSimple extends Instruccion {
  
    public consulta: Instruccion;
    public respuesta:Instruccion;
    public thewhere:Instruccion;
    public theorderby:Instruccion;

    constructor(consulta: Instruccion, respuesta:Instruccion, linea: number, columna: number,thewhere?:Instruccion,theorderby?:Instruccion) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.consulta = consulta;
        this.respuesta=respuesta;
        this.thewhere=thewhere;
        this.theorderby=theorderby;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    console.log("aqui iria la consulta");
      console.log(tabla);

    }
    public getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    public codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}