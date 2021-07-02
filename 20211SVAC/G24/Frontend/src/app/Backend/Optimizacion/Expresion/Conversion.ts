import { listaErrores } from "src/app/componentes/contenido-inicio/contenido-inicio.component";
import NodoErrores from "../../XML/Analizador/Excepciones/NodoErrores";
import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";
import Termino from "./Termino";

export default class Conversion extends Instruccion {
    private tipo: String;
    private expresion: Instruccion;
    constructor(operando:String, expresion2: Instruccion, fila: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), fila, columna);
        this.tipo=operando
        this.expresion= expresion2
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        // operando1 operacion operando2
        let variable= this.expresion.interpretar(arbol, tabla);
        if(this.tipo==="int"){
            if(this.expresion instanceof Termino){
                return "(int) "+variable.contenido
            }
        }else if(this.tipo==="double"){
            if(this.expresion instanceof Termino){
                return "(double) "+variable.contenido
            }
        }else if(this.tipo==="float"){
            if(this.expresion instanceof Termino){
                return "(float) "+variable.contenido
            }
        }else if(this.tipo==="char"){
            if(this.expresion instanceof Termino){
                return "(char) "+variable.contenido
            }
        }else{
            //ERROR SEMANTICO SON TODOS LOS TIPOS SOPORTADOS POR C
            listaErrores.push(new NodoErrores("Semantico Optimizacion", "Tipo de conversion no soportados por c",this.fila,this.columna));
        }
        
    }

}