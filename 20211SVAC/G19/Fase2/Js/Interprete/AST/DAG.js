class DAG{
    constructor(){
        this.id_n=1;
        this.nodos=[]
        this.hoja=[];
    }

    limpiarArreglo(){
        this.nodos = [];
    }

    agregarNodo(nodo){
        this.nodos.push(nodo);
    }

    recorrerArbol(nodo){

        if(nodo.id==0){
            nodo.id=this.id_n;
            this.id_n++;
        }
            this.agregarNodo(nodo);
            nodo.hijos.forEach(element => {
                this.recorrerDOT(element);
            });
        
    }

    NodoYaExiste(nodo){


    
    }


    getErrores(){
        
    }

    

}