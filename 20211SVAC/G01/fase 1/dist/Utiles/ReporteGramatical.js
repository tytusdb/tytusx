"use strict";
class RepGramatical {
    constructor() 
    {
        this.Reporte = [];
    }


    append(nodo, prod) 
    {
        let Linea = {
            nodo: nodo,
            prod: prod
        };

        this.Reporte.push(Linea);
    }

    borrar(nodo, prod)
    {
        let Linea = {
            nodo: nodo,
            prod: prod
        };

        this.Reporte.push(Linea);

    }
}