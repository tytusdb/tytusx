
import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";
import Declaracion from "./Declaracion";


export default class Funcion extends Instruccion {
    public Identificador: String;
    public Parametros: Instruccion[];
    public Tipo: Tipo;
    public Bloque: Instruccion[];

    constructor(identificador: String, parametros: Instruccion[], tipo: Tipo, bloque: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.Identificador = identificador;
        this.Parametros = parametros;
        this.Tipo = tipo;
        this.Bloque = bloque;
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        var listaelementos=""
        if (this.Parametros != null) {
            this.Parametros.forEach(element => {
                if(element instanceof Declaracion){
                    var res=element.interpretar(arbol,tabla,tablaxml)
                    listaelementos+= element.Tipo
                }
                
               
            });
            var simbolo = new Simbolo(this.Tipo, this.Identificador+listaelementos, this.fila.toString(), this.columna.toString(),"Global", this.Parametros);
            tabla.setVariable(simbolo)
            var simbolo = new Simbolo(this.Tipo, this.Identificador, this.fila.toString(), this.columna.toString(),"Global", this.Bloque);
            tabla.setVariable(simbolo)
            
        } else {
            var simbolo = new Simbolo(this.Tipo, this.Identificador+"par", this.fila.toString(), this.columna.toString(),"Global", this.Bloque);
            tabla.setVariable(simbolo)
        }


    }

    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
}