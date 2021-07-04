import { ExpresionXQ } from "../Arbol/ExpresionXQ";
import { InstruccionXQ } from "../Arbol/InstruccionXQ";
import { EntornoXQ } from "../Entorno/Entorno";
var localStorage = require('localStorage');

export class ReturnXQ extends InstruccionXQ {
    exret:ExpresionXQ;
    retorno:ExpresionXQ;

    constructor(e:ExpresionXQ, l:number, c:number) {
        super();
        this.exret = e;
        this.linea = l;
        this.columna = c;
        this.retorno = null;
    }

    ejecutar(ent: EntornoXQ): Object {
        //Verificar que este dentro de una funcion
        var contador = parseInt(localStorage.getItem('contador'));
        //console.log('La pila tiene un length de: ' + contador);

        if(contador != 0) {
            if(this.exret != null) {
                this.retorno = this.exret.getValor(ent);
            }
            return this;
        }

        return null;
    }
}