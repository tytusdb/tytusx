export class SalidaGramatica {

    public objetos: any;
    public reporteBNF: any;
    public reporteBNF2: any;
    public reportError: any;

    constructor(objetos: any, reporte: any, reporte2: any, reporteE: null) {
        this.objetos = objetos;
        this.reporteBNF = reporte;
        this.reporteBNF2 = reporte2;
        this.reportError = reporteE;
    }
}