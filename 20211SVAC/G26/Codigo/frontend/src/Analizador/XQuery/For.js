export class For {
    constructor(listaFor, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.listaFor = listaFor;
    }
    ejecutar(XQueryEnt, xmlEnt) {
        //Un for puede ser: for $x in //book, at $i in //bok (Separados por coma)
        console.log("Ejecutando for");
        for (let i = 0; i < this.listaFor.length; i++) {
            let forElem = this.listaFor[i];
            forElem.ejecutar(XQueryEnt, xmlEnt);
        }
    }
    getCodigo3Dir(XQueryEnt, xmlEnt, traductorXPath, traductorXQuery) {
        let code = "";
        for (let i = 0; i < this.listaFor.length; i++) {
            let forElem = this.listaFor[i];
            code += forElem.getCodigo3Dir(XQueryEnt, xmlEnt, traductorXPath, traductorXQuery);
        }
        return code;
    }
}
