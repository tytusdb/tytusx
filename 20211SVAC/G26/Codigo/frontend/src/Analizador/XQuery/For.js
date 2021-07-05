export class For {
    constructor(listaFor, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.listaFor = listaFor;
    }
    ejecutar(XQueryEnt, xmlEnt) {
        //Un for puede ser: for $x in //book, at $i in //bok (Separados por coma)
        for (let i = 0; i < this.listaFor.length; i++) {
            let forElem = this.listaFor[i];
            forElem.ejecutar(XQueryEnt, xmlEnt);
        }
    }
}
