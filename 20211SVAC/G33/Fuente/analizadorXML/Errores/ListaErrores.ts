
import { tError } from "../Expresiones/tError";

export class ListaErrores {

    public cuerpoHtml: any;

    constructor() {
    }

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
    generateHtmlBody(erroresLS: any, erroresEtiquetas: any): string {
        this.cuerpoHtml = `<TABLE BORDER> \n`;
        this.cuerpoHtml += `    <thead> \n`;
        this.cuerpoHtml += `        <tr> \n`;
        this.cuerpoHtml += `        <th>Tipo</th> \n`;
        this.cuerpoHtml += `        <th>Valor</th> \n`;
        this.cuerpoHtml += `        <th>Fila</th> \n`;
        this.cuerpoHtml += `        <th>Columna</th> \n`;
        this.cuerpoHtml += `        </tr> \n`;
        this.cuerpoHtml += `    </thead> \n`;
        this.cuerpoHtml += `    <tbody> \n`;

        erroresLS.forEach((object: any) => {
            this.cuerpoHtml += this.getHtmlBody(object);
        });

        erroresEtiquetas.forEach((object: any) => {
            this.cuerpoHtml += this.getHtmlBody(object);
        });

        this.cuerpoHtml += `    </tbody> \n`;
        this.cuerpoHtml += `</TABLE> \n`;
        return this.cuerpoHtml;
    }

    getHtmlBody(error: any) {
        var fila = `  <tr> \n`;
        fila += `      <td class="text-left">${error.tipo}</td>\n`;
        fila += `      <td>${error.texto}</td>\n`;
        fila += `      <td>${error.linea}</td> \n`;
        fila += `      <td>${error.columna}</td> \n`;
        fila += `  </tr> \n`;
        return fila;
    }

}
