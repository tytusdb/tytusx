function testTS(): void {
    const texto: HTMLTextAreaElement = document.getElementById('inputText') as HTMLTextAreaElement;
    const consola: HTMLTextAreaElement = document.getElementById('areaInfo')  as HTMLTextAreaElement;

    // @ts-ignore
    let nodos: Array<Nodo> = AnalyzerXML.parse(texto.value);
    let entornoGlobal: Entorno = new Entorno(null);
    addSimbolosToEntorno(entornoGlobal, nodos, "global");

    console.log(entornoGlobal.getTable());
}

function addSimbolosToEntorno(anterior: Entorno, nodos: Array<Nodo>, ambito: string): void {
    nodos.forEach((n:Nodo) => {
        let entornoNode: Entorno = new Entorno(anterior);
        let simbolo: Simbolo = new Simbolo(n.getNombre(), n.getTexto(), n.getType(), ambito, n.getLinea(), n.getColumna());

        n.getAtributos().forEach((attr: Atributo) => {
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