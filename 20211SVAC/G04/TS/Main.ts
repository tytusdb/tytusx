let raizCST:NodoPadre;
let errores = new Errores();
function analizar(): void {
    const texto: HTMLTextAreaElement = document.getElementById('inputXML') as HTMLTextAreaElement;
    const consola: HTMLTextAreaElement = document.getElementById('resultC3D')  as HTMLTextAreaElement;
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
    consola.value = generateC3DXML(entornoGlobal);
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

function generateC3DXML(entornoG: Entorno): string {
    let result: C3DResult = new C3DResult(new Array(), 0, 0, null);
    result = recorrerSimbolos(result, entornoG);

    let codigo: Array<string> = new Array();
    codigo.push("/*------HEADER------*/");
    codigo.push("#include <stdio.h>");
    codigo.push("#include <math.h>");
    codigo.push("double heap[30101999];");
    codigo.push("double stack[30101999];");
    codigo.push("double P;");
    codigo.push("double H;");

    let aux: Array<string> = new Array();
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