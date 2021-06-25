let raizCST;
let errores = new Errores();
function analizar() {
    const texto = document.getElementById('inputXML');
    errores = new Errores();
    let auxResultado;
    try {
        // @ts-ignore
        auxResultado = AnalyzerXML.parse(texto.value);
    }
    catch (err) {
        errores.agregarError("Irrecuperable", "Error irecuperable (Posiblmente no cerro alguna etiqueta)", 0, 0);
        auxResultado = { nodos: [new Nodo("", [], [], Type.COMMENT, "", 0, 0)],
            raizCST: new NodoPadre(0, "error", "Error sin recuperacion", "", [])
        };
    }
    let nodos = auxResultado.nodos;
    let entornoGlobal = new Entorno(null);
    addSimbolosToEntorno(entornoGlobal, nodos, "global");
    let result = new C3DResult(new Array(), 0, 0, null);
    result = recorrerSimbolos(result, entornoGlobal);
    setSymbolTable(entornoGlobal);
    raizCST = auxResultado.raizCST;
    if (errores.getErrores().length > 0) {
        errores.agregarEncabezado("XML");
    }
    analizarXpath(entornoGlobal, result);
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
function recorrerSimbolos(result, entorno) {
    entorno.getTable().forEach(s => {
        if (s instanceof Nodo) {
            if (s.getEntorno() != null) {
                result = recorrerSimbolos(result, s.getEntorno());
            }
        }
    });
    entorno.getTable().forEach((s) => {
        if (s instanceof Nodo) {
            s.getAtributos().forEach(a => result = a.generateC3D(result));
            result = s.getEntorno().generateC3DXML(result);
            result = s.setEntornoToChilds(result);
            result = s.generateC3D(result);
        }
    });
    return result;
}
