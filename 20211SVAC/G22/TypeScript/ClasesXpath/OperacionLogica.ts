import { ArbolXpath } from "../Arboles/ArbolXpath";
import { NodoRutaXpath } from "../Interfaces/NodoRutaXpath";
import { OperacionAritmetica } from "./OperacionAritmetica";
import { OperacionRelacional } from "./OperacionRelacional";
import { Operador } from "./Operador";
import { TiposXpath } from "./TiposXpath";

export class OperacionLogica implements NodoRutaXpath {
    linea: number;
    columna: number;
    op_izquierda: OperacionRelacional;
    op_derecha: OperacionRelacional;
    operador: Operador;

    constructor(op_izquierda: OperacionRelacional, op_derecha: OperacionRelacional,
        operacion: Operador, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
    }
    getTipo(arbol: ArbolXpath): TiposXpath {
        return TiposXpath.STRING;
    }
    getValorImplicito(arbol: ArbolXpath) {
        return "en proceso" ;
    }
}