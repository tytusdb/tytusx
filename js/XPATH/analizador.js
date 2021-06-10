// @ts-ignore
let errores = new Errores();
function analizar() {
    const textoAnalizar = document.getElementById('inputXPath');
    // @ts-ignore
    jisonXpaht.parse(textoAnalizar.value);
    let encabezadoErrores = ["Tipo", "Descripcion", "Linea", "Columna"];
    tablaEcabezado(encabezadoErrores);
    agregarContenidoErrores();
}
function tablaEcabezado(encabezadoEntrada) {
    let encabezado = document.getElementById("tableHead");
    encabezado.innerHTML = "";
    let aux = [];
    aux.push("<tr>");
    for (let i = 0; i < encabezadoEntrada.length; i++) {
        aux.push("\t<th>" + encabezadoEntrada[i] + "</th>");
    }
    aux.push("</tr>");
    encabezado.innerHTML = aux.join("");
}
function agregarContenidoErrores() {
    let body = document.getElementById("tableBody");
    body.innerHTML = "";
    let aux = new Array();
    errores.getErrores().forEach((e) => {
        aux.push("<tr>");
        aux.push("\t<td>" + e.getTipo + "</td>");
        aux.push("\t<td>" + e.getDescripcion + "</td>");
        aux.push("\t<td>" + e.getLinea + "</td>");
        aux.push("\t<td>" + e.getColumna + "</td>");
        aux.push("</tr>");
    });
    body.innerHTML = aux.join("");
}
