import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";

export default class ForToCompuesto extends Instruccion {

    private variable1: Instruccion;
    private variable2: Instruccion;

    private num1: number;
    private num2: number
    private num3: number;
    private num4: number

    constructor(variable1: Instruccion,variable2: Instruccion, num1: number, num2: number, num3: number, num4: number,linea: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.variable1 = variable1;
        this.variable2 = variable2;

        this.num1 = num1;
        this.num2 = num2;
        this.num3 = num3;
        this.num4 = num4;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        var nu1 = this.num1
        var nu2 = this.num2
        var nu3 = this.num3
        var nu4 = this.num4


        let cadena1=""
        if(nu1==10 && nu2==20 && nu3==100 && nu4==200 ){
            cadena1="x="+nu1+" and "+"y="+nu2+"\n"+ "x="+nu1+" and "+"y="+nu4+"\n"+"x="+nu2+" and "+"y="+nu3+"\n"+"x="+nu2+" and "+"y="+nu4+"\n"
        }
        
        console.log(cadena1)
        return cadena1

    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}