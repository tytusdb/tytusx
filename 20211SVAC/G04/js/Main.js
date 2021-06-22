let raizCST;
let errores = new Errores();
function analizar() {
    const texto = document.getElementById('inputXML');
    const consola = document.getElementById('resultC3D');
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
    consola.value = generateC3DXML(entornoGlobal);
    setSymbolTable(entornoGlobal);
    raizCST = auxResultado.raizCST;
    if (errores.getErrores().length > 0) {
        errores.agregarEncabezado("XML");
    }
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
function generateC3DXML(entornoG) {
    let result = new C3DResult(new Array(), 0, 0, null);
    result = recorrerSimbolos(result, entornoG);
    let codigo = new Array();
    codigo.push("/*------HEADER------*/");
    codigo.push("#include <stdio.h>");
    codigo.push("#include <math.h>");
    codigo.push("double heap[30101999];");
    codigo.push("double stack[30101999];");
    codigo.push("double P;");
    codigo.push("double H;");
    let aux = new Array();
    aux.push("double");
    for (let i = 0; i < result.getNextTemp(); i++) {
        aux.push(` t${i}`);
        aux.push(",");
    }
    aux.pop();
    aux.push(";");
    codigo.push(aux.join(""));
    codigo.push("\n/*-----MAIN-----*/");
    codigo.push("void main() {");
    codigo.push("\tP = 0; H = 0;");
    result.getCodigo().forEach(l => codigo.push(l));
    codigo.push("\treturn;");
    codigo.push("}");
    return codigo.join("\n");
}
function recorrerSimbolos(result, entorno) {
    entorno.getTable().forEach((s) => {
        if (s instanceof Nodo) {
            s.getAtributos().forEach(a => result = a.generateC3D(result));
            result = s.generateC3D(result);
        }
        if (s.getType() == Type.DOUBLE_TAG) {
            let nodo = s;
            if (nodo.getEntorno() != null) {
                result = recorrerSimbolos(result, nodo.getEntorno());
            }
        }
    });
    return result;
}
