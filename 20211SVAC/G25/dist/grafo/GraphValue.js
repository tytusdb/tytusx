"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphValue = void 0;
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
exports.GraphValue = GraphValue;
