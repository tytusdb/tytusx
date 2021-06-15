function tablaEcabezado(encabezadoEntrada:string[],nombreTabla:string){
    let encabezado = document.getElementById(nombreTabla);
    encabezado.innerHTML = "";
    let aux = [];
    aux.push("<tr>");
    for (let i = 0; i < encabezadoEntrada.length; i++) {
        aux.push("\t<th>"+encabezadoEntrada[i]+"</th>");
    }
    aux.push("</tr>");
    encabezado.innerHTML = aux.join("");
}

function agregarContenidoErrores(){
    let encabezadoErrores = ["Tipo","Descripcion","Linea","Columna"];
    tablaEcabezado(encabezadoErrores,"tableHead");
    let body = document.getElementById("tableBody");
    body.innerHTML = "";
    let aux = new Array();
    errores.getErrores().forEach((e:Erro) =>{
        aux.push("<tr>");
        aux.push("\t<td>"+e.getTipo+"</td>");
        aux.push("\t<td>"+e.getDescripcion+"</td>");
        aux.push("\t<td>"+e.getLinea+"</td>");
        aux.push("\t<td>"+e.getColumna+"</td>");
        aux.push("</tr>");
    });
    body.innerHTML = aux.join("");
}

function setSymbolTable(entorno: Entorno) {
    tablaEcabezado(["Identificador", "Valor", "Tipo", "Ambito", "Linea", "Columna"],"tableHead");
    let tableBody = document.querySelector('#tableBody');

    tableBody.innerHTML = "";
    let content = new Array();
    symbolstToTable(content, entorno);
    tableBody.innerHTML = content.join("");
}

function symbolstToTable(content: Array<string>, entorno: Entorno) {
    entorno.getTable().forEach((s: Simbolo) => {
        content.push("<tr>");
        content.push("\t<td>" + s.getNombre() + "</td>");
        content.push("\t<td>" + s.getValorImplicito() + "</td>");
        content.push("\t<td>" + s.getType() + "</td>");
        content.push("\t<td>" + s.getAmbito() + "</td>");
        content.push("\t<td>" + s.getLinea() + "</td>");
        content.push("\t<td>" + s.getColumna() + "</td>");
        content.push("</tr>");

        if (s.getType() == Type.DOUBLE_TAG) {
            let nodo: Nodo = s as Nodo;
            if (nodo.getEntorno() != null) {
                symbolstToTable(content, nodo.getEntorno());
            }
        }
    });
}

function agregarContenidoReporteGramatical(entrada:Array<Array<string>>){
    tablaEcabezado(["Produccion","Regla semantica"],"tableHeadReporteGramatical");
    let body = document.getElementById("tableBodyReporteGramatical");
    body.innerHTML = "";
    let aux = new Array();
    entrada.forEach((e) =>{
        aux.push("<tr>");
        aux.push("\t<td>"+e[0]+"</td>");
        aux.push("\t<td>"+e[1]+"</td>");            
        aux.push("</tr>");
    });
    body.innerHTML = aux.join("");
}