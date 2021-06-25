let raizCST:NodoPadre;
let errores = new Errores();
function analizar(): void {
    const texto: HTMLTextAreaElement = document.getElementById('inputXML') as HTMLTextAreaElement;
    errores = new Errores();
    let auxResultado;
    try{
        // @ts-ignore
        auxResultado = AnalyzerXML.parse(texto.value);
    } catch (err) {
        errores.agregarError("Irrecuperable","Error irecuperable (Posiblmente no cerro alguna etiqueta)",0,0);
        auxResultado = {nodos:[new Nodo("",    [],    [], Type.COMMENT,     "",    0,             0)]
        ,raizCST:new NodoPadre(0,"error","Error sin recuperacion","",[])
        }
    }
    let nodos: Array<Nodo> = auxResultado.nodos;
    let entornoGlobal: Entorno = new Entorno(null);
    addSimbolosToEntorno(entornoGlobal, nodos, "global");

    let result: C3DResult = new C3DResult(new Array(), 0, 0, null);
    result = recorrerSimbolos(result, entornoGlobal);
    setSymbolTable(entornoGlobal);
    raizCST = auxResultado.raizCST;
    if(errores.getErrores().length>0){
        errores.agregarEncabezado("XML");
    }
    analizarXpath(entornoGlobal, result);
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

function recorrerSimbolos(result: C3DResult, entorno: Entorno): C3DResult {

    entorno.getTable().forEach(s => {
        if (s instanceof Nodo) {
            if (s.getEntorno() != null) {
                result = recorrerSimbolos(result, s.getEntorno());
            }
        }
    });

    entorno.getTable().forEach((s: Simbolo) => {
        if (s instanceof Nodo) {
            s.getAtributos().forEach(a => result = a.generateC3D(result));
            result = s.getEntorno().generateC3DXML(result);
            result = s.setEntornoToChilds(result);
            result = s.generateC3D(result);
        }
    });

    return result;
}