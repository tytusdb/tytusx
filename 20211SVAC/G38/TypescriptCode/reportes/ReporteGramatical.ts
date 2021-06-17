class ReporteGramatical{
    private static _reporteXpath: ReporteGramatical = new ReporteGramatical();
    private static _reporteXML: ReporteGramatical = new ReporteGramatical();

    private _produccionesGramaticales: Array<ProduccionGramatical>;

    private constructor() {
        this._produccionesGramaticales = [];
    }

    public static InicializarReporteGramaticalXpath() {
        this._reporteXpath = new ReporteGramatical();
    }

    public static InicializarReporteGramaticalXML() {
        this._reporteXML = new ReporteGramatical();
    }

    public static agregarProduccionXpath(produccion: string, reglaSemantica:string ){
        if (this._reporteXpath == undefined || Object.keys(this._reporteXpath).length === 0) {
            this.InicializarReporteGramaticalXpath();
        }
        this._reporteXpath._produccionesGramaticales.push(new ProduccionGramatical(produccion,reglaSemantica));
    }

    public static agregarProduccionXML(produccion: string, reglaSemantica:string ){
        if (this._reporteXML == undefined || Object.keys(this._reporteXML).length === 0) {
            this.InicializarReporteGramaticalXpath();
        }
        this._reporteXML._produccionesGramaticales.push(new ProduccionGramatical(produccion,reglaSemantica));
    }

    public static LimpiarReportesGramaticales(){
        this.InicializarReporteGramaticalXpath();
        this.InicializarReporteGramaticalXML();
    }


    get produccionesGramaticales(): ProduccionGramatical[] {
        return this._produccionesGramaticales;
    }

    set produccionesGramaticales(value: ProduccionGramatical[]) {
        this._produccionesGramaticales = value;
    }


    static getHtmlTableXml():string{
        return this.getCadHtmlFromReprote(ReporteGramatical._reporteXML,"Reporte Gramatical XHML");
    }

    static getHtmlTableXPath():string{
        return this.getCadHtmlFromReprote(ReporteGramatical._reporteXpath,"Reporte Gramatical XPath");
    }

    static getCadHtmlFromReprote(reporteGramatical:ReporteGramatical,encabezado:string):string {
        let cad;
        cad='<cite style="font-size:x-large;">encabezado</cite><br/>'+
            '<table border="1">'
            +'<tr>'
            +'<th>PRODUCCION</th><th>REGLA SEMANTICA</th> '
            +'</tr>'
        ;

        for(let reg of reporteGramatical.produccionesGramaticales){
            cad+='<tr>'
                +reg.toString()
                +'</tr>';
        }
        cad+='</table>';
        return cad;
    }
}



class ProduccionGramatical{
    private produccion: string;
    private reglaSemantica: string;

    constructor(produccion: string, reglaSemantica: string) {
        this.produccion = (produccion==null)?"": produccion;
        this.reglaSemantica = (reglaSemantica == null)?"":reglaSemantica;
    }

    public toString():string{
        return "<TD style=\"font-size: 15px;  ;\"  align=rigth><p>"+this.produccion+"</p></TD>\n" +
               "<TD style=\"font-size: 15px;  ;\"  align=left><p>"+this.reglaSemantica+"</p></TD>\n";
    }
}