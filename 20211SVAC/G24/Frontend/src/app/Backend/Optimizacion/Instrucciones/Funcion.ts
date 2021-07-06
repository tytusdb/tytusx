import Simbolo from "../../XML/Analizador/Simbolos/Simbolo";
import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import { reporteOp } from "../Reportes/reporteOp";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";
import Etiqueta from "./Etiqueta";
import SaltoIncondicional from "./SaltoIncondicional";

export default class Funcion extends Instruccion {

    public identificador: string;
    public instrucciones: Instruccion[];
    constructor(identificador: string, expresion: Instruccion[], fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.identificador = identificador;
        this.instrucciones = expresion
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        // void main (){ INSTRUCCIONES Y POR ULTIMO AGREGAR CADENA "}" ACA SE HARA LA MAGIA
        let cadena = ""
        cadena += this.identificador + "\n"
        let simbolo;
        let saltoIncondicional:string="";
        let cadenaTemporal:string="";
        if (this.instrucciones != null) {
            for (var ins of this.instrucciones) {
               
                var r = ins.interpretar(arbol, tabla);
                 
                 if (r instanceof SaltoIncondicional){
                    if(saltoIncondicional===""){

                        cadena+=`goto ${r.identificador.toUpperCase()}; \n`
                        cadenaTemporal=cadena
                        saltoIncondicional=r.identificador.toUpperCase();
                    }
                    else{
                        cadena+=`goto ${r.identificador.toUpperCase()}; \n`
                    }
                     
                }
                else  if (r instanceof Etiqueta){
                    
                    if(r.identificador.toUpperCase()===saltoIncondicional){
                        saltoIncondicional=""; 
                        let report = new reporteOp("Eliminacion de codigo muerto", "Regla 1",cadena.replace(cadenaTemporal,''),r.identificador.toUpperCase(), this.fila+"", this.columna.toString())
                        cadena=`${cadenaTemporal}${r.identificador.toUpperCase()}:\n`
                        cadenaTemporal="";
                        arbol.setReporte(report)
                    }else{
                        cadena+=`${r.identificador.toUpperCase()}:\n`
                    }
                }
                else 
                {
                 cadena += r + "\n"
                }
                     
                
            }
        }
        return cadena + "}\n"
    }

}