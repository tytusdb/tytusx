import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";


export default class Recursivo extends Instruccion {

    public expresion1: Instruccion;
    public expresion2: Instruccion;
    public conector:String;
    constructor(exp1: Instruccion,conect:String, exp2: Instruccion, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.expresion1 = exp1;
        this.expresion2 = exp2;
        this.conector=conect;
    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        var operacion1=this.expresion1.interpretar(arbol,tabla,tablaxml)
        var operacion2=this.expresion2.interpretar(arbol,tabla,tablaxml)
        if(this.conector==="and"){
            //this.expresion1.tipoDato.getTipo()==tipoDato.CADENA
            return "true"
        }else if(this.conector==="or"){
            return "true"
        }else if(this.conector==="to"){
            
        }
    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}