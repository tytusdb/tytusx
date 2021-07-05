class ReporteOptimizacion {
    private static _reporteOptimizacion: ReporteOptimizacion = new ReporteOptimizacion();

    private lista: FilaOptimizacion[];

    private constructor() {
        this.lista = [];
    }

    public static InicializarReporteOptimizacion() {
        this._reporteOptimizacion = new ReporteOptimizacion();
    }

    public static AgregarFilaOptimizacion(filaOptimizacion: FilaOptimizacion) {
        if (this._reporteOptimizacion == undefined || Object.keys(this._reporteOptimizacion).length === 0) {
            this.InicializarReporteOptimizacion();
        }
        this._reporteOptimizacion.lista.push(filaOptimizacion);
    }

    public static getHtmlReporteOptimizacion():string{
        return this.getCadHtmlFromReprote("Reporte Optimizacion C3D");
    }


    static getCadHtmlFromReprote(encabezado:string):string {
        let cad;
        var index = 1;
        cad='<cite style="font-size:x-large;">'+encabezado+'</cite><br/>'+
            '<table border="1">'
        for(let fila of ReporteOptimizacion._reporteOptimizacion.lista){
            if(index == 1){
                cad += fila.createCabeceras();
                index++;
            }
            cad+= fila.toString();
        }
        cad+='</table>';
        return cad;
    }



}