import { Consulta } from "../XPath/Consulta";
export class CondicionIf {
    constructor(identificador, listaNodos, etiqueta, funcionXQ, vacio, linea, columna, llamadaFuncion) {
        this.etiqueta = etiqueta;
        this.identificador = identificador;
        this.listaNodos = listaNodos;
        this.funcionXQ = funcionXQ;
        this.linea = linea;
        this.columna = columna;
        this.vacio = vacio;
        this.llamadaFuncion = llamadaFuncion;
    }
    isVacio() {
        return this.vacio;
    }
    obtenerResponse(simbolo) {
        if (this.identificador != undefined && this.listaNodos != undefined) {
            //Es del tipo: $x/algo/otro
            //1. Sobre el simbolo recibido, obtener la consulta
            let tempC = new Consulta(this.listaNodos, this.linea, this.columna);
            let resp = [];
            return resp.concat(tempC.ejecutar(simbolo.valor));
        }
        else if (this.funcionXQ != undefined) {
            //Es del tipo: data($id/algo)
            let resp = [];
            resp = resp.concat(this.funcionXQ.getSobreEntornoXML(simbolo.valor));
            //resp.concat(simbolo);
            return resp;
        }
        else if (this.llamadaFuncion != undefined) {
        }
        return [];
    }
}
