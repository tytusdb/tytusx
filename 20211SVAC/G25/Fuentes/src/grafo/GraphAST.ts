class GraphAST {
    tree: AST_XML; //CST

    constructor(tree:AST_XML) {
        this.tree = tree;
    }

    getGrafo():String {
        let graph = "digraph {\n"
        graph += "nodo0[label=\"CST\"];\n"

        var g = new GraphValue(1, graph);
        this.tree.generarGrafo(g, "nodo0");
        
        let gph = g.getGraph() + "\n}"
        return gph;
    }
}