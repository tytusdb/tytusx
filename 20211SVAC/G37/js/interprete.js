var lista_errores = [];

function ejecutarAnalisis() {
    var entradaXML = getXML();
    var entradaQuery = getXPath();
    try{
        var xml = gramatica1.parse(entradaXML);
        var query = gramatica.parse(entradaQuery);
        const ambitoGlobal = xml.elemento.getTablaSimbolos(null); 
        query.forEach(consulta => {
            consulta.forEach(nodo => {
                console.log(nodo.identificador)
            })
        });
    }catch(e){
        console.log(e);
    }
    if (lista_errores.length > 0){
        crearReporteErrores();
    }
}

function crearReporteErrores(){
    var reporte = "<!DOCTYPE html>\n\
    <html lang=\"en\">\n\n\
    <head>\n\
      <title>XPath - Reporte de erroes</title>\n\
    <table class=\"table table-striped\">\n\
    <thead>\n\
      <tr>\n\
        <th>No.</th>\n\
        <th>Tipo</th>\n\
        <th>Descripción</th>\n\
        <th>Fila</th>\n\
        <th>Columna</th>\n\
      </tr>\n\
    </thead>";
    var i = 1;
    lista_errores.forEach(error => {
        reporte += "<tr>\
        <th>" + i + "</th><th>" + error.tipo + "</th><th>" + error.descripcion + "</th><th>" + error.fila + "</th><th>" + error.columna + "</th>" ;
        i = i + 1;
    });
    reporte+="</table></html>";    
    var blob = new Blob([reporte], { type: "html/plain;charset=utf-8" });
    saveAs(blob, "ReporteErrores.html");
}