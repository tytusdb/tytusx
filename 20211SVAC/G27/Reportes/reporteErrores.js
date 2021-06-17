function construyeReporteErrores(listaErrores){
    var script = "";
    contNodos=0;
    var cantidadErrores = listaErrores.length;
    if (cantidadErrores > 0){
        var Raiz = Arbol;
        console.log("\n>>>Se encontraron " + cantidadErrores + " en la traducción de XML");
        if (Raiz){
            console.log("\n>>>Se construye encabezado de la tabla de Errores...");
            script += "<h2>Reporte Tabla de Errores en Traducción</h2>\n";
            script += "<br>\n";
            script += "<table class=\"table\" style=\"width:80%;\" align=\"center\">\n";
            script += "<thead class=\"thead-dark\">\n";
            script += "<tr>\n";
            script += "<th scope=\"col\">#</th>\n"
            script += "<th scope=\"col\">Tipo</th>\n";
            script += "<th scope=\"col\">Descripción</th>\n";
            script += "<th scope=\"col\">Fila</th>\n";
            script += "<th scope=\"col\">Columna</th>\n";
            script += "</tr>\n";
            script += "</thead>\n";
            script += "<tbody>\n";
            
            //se construye el body de la tabla
            //Se construye la primera fila
            for (var i = 0; i<cantidadErrores; i++)
            {
                var error = listaErrores[i];
                console.log("\n>>>Se genera la fila error: "+i);
                contNodos++;
                script += "<tr>\n";
                script += "<td>"+    contNodos          + "</td>\n";
                script += "<td>"+    error.Tipo         + "</td>\n";
                script += "<td>"+    error.Descripcion  + "</td>\n"; 
                script += "<td>"+    error.linea        + "</td>\n";
                script += "<td>"+    error.columna      + "</td>\n";
                script += "</tr>\n";
            }
            //Se cierran las etiquetas de body y table
            script += "</tbody>\n"; 
            script += "</table>\n";
        }

        console.log("\n>>>Terminó de construir el código de la tabla de errores de traducción...");
    }    

    return script;
}