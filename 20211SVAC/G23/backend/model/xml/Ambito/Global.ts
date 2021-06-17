import Hijos from './Hijos';
import { Ambito } from './Ambito';


export class Global {

    expresiones: any;
    ambito: Ambito;

    constructor(expresiones: any, ambito: Ambito) {
        this.expresiones = expresiones;
        this.ambito = ambito;
        Hijos.exec(expresiones, this.ambito);
    }

}