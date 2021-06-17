var NodoContador = 1;
var CodigoGraphviz = "";
class AST {

    RecorrerAST(Nodo) {
        if (Nodo.ID == 0) {
            Nodo.ID = NodoContador;
            NodoContador++;
        }

       
        CodigoGraphviz += "S" + Nodo.ID + " [label = \"" + Nodo.Valor + "\" ];" + " "

        Nodo.Hijos.forEach(element => {

            CodigoGraphviz += "S" + Nodo.ID + " -> " + "S" + NodoContador + ";" + "  ";

            this.RecorrerAST(element);
        });
       
        return CodigoGraphviz;

    }

    LimpiarVariableGraph() {

        CodigoGraphviz="";
    }
}
    export default AST;
    const _CodigoGraphviz = CodigoGraphviz;
export { _CodigoGraphviz as CodigoGraphviz };