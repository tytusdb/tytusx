import { Entorno } from "../AST/Entorno";
import errores from "../Global/ListaError";
import { Expresion} from "../Interfaz/expresion";

export class Primitiva implements Expresion {
    linea: number;
    columna: number;
    valor: any;
    tipo: TipoPrim;
    constructor(valor: any, tipo: TipoPrim, linea: number, columna: number){
        this.linea  = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
    }

    getTipo(ent: Entorno){
        return this.tipo;
    }

    getValor(ent: Entorno){
        if (this.tipo === TipoPrim.IDENTIFIER){
            /* SE BUSCAN LAS ETIQUETAS CON ESTE NOMBRE */
            if (ent.existeSimbolo(this.valor)){
                return ent.obtenerSimbolo(this.valor);
            }else{
                errores.agregarError('semantico', 'No existe el simbolo ' + this.valor, this.linea, this.columna);
                this.tipo = TipoPrim.ERROR;
                return null;
            }
        }else if (this.tipo === TipoPrim.ATRIBUTO){
            /* SE BUSCAN LOS ATRIBUTOS CON ESTE NOMBRE */
        }else
            return this.valor;
    }
}

export enum TipoPrim{
    INTEGER,
    DOUBLE,
    CADENA,
    IDENTIFIER,
    ATRIBUTO,
    DOT,
    FUNCION,
    BOOLEAN,
    ERROR,
}