class GraphASTXPATH {
    tree: AST_XPATH; //CST

    constructor(tree:AST_XPATH) {
        this.tree = tree;
    }

    getGrafo():String {
        let graph = "digraph {\n"
        graph += "nodo0[label=\"AST\"];\n"

        var g = new GraphValue(1, graph);
        this.tree.generarGrafo(g, "nodo0");
        
        let gph = g.getGraph() + "\n}"
        return gph;
    }
}