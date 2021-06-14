"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphAST = void 0;
const GraphValue_1 = require("./GraphValue");
class GraphAST {
    constructor(tree) {
        this.tree = tree;
    }
    getGrafo() {
        let graph = "digraph {\n";
        graph += "nodo0[label=\"CST\"];\n";
        var g = new GraphValue_1.GraphValue(1, graph);
        this.tree.generarGrafo(g, "nodo0");
        let gph = g.getGraph() + "\n}";
        return gph;
    }
}
exports.GraphAST = GraphAST;
