
import NodoErrores from "src/app/Backend/XML/Analizador/Excepciones/NodoErrores";
import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";

export default class Asignacion extends Instruccion {
    private id: string;
    private valor: Instruccion;

    constructor(id: string, valor: Instruccion, linea: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.id = id;
        this.valor = valor;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        var simbolo = tabla.getVariable(this.id.toLowerCase());

        if (simbolo == null) return new NodoErrores("Semantico", "Variable no encontrada", this.fila, this.columna);
        var value: any;
        value = null;
        value = this.valor.interpretar(arbol, tabla, tablaxml)

            
        simbolo.setvalor(value);
        return null;    
    }
    getNodoAST(): nodoAST {
        var nodo=new nodoAST("Asignacion");
        nodo.agregarHijo(this.id);
        nodo.agregarHijo("=");
        nodo.agregarHijoAST(this.valor.getNodoAST())
        return nodo;
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }

 }
