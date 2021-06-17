let raizCST;
function analizar() {
    const texto = document.getElementById('inputXML');
    const consola = document.getElementById('result');
    // @ts-ignore
    let auxResultado = AnalyzerXML.parse(texto.value);
    let nodos = auxResultado.nodos;
    let entornoGlobal = new Entorno(null);
    addSimbolosToEntorno(entornoGlobal, nodos, "global");
    setSymbolTable(entornoGlobal);
    raizCST = auxResultado.raizCST;
    analizarXpath(entornoGlobal);
}
function addSimbolosToEntorno(anterior, nodos, ambito) {
    nodos.forEach((nodo) => {
        if (nodo.getType() != Type.COMMENT) {
            let entornoNode = new Entorno(anterior);
            nodo.getAtributos().forEach((attr) => {
                attr.setAmbito(nodo.getNombre());
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
