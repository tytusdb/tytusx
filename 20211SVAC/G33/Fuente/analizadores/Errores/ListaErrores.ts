import { ErrorHandler } from "@angular/core";
import { tError } from "../Expresiones/tError";

interface errorIndividual {
    no: number,
    tipo: string,
    valor: string,
    linea: number,
    columna: number,
}

export class ListaErrores {
    contador: number = 1;
    public cuerpoHtml: any;

    constructor() { this.contador = 1 }

    //LLAMARLO AL INICIO PARA VALIDAR LAS ETIQUETAS
    validateEtiquetas(listaO: any): Array<tError> {
        var tmpArray: Array<tError> = [];
        for (let i = 0; i < listaO.length; i++) {
            if (listaO[i].identificador !== listaO[i].cierre) {
                tmpArray.push(
                    new tError('Semantico',
                        `Etiquetas incorrectas ${listaO[i].identificador} !=== ${listaO[i].cierre}`,
                        listaO[i].linea,
                        listaO[i].columna
                    ));
                //console.log(`Etiquetas incorrectas ${listaO[i].identificador} !=== ${listaO[i].cierre}`);
            } else {
                var tmp = this.validateEtiquetas(listaO[i].listaObjetos);
                if (tmp.length !== 0) {
                    tmpArray = tmp;
                }
            }
        }
        return tmpArray;
    }


    /*
        var arrTmp = lError.validateEtiquetas(salidaG.objetos);
        console.log(lError.generateHtmlBody(salidaG.lErrores, arrTmp));
    */
    //ARCHIVO .HTML
    generateHtmlBody(erroresLS: any, erroresEtiquetas: any):errorIndividual[] {
        var arrayCuerpo: errorIndividual[] = [];

        if (erroresLS.length > 0){
        erroresLS.forEach((object: any) => {
            arrayCuerpo.push(this.getHtmlBody(object));
        });
    }
    
    if (erroresEtiquetas.length >  0){
    erroresEtiquetas.forEach((object: any) => {
            arrayCuerpo.push(this.getHtmlBody(object));
        });
    }
        return arrayCuerpo;
    
}

    getHtmlBody(error: any):errorIndividual {
        var fila:errorIndividual = {
            no: this.contador,
            tipo: error.tipo,
            valor: error.texto,
            linea: error.linea,
            columna: error.columna
        }; 
        return fila;
    }

}
