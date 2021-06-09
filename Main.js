function analizar() {
    const texto = document.getElementById('inputXML');
    const consola = document.getElementById('result');
    // @ts-ignore
    let nodos = AnalyzerXML.parse(texto.value);
    let entornoGlobal = new Entorno(null);
    addSimbolosToEntorno(entornoGlobal, nodos, "global");
    consola.value = entornoGlobal.getTable().toString();
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
