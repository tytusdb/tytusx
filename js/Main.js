function analizar() {
    const texto = document.getElementById('inputXML');
    const consola = document.getElementById('result');
    // @ts-ignore
    let nodos = AnalyzerXML.parse(texto.value);
    let entornoGlobal = new Entorno(null);
    addSimbolosToEntorno(entornoGlobal, nodos, "global");
    consola.value = entornoGlobal.getTable().toString();
    setSymbolTableHead();
    setSymbolTableBody(entornoGlobal);
}
function addSimbolosToEntorno(anterior, nodos, ambito) {
    nodos.forEach((nodo) => {
        if (nodo.getType() != Type.COMMENT) {
            let entornoNode = new Entorno(anterior);
            nodo.getAtributos().forEach((attr) => {
                attr.setAmbito(ambito);
                entornoNode.add(attr);
            });
            if (nodo.getNodos().length > 0) {
                addSimbolosToEntorno(entornoNode, nodo.getNodos(), nodo.getNombre());
            }
            nodo.setAmbito(ambito);
            nodo.setEntorno(entornoNode);
            anterior.add(nodo);
        }
    });
}
function setSymbolTableHead() {
    let tableHead = document.querySelector('#tableHead');
    tableHead.innerHTML = '';
    let content = new Array();
    content.push("<tr>");
    content.push("\t<th>" + "Identificador" + "</th>");
    content.push("\t<th>" + "Valor" + "</th>");
    content.push("\t<th>" + "Tipo" + "</th>");
    content.push("\t<th>" + "Ambito" + "</th>");
    content.push("\t<th>" + "Linea" + "</th>");
    content.push("\t<th>" + "Columna" + "</th>");
    content.push("</tr>");
    tableHead.innerHTML = content.join("");
}
function setSymbolTableBody(entorno) {
    let tableBody = document.querySelector('#tableBody');
    tableBody.innerHTML = "";
    let content = new Array();
    symbolstToTable(content, entorno);
    tableBody.innerHTML = content.join("");
}
function symbolstToTable(content, entorno) {
    entorno.getTable().forEach((s) => {
        content.push("<tr>");
        content.push("\t<td>" + s.getNombre() + "</td>");
        content.push("\t<td>" + s.getValorImplicito() + "</td>");
        content.push("\t<td>" + s.getType() + "</td>");
        content.push("\t<td>" + s.getAmbito() + "</td>");
        content.push("\t<td>" + s.getLinea() + "</td>");
        content.push("\t<td>" + s.getColumna() + "</td>");
        content.push("</tr>");
        if (s.getType() == Type.DOUBLE_TAG) {
            let nodo = s;
            if (nodo.getEntorno() != null) {
                symbolstToTable(content, nodo.getEntorno());
            }
        }
    });
}
