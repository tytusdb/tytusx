let raizCST:NodoPadre;
let errores = new Errores();
function analizar(): void {
    const texto: HTMLTextAreaElement = document.getElementById('inputXML') as HTMLTextAreaElement;
    const consola: HTMLTextAreaElement = document.getElementById('result')  as HTMLTextAreaElement;
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
    setSymbolTable(entornoGlobal);    
    raizCST = auxResultado.raizCST;
    if(errores.getErrores().length>0){
        errores.agregarEncabezado("XML");
    }
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