export class Flwor {
    constructor(opcionales, retType, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.retType = retType;
        this.opcionales = opcionales;
    }
    getCodigo3Dir(XQueryEnt, xmlEnt, traductorXPath, traductorXQuery) {
        let code = "";
        //Se ejecutan las intrucciones opcionales (Let, for, where, order by) ( Si es que hay)
        this.opcionales.forEach((opcional) => {
            code += opcional.getCodigo3Dir(XQueryEnt, xmlEnt, traductorXPath, traductorXQuery);
        });
        //Se ejecuta el return y se retorna el resultado (Objeto)
        code += this.retType.getCodigo3Dir(XQueryEnt, xmlEnt, traductorXPath, traductorXQuery);
        return code;
    }
    ejecutar(XQEnt, xmlEnt) {
        //Se ejecutan las intrucciones opcionales (Let, for, where, order by) ( Si es que hay)
        console.log("ejecutando FLwor");
        this.opcionales.forEach((opcional) => {
            opcional.ejecutar(XQEnt, xmlEnt);
        });
        //Se ejecuta el return y se retorna el resultado (Objeto)
        let x = this.retType.ejecutar(XQEnt, xmlEnt);
        console.log("x", x);
        return x;
    }
}
