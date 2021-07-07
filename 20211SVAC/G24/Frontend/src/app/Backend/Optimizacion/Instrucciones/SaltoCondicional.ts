import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import { reporteOp } from "../Reportes/reporteOp";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";

export default class SaltoCondicional extends Instruccion {

    public identificadorVerdadero: string;
    public identificadorFalso: string;
    public Expresion: Instruccion;
    public saltoVerdadero: string;
    constructor(expresion:Instruccion, identificadorVerdadero: string,identificadorFalso: string,saltoVerdadero:string, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.identificadorVerdadero = identificadorVerdadero;
        this.identificadorFalso = identificadorFalso;
        this.Expresion= expresion;
        this.saltoVerdadero=saltoVerdadero;
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        let a=this.Expresion.interpretar(arbol,tabla);
     
        if(!isNaN(a.operadorizq)&&!isNaN(a.operadorder)){
            // los operadores son numeros
            switch(a.operador){
                case "==": 
              
                    if(a.operadorizq===a.operadorder){
                    let report = new reporteOp("Eliminar salto falso", "Regla 3",`if(${a.operadorizq}${a.operador}${a.operadorder}) goto ${this.identificadorVerdadero.toUpperCase()};\ngoto ${this.identificadorFalso};\n${this.saltoVerdadero.toUpperCase()}:`,
                    `goto ${this.identificadorVerdadero.toUpperCase()};\n${this.saltoVerdadero.toUpperCase()}:`, this.fila+"", this.columna.toString())
                    arbol.setReporte(report);
                        return ` goto ${this.identificadorVerdadero.toUpperCase()};\n${this.saltoVerdadero.toUpperCase()}:`
                    }
                    else{
                        let report = new reporteOp("Eliminar salto verdadero", "Regla 4",`if(${a.operadorizq}${a.operador}${a.operadorder}) goto ${this.identificadorVerdadero.toUpperCase()};\ngoto ${this.identificadorFalso};\n${this.saltoVerdadero.toUpperCase()}:`,
                        `goto ${this.identificadorFalso.toUpperCase()};`, this.fila+"", this.columna.toString())
                        arbol.setReporte(report);
                            return ` goto ${this.identificadorFalso.toUpperCase()};\n${this.saltoVerdadero.toUpperCase()}:`
                    }
                break;
                case "<=": 
                if(a.operadorizq<=a.operadorder){
                    let report = new reporteOp("Eliminar salto falso", "Regla 3",`if(${a.operadorizq}${a.operador}${a.operadorder}) goto ${this.identificadorVerdadero.toUpperCase()};\ngoto ${this.identificadorFalso};\n${this.saltoVerdadero.toUpperCase()}:`,
                    `goto ${this.identificadorVerdadero.toUpperCase()};\n${this.saltoVerdadero.toUpperCase()}:`, this.fila+"", this.columna.toString())
                    arbol.setReporte(report);
                        return ` goto ${this.identificadorVerdadero.toUpperCase()};\n${this.saltoVerdadero.toUpperCase()}:`
                    }
                    else{
                        let report = new reporteOp("Eliminar salto verdadero", "Regla 4",`if(${a.operadorizq}${a.operador}${a.operadorder}) goto ${this.identificadorVerdadero.toUpperCase()};\ngoto ${this.identificadorFalso};\n${this.saltoVerdadero.toUpperCase()}:`,
                        `goto ${this.identificadorFalso.toUpperCase()};`, this.fila+"", this.columna.toString())
                        arbol.setReporte(report);
                        return ` goto ${this.identificadorFalso.toUpperCase()};\n${this.saltoVerdadero.toUpperCase()}:`
                    }
                break;
                case ">=": 
                if(a.operadorizq>=a.operadorder){
                    let report = new reporteOp("Eliminar salto falso", "Regla 3",`if(${a.operadorizq}${a.operador}${a.operadorder}) goto ${this.identificadorVerdadero.toUpperCase()};\ngoto ${this.identificadorFalso};\n${this.saltoVerdadero.toUpperCase()}:`,
                    `goto ${this.identificadorVerdadero.toUpperCase()};\n${this.saltoVerdadero.toUpperCase()}:`, this.fila+"", this.columna.toString())
                    arbol.setReporte(report);
                        return ` goto ${this.identificadorVerdadero.toUpperCase()};\n${this.saltoVerdadero.toUpperCase()}:`
                    }
                    else{
                        let report = new reporteOp("Eliminar salto verdadero", "Regla 4",`if(${a.operadorizq}${a.operador}${a.operadorder}) goto ${this.identificadorVerdadero.toUpperCase()};\ngoto ${this.identificadorFalso};\n${this.saltoVerdadero.toUpperCase()}:`,
                        `goto ${this.identificadorFalso.toUpperCase()};`, this.fila+"", this.columna.toString())
                        arbol.setReporte(report);
                        return ` goto ${this.identificadorFalso.toUpperCase()};\n${this.saltoVerdadero.toUpperCase()}:`
                    }
                break;
                case "<": 
                if(a.operadorizq<a.operadorder){
                    let report = new reporteOp("Eliminar salto falso", "Regla 3",`if(${a.operadorizq}${a.operador}${a.operadorder}) goto ${this.identificadorVerdadero.toUpperCase()};\ngoto ${this.identificadorFalso};\n${this.saltoVerdadero.toUpperCase()}:`,
                    `goto ${this.identificadorVerdadero.toUpperCase()};\n${this.saltoVerdadero.toUpperCase()}:`, this.fila+"", this.columna.toString())
                    arbol.setReporte(report);
                        return ` goto ${this.identificadorVerdadero.toUpperCase()};\n${this.saltoVerdadero.toUpperCase()}:`
                    }
                    else{
                        let report = new reporteOp("Eliminar salto verdadero", "Regla 4",`if(${a.operadorizq}${a.operador}${a.operadorder}) goto ${this.identificadorVerdadero.toUpperCase()};\ngoto ${this.identificadorFalso};\n${this.saltoVerdadero.toUpperCase()}:`,
                        `goto ${this.identificadorFalso.toUpperCase()};`, this.fila+"", this.columna.toString())
                        arbol.setReporte(report);
                        return ` goto ${this.identificadorFalso.toUpperCase()};\n${this.saltoVerdadero.toUpperCase()}:`
                    }
                break;
                case ">": 
                if(a.operadorizq>a.operadorder){
                    let report = new reporteOp("Eliminar salto falso", "Regla 3",`if(${a.operadorizq}${a.operador}${a.operadorder}) goto ${this.identificadorVerdadero.toUpperCase()};\ngoto ${this.identificadorFalso};\n${this.saltoVerdadero.toUpperCase()}:`,
                    `goto ${this.identificadorVerdadero.toUpperCase()};\n${this.saltoVerdadero.toUpperCase()}:`, this.fila+"", this.columna.toString())
                    arbol.setReporte(report);
                        return ` goto ${this.identificadorVerdadero.toUpperCase()};\n${this.saltoVerdadero.toUpperCase()}:`
                    }
                    else{
                        let report = new reporteOp("Eliminar salto verdadero", "Regla 4",`if(${a.operadorizq}${a.operador}${a.operadorder}) goto ${this.identificadorVerdadero.toUpperCase()};\ngoto ${this.identificadorFalso};\n${this.saltoVerdadero.toUpperCase()}:`,
                        `goto ${this.identificadorFalso.toUpperCase()};`, this.fila+"", this.columna.toString())
                        arbol.setReporte(report);
                        return ` goto ${this.identificadorFalso.toUpperCase()};\n${this.saltoVerdadero.toUpperCase()}:`
                    }
                break;
                case "!=": 
                if(a.operadorizq!==a.operadorder){
                    let report = new reporteOp("Eliminar salto falso", "Regla 3",`if(${a.operadorizq}${a.operador}${a.operadorder}) goto ${this.identificadorVerdadero.toUpperCase()};\ngoto ${this.identificadorFalso};\n${this.saltoVerdadero.toUpperCase()}:`,
                    `goto ${this.identificadorVerdadero.toUpperCase()};\n${this.saltoVerdadero.toUpperCase()}:`, this.fila+"", this.columna.toString())
                    arbol.setReporte(report);
                        return ` goto ${this.identificadorVerdadero.toUpperCase()};\n${this.saltoVerdadero.toUpperCase()}:`
                    }
                    else{
                        let report = new reporteOp("Eliminar salto verdadero", "Regla 4",`if(${a.operadorizq}${a.operador}${a.operadorder}) goto ${this.identificadorVerdadero.toUpperCase()};\ngoto ${this.identificadorFalso};\n${this.saltoVerdadero.toUpperCase()}:`,
                        `goto ${this.identificadorFalso.toUpperCase()};`, this.fila+"", this.columna.toString())
                        arbol.setReporte(report);
                        return ` goto ${this.identificadorFalso.toUpperCase()};\n${this.saltoVerdadero.toUpperCase()}:`
                    }
                break;
    
            }


        }else{
        switch(a.operador){
            case "==": 
          
                if(a.operadorizq===a.operadorder){
                let report = new reporteOp("Negacion del if", "Regla 2",`if(${a.operadorizq}${a.operador}${a.operadorder}) goto ${this.identificadorVerdadero.toUpperCase()};\ngoto ${this.identificadorFalso};\n${this.saltoVerdadero.toUpperCase()}:`,
                `if(${a.operadorizq}!=${a.operadorder}) goto ${this.identificadorFalso.toUpperCase()};`, this.fila+"", this.columna.toString())
                arbol.setReporte(report);
                    return `if(${a.operadorizq}!=${a.operadorder}) goto ${this.identificadorFalso.toUpperCase()};`
                }
            break;
            case "<=": 
            if(a.operadorizq<=a.operadorder){
                let report = new reporteOp("Negacion del if", "Regla 2",`if(${a.operadorizq}${a.operador}${a.operadorder}) goto ${this.identificadorVerdadero.toUpperCase()};\ngoto ${this.identificadorFalso};\n${this.saltoVerdadero.toUpperCase()}:`,
                `if(${a.operadorizq}>${a.operadorder}) goto ${this.identificadorFalso.toUpperCase()};`, this.fila+"", this.columna.toString())
                arbol.setReporte(report);
                return `if(${a.operadorizq}>${a.operadorder}) goto ${this.identificadorFalso.toUpperCase()};`
            }
            break;
            case ">=": 
            if(a.operadorizq>=a.operadorder){
                let report = new reporteOp("Negacion del if", "Regla 2",`if(${a.operadorizq}${a.operador}${a.operadorder}) goto ${this.identificadorVerdadero.toUpperCase()};\ngoto ${this.identificadorFalso};\n${this.saltoVerdadero.toUpperCase()}:`,
                `if(${a.operadorizq}<${a.operadorder}) goto ${this.identificadorFalso.toUpperCase()};`, this.fila+"", this.columna.toString())
                arbol.setReporte(report);
                return `if(${a.operadorizq}<${a.operadorder}) goto ${this.identificadorFalso.toUpperCase()};`
            }
            break;
            case "<": 
            if(a.operadorizq<a.operadorder){
                let report = new reporteOp("Negacion del if", "Regla 2",`if(${a.operadorizq}${a.operador}${a.operadorder}) goto ${this.identificadorVerdadero.toUpperCase()};\ngoto ${this.identificadorFalso};\n${this.saltoVerdadero.toUpperCase()}:`,
                `if(${a.operadorizq}>${a.operadorder}) goto ${this.identificadorFalso.toUpperCase()};`, this.fila+"", this.columna.toString())
                arbol.setReporte(report);
                return `if(${a.operadorizq}>${a.operadorder}) goto ${this.identificadorFalso.toUpperCase()};`
            }
            break;
            case ">": 
            if(a.operadorizq>a.operadorder){
                let report = new reporteOp("Negacion del if", "Regla 2",`if(${a.operadorizq}${a.operador}${a.operadorder}) goto ${this.identificadorVerdadero.toUpperCase()};\ngoto ${this.identificadorFalso};\n${this.saltoVerdadero.toUpperCase()}:`,
                `if(${a.operadorizq}<${a.operadorder}) goto ${this.identificadorFalso.toUpperCase()};`, this.fila+"", this.columna.toString())
                arbol.setReporte(report);
                return `if(${a.operadorizq}<${a.operadorder}) goto ${this.identificadorFalso.toUpperCase()};`
            }
            break;
            case "!=": 
            if(a.operadorizq!==a.operadorder){
                let report = new reporteOp("Negacion del if", "Regla 2",`if(${a.operadorizq}${a.operador}${a.operadorder}) goto ${this.identificadorVerdadero.toUpperCase()};\ngoto ${this.identificadorFalso};\n${this.saltoVerdadero.toUpperCase()}:`,
                `if(${a.operadorizq}==${a.operadorder}) goto ${this.identificadorFalso.toUpperCase()};`, this.fila+"", this.columna.toString())
                arbol.setReporte(report);
                return `if(${a.operadorizq}==${a.operadorder}) goto ${this.identificadorFalso.toUpperCase()};`
            }
            break;

        }
    }
        return `if(${a.operadorizq}${a.operador}${a.operadorder}) goto ${this.identificadorVerdadero.toUpperCase()};\ngoto ${this.identificadorFalso};\n${this.saltoVerdadero.toUpperCase()}:`
 
    }

}