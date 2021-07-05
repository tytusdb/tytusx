/**Clase Nodo AST que sirve para graficar el arbol ast */
class Nodo_AST{
    name:string;
    parent:Nodo_AST;
    children: Array<Nodo_AST>;
    
    constructor(name:string, parent:Nodo_AST, children:Array<Nodo_AST>){
        this.name = name;
        this.parent = parent;
        this.children = children;
    }
    
}
export {Nodo_AST};