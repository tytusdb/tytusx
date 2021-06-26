class GraphValue {
    count:number;
    graph:String;

    /**
     * @param count Contador de nodos
     * @param graph Cadena en formato dot del grafo
     */

    constructor(count:number, graph:String) {
        this.count = count;
        this.graph = graph;
    }

    getCount(){
        return this.count;
    }

    getGraph() {
        return this.graph;
    }

    setCount(count: number) {
        this.count = count;
    }

    setGraph(graph: String) {
        this.graph =  graph;
    }

}