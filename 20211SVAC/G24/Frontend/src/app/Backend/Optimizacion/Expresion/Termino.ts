import tablaSimbolos from "../../XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import Tipo, { tipoDato } from "../Simbolo/Tipo";

export default class Termino extends Instruccion {
    valor: any;
    constructor(tipo: Tipo, valor: any, fila: number, columna: number) {
        super(tipo, fila, columna);
        this.valor = valor;
        if (tipo.getTipo() == tipoDato.CADENA) {
            let val = this.valor.toString();
            this.valor = val
                .replace('\\n', '\n')
                .replace('\\t', '\t')
                .replace('\\r', '\r')
                .replace('\\\\', '\\')
                .replace("\\'", "'")
                .replace('\\"', '"');
        }
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolos) {
        if (this.tipoDato.getTipo() == tipoDato.BOOLEANO) {
            return this.valor == 'true' ? true : false;
        }else if(this.tipoDato.getTipo()== tipoDato.CADENA){
            return {tipo: tipoDato.CADENA, contenido: "\""+this.valor+"\""}
        }else if(this.tipoDato.getTipo()== tipoDato.TEMPORAL){
            return {tipo: tipoDato.TEMPORAL, contenido:this.valor }
        }else if(this.tipoDato.getTipo()== tipoDato.ENTERO){
            return {tipo: tipoDato.ENTERO, contenido:parseInt(this.valor) }
        }else if(this.tipoDato.getTipo()== tipoDato.PILA){
            return {tipo: tipoDato.PILA, contenido:this.valor }
        }else if(this.tipoDato.getTipo()== tipoDato.PUNTERO){
            return {tipo: tipoDato.PUNTERO, contenido:this.valor }
        }else if(this.tipoDato.getTipo()== tipoDato.DECIMAL){
            return {tipo: tipoDato.DECIMAL, contenido:this.valor }
        }
        return this.valor;
    }
}