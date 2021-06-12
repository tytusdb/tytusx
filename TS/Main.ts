function analizar(): void {
    const texto: HTMLTextAreaElement = document.getElementById('inputXML') as HTMLTextAreaElement;
    const consola: HTMLTextAreaElement = document.getElementById('result')  as HTMLTextAreaElement;

    // @ts-ignore
    let nodos: Array<Nodo> = AnalyzerXML.parse(texto.value);
    let entornoGlobal: Entorno = new Entorno(null);
    addSimbolosToEntorno(entornoGlobal, nodos, "global");
    setSymbolTable(entornoGlobal);

    analizarXpath(entornoGlobal);
}

function addSimbolosToEntorno(anterior: Entorno, nodos: Array<Nodo>, ambito: string): void {
    nodos.forEach((nodo:Nodo) => {
        if (nodo.getType() != Type.COMMENT) {
            let entornoNode: Entorno = new Entorno(anterior);

            nodo.getAtributos().forEach((attr: Atributo) => {
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