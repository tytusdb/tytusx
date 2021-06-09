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
    nodos.forEach((n) => {
        let entornoNode = new Entorno(anterior);
        let simbolo = new Simbolo(n.getNombre(), n.getTexto(), n.getType(), ambito, n.getLinea(), n.getColumna());
        n.getAtributos().forEach((attr) => {
            let simboloAttr = new Simbolo(attr.getNombre(), attr.getValor(), Type.ATRIBUTO, n.getNombre(), attr.getLinea(), attr.getColumna());
            entornoNode.add(simboloAttr);
        });
        if (n.getNodos().length > 0) {
            addSimbolosToEntorno(entornoNode, n.getNodos(), n.getNombre());
        }
        simbolo.setEntorno(entornoNode);
        anterior.add(simbolo);
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
        content.push("\t<td>" + s.getId() + "</td>");
        content.push("\t<td>" + s.getImplicityValue() + "</td>");
        content.push("\t<td>" + s.getType() + "</td>");
        content.push("\t<td>" + s.getAmbito() + "</td>");
        content.push("\t<td>" + s.getLinea() + "</td>");
        content.push("\t<td>" + s.getColumna() + "</td>");
        content.push("</tr>");
        if (s.getEntorno() != null) {
            symbolstToTable(content, s.getEntorno());
        }
    });
}
