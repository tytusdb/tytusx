export class Flwor {
    constructor(opcionales, retType, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.retType = retType;
        this.opcionales = opcionales;
    }
    ejecutar(XQEnt, xmlEnt) {
        //Se ejecutan las intrucciones opcionales (Let, for, where, order by) ( Si es que hay)
        this.opcionales.forEach((opcional) => {
            opcional.ejecutar(XQEnt, xmlEnt);
        });
        //Se ejecuta el return y se retorna el resultado (Objeto)
        return this.retType.ejecutar(XQEnt, xmlEnt);
    }
}
