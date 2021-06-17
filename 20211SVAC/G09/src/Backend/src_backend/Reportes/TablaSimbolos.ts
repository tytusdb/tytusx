
export class SimbolsReport {
    Lista: any = []
    help: string
    public static aux: string = "";



    public static Llenado_tabla() {




    }
    public static REPORTE() {
        console.log("suuuuu adentro")
        var grafo = ""
        grafo += "<html ><head><title>Reporte </title>    </head>"
        grafo += "<body class=\"MIfondo\">\n";
        grafo += "<div align=\"center\"  class=\"MIfondo\"> \n";
        grafo += "<h1 class = \"tituloTb\">TABLA DE SIMBOLOS </h1>\n";
        grafo += "<table border=\"2\" align=\"center\" class=\"tabl\">\n";
        grafo += "<tr>\n";
        grafo += "<th>Nombre</th>  <th>Tipo</th><th>Ambito</th><th>Fila</th><th>Columna</th><th>Valor</th>\n";
        grafo += "</tr>\n";
        grafo += SimbolsReport.aux
        grafo += "</table>\n";
        grafo += "</div>\n";
        grafo += "</body>\n";
        grafo += "</html>\n";
  



      


    }
}