import { Tipo } from "../expresiones/tipo";

export interface Expresion {
    linea: number;
    columna: number;

    getTipo(arbol: any): Tipo;
    getValorImplicito(arbol: any): any;

}