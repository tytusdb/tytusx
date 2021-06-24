
export class SalidaGramatica {

    public objetos: any;
    public reporteBNF: any;
    public reporteBNF2: any;
    public encoding: any;
    public lErrores: any;

    constructor(objetos: any, reporte: any, reporte2: any, encoding: any, lError: any) {
        this.objetos = objetos;
        this.reporteBNF = reporte;
        this.reporteBNF2 = reporte2;
        this.encoding = encoding;
        this.lErrores = lError;
    }
}

