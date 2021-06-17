
class ReporteCST {
    private listadoNodos: Array<object> = new Array();
    private listadoPunteros: Array<object> = new Array();
    public run(raiz: NodoPadre) {
        if (raiz != null) {
            this.recursiva(raiz, raiz);
            this.recursiva1(raiz, raiz);
            // @ts-ignore
            var nodes = new vis.DataSet(this.listadoNodos);
            // @ts-ignore
            var edges = new vis.DataSet(this.listadoPunteros);
            // create a network
            var container = document.getElementById("mynetwork");
            var data = {
                nodes: nodes,
                edges: edges,
            };
            var options = {
                interaction: {
                    dragNodes: false,
                    hoverConnectedEdges: true,
                },
                layout: {
                    improvedLayout: true,
                    hierarchical: {
                        levelSeparation: 250,
                        nodeSpacing: 500,
                        parentCentralization: true,
                        direction: 'DU',
                        sortMethod: 'directed'
                    }
                },
            };
            // @ts-ignore
            var network = new vis.Network(container, data, options);
        }
    }

    recursiva(entrada: NodosCST, padre: NodosCST) {
        if (entrada instanceof NodoPadre) {
            this.listadoNodos.push({ id: entrada.getId(), label: entrada.getNomre() });
            entrada.getHijos().forEach(e => {
                this.recursiva(e, entrada);
            });
        }
        if (entrada instanceof NodoHijo) {
            this.listadoNodos.push({ id: entrada.getId(), label: entrada.getNomre() });
        }
    }

    recursiva1(entrada: NodosCST, padre: NodosCST) {
        if (entrada instanceof NodoPadre) {
            entrada.getHijos().forEach(h => {
                if (h instanceof NodoHijo) {
                    this.listadoPunteros.push({ from: h.getId(), to: entrada.getId() });
                } else if (h instanceof NodoPadre) {
                    if (padre instanceof NodoPadre) {
                        this.listadoPunteros.push({ from: h.getId(), to: padre.getId() });
                    }
                    this.recursiva1(h, h);
                }

            });
        }
        /*
        if(entrada instanceof NodoPadre){
            entrada.getHijos().forEach(h=>{
                this.recursiva1(h,entrada);
            });
        }
        */
    }
}