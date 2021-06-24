var contadorEntorno: number;
var cadenaReporteTS: string;

function graficarTS() {
    contadorEntorno = 0;
    cadenaReporteTS = "<html><head><style>" +
    "table { font-family: arial, sans - serif; border-collapse: collapse; width: 100 %;}" +
    "td, th { border: 1px solid #dddddd;  text-align: left; padding: 8px;}        " +
    "tr: nth-child(even) {background-color: #dddddd;}" +
    "</style></head>" +
    "<body><h2>Tabla de Simbolos</h2><table>" +
    "<tr><th>Entorno</th><th>Nombre Entorno</th><th>Simbolo</th><th>Tipo</th><th>Valor</th></tr>"+
    "<tr><td>"+contadorEntorno+"</td><td>ENTORNO GLOBAL</td><td/><td/><td/></tr>";
    graficarTSRecursivo(contadorEntorno, entornoGlobal);
    cadenaReporteTS += "</table></body></html>";
    generarArchivoReporte("ReporteTS", "html", cadenaReporteTS);
}


function graficarTSRecursivo(contadorEntorno: number, entorno: Entorno) {
        
    for (const key in entorno.tabla) {
        var simbolo: Simbolo = entorno.tabla[key];
        cadenaReporteTS += "<tr><td></td><td></td><td>";
        cadenaReporteTS += simbolo.identificador +"</td><td>";
        cadenaReporteTS += Tipo[simbolo.tipo]+"</td><td>";
        cadenaReporteTS += simbolo.tipo == Tipo.OBJETO ? simbolo.valor.texto : simbolo.valor;
        cadenaReporteTS += "</td></tr>";
        if(simbolo.tipo == Tipo.OBJETO){
            contadorEntorno += 1;
            var objeto:Objeto  = simbolo.valor;
            cadenaReporteTS += "<tr><td>"+contadorEntorno+"</td><td>"+ simbolo.identificador.toUpperCase() +"</td><td/><td/><td/></tr>";
            graficarTSRecursivo(contadorEntorno, objeto.entorno);
        }
    }
}
