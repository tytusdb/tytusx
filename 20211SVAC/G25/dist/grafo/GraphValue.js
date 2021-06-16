"use strict";
class GraphValue {
    /**
     * @param count Contador de nodos
     * @param graph Cadena en formato dot del grafo
     */
    constructor(count, graph) {
        this.count = count;
        this.graph = graph;
    }
    getCount() {
        return this.count;
    }
    getGraph() {
        return this.graph;
    }
    setCount(count) {
        this.count = count;
    }
    setGraph(graph) {
        this.graph = graph;
    }
}
