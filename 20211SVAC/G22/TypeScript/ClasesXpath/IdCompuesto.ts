import { NodoRutaXpath } from "../Interfaces/NodoRutaXpath";
import { Predicado } from "./Predicado";
import { TiposXpath } from "./TiposXpath";
import { ArbolXpath } from "../Arboles/ArbolXpath";


export class IdCompuesto implements NodoRutaXpath {
    nombreId: String;
    tipo: TiposXpath;
    public listaPredicados: Array<Predicado>;
    linea: number;
    columna: number;

    constructor(nombreId: String, predicado: Array<Predicado>,
         linea: number, columna: number) {
        this.nombreId = nombreId;
        this.tipo = TiposXpath.ID_PREDICADO;
        this.listaPredicados = predicado;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo( arbol: ArbolXpath): TiposXpath {
        return this.tipo;
    }
    getId(): String {

        return this.nombreId;
    }

    getValorImplicito(arbol: ArbolXpath) {
        //imprimir los predicados 
/*        for (let i = 0; i < this.listaPredicados.length; i++) {
            console.log("Predicado ---> " + this.listaPredicados[i]);
        }
*/
        return this.listaPredicados;
    }



}
